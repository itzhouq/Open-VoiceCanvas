// Public product facts shared by the storefront and entitlement handlers.
// Keep provider product IDs and credentials in lib/creem.ts, never in this file.
export interface TrialOffer {
  characters: number;
  days: number;
}

export const DEFAULT_TRIAL: TrialOffer = { characters: 10000, days: 7 };

// The existing initial full-episode flow charges twice the dialogue length.
// Editing or regenerating an individual segment uses its own text length.
export const PODCAST_BATCH_CHARACTER_MULTIPLIER = 2;

export const PRODUCT_PRICES_USD = {
  monthly: 5.99,
  yearly: 49.9,
  tenThousandChars: 6,
  millionChars: 55,
  threeMillionChars: 150,
  clone1: 3,
  clone10: 30,
  clone50: 150,
} as const;

export const SUBSCRIPTION_PLANS: Record<string, { months: number; characters: number }> = {
  monthly: { months: 1, characters: 100000 },
  yearly: { months: 12, characters: 1500000 },
};

export const CHARACTER_PACKS: Record<string, number> = {
  tenThousandChars: 10000,
  millionChars: 1000000,
  threeMillionChars: 3000000,
};

export const CLONE_PACKS: Record<string, number> = {
  clone1: 1,
  clone10: 10,
  clone50: 50,
};
