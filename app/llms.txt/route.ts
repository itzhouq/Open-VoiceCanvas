import { getPublicPageIndex } from '@/lib/public-product-summary';

export const dynamic = 'force-dynamic';

export function GET() {
  return new Response(getPublicPageIndex(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
}
