import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | VoiceWove',
  description: 'How VoiceWove uses cookies and local storage for sessions and analytics (Cloudflare Web Analytics, Microsoft Clarity — both cookieless).',
  metadataBase: new URL('https://voicewove.com'),
  alternates: { canonical: 'https://voicewove.com/cookies' },
  robots: { index: true, follow: true },
}

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children
}
