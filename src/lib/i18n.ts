import { en, type Dictionary } from "@/locales/en";
import { fr } from "@/locales/fr";
import type { Translated } from "@/locales/types";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie used to remember the visitor's choice across visits. */
export const LOCALE_COOKIE = "mm_lang";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

const dictionaries: Record<Locale, Translated<Dictionary>> = { en, fr };

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale) => dictionaries[locale];

export const otherLocale = (locale: Locale): Locale =>
  locale === "en" ? "fr" : "en";

/** BCP-47 tags used for <html lang>, hreflang and Open Graph. */
export const htmlLang: Record<Locale, string> = { en: "en", fr: "fr" };
export const ogLocale: Record<Locale, string> = { en: "en_GB", fr: "fr_FR" };

export type { Dictionary };
export type Dict = Translated<Dictionary>;
