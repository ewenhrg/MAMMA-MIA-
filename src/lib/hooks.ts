"use client";

import { useEffect, useState, type PointerEvent } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
};

/** True only on devices with a real pointer, so hover-only affordances stay off touch. */
export const usePointerFine = () => useMediaQuery("(hover: hover) and (pointer: fine)");

export const usePrefersReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

/**
 * Cursor-tracked spotlight + 3D tilt for `.card` (see `--spot-x`/`--spot-y`
 * and `--tilt-x`/`--tilt-y` in globals.css). Off on touch and reduced-motion
 * — visibility/transform are toggled entirely by CSS `:hover`, so there is
 * nothing to clean up on pointer leave.
 */
export const useSpotlight = () => {
  const fine = usePointerFine();
  const reduced = usePrefersReducedMotion();

  if (!fine || reduced) return {};

  return {
    onPointerMove: (event: PointerEvent<HTMLElement>) => {
      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      target.style.setProperty("--spot-x", `${px * 100}%`);
      target.style.setProperty("--spot-y", `${py * 100}%`);
      target.style.setProperty("--tilt-y", `${(px - 0.5) * 14}deg`);
      target.style.setProperty("--tilt-x", `${(0.5 - py) * 10}deg`);
    },
  };
};

/** Locks body scroll while an overlay is open, without losing scroll position. */
export const useScrollLock = (locked: boolean) => {
  useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const previous = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    body.classList.add("is-locked");
    return () => {
      body.classList.remove("is-locked");
      body.style.paddingRight = previous;
    };
  }, [locked]);
};
