import type { Metadata } from 'next';
import { GeoLandingPage, type LandingFaq } from '@/components/geo-landing-page';
import { TRIAL_OFFER } from '@/lib/trial-offer';
import { CHARACTER_PACKS, PRODUCT_PRICES_USD } from '@/lib/product-catalog';

const trialCharacters = TRIAL_OFFER.characters.toLocaleString('en-US');
const starterCharacters = CHARACTER_PACKS.tenThousandChars.toLocaleString('en-US');
const title = 'Free Text to Speech Online with MP3 Download';
const description = `Turn text into speech in your browser. New accounts receive ${trialCharacters} synthesis characters for ${TRIAL_OFFER.days} days. Registration required; no credit card needed.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://voicewove.com/free-text-to-speech' },
  openGraph: {
    title,
    description,
    url: 'https://voicewove.com/free-text-to-speech',
    siteName: 'VoiceWove',
    type: 'website',
  },
};

const faqs: LandingFaq[] = [
  {
    q: 'Is VoiceWove text to speech free, and do I need an account?',
    a: `New accounts receive ${trialCharacters} synthesis characters for a ${TRIAL_OFFER.days}-day trial. Register and sign in to generate audio; a credit card is not required for the trial. Once the trial expires or its quota is used, continue with a subscription or a one-time character pack.`,
  },
  {
    q: 'Are characters the same as words?',
    a: 'Characters and words are different. Quota is measured from the text sent for synthesis, including spaces and punctuation. A word usually contains several characters. Use the character counter in the workspace to check your text before generating audio.',
  },
  {
    q: 'Can I download MP3 or WAV?',
    a: 'The text-to-speech workspace downloads MP3 audio. The separate story and podcast tools export their combined audio as WAV. Choose the workflow that matches your project and check its output format before generating a long recording.',
  },
  {
    q: 'Can I upload a PDF or Word document?',
    a: 'The text-to-speech workspace supports plain-text .txt and Markdown .md uploads. Direct PDF and Word import is not supported. Copy the text you want to read from your document, paste it into the workspace, and check the text before generating audio.',
  },
  {
    q: 'How much text can I convert at once?',
    a: 'The current text-to-speech workspace accepts up to 10,000 characters per request, subject to your remaining character quota. Split longer articles or book chapters into sections. Audio duration varies with the language, text and speaking speed.',
  },
  {
    q: 'Which languages and voices can I use?',
    a: 'The workspace displays the available language and voice options. Voice availability varies by language and workflow. Select your intended language and test a short passage, including names or specialist terms, before creating a longer recording.',
  },
  {
    q: 'Can I use a clone of my own voice?',
    a: `Voice cloning is a separate workflow. Creating a clone requires a clone/design credit; packs start at $${PRODUCT_PRICES_USD.clone1}. Speech generated with that clone also uses character quota. The text-to-speech trial does not include a free clone/design credit.`,
  },
  {
    q: 'Can I use the audio in commercial videos or client work?',
    a: 'Publication depends on your rights to the text and voice, the applicable voice restrictions, and our Terms of Service. Buying synthesis quota does not grant rights to third-party material. Review those conditions before publishing, and contact support if permission for your intended use is unclear.',
  },
  {
    q: 'Can I buy characters without subscribing?',
    a: `Yes. One-time character packs start at $${PRODUCT_PRICES_USD.tenThousandChars} for ${starterCharacters} characters. Purchased character quota does not expire. Subscription and trial quota have an expiry date; see the pricing page for the current plans.`,
  },
];

export default function FreeTextToSpeechPage() {
  return (
    <GeoLandingPage
      eyebrow="Free Text to Speech"
      title="Free Text to Speech with MP3 Download"
      description="Turn a video script, study note or article into speech. Paste your text, choose an available voice, adjust the delivery and download an MP3 in your browser."
      offerNote={`${trialCharacters} characters · ${TRIAL_OFFER.days}-day trial · Account required · No credit card required`}
      primaryAction={{ href: '/app', label: 'Try Text to Speech' }}
      introduction={{
        title: 'How Can I Turn Text into Audio?',
        paragraphs: [
          'VoiceWove reads text aloud using an AI voice. Use it to listen to study notes, check a draft by ear, or prepare narration for a video. You can hear the result before downloading it.',
          `Start with the ${TRIAL_OFFER.days}-day trial to test your own text. When you need more quota, choose a subscription from $${PRODUCT_PRICES_USD.monthly}/month or a one-time character pack from $${PRODUCT_PRICES_USD.tenThousandChars}.`,
        ],
      }}
      features={[
        { title: 'Listen to your own text', body: 'Paste a passage and check its pronunciation, pacing and pauses before making a longer recording.' },
        { title: 'Adjust the delivery', body: 'Use the workspace controls for speed and pitch to suit a lesson, reading exercise or narration draft.' },
        { title: 'Download MP3', body: 'Save generated speech as an audio file for playback or further editing.' },
        { title: 'Choose a payment model', body: 'Use a subscription for regular work or buy a character pack for occasional projects.' },
      ]}
      specifications={[
        { label: 'Input', value: 'Pasted text, .txt files and .md files. Copy text out of PDF or Word documents first.' },
        { label: 'Request limit', value: 'Up to 10,000 characters per request; your remaining quota must cover the text.' },
        { label: 'Output', value: 'MP3 from the text-to-speech workspace.' },
        { label: 'Free trial', value: `${trialCharacters} synthesis characters for ${TRIAL_OFFER.days} days after account registration. No credit card required.` },
        { label: 'One-time pack', value: `$${PRODUCT_PRICES_USD.tenThousandChars} for ${starterCharacters} characters. Purchased character quota does not expire.` },
        { label: 'Languages and voices', value: 'Check the choices available in the workspace for your language and test the voice on your text.' },
      ]}
      steps={[
        'Create an account or sign in, then paste your text or upload a .txt or .md file.',
        'Choose an available language and voice. Check the character count and adjust speed or pitch as needed.',
        'Generate a short passage, listen for pronunciation and pacing, then download the MP3.',
      ]}
      example={{
        title: 'Try This Short Narration Script',
        description: 'Copy this passage into the text-to-speech workspace. Try two speaking speeds to hear which delivery fits a short introduction.',
        script: 'Welcome to the quiet corner of the library. Today, we are following one small idea from a handwritten note to a finished story. Take a breath, turn the page, and let us begin.',
      }}
      faqs={faqs}
      related={[
        { href: '/ai-story-voiceover', title: 'Story Voiceover', description: 'Give the narrator and each character their own voice.' },
        { href: '/voice-cloning', title: 'Voice Cloning', description: 'Check recording requirements and clone credit pricing.' },
        { href: '/ai-podcast-generator', title: 'AI Podcast Generator', description: 'Turn text into an editable host-and-guest conversation.' },
      ]}
      closing={{
        title: 'Hear Your Text Read Aloud',
        description: `Start with a short passage using your ${trialCharacters}-character, ${TRIAL_OFFER.days}-day trial. Check the voice on your own words before choosing a paid plan.`,
      }}
    />
  );
}
