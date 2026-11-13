import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from "next/font/google";
import { Providers } from "@/components/providers";
import { getServerSession } from "next-auth";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { GoogleAnalytics } from "@/components/google-analytics";
import { UmamiAnalytics } from "@/components/umami-analytics";
import { CfWebAnalytics } from "@/components/cf-web-analytics";
import { MicrosoftClarity } from "@/components/microsoft-clarity";
import { TRIAL_OFFER } from '@/lib/trial-offer';
import { PRODUCT_PRICES_USD } from '@/lib/product-catalog';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora", weight: ["600", "700", "800"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

// Homepage-only metadata: every other route defines its own metadata, so the
// root defaults below surface on / alone.
const homeTitle = 'Voice Cloning & Text to Speech with AI Voices | VoiceWove';
const homeDescription = 'Clone a voice you own from a 10-second recording, narrate stories with a cast of AI voices, and turn text into speech. 10,000 free characters, no card.';

const ORG_WEB_APP_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://voicewove.com/#organization',
      name: 'VoiceWove',
      url: 'https://voicewove.com',
      logo: 'https://voicewove.com/images/logo.png',
      sameAs: ['https://x.com/itzhouq2026'],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://voicewove.com/#website',
      url: 'https://voicewove.com',
      name: 'VoiceWove',
      publisher: { '@id': 'https://voicewove.com/#organization' },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://voicewove.com/#app',
      name: 'VoiceWove',
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web',
      url: 'https://voicewove.com',
      description: 'Browser-based text-to-speech, multi-character story narration, two-host podcasts and voice cloning. Audio formats and voice availability depend on the tool.',
      offers: [
        { '@type': 'Offer', name: 'Monthly subscription', price: PRODUCT_PRICES_USD.monthly.toFixed(2), priceCurrency: 'USD', url: 'https://voicewove.com/pricing' },
        { '@type': 'Offer', name: 'Annual subscription', price: PRODUCT_PRICES_USD.yearly.toFixed(2), priceCurrency: 'USD', url: 'https://voicewove.com/pricing' },
        { '@type': 'Offer', name: 'One voice cloning or design credit', price: PRODUCT_PRICES_USD.clone1.toFixed(2), priceCurrency: 'USD', url: 'https://voicewove.com/pricing#clone-packages' },
      ],
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://voicewove.com'),
  title: {
    default: homeTitle,
    template: '%s | VoiceWove'
  },
  description: homeDescription,
  keywords: ['text to speech', 'AI story voiceover', 'multi-character narration', 'AI podcast generator', 'voice cloning', 'voice design'],
  authors: [{ name: 'itzhouq', url: 'https://itzhouq.cn' }],
  creator: 'itzhouq',
  publisher: 'itzhouq',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://voicewove.com',
    title: homeTitle,
    description: homeDescription,
    siteName: 'VoiceWove',
    images: [
      {
        url: 'https://voicewove.com/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VoiceWove - AI Voice Synthesis & Cloning Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: homeTitle,
    description: homeDescription,
    images: {
      url: 'https://voicewove.com/images/og-image.png',
      alt: 'VoiceWove - AI Voice Synthesis & Cloning Platform',
      width: 1200,
      height: 630
    },
    creator: '@itzhouq2026',
    site: '@itzhouq2026',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://voicewove.com'
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_WEB_APP_SCHEMA) }}
        />
        <GoogleAnalytics />
        <UmamiAnalytics />
        <CfWebAnalytics />
        <MicrosoftClarity />
      </head>
      <body className={`${inter.className} ${sora.variable}`}>
        <Providers session={session} trialOffer={TRIAL_OFFER}>
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}