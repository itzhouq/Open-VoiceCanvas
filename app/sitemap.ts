import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://voicewove.com';
  const now = new Date();

  const routes: {
    path: string;
    priority: number;
    changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  }[] = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/ai-story-voiceover', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/story', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/cloning', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/design', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/podcast', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.2, changeFrequency: 'yearly' },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
