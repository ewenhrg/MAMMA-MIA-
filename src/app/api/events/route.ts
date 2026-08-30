import { NextResponse } from "next/server";
import { listEvents, EventsStorageError } from "@/lib/events/store";
import { isEventUpcoming } from "@/lib/events/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await listEvents();
    const upcoming = events.filter((event) => isEventUpcoming(event));
    return NextResponse.json({ events: upcoming });
  } catch (error) {
    if (error instanceof EventsStorageError) {
      return NextResponse.json({ events: [] });
    }
    console.error("[events GET]", error);
    return NextResponse.json({ events: [] });
  }
}
