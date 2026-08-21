"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Instagram, TikTok, WhatsApp } from "@/components/ui/Icons";
import { hasReservationLink, reservationHref, siteConfig, whatsappHref } from "@/config/site";

/**
 * Fixed quick actions on small screens. It stays out of the way until the
 * visitor has left the hero, and sits above the home indicator on iOS.
 */
export function MobileActionBar() {
  const { t, lang } = useLocale();
  const { scrollY } = useScroll();
  const [shown, setShown] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => {
    setShown(value > window.innerHeight * 0.38);
  });

  return (
    <motion.div
      className={`fixed inset-x-0 bottom-0 z-[65] lg:hidden ${shown ? "" : "pointer-events-none"}`}
      style={{
        paddingBottom: "calc(var(--safe-b) + 0.65rem)",
        paddingLeft: "max(0.75rem, var(--safe-l))",
        paddingRight: "max(0.75rem, var(--safe-r))",
      }}
      initial={false}
      animate={{ y: shown ? 0 : 120, opacity: shown ? 1 : 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden={!shown}
    >
      <div className="mx-auto flex max-w-md items-center gap-1.5 rounded-full border border-white/12 bg-night/85 p-1.5 text-cream shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] backdrop-blur-xl">
        <a
          href={siteConfig.social.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.common.actions.followInstagram}
          tabIndex={shown ? 0 : -1}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12"
        >
          <Instagram className="h-4.5 w-4.5" />
        </a>

        <a
          href={siteConfig.social.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.common.actions.followTikTok}
          tabIndex={shown ? 0 : -1}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12"
        >
          <TikTok className="h-4.5 w-4.5" />
        </a>

        {hasReservationLink ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.common.actions.whatsapp}
            tabIndex={shown ? 0 : -1}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/12"
          >
            <WhatsApp className="h-4.5 w-4.5" />
          </a>
        ) : null}

        <a
          href={hasReservationLink ? reservationHref(lang) : "#contact"}
          {...(hasReservationLink
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          tabIndex={shown ? 0 : -1}
          className="flex h-11 flex-1 items-center justify-center rounded-full bg-gradient-to-r from-sunset to-gold px-3 text-[0.7rem] font-semibold tracking-[0.14em] text-cream uppercase"
        >
          {t.common.actions.bookShort}
        </a>
      </div>
    </motion.div>
  );
}
