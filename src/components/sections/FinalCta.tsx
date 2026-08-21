"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Cta } from "@/components/ui/Cta";
import { Instagram, WhatsApp } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { RevealLine, parseAccents, plainText } from "@/components/ui/Reveal";
import { Palm, StringLights } from "@/components/ui/Silhouettes";
import { hasReservationLink, reservationHref, siteConfig, whatsappHref } from "@/config/site";

/** The last full-height beat before the footer: badge, invitation, two ways in. */
export function FinalCta() {
  const { t, lang } = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[auto] flex-col items-center justify-center overflow-hidden py-16 text-center sm:min-h-[92svh] sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMax slice"
          className="h-full w-full"
        >
          <StringLights y={110} />
          <Palm x={104} y={848} scale={0.52} />
          <Palm x={1106} y={836} scale={0.44} flip />
          <path d="M0 806c190-26 330 15 540 6s350-38 660-17v145H0z" fill="#040910" />
        </svg>
      </div>

      <div className="shell relative z-10 flex flex-col items-center">
        <motion.div style={reduced ? undefined : { y, scale }}>
          <Logo size={92} alt={t.common.a11y.logo} className="drop-shadow-2xl sm:!h-[7.25rem] sm:!w-[7.25rem]" />
        </motion.div>

        <h2 className="font-display t-h1 mt-8 max-w-[16ch] text-[color:var(--fg)]">
          <span className="sr-only">{plainText([t.home.finalCta.title])}</span>
          <span aria-hidden="true">
            <RevealLine>
              {parseAccents(t.home.finalCta.title).map((word, index) => (
                <span
                  key={`${word.text}-${index}`}
                  className={word.accent ? "font-accent lowercase" : undefined}
                >
                  {word.text}{" "}
                </span>
              ))}
            </RevealLine>
          </span>
        </h2>

        <motion.p
          className="t-lead text-pretty mt-6 max-w-[42ch] text-[color:var(--fg-soft)]"
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.home.finalCta.lead}
        </motion.p>

        <motion.div
          className="mt-7 flex w-full max-w-md flex-col items-stretch gap-2.5 sm:mt-9 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Cta
            href={hasReservationLink ? reservationHref(lang) : "#contact"}
            external={hasReservationLink}
            cursorLabel={t.common.cursor.open}
            icon={<WhatsApp className="h-4 w-4" />}
            className="btn--pulse"
          >
            {t.common.actions.book}
          </Cta>
          {hasReservationLink ? (
            <Cta
              href={whatsappHref}
              external
              variant="ghost"
              cursorLabel={t.common.cursor.open}
              icon={<WhatsApp className="h-4 w-4" />}
            >
              {t.common.actions.whatsapp}
            </Cta>
          ) : null}
          <Cta
            href={siteConfig.social.instagramUrl}
            external
            variant="ghost"
            cursorLabel={t.common.cursor.open}
            icon={<Instagram className="h-4 w-4" />}
          >
            {t.common.actions.follow}
          </Cta>
        </motion.div>
      </div>
    </section>
  );
}
