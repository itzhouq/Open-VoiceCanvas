import type { Metadata } from 'next';
import { GeoLandingPage, type LandingFaq } from '@/components/geo-landing-page';
import { TRIAL_OFFER } from '@/lib/trial-offer';
import { PODCAST_BATCH_CHARACTER_MULTIPLIER, PRODUCT_PRICES_USD } from '@/lib/product-catalog';

const trialCharacters = TRIAL_OFFER.characters.toLocaleString('en-US');
const title = 'AI Podcast Generator with Editable Host and Guest Voices';
const description = `Turn a topic or pasted text into a host-and-guest podcast script. Edit dialogue, choose voices and export the full episode as WAV. ${TRIAL_OFFER.days}-day speech trial.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://voicewove.com/ai-podcast-generator' },
  openGraph: {
    title,
    description,
    url: 'https://voicewove.com/ai-podcast-generator',
    siteName: 'VoiceWove',
    type: 'website',
  },
};

const faqs: LandingFaq[] = [
  {
    q: 'How many characters does a podcast use?',
    a: `The initial full-episode generation uses ${PODCAST_BATCH_CHARACTER_MULTIPLIER} times the total character count of the confirmed dialogue. For example, 1,000 dialogue characters use ${1000 * PODCAST_BATCH_CHARACTER_MULTIPLIER} quota characters. Editing or regenerating an individual segment uses that segment’s character count once. Budget for revisions as well as the first version.`,
  },
  {
    q: 'How can I turn an article into a two-speaker podcast?',
    a: 'Paste the article text or your topic notes into the podcast workspace. VoiceWove prepares a host-and-guest dialogue that you can review and edit. Choose a voice for each speaker, generate the audio, then download the complete episode as WAV.',
  },
  {
    q: 'Can I choose the host and guest voices?',
    a: 'Yes. The podcast workspace has separate voice choices for the host and guest. Review the available system voices or saved voices, then test a short exchange to check that the two speakers are easy to distinguish.',
  },
  {
    q: 'Can I edit the script or replace one audio segment?',
    a: 'Yes. Review and edit the generated dialogue before creating audio. You can regenerate individual segments and combine the current audio into a complete episode. New speech generation uses character quota, so leave room in your balance for revisions.',
  },
  {
    q: 'Does it accept PDF or Word uploads?',
    a: 'The podcast workspace takes a topic or pasted text, up to 10,000 characters. To use a PDF, Word document or web article, first copy the relevant text into the input. The podcast form does not directly import those files or fetch a webpage from its URL.',
  },
  {
    q: 'Is the podcast export MP3 or WAV?',
    a: 'The complete combined podcast downloads as WAV. Individual generated speech segments can be downloaded as MP3. If your podcast host requires a single MP3, convert the combined WAV with an audio editor before uploading.',
  },
  {
    q: 'Is the AI podcast generator free to try?',
    a: `New accounts receive ${trialCharacters} speech-synthesis characters for ${TRIAL_OFFER.days} days without a credit card. Generation requires an account and sufficient quota. The trial is shared with other speech workflows; creating a cloned voice requires separate clone/design credits.`,
  },
  {
    q: 'Can I publish the result on Spotify, YouTube or Apple Podcasts?',
    a: 'You can download the audio and prepare it for your chosen publishing service; VoiceWove does not publish the episode for you. Review the destination’s policies, your rights to the source material and voices, and our Terms of Service. Buying quota alone does not settle those permissions.',
  },
  {
    q: 'Will the generated conversation preserve every fact from my source?',
    a: 'Review the dialogue before synthesis. Generated scripts can omit details or introduce mistakes, so check names, figures, quotations and claims against the source. Edit the script to reflect what you want to say before generating the final audio.',
  },
  {
    q: 'Can I produce the episode in another language?',
    a: 'Use the language options available in the podcast workspace and review the generated text before synthesis. Prepare or edit the script in your target language, then test the selected voices. Check pronunciation and meaning before creating the complete episode.',
  },
];

export default function AiPodcastGeneratorPage() {
  return (
    <GeoLandingPage
      eyebrow="AI Podcast Generator"
      title="AI Podcast Generator: Turn Your Notes into a Host-and-Guest Podcast"
      description="Paste a topic or source text, review an AI-generated dialogue, and choose a voice for each speaker. Edit the conversation and download the complete episode as WAV."
      offerNote={`${trialCharacters} synthesis characters · ${TRIAL_OFFER.days}-day trial · Account required · No credit card required`}
      primaryAction={{ href: '/podcast', label: 'Try the Podcast Generator' }}
      introduction={{
        title: 'How Can I Make a Podcast from Written Content?',
        paragraphs: [
          'VoiceWove turns a topic or pasted text into a conversation between a host and a guest. Review the proposed dialogue, choose each speaker’s voice, and generate the segments. It is useful for lesson recaps, topic explainers and drafts of conversational episodes.',
          'You control the script and voice assignments before creating the finished audio. Check facts against your source, revise any awkward lines, and combine the generated segments when the conversation is ready.',
        ],
      }}
      features={[
        { title: 'Start with a topic or text', body: 'Paste notes or text from a document to prepare a host-and-guest dialogue.' },
        { title: 'Choose each speaker', body: 'Select the host and guest voices separately so listeners can follow the conversation.' },
        { title: 'Review before recording', body: 'Edit the script, check facts and change wording before generating speech.' },
        { title: 'Keep the audio files', body: 'Download individual MP3 segments or the complete WAV for editing and publishing preparation.' },
      ]}
      specifications={[
        { label: 'Input', value: 'Topic notes or pasted text, up to 10,000 characters. Copy text from PDFs, Word files or articles first.' },
        { label: 'Speakers', value: 'A host and a guest with separate voice assignments.' },
        { label: 'Editing', value: 'Review and edit dialogue, then generate or regenerate individual speech segments.' },
        { label: 'Output', value: 'WAV for the combined episode; MP3 for individual speech segments.' },
        { label: 'Trial quota', value: `${trialCharacters} synthesis characters for ${TRIAL_OFFER.days} days. Revisions and other speech workflows share your quota.` },
        { label: 'Character usage', value: `Initial full episode: ${PODCAST_BATCH_CHARACTER_MULTIPLIER} times the confirmed dialogue length. Individual segment edits and regeneration: the segment’s character count once.` },
        { label: 'Paid options', value: `Subscriptions from $${PRODUCT_PRICES_USD.monthly}/month or one-time character packs from $${PRODUCT_PRICES_USD.tenThousandChars}. Clone/design credits are separate.` },
        { label: 'Publishing', value: 'Download and upload to your chosen host yourself, subject to content rights and that service’s requirements.' },
      ]}
      steps={[
        'Sign in and paste a topic or the relevant text from your document. Keep the input within the displayed character limit.',
        'Generate the dialogue and review it against your source. Edit the wording and choose a voice for the host and guest.',
        'Generate and listen to the speech segments. Revise any that need changes, then download the complete episode as WAV.',
      ]}
      example={{
        title: 'A Topic Brief You Can Try',
        description: 'Paste this brief into the podcast input. Review the proposed host-and-guest dialogue before generating audio.',
        script: 'Create a short conversation for students about planning a reading habit. The host asks how to choose a realistic reading goal. The guest suggests setting aside a small amount of time, choosing an interesting book, and keeping notes about what they read. End by inviting listeners to pick one book and a time to begin. Keep the advice practical and avoid invented research statistics.',
      }}
      faqs={faqs}
      related={[
        { href: '/ai-story-voiceover', title: 'Story Voiceover', description: 'Create narration with a cast of story characters.' },
        { href: '/free-text-to-speech', title: 'Text to Speech', description: 'Read your prepared script as a single-voice MP3.' },
        { href: '/voice-cloning', title: 'Voice Cloning', description: 'Check the requirements for using your own recorded voice.' },
      ]}
      closing={{
        title: 'Draft Your First Conversation',
        description: `Start with a short topic using your ${trialCharacters}-character trial. Review the dialogue and test the voices before creating a longer episode.`,
      }}
    />
  );
}
