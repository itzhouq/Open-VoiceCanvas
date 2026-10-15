import * as crypto from 'crypto';

const WEBHOOK_URL = process.env.FEISHU_WEBHOOK_URL;
const SECRET = process.env.FEISHU_WEBHOOK_SECRET;

export type NotifyLevel = 'info' | 'warn' | 'error';

const LEVEL_COLOR: Record<NotifyLevel, string> = {
  info: 'green',
  warn: 'orange',
  error: 'red',
};

/**
 * 飞书自定义机器人推送（服务端，fire-and-forget，失败静默不阻塞主流程）
 * 与本地 feishu-notify CLI 同一 webhook，卡片风格对齐。
 */
export async function notifyFeishu(opts: {
  title: string;
  level?: NotifyLevel;
  desc?: string;
  fields?: { label: string; value: string }[];
}): Promise<void> {
  if (!WEBHOOK_URL) return;
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
