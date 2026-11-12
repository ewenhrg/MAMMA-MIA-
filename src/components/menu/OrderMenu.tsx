"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { menuSections, type MenuItem } from "@/data/menu";

const STORAGE_KEY = "mammamia-order-v1";
const TAX_RATE = 0.14;

type Cart = Record<string, number>;
type View = "menu" | "order" | "waiter";

type IndexedItem = MenuItem & { id: string; category: string };

const slug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const itemId = (categoryId: string, name: string) => `${categoryId}:${slug(name)}`;

const formatEgp = (value: number) => `${value.toLocaleString("en-US")} EGP`;

export function OrderMenu() {
  const [cart, setCart] = useState<Cart>({});
  const [table, setTable] = useState("");
  const [view, setView] = useState<View>("menu");
  const [sectionId, setSectionId] = useState(menuSections[0].id);
  const [activeCategory, setActiveCategory] = useState(menuSections[0].categories[0].id);
  const [hydrated, setHydrated] = useState(false);
  const [orderTime, setOrderTime] = useState("");
  const chipsRef = useRef<HTMLDivElement>(null);

  const index = useMemo(() => {
    const map = new Map<string, IndexedItem>();
    for (const section of menuSections)
      for (const category of section.categories)
        for (const item of category.items) {
          const id = itemId(category.id, item.name);
          map.set(id, { ...item, id, category: category.title });
        }
    return map;
  }, []);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved === "object") {
        const restored: Cart = {};
        for (const [id, qty] of Object.entries(saved.cart ?? {}))
          if (index.has(id) && typeof qty === "number" && qty > 0) restored[id] = qty;
        setCart(restored);
        if (typeof saved.table === "string") setTable(saved.table);
      }
    } catch {}
    setHydrated(true);
  }, [index]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, table }));
  }, [cart, table, hydrated]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", view !== "menu");
    return () => document.body.classList.remove("is-locked");
  }, [view]);

  const section = menuSections.find((s) => s.id === sectionId) ?? menuSections[0];

  useEffect(() => {
    const nodes = section.categories
      .map((c) => document.getElementById(c.id))
      .filter((n): n is HTMLElement => Boolean(n));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveCategory(visible.target.id);
      },
      { rootMargin: "-160px 0px -65% 0px" },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [section]);

  useEffect(() => {
    const chip = chipsRef.current?.querySelector<HTMLElement>(`[data-chip="${activeCategory}"]`);
    chip?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [activeCategory]);

  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ item: index.get(id), qty }))
    .filter((line): line is { item: IndexedItem; qty: number } => Boolean(line.item));
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.item.price, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  const setQty = (id: string, qty: number) =>
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const switchSection = (id: string) => {
    setSectionId(id);
    const first = menuSections.find((s) => s.id === id)?.categories[0];
    if (first) setActiveCategory(first.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showWaiter = () => {
    setOrderTime(
      new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    );
    setView("waiter");
  };

  const clearOrder = () => {
    if (!window.confirm("Start a new order? Your current selection will be cleared.")) return;
    setCart({});
    setView("menu");
  };

  return (
    <div className="min-h-dvh bg-[#fbf6ec] text-[#1b1410]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-[#fbf6ec]/95 backdrop-blur-md">
        <div className="mx-auto max-w-2xl px-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-3">
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.shortName}
              width={44}
              height={44}
              priority
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold leading-tight">
                {siteConfig.shortName}
              </p>
              <p className="text-xs text-black/55">Beach Club · Restaurant · Hurghada</p>
            </div>
            <span className="rounded-full bg-[#ef4b22]/10 px-2.5 py-1 text-[11px] font-semibold text-[#c2380f]">
              Tax +14%
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-1 rounded-full bg-black/[0.06] p-1">
            {menuSections.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => switchSection(s.id)}
                className={`rounded-full py-2 text-sm font-semibold transition ${
                  s.id === sectionId ? "bg-[#1b1410] text-white shadow" : "text-black/60"
                }`}
              >
                {s.id === "drinks" ? "Drinks" : "Food"}
              </button>
            ))}
          </div>

          <div
            ref={chipsRef}
            className="no-scrollbar -mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-3"
          >
            {section.categories.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                data-chip={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition ${
                  activeCategory === c.id
                    ? "border-[#ef4b22] bg-[#ef4b22] text-white"
                    : "border-black/10 bg-white text-black/70"
                }`}
              >
                {c.title.replace("Hot Drinks — ", "Hot ").replace("Cold Drinks — ", "Iced ")}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 pb-36 pt-4">
        {section.categories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-44 pb-6">
            <div className="mb-2 flex items-baseline justify-between gap-3 pt-2">
              <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {category.title}
              </h2>
              {category.subtitle ? (
                <span className="text-xs font-medium text-black/50">{category.subtitle}</span>
              ) : null}
            </div>

            <ul className="divide-y divide-black/[0.07] overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
              {category.items.map((item) => {
                const id = itemId(category.id, item.name);
                const qty = cart[id] ?? 0;
                return (
                  <li key={id} className="flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-snug">{item.name}</p>
                      {item.description ? (
                        <p className="mt-0.5 text-[13px] leading-snug text-black/55">
                          {item.description}
                        </p>
                      ) : null}
                      <p className="mt-1 text-sm font-semibold text-[#c2380f]">
                        {formatEgp(item.price)}
                      </p>
                    </div>
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => setQty(id, 1)}
                        aria-label={`Add ${item.name}`}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1b1410] text-xl font-medium text-white active:scale-95"
                      >
                        +
                      </button>
                    ) : (
                      <Stepper
                        qty={qty}
                        label={item.name}
                        onChange={(next) => setQty(id, next)}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {category.note ? (
              <p className="mt-2 px-1 text-[13px] italic text-black/55">{category.note}</p>
            ) : null}
          </section>
        ))}

        <p className="pt-2 text-center text-xs text-black/45">
          Prices in EGP · Tax charge +14% ·{" "}
          <a href="/menu.pdf" className="underline">
            PDF menu
          </a>
        </p>
      </main>

      {count > 0 && view === "menu" ? (
        <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={() => setView("order")}
            className="mx-auto flex w-full max-w-2xl items-center justify-between rounded-2xl bg-[#ef4b22] px-5 py-4 text-white shadow-[0_12px_32px_-8px_rgba(239,75,34,0.6)] active:scale-[0.99]"
          >
            <span className="flex items-center gap-3">
              <span className="grid h-7 min-w-7 place-items-center rounded-full bg-white px-2 text-sm font-bold text-[#ef4b22]">
                {count}
              </span>
              <span className="font-semibold">View my order</span>
            </span>
            <span className="font-semibold">{formatEgp(subtotal)}</span>
          </button>
        </div>
      ) : null}

      {view === "order" ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#fbf6ec]">
          <div className="mx-auto max-w-2xl px-4 pb-40 pt-[max(1rem,env(safe-area-inset-top))]">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setView("menu")}
                className="rounded-full bg-black/[0.06] px-4 py-2 text-sm font-semibold"
              >
                ← Menu
              </button>
              <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                My order
              </h1>
              <span className="w-[76px]" />
            </div>

            {lines.length === 0 ? (
              <p className="mt-16 text-center text-black/55">Your order is empty.</p>
            ) : (
              <>
                <ul className="mt-5 divide-y divide-black/[0.07] overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
                  {lines.map(({ item, qty }) => (
                    <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium leading-snug">{item.name}</p>
                        <p className="text-xs text-black/50">{item.category}</p>
                        <p className="mt-1 text-sm font-semibold">{formatEgp(item.price * qty)}</p>
                      </div>
                      <Stepper
                        qty={qty}
                        label={item.name}
                        onChange={(next) => setQty(item.id, next)}
                      />
                    </li>
                  ))}
                </ul>

                <label className="mt-5 block">
                  <span className="text-sm font-semibold">Table / sunbed number (optional)</span>
                  <input
                    value={table}
                    onChange={(e) => setTable(e.target.value.slice(0, 12))}
                    inputMode="text"
                    placeholder="e.g. 12"
                    className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base outline-none focus:border-[#ef4b22]"
                  />
                </label>

                <Totals subtotal={subtotal} tax={tax} total={total} />
              </>
            )}
          </div>

          {lines.length > 0 ? (
            <div className="fixed inset-x-0 bottom-0 bg-gradient-to-t from-[#fbf6ec] via-[#fbf6ec] to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
              <button
                type="button"
                onClick={showWaiter}
                className="mx-auto block w-full max-w-2xl rounded-2xl bg-[#1b1410] px-5 py-4 text-center text-base font-semibold text-white active:scale-[0.99]"
              >
                Show to the waiter
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {view === "waiter" ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div className="mx-auto max-w-2xl px-5 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))]">
            <div className="flex items-start justify-between gap-4 border-b-2 border-black pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c2380f]">
                  Mamma Mia · Order
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold">
                  {table ? `Table ${table}` : "Customer order"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold tabular-nums">{orderTime}</p>
                <p className="text-sm text-black/60">
                  {count} item{count > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <ul className="divide-y divide-black/10">
              {lines.map(({ item, qty }) => (
                <li key={item.id} className="flex items-start gap-4 py-4">
                  <span className="grid h-10 min-w-10 place-items-center rounded-lg bg-black px-2 text-xl font-bold text-white">
                    {qty}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xl font-semibold leading-tight">{item.name}</p>
                    <p className="text-sm text-black/55">{item.category}</p>
                  </div>
                  <p className="text-lg font-semibold tabular-nums">
                    {(item.price * qty).toLocaleString("en-US")}
                  </p>
                </li>
              ))}
            </ul>

            <Totals subtotal={subtotal} tax={tax} total={total} large />

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setView("order")}
                className="rounded-2xl bg-black/[0.07] px-4 py-4 font-semibold"
              >
                Edit order
              </button>
              <button
                type="button"
                onClick={clearOrder}
                className="rounded-2xl border border-black/15 px-4 py-4 font-semibold text-[#c2380f]"
              >
                New order
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stepper({
  qty,
  label,
  onChange,
}: {
  qty: number;
  label: string;
  onChange: (qty: number) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#1b1410] p-1 text-white">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label={`Remove one ${label}`}
        className="grid h-8 w-8 place-items-center rounded-full text-lg active:bg-white/15"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-bold tabular-nums">{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label={`Add one ${label}`}
        className="grid h-8 w-8 place-items-center rounded-full text-lg active:bg-white/15"
      >
        +
      </button>
    </div>
  );
}

function Totals({
  subtotal,
  tax,
  total,
  large = false,
}: {
  subtotal: number;
  tax: number;
  total: number;
  large?: boolean;
}) {
  return (
    <dl
      className={`mt-5 space-y-1.5 rounded-2xl bg-black/[0.04] p-4 ${large ? "text-lg" : "text-sm"}`}
    >
      <div className="flex justify-between">
        <dt className="text-black/60">Subtotal</dt>
        <dd className="tabular-nums">{formatEgp(subtotal)}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-black/60">Tax charge 14%</dt>
        <dd className="tabular-nums">{formatEgp(tax)}</dd>
      </div>
      <div
        className={`flex justify-between border-t border-black/10 pt-2 font-bold ${large ? "text-2xl" : "text-base"}`}
      >
        <dt>Total</dt>
        <dd className="tabular-nums">{formatEgp(total)}</dd>
      </div>
    </dl>
  );
}
