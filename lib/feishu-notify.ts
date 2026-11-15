import * as crypto from 'crypto';

const WEBHOOK_URL = process.env.FEISHU_WEBHOOK_URL;
const SECRET = process.env.FEISHU_WEBHOOK_SECRET;

export type NotifyLevel = 'info' | 'warn' | 'error';

const LEVEL_COLOR: Record<NotifyLevel, string> = {
  info: 'green',
  warn: 'orange',
  error: 'red',
};

// dedupeKey 内存去重：同一 key 在 TTL 内只发一条（serverless 多实例下为近似去重，足够抑制重复告警）
const DEDUPE_TTL_MS = 5 * 60 * 1000;
const dedupeMap = new Map<string, number>();

function isDuplicate(key: string): boolean {
  const now = Date.now();
  // 顺手清理过期项，避免 Map 无限增长
  for (const [k, expireAt] of dedupeMap) {
    if (expireAt <= now) dedupeMap.delete(k);
  }
  const expireAt = dedupeMap.get(key);
  if (expireAt && expireAt > now) return true;
  dedupeMap.set(key, now + DEDUPE_TTL_MS);
  return false;
}

/** 邮箱掩码：a***@domain.com */
export function maskEmail(email?: string | null): string {
  if (!email) return '—';
  const [local, domain] = email.split('@');
  if (!domain) return '***';
  const head = local.slice(0, 1);
  return `${head}***@${domain}`;
}

/**
 * 飞书自定义机器人推送（服务端，fire-and-forget，失败静默不阻塞主流程）
 * 与本地 feishu-notify CLI 同一 webhook，卡片风格对齐。
 */
export async function notifyFeishu(opts: {
  title: string;
  level?: NotifyLevel;
  desc?: string;
  fields?: { label: string; value: string }[];
  /** 相同 key 在 5 分钟内只发一条，用于抑制重复告警（如配置缺失、同一 webhook 连续异常） */
  dedupeKey?: string;
}): Promise<void> {
  if (!WEBHOOK_URL) return;
  if (opts.dedupeKey && isDuplicate(opts.dedupeKey)) return;
  try {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const body: Record<string, unknown> = {
      timestamp,
      msg_type: 'interactive',
      card: {
        header: {
          title: { tag: 'plain_text', content: opts.title },
          template: LEVEL_COLOR[opts.level ?? 'info'],
        },
        elements: [],
      },
    };

    // 签名（secret 存在时启用）
    if (SECRET) {
      const stringToSign = `${timestamp}\n${SECRET}`;
      const sign = crypto
        .createHmac('sha256', stringToSign)
        .update('')
        .digest('base64');
      body.sign = sign;
    }

    const elements: Record<string, unknown>[] = [];
    if (opts.desc) {
      elements.push({
        tag: 'div',
        text: { tag: 'lark_md', content: opts.desc },
      });
    }
    if (opts.fields?.length) {
      elements.push({
        tag: 'div',
        fields: opts.fields.map((f) => ({
          is_short: true,
          text: { tag: 'lark_md', content: `**${f.label}**\n${f.value}` },
        })),
      });
    }
    elements.push({
      tag: 'note',
      elements: [
        {
          tag: 'plain_text',
          content: `VoiceWove · ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`,
        },
      ],
    });
    (body.card as Record<string, unknown>).elements = elements;

    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (e) {
    console.error('飞书推送失败（不影响主流程）:', e);
  }
}
