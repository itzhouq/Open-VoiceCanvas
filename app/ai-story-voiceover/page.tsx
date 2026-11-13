import type { Metadata } from 'next';
import { GeoLandingPage, type LandingFaq } from '@/components/geo-landing-page';
import { TRIAL_OFFER } from '@/lib/trial-offer';
import { PRODUCT_PRICES_USD } from '@/lib/product-catalog';

const trialCharacters = TRIAL_OFFER.characters.toLocaleString('en-US');
const title = 'AI Story Voiceover with a Voice for Every Character';
const description = `Turn a story into narration and character dialogue with AI voices. Assign voices, edit segments and export combined WAV audio. ${trialCharacters} trial characters for ${TRIAL_OFFER.days} days.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://voicewove.com/ai-story-voiceover' },
  openGraph: {
    title,
    description,
    url: 'https://voicewove.com/ai-story-voiceover',
    siteName: 'VoiceWove',
    type: 'website',
  },
};

const faqs: LandingFaq[] = [
  {
    q: 'How can I give each character a different voice?',
    a: 'Enter your story in the story workspace, separate narration from character dialogue, and choose a voice for the narrator and each character. Review the segments before generating audio. The finished story can be combined into one WAV file.',
  },
  {
    q: 'What script format should I use?',
    a: 'Put each narration or dialogue segment on its own line. For dialogue, use a character name followed by a colon and a sentence in double quotation marks, such as Maya: "I found the map." Plain lines are treated as narration. Check the parsed characters and segments before generation.',
  },
  {
    q: 'Can I edit one segment and regenerate it?',
    a: 'Yes. The story workspace lets you edit segments and assign voices before generating their audio. Regenerate changed segments and combine the current audio when you are ready. Newly synthesized text uses character quota, so allow for revisions when planning a project.',
  },
  {
    q: 'Does story voiceover export MP3 or WAV?',
    a: 'The story workspace downloads the combined story as WAV. The plain text-to-speech and cloning workspaces download MP3. If your publishing workflow requires MP3, convert the completed WAV with an audio editor before uploading it.',
  },
  {
    q: 'Can I turn a long book into an audiobook?',
    a: 'You can work through a book in sections. Manual story input is limited to 10,000 characters at a time, and synthesis requires sufficient character quota. Split longer chapters into smaller scenes, review character assignments, and save each completed audio file for later assembly.',
  },
  {
    q: 'Is there a free trial?',
    a: `New accounts receive ${trialCharacters} synthesis characters for ${TRIAL_OFFER.days} days, without a credit card. The quota is shared across speech-generation workflows. Voice cloning requires separate clone/design credits. Subscriptions start at $${PRODUCT_PRICES_USD.monthly}/month and one-time character packs start at $${PRODUCT_PRICES_USD.tenThousandChars}.`,
  },
  {
    q: 'Can I use the story audio for YouTube or an audiobook release?',
    a: 'Review the rights to your story, any source material and the selected voices before publishing. Our Terms of Service govern use of the service and generated content. Paid quota does not grant rights to third-party stories or voices; contact support if the permissions for your intended project are unclear.',
  },
  {
    q: 'Which language should I use for my story?',
    a: 'Choose an available language in the story workspace and test a short scene with the intended voices. Check names, pronunciation and emotional delivery. Available voices and their suitability vary, so review the result before generating a full chapter.',
  },
];

export default function AiStoryVoiceoverPage() {
  return (
    <GeoLandingPage
      eyebrow="AI Story Voiceover"
      title="AI Story Voiceover with a Voice for Every Character"
      description="Turn a written story into narration and dialogue with different AI voices. Assign the cast, edit individual segments and download the combined story as WAV."
      offerNote={`${trialCharacters} synthesis characters · ${TRIAL_OFFER.days}-day trial · Account required · No credit card required`}
      primaryAction={{ href: '/story', label: 'Try Story Voiceover' }}
      introduction={{
        title: 'Narrator vs. Character Voices',
        paragraphs: [
          'VoiceWove gives narration and character dialogue separate voice assignments. Paste a story you have written, review its segments, then choose how each speaker sounds. This makes it useful for fiction drafts, classroom dialogues and stories with a cast of characters.',
          'You can also use the story generator to draft a script. Review the text and character assignments before synthesis, then listen to the segments and download the combined WAV audio.',
        ],
      }}
      featuresHeading="Character Voice Generator: Cast Each Role"
      features={[
        { title: 'Assign a cast', body: 'Give the narrator and each character a voice, and keep those choices consistent across the scene.' },
        { title: 'Revise individual segments', body: 'Edit a line or its delivery, then regenerate the affected audio before combining the story.' },
        { title: 'Start from your script', body: 'Paste your own story or use the built-in story generator to prepare a draft for review.' },
        { title: 'Download the full scene', body: 'Combine generated segments into a WAV file for playback and further audio editing.' },
      ]}
      specifications={[
        { label: 'Input', value: 'Pasted story text or a draft from the story generator. Use a separate line for each narration or dialogue segment.' },
        { label: 'Manual text limit', value: 'Up to 10,000 characters at a time. Split longer chapters into scenes.' },
        { label: 'Voice control', value: 'Separate narrator and character voice assignments, with segment editing and regeneration.' },
        { label: 'Combined output', value: 'WAV. Use an audio editor to convert the completed file if your destination needs MP3.' },
        { label: 'Trial quota', value: `${trialCharacters} synthesis characters for ${TRIAL_OFFER.days} days. The quota is shared with other speech workflows.` },
        { label: 'Own-voice option', value: `Creating a cloned voice requires separate clone/design credits, starting at $${PRODUCT_PRICES_USD.clone1}. Speech still uses character quota.` },
      ]}
      steps={[
        'Paste a scene you have permission to use, or generate a draft. Put character dialogue and narration on separate lines.',
        'Review the detected characters and segments. Assign the narrator and each character an available voice.',
        'Generate and listen to the segments. Edit any lines that need changes, then download the combined WAV file.',
      ]}
      example={{
        title: 'Try a Scene with Two Characters',
        description: 'Paste this script into the manual story input. Assign one voice to the narrator, one to Maya and one to Leo. The dialogue format matches the story parser.',
        script: 'The library was quiet when Maya opened the old atlas.\nMaya: "I found a map tucked inside the cover."\nLeo: "Does it show where the missing bridge used to be?"\nShe turned the page and pointed to a tiny blue line.\nMaya: "There. We can follow the river tomorrow."',
      }}
      faqs={faqs}
      related={[
        { href: '/free-text-to-speech', title: 'Text to Speech', description: 'Read a single passage and download it as MP3.' },
        { href: '/voice-cloning', title: 'Voice Cloning', description: 'Create a voice from your own or an authorized recording.' },
        { href: '/ai-podcast-generator', title: 'AI Podcast Generator', description: 'Prepare a conversation between a host and guest.' },
      ]}
      closing={{
        title: 'Hear Your First Scene',
        description: `Try a short story with your ${trialCharacters}-character trial. Review the voices and pacing before taking on a full chapter.`,
      }}
    />
  );
}
