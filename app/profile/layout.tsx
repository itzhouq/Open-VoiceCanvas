import type { Metadata } from 'next';

const title = 'Your Account';
const description = 'Manage your VoiceWove account and usage.';
const url = 'https://voicewove.com/profile';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  openGraph: { title: `${title} | VoiceWove`, description, url, siteName: 'VoiceWove', type: 'website' },
  twitter: { card: 'summary', title: `${title} | VoiceWove`, description },
};

export default function AccountPageLayout({ children }: { children: React.ReactNode }) {
  return children;
}
