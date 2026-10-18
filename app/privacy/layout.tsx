import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | VoiceWove',
  description: 'How VoiceWove handles your data: what we collect, third-party AI processors (MiniMax, DeepSeek), Google API Limited Use compliance, and your rights.',
  metadataBase: new URL('https://voicewove.com'),
  alternates: { canonical: 'https://voicewove.com/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
