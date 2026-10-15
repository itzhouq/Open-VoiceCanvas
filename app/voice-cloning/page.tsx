import type { Metadata } from 'next';
import Link from 'next/link';
import { NavBar } from '@/components/nav-bar';

export const metadata: Metadata = {
  title: 'Free Voice Cloning Online — Clone Your Voice with AI in Minutes | VoiceWove',
  description: 'Create an AI clone of your voice online for free. Upload a short audio sample, and VoiceWove lets you speak any text in your own voice across 40+ languages. No software to install.',
  alternates: { canonical: 'https://voicewove.com/voice-cloning' },
  openGraph: {
    title: 'Free Voice Cloning Online — Clone Your Voice with AI | VoiceWove',
    description: 'Upload a short audio sample and speak any text in your own voice with AI voice cloning. 40+ languages, instant results, free trial.',
    url: 'https://voicewove.com/voice-cloning',
    siteName: 'VoiceWove',
    type: 'website',
  },
};

const faqs = [
  {
    q: 'Is voice cloning free?',
    a: 'You can try voice cloning with a free 7-day trial (10,000 characters of synthesis, no credit card required). Cloning a voice requires a voice slot: one-time clone packs start at $3 for 1 voice slot and never expire. All AI platforms require paid slots for cloning because each voice model consumes real GPU resources.',
  },
  {
    q: 'How much audio do I need to clone a voice?',
    a: 'A short, clean recording is enough — roughly 10 to 30 seconds of clear speech in a quiet environment works best. No studio equipment needed; a phone recording is fine if there is no background noise.',
  },
  {
    q: 'Is it legal to clone a voice?',
    a: 'Only clone voices you own or have explicit permission to use. VoiceWove strictly prohibits cloning someone else\'s voice without consent, impersonation, or creating deceptive content. Accounts violating this are suspended.',
  },
  {
    q: 'Which languages can my cloned voice speak?',
    a: 'Once your voice model is created, you can make it speak text in 40+ languages — your cloned voice handles cross-language synthesis automatically.',
  },
  {
    q: 'Can I delete my cloned voice?',
    a: 'Yes. You can delete your voice model and uploaded audio samples at any time from your account, and we remove the underlying data from our systems.',
  },
];

export default function VoiceCloningPage() {
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
            VoiceWove · AI Voice Cloning
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Free Voice Cloning Online — Speak Any Text in Your Own Voice
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Upload a short audio sample and VoiceWove creates an AI clone of your voice. Then type
            anything — narration, dubbing, podcasts — and hear it in your voice, in 40+ languages.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cloning"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Clone Your Voice — Free Trial
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md border border-border px-8 py-3 font-semibold hover:bg-muted transition"
            >
              See Clone Packs
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Clone packs from $3 · Slots never expire · Consent policy enforced
          </p>
        </header>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-4">How AI Voice Cloning Works</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Voice cloning trains a neural model on a sample of your speech so it can generate new
            audio in that same voice. What used to require a recording studio and hours of training
            data now takes one short recording and a few minutes of processing.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            VoiceWove makes cloned voices practical: once your voice model exists, it becomes a
            selectable voice across the whole platform — use it for story voiceover, podcast
            narration, video dubbing, or translating your content into languages you don&apos;t
            speak. Your model is private to your account.
          </p>
        </section>

        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">What You Get</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: '🎙️ One Sample Is Enough',
                body: '10–30 seconds of clean speech is all it takes. Phone recording quality works — no studio needed.',
              },
              {
                title: '🌐 Cross-Language Speech',
                body: 'Your cloned voice can speak 40+ languages, so you can publish the same content for international audiences.',
              },
              {
                title: '⏳ Slots Never Expire',
                body: 'Clone packs are one-time purchases. Buy 1, 10 or 50 voice slots — they stay in your account forever.',
              },
              {
                title: '🔒 Consent & Privacy First',
                body: 'Cloning is only allowed for voices you own or are authorized to use. Delete your voice model and samples anytime.',
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
          <h2 className="text-2xl font-bold mb-6">3 Steps to Clone Your Voice</h2>
          <ol className="space-y-4">
            {[
              'Record 10–30 seconds of clear speech in a quiet room — read anything you like.',
              'Upload it to VoiceWove and create your voice model (a few minutes of processing).',
              'Type any text and hear it in your cloned voice — download as MP3, in 40+ languages.',
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
          <h2 className="text-2xl font-bold mb-3">Hear Yourself Speak Any Language</h2>
          <p className="text-muted-foreground mb-6">
            Start with a free trial, then grab a clone pack from $3 — slots never expire.
          </p>
          <Link
            href="/cloning"
            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-500 to-pink-500 px-10 py-3 text-white font-semibold hover:opacity-90 transition"
          >
            Start Voice Cloning — Free
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
