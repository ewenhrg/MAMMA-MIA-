import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/events/auth";
import {
  addEvent,
  deleteEventImage,
  listEvents,
  removeEvent,
  saveEventImage,
  storageMode,
} from "@/lib/events/store";
import {
  EVENT_CATEGORIES,
  type EventCategory,
  type VenueEvent,
} from "@/lib/events/types";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }
  const events = await listEvents();
  return NextResponse.json({ events, storage: storageMode() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const form = await request.formData();
  const title = String(form.get("title") ?? "").trim();
  const description = String(form.get("description") ?? "").trim();
  const titleFr = String(form.get("titleFr") ?? "").trim() || title;
  const descriptionFr =
    String(form.get("descriptionFr") ?? "").trim() || description;
  const date = String(form.get("date") ?? "").trim();
  const time = String(form.get("time") ?? "").trim();
  const categoryRaw = String(form.get("category") ?? "special").trim();
  const category = (
    EVENT_CATEGORIES.includes(categoryRaw as EventCategory)
      ? categoryRaw
      : "special"
  ) as EventCategory;
  const image = form.get("image");

  if (!title || !description || !date) {
    return NextResponse.json(
      { error: "Titre, texte et date sont obligatoires." },
      { status: 400 },
    );
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Date invalide." }, { status: 400 });
  }

  const id = `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
  let imageUrl: string | undefined;

  if (image instanceof File && image.size > 0) {
    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Le fichier doit être une image." },
        { status: 400 },
      );
    }
    if (image.size > 6 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image trop lourde (max 6 Mo)." },
        { status: 400 },
      );
    }
    imageUrl = await saveEventImage(id, image);
  }

  const event: VenueEvent = {
    id,
    category,
    date,
    ...(time ? { time } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    title: { en: title, fr: titleFr },
    description: { en: description, fr: descriptionFr },
  };

  const events = await addEvent(event);
  return NextResponse.json({ event, events });
}

export async function DELETE(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id")?.trim();
  if (!id) {
    return NextResponse.json({ error: "Identifiant manquant." }, { status: 400 });
  }

  const current = await listEvents();
  const target = current.find((event) => event.id === id);
  await deleteEventImage(target?.image);
  const events = await removeEvent(id);
  return NextResponse.json({ events });
}
