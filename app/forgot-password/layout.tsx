import type { Metadata } from 'next';

const title = 'Forgot Password';
const description = 'Request a password reset link for your VoiceWove account.';
const url = 'https://voicewove.com/forgot-password';

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
