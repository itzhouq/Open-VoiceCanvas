'use client';

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { ProductFactsProvider } from '@/components/product-facts-provider';
import type { TrialOffer } from '@/lib/product-catalog';

export function Providers({
  children,
  session,
  trialOffer,
}: {
  children: React.ReactNode;
  session: any;
  trialOffer: TrialOffer;
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ProductFactsProvider trialOffer={trialOffer}>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ProductFactsProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
