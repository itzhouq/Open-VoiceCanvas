import { CHARACTER_PACKS, CLONE_PACKS, PODCAST_BATCH_CHARACTER_MULTIPLIER, PRODUCT_PRICES_USD, SUBSCRIPTION_PLANS } from '@/lib/product-catalog';
import { TRIAL_OFFER } from '@/lib/trial-offer';

export function getPublicPageIndex() {
  return `# VoiceWove

> VoiceWove is a browser-based text-to-speech, multi-character story narration, two-host podcast, voice cloning and voice design service.

## Product guides
- [Text to speech](https://voicewove.com/free-text-to-speech): Account-based trial, text input, available voices and MP3 download.
- [Story voiceover](https://voicewove.com/ai-story-voiceover): Narrator and character voices, editable scripts and combined WAV output.
- [Podcast generator](https://voicewove.com/ai-podcast-generator): Topic or pasted text to a two-host script and combined WAV audio.
- [Voice cloning](https://voicewove.com/voice-cloning): Recording requirements, separate cloning credits, consent and data handling.
- [Pricing](https://voicewove.com/pricing): Current trial, subscriptions, one-time character packs and voice credits.

## Policies and support
- [Terms](https://voicewove.com/terms): Content rights, voice restrictions, subscriptions and refund conditions.
- [Privacy](https://voicewove.com/privacy): Service providers, retention and deletion requests.
- [Product facts](https://voicewove.com/llms-full.txt): A concise summary of the public guides and pricing.

The public product and policy pages are the sources for these facts. Voice and language availability depend on the selected tool; no fixed count of voices or languages is promised here.
`;
}

export function getPublicProductSummary() {
  const n = (value: number) => value.toLocaleString('en-US');
  return `${getPublicPageIndex()}
## Trial and billing
- Registration is required for the synthesis trial. No credit card is required.
- Trial: ${n(TRIAL_OFFER.characters)} synthesis characters, valid for ${TRIAL_OFFER.days} days.
- Characters are not words. Spaces and punctuation are included in character usage.
- Initial full-episode podcast generation uses ${PODCAST_BATCH_CHARACTER_MULTIPLIER} times the confirmed dialogue character count; editing or regenerating one segment uses its own character count once. Revisions use additional quota.
- Monthly subscription: USD ${PRODUCT_PRICES_USD.monthly.toFixed(2)}, ${n(SUBSCRIPTION_PLANS.monthly.characters)} characters per month.
- Annual subscription: USD ${PRODUCT_PRICES_USD.yearly.toFixed(2)}, ${n(SUBSCRIPTION_PLANS.yearly.characters)} characters per year.
- One-time character packs: USD ${PRODUCT_PRICES_USD.tenThousandChars} for ${n(CHARACTER_PACKS.tenThousandChars)}; USD ${PRODUCT_PRICES_USD.millionChars} for ${n(CHARACTER_PACKS.millionChars)}; USD ${PRODUCT_PRICES_USD.threeMillionChars} for ${n(CHARACTER_PACKS.threeMillionChars)} characters.
- Voice cloning or design credits: USD ${PRODUCT_PRICES_USD.clone1} for ${CLONE_PACKS.clone1}; USD ${PRODUCT_PRICES_USD.clone10} for ${CLONE_PACKS.clone10}; USD ${PRODUCT_PRICES_USD.clone50} for ${CLONE_PACKS.clone50} credits.
- Creating a cloned or designed voice uses a voice credit. Synthesizing speech also uses character quota. The text-to-speech trial does not include a free voice credit.
- Purchased character packs and unused purchased voice credits do not expire. Trial and subscription character quota has an expiry.
- Payments are processed through Creem. Payment methods are displayed at checkout. See the Terms for renewal, cancellation and refund conditions.

## Inputs and outputs
- Text to speech: paste text or import TXT/Markdown; direct PDF and Word parsing is not supported by this tool. Download generated TTS audio as MP3.
- Stories: write, paste or generate a script, review narration and character assignments, select voices, generate audio, and download the combined track as WAV.
- Podcasts: enter a topic or paste text, review the two-host dialogue, select voices, generate audio, and download the combined track as WAV.
- Cloning: use a recording of your own voice or one you are authorized to use. Check the cloning guide for accepted formats, file size and recording requirements.
- Audio quality and available voices depend on the selected voice, language and input. Try a short passage before committing a long project.

## Rights and privacy
- A paid plan provides usage quota, not rights to third-party scripts or voices. Follow the Terms and voice-specific restrictions. Cloned voices are restricted to personal, non-commercial use by the cloning tool.
- MiniMax processes audio samples for voice cloning and text for synthesis, as described in the Privacy Policy.
- Removing a saved voice from an account is not a guarantee of immediate deletion from every provider or backup. Use the Privacy Policy contact for data-erasure requests and scope.
- Support: support@voicewove.com. Include an order reference or the error message when requesting billing assistance.
`;
}
