"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
// The bottom margin fires the reveal before the element is actually visible
// (as it approaches from below the fold), so it has finished settling by the
// time it's read rather than still animating mid-scroll.
const viewport = { once: true, amount: 0.2, margin: "0px 0px 220px 0px" } as const;

/**
 * Fades and lifts a block into view once, respecting reduced-motion.
 * No blur: an earlier version un-blurred text into place for a "cinematic"
 * feel, but it read as blurry text on a normal-speed scroll — removed.
 */
export function Reveal({
  children,
  delay = 0,
  y = 48,
  scale = 1,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Starting scale before the reveal settles at 1 — a touch more tactile for card grids. */
  scale?: number;
  className?: string;
  as?: "div" | "section" | "li" | "figure" | "p";
}) {
  const reduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduced ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewport}
      transition={reduced ? { duration: 0 } : { duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </Component>
  );
}

const wordVariants: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (index: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.7, delay: index * 0.045, ease: EASE },
  }),
};

/**
 * `useReducedMotion` reports `false` on the server and during the first client
 * render, so an element must never lose the animation that reveals it — it
 * would stay frozen in its hidden state once the preference resolves. Instead
 * the hidden state itself becomes a no-op, and the element corrects itself.
 */
const stillVariants: Variants = {
  hidden: { y: "0%", opacity: 1 },
  visible: { y: "0%", opacity: 1, transition: { duration: 0 } },
};

/**
 * Headlines mark their emphasised run with asterisks — `"Your *vibe.*"` — so the
 * italic serif is chosen by the copy, per language, instead of by matching words.
 * Multi-word runs work too: `"*frame by frame.*"`.
 */
export const parseAccents = (line: string) => {
  let open = false;
  return line.split(" ").map((raw) => {
    const opens = raw.startsWith("*");
    const closes = raw.endsWith("*") && raw.length > 1;
    const accent = open || opens;
    if (opens && !closes) open = true;
    if (closes) open = false;
    return { text: raw.replace(/\*/g, ""), accent };
  });
};

/** Marker-free copy, for screen readers and any non-visual use. */
export const plainText = (lines: readonly string[]) =>
  lines.map((line) => line.replace(/\*/g, "")).join(" ");

/**
 * Word-by-word headline reveal.
 *
 * Each word slides up out of an `overflow-hidden` line box. The in-view trigger
 * deliberately lives on the outer wrapper: a word starting 110% below its own
 * clipping parent is never visible to an IntersectionObserver, so watching the
 * words themselves would mean the headline could never appear.
 */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: readonly string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  let index = 0;

  return (
    <motion.span
      className={cn("block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {lines.map((line) => (
        <span
          key={line}
          className={cn("block overflow-hidden pb-[0.08em]", lineClassName)}
        >
          {parseAccents(line).map((word) => {
            const current = index;
            index += 1;
            return (
              <motion.span
                key={`${word.text}-${current}`}
                className={cn(
                  "inline-block whitespace-pre",
                  word.accent && "font-accent lowercase",
                )}
                variants={reduced ? stillVariants : wordVariants}
                custom={current + delay / 0.055}
              >
                {word.text}
                {"\u00A0"}
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Single line sliding up out of a clipping box. Same trigger rule as above: the
 * observer watches the wrapper, not the moving child.
 */
export function RevealLine({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      className={cn("block overflow-hidden pb-[0.08em]", className)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <motion.span
        className="block"
        variants={
          reduced
            ? stillVariants
            : {
                hidden: { y: "112%" },
                visible: {
                  y: "0%",
                  transition: { duration: 0.7, delay, ease: EASE },
                },
              }
        }
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
