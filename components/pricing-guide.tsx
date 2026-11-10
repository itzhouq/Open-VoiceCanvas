import Link from 'next/link';
import { CHARACTER_PACKS, CLONE_PACKS, PODCAST_BATCH_CHARACTER_MULTIPLIER, PRODUCT_PRICES_USD, SUBSCRIPTION_PLANS, type TrialOffer } from '@/lib/product-catalog';

export function PricingGuide({ trialOffer }: { trialOffer: TrialOffer }) {
  const format = (value: number) => value.toLocaleString('en-US');
  const answers = [
    {
      question: 'How much can I try before paying?',
      answer: `Create an account to try ${format(trialOffer.characters)} synthesis characters for ${trialOffer.days} days without a credit card. Characters measure the text you generate, not the number of English words or the length of the audio.`,
    },
    {
      question: `What does the $${PRODUCT_PRICES_USD.tenThousandChars} character pack include?`,
      answer: `The $${PRODUCT_PRICES_USD.tenThousandChars} one-time pack adds ${format(CHARACTER_PACKS.tenThousandChars)} characters. Spaces and punctuation count. Purchased character quota does not expire and is separate from subscription and trial quota.`,
    },
    {
      question: 'How is podcast character usage calculated?',
      answer: `Initial full-episode generation uses ${PODCAST_BATCH_CHARACTER_MULTIPLIER} times the confirmed dialogue’s character count. A 1,000-character dialogue uses ${format(1000 * PODCAST_BATCH_CHARACTER_MULTIPLIER)} quota characters. Editing or regenerating a single segment uses its own character count once. Allow extra quota for revisions.`,
    },
    {
      question: 'Is voice cloning included in the text-to-speech trial?',
      answer: `The synthesis trial provides characters, not a free cloning credit. Creating a cloned voice or designing a voice requires a separate credit: $${PRODUCT_PRICES_USD.clone1} buys ${CLONE_PACKS.clone1} credit. Generating speech with a created voice also uses character quota.`,
    },
    {
      question: 'Should I choose a subscription or a one-time pack?',
      answer: `For occasional projects, a character pack lets you keep unused purchased quota. For regular work, compare your expected usage with the monthly plan (${format(SUBSCRIPTION_PLANS.monthly.characters)} characters) or annual plan (${format(SUBSCRIPTION_PLANS.yearly.characters)} characters per year). Trial and subscription quota expires at the end of its validity period.`,
    },
    {
      question: 'Does paying for a plan grant commercial rights to every voice?',
      answer: 'A purchase provides usage quota; it does not grant rights to someone else’s script, recording or voice. Use only material you own or are authorized to use. The voice cloning tool restricts cloned voices to personal, non-commercial use. Review the Terms and the restrictions for your chosen voice before publishing.',
    },
    {
      question: 'How do I handle payment or generation problems?',
      answer: 'Available payment methods are shown at checkout. For a failed payment or an unexpected quota balance, contact support@voicewove.com with your order reference and the error shown. Subscriptions renew unless cancelled; cancellation and refund conditions are described in the Terms of Service.',
    },
  ];

  return (
    <section id="billing-guide" lang="en" aria-labelledby="billing-guide-title" className="mt-16 rounded-2xl border border-border bg-card p-6 md:p-8">
      <h2 id="billing-guide-title" className="text-2xl font-bold">Choose a plan for your next project</h2>
      <p className="mt-3 text-muted-foreground">Compare text characters and voice credits before you buy. They cover different parts of the workflow.</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {answers.map(({ question, answer }) => (
          <div key={question}>
            <h3 className="font-semibold">{question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{answer}</p>
          </div>
        ))}
      </div>
      <nav aria-label="Product and billing details" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-teal-600 dark:text-teal-400">
        <Link href="/voice-cloning" className="underline underline-offset-4">Voice cloning requirements</Link>
        <Link href="/ai-story-voiceover" className="underline underline-offset-4">Story audio formats</Link>
        <Link href="/terms" className="underline underline-offset-4">Terms and payment conditions</Link>
        <Link href="/privacy" className="underline underline-offset-4">Privacy and deletion requests</Link>
      </nav>
    </section>
  );
}
