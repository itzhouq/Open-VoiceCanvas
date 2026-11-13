import type { Metadata } from 'next';
import { GeoLandingPage, type LandingFaq } from '@/components/geo-landing-page';
import { TRIAL_OFFER } from '@/lib/trial-offer';
import { CLONE_PACKS, PRODUCT_PRICES_USD } from '@/lib/product-catalog';

const trialCharacters = TRIAL_OFFER.characters.toLocaleString('en-US');
const title = `AI Voice Cloning Online from $${PRODUCT_PRICES_USD.clone1}`;
const description = `Clone your own or an authorized voice from an audio recording. Clone/design credits start at $${PRODUCT_PRICES_USD.clone1}; speech generation uses separate character quota.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://voicewove.com/voice-cloning' },
  openGraph: {
    title,
    description,
    url: 'https://voicewove.com/voice-cloning',
    siteName: 'VoiceWove',
    type: 'website',
  },
};

const faqs: LandingFaq[] = [
  {
    q: 'Is voice cloning included in the free trial?',
    a: `No. The free trial provides ${trialCharacters} speech-synthesis characters for ${TRIAL_OFFER.days} days, but it does not include clone/design credits. Creating a voice clone requires a credit. The smallest pack costs $${PRODUCT_PRICES_USD.clone1} for ${CLONE_PACKS.clone1} credit.`,
  },
  {
    q: 'Do I pay again to generate speech with my cloned voice?',
    a: 'Creating the voice clone consumes a clone/design credit. Generating speech with an existing clone consumes character quota separately. You need available character quota, from an active trial, a subscription or a purchased character pack, to synthesize speech.',
  },
  {
    q: 'How long should the recording be, and which files are accepted?',
    a: 'Upload a clear MP3, M4A or WAV recording between 10 seconds and 5 minutes, with a file size of at most 5 MB. Record continuous speech from one authorized speaker in a quiet room. Avoid music, overlapping voices and strong echo.',
  },
  {
    q: 'Can I record the sample on my phone?',
    a: 'Yes, if the exported recording meets the format, size and duration requirements. Keep a steady distance from the microphone and use your normal speaking voice. Listen to the recording before uploading; recording quality affects the result.',
  },
  {
    q: 'Can my cloned voice speak another language?',
    a: 'The cloning workspace offers language choices for speech synthesis. Try a short passage in your target language and review pronunciation before a longer project. Results depend on the recording, text and selected language; language options are not a guarantee of equal quality in every language.',
  },
  {
    q: 'Can I clone someone else’s voice or use a clone commercially?',
    a: 'Only upload a voice you own or have legal permission to use. Impersonation and deceptive use are prohibited. Buying credits does not grant commercial rights or remove restrictions on the voice or source material. Check the Terms of Service and the restrictions in the cloning workspace; contact support before a use whose permission is unclear.',
  },
  {
    q: 'What happens when I delete a cloned voice?',
    a: 'The delete control removes the saved voice from your VoiceWove account list. For a request covering the original recording or the model held by a processing provider, contact support using the Privacy Policy. Removing a saved voice should not be treated as confirmation that every provider copy has been erased.',
  },
  {
    q: 'Do clone/design credits expire, and can I reuse them?',
    a: 'Purchased clone/design credits do not have a subscription expiry. A credit is consumed when you create a voice clone or voice design; it is not a reusable voice slot. Deleting a saved voice does not restore the consumed credit.',
  },
  {
    q: 'Which audio format can I download?',
    a: 'Speech generated in the cloning workspace downloads as MP3. The story and podcast tools export their combined audio as WAV, so check the output format of the tool you use for the finished project.',
  },
];

export default function VoiceCloningPage() {
  return (
    <GeoLandingPage
      eyebrow="AI Voice Cloning"
      title="Voice Cloning: Clone Your Voice and Generate New Speech"
      description="Upload a recording of your own or an authorized voice, create a clone, and use it to read new text. Check the recording requirements and the two types of quota before you begin."
      offerNote={`Clone/design credits from $${PRODUCT_PRICES_USD.clone1} · Speech uses separate character quota · Account required`}
      primaryAction={{ href: '/cloning', label: 'Open Voice Cloning' }}
      secondaryAction={{ href: '/pricing', label: 'See Clone Credit Packs' }}
      introduction={{
        title: 'How Does Voice Cloning Work?',
        paragraphs: [
          'Voice cloning uses a recording to create a voice that can speak new text. In VoiceWove, upload your sample, create the clone, then select the saved voice when generating speech. You can use a short test to check how it handles your words and pronunciation.',
          `There are two costs to understand: creating a clone uses a clone/design credit, and generating audio uses character quota. A $${PRODUCT_PRICES_USD.clone1} pack includes ${CLONE_PACKS.clone1} clone/design credit. The free speech trial does not include that credit.`,
        ],
      }}
      features={[
        { title: 'Use an authorized recording', body: 'Start with your own voice or a recording you have permission to use. A quiet phone recording can meet the upload requirements.' },
        { title: 'Generate new text', body: 'Select the saved clone and enter a new passage. Check a short result before producing a longer recording.' },
        { title: 'Control the delivery', body: 'Adjust the available speed, pitch and audio settings in the cloning workspace.' },
        { title: 'Keep costs visible', body: 'Clone/design credits and speech characters are separate balances. Check both before beginning a project.' },
      ]}
      comparison={{
        title: 'AI Voice Cloning vs. Voice Design: Which Do You Need?',
        paragraphs: [
          'AI voice cloning reproduces one specific voice from a recording you own or are authorized to use, so it fits narration that must sound like a particular speaker.',
          'Voice design creates a new voice from a written description, which fits projects that need a distinct voice without a recorded sample.',
          'Creating either one consumes a clone/design credit, and speech generated with it uses character quota separately.',
        ],
      }}
      specifications={[
        { label: 'Recording format', value: 'MP3, M4A or WAV audio from one speaker.' },
        { label: 'Recording limits', value: '10 seconds to 5 minutes; maximum file size 5 MB.' },
        { label: 'Create a voice', value: `Requires a clone/design credit. $${PRODUCT_PRICES_USD.clone1} buys ${CLONE_PACKS.clone1} credit; purchased credits do not have a subscription expiry.` },
        { label: 'Generate speech', value: 'Uses character quota separately from the credit used to create the voice.' },
        { label: 'Speech trial', value: `${trialCharacters} synthesis characters for ${TRIAL_OFFER.days} days for new accounts. Clone/design credits are not included.` },
        { label: 'Output', value: 'MP3 from the cloning workspace.' },
        { label: 'Voice permissions', value: 'Your own or legally authorized voice. Follow the terms and the usage restrictions shown in the workspace.' },
      ]}
      steps={[
        'Record continuous speech in a quiet room. Check that the recording is 10 seconds to 5 minutes, at most 5 MB, and in a supported format.',
        'Sign in, check your clone/design credit balance, upload the recording and create the clone.',
        'Select your saved clone and a language, then generate a short passage using character quota. Listen before downloading the MP3.',
      ]}
      example={{
        title: 'A Script for Your Recording Test',
        description: 'Read this passage aloud at your normal pace. Check the resulting recording duration and file size before uploading it.',
        script: 'Hello, this is my voice sample. I am speaking at a comfortable pace in a quiet room. Today I walked through the park, watched the leaves move in the wind, and stopped to listen to the birds. I want to hear how my voice sounds when reading a new sentence.',
      }}
      faqs={faqs}
      related={[
        { href: '/free-text-to-speech', title: 'Text to Speech', description: 'Try speech generation with the available system voices.' },
        { href: '/ai-story-voiceover', title: 'Story Voiceover', description: 'Assign voices to narration and character dialogue.' },
        { href: '/ai-podcast-generator', title: 'AI Podcast Generator', description: 'Choose voices for an editable host-and-guest script.' },
      ]}
      closing={{
        title: 'Start with a Clear Recording',
        description: `Have your authorized sample ready. Creating the clone requires a clone/design credit from $${PRODUCT_PRICES_USD.clone1}, plus character quota when you generate speech.`,
      }}
    />
  );
}
