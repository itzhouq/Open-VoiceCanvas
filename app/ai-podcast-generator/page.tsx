import type { Metadata } from 'next';
import Link from 'next/link';
import { NavBar } from '@/components/nav-bar';

export const metadata: Metadata = {
  title: 'AI Podcast Generator — Turn Any Topic or Document into a Podcast | VoiceWove',
  description: 'Generate podcast-style audio from any topic, script or document with AI. Multi-voice conversations, 40+ languages, MP3 export. Free trial — no credit card required.',
  alternates: { canonical: 'https://voicewove.com/ai-podcast-generator' },
  openGraph: {
    title: 'AI Podcast Generator — Topic to Podcast Audio in Minutes | VoiceWove',
    description: 'Turn any topic or document into a podcast-style conversation with AI voices. 40+ languages, MP3 export, free trial.',
    url: 'https://voicewove.com/ai-podcast-generator',
    siteName: 'VoiceWove',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'What is an AI podcast generator?',
    a: 'An AI podcast generator turns written content — a topic, an article, a script or a document — into podcast-style audio automatically. VoiceWove generates a natural conversational script, then performs it with distinct AI voices for each speaker, ready to publish as an episode.',
  },
  {
    q: 'Do I need recording equipment?',
    a: 'No microphone, no audio interface, no editing software. The entire production — script writing, voice performance, audio export — happens in your browser.',
  },
  {
    q: 'Can it sound like two people talking?',
    a: 'Yes. VoiceWove assigns different AI voices to each speaker with natural back-and-forth pacing, so the result sounds like a real conversation rather than a single narrator.',
  },
  {
    q: 'Which languages are supported?',
    a: '40+ languages. You can also generate an episode in one language and re-produce it in another to reach international audiences with the same effort.',
  },
  {
    q: 'Who owns the generated episodes?',
    a: 'You do. Publish generated episodes on Spotify, Apple Podcasts, YouTube or anywhere else — commercial use is allowed on paid plans.',
  },
];

export default function AiPodcastGeneratorPage() {
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
        <header className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-purple-500 mb-3">
            VoiceWove · AI Podcast Generator
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            AI Podcast Generator — From Topic to Episode in Minutes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Give it a topic or paste a document. VoiceWove writes the conversational script and
            performs it with distinct AI voices — a publishable podcast episode, in 40+ languages,
            without touching a microphone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/podcast"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Generate Your First Episode — Free
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

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">The NotebookLM Effect, for Your Own Content</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Multi-speaker AI podcasts went mainstream when tools started turning documents into
            two-host conversations. The problem: you can&apos;t control the voices, the language, or
            publish the output.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            VoiceWove gives you a full pipeline you control: generate the dialogue script from your
            topic, choose which AI voices play which host, tune the delivery, and export clean MP3
            you own outright — in 40+ languages.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">What You Can Produce</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: '🗞️ Topic Explainer Episodes',
                body: 'Feed it a subject and get a natural two-host breakdown — perfect for daily or weekly shows.',
              },
              {
                title: '📄 Document-to-Podcast',
                body: 'Turn reports, papers or long articles into conversational audio your audience will actually finish.',
              },
              {
                title: '🧑‍🏫 Educational Series',
                body: 'Course chapters and study material as engaging dialogue — ideal for e-learning and internal training.',
              },
              {
                title: '🌍 Multilingual Feeds',
                body: 'Same episode, multiple languages. Grow international listeners without re-recording anything.',
              },
            ].map((f) => (
              <div key={f.title} className="rounded-lg border border-border p-5 bg-card hover:shadow-md transition">
                <h3 className="font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">How It Works — 3 Steps</h2>
          <ol className="space-y-4">
            {[
              'Enter a topic or paste your source material — article, notes, or script.',
              'AI writes the multi-speaker conversation; pick distinct voices for each host and adjust pacing.',
              'Generate the episode and export MP3 — ready for Spotify, Apple Podcasts, YouTube or RSS.',
            ].map((step, i) => (
              <li key={i} className="flex gap-4 items-start">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </section>

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

        <section className="text-center rounded-2xl border border-border p-10 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
          <h2 className="text-2xl font-bold mb-3">Your Podcast, Without the Studio</h2>
          <p className="text-muted-foreground mb-6">
            Generate your first episode free — script, voices and export included.
          </p>
          <Link
            href="/podcast"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-3 text-white font-semibold hover:opacity-90 transition"
          >
            Generate a Podcast Episode — Free
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
