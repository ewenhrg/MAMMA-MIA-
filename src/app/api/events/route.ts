import { NextResponse } from "next/server";
import { listEvents } from "@/lib/events/store";
import { isEventUpcoming } from "@/lib/events/types";

export const dynamic = "force-dynamic";

export async function GET() {
  const events = await listEvents();
  const upcoming = events.filter((event) => isEventUpcoming(event));
  return NextResponse.json({ events: upcoming });
}
