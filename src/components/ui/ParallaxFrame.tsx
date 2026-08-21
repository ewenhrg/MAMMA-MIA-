"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { usePointerFine } from "@/lib/hooks";
import { cn } from "@/lib/utils";

/**
 * Media frame. Photos stay at scale 1 — extra zoom was blowing up small
 * WhatsApp files. Parallax is a few pixels of translateY only.
 */
export function ParallaxFrame({
  children,
  className,
  innerClassName,
  amount = 18,
  cursorLabel,
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  amount?: number;
  cursorLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = usePointerFine();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}px`, `${amount}px`]);
  const parallax = !reduced && fine;

  return (
    <motion.div
      ref={ref}
      className={cn("frame", className)}
      data-cursor={cursorLabel}
      initial={reduced ? undefined : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className={cn("hover-parallax absolute inset-0", innerClassName)}
        style={parallax ? { y } : undefined}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
