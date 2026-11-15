import { NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { SUBSCRIPTION_PLANS, CHARACTER_PACKS, CLONE_PACKS } from '@/lib/creem';
import { notifyFeishu } from '@/lib/feishu-notify';

// Creem webhook：支付完成后发放/回收授权
// 事件：checkout.completed / subscription.paid / subscription.expired /
//       subscription.canceled / subscription.paused
// 签名：creem-signature = HMAC-SHA256(rawBody, CREEM_WEBHOOK_SECRET) hex

function verifySignature(payload: string, signature: string, secret: string): boolean {
  try {
    const computed = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    const a = Buffer.from(computed);
    const b = Buffer.from(signature);
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

// 订阅配额发放/续期：临时配额 = 套餐字符数，quotaExpiry = 订阅到期日
// usedCharacters 钳制到永久配额内（超出部分视为上个临时周期用量，随新周期重置），
// 避免试用/上个周期的用量吃掉新周期的订阅额度
async function grantSubscriptionQuota(userId: string, planType: string, endDate: Date): Promise<void> {
  const plan = SUBSCRIPTION_PLANS[planType] || SUBSCRIPTION_PLANS.monthly;
  const existing = await prisma.characterQuota.findUnique({ where: { userId } });
  const usedCharacters = existing ? Math.min(existing.usedCharacters, existing.permanentQuota) : 0;
  await prisma.characterQuota.upsert({
    where: { userId },
    update: {
      temporaryQuota: plan.characters,
      quotaExpiry: endDate,
      usedCharacters,
      lastUpdated: new Date(),
    },
    create: {
      userId,
      permanentQuota: 0,
      temporaryQuota: plan.characters,
      usedCharacters: 0,
      quotaExpiry: endDate,
    },
  });
}

// 收到无法归属用户的支付事件时告警（钱收了但发不了货，需人工补发）
function notifyUnattributedPayment(eventType: string, eventId: string, obj: Record<string, any>): void {
  console.error(`支付事件缺少 userId，未发放权益: ${eventType} ${eventId}`);
  notifyFeishu({
    title: '🚨 VoiceWove 支付事件无法归属用户',
    level: 'error',
    desc: '收到支付事件但 metadata 中没有 userId/referenceId，权益未发放，需人工补发',
    fields: [
      { label: '事件', value: `${eventType} (${eventId})` },
      { label: '客户邮箱', value: obj?.customer?.email || '未知' },
      { label: '订单号', value: obj?.order?.id || obj?.id || '未知' },
    ],
    dedupeKey: `creem:unattributed:${eventType}`,
  }).catch(() => {});
}

interface CreemWebhookEvent {
  id: string;
  eventType: string;
  created_at: number;
  object: Record<string, any>;
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get('creem-signature') || '';
  const secret = process.env.CREEM_WEBHOOK_SECRET;

  if (!secret) {
    console.error('CREEM_WEBHOOK_SECRET 未配置');
    notifyFeishu({
      title: '🚨 VoiceWove 支付 Webhook 未配置',
      level: 'error',
      desc: 'CREEM_WEBHOOK_SECRET 未配置，所有支付回调将被拒绝，收款后权益无法发放',
      dedupeKey: 'creem:secret-missing',
    }).catch(() => {});
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  if (!verifySignature(rawBody, signature, secret)) {
    console.error('Creem webhook 签名验证失败');
    notifyFeishu({
      title: '🚨 VoiceWove 支付 Webhook 签名验证失败',
      level: 'error',
      desc: '可能是密钥配置不一致或恶意伪造请求，请核实 Creem 后台配置',
      fields: [{ label: '签名前缀', value: signature.slice(0, 8) || '（空）' }],
      dedupeKey: 'creem:bad-signature',
    }).catch(() => {});
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  let event: CreemWebhookEvent;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  console.log('Creem webhook 事件:', event.eventType, event.id);
  const obj = event.object || {};
  const metadata = (obj.metadata || {}) as Record<string, string>;
  const userId = metadata.userId || metadata.referenceId;

  try {
    switch (event.eventType) {
      // 首次支付完成（含订阅首期与一次性购买）
      case 'checkout.completed': {
        if (!userId) {
          notifyUnattributedPayment(event.eventType, event.id, obj);
          break;
        }
        const planType = metadata.planType || '';

        if (planType === 'monthly' || planType === 'yearly') {
          const plan = SUBSCRIPTION_PLANS[planType];
          const endDate = new Date(Date.now() + plan.months * 30 * 24 * 60 * 60 * 1000);
          await prisma.subscription.upsert({
            where: { userId },
            update: {
              planType,
              startDate: new Date(),
              endDate,
              status: 'active',
            },
            create: {
              userId,
              planType,
              startDate: new Date(),
              endDate,
              status: 'active',
            },
          });
          // 订阅期间临时配额（同时钳制历史用量，见 grantSubscriptionQuota）
          await grantSubscriptionQuota(userId, planType, endDate);
        } else if (CHARACTER_PACKS[planType]) {
          // 一次性字符包 → 永久配额
          await prisma.characterQuota.upsert({
            where: { userId },
            update: {
              permanentQuota: { increment: CHARACTER_PACKS[planType] },
              lastUpdated: new Date(),
            },
            create: {
              userId,
              permanentQuota: CHARACTER_PACKS[planType],
              temporaryQuota: 0,
              usedCharacters: 0,
            },
          });
        } else if (CLONE_PACKS[planType]) {
          // 一次性克隆包 → remaining_clones
          await prisma.users.update({
            where: { id: userId },
            data: {
              remaining_clones: { increment: CLONE_PACKS[planType] },
              total_clones: { increment: CLONE_PACKS[planType] },
            },
          });
        }

        // 支付流水记录（Dispute 证据链）
        const amount = obj.order?.amount ?? obj.amount ?? 0;
        try {
          await prisma.payment.create({
            data: {
              userId,
              type: planType || 'unknown',
              amount: Math.round((amount / 100) * 100),
              status: 'paid',
              packageId: obj.order?.id || obj.id || event.id, // Creem 订单号（退款事件凭此回查）
            },
          });
        } catch (paymentError) {
          console.error('支付流水记录失败:', paymentError);
          notifyFeishu({
            title: '🚨 VoiceWove 支付流水记录失败',
            level: 'error',
            desc: '权益已发放但支付流水未落库，对账/退款证据链缺失，需人工补记',
            fields: [
              { label: '产品', value: planType || 'unknown' },
              { label: '用户', value: userId },
              { label: '订单', value: obj.order?.id || obj.id || event.id },
            ],
            dedupeKey: `creem:payment-record-fail:${event.id}`,
          }).catch(() => {});
        }

        // 关键事件 → 飞书
        try {
          const payer = await prisma.users.findUnique({ where: { id: userId } });
          const amountYuan = ((obj.order?.amount ?? obj.amount ?? 0) / 100).toFixed(2);
          await notifyFeishu({
            title: '💰 VoiceWove 收款成功',
            level: 'info',
            desc: `用户完成一笔**真实支付**，权益已自动发放`,
            fields: [
              { label: '产品', value: planType || 'unknown' },
              { label: '金额', value: `$${amountYuan}` },
              { label: '用户', value: payer?.email || userId },
            ],
          });
        } catch {}

        break;
      }

      // 订阅续费
      case 'subscription.paid': {
        if (!userId) {
          notifyUnattributedPayment(event.eventType, event.id, obj);
          break;
        }
        const sub = obj;
        const endDate = sub.current_period_end_date
          ? new Date(sub.current_period_end_date)
          : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        await prisma.subscription.upsert({
          where: { userId },
          update: { status: 'active', endDate, startDate: new Date() },
          create: {
            userId,
            planType: metadata.planType || 'monthly',
            startDate: new Date(),
            endDate,
            status: 'active',
          },
        });
        // 续费必须同步刷新临时配额与有效期，否则上个周期的 quotaExpiry 过期后，
        // /api/user/plan 会把临时配额清零，续费用户将被 403 卡住无法合成
        await grantSubscriptionQuota(userId, metadata.planType || 'monthly', endDate);
        // 续费支付流水（退款回查依赖）
        try {
          const renewAmount = obj.order?.amount ?? obj.amount ?? 0;
          await prisma.payment.create({
            data: {
              userId,
              type: `${metadata.planType || 'monthly'}-renewal`,
              amount: Math.round((renewAmount / 100) * 100),
              status: 'paid',
              packageId: obj.order?.id || obj.id || event.id,
            },
          });
          // 关键事件 → 飞书：订阅续费成功
          notifyFeishu({
            title: '🔁 VoiceWove 订阅续费成功',
            level: 'info',
            desc: '订阅已续期，权益已自动续上',
            fields: [
              { label: '套餐', value: metadata.planType || 'monthly' },
              { label: '金额', value: `$${(renewAmount / 100).toFixed(2)}` },
              { label: '下次到期', value: endDate.toLocaleDateString('zh-CN') },
            ],
          }).catch(() => {});
        } catch (e) {
          console.error('续费流水记录失败:', e);
          notifyFeishu({
            title: '🚨 VoiceWove 续费流水记录失败',
            level: 'error',
            desc: '续费权益已续上但流水未落库，对账链缺失，需人工补记',
            fields: [
              { label: '用户', value: userId },
              { label: '订单', value: obj.order?.id || obj.id || event.id },
            ],
            dedupeKey: `creem:renew-record-fail:${event.id}`,
          }).catch(() => {});
        }
        break;
      }

      // 授权回收
      case 'subscription.expired':
      case 'subscription.canceled':
      case 'subscription.paused': {
        if (!userId) break;
        notifyFeishu({
          title: '📉 VoiceWove 订阅失效',
          level: 'warn',
          desc: `事件类型: ${event.eventType}`,
          fields: [{ label: '用户', value: userId }],
        }).catch(() => {});
        await prisma.subscription.updateMany({
          where: { userId },
          data: { status: 'expired' },
        });
        const quota = await prisma.characterQuota.findUnique({ where: { userId } });
        if (quota) {
          await prisma.characterQuota.update({
            where: { userId },
            data: {
              temporaryQuota: 0,
              quotaExpiry: null,
              usedCharacters: Math.min(quota.usedCharacters, quota.permanentQuota),
            },
          });
        }
        break;
      }

      // 退款 → 回收已发放权益（按订单号回查发放记录）
      case 'refund.created': {
        const checkoutId = obj.checkout_id || obj.checkout?.id || '';
        const orderId = obj.order_id || obj.order?.id || '';
        if (!checkoutId && !orderId) {
          console.warn('refund.created 缺少订单标识, event:', event.id);
          notifyFeishu({
            title: '🚨 VoiceWove 退款回收失败',
            level: 'error',
            desc: '退款事件缺少订单标识，无法定位发放记录，权益未回收，需人工处理',
            fields: [{ label: '事件 ID', value: event.id }],
            dedupeKey: `creem:refund-no-id:${event.id}`,
          }).catch(() => {});
          break;
        }
        // payment 表 packageId 存的是发放时的订单号
        const payment = await prisma.payment.findFirst({
          where: {
            OR: [{ packageId: orderId }, { packageId: checkoutId }],
            status: 'paid',
          },
          orderBy: { createdAt: 'desc' },
        });
        if (!payment) {
          console.warn('refund.created 未匹配到支付记录:', { orderId, checkoutId });
          notifyFeishu({
            title: '🚨 VoiceWove 退款回收失败',
            level: 'error',
            desc: '退款事件未匹配到本地支付记录，权益未回收，需人工核对',
            fields: [
              { label: '订单', value: orderId || checkoutId },
              { label: '事件 ID', value: event.id },
            ],
            dedupeKey: `creem:refund-no-match:${event.id}`,
          }).catch(() => {});
          break;
        }
        const planType = payment.type;
        const packClones = CLONE_PACKS[planType] ?? 0;
        const packChars = CHARACTER_PACKS[planType] ?? 0;

        await prisma.$transaction(async (tx) => {
          if (packClones > 0) {
            // 克隆包：扣回剩余额度，不为负
            const user = await tx.users.findUnique({ where: { id: payment.userId } });
            const remaining = Math.max(0, (user?.remaining_clones ?? 0) - packClones);
            await tx.users.update({
              where: { id: payment.userId },
              data: {
                remaining_clones: remaining,
                total_clones: Math.max(packClones, (user?.total_clones ?? 0) - packClones),
              },
            });
          } else if (packChars > 0) {
            // 字符包：扣回未用完的永久配额，不为负
            const quota = await tx.characterQuota.findUnique({ where: { userId: payment.userId } });
            if (quota) {
              await tx.characterQuota.update({
                where: { userId: payment.userId },
                data: { permanentQuota: Math.max(0, quota.permanentQuota - packChars) },
              });
            }
          } else if (planType === 'monthly' || planType === 'yearly') {
            // 订阅退款：立即失效订阅并清空临时配额
            await tx.subscription.updateMany({
              where: { userId: payment.userId },
              data: { status: 'expired' },
            });
            await tx.characterQuota.updateMany({
              where: { userId: payment.userId },
              data: { temporaryQuota: 0, quotaExpiry: null },
            });
          }
          await tx.payment.update({
            where: { id: payment.id },
            data: { status: 'refunded' },
          });
        });
        console.log('退款处理完成:', { paymentId: payment.id, userId: payment.userId, planType });
        try {
          const payer = await prisma.users.findUnique({ where: { id: payment.userId } });
          const amountYuan = ((payment.amount ?? obj.amount ?? obj.order?.amount ?? 0) / 100).toFixed(2); // 优先用本地流水（payload 字段结构不稳定）
          await notifyFeishu({
            title: '↩️ VoiceWove 退款处理完成',
            level: 'warn',
            desc: '用户订单已退款，权益已按订单回收',
            fields: [
              { label: '产品', value: planType },
              { label: '退款金额', value: `$${amountYuan}` },
              { label: '用户', value: payer?.email || payment.userId },
            ],
          });
        } catch {}
        break;
      }

      default:
        console.log('未处理的事件类型:', event.eventType);
        notifyFeishu({
          title: '⚠️ VoiceWove 支付 Webhook 未知事件',
          level: 'warn',
          desc: 'Creem 返回了未处理的事件类型，请确认是否需要新增处理逻辑',
          fields: [
            { label: '事件类型', value: event.eventType },
            { label: '事件 ID', value: event.id },
          ],
          dedupeKey: `creem:unknown:${event.eventType}`,
        }).catch(() => {});
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Creem webhook 处理错误:', error);
    notifyFeishu({
      title: '🚨 VoiceWove 支付 Webhook 处理错误',
      level: 'error',
      desc: '回调处理抛出异常，Creem 将自动重试；若持续失败，权益发放/回收会中断',
      fields: [
        { label: '事件', value: `${event?.eventType ?? 'unknown'} / ${event?.id ?? '—'}` },
        { label: '错误', value: error instanceof Error ? error.message.slice(0, 200) : String(error).slice(0, 200) },
      ],
      dedupeKey: `creem:handler-error:${event?.id ?? 'unknown'}`,
    }).catch(() => {});
    // 返回 500 让 Creem 重试（30s → 1m → 5m → 1h）
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
