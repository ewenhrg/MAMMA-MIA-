"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Cta } from "@/components/ui/Cta";
import { ArrowDown, ArrowUpRight, WhatsApp } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { parseAccents, plainText } from "@/components/ui/Reveal";
import { Birds, Bucket, Lounger, Palm, Parasol } from "@/components/ui/Silhouettes";
import { hasReservationLink, reservationHref, siteConfig, whatsappHref } from "@/config/site";
import { usePointerFine } from "@/lib/hooks";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const { t, lang } = useLocale();
  const reduced = useReducedMotion();
  const fine = usePointerFine();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Foreground layers drift at different rates on scroll, so the beach has depth.
  const farY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const midY = useTransform(scrollYProgress, [0, 1], ["0%", "34%"]);
  const nearY = useTransform(scrollYProgress, [0, 1], ["0%", "58%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.68], [1, 0]);

  // A whisper of pointer parallax on desktop; touch keeps the scroll parallax only.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tiltX = useSpring(px, { stiffness: 90, damping: 22, mass: 0.6 });
  const tiltY = useSpring(py, { stiffness: 90, damping: 22, mass: 0.6 });

  const onPointerMove = (event: React.PointerEvent) => {
    if (!fine || reduced) return;
    const { innerWidth, innerHeight } = window;
    px.set((event.clientX / innerWidth - 0.5) * 2);
    py.set((event.clientY / innerHeight - 0.5) * 2);
  };

  const farX = useTransform(tiltX, [-1, 1], [12, -12]);
  const midX = useTransform(tiltX, [-1, 1], [26, -26]);
  const nearX = useTransform(tiltX, [-1, 1], [46, -46]);
  const nearTilt = useTransform(tiltY, [-1, 1], [8, -8]);

  // A soft glow drifting a few pixels behind the badge, on the same pointer
  // spring as the depth layers above — purely ambient, never distracting.
  const glowX = useTransform(tiltX, [-1, 1], [-18, 18]);
  const glowY = useTransform(tiltY, [-1, 1], [-14, 14]);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* ---------- Scenery ----------
          Three depth planes over the fixed sky: distant birds, a mid-ground
          beach set-up, and the sand bank the viewer is standing on. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full"
          style={{ y: farY, x: farX }}
        >
          <g opacity="0.75">
            <Birds x={196} y={168} scale={0.6} />
          </g>
          <g opacity="0.45">
            <Birds x={902} y={126} scale={0.4} />
          </g>
        </motion.svg>

        <motion.svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full"
          style={{ y: midY, x: midX }}
        >
          <defs>
            <linearGradient id="hero-sand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EBD2A6" />
              <stop offset="100%" stopColor="#C99F63" />
            </linearGradient>
          </defs>

          {/* Sand bank: warm, not black, so the silhouettes can sit on it. */}
          <path d="M0 792c176-26 300 12 486 5s312-38 714-19v122H0z" fill="url(#hero-sand)" />

          <Palm x={1116} y={808} scale={0.42} />
          <Parasol x={148} y={756} scale={0.4} />
          <Lounger x={252} y={792} scale={0.36} />
          <Lounger x={978} y={802} scale={0.32} flip />
          <Bucket x={352} y={800} scale={0.32} />
        </motion.svg>

        <motion.svg
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMax slice"
          className="absolute inset-0 h-full w-full"
          style={{ y: nearY, x: nearX, rotate: nearTilt }}
        >
          {/* Nearest dune, darkened so it reads as foreground. */}
          <path
            d="M0 862c150-22 262 10 430 4s300-30 770-14v96H0z"
            fill="#B98F55"
            opacity="0.95"
          />
          <Palm x={38} y={904} scale={0.5} flip />
        </motion.svg>
      </div>

      {/* ---------- Content ---------- */}
      <motion.div
        className="shell relative z-10 flex flex-1 flex-col items-center justify-center text-center"
        style={{
          y: contentY,
          opacity: contentOpacity,
          paddingTop: "calc(var(--safe-t) + 4.75rem)",
          paddingBottom: "1.25rem",
        }}
      >
        {fine && !reduced && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[42%] h-96 w-96 rounded-full blur-3xl"
            style={{
              marginLeft: "-12rem",
              marginTop: "-12rem",
              x: glowX,
              y: glowY,
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--accent), transparent 72%) 0%, transparent 70%)",
            }}
          />
        )}

        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.82, y: 26 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 1.3, ease }}
        >
          <Logo
            size={92}
            alt={t.common.a11y.logo}
            priority
            className="drop-shadow-[0_18px_40px_rgba(0,0,0,0.28)] sm:!h-[9.5rem] sm:!w-[9.5rem]"
          />
        </motion.div>

        <motion.p
          className="t-eyebrow mt-4 flex items-center gap-2.5 text-[color:var(--fg-soft)] sm:mt-6"
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease }}
        >
          <span className="h-px w-6 bg-current opacity-50" />
          {t.home.hero.eyebrow}
          <span className="h-px w-6 bg-current opacity-50" />
        </motion.p>

        <h1 className="font-display t-display mt-3 text-[color:var(--fg)]">
          <span className="sr-only">{plainText(t.home.hero.title)}</span>
          {t.home.hero.title.map((line, index) => {
            const words = parseAccents(line);
            return (
              <span key={line} className="block overflow-hidden pb-[0.06em]" aria-hidden="true">
                <motion.span
                  className="block"
                  initial={reduced ? undefined : { y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.72 + index * 0.11, duration: 1.25, ease }}
                >
                  {words.map((word, wordIndex) => (
                    <span
                      key={`${word.text}-${wordIndex}`}
                      className={word.accent ? "font-accent lowercase" : undefined}
                    >
                      {word.text}
                      {wordIndex < words.length - 1 ? " " : ""}
                    </span>
                  ))}
                </motion.span>
              </span>
            );
          })}
        </h1>

        <motion.p
          className="t-lead text-pretty mt-4 max-w-[28ch] text-[color:var(--fg-soft)] sm:mt-5 sm:max-w-[42ch]"
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease }}
        >
          {t.home.hero.lead}
        </motion.p>

        <motion.div
          className="mt-6 flex w-full max-w-md flex-col items-stretch gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 1, ease }}
        >
          <Cta
            href={hasReservationLink ? reservationHref(lang) : "#contact"}
            external={hasReservationLink}
            cursorLabel={t.common.cursor.open}
            icon={
              hasReservationLink ? (
                <WhatsApp className="h-4 w-4" />
              ) : (
                <ArrowUpRight className="h-3.5 w-3.5" />
              )
            }
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
          <Cta href="#experience" variant="ghost" cursorLabel={t.common.cursor.explore} className="max-sm:hidden">
            {t.common.actions.discover}
          </Cta>
        </motion.div>
      </motion.div>

      {/* ---------- Scroll cue + marquee ---------- */}
      <motion.div
        className="relative z-10 w-full shrink-0"
        style={{ paddingBottom: "calc(var(--safe-b) + 0.75rem)" }}
        initial={reduced ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <a
          href="#experience"
          className="mx-auto mb-3 flex w-fit flex-col items-center gap-1.5 rounded-full bg-[color:var(--shell)]/45 px-4 py-2 text-[color:var(--fg-soft)] backdrop-blur-sm sm:mb-5 sm:gap-2"
          aria-label={t.home.hero.scroll}
        >
          <span className="t-label text-[0.625rem]">{t.home.hero.scroll}</span>
          <motion.span
            animate={reduced ? { y: 0 } : { y: [0, 6, 0] }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <ArrowDown className="h-4 w-4" />
          </motion.span>
        </a>

        <div className="overflow-hidden border-y border-[color:var(--hairline)] py-2.5">
          <div className="marquee">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {t.home.hero.marquee.map((word) => (
                  <span
                    key={`${copy}-${word}`}
                    className="t-label flex items-center gap-6 px-6 text-[color:var(--fg-soft)]"
                  >
                    {word}
                    <span className="text-[color:var(--accent)]">✳</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <span className="sr-only">{siteConfig.tagline}</span>
    </section>
  );
}
