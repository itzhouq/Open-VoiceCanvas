import type { Metadata } from 'next';
import Link from 'next/link';
import { TRIAL_OFFER } from '@/lib/trial-offer';

const title = 'Text to Speech — Paste or Upload Text, Get MP3';
const description = 'Turn pasted text or TXT and Markdown files into speech. Choose a voice, adjust playback speed and download MP3 audio in the VoiceWove studio.';
const url = 'https://voicewove.com/app';
const image = '/images/studio-og.png';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: `${title} | VoiceWove`,
    description,
    url,
    siteName: 'VoiceWove',
    type: 'website',
    images: [{ url: image, width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | VoiceWove`,
    description,
    images: [image],
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section aria-labelledby="app-overview" className="border-b border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h1 id="app-overview" className="text-2xl font-bold text-foreground">Text to Speech Studio</h1>
          <p className="mt-2 max-w-4xl text-muted-foreground">Paste your text or upload a TXT or Markdown file, choose an available voice and language, then generate speech and download an MP3.</p>

        </div>
      </section>
      {children}
      <section aria-labelledby="app-details" className="border-t border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h2 id="app-details" className="text-lg font-semibold">Input, output and account requirements</h2>
          <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
            <div>
              <dt className="font-semibold text-foreground">Input</dt>
              <dd className="mt-1 text-muted-foreground">Pasted text, .txt or .md files. PDF and Word imports are not supported.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Output</dt>
              <dd className="mt-1 text-muted-foreground">Audio playback and MP3 download. Voice and control options depend on the selected service.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Limits</dt>
              <dd className="mt-1 text-muted-foreground">The text field shows the current input limit. Generating speech uses your available synthesis characters.</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">
            Sign in to generate speech. New accounts receive {TRIAL_OFFER.characters.toLocaleString('en-US')}
            {' '}trial synthesis characters for {TRIAL_OFFER.days} days, with no credit card required.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/free-text-to-speech" className="text-primary underline underline-offset-4">Free Text to Speech Guide</Link>
            <Link href="/pricing" className="text-primary underline underline-offset-4">View plans and one-time packs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
