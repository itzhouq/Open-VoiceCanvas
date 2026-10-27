import type { Metadata } from 'next';
import Link from 'next/link';
import { NavBar } from '@/components/nav-bar';

export const metadata: Metadata = {
  title: 'Free Text to Speech Online — Natural AI Voices, No Sign-Up Hassle | VoiceWove',
  description: 'Convert text to natural-sounding speech online for free. 40+ languages, 200+ AI voices, MP3 download. Start with 10,000 free characters — no credit card required.',
  alternates: { canonical: 'https://voicewove.com/free-text-to-speech' },
  openGraph: {
    title: 'Free Text to Speech Online — Natural AI Voices | VoiceWove',
    description: 'Convert text to natural speech with 200+ AI voices in 40+ languages. 10,000 free characters, MP3 download, no credit card.',
    url: 'https://voicewove.com/free-text-to-speech',
    siteName: 'VoiceWove',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'Is this text-to-speech tool really free?',
    a: 'Every new account gets 10,000 characters of synthesis free for 7 days — enough for dozens of short audio clips. No credit card is required to start. After that, keep converting text with a subscription or one-time character packs starting at $6.',
  },
  {
    q: 'How natural do the voices sound?',
    a: 'VoiceWove uses state-of-the-art neural TTS models — the output carries natural intonation, pauses and emotion, not the robotic delivery of older generations. Listen to a sample before committing anything.',
  },
  {
    q: 'Which languages and voices are supported?',
    a: '40+ languages including English, Chinese, Spanish, French, German, Japanese, Korean, Arabic and Hindi, with 200+ voices across styles: narration, conversational, storytelling and character voices.',
  },
  {
    q: 'Can I use the audio commercially?',
    a: 'Yes — audio you generate on a paid plan can be used in YouTube videos, podcasts, e-learning courses, audiobooks and client work. See our terms of service for details.',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. VoiceWove runs entirely in your browser. Paste text, click generate, download MP3. Works on desktop and mobile.',
  },
];

export default function FreeTextToSpeechPage() {
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
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-500 mb-3">
            VoiceWove · Free Text to Speech
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500">
            Free Text to Speech — Natural AI Voices in 40+ Languages
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Paste your text, pick a voice, download studio-quality MP3. Start with 10,000 free
            characters — no credit card, no software, no watermarks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/app"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Convert Text to Speech — Free
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md border border-border px-8 py-3 font-semibold hover:bg-muted transition"
            >
              See Pricing
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            10,000 free characters · 7-day trial · MP3 download · No watermark
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">Why Another Text-to-Speech Tool?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Most free TTS tools give you one robotic voice, a 300-character limit and a watermark on
            the output. VoiceWove&apos;s free tier gives you 10,000 characters with production-grade
            neural voices — the same engine behind our paid plans.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            When you outgrow the free tier, you don&apos;t switch tools: upgrade to a subscription
            (from $5.99/month) or grab a one-time character pack from $6 that never expires. Your
            account, history and voices carry over.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Popular Ways People Use Text to Speech</h2>
          <ul className="space-y-3 text-muted-foreground leading-relaxed">
            <li><strong className="text-foreground">Listening instead of reading</strong> — turn articles, papers and newsletters into audio for your commute or workout.</li>
            <li><strong className="text-foreground">Proofreading by ear</strong> — hearing your own text catches awkward phrasing your eyes skip over.</li>
            <li><strong className="text-foreground">E-learning &amp; study notes</strong> — convert lecture notes into review audio you can play on repeat.</li>
            <li><strong className="text-foreground">Accessibility</strong> — a readable, natural-sounding voice for low-vision or dyslexic readers.</li>
            <li><strong className="text-foreground">Content production</strong> — narration drafts for videos and podcasts before committing to a studio take.</li>
          </ul>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">What&apos;s Included Free</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: '📝 10,000 Free Characters',
                body: 'Enough for dozens of voiceovers, study notes, or social media clips. Valid for 7 days.',
              },
              {
                title: '🗣️ 200+ Neural Voices',
                body: 'Narration, conversational, storytelling and character styles across 40+ languages.',
              },
              {
                title: '🎚️ Speed & Pitch Control',
                body: 'Fine-tune every clip. Slow down for learners, speed up for shorts, adjust per project.',
              },
              {
                title: '⬇️ Clean MP3 Download',
                body: 'No watermarks, no forced branding. Download and use your audio wherever you want.',
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
          <h2 className="text-2xl font-bold mb-6">Built for Real Workflows</h2>
          <div className="space-y-5">
            {[
              ['🎥 Video creators', 'Narrate YouTube videos, TikTok shorts and course modules without recording your own voice.'],
              ['📚 E-learning & study', 'Turn lecture notes and articles into audio you can listen to on the go.'],
              ['📖 Audiobook & fiction writers', 'Hear your draft read aloud, or publish full narrated versions with multi-character voices.'],
              ['🌍 Multilingual content', 'Produce the same audio in 40+ languages to reach international audiences.'],
            ].map(([who, what]) => (
              <div key={who} className="flex gap-4 items-start border-b border-border pb-4">
                <span className="font-bold whitespace-nowrap">{who}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{what}</p>
              </div>
            ))}
          </div>
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

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">Beyond Plain Text to Speech</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/ai-story-voiceover" className="rounded-lg border border-border p-4 bg-card hover:border-teal-500/50 transition">
              <p className="font-bold">AI Story Voiceover</p>
              <p className="text-sm text-muted-foreground mt-1">Multi-character audio dramas — a different voice for every character.</p>
            </a>
            <a href="/voice-cloning" className="rounded-lg border border-border p-4 bg-card hover:border-teal-500/50 transition">
              <p className="font-bold">AI Voice Cloning</p>
              <p className="text-sm text-muted-foreground mt-1">Clone your own voice and speak any text in 40+ languages.</p>
            </a>
            <a href="/ai-podcast-generator" className="rounded-lg border border-border p-4 bg-card hover:border-teal-500/50 transition">
              <p className="font-bold">AI Podcast Generator</p>
              <p className="text-sm text-muted-foreground mt-1">Two-host podcast episodes from any topic or document.</p>
            </a>
          </div>
        </section>

        <section className="text-center rounded-2xl border border-border p-10 bg-gradient-to-br from-teal-500/5 to-cyan-500/5">
          <h2 className="text-2xl font-bold mb-3">Start Converting Text — Free</h2>
          <p className="text-muted-foreground mb-6">
            10,000 characters on the house. Studio-quality audio in your browser, in under a minute.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 px-10 py-3 text-white font-semibold hover:opacity-90 transition"
          >
            Try Free Text to Speech
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
