/**
 * Static seed only. Live events are managed from /admin and stored in
 * `data/events.json` (local) or Vercel Blob (production).
 */
export type { EventCategory, VenueEvent } from "@/lib/events/types";
export {
  EVENT_CATEGORIES,
  isEventExpired,
  isEventUpcoming,
} from "@/lib/events/types";

import type { VenueEvent } from "@/lib/events/types";
import { isEventUpcoming } from "@/lib/events/types";

/** Kept for backwards-compatible imports; prefer the /api/events endpoint. */
export const events: VenueEvent[] = [];

export const upcomingEvents = (
  list: VenueEvent[] = events,
  from: Date = new Date(),
) =>
  list
    .filter((event) => isEventUpcoming(event, from))
    .sort((a, b) => a.date.localeCompare(b.date));
