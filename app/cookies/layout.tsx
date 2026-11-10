import type { Metadata } from 'next';

const title = 'Cookie Policy';
const description = 'Read how VoiceWove uses cookies, local storage and analytics, and how to manage your browser preferences.';
const url = 'https://voicewove.com/cookies';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: { title: `${title} | VoiceWove`, description, url, siteName: 'VoiceWove', type: 'website' },
  twitter: { card: 'summary', title: `${title} | VoiceWove`, description },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
