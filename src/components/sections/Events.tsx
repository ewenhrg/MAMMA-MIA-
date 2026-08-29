"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Cta } from "@/components/ui/Cta";
import { ArrowUpRight, Instagram, WhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Scene } from "@/components/ui/Scene";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { upcomingEvents, type VenueEvent } from "@/config/events";
import { hasReservationLink, reservationHref, siteConfig } from "@/config/site";
import { useSpotlight } from "@/lib/hooks";
import { formatEventDate } from "@/lib/utils";

const sceneForCategory = {
  football: "sports",
  live: "night",
  music: "night",
  special: "abstract",
} as const;

function EventCard({ event, index }: { event: VenueEvent; index: number }) {
  const { t, lang } = useLocale();
  const spotlight = useSpotlight();
  const remote = Boolean(event.image?.startsWith("http"));

  return (
    <Reveal delay={index * 0.07} scale={0.96} as="li">
      <article className="card flex h-full flex-col overflow-hidden" {...spotlight}>
        <div className="frame relative aspect-16/10 rounded-none">
          {event.image ? (
            <Image
              src={event.image}
              alt=""
              fill
              unoptimized={remote}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          ) : (
            <Scene variant={sceneForCategory[event.category]} className="absolute inset-0" />
          )}
          <span className="absolute top-4 left-4 rounded-full bg-night/75 px-3 py-1.5 text-[0.625rem] font-semibold tracking-[0.16em] text-cream uppercase backdrop-blur">
            {t.home.events.categories[event.category]}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="t-label text-[color:var(--accent)]">
            {formatEventDate(event.date, lang)}
            {event.time ? ` · ${event.time}` : ""}
          </p>
          <h3 className="font-display t-h3 mt-3 text-[color:var(--fg)]">
            {event.title[lang]}
          </h3>
          <p className="t-body text-pretty mt-2 flex-1 text-[color:var(--fg-soft)]">
            {event.description[lang]}
          </p>
          <div className="mt-6">
            <Cta
              href={hasReservationLink ? reservationHref(lang) : "#contact"}
              external={hasReservationLink}
              variant="ghost"
              size="sm"
              icon={
                hasReservationLink ? (
                  <WhatsApp className="h-3.5 w-3.5" />
                ) : (
                  <ArrowUpRight className="h-3 w-3" />
                )
              }
            >
              {t.home.events.reserve}
            </Cta>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/**
 * Events come from `/api/events` (admin-managed). Empty state when none are live.
 */
export function Events() {
  const { t } = useLocale();
  const [list, setList] = useState<VenueEvent[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch("/api/events", { cache: "no-store" });
        if (!response.ok) throw new Error("fetch failed");
        const data = (await response.json()) as { events: VenueEvent[] };
        if (!cancelled) setList(upcomingEvents(data.events ?? []));
      } catch {
        if (!cancelled) setList([]);
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="events" className="section">
      <div className="shell">
        <SectionHeading
          eyebrow={t.home.events.eyebrow}
          lines={t.home.events.title}
          lead={t.home.events.lead}
          size="h1"
        />

        {!loaded ? (
          <p className="t-body mt-12 text-[color:var(--fg-faint)]">…</p>
        ) : list.length > 0 ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {list.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </ul>
        ) : (
          <Reveal delay={0.1}>
            <div className="card mt-12 flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 lg:mt-16">
              <div className="max-w-[46ch]">
                <p className="font-display t-h3 text-[color:var(--fg)]">
                  {t.common.states.noEvents}
                </p>
                <p className="t-body text-pretty mt-3 text-[color:var(--fg-soft)]">
                  {t.common.states.noEventsBody}
                </p>
              </div>
              <Cta
                href={siteConfig.social.instagramUrl}
                external
                variant="ghost"
                cursorLabel={t.common.cursor.open}
                icon={<Instagram className="h-4 w-4" />}
                className="shrink-0"
              >
                {t.common.actions.followInstagram}
              </Cta>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
