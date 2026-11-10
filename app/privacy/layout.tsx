import type { Metadata } from 'next';

const title = 'Privacy Policy';
const description = 'Read how VoiceWove collects and handles account, text and voice data, including service providers and options for contacting us about your data.';
const url = 'https://voicewove.com/privacy';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: { title: `${title} | VoiceWove`, description, url, siteName: 'VoiceWove', type: 'website' },
  twitter: { card: 'summary', title: `${title} | VoiceWove`, description },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
