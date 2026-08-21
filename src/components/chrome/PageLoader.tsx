"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/config/site";

const SESSION_KEY = "mm_intro_seen";

/**
 * A short sunrise over the badge, shown once per session.
 *
 * It never blocks: the overlay leaves as soon as the page is ready, and it is
 * skipped entirely on repeat navigation or when reduced motion is requested.
 */
export function PageLoader() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    setVisible(true);
    document.body.classList.add("is-locked");

    const finish = () => {
      sessionStorage.setItem(SESSION_KEY, "1");
      setVisible(false);
      document.body.classList.remove("is-locked");
    };

    // Whichever comes last: the page being ready, or a brief minimum beat.
    const minimum = new Promise((resolve) => setTimeout(resolve, 1250));
    const ready =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

    let cancelled = false;
    Promise.all([minimum, ready]).then(() => {
      if (!cancelled) finish();
    });

    // Safety net so a stalled asset can never trap the visitor.
    const bail = setTimeout(finish, 3200);

    return () => {
      cancelled = true;
      clearTimeout(bail);
      document.body.classList.remove("is-locked");
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-night"
          role="status"
          aria-live="polite"
          aria-label={t.common.a11y.loading}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
        >
          {/* Sun rising behind the badge. */}
          <motion.div
            className="pointer-events-none absolute left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(249,178,51,0.55) 0%, rgba(239,75,34,0.28) 42%, transparent 68%)",
            }}
            initial={{ bottom: "-46rem", opacity: 0 }}
            animate={{ bottom: "-22rem", opacity: 1 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.86, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.08, y: -14 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Logo size={108} alt={t.common.a11y.logo} priority className="drop-shadow-2xl sm:!h-[8.25rem] sm:!w-[8.25rem]" />
          </motion.div>

          <motion.div
            className="relative z-10 mt-9 h-px w-40 overflow-hidden bg-white/15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <motion.span
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-sunset via-gold to-honey"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          <motion.p
            className="t-eyebrow relative z-10 mt-6 text-center text-cream/55"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {t.home.loader.line}
            <span className="mx-2 text-gold">/</span>
            {siteConfig.city}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
