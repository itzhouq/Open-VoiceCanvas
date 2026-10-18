import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — Free Trial, $5.99/mo Pro Plan & One-Time Packs | VoiceWove',
  description: 'Start free with 10,000 characters. Continue with a subscription from $5.99/month or one-time character packs from $6 and voice-clone packs from $3 that never expire.',
  metadataBase: new URL('https://voicewove.com'),
  alternates: { canonical: 'https://voicewove.com/pricing' },
  openGraph: {
    title: 'VoiceWove Pricing — Free Trial, $5.99/mo & One-Time Packs',
    description: '7-day free trial (10,000 characters, no credit card). Subscriptions from $5.99/mo; one-time packs from $3 that never expire.',
    url: 'https://voicewove.com/pricing',
    siteName: 'VoiceWove',
    type: 'website',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
