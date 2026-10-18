import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | VoiceWove',
  description: 'Terms for using VoiceWove: accounts, subscriptions and one-time packs, acceptable use (including voice-cloning consent rules), and commercial rights for generated audio.',
  metadataBase: new URL('https://voicewove.com'),
  alternates: { canonical: 'https://voicewove.com/terms' },
  robots: { index: true, follow: true },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children
}
