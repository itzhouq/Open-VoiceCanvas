import type { Metadata } from 'next';
import { PRODUCT_PRICES_USD } from '@/lib/product-catalog';
import { TRIAL_OFFER } from '@/lib/trial-offer';

const title = 'Pricing — Trial, Subscriptions and One-Time Packs';
const description = `Try ${TRIAL_OFFER.characters.toLocaleString('en-US')} synthesis characters for ${TRIAL_OFFER.days} days. Monthly plan: $${PRODUCT_PRICES_USD.monthly.toFixed(2)}. Character packs from $${PRODUCT_PRICES_USD.tenThousandChars}; separate clone/design credits from $${PRODUCT_PRICES_USD.clone1}.`;
const url = 'https://voicewove.com/pricing';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: { title: `${title} | VoiceWove`, description, url, siteName: 'VoiceWove', type: 'website' },
  twitter: { card: 'summary', title: `${title} | VoiceWove`, description },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
