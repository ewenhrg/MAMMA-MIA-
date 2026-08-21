/**
 * Events are content, not code. Add entries here (or swap this module for a CMS
 * fetch) and every events surface on the site updates.
 *
 * No events are listed because none were provided. The UI shows a designed
 * empty state instead of placeholder or invented programming.
 */

export type EventCategory = "football" | "live" | "music" | "special";

export type VenueEvent = {
  id: string;
  category: EventCategory;
  /** ISO date, e.g. "2026-08-20". */
  date: string;
  /** Local time, e.g. "21:00". Optional. */
  time?: string;
  /** Optional image in /public/photos. Falls back to the generated artwork. */
  image?: string;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
};

export const events: VenueEvent[] = [];

export const upcomingEvents = (from: Date = new Date()) => {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  return events
    .filter((event) => new Date(event.date) >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
};
