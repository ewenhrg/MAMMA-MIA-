"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Media } from "@/components/ui/Media";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Chapter one: the sticky headline holds while the beach imagery scrolls past. */
export function Beach() {
  const { t, lang } = useLocale();
  const { beach } = t.home;

  return (
    <section id="beach" className="section">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)]">
            <SectionHeading
              eyebrow={beach.eyebrow}
              lines={beach.title}
              lead={beach.lead}
              size="h1"
            />

            <Reveal delay={0.2}>
              <p className="t-body text-pretty mt-6 max-w-[46ch] text-[color:var(--fg-soft)]">
                {beach.body}
              </p>
            </Reveal>

            <dl className="mt-10 flex flex-col">
              {beach.notes.map((note, index) => (
                <Reveal key={note.label} delay={0.06 * index}>
                  <div className="flex flex-col gap-1 border-t border-[color:var(--hairline)] py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                    <dt className="t-label text-[color:var(--fg-faint)]">{note.label}</dt>
                    <dd className="t-body text-[color:var(--fg)] sm:text-right">{note.value}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-7 lg:gap-8">
          <ParallaxFrame
            className="aspect-[3/4] w-full sm:aspect-[4/5] lg:aspect-[3/4]"
            cursorLabel={t.common.cursor.view}
          >
            <Media
              slot="beachWide"
              lang={lang}
              sizes="(max-width: 1024px) 100vw, 520px"
            />
          </ParallaxFrame>

          <div className="grid grid-cols-2 gap-5 lg:gap-8">
            <ParallaxFrame className="aspect-[3/4]" amount={12}>
              <Media slot="beachTall" lang={lang} sizes="(max-width: 1024px) 45vw, 28vw" />
            </ParallaxFrame>
            <Reveal delay={0.1} className="flex items-end">
              <p className="font-accent text-pretty text-[clamp(1.25rem,2.6vw,1.9rem)] leading-[1.25] text-[color:var(--fg)]">
                {beach.lead}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
