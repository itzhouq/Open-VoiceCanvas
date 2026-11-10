'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { TrialOffer } from '@/lib/product-catalog';

const TrialOfferContext = createContext<TrialOffer | null>(null);

export function ProductFactsProvider({ trialOffer, children }: { trialOffer: TrialOffer; children: ReactNode }) {
  return <TrialOfferContext.Provider value={trialOffer}>{children}</TrialOfferContext.Provider>;
}

export function useTrialOffer() {
  const offer = useContext(TrialOfferContext);
  if (!offer) throw new Error('useTrialOffer must be used within ProductFactsProvider');
  return offer;
}
