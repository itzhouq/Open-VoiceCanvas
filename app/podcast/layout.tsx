import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Podcast Voice Generator — Host and Guest Voices';
const description = 'Turn a topic or pasted text into a host-and-guest dialogue. Edit the script, choose voices, preview generated segments and download the combined WAV audio.';
const url = 'https://voicewove.com/podcast';
const image = '/images/podcast-og.png';

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

export default function PodcastLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section aria-labelledby="podcast-overview" className="border-b border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h1 id="podcast-overview" className="text-2xl font-bold text-foreground">Podcast Voice Generator</h1>
          <p className="mt-2 max-w-4xl text-muted-foreground">Enter a topic or paste source text to generate a host-and-guest conversation. Review the script and choose voices before creating the audio.</p>

        </div>
      </section>
      {children}
      <section aria-labelledby="podcast-details" className="border-t border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h2 id="podcast-details" className="text-lg font-semibold">Input, output and account requirements</h2>
          <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
            <div>
              <dt className="font-semibold text-foreground">Input</dt>
              <dd className="mt-1 text-muted-foreground">A topic or pasted text. Review and edit the generated dialogue before synthesis.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Output</dt>
              <dd className="mt-1 text-muted-foreground">Segment previews and a combined WAV download for the finished conversation.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Voices</dt>
              <dd className="mt-1 text-muted-foreground">Assign available system or saved voices to the host and guest. Audio generation uses synthesis characters.</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">Sign in to generate audio using your account balances.</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/ai-podcast-generator" className="text-primary underline underline-offset-4">AI Podcast Generator Guide</Link>
            <Link href="/pricing" className="text-primary underline underline-offset-4">View plans and one-time packs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
