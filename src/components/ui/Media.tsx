"use client";

import Image from "next/image";
import { media, type MediaKey } from "@/config/media";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Scene, type SceneVariant } from "./Scene";

/**
 * Renders a photography slot: the real image when one has been supplied,
 * otherwise the illustrated scene standing in for it.
 */
export function Media({
  slot,
  lang,
  className,
  sizes = "100vw",
  priority = false,
}: {
  slot: MediaKey;
  lang: Locale;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const entry = media[slot] as { scene: SceneVariant; src?: string; alt?: Record<Locale, string> };

  if (entry.src) {
    return (
      <Image
        src={entry.src}
        alt={entry.alt?.[lang] ?? ""}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized
        className={cn("object-cover object-center", className)}
      />
    );
  }

  return <Scene variant={entry.scene} className={cn("absolute inset-0", className)} />;
}
