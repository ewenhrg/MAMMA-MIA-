export type EventCategory = "football" | "live" | "music" | "special";

export type VenueEvent = {
  id: string;
  category: EventCategory;
  /** ISO date, e.g. "2026-08-20". */
  date: string;
  /** Local time, e.g. "21:00". Optional. */
  time?: string;
  /** Image URL (/uploads/... or remote blob URL). */
  image?: string;
  title: { en: string; fr: string };
  description: { en: string; fr: string };
};

export const EVENT_CATEGORIES: EventCategory[] = [
  "football",
  "live",
  "music",
  "special",
];

/** Keep an event until two full days after its date, then purge it. */
export const isEventExpired = (event: VenueEvent, from: Date = new Date()) => {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const eventDay = new Date(event.date + "T00:00:00");
  if (Number.isNaN(eventDay.getTime())) return true;
  const cutoff = new Date(eventDay);
  cutoff.setDate(cutoff.getDate() + 2);
  return today > cutoff;
};

/** Public listing: only today and future dates. */
export const isEventUpcoming = (event: VenueEvent, from: Date = new Date()) => {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const eventDay = new Date(event.date + "T00:00:00");
  if (Number.isNaN(eventDay.getTime())) return false;
  return eventDay >= today && !isEventExpired(event, from);
};
