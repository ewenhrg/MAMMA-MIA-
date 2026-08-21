"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSpotlight } from "@/lib/hooks";

/**
 * The venue in one screen: the promise, then the six things that make it up.
 * On small screens the pillars become a swipeable rail rather than a tall stack.
 */
export function Experience() {
  const { t } = useLocale();
  const { experience } = t.home;
  const spotlight = useSpotlight();

  return (
    <section id="experience" className="section">
      <div className="shell">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <SectionHeading
            className="lg:col-span-7"
            eyebrow={experience.eyebrow}
            lines={experience.title}
            size="h1"
          />

          <div className="flex flex-col justify-end gap-6 lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="t-lead text-pretty text-[color:var(--fg)]">{experience.lead}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="t-body text-pretty max-w-[52ch] text-[color:var(--fg-soft)]">
                {experience.body}
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain pb-2 pl-[var(--gutter-left)] pr-[var(--gutter-right)] md:mt-20 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible lg:grid-cols-3 lg:gap-6">
        {experience.pillars.map((pillar, index) => (
          <Reveal
            key={pillar.title}
            delay={index * 0.06}
            scale={0.96}
            className="w-[min(78vw,19.5rem)] shrink-0 snap-start snap-always sm:w-[62vw] md:w-auto"
          >
            <article className="card flex h-full flex-col gap-3 p-5 md:p-7" {...spotlight}>
              <span className="font-display text-[color:var(--accent)] text-sm tracking-[0.1em]">
                0{index + 1}
              </span>
              <h3 className="font-display t-h3 text-[color:var(--fg)]">{pillar.title}</h3>
              <p className="t-body text-pretty text-[color:var(--fg-soft)]">{pillar.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
