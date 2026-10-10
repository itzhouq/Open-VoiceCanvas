import fetch from 'node-fetch';

// 从环境变量获取Discord配置
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || '';

// 验证是否配置了Discord Webhook URL
const isDiscordConfigured = !!DISCORD_WEBHOOK_URL;

/**
 * 确保值为字符串
 * @param value 任意值
 * @returns 字符串形式的值
 */
const ensureString = (value: any): string => {
  if (value === null || value === undefined) return '未提供';
  return String(value);
};

/**
 * 发送新用户注册通知到Discord
 * @param user 用户信息
 */
export async function sendUserRegistrationNotification(user: { 
  id: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}) {
  if (!isDiscordConfigured) return;

  try {
    const embed = {
      title: '🎉 新用户注册',
      color: 0x7289DA,
      description: `欢迎新用户加入VoiceWove！`,
      fields: [
        { name: '用户ID', value: ensureString(user.id), inline: true },
        { name: '用户名', value: ensureString(user.name), inline: true },
        { name: '邮箱', value: ensureString(user.email), inline: true }
      ],
      thumbnail: {
        url: user.image || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
      },
      timestamp: new Date().toISOString()
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'VoiceWove注册通知',
        embeds: [embed],
      }),
    });

    console.log('已发送用户注册通知到Discord');
  } catch (error) {
    console.error('发送Discord通知失败:', error);
  }
}

/**
 * 发送用户订阅通知到Discord
 * @param subscription 订阅信息
 */
export async function sendSubscriptionNotification(subscription: {
  userId: string;
  userName?: string | null | undefined;
  planName: string;
  price?: number;
  currency?: string;
  interval?: string;
  status: string;
}) {
  if (!isDiscordConfigured) return;

  try {
    const embed = {
      title: '💎 新订阅',
      color: 0x2ECC71,
      description: `用户已订阅VoiceWove服务！`,
      fields: [
        { name: '用户ID', value: ensureString(subscription.userId), inline: true },
        { name: '用户名', value: ensureString(subscription.userName), inline: true },
        { name: '套餐', value: ensureString(subscription.planName), inline: true },
        { name: '价格', value: subscription.price ? 
          `${subscription.price} ${subscription.currency || 'CNY'}/${subscription.interval || '月'}` : 
          '未提供', 
          inline: true 
        },
        { name: '状态', value: ensureString(subscription.status), inline: true }
      ],
      timestamp: new Date().toISOString()
    };

    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'VoiceWove订阅通知',
        embeds: [embed],
      }),
    });

    console.log('已发送用户订阅通知到Discord');
  } catch (error) {
    console.error('发送Discord通知失败:', error);
  }
} 