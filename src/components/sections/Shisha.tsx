"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Media } from "@/components/ui/Media";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Chapter four, and the hinge of the whole page: `#anchor-sunset` tells the
 * journey engine that golden hour starts here.
 */
export function Shisha() {
  const { t, lang } = useLocale();
  const { shisha } = t.home;

  return (
    <section id="shisha" className="section">
      <span id="anchor-sunset" aria-hidden="true" className="block" />

      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <ParallaxFrame
          className="aspect-[3/4] w-full lg:col-span-5"
          cursorLabel={t.common.cursor.view}
        >
          <Media slot="shisha" lang={lang} sizes="(max-width: 1024px) 100vw, 420px" />
        </ParallaxFrame>

        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading
            eyebrow={shisha.eyebrow}
            lines={shisha.title}
            lead={shisha.lead}
          />
          <Reveal delay={0.18}>
            <p className="t-body text-pretty mt-6 max-w-[44ch] text-[color:var(--fg-soft)]">
              {shisha.body}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
