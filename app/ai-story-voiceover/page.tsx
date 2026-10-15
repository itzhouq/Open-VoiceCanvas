import type { Metadata } from 'next';
import Link from 'next/link';
import { NavBar } from '@/components/nav-bar';

export const metadata: Metadata = {
  title: 'AI Story Voiceover — Multi-Character Story Narration in 40+ Languages | VoiceWove',
  description: 'Turn any story into a professional multi-voice audio drama with AI story voiceover. Assign a different AI voice to every character, add narration, and export in minutes. Free trial, no credit card required.',
  alternates: { canonical: 'https://voicewove.com/ai-story-voiceover' },
  openGraph: {
    title: 'AI Story Voiceover — Multi-Character Story Narration | VoiceWove',
    description: 'Turn any story into a professional multi-voice audio drama with AI. A different voice for every character, 40+ languages, instant export.',
    url: 'https://voicewove.com/ai-story-voiceover',
    siteName: 'VoiceWove',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'What is AI story voiceover?',
    a: 'AI story voiceover uses text-to-speech AI to narrate stories with multiple distinct voices — one for the narrator and a different one for each character. Instead of hiring voice actors or recording yourself, you paste your story, assign voices, and generate the full audio drama in minutes.',
  },
  {
    q: 'Can each character have a different voice?',
    a: 'Yes — that is exactly what VoiceWove is built for. Assign any of our AI voices to individual characters in your story, adjust speed and pitch per character, and the platform generates a single coherent audio track with all voices in the right places.',
  },
  {
    q: 'Which languages are supported?',
    a: 'VoiceWove supports 40+ languages including English, Chinese, Spanish, French, German, Japanese, Korean, Portuguese, Arabic, Hindi and more, so you can produce story voiceovers for any audience.',
  },
  {
    q: 'Is it free to try?',
    a: 'Yes. Every new account gets a free 7-day trial with 10,000 characters of synthesis — no credit card required. After the trial, keep going with a subscription or a one-time character pack that never expires.',
  },
  {
    q: 'Who owns the generated audio?',
    a: 'You do. Audio you generate from your own stories is yours to use — for YouTube narration, podcasts, audiobooks, social media or client work. See our terms of service for details.',
  },
];

export default function AiStoryVoiceoverPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <header className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-500 mb-3">
            VoiceWove · AI Story Voiceover
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500">
            AI Story Voiceover: Turn Any Story into a Multi-Voice Audio Drama
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Paste your story, give every character their own AI voice, and generate a professional
            story voiceover in minutes — narration and dialogue together, in 40+ languages. No
            microphone, no voice actors, no editing software.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/story"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Try AI Story Voiceover Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md border border-border px-8 py-3 font-semibold hover:bg-muted transition"
            >
              See Pricing
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Free 7-day trial · 10,000 characters · No credit card required
          </p>
        </header>

        {/* What it is */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">What Is AI Story Voiceover?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Traditional story narration means one voice reading everything — or expensive studio
            sessions with multiple voice actors. AI story voiceover changes the equation: a text-to-speech
            platform like VoiceWove reads your story and performs it, giving the narrator one voice and
            every character in your script their own distinct voice, tone, and pacing.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Writers use it to turn bedtime stories into audio for their kids. Creators use it to
            narrate YouTube horror stories and Reddit dramas with a full cast. Educators use it to
            bring dialogues to life for language learners. Podcasters use it to prototype fiction
            shows in an afternoon. If your story has more than one character, multi-voice AI
            voiceover is the fastest way to hear it come alive.
          </p>
        </section>

        {/* Features */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Why VoiceWove for Story Voiceover</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: '🎭 Multi-Character Voices',
                body: 'Assign a different AI voice to the narrator and every character — heroes, villains, side characters — all in one coherent audio track.',
              },
              {
                title: '🌍 40+ Languages',
                body: 'Produce story voiceovers in English, Chinese, Spanish, Japanese and dozens more — same story, every market.',
              },
              {
                title: '🎛️ Per-Character Control',
                body: 'Fine-tune speed, pitch and volume for each voice. Make the giant rumble and the fairy sparkle without any audio editing.',
              },
              {
                title: '✍️ Story Generator Included',
                body: 'No story yet? Generate an original story script with built-in AI, then voice it immediately — idea to audio in one session.',
              },
              {
                title: '⚡ Instant Export',
                body: 'Download your finished voiceover as MP3 and drop it straight into YouTube, TikTok, podcasts or audiobook projects.',
              },
              {
                title: '🔐 Your Stories Stay Yours',
                body: 'You own the audio you generate. Commercial use for your channels and client work is allowed on paid plans.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-lg border border-border p-5 bg-card hover:shadow-md transition"
              >
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">How It Works — 3 Steps</h2>
          <ol className="space-y-4">
            {[
              'Paste or write your story — or let the built-in AI story generator write one for you from a prompt.',
              'Assign a different AI voice to the narrator and each character, then tune speed and pitch to taste.',
              'Generate the full multi-voice voiceover and download it as MP3 — ready to publish anywhere.',
            ].map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-border pb-5">
                <h3 className="font-semibold mb-2">{f.q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center rounded-2xl border border-border p-10 bg-gradient-to-br from-teal-500/5 to-cyan-500/5">
          <h2 className="text-2xl font-bold mb-3">Ready to Hear Your Story Come Alive?</h2>
          <p className="text-muted-foreground mb-6">
            Start with 10,000 free characters. Your first multi-voice story voiceover is minutes away.
          </p>
          <Link
            href="/story"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 px-10 py-3 text-white font-semibold hover:opacity-90 transition"
          >
            Create Your Story Voiceover — Free
          </Link>
        </section>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} VoiceWove ·{' '}
          <Link href="/pricing" className="hover:underline">Pricing</Link> ·{' '}
          <Link href="/privacy" className="hover:underline">Privacy</Link> ·{' '}
          <Link href="/terms" className="hover:underline">Terms</Link>
        </p>
      </footer>
    </div>
  );
}
