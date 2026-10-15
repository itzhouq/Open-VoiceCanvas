'use client';

import Script from 'next/script';

const NEXT_PUBLIC_CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export function CfWebAnalytics() {
  // 未配置 token 则零注入（Cloudflare Web Analytics 无 cookie，无需同意门控）
  if (!NEXT_PUBLIC_CF_BEACON_TOKEN) {
    return null;
  }

  return (
    <Script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token: NEXT_PUBLIC_CF_BEACON_TOKEN })}
      strategy="afterInteractive"
    />
  );
}
