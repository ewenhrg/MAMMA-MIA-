"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Media } from "@/components/ui/Media";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSpotlight } from "@/lib/hooks";

/**
 * Chapter six. The two large screens are a confirmed feature of the venue; no
 * fixtures, kick-off times or competitions are named because none were supplied.
 */
export function Sports() {
  const { t, lang } = useLocale();
  const { sports } = t.home;
  const spotlight = useSpotlight();

  return (
    <section id="sports" className="section">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={sports.eyebrow}
              lines={sports.title}
              lead={sports.lead}
              size="h1"
            />
            <Reveal delay={0.16}>
              <p className="t-body text-pretty mt-6 max-w-[44ch] text-[color:var(--fg-soft)]">
                {sports.body}
              </p>
            </Reveal>
          </div>

          <ParallaxFrame
            className="aspect-[3/4] w-full lg:col-span-5 lg:col-start-8"
            cursorLabel={t.common.cursor.view}
          >
            <Media slot="sports" lang={lang} sizes="(max-width: 1024px) 100vw, 420px" />
          </ParallaxFrame>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-16">
          {sports.features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.08} scale={0.96} as="li">
              <div className="card h-full p-6 md:p-7" {...spotlight}>
                <span className="font-display text-sm text-[color:var(--accent)]">
                  0{index + 1}
                </span>
                <h3 className="font-display t-h3 mt-3 text-[color:var(--fg)]">{feature.title}</h3>
                <p className="t-body text-pretty mt-2 text-[color:var(--fg-soft)]">
                  {feature.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="t-body mt-8 max-w-[58ch] text-[color:var(--fg-faint)]">
            {sports.scheduleNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
