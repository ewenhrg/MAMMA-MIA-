import { promises as fs } from "fs";
import path from "path";
import { put, list, del, head } from "@vercel/blob";
import { isEventExpired, type VenueEvent } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "events.json");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "events");
const BLOB_JSON = "events/events.json";

const hasBlob = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
const isVercel = () => Boolean(process.env.VERCEL);

export class EventsStorageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EventsStorageError";
  }
}

const assertStorageReady = () => {
  if (isVercel() && !hasBlob()) {
    throw new EventsStorageError(
      "Sur Vercel, ajoutez BLOB_READ_WRITE_TOKEN (Storage → Blob) pour enregistrer les événements.",
    );
  }
};

const ensureLocalDirs = async () => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
};

const readLocal = async (): Promise<VenueEvent[]> => {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as VenueEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLocal = async (events: VenueEvent[]) => {
  assertStorageReady();
  await ensureLocalDirs();
  await fs.writeFile(DATA_FILE, JSON.stringify(events, null, 2), "utf8");
};

const readBlob = async (): Promise<VenueEvent[]> => {
  try {
    const meta = await head(BLOB_JSON);
    if (!meta?.url) return [];
    const response = await fetch(meta.url, { cache: "no-store" });
    if (!response.ok) return [];
    const parsed = (await response.json()) as VenueEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    const listed = await list({ prefix: "events/" });
    const file = listed.blobs.find(
      (blob) => blob.pathname === BLOB_JSON || blob.pathname.endsWith("events.json"),
    );
    if (!file?.url) return [];
    const response = await fetch(file.url, { cache: "no-store" });
    if (!response.ok) return [];
    const parsed = (await response.json()) as VenueEvent[];
    return Array.isArray(parsed) ? parsed : [];
  }
};

const writeBlob = async (events: VenueEvent[]) => {
  assertStorageReady();
  await put(BLOB_JSON, JSON.stringify(events, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
};

export const storageMode = () => (hasBlob() ? "blob" : isVercel() ? "unavailable" : "local");

export const pruneEvents = (events: VenueEvent[]) =>
  events.filter((event) => !isEventExpired(event));

export const listEvents = async (): Promise<VenueEvent[]> => {
  assertStorageReady();
  const events = hasBlob() ? await readBlob() : await readLocal();
  const kept = pruneEvents(events).sort((a, b) => a.date.localeCompare(b.date));
  if (kept.length !== events.length) {
    await saveEvents(kept);
  }
  return kept;
};

export const saveEvents = async (events: VenueEvent[]) => {
  const kept = pruneEvents(events).sort((a, b) => a.date.localeCompare(b.date));
  if (hasBlob()) await writeBlob(kept);
  else await writeLocal(kept);
  return kept;
};

export const addEvent = async (event: VenueEvent) => {
  const current = await listEvents();
  return saveEvents([event, ...current.filter((item) => item.id !== event.id)]);
};

export const removeEvent = async (id: string) => {
  const current = await listEvents();
  return saveEvents(current.filter((item) => item.id !== id));
};

export const saveEventImage = async (
  id: string,
  file: File,
): Promise<string> => {
  assertStorageReady();
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : "jpg";

  if (hasBlob()) {
    const blob = await put(`events/${id}.${ext}`, bytes, {
      access: "public",
      contentType: file.type || "image/jpeg",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return blob.url;
  }

  await ensureLocalDirs();
  const filename = `${id}.${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, filename), bytes);
  return `/uploads/events/${filename}`;
};

export const deleteEventImage = async (imageUrl?: string) => {
  if (!imageUrl) return;
  try {
    if (hasBlob() && imageUrl.includes("blob.vercel-storage.com")) {
      await del(imageUrl);
      return;
    }
    if (imageUrl.startsWith("/uploads/events/")) {
      const file = path.join(process.cwd(), "public", imageUrl);
      await fs.unlink(file).catch(() => undefined);
    }
  } catch {
    // Ignore cleanup failures — the event record is the source of truth.
  }
};
