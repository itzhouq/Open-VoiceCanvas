import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/profile', '/app/', '/auth/'],
      },
    ],
    sitemap: 'https://voicewove.com/sitemap.xml',
  };
}
