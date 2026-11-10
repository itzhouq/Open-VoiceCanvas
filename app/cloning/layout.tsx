import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Voice Cloning — Create and Use Your Own AI Voice';
const description = 'Upload an authorized voice recording, create a saved AI voice, and generate speech from text. Clone/design credits and synthesis characters are purchased separately.';
const url = 'https://voicewove.com/cloning';
const image = '/images/cloning-og.png';

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

export default function CloningLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section aria-labelledby="cloning-overview" className="border-b border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h1 id="cloning-overview" className="text-2xl font-bold text-foreground">AI Voice Cloning</h1>
          <p className="mt-2 max-w-4xl text-muted-foreground">Create a voice from a recording you own or have permission to use, then select that saved voice to generate new speech from text.</p>

        </div>
      </section>
      {children}
      <section aria-labelledby="cloning-details" className="border-t border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h2 id="cloning-details" className="text-lg font-semibold">Input, output and account requirements</h2>
          <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
            <div>
              <dt className="font-semibold text-foreground">Input</dt>
              <dd className="mt-1 text-muted-foreground">A clear voice recording, followed by text to synthesize. The upload form lists the sample requirements.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Output</dt>
              <dd className="mt-1 text-muted-foreground">A saved voice in your account, audio playback and MP3 speech downloads.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Cost</dt>
              <dd className="mt-1 text-muted-foreground">Creating a voice consumes a clone/design credit. Generating speech uses synthesis characters; these are separate balances.</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">Sign in to generate audio using your account balances.</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/voice-cloning" className="text-primary underline underline-offset-4">Voice cloning requirements and pricing guide</Link>
            <Link href="/pricing" className="text-primary underline underline-offset-4">View plans and one-time packs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
