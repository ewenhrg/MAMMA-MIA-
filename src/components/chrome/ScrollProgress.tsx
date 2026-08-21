"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * A thin gradient bar tracking overall page scroll, pinned above the navbar.
 * Always-on and not gated behind reduced-motion: it mirrors scroll position
 * 1:1 (like `JourneyRail`) rather than running an independent animation.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 z-[72] h-[3px] origin-left bg-gradient-to-r from-sunset via-orange to-gold"
      style={{ top: "var(--safe-t)", scaleX }}
    />
  );
}
