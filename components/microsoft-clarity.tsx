'use client';

import Script from 'next/script';

const NEXT_PUBLIC_CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
// 生产域名白名单：Vercel preview 构建的 NODE_ENV=production 会绕过 isProduction 门控，
// Clarity 脚本在 preview 域名也会跑（18 个 bot 会话全是它贡献的）——hostname 不匹配直接零注入
const PROD_HOSTNAME = (() => {
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://voicewove.com';
  try {
    return new URL(site).hostname;
  } catch {
    return 'voicewove.com';
  }
})();

export function MicrosoftClarity() {
  // 未配置 ID 则零注入（Clarity 无 cookie，热力图+会话回放，无需同意门控）
  if (!NEXT_PUBLIC_CLARITY_ID) {
    return null;
  }
  // hostname 门控：只在生产域名上报（client 与 SSR 双侧判定，preview 返回 null 不加载脚本）
  if (typeof window !== 'undefined' && window.location.hostname !== PROD_HOSTNAME) {
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function (c, l, a, r, i, t, y) {
          c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
          t = l.createElement(r);
          t.async = 1;
          t.src = 'https://www.clarity.ms/tag/' + i;
          y = l.getElementsByTagName(r)[0];
          y.parentNode.insertBefore(t, y);
        })(window, document, 'clarity', 'script', '${NEXT_PUBLIC_CLARITY_ID}');
      `}
    </Script>
  );
}
