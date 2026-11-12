"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { MENU_TAX_NOTE, menuSections } from "@/data/menu";

const formatPrice = (price: number) => `${price}`;

export function MenuView() {
  const [activeSection, setActiveSection] = useState(menuSections[0]?.id ?? "drinks");

  useEffect(() => {
    const nodes = menuSections
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="menu-page relative min-h-dvh overflow-x-hidden bg-[linear-gradient(180deg,#0a121c_0%,#121c2a_42%,#0b1420_100%)] text-[color:var(--fg)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(249,178,51,0.16),transparent_58%)]"
      />

      <header className="relative border-b border-[color:var(--hairline)] px-[max(1rem,env(safe-area-inset-left))] pb-6 pt-[max(1.25rem,env(safe-area-inset-top))] pr-[max(1rem,env(safe-area-inset-right))]">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <Image
            src={siteConfig.logo.src}
            alt={siteConfig.shortName}
            width={64}
            height={64}
            className="h-14 w-14 rounded-full object-cover ring-1 ring-[color:var(--hairline)]"
            priority
          />
          <div className="min-w-0">
            <p className="font-[family-name:var(--font-accent)] text-xl text-gold italic leading-none">
              {siteConfig.shortName}
            </p>
            <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-cream">
              Day Menu
            </h1>
            <p className="mt-1 text-sm text-[color:var(--fg-faint)]">
              Beach Club · Restaurant · {siteConfig.city}
            </p>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-3xl rounded-full border border-[color:var(--hairline)] bg-white/5 px-4 py-2 text-center text-xs font-medium uppercase tracking-[0.18em] text-gold">
          {MENU_TAX_NOTE}
        </p>
      </header>

      <nav
        aria-label="Menu sections"
        className="sticky top-0 z-20 border-b border-[color:var(--hairline)] bg-[color-mix(in_oklab,#060b12_88%,transparent)] px-[max(0.75rem,env(safe-area-inset-left))] backdrop-blur-xl pr-[max(0.75rem,env(safe-area-inset-right))]"
      >
        <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {menuSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-gold text-night"
                    : "bg-white/5 text-[color:var(--fg-soft)] ring-1 ring-[color:var(--hairline)]"
                }`}
              >
                {section.title}
              </a>
            );
          })}
        </div>
      </nav>

      <main className="relative mx-auto max-w-3xl px-[max(1rem,env(safe-area-inset-left))] pb-[max(3rem,env(safe-area-inset-bottom))] pt-8 pr-[max(1rem,env(safe-area-inset-right))]">
        {menuSections.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-24 pb-12">
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-gold">
                {section.subtitle}
              </p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-cream">
                {section.title}
              </h2>
            </div>

            <div className="space-y-10">
              {section.categories.map((category) => (
                <div key={category.id}>
                  <div className="mb-4 flex items-end justify-between gap-3 border-b border-[color:var(--hairline)] pb-2">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-cream">
                        {category.title}
                      </h3>
                      {category.subtitle ? (
                        <p className="mt-0.5 text-sm text-[color:var(--fg-faint)]">
                          {category.subtitle}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {category.items.map((item) => (
                      <li
                        key={`${category.id}-${item.name}`}
                        className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1"
                      >
                        <div className="min-w-0">
                          <p className="font-medium leading-snug text-cream">{item.name}</p>
                          {item.description ? (
                            <p className="mt-0.5 text-sm leading-snug text-[color:var(--fg-faint)]">
                              {item.description}
                            </p>
                          ) : null}
                        </div>
                        <p className="shrink-0 pt-0.5 font-[family-name:var(--font-display)] text-base font-semibold tabular-nums text-gold">
                          {formatPrice(item.price)}
                        </p>
                      </li>
                    ))}
                  </ul>

                  {category.note ? (
                    <p className="mt-3 text-sm italic text-[color:var(--fg-faint)]">
                      {category.note}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ))}

        <footer className="border-t border-[color:var(--hairline)] pt-6 text-center">
          <p className="font-[family-name:var(--font-accent)] text-lg text-gold italic">
            {siteConfig.shortName}
          </p>
          <p className="mt-1 text-sm text-[color:var(--fg-faint)]">
            {siteConfig.tagline} · {siteConfig.location}
          </p>
          <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[color:var(--fg-faint)]">
            {MENU_TAX_NOTE} · Prices in EGP
          </p>
        </footer>
      </main>
    </div>
  );
}
