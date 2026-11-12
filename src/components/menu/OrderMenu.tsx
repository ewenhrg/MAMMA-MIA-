"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { menuSections, type MenuItem } from "@/data/menu";
import {
  MENU_LANGS,
  MENU_UI,
  categoryLabels,
  detectMenuLang,
  isRtl,
  translate,
  type MenuLang,
} from "@/data/menu-i18n";

const STORAGE_KEY = "mammamia-order-v1";
const LANG_STORAGE_KEY = "mammamia-menu-lang";

type Cart = Record<string, number>;
type View = "menu" | "order" | "waiter";

type IndexedItem = MenuItem & { id: string; categoryId: string; categoryTitle: string };

const slug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const itemId = (categoryId: string, name: string) => `${categoryId}:${slug(name)}`;

const isMenuLang = (value: unknown): value is MenuLang =>
  MENU_LANGS.some((l) => l.code === value);

export function OrderMenu() {
  const [cart, setCart] = useState<Cart>({});
  const [table, setTable] = useState("");
  const [view, setView] = useState<View>("menu");
  const [sectionId, setSectionId] = useState(menuSections[0].id);
  const [activeCategory, setActiveCategory] = useState(menuSections[0].categories[0].id);
  const [hydrated, setHydrated] = useState(false);
  const [orderTime, setOrderTime] = useState("");
  const [lang, setLang] = useState<MenuLang>("en");
  const [langSheetOpen, setLangSheetOpen] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);

  const ui = MENU_UI[lang];
  const tr = (text: string) => translate(lang, text);
  const formatPrice = (value: number) => `${value.toLocaleString("en-US")} ${ui.currency}`;

  const index = useMemo(() => {
    const map = new Map<string, IndexedItem>();
    for (const section of menuSections)
      for (const category of section.categories)
        for (const item of category.items) {
          const id = itemId(category.id, item.name);
          map.set(id, { ...item, id, categoryId: category.id, categoryTitle: category.title });
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
    const savedLang = localStorage.getItem(LANG_STORAGE_KEY);
    setLang(isMenuLang(savedLang) ? savedLang : detectMenuLang(navigator.languages ?? [navigator.language]));
    setHydrated(true);
  }, [index]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, table }));
  }, [cart, table, hydrated]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";
  }, [lang]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", view !== "menu" || langSheetOpen);
    return () => document.body.classList.remove("is-locked");
  }, [view, langSheetOpen]);

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
  }, [activeCategory, lang]);

  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ item: index.get(id), qty }))
    .filter((line): line is { item: IndexedItem; qty: number } => Boolean(line.item));
  const count = lines.reduce((sum, l) => sum + l.qty, 0);

  const setQty = (id: string, qty: number) =>
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });

  const chooseLang = (next: MenuLang) => {
    setLang(next);
    localStorage.setItem(LANG_STORAGE_KEY, next);
    setLangSheetOpen(false);
  };

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
    if (!window.confirm(ui.confirmNewOrder)) return;
    setCart({});
    setView("menu");
  };

  const currentLang = MENU_LANGS.find((l) => l.code === lang) ?? MENU_LANGS[0];

  return (
    <div dir={isRtl(lang) ? "rtl" : "ltr"} lang={lang} className="min-h-dvh bg-[#fbf6ec] text-[#1b1410]">
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
              <p className="truncate text-xs text-black/55">{ui.tagline}</p>
            </div>
            <span className="hidden rounded-full bg-[#ef4b22]/10 px-2.5 py-1 text-[11px] font-semibold text-[#c2380f] min-[380px]:inline">
              {ui.tax}
            </span>
            <button
              type="button"
              onClick={() => setLangSheetOpen(true)}
              aria-label={ui.language}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/15 bg-white px-3 py-1.5 text-[13px] font-semibold active:scale-95"
            >
              <span aria-hidden>🌐</span>
              {currentLang.short}
            </button>
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
                {s.id === "drinks" ? ui.drinks : ui.food}
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
                {categoryLabels(lang, c.id, c.title).chip}
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
                {categoryLabels(lang, category.id, category.title).title}
              </h2>
              {category.subtitle ? (
                <span className="text-xs font-medium text-black/50">{category.subtitle}</span>
              ) : null}
            </div>

            <ul className="divide-y divide-black/[0.07] overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
              {category.items.map((item) => {
                const id = itemId(category.id, item.name);
                const qty = cart[id] ?? 0;
                const name = tr(item.name);
                return (
                  <li key={id} className="flex items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium leading-snug">{name}</p>
                      {item.description ? (
                        <p className="mt-0.5 text-[13px] leading-snug text-black/55">
                          {tr(item.description)}
                        </p>
                      ) : null}
                      <p className="mt-1 text-sm font-semibold text-[#c2380f]">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => setQty(id, 1)}
                        aria-label={`${ui.add} ${name}`}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#1b1410] text-xl font-medium text-white active:scale-95"
                      >
                        +
                      </button>
                    ) : (
                      <Stepper
                        qty={qty}
                        addLabel={`${ui.add} ${name}`}
                        removeLabel={`${ui.remove} ${name}`}
                        onChange={(next) => setQty(id, next)}
                      />
                    )}
                  </li>
                );
              })}
            </ul>

            {category.note ? (
              <p className="mt-2 px-1 text-[13px] italic text-black/55">{tr(category.note)}</p>
            ) : null}
          </section>
        ))}

        <p className="pt-2 text-center text-xs text-black/45">
          {ui.footer} ·{" "}
          <a href="/menu.pdf" className="underline">
            {ui.pdfMenu}
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
              <span className="font-semibold">{ui.viewOrder}</span>
            </span>
            <span aria-hidden className="text-xl leading-none rtl:rotate-180">→</span>
          </button>
        </div>
      ) : null}

      {view === "order" ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#fbf6ec]">
          <div className="mx-auto max-w-2xl px-4 pb-40 pt-[max(1rem,env(safe-area-inset-top))]">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setView("menu")}
                className="flex items-center gap-1.5 rounded-full bg-black/[0.06] px-4 py-2 text-sm font-semibold"
              >
                <span aria-hidden className="rtl:rotate-180">←</span>
                {ui.backToMenu}
              </button>
              <h1 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {ui.myOrder}
              </h1>
              <button
                type="button"
                onClick={() => setLangSheetOpen(true)}
                aria-label={ui.language}
                className="flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3 py-1.5 text-[13px] font-semibold"
              >
                <span aria-hidden>🌐</span>
                {currentLang.short}
              </button>
            </div>

            {lines.length === 0 ? (
              <p className="mt-16 text-center text-black/55">{ui.emptyOrder}</p>
            ) : (
              <>
                <ul className="mt-5 divide-y divide-black/[0.07] overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
                  {lines.map(({ item, qty }) => {
                    const name = tr(item.name);
                    return (
                      <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium leading-snug">{name}</p>
                          <p className="text-xs text-black/50">
                            {categoryLabels(lang, item.categoryId, item.categoryTitle).title}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#c2380f]">
                            {formatPrice(item.price)}
                          </p>
                        </div>
                        <Stepper
                          qty={qty}
                          addLabel={`${ui.add} ${name}`}
                          removeLabel={`${ui.remove} ${name}`}
                          onChange={(next) => setQty(item.id, next)}
                        />
                      </li>
                    );
                  })}
                </ul>

                <label className="mt-5 block">
                  <span className="text-sm font-semibold">{ui.tableLabel}</span>
                  <input
                    value={table}
                    onChange={(e) => setTable(e.target.value.slice(0, 12))}
                    inputMode="text"
                    placeholder={ui.tablePlaceholder}
                    className="mt-2 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-base outline-none focus:border-[#ef4b22]"
                  />
                </label>
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
                {ui.showWaiter}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {view === "waiter" ? (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div className="mx-auto max-w-2xl px-5 pb-10 pt-[max(1.25rem,env(safe-area-inset-top))]">
            <div className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5">
              {MENU_LANGS.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => chooseLang(l.code)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                    l.code === lang
                      ? "bg-[#ef4b22] text-white"
                      : "bg-black/[0.06] text-black/70"
                  }`}
                >
                  {l.short}
                </button>
              ))}
            </div>

            <div className="flex items-start justify-between gap-4 border-b-2 border-black pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c2380f]">
                  {ui.orderHeading}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold">
                  {table ? ui.table(table) : ui.customerOrder}
                </p>
              </div>
              <div className="text-end">
                <p className="text-2xl font-bold tabular-nums">{orderTime}</p>
                <p className="text-sm text-black/60">{ui.items(count)}</p>
              </div>
            </div>

            <ul className="divide-y divide-black/10">
              {lines.map(({ item, qty }) => {
                const name = tr(item.name);
                return (
                  <li key={item.id} className="flex items-start gap-4 py-4">
                    <span className="grid h-10 min-w-10 place-items-center rounded-lg bg-black px-2 text-xl font-bold text-white">
                      {qty}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xl font-semibold leading-tight">{name}</p>
                      {name !== item.name ? (
                        <p className="text-sm font-medium text-black/70">{item.name}</p>
                      ) : null}
                      <p className="text-sm text-black/55">
                        {categoryLabels(lang, item.categoryId, item.categoryTitle).title}
                      </p>
                    </div>
                    <p className="text-lg font-semibold tabular-nums">
                      {formatPrice(item.price)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setView("order")}
                className="rounded-2xl bg-black/[0.07] px-4 py-4 font-semibold"
              >
                {ui.editOrder}
              </button>
              <button
                type="button"
                onClick={clearOrder}
                className="rounded-2xl border border-black/15 px-4 py-4 font-semibold text-[#c2380f]"
              >
                {ui.newOrder}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {langSheetOpen ? (
        <div
          className="fixed inset-0 z-[60] flex items-end bg-black/40"
          onClick={() => setLangSheetOpen(false)}
        >
          <div
            role="dialog"
            aria-label={ui.language}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-full max-w-2xl rounded-t-3xl bg-white px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3"
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/15" />
            <p className="mb-3 px-1 text-sm font-semibold text-black/60">{ui.language}</p>
            <ul className="grid grid-cols-2 gap-2">
              {MENU_LANGS.map((l) => (
                <li key={l.code}>
                  <button
                    type="button"
                    onClick={() => chooseLang(l.code)}
                    dir={isRtl(l.code) ? "rtl" : "ltr"}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-start text-base font-semibold transition ${
                      l.code === lang
                        ? "border-[#ef4b22] bg-[#ef4b22]/10 text-[#c2380f]"
                        : "border-black/10 bg-white"
                    }`}
                  >
                    {l.label}
                    {l.code === lang ? <span aria-hidden>✓</span> : null}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Stepper({
  qty,
  addLabel,
  removeLabel,
  onChange,
}: {
  qty: number;
  addLabel: string;
  removeLabel: string;
  onChange: (qty: number) => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#1b1410] p-1 text-white">
      <button
        type="button"
        onClick={() => onChange(qty - 1)}
        aria-label={removeLabel}
        className="grid h-8 w-8 place-items-center rounded-full text-lg active:bg-white/15"
      >
        −
      </button>
      <span className="min-w-6 text-center text-sm font-bold tabular-nums">{qty}</span>
      <button
        type="button"
        onClick={() => onChange(qty + 1)}
        aria-label={addLabel}
        className="grid h-8 w-8 place-items-center rounded-full text-lg active:bg-white/15"
      >
        +
      </button>
    </div>
  );
}
