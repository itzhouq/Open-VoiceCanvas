import type { Metadata } from 'next';
import Link from 'next/link';
import { NavBar } from '@/components/nav-bar';

const title = 'Voice Cloning vs Voice Design: Which to Choose?';
const description = 'Voice cloning vs voice design: cloning reproduces a voice from a recording, design creates one from a description. Compare needs, credits and output formats.';
const url = 'https://voicewove.com/voice-cloning-vs-voice-design';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    url,
    siteName: 'VoiceWove',
    type: 'website',
  },
};

// One-paragraph verdict, kept under 40 words.
const conclusion =
  'Choose voice cloning when the speech must match a specific voice you own or are authorized to use; choose voice design when any new described voice will do. Both consume one clone/design credit; generating speech uses character quota.';

const comparisonRows = [
  {
    label: 'Recording needed',
    cloning: 'Yes — an MP3, M4A or WAV recording, 10 seconds to 5 minutes, max 5 MB, from one authorized speaker.',
    design: 'No — a written voice description plus short preview text.',
  },
  {
    label: 'Reproduces a specific voice',
    cloning: 'Yes. The clone reads new text in the recorded voice, your own or one you are authorized to use.',
    design: 'No. It creates a new voice from the description; it cannot match a particular person.',
  },
  {
    label: 'Quota required',
    cloning: 'Creating the clone consumes a clone/design credit; generating speech uses character quota.',
    design: 'Creating the design consumes the same clone/design credit; generating speech uses character quota.',
  },
  {
    label: 'Best for',
    cloning: 'Narration that must sound like a particular speaker.',
    design: 'Projects that need a distinct new voice without any recording.',
  },
  {
    label: 'Languages',
    cloning: 'The cloning workspace offers language choices for synthesis; results depend on the recording, text and language.',
    design: 'The design workspace offers language choices; results depend on the description, text and language.',
  },
  {
    label: 'Output format',
    cloning: 'MP3 from the cloning workspace.',
    design: 'MP3 downloads when synthesizing text with the saved design.',
  },
];

const wrongChoicePoints = [
  'No recording, but you pick cloning: you get stuck at the upload step. Cloning requires an MP3, M4A or WAV file between 10 seconds and 5 minutes (max 5 MB), so without a usable sample of an authorized voice there is no clone to create.',
  'A specific voice, but you pick design: you will not get it. Voice design builds a new voice from a written description, so it cannot reproduce you or any other particular speaker.',
  'Either way, the credit is spent the same: creating a clone or a design consumes the same clone/design credit, and deleting the saved voice does not restore it. Generating speech then uses character quota.',
];

const faqs = [
  {
    q: 'Can voice design reproduce my own voice?',
    a: 'No. Voice design creates a new voice from a written description, so it cannot reproduce you or any other specific person. If the audio must sound like a particular speaker, use voice cloning with a recording of that voice.',
  },
  {
    q: 'Do I need a recording before using voice design?',
    a: 'No. The design workflow only needs a written voice description and short preview text. A recording is required only for voice cloning, and it must meet the upload limits in the comparison above.',
  },
  {
    q: 'If I try both workflows, do I spend two credits?',
    a: 'Yes. Creating a clone and creating a design each consume one clone/design credit, so trying both spends two. Generating speech with either voice uses character quota separately, and current prices are on the pricing page.',
  },
  {
    q: 'Can cloned and designed voices speak other languages?',
    a: 'Both workspaces offer language choices for speech synthesis, and a short test passage helps you check pronunciation before a longer project. Results depend on the voice, the text and the selected language, and language availability depends on the selected tool.',
  },
];

export default function VoiceCloningVsVoiceDesignPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, '\\u003c') }}
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-500 mb-3">
            VoiceWove · Compare
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500">
            Voice Cloning vs Voice Design
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            One workflow needs a recording, the other needs only a description. Compare them before spending a credit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/cloning"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 text-white font-semibold hover:opacity-90 transition"
            >
              Open Voice Cloning
            </Link>
            <Link
              href="/design"
              className="inline-flex items-center justify-center rounded-md border border-border px-8 py-3 font-semibold hover:bg-muted transition"
            >
              Open Voice Design
            </Link>
          </div>
        </header>

        <section className="mb-14 rounded-lg border border-border bg-card p-6" aria-label="Short answer">
          <h2 className="text-2xl font-bold mb-4">The Short Answer</h2>
          <p className="leading-relaxed text-muted-foreground">{conclusion}</p>
        </section>

        <section className="mb-14" aria-labelledby="comparison-heading">
          <h2 id="comparison-heading" className="text-2xl font-bold mb-6">
            Voice Cloning vs Voice Design: Side-by-Side
          </h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">Voice cloning vs voice design comparison</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="w-1/4 min-w-[8rem] p-4 font-semibold bg-muted/40">
                    <span className="sr-only">Feature</span>
                  </th>
                  <th scope="col" className="p-4 font-semibold bg-muted/40 border-l border-border">Voice cloning</th>
                  <th scope="col" className="p-4 font-semibold bg-muted/40 border-l border-border">Voice design</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {comparisonRows.map(({ label, cloning, design }) => (
                  <tr key={label}>
                    <th scope="row" className="p-4 align-top font-semibold bg-muted/40">{label}</th>
                    <td className="p-4 align-top text-muted-foreground leading-relaxed border-l border-border">{cloning}</td>
                    <td className="p-4 align-top text-muted-foreground leading-relaxed border-l border-border">{design}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Credit and quota prices are listed on the{' '}
            <Link href="/pricing" className="text-teal-600 dark:text-teal-400 underline underline-offset-4">pricing page</Link>.
          </p>
        </section>

        <section className="mb-14" aria-labelledby="wrong-choice-heading">
          <h2 id="wrong-choice-heading" className="text-2xl font-bold mb-4">
            What Happens if You Choose the Wrong One
          </h2>
          <ul className="space-y-3 pl-5 list-disc text-muted-foreground leading-relaxed">
            {wrongChoicePoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </section>

        <section id="faq" className="mb-14 scroll-mt-24" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-5">
            {faqs.map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-5">
                <h3 className="font-semibold mb-2">{q}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-5 leading-relaxed">
            Read the <Link href="/terms" className="text-teal-600 dark:text-teal-400 underline underline-offset-4">Terms of Service</Link> and{' '}
            <Link href="/privacy" className="text-teal-600 dark:text-teal-400 underline underline-offset-4">Privacy Policy</Link> for content rights and data handling.
          </p>
        </section>
      </main>

      <p className="max-w-4xl mx-auto px-4 pb-6 text-center text-sm text-muted-foreground">
        Last updated: 2026-11-17
      </p>

      <footer className="border-t border-border py-8 px-4 text-center text-sm text-muted-foreground">
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
