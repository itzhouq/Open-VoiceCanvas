import { NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { SUBSCRIPTION_PLANS, CHARACTER_PACKS, CLONE_PACKS } from '@/lib/creem';

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
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  if (!verifySignature(rawBody, signature, secret)) {
    console.error('Creem webhook 签名验证失败');
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
        if (!userId) break;
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
          // 订阅期间临时配额
          await prisma.characterQuota.upsert({
            where: { userId },
            update: {
              temporaryQuota: plan.characters,
              quotaExpiry: endDate,
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
              packageId: obj.product?.id || obj.id || event.id,
            },
          });
        } catch (paymentError) {
          console.error('支付流水记录失败:', paymentError);
        }
        break;
      }

      // 订阅续费
      case 'subscription.paid': {
        if (!userId) break;
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
        break;
      }

      // 授权回收
      case 'subscription.expired':
      case 'subscription.canceled':
      case 'subscription.paused': {
        if (!userId) break;
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

      default:
        console.log('未处理的事件类型:', event.eventType);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Creem webhook 处理错误:', error);
    // 返回 500 让 Creem 重试（30s → 1m → 5m → 1h）
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
