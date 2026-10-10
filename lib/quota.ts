import { prisma } from '@/lib/prisma';

// 试用套餐参数（可通过环境变量覆盖）
export const TRIAL_TEMPORARY_QUOTA = parseInt(process.env.TRIAL_TEMPORARY_QUOTA || '10000', 10);
export const TRIAL_DAYS = parseInt(process.env.TRIAL_DAYS || '7', 10);

export function trialExpiry(): Date {
  return new Date(Date.now() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
}

// 确保用户存在试用配额记录（首次访问时懒创建）
export async function ensureTrialQuota(userId: string) {
  const existing = await prisma.characterQuota.findUnique({ where: { userId } });
  if (existing) return existing;
  return prisma.characterQuota.create({
    data: {
      userId,
      permanentQuota: 0,
      temporaryQuota: TRIAL_TEMPORARY_QUOTA,
      usedCharacters: 0,
      quotaExpiry: trialExpiry(),
      lastUpdated: new Date(),
    },
  });
}

export interface QuotaState {
  isLoggedIn: boolean;
  isVip: boolean;
  remaining: number;
}

// 读取用户配额状态（含临时配额有效期判断）
export async function getQuotaState(email: string | null | undefined): Promise<QuotaState> {
  if (!email) return { isLoggedIn: false, isVip: false, remaining: 0 };

  const user = await prisma.users.findFirst({
    where: { email },
    include: { subscription: true, characterQuota: true },
  });
  if (!user) return { isLoggedIn: false, isVip: false, remaining: 0 };

  const now = new Date();
  const sub = user.subscription;
  const isVip = !!(sub && new Date(sub.endDate) > now && sub.status === 'active');

  const quota = user.characterQuota ?? (await ensureTrialQuota(user.id));
  const temporaryValid = !quota.quotaExpiry || new Date(quota.quotaExpiry) > now;
  const total = quota.permanentQuota + (temporaryValid ? quota.temporaryQuota : 0);

  return { isLoggedIn: true, isVip, remaining: Math.max(0, total - quota.usedCharacters) };
}

type AccessResult = { ok: true } | { ok: false; status: number; error: string };

// 服务端合成统一门禁：默认要求登录 + 剩余配额预检
// 设置 ALLOW_ANONYMOUS_TTS=true 可开放匿名试用（默认关闭）
export async function assertSynthesisAccess(
  email: string | null | undefined,
  characters: number
): Promise<AccessResult> {
  const allowAnonymous = process.env.ALLOW_ANONYMOUS_TTS === 'true';

  if (!email) {
    if (!allowAnonymous) {
      return { ok: false, status: 401, error: '请先登录后再使用语音合成服务' };
    }
    return { ok: true };
  }

  const { remaining } = await getQuotaState(email);

  if (remaining <= 0) {
    return { ok: false, status: 403, error: '字符配额已用尽，请升级套餐或购买字符包' };
  }

  if (characters > remaining) {
    return {
      ok: false,
      status: 403,
      error: `剩余字符配额不足（剩余 ${remaining}，本次需要 ${characters}），请升级套餐`,
    };
  }

  return { ok: true };
}
