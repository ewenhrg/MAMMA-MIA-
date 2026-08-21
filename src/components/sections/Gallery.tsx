"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLocale } from "@/components/providers/LocaleProvider";
import { ArrowLeft, ArrowRight, Close } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scene";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  gallery,
  galleryCategories,
  type GalleryCategory,
  type GalleryItem,
} from "@/config/media";
import { useScrollLock } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Filter = GalleryCategory | "all";

function Tile({
  item,
  sizes,
  fit = "cover",
}: {
  item: GalleryItem;
  sizes: string;
  fit?: "cover" | "contain";
}) {
  const { lang } = useLocale();
  return item.src ? (
    <Image
      src={item.src}
      alt={item.alt?.[lang] ?? ""}
      fill
      sizes={sizes}
      unoptimized
      className={fit === "contain" ? "object-contain" : "object-cover object-center"}
    />
  ) : (
    <Scene variant={item.scene} className="absolute inset-0" />
  );
}

/**
 * Editorial masonry with a keyboard-accessible lightbox. Categories that have no
 * items are never offered as filters.
 */
export function Gallery() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const swipeX = useRef<number | null>(null);

  const available = useMemo(() => galleryCategories(gallery), []);
  const items = useMemo(
    () => (filter === "all" ? gallery : gallery.filter((item) => item.category === filter)),
    [filter],
  );

  useScrollLock(openIndex !== null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (direction: 1 | -1) =>
      setOpenIndex((current) =>
        current === null ? current : (current + direction + items.length) % items.length,
      ),
    [items.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close, step]);

  const activeItem = openIndex === null ? null : items[openIndex];

  return (
    <section id="gallery" className="section">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={t.home.gallery.eyebrow}
            lines={t.home.gallery.title}
            lead={t.home.gallery.lead}
            size="h1"
            className="lg:max-w-[38rem]"
          />

          <Reveal delay={0.12}>
            <ul className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1">
              {(["all", ...available] as Filter[]).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => setFilter(key)}
                    aria-pressed={filter === key}
                    className={cn(
                      "relative min-h-11 rounded-full px-4 text-[0.7rem] font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-300",
                      filter === key
                        ? "text-cream"
                        : "text-[color:var(--fg-soft)] hover:text-[color:var(--fg)]",
                    )}
                  >
                    {filter === key && (
                      <motion.span
                        layoutId="gallery-filter"
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-sunset to-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className="absolute inset-0 -z-20 rounded-full border border-[color:var(--hairline)]" />
                    {t.home.gallery.categories[key]}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <motion.ul layout className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-4 lg:mt-16 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(index)}
                  data-cursor={t.common.cursor.explore}
                  aria-label={`${t.common.a11y.gallerySlide} — ${t.home.gallery.categories[item.category]}`}
                  className="frame relative aspect-[3/4] w-full"
                >
                  <Tile
                    item={item}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-3 text-left text-[0.625rem] font-semibold tracking-[0.16em] text-cream uppercase">
                    {t.home.gallery.categories[item.category]}
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* ---------- Lightbox ---------- */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-[85] flex flex-col overscroll-contain bg-night/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label={t.common.a11y.lightbox}
          >
            <div
              className="flex items-center justify-between px-5"
              style={{ paddingTop: "calc(var(--safe-t) + 1rem)", paddingBottom: "1rem" }}
            >
              <span className="t-label text-cream/60">
                {openIndex! + 1} / {items.length}
              </span>
              <button
                type="button"
                onClick={close}
                autoFocus
                aria-label={t.common.actions.close}
                className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 text-cream"
              >
                <Close className="h-4 w-4" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-4 sm:pb-4">
              <motion.figure
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="relative h-[min(62dvh,36rem)] w-full max-w-md overflow-hidden rounded-3xl bg-black/40 sm:h-[min(78vh,40rem)]"
                onTouchStart={(event) => {
                  swipeX.current = event.changedTouches[0]?.clientX ?? null;
                }}
                onTouchEnd={(event) => {
                  if (swipeX.current === null) return;
                  const dx = (event.changedTouches[0]?.clientX ?? swipeX.current) - swipeX.current;
                  swipeX.current = null;
                  if (dx > 56) step(-1);
                  if (dx < -56) step(1);
                }}
              >
                <Tile item={activeItem} sizes="512px" fit="contain" />
              </motion.figure>
            </div>

            <div
              className="flex items-center justify-center gap-3 px-5"
              style={{ paddingBottom: "calc(var(--safe-b) + 1.5rem)" }}
            >
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t.common.actions.previous}
                className="grid h-12 w-12 place-items-center rounded-full border border-cream/20 text-cream"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="t-label px-2 text-cream/70">
                {t.home.gallery.categories[activeItem.category]}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t.common.actions.next}
                className="grid h-12 w-12 place-items-center rounded-full border border-cream/20 text-cream"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
