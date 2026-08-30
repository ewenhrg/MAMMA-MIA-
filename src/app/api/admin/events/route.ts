import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/events/auth";
import {
  addEvent,
  deleteEventImage,
  EventsStorageError,
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
export const maxDuration = 30;

const jsonError = (message: string, status = 500) =>
  NextResponse.json({ error: message }, { status });

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return jsonError("Non autorisé.", 401);
    }
    const events = await listEvents();
    return NextResponse.json({ events, storage: storageMode() });
  } catch (error) {
    if (error instanceof EventsStorageError) {
      return jsonError(error.message, 503);
    }
    console.error("[admin/events GET]", error);
    return jsonError("Impossible de charger les événements.");
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return jsonError("Non autorisé.", 401);
    }

    let form: FormData;
    try {
      form = await request.formData();
    } catch {
      return jsonError(
        "Envoi trop lourd ou invalide. Réduisez la taille de l'image (max 4 Mo).",
        413,
      );
    }

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
      return jsonError("Titre, texte et date sont obligatoires.", 400);
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return jsonError("Date invalide.", 400);
    }

    const id = `evt_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    let imageUrl: string | undefined;

    if (image instanceof File && image.size > 0) {
      if (!image.type.startsWith("image/")) {
        return jsonError("Le fichier doit être une image.", 400);
      }
      if (image.size > 4 * 1024 * 1024) {
        return jsonError("Image trop lourde (max 4 Mo).", 400);
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
  } catch (error) {
    if (error instanceof EventsStorageError) {
      return jsonError(error.message, 503);
    }
    console.error("[admin/events POST]", error);
    return jsonError("Impossible d'ajouter l'événement. Réessayez.");
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return jsonError("Non autorisé.", 401);
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id")?.trim();
    if (!id) {
      return jsonError("Identifiant manquant.", 400);
    }

    const current = await listEvents();
    const target = current.find((event) => event.id === id);
    await deleteEventImage(target?.image);
    const events = await removeEvent(id);
    return NextResponse.json({ events });
  } catch (error) {
    if (error instanceof EventsStorageError) {
      return jsonError(error.message, 503);
    }
    console.error("[admin/events DELETE]", error);
    return jsonError("Impossible de supprimer l'événement.");
  }
}
