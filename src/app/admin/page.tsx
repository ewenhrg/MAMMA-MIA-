"use client";

import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import type { EventCategory, VenueEvent } from "@/lib/events/types";
import { EVENT_CATEGORIES } from "@/lib/events/types";

const categoryLabel: Record<EventCategory, string> = {
  football: "Football",
  live: "Live",
  music: "Musique",
  special: "Spécial",
};

type StorageMode = "local" | "blob" | "unavailable";

async function readApiJson<T>(response: Response): Promise<T | null> {
  const text = await response.text();
  if (!text.trim()) return null;
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

export default function AdminPage() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [storage, setStorage] = useState<StorageMode>("local");
  const [events, setEvents] = useState<VenueEvent[]>([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [category, setCategory] = useState<EventCategory>("special");
  const [image, setImage] = useState<File | null>(null);

  const loadEvents = useCallback(async () => {
    const response = await fetch("/api/admin/events", { cache: "no-store" });
    if (response.status === 401) {
      setAuthed(false);
      return;
    }
    const data = await readApiJson<{
      events: VenueEvent[];
      storage: StorageMode;
      error?: string;
    }>(response);
    if (!response.ok || !data) {
      setError(data?.error || "Impossible de charger les événements.");
      return;
    }
    setEvents(data.events);
    setStorage(data.storage);
    setAuthed(true);
  }, []);

  useEffect(() => {
    (async () => {
      const me = await fetch("/api/admin/me", { cache: "no-store" });
      const data = (await readApiJson<{ authenticated: boolean }>(me)) ?? {
        authenticated: false,
      };
      if (data.authenticated) {
        await loadEvents();
      }
      setReady(true);
    })().catch(() => setReady(true));
  }, [loadEvents]);

  const onLogin = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        setError("Identifiants incorrects.");
        return;
      }
      setPassword("");
      await loadEvents();
    } finally {
      setBusy(false);
    }
  };

  const onLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
    setEvents([]);
  };

  const onCreate = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    try {
      const form = new FormData();
      form.set("title", title);
      form.set("description", description);
      form.set("date", date);
      form.set("time", time);
      form.set("category", category);
      if (image) form.set("image", image);

      const response = await fetch("/api/admin/events", {
        method: "POST",
        body: form,
      });
      const data = await readApiJson<{
        error?: string;
        events?: VenueEvent[];
      }>(response);
      if (!response.ok || !data) {
        setError(
          data?.error ||
            (response.ok
              ? "Réponse serveur invalide."
              : "Échec de l'ajout. Vérifiez la taille de l'image (max 4 Mo)."),
        );
        return;
      }
      setEvents(data.events ?? []);
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setCategory("special");
      setImage(null);
      setMessage("Événement ajouté.");
    } finally {
      setBusy(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Supprimer cet événement ?")) return;
    setBusy(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/events?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await readApiJson<{
        error?: string;
        events?: VenueEvent[];
      }>(response);
      if (!response.ok || !data) {
        setError(data?.error || "Suppression impossible.");
        return;
      }
      setEvents(data.events ?? []);
      setMessage("Événement supprimé.");
    } finally {
      setBusy(false);
    }
  };

  if (!ready) {
    return (
      <main className="grid min-h-dvh place-items-center p-6">
        <p className="t-label text-cream/50">Chargement…</p>
      </main>
    );
  }

  if (!authed) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col justify-center px-6 py-16">
        <p className="t-eyebrow text-gold">Admin</p>
        <h1 className="font-display mt-3 text-4xl text-cream">Mamma Mia</h1>
        <p className="t-body mt-3 text-cream/60">
          Connectez-vous pour gérer les événements du site.
        </p>
        <form onSubmit={onLogin} className="mt-8 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="t-label text-cream/45">Utilisateur</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="min-h-12 rounded-2xl border border-cream/15 bg-white/5 px-4 text-cream outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="t-label text-cream/45">Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="min-h-12 rounded-2xl border border-cream/15 bg-white/5 px-4 text-cream outline-none focus:border-gold"
            />
          </label>
          {error ? <p className="text-sm text-sunset">{error}</p> : null}
          <button
            type="submit"
            disabled={busy}
            className="btn btn--primary mt-2 w-full"
          >
            {busy ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-12 lg:py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="t-eyebrow text-gold">Admin</p>
          <h1 className="font-display mt-2 text-4xl text-cream">Événements</h1>
          <p className="t-body mt-2 max-w-[48ch] text-cream/55">
            Ajoutez un titre, un texte, une date et une image. Les événements
            disparaissent automatiquement 2 jours après leur date.
          </p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="rounded-full border border-cream/20 px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase"
        >
          Déconnexion
        </button>
      </div>

      {storage === "unavailable" ? (
        <p className="mt-6 rounded-2xl border border-sunset/40 bg-sunset/10 px-4 py-3 text-sm text-cream/90">
          Le stockage n&apos;est pas configuré sur Vercel. Créez un Blob Store,
          ajoutez la variable{" "}
          <code className="text-gold">BLOB_READ_WRITE_TOKEN</code>, puis
          redéployez — sans cela, l&apos;ajout d&apos;événements échouera.
        </p>
      ) : storage === "local" ? (
        <p className="mt-6 rounded-2xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-cream/80">
          Stockage local actif. Sur Vercel, ajoutez{" "}
          <code className="text-gold">BLOB_READ_WRITE_TOKEN</code> (Vercel Blob)
          pour que les événements restent après un redéploiement.
        </p>
      ) : null}

      <form
        onSubmit={onCreate}
        className="mt-10 grid gap-5 rounded-3xl border border-cream/12 bg-white/[0.03] p-6 sm:p-8"
      >
        <h2 className="font-display text-2xl text-cream">Nouvel événement</h2>

        <label className="flex flex-col gap-2">
          <span className="t-label text-cream/45">Titre</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="min-h-12 rounded-2xl border border-cream/15 bg-white/5 px-4 text-cream outline-none focus:border-gold"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="t-label text-cream/45">Texte</span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            className="rounded-2xl border border-cream/15 bg-white/5 px-4 py-3 text-cream outline-none focus:border-gold"
          />
        </label>

        <div className="grid gap-5 sm:grid-cols-3">
          <label className="flex flex-col gap-2">
            <span className="t-label text-cream/45">Date</span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="min-h-12 rounded-2xl border border-cream/15 bg-white/5 px-4 text-cream outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="t-label text-cream/45">Heure (optionnel)</span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="min-h-12 rounded-2xl border border-cream/15 bg-white/5 px-4 text-cream outline-none focus:border-gold"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="t-label text-cream/45">Catégorie</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as EventCategory)}
              className="min-h-12 rounded-2xl border border-cream/15 bg-night px-4 text-cream outline-none focus:border-gold"
            >
              {EVENT_CATEGORIES.map((key) => (
                <option key={key} value={key}>
                  {categoryLabel[key]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="t-label text-cream/45">Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-cream/70 file:mr-4 file:rounded-full file:border-0 file:bg-gradient-to-r file:from-sunset file:to-gold file:px-4 file:py-2 file:text-xs file:font-semibold file:tracking-[0.14em] file:text-cream file:uppercase"
          />
        </label>

        {error ? <p className="text-sm text-sunset">{error}</p> : null}
        {message ? <p className="text-sm text-gold">{message}</p> : null}

        <button type="submit" disabled={busy} className="btn btn--primary w-fit">
          {busy ? "Enregistrement…" : "Ajouter l'événement"}
        </button>
      </form>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-cream">
          Publiés ({events.length})
        </h2>
        {events.length === 0 ? (
          <p className="t-body mt-4 text-cream/50">Aucun événement pour le moment.</p>
        ) : (
          <ul className="mt-6 grid gap-4">
            {events.map((event) => (
              <li
                key={event.id}
                className="grid gap-4 rounded-3xl border border-cream/12 bg-white/[0.03] p-4 sm:grid-cols-[7.5rem_1fr_auto] sm:items-center"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-night-2 sm:aspect-square">
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="120px"
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-[0.65rem] tracking-[0.16em] text-cream/35 uppercase">
                      Sans image
                    </div>
                  )}
                </div>
                <div>
                  <p className="t-label text-gold">
                    {event.date}
                    {event.time ? ` · ${event.time}` : ""} ·{" "}
                    {categoryLabel[event.category]}
                  </p>
                  <p className="font-display mt-2 text-xl text-cream">
                    {event.title.fr || event.title.en}
                  </p>
                  <p className="t-body mt-1 line-clamp-2 text-cream/55">
                    {event.description.fr || event.description.en}
                  </p>
                </div>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onDelete(event.id)}
                  className="rounded-full border border-cream/20 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-cream uppercase hover:border-sunset hover:text-sunset"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
