// Creem (Merchant of Record) 支付集成 —— REST 客户端
// 测试环境: https://test-api.creem.io ; 生产: https://api.creem.io
// Key 前缀: creem_test_ / creem_

const API_BASE = process.env.CREEM_TEST_MODE === 'true'
  ? 'https://test-api.creem.io'
  : 'https://api.creem.io';

export interface CreemProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  billingType: 'onetime' | 'recurring';
}

// planType → Creem 产品 ID 映射（与前端 pricing 页的 type 对齐）
export const CREEM_PRODUCTS: Record<string, string> = {
  monthly: process.env.CREEM_PRODUCT_MONTHLY || '',
  yearly: process.env.CREEM_PRODUCT_YEARLY || '',
  tenThousandChars: process.env.CREEM_PRODUCT_10K || '',
  millionChars: process.env.CREEM_PRODUCT_1M || '',
  threeMillionChars: process.env.CREEM_PRODUCT_3M || '',
  clone1: process.env.CREEM_PRODUCT_CLONE_1 || '',
  clone10: process.env.CREEM_PRODUCT_CLONE_10 || '',
  clone50: process.env.CREEM_PRODUCT_CLONE_50 || '',
};

// The public catalog and payment fulfillment share the same entitlement maps.
export { SUBSCRIPTION_PLANS, CHARACTER_PACKS, CLONE_PACKS } from '@/lib/product-catalog';

export function isCreemConfigured(): boolean {
  return !!process.env.CREEM_API_KEY;
}

async function creemFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const apiKey = process.env.CREEM_API_KEY;
  if (!apiKey) {
    throw new Error('CREEM_API_KEY is not configured');
  }
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data as any)?.message;
    throw new Error(
      `Creem API ${res.status}: ${Array.isArray(msg) ? msg.join('; ') : msg || 'unknown error'}`
    );
  }
  return data as T;
}

export interface CreemCheckoutResponse {
  id: string;
  checkout_url: string;
  status?: string;
}

export async function createCheckout(params: {
  productId: string;
  successUrl: string;
  metadata: Record<string, string>;
  customerEmail?: string;
}): Promise<CreemCheckoutResponse> {
  const body: Record<string, unknown> = {
    product_id: params.productId,
    success_url: params.successUrl,
    metadata: params.metadata,
  };
  if (params.customerEmail) {
    body.customer = { email: params.customerEmail };
  }
  return creemFetch<CreemCheckoutResponse>('/v1/checkouts', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
