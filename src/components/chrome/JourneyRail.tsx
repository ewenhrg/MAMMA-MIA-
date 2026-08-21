"use client";

import { useEffect, useState } from "react";
import { motion, useTransform } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useJourney } from "@/components/providers/JourneyProvider";
import { cn } from "@/lib/utils";

const stops = [
  { key: "day", at: 0 },
  { key: "sunset", at: 0.5 },
  { key: "night", at: 1 },
] as const;

/** Vertical Day → Sunset → Night indicator, so the transformation reads as intentional. */
export function JourneyRail() {
  const { t } = useLocale();
  const { progress, mood } = useJourney();
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [overFooter, setOverFooter] = useState(false);

  // The journey is over once the footer arrives; the rail steps out of the way.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOverFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -40% 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed top-1/2 right-[max(1rem,calc((100vw-90rem)/2+1.25rem))] z-[62] hidden -translate-y-1/2 xl:block"
      aria-hidden="true"
      initial={false}
      animate={{ opacity: overFooter ? 0 : 1, x: overFooter ? 20 : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative flex flex-col items-end gap-6">
        <div className="absolute top-1.5 right-[5px] h-[calc(100%-0.75rem)] w-px bg-[color:var(--hairline)]">
          <motion.div
            className="w-full origin-top bg-gradient-to-b from-ocean via-sunset to-gold"
            style={{ height }}
          />
        </div>

        {stops.map((stop) => {
          const isActive = mood === stop.key;
          return (
            <div key={stop.key} className="flex items-center gap-3">
              {/* Only the current chapter is named, so the rail stays narrow
                  enough to never crowd the content column on laptops. */}
              <motion.span
                className="overflow-hidden text-[0.625rem] font-semibold whitespace-nowrap text-[color:var(--fg)] uppercase"
                style={{ letterSpacing: "0.2em" }}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  maxWidth: isActive ? 140 : 0,
                  marginRight: isActive ? 0 : -12,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {t.common.chapters[stop.key]}
              </motion.span>
              <span className="relative grid h-3 w-3 place-items-center">
                <span
                  className={cn(
                    "block rounded-full transition-all duration-500",
                    isActive
                      ? "h-2.5 w-2.5 bg-[color:var(--accent)]"
                      : "h-1.5 w-1.5 bg-[color:var(--fg-faint)]",
                  )}
                />
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
