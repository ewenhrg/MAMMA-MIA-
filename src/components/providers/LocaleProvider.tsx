"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { getDictionary, otherLocale, type Dict, type Locale } from "@/lib/i18n";

type LocaleContextValue = {
  lang: Locale;
  t: Dict;
  other: Locale;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  lang,
  children,
}: {
  lang: Locale;
  children: ReactNode;
}) {
  const value = useMemo<LocaleContextValue>(
    () => ({ lang, t: getDictionary(lang), other: otherLocale(lang) }),
    [lang],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used inside <LocaleProvider>");
  }
  return context;
}
