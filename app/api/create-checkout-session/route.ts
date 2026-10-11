import { NextResponse } from 'next/server';
import { validateUserSession } from '@/lib/auth';
import { isCreemConfigured, createCheckout, CREEM_PRODUCTS } from '@/lib/creem';

// 支付入口：planType → Creem hosted checkout
// 合同：POST { planType } → { url }（前端直接跳转 url）
// planType 取值与 pricing 页一致：
//   订阅: monthly | yearly
//   字符包: tenThousandChars | millionChars | threeMillionChars
//   克隆包: clone1 | clone10 | clone50
// 支付完成后由 /api/webhook/creem 处理授权发放

export async function POST(req: Request) {
  try {
    if (!isCreemConfigured()) {
      return NextResponse.json(
        { error: '支付服务未配置（CREEM_API_KEY 缺失）' },
        { status: 500 }
      );
    }

    // 验证用户会话
    const sessionResult = await validateUserSession();
    if (!sessionResult.valid || !sessionResult.user) {
      return NextResponse.json(
        { error: sessionResult.error || '用户验证失败' },
        { status: sessionResult.status || 400 }
      );
    }

    const { planType } = await req.json();
    if (!planType || !CREEM_PRODUCTS[planType]) {
      return NextResponse.json(
        { error: `未知的支付类型: ${planType}` },
        { status: 400 }
      );
    }

    const productId = CREEM_PRODUCTS[planType];
    if (!productId) {
      return NextResponse.json(
        { error: `支付产品未配置: ${planType}` },
        { status: 500 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://voicewove.com';
    const isSubscription = planType === 'monthly' || planType === 'yearly';
    const isClone = planType.startsWith('clone');

    console.log('创建 Creem checkout:', { planType, productId });

    const checkout = await createCheckout({
      productId,
      successUrl: `${baseUrl}/profile?success=true&type=${isClone ? 'clone' : 'quota'}&planType=${planType}`,
      metadata: {
        userId: sessionResult.user.id,
        userEmail: sessionResult.user.email || '',
        planType,
        referenceId: sessionResult.user.id,
      },
      customerEmail: sessionResult.user.email || undefined,
    });

    console.log('Creem checkout 已创建:', checkout.id);
    return NextResponse.json({ url: checkout.checkout_url, id: checkout.id });
  } catch (error) {
    console.error('创建支付会话错误:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json(
      { error: `Error creating checkout session: ${errorMessage}` },
      { status: 500 }
    );
  }
}
