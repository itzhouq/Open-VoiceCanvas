import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notifyFeishu } from '@/lib/feishu-notify';

const MINIMAX_API_KEY = process.env.MINIMAX_API_KEY;
const MINIMAX_GROUP_ID = process.env.MINIMAX_GROUP_ID;

export async function POST(req: Request) {
  try {
    // 检查用户是否登录
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 });
    }

    if (!MINIMAX_API_KEY || !MINIMAX_GROUP_ID) {
      console.error('MiniMax API credentials not configured');
      notifyFeishu({
        title: '🚨 VoiceWove 播客音频不可用',
        level: 'error',
        desc: 'MINIMAX_API_KEY/GROUP_ID 未配置，播客音频生成接口全部失败',
        dedupeKey: 'podcast-audio:not-configured',
      }).catch(() => {});
      return NextResponse.json({ error: 'MiniMax API 未配置' }, { status: 500 });
    }

    const { text, speaker, voiceId, language = 'zh-CN' } = await req.json();

    if (!text || text.trim().length === 0) {
      return NextResponse.json({ error: '文本内容不能为空' }, { status: 400 });
    }

    if (!speaker || !['host', 'guest'].includes(speaker)) {
      return NextResponse.json({ error: '说话人类型无效' }, { status: 400 });
    }

    // 使用传入的音色ID，如果没有则使用默认音色
    const selectedVoiceId = voiceId || (speaker === 'host' ? 'presenter_male' : 'presenter_female');

    // 使用高质量模型用于播客生成
    const requestBody = {
      model: "speech-2.6-hd",
      text,
      stream: false,
      voice_setting: {
        voice_id: selectedVoiceId,
        speed: 1.0,
        vol: 1.0,
        pitch: 0
      },
      audio_setting: {
        sample_rate: 32000,
        bitrate: 128000,
        format: "mp3",
        channel: 1
      }
    };

    console.log('Generating podcast audio with MiniMax:', {
      speaker,
      voiceId: selectedVoiceId,
      textLength: text.length
    });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000); // 30秒超时

    const url = `https://api.minimax.chat/v1/t2a_v2?GroupId=${MINIMAX_GROUP_ID}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MINIMAX_API_KEY}`,
          'MM-Api-Key': MINIMAX_API_KEY || ''
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('MiniMax API error:', errorText);
        throw new Error(`MiniMax API error: ${response.status}`);
      }

      const jsonResponse = await response.json();

      if (jsonResponse.base_resp?.status_code === 0 && jsonResponse.data?.audio) {
        // 将Base64音频数据转换为Buffer
        const audioBuffer = Buffer.from(jsonResponse.data.audio, 'hex');

        console.log('Podcast audio generated successfully:', {
          speaker,
          audioSize: audioBuffer.length
        });

        return new NextResponse(new Uint8Array(audioBuffer), {
          headers: {
            'Content-Type': 'audio/mp3',
            'Content-Length': audioBuffer.length.toString(),
          },
        });
      }

      throw new Error(jsonResponse.base_resp?.status_msg || '语音生成失败');

    } catch (error: any) {
      clearTimeout(timeout);

      if (error.name === 'AbortError') {
        console.error('MiniMax API request timeout');
        notifyFeishu({
          title: '❌ VoiceWove 播客音频生成超时',
          level: 'error',
          desc: 'MiniMax 请求 30 秒超时，用户未获得音频',
          dedupeKey: 'podcast-audio:timeout',
        }).catch(() => {});
        return NextResponse.json({ error: '音频生成超时，请重试' }, { status: 408 });
      }

      console.error('MiniMax API request failed:', error);
      throw error;
    }

  } catch (error) {
    console.error('Podcast audio generation error:', error);
    notifyFeishu({
      title: '❌ VoiceWove 播客音频生成失败',
      level: 'error',
      desc: '播客音频接口抛出异常（MiniMax 调用失败/内部错误）',
      fields: [
        { label: '错误', value: error instanceof Error ? error.message.slice(0, 200) : String(error).slice(0, 200) },
      ],
      dedupeKey: 'podcast-audio:handler-error',
    }).catch(() => {});
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '音频生成失败' },
      { status: 500 }
    );
  }
}
