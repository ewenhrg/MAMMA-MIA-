"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Cta } from "@/components/ui/Cta";
import { ArrowUpRight, Instagram, WhatsApp } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { hasReservationLink, navigation, reservationHref, siteConfig, whatsappHref } from "@/config/site";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const { t, lang } = useLocale();
  const { scrollY } = useScroll();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const condensed = scrolled || !desktop;

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 40);
  });

  // Highlight the section currently occupying the middle of the viewport.
  useEffect(() => {
    const targets = navigation
      .map((item) => document.querySelector(item.hash))
      .filter((element): element is Element => Boolean(element));

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[70]"
        style={{ paddingTop: "var(--safe-t)" }}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={cn(
            "absolute inset-0 -z-10 border-b transition-all duration-500",
            condensed
              ? "border-[color:var(--hairline)] bg-[color:var(--shell)]/72 shadow-[0_18px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        />

        <div
          className={cn(
            "shell flex items-center justify-between gap-4 transition-all duration-500",
            condensed ? "py-2.5" : "py-4",
          )}
        >
          <a
            href="#top"
            className="flex shrink-0 items-center gap-3"
            aria-label={siteConfig.name}
          >
            <motion.span
              animate={{ scale: condensed ? 0.86 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left"
            >
              <Logo size={condensed ? 46 : 58} alt={t.common.a11y.logo} priority />
            </motion.span>
            <span className="sr-only">{siteConfig.name}</span>
          </a>

          <nav
            className="hidden lg:block"
            aria-label={t.common.a11y.mainNavigation}
          >
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const id = item.hash.replace("#", "");
                const isActive = active === id;
                return (
                  <li key={item.key}>
                    <a
                      href={item.hash}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-3.5 py-2 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors duration-300",
                        isActive
                          ? "text-[color:var(--fg)]"
                          : "text-[color:var(--fg-soft)] hover:text-[color:var(--fg)]",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 -z-10 rounded-full border border-[color:var(--hairline)] bg-[color:var(--surface-raised)]"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      {t.common.nav[item.key]}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hidden on the smallest screens — it lives in the mobile menu instead. */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            <a
              href={siteConfig.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.common.actions.followInstagram}
              data-cursor={t.common.cursor.open}
              className="hidden h-9 w-9 place-items-center rounded-full border border-[color:var(--hairline)] text-[color:var(--fg-soft)] transition-colors duration-300 hover:text-[color:var(--fg)] lg:grid"
            >
              <Instagram className="h-4 w-4" />
            </a>

            {hasReservationLink ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.common.actions.whatsapp}
                data-cursor={t.common.cursor.open}
                className="hidden h-9 w-9 place-items-center rounded-full border border-[color:var(--hairline)] text-[color:var(--fg-soft)] transition-colors duration-300 hover:text-[color:var(--fg)] lg:grid"
              >
                <WhatsApp className="h-4 w-4" />
              </a>
            ) : null}

            <Cta
              href={hasReservationLink ? reservationHref(lang) : "#contact"}
              external={hasReservationLink}
              size="sm"
              className="hidden md:inline-flex"
              icon={
                hasReservationLink ? (
                  <WhatsApp className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUpRight className="h-3 w-3" />
                )
              }
            >
              {t.common.actions.book}
            </Cta>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t.common.actions.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color:var(--hairline)] bg-[color:var(--surface-raised)] backdrop-blur lg:hidden"
            >
              <span className="flex h-3 w-4.5 flex-col justify-between">
                <span className="h-px w-full bg-[color:var(--fg)]" />
                <span className="h-px w-full bg-[color:var(--fg)]" />
                <span className="h-px w-3 bg-[color:var(--fg)]" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
