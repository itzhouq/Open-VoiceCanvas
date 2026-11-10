import Link from 'next/link';
import { NavBar } from '@/components/nav-bar';

export interface LandingFaq {
  q: string;
  a: string;
}

interface LandingLink {
  href: string;
  label: string;
}

interface GeoLandingPageProps {
  eyebrow: string;
  title: string;
  description: string;
  offerNote: string;
  primaryAction: LandingLink;
  secondaryAction?: LandingLink;
  introduction: { title: string; paragraphs: string[] };
  features: { title: string; body: string }[];
  specifications: { label: string; value: string }[];
  steps: string[];
  example: { title: string; description: string; script: string };
  faqs: LandingFaq[];
  related: { href: string; title: string; description: string }[];
  closing: { title: string; description: string };
}

/** Public product information and FAQ markup share the same visible content. */
export function GeoLandingPage({
  eyebrow,
  title,
  description,
  offerNote,
  primaryAction,
  secondaryAction = { href: '/pricing', label: 'See Pricing' },
  introduction,
  features,
  specifications,
  steps,
  example,
  faqs,
  related,
  closing,
}: GeoLandingPageProps) {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  const primaryActionClass = 'inline-flex items-center justify-center rounded-md bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-3 text-white font-semibold hover:opacity-90 transition';

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
            VoiceWove · {eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-500">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={primaryAction.href} className={primaryActionClass}>{primaryAction.label}</Link>
            <Link href={secondaryAction.href} className="inline-flex items-center justify-center rounded-md border border-border px-8 py-3 font-semibold hover:bg-muted transition">
              {secondaryAction.label}
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">{offerNote}</p>
        </header>

        <section className="mb-14" aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="text-2xl font-bold mb-4">{introduction.title}</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            {introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-lg border border-border p-5 bg-card hover:shadow-md transition">
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="specifications" className="mb-14 scroll-mt-24" aria-labelledby="specifications-heading">
          <h2 id="specifications-heading" className="text-2xl font-bold mb-6">Formats, Limits and Costs</h2>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm text-left">
              <caption className="sr-only">{eyebrow} specifications</caption>
              <tbody className="divide-y divide-border">
                {specifications.map(({ label, value }) => (
                  <tr key={label}>
                    <th scope="row" className="w-1/3 min-w-[8rem] align-top p-4 font-semibold bg-muted/40">{label}</th>
                    <td className="p-4 text-muted-foreground leading-relaxed">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Check the <Link href="/pricing" className="text-teal-600 dark:text-teal-400 underline underline-offset-4">pricing page</Link> for current plans and quota details.
          </p>
        </section>

        <section id="how-it-works" className="mb-14 scroll-mt-24" aria-labelledby="steps-heading">
          <h2 id="steps-heading" className="text-2xl font-bold mb-6">How It Works</h2>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4 items-start">
                <span aria-hidden="true" className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white flex items-center justify-center font-bold">{index + 1}</span>
                <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="example" className="mb-14 scroll-mt-24" aria-labelledby="example-heading">
          <h2 id="example-heading" className="text-2xl font-bold mb-4">{example.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">{example.description}</p>
          <pre className="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/40 p-5 text-sm leading-relaxed font-sans">{example.script}</pre>
          <p className="text-sm text-muted-foreground mt-3">Example script for testing in the workspace. Audio has not been generated for this example.</p>
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
            Read our <Link href="/terms" className="text-teal-600 dark:text-teal-400 underline underline-offset-4">Terms of Service</Link> and{' '}
            <Link href="/privacy" className="text-teal-600 dark:text-teal-400 underline underline-offset-4">Privacy Policy</Link> for content rights and data handling. For questions about a specific use, contact{' '}
            <a href="mailto:support@voicewove.com" className="text-teal-600 dark:text-teal-400 underline underline-offset-4">support@voicewove.com</a>.
          </p>
        </section>

        <section className="mb-14" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold mb-6">Explore VoiceWove Tools</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-lg border border-border p-4 bg-card hover:border-teal-500/50 transition">
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="text-center rounded-2xl border border-border p-8 md:p-10 bg-gradient-to-br from-teal-500/5 to-cyan-500/5">
          <h2 className="text-2xl font-bold mb-3">{closing.title}</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">{closing.description}</p>
          <Link href={primaryAction.href} className={primaryActionClass}>{primaryAction.label}</Link>
        </section>
      </main>

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
