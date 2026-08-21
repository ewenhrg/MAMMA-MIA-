"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { motionValue, type MotionValue } from "framer-motion";
import { clamp, mapRange } from "@/lib/utils";

export type Mood = "day" | "sunset" | "night";

type JourneyContextValue = {
  /** 0 = morning on the beach, 1 = deep night. */
  progress: MotionValue<number>;
  mood: Mood;
};

const JourneyContext = createContext<JourneyContextValue | null>(null);

const smoothstep = (t: number) => {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
};

/**
 * Turns vertical scroll into a time of day.
 *
 * Two anchors placed in the page (`#anchor-sunset`, `#anchor-night`) define when
 * golden hour starts and when night has fully arrived, so the transition follows
 * the content instead of hard-coded pixel values. Only CSS custom properties are
 * written — no React re-render happens while scrolling.
 */
export function JourneyProvider({ children }: { children: ReactNode }) {
  const progress = useMemo(() => motionValue(0), []);
  const [mood, setMood] = useState<Mood>("day");

  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    let anchors: { sunset: number; night: number } | null = null;
    let current = 0;
    let target = 0;

    const measure = () => {
      const sunsetEl = document.getElementById("anchor-sunset");
      const nightEl = document.getElementById("anchor-night");
      if (!sunsetEl || !nightEl) {
        anchors = null;
        return;
      }
      const scroll = window.scrollY;
      anchors = {
        sunset: sunsetEl.getBoundingClientRect().top + scroll,
        night: nightEl.getBoundingClientRect().top + scroll,
      };
    };

    const readTarget = () => {
      if (!anchors) return 0;
      const focus = window.scrollY + window.innerHeight * 0.62;
      return mapRange(focus, anchors.sunset, anchors.night, 0, 1);
    };

    const apply = (value: number) => {
      const day = 1 - smoothstep(value / 0.52);
      const night = smoothstep((value - 0.5) / 0.5);
      const sunset = clamp(1 - Math.abs(value - 0.52) / 0.46);

      root.style.setProperty("--journey", value.toFixed(4));
      root.style.setProperty("--sky-day", day.toFixed(4));
      root.style.setProperty("--sky-sunset", sunset.toFixed(4));
      root.style.setProperty("--sky-night", night.toFixed(4));

      const next: Mood = value < 0.3 ? "day" : value < 0.72 ? "sunset" : "night";
      if (root.dataset.mood !== next) {
        root.dataset.mood = next;
        setMood(next);
      }
      progress.set(value);
    };

    const tick = () => {
      target = readTarget();
      // Light easing keeps the sky from snapping during fast flicks.
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      apply(current);
      frame = requestAnimationFrame(tick);
    };

    measure();
    current = readTarget();
    apply(current);
    frame = requestAnimationFrame(tick);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Sections stream in after hydration, so re-measure once the layout settles.
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [progress]);

  const value = useMemo(() => ({ progress, mood }), [progress, mood]);

  return <JourneyContext.Provider value={value}>{children}</JourneyContext.Provider>;
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error("useJourney must be used inside <JourneyProvider>");
  }
  return context;
}
