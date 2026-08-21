"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Reveal, SplitLines, plainText } from "./Reveal";

/**
 * Shared section header: eyebrow, animated headline, optional lead paragraph.
 * `level` keeps the document outline correct wherever it is used.
 */
export function SectionHeading({
  eyebrow,
  lines,
  lead,
  align = "left",
  size = "h2",
  level = 2,
  className,
  headingClassName,
  leadClassName,
  children,
}: {
  eyebrow?: string;
  lines: readonly string[];
  lead?: string;
  align?: "left" | "center";
  size?: "h1" | "h2";
  level?: 2 | 3;
  className?: string;
  headingClassName?: string;
  leadClassName?: string;
  children?: ReactNode;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  const reduced = useReducedMotion();

  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="t-eyebrow mb-5 flex items-center gap-3 text-[color:var(--accent)]">
            <motion.span
              className="h-px w-8 origin-left bg-current opacity-60"
              initial={reduced ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={reduced ? { duration: 0 } : { duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Tag
        className={cn(
          "font-display text-[color:var(--fg)]",
          size === "h1" ? "t-h1" : "t-h2",
          headingClassName,
        )}
      >
        <span className="sr-only">{plainText(lines)}</span>
        <span aria-hidden="true">
          <SplitLines lines={lines} />
        </span>
      </Tag>

      {lead && (
        <Reveal delay={0.12}>
          <p
            className={cn(
              "t-lead text-pretty mt-6 text-[color:var(--fg-soft)]",
              align === "center" ? "max-w-[56ch]" : "max-w-[46ch]",
              leadClassName,
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}
