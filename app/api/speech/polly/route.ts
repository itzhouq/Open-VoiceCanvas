import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SynthesizeSpeechCommand } from '@aws-sdk/client-polly';
import type { LanguageCode, VoiceId } from '@aws-sdk/client-polly';
import { pollyClient } from '@/lib/aws-config';
import { rateLimit } from '@/lib/rate-limit';
import { languageCodeMap } from '@/lib/polly-service';

export const dynamic = 'force-dynamic';

// 服务端 AWS Polly 合成代理
// AWS 凭据仅保存在服务端环境变量中，浏览器端永远接触不到

const BASE_CONCURRENT_LIMIT = 3;
const VIP_MULTIPLIER = 2;
const ANONYMOUS_LIMIT = 1;
const MAX_TEXT_LENGTH = 100000; // 与客户端 SERVICE_LIMITS.aws 保持一致

const limiter = rateLimit({
  interval: 1000,
  getMaxRequests: async (userId: string) => {
    if (userId === 'anonymous') return ANONYMOUS_LIMIT;

    try {
      const user = await prismaFindUserByEmail(userId);
      const isVip = user?.subscription &&
        new Date(user.subscription.endDate) > new Date() &&
        user.subscription.status === 'active';
      return isVip ? BASE_CONCURRENT_LIMIT * VIP_MULTIPLIER : BASE_CONCURRENT_LIMIT;
    } catch {
      return BASE_CONCURRENT_LIMIT;
    }
  }
});

// 延迟导入 prisma，避免在数据库不可用时阻塞模块加载
async function prismaFindUserByEmail(email: string) {
  const { prisma } = await import('@/lib/prisma');
  return prisma.users.findFirst({
    where: { email },
    include: { subscription: true }
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.email || 'anonymous';

  await limiter.acquire(userId);

  try {
    const body = await req.json();
    const { text, language, voiceId, engine = 'standard' } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: '文本内容不能为空' }, { status: 400 });
    }

    if (text.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: `文本长度不能超过 ${MAX_TEXT_LENGTH} 字符` },
        { status: 400 }
      );
    }

    if (!voiceId || typeof voiceId !== 'string') {
      return NextResponse.json({ error: '语音ID不能为空' }, { status: 400 });
    }

    if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
      console.error('AWS Polly 凭据未配置');
      return NextResponse.json({ error: '语音合成服务未配置' }, { status: 500 });
    }

    const languageCode = (languageCodeMap as Record<string, LanguageCode>)[language] || languageCodeMap['en-US'];
    const finalEngine = engine === 'neural' ? 'neural' : 'standard';

    const command = new SynthesizeSpeechCommand({
      Engine: finalEngine,
      LanguageCode: languageCode,
      OutputFormat: 'mp3',
      SampleRate: '24000',
      Text: text,
      TextType: 'text',
      VoiceId: voiceId as VoiceId
    });

    const response = await pollyClient.send(command);

    if (!response.AudioStream) {
      throw new Error('No audio stream returned');
    }

    const audioBytes = await response.AudioStream.transformToByteArray();

    return new NextResponse(Buffer.from(audioBytes), {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'private, max-age=3600'
      }
    });
  } catch (error) {
    console.error('Polly synthesis error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '语音合成失败' },
      { status: 500 }
    );
  } finally {
    limiter.release(userId);
  }
}
