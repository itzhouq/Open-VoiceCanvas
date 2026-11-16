import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Account pages must remain crawlable so their noindex metadata can be read.
        disallow: ['/api/'],
      },
      // Explicit AI-crawler opt-ins. Same shape as the wildcard rule so
      // Disallow: /api/ stays effective for every bot (longest-match wins).
      { userAgent: 'GPTBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'OAI-SearchBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: ['/api/'] },
      { userAgent: 'ClaudeBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Claude-User', allow: '/', disallow: ['/api/'] },
      { userAgent: 'PerplexityBot', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Google-Extended', allow: '/', disallow: ['/api/'] },
      { userAgent: 'Applebot-Extended', allow: '/', disallow: ['/api/'] },
      { userAgent: 'CCBot', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: 'https://voicewove.com/sitemap.xml',
  };
}
