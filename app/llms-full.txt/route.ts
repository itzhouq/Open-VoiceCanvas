import { getPublicProductSummary } from '@/lib/public-product-summary';

export const dynamic = 'force-dynamic';

export function GET() {
  return new Response(getPublicProductSummary(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=300' },
  });
}
