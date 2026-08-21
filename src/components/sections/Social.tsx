"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Cta } from "@/components/ui/Cta";
import { ArrowUpRight, Instagram, Snapchat } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { useSpotlight } from "@/lib/hooks";

/**
 * Social hub. Deliberately not a fake live feed — there is no Instagram API
 * access, so this links out and stays honest about where the pictures live.
 */
export function Social() {
  const { t } = useLocale();
  const { social } = siteConfig;
  const spotlight = useSpotlight();

  return (
    <section id="social" className="section">
      <div className="shell">
        <div className="card overflow-hidden p-5 sm:p-12 lg:p-16" {...spotlight}>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow={t.home.social.eyebrow}
                lines={t.home.social.title}
                lead={t.home.social.lead}
                size="h1"
              />
            </div>

            <div className="flex flex-col gap-4 lg:col-span-5">
              <Reveal>
                <a
                  href={social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={t.common.cursor.open}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--hairline)] p-5 transition-colors duration-500 hover:border-[color:var(--accent)]"
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sunset to-gold text-cream">
                      <Instagram className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="t-label block text-[color:var(--fg-faint)]">
                        {t.common.actions.instagram}
                      </span>
                      <span className="font-display block truncate text-[clamp(1.1rem,2.4vw,1.5rem)] text-[color:var(--fg)] normal-case">
                        {social.instagramHandle}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:var(--fg-soft)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Reveal>

              <Reveal delay={0.08}>
                {social.snapchatUrl ? (
                  <a
                    href={social.snapchatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor={t.common.cursor.open}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--hairline)] p-5 transition-colors duration-500 hover:border-[color:var(--accent)]"
                  >
                    <SnapchatIdentity handle={social.snapchatHandle} label={t.common.actions.snapchat} />
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-[color:var(--fg-soft)] transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                ) : (
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-dashed border-[color:var(--hairline)] p-5">
                    <SnapchatIdentity handle={social.snapchatHandle} label={t.common.actions.snapchat} />
                    <span className="t-label shrink-0 text-right text-[color:var(--fg-faint)]">
                      {t.common.states.comingSoon}
                    </span>
                  </div>
                )}
              </Reveal>

              <Reveal delay={0.16}>
                <Cta
                  href={social.instagramUrl}
                  external
                  className="mt-2 w-full"
                  cursorLabel={t.common.cursor.open}
                  icon={<ArrowUpRight className="h-3.5 w-3.5" />}
                >
                  {t.common.actions.followInstagram}
                </Cta>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SnapchatIdentity({ handle, label }: { handle: string; label: string }) {
  return (
    <span className="flex items-center gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#FFFC00] text-night">
        <Snapchat className="h-5 w-5" />
      </span>
      <span>
        <span className="t-label block text-[color:var(--fg-faint)]">{label}</span>
        <span className="font-display block truncate text-[clamp(1.1rem,2.4vw,1.5rem)] text-[color:var(--fg)] normal-case">
          {handle}
        </span>
      </span>
    </span>
  );
}
