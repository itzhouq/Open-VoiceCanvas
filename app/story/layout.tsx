import type { Metadata } from 'next';
import Link from 'next/link';

const title = 'Story Voiceover Generator — Narrator and Character Voices';
const description = 'Turn a written story into multi-character narration. Review dialogue, assign narrator and character voices, generate audio and download the combined WAV file.';
const url = 'https://voicewove.com/story';
const image = '/images/stroy-og.png';

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

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section aria-labelledby="story-overview" className="border-b border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h1 id="story-overview" className="text-2xl font-bold text-foreground">Story Voiceover Generator</h1>
          <p className="mt-2 max-w-4xl text-muted-foreground">Paste a story or start from a story prompt, review the narration and dialogue, and choose a voice for the narrator and each character.</p>

        </div>
      </section>
      {children}
      <section aria-labelledby="story-details" className="border-t border-border bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <h2 id="story-details" className="text-lg font-semibold">Input, output and account requirements</h2>
          <dl className="mt-4 grid gap-4 text-sm md:grid-cols-3">
            <div>
              <dt className="font-semibold text-foreground">Input</dt>
              <dd className="mt-1 text-muted-foreground">A story prompt or pasted story text. Review generated text and character assignments before creating audio.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Output</dt>
              <dd className="mt-1 text-muted-foreground">Preview individual segments and download the combined story as a WAV audio file.</dd>
            </div>
            <div>
              <dt className="font-semibold text-foreground">Voices</dt>
              <dd className="mt-1 text-muted-foreground">Use available system voices or saved voices from your account. Speech generation uses synthesis characters.</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-muted-foreground">Sign in to generate audio using your account balances.</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link href="/ai-story-voiceover" className="text-primary underline underline-offset-4">AI Story Voiceover Guide</Link>
            <Link href="/pricing" className="text-primary underline underline-offset-4">View plans and one-time packs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
