"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Media } from "@/components/ui/Media";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Chapter three: virgin cocktails. Bright, centred and unmistakably alcohol-free. */
export function Drinks() {
  const { t, lang } = useLocale();
  const { drinks } = t.home;

  return (
    <section id="drinks" className="section">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow={drinks.eyebrow}
          lines={drinks.title}
          lead={drinks.lead}
          size="h1"
        />

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <ParallaxFrame
            className="aspect-[3/4] w-full lg:col-span-5"
            cursorLabel={t.common.cursor.view}
          >
            <Media slot="drinks" lang={lang} sizes="(max-width: 1024px) 100vw, 420px" />
          </ParallaxFrame>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--accent)]/40 bg-[color:var(--surface-raised)] px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.18em] text-[color:var(--accent)] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {drinks.badge}
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-body text-pretty mt-8 max-w-[46ch] text-[color:var(--fg-soft)]">
                {drinks.body}
              </p>
            </Reveal>
            <ul className="mt-8 flex flex-wrap gap-2">
              {drinks.tags.map((tag, index) => (
                <Reveal key={tag} delay={index * 0.05} as="li">
                  <span className="inline-flex min-h-10 items-center rounded-full border border-[color:var(--hairline)] px-4 text-[0.7rem] font-semibold tracking-[0.14em] text-[color:var(--fg-soft)] uppercase">
                    {tag}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
