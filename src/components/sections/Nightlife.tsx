"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Media } from "@/components/ui/Media";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Chapter five. `#anchor-night` marks the point where the page is fully nocturnal. */
export function Nightlife() {
  const { t, lang } = useLocale();
  const { nightlife } = t.home;

  return (
    <section id="nightlife" className="section">
      <span id="anchor-night" aria-hidden="true" className="block" />

      <div className="shell">
        <SectionHeading
          eyebrow={nightlife.eyebrow}
          lines={nightlife.title}
          size="h1"
          className="max-w-[18ch]"
        />

        <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <ParallaxFrame
            className="mx-auto aspect-[3/4] w-full max-w-lg lg:col-span-8 lg:max-w-none"
            cursorLabel={t.common.cursor.view}
          >
            <Media slot="nightlife" lang={lang} sizes="(max-width: 1024px) 100vw, 640px" />
          </ParallaxFrame>

          <div className="lg:col-span-4">
            <ParallaxFrame className="mx-auto mb-8 aspect-[3/4] w-full max-w-sm lg:max-w-none" amount={12}>
              <Media slot="nightlifeDetail" lang={lang} sizes="(max-width: 1024px) 100vw, 32vw" />
            </ParallaxFrame>
            <Reveal>
              <p className="t-lead text-pretty text-[color:var(--fg)]">{nightlife.lead}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="t-body text-pretty mt-5 text-[color:var(--fg-soft)]">
                {nightlife.body}
              </p>
            </Reveal>

            <ul className="mt-8 flex flex-col">
              {nightlife.tags.map((tag, index) => (
                <Reveal key={tag} delay={index * 0.06} as="li">
                  <span className="font-display flex items-center justify-between border-t border-[color:var(--hairline)] py-3.5 text-[clamp(1.05rem,2vw,1.4rem)] text-[color:var(--fg)]">
                    {tag}
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
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
