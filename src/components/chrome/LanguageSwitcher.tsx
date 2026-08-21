"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * EN / FR pill with a sliding indicator. The choice is written to a cookie so it
 * survives navigation and future visits, and the URL always carries the locale
 * so a shared link opens in the right language.
 */
export function LanguageSwitcher({
  size = "md",
  className,
}: {
  size?: "md" | "lg";
  className?: string;
}) {
  const { lang, t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const go = (next: Locale) => {
    if (next === lang) return;
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
    router.refresh();
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center rounded-full border p-1",
        "border-[color:var(--hairline)] bg-[color:var(--surface-raised)] backdrop-blur",
        className,
      )}
      role="group"
      aria-label={t.common.a11y.languageSwitcher}
    >
      {locales.map((locale) => {
        const active = locale === lang;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => go(locale)}
            aria-current={active ? "true" : undefined}
            aria-label={locale === "en" ? t.common.language.en : t.common.language.fr}
            className={cn(
              "relative z-10 rounded-full font-semibold uppercase tracking-[0.16em] transition-colors duration-300",
              size === "lg"
                ? "min-h-11 px-5 text-sm"
                : "min-h-8 px-3.5 text-[0.6875rem]",
              active ? "text-cream" : "text-[color:var(--fg-soft)] hover:text-[color:var(--fg)]",
            )}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-sunset to-gold"
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
              />
            )}
            {locale}
          </button>
        );
      })}
    </div>
  );
}
