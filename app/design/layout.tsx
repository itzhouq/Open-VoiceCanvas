import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'AI Voice Design — Create a Voice from a Description';
const description = 'Describe a voice, preview it with sample text and save a design to your account. Use saved voices for text-to-speech, story narration and podcast dialogue.';
const url = 'https://voicewove.com/design';
const image = '/images/design-og.png';

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

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section aria-labelledby="design-overview" className="border-b border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h1 id="design-overview" className="text-2xl font-bold text-foreground">AI Voice Design</h1>
          <p className="mt-2 max-w-4xl text-muted-foreground">Describe the voice you want to create, add sample text to hear a preview, and save the voice design to your account.</p>

        </div>
      </section>
      {children}
      <section aria-labelledby="design-details" className="border-t border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h2 id="design-details" className="text-lg font-semibold">Input, output and account requirements</h2>
          <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
            <div>
              <dt className="font-semibold text-foreground">Input</dt>
              <dd className="mt-1 text-muted-foreground">A written voice description and preview text. This workflow creates a voice from a description rather than a recording.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Output</dt>
              <dd className="mt-1 text-muted-foreground">Preview audio, a saved voice design and MP3 downloads when synthesizing text with that voice.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Usage</dt>
              <dd className="mt-1 text-muted-foreground">Saved designs can be selected in speech, story and podcast workflows. Check your available voice and character balances before generating.</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">Sign in to generate audio using your account balances.</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/voice-cloning" className="text-primary underline underline-offset-4">Voice Cloning Guide</Link>
            <Link href="/pricing" className="text-primary underline underline-offset-4">View plans and one-time packs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
