import { NextResponse } from 'next/server';
import * as crypto from 'crypto';
import { prisma } from '@/lib/prisma';
import { notifyFeishu } from '@/lib/feishu-notify';

// 每日巡检日报（Vercel Cron：UTC 01:00 = 北京 09:00）
// 鉴权：Authorization: Bearer $CRON_SECRET（timingSafeEqual 比较）；未配置 CRON_SECRET 一律 403
// 内容：昨日核心指标（北京时区日界）+ 配置健康检查（只查配置与连通性，不真实调用付费 API）
// 汇总为一条飞书卡片，同时返回 JSON 便于手动 curl

export const dynamic = 'force-dynamic';

function verifyToken(authHeader: string | null, secret: string): boolean {
  const token = authHeader?.replace(/^Bearer\s+/i, '') || '';
  const a = Buffer.from(token);
  const b = Buffer.from(secret);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

/** 北京时区（UTC+8）昨日 [start, end) 的 UTC 时间区间 */
function yesterdayRange(): { start: Date; end: Date; label: string } {
  const BJ_OFFSET_MS = 8 * 60 * 60 * 1000;
  const bjNow = new Date(Date.now() + BJ_OFFSET_MS);
  const bjYesterdayStart = new Date(bjNow.getFullYear(), bjNow.getMonth(), bjNow.getDate() - 1);
  const start = new Date(bjYesterdayStart.getTime() - BJ_OFFSET_MS);
  const end = new Date(bjYesterdayStart.getTime() + 24 * 60 * 60 * 1000 - BJ_OFFSET_MS);
  const label = `${bjYesterdayStart.getFullYear()}-${String(bjYesterdayStart.getMonth() + 1).padStart(2, '0')}-${String(bjYesterdayStart.getDate()).padStart(2, '0')}`;
  return { start, end, label };
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'CRON_SECRET not configured' }, { status: 403 });
  }
  if (!verifyToken(req.headers.get('authorization'), secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { start, end, label } = yesterdayRange();
  const problems: string[] = [];

  // —— 昨日核心指标 ——
  let newUsers = 0;
  let paidCount = 0;
  let paidAmount = 0;
  let renewalCount = 0;
  let newClonedVoices = 0;
  let newDesignedVoices = 0;
  let dbOk = true;

  try {
    newUsers = await prisma.users.count({ where: { createdAt: { gte: start, lt: end } } });
    const paidAgg = await prisma.payment.aggregate({
      _count: { _all: true },
      _sum: { amount: true },
      where: { createdAt: { gte: start, lt: end }, status: 'paid', NOT: { type: { contains: 'renewal' } } },
    });
    paidCount = paidAgg._count._all;
    paidAmount = paidAgg._sum.amount ?? 0;
    renewalCount = await prisma.payment.count({
      where: { createdAt: { gte: start, lt: end }, status: 'paid', type: { contains: 'renewal' } },
    });
    newClonedVoices = await prisma.clonedVoice.count({ where: { createdAt: { gte: start, lt: end } } });
    newDesignedVoices = await prisma.designedVoice.count({ where: { createdAt: { gte: start, lt: end } } });
  } catch (error) {
    dbOk = false;
    problems.push(`数据库查询失败: ${error instanceof Error ? error.message.slice(0, 120) : 'unknown'}`);
  }

  // —— 配置健康检查（只查配置，不真实调用付费 API）——
  const configChecks: { key: string; label: string }[] = [
    { key: 'DATABASE_URL', label: '数据库' },
    { key: 'DEEPSEEK_API_KEY', label: 'DeepSeek（故事）' },
    { key: 'QWEN_API_KEY', label: '通义千问（播客稿）' },
    { key: 'MINIMAX_API_KEY', label: 'MiniMax（TTS/克隆）' },
    { key: 'MINIMAX_GROUP_ID', label: 'MiniMax Group' },
    { key: 'AWS_ACCESS_KEY_ID', label: 'AWS Polly' },
    { key: 'RESEND_API_KEY', label: 'Resend（邮件）' },
    { key: 'CREEM_API_KEY', label: 'Creem（支付）' },
    { key: 'CREEM_WEBHOOK_SECRET', label: 'Creem Webhook' },
    { key: 'FEISHU_WEBHOOK_URL', label: '飞书通知' },
  ];
  const missingConfigs = configChecks.filter((c) => !process.env[c.key]);
  missingConfigs.forEach((c) => problems.push(`${c.label} 配置缺失（${c.key}）`));

  const level = problems.some((p) => p.startsWith('数据库查询失败'))
    ? 'error'
    : problems.length > 0
      ? 'warn'
      : 'info';

  // —— 汇总卡片（一天一条）——
  const summary =
    `📊 **VoiceWove 每日巡检 · ${label}**\n\n` +
    `**昨日核心指标**\n` +
    `- 新注册：${newUsers} 人\n` +
    `- 新购收款：${paidCount} 笔 / $${(paidAmount / 100).toFixed(2)}\n` +
    `- 订阅续费：${renewalCount} 笔\n` +
    `- 新增音色克隆：${newClonedVoices} 次\n` +
    `- 新增音色设计：${newDesignedVoices} 次\n\n` +
    `**健康检查**\n` +
    (problems.length === 0
      ? `- 全部正常 ✓（数据库${dbOk ? '' : '❌'}、关键配置 10 项齐全）`
      : problems.map((p) => `- ⚠️ ${p}`).join('\n'));

  await notifyFeishu({
    title: problems.length === 0 ? `📊 VoiceWove 巡检日报 · ${label} · 正常` : `📊 VoiceWove 巡检日报 · ${label} · 有异常`,
    level,
    desc: summary,
    dedupeKey: `inspection:${label}`,
  }).catch(() => {});

  return NextResponse.json({
    date: label,
    metrics: { newUsers, paidCount, paidAmountUsd: paidAmount / 100, renewalCount, newClonedVoices, newDesignedVoices },
    problems,
    ok: problems.length === 0,
  });
}
