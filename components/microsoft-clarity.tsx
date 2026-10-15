'use client';

import Script from 'next/script';

const NEXT_PUBLIC_CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function MicrosoftClarity() {
  // 未配置 ID 则零注入（Clarity 无 cookie，热力图+会话回放，无需同意门控）
  if (!NEXT_PUBLIC_CLARITY_ID) {
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
