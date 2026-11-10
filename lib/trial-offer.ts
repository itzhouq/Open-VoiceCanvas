import { DEFAULT_TRIAL, type TrialOffer } from '@/lib/product-catalog';

// Server-only configuration: preserve the existing quota defaults and parsing.
// Client components receive only these two public numbers through the provider.
export const TRIAL_TEMPORARY_QUOTA = parseInt(process.env.TRIAL_TEMPORARY_QUOTA || String(DEFAULT_TRIAL.characters), 10);
export const TRIAL_DAYS = parseInt(process.env.TRIAL_DAYS || String(DEFAULT_TRIAL.days), 10);

export const TRIAL_OFFER: TrialOffer = {
  characters: TRIAL_TEMPORARY_QUOTA,
  days: TRIAL_DAYS,
};
