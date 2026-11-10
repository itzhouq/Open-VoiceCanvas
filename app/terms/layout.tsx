import type { Metadata } from 'next';

const title = 'Terms of Service';
const description = 'Read the terms for VoiceWove accounts, payments, generated audio, voice-cloning consent and acceptable use.';
const url = 'https://voicewove.com/terms';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: { title: `${title} | VoiceWove`, description, url, siteName: 'VoiceWove', type: 'website' },
  twitter: { card: 'summary', title: `${title} | VoiceWove`, description },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
