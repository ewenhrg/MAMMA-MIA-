"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Media } from "@/components/ui/Media";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Chapter two. Deliberately says nothing about specific dishes, prices or
 * ingredients — none were supplied — and instead sells the table and the setting.
 */
export function Food() {
  const { t, lang } = useLocale();
  const { food } = t.home;

  return (
    <section id="food" className="section">
      <div className="shell">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <ParallaxFrame
            className="aspect-[3/4] w-full lg:col-span-6"
            cursorLabel={t.common.cursor.view}
          >
            <Media slot="food" lang={lang} sizes="(max-width: 1024px) 100vw, 520px" />
          </ParallaxFrame>

          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8">
            <div className="card p-6 sm:p-8">
              <p className="t-lead text-pretty text-[color:var(--fg)]">{food.lead}</p>
              <p className="t-body text-pretty mt-4 text-[color:var(--fg-soft)]">{food.body}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-12 lg:gap-14">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow={food.eyebrow}
            lines={food.title}
            size="h1"
          />

          <div className="lg:col-span-5">
            <ParallaxFrame className="aspect-[3/4] w-full" amount={12}>
              <Media slot="foodDetail" lang={lang} sizes="(max-width: 1024px) 100vw, 380px" />
            </ParallaxFrame>
            <Reveal delay={0.1}>
              <p className="t-body mt-5 text-[color:var(--fg-faint)]">{food.menuNote}</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
