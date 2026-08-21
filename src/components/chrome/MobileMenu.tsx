"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Cta } from "@/components/ui/Cta";
import { Instagram, Snapchat, TikTok, WhatsApp } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { navigation, siteConfig, hasReservationLink, reservationHref, whatsappHref } from "@/config/site";
import { useScrollLock } from "@/lib/hooks";
import { LanguageSwitcher } from "./LanguageSwitcher";

const panel = {
  hidden: { clipPath: "inset(0% 0% 100% 0%)" },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    clipPath: "inset(0% 0% 100% 0%)",
    transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] as const },
  },
};

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, lang } = useLocale();
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 z-[75] flex flex-col overflow-y-auto overscroll-contain bg-night text-cream lg:hidden"
          variants={panel}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label={t.common.actions.menu}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
            style={{
              background:
                "radial-gradient(90% 60% at 80% 0%, rgba(249,178,51,0.22) 0%, transparent 62%)",
            }}
            aria-hidden="true"
          />

          <div
            className="relative flex items-center justify-between px-6"
            style={{
              paddingTop: "calc(var(--safe-t) + 1.05rem)",
              paddingBottom: "1.05rem",
              paddingLeft: "max(1.5rem, var(--safe-l))",
              paddingRight: "max(1.5rem, var(--safe-r))",
            }}
          >
            <Logo size={46} alt={t.common.a11y.logo} />
            <button
              type="button"
              onClick={onClose}
              aria-label={t.common.actions.closeMenu}
              className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream"
            >
              <span className="relative block h-4 w-4">
                <span className="absolute top-1/2 left-0 h-px w-full rotate-45 bg-current" />
                <span className="absolute top-1/2 left-0 h-px w-full -rotate-45 bg-current" />
              </span>
            </button>
          </div>

          <nav className="relative flex-1 px-6 pt-4" aria-label={t.common.actions.menu}>
            <ul>
              {navigation.map((item, index) => (
                <motion.li
                  key={item.key}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.18 + index * 0.055,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="border-b border-cream/10"
                >
                  <a
                    href={item.hash}
                    onClick={onClose}
                    className="font-display flex min-h-12 items-baseline gap-3 py-2.5 text-[clamp(1.65rem,8vw,2.75rem)] text-cream sm:gap-4 sm:py-4"
                  >
                    <span className="font-body text-[0.625rem] font-semibold tracking-[0.2em] text-gold">
                      0{index + 1}
                    </span>
                    {t.common.nav[item.key]}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="relative mt-4 px-6 sm:mt-8"
            style={{ paddingBottom: "calc(var(--safe-b) + 1.75rem)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <span className="t-label text-cream/45">{t.common.language.label}</span>
              <LanguageSwitcher size="lg" />
            </div>

            <Cta
              href={hasReservationLink ? reservationHref(lang) : "#contact"}
              external={hasReservationLink}
              onClick={onClose}
              className="w-full"
              icon={<WhatsApp className="h-4 w-4" />}
            >
              {t.common.actions.book}
            </Cta>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={siteConfig.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/20 text-xs font-semibold tracking-[0.14em] uppercase"
              >
                <Instagram className="h-4 w-4" />
                {t.common.actions.instagram}
              </a>
              <a
                href={siteConfig.social.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/20 text-xs font-semibold tracking-[0.14em] uppercase"
              >
                <TikTok className="h-4 w-4" />
                {t.common.actions.tiktok}
              </a>
              {hasReservationLink ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/20 text-xs font-semibold tracking-[0.14em] uppercase"
                >
                  <WhatsApp className="h-4 w-4" />
                  {t.common.actions.whatsapp}
                </a>
              ) : siteConfig.social.snapchatUrl ? (
                <a
                  href={siteConfig.social.snapchatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/20 text-xs font-semibold tracking-[0.14em] uppercase"
                >
                  <Snapchat className="h-4 w-4" />
                  {t.common.actions.snapchat}
                </a>
              ) : (
                <span className="col-span-2 flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/10 text-xs font-semibold tracking-[0.14em] text-cream/40 uppercase">
                  <Snapchat className="h-4 w-4" />
                  {siteConfig.social.snapchatHandle}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
