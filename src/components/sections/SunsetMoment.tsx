"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { parseAccents, plainText } from "@/components/ui/Reveal";
import { Birds, Palm } from "@/components/ui/Silhouettes";

/**
 * The pivot between day and night. No cards, no columns — one full-height beat
 * where the sky behind the page does the talking and the horizon sinks past.
 */
export function SunsetMoment() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const horizon = useTransform(scrollYProgress, [0, 1], ["18%", "-14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["24%", "-24%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[70svh] items-center justify-center overflow-hidden sm:min-h-[86svh]"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={reduced ? undefined : { y: horizon }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          className="h-full w-full"
        >
          <g opacity="0.8">
            <Birds x={300} y={228} scale={0.62} />
          </g>
          <g opacity="0.5">
            <Birds x={846} y={176} scale={0.42} />
          </g>
          <Palm x={92} y={940} scale={0.62} />
          <Palm x={1118} y={918} scale={0.5} flip />
        </svg>
      </motion.div>

      <motion.div
        className="shell relative z-10 text-center"
        style={reduced ? undefined : { y: textY, opacity }}
      >
        <p className="t-eyebrow text-[color:var(--accent)]">{t.home.sunset.eyebrow}</p>
        <h2 className="font-display t-h1 mt-5 text-[color:var(--fg)]">
          <span className="sr-only">{plainText([t.home.sunset.title])}</span>
          <span aria-hidden="true">
            {parseAccents(t.home.sunset.title).map((word, index) => (
              <span
                key={`${word.text}-${index}`}
                className={word.accent ? "font-accent lowercase" : undefined}
              >
                {word.text}{" "}
              </span>
            ))}
          </span>
        </h2>
        <p className="t-lead text-pretty mx-auto mt-6 max-w-[46ch] text-[color:var(--fg-soft)]">
          {t.home.sunset.lead}
        </p>
      </motion.div>
    </section>
  );
}
