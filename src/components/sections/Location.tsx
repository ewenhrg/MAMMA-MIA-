"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Cta } from "@/components/ui/Cta";
import { Pin, WhatsApp } from "@/components/ui/Icons";
import { Media } from "@/components/ui/Media";
import { ParallaxFrame } from "@/components/ui/ParallaxFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hasReservationLink, reservationHref, siteConfig, whatsappHref } from "@/config/site";

/**
 * Contact and location.
 *
 * The exact address, coordinates and hours were not provided, so nothing is
 * guessed. Phone / WhatsApp is wired to +201208185554. Other fields stay
 * configurable and the UI hides them until `NEXT_PUBLIC_*` values are filled in.
 */
export function Location() {
  const { t, lang } = useLocale();
  const { location } = t.home;
  const { contact } = siteConfig;

  return (
    <section id="contact" className="section">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow={location.eyebrow}
            lines={location.title}
            lead={location.lead}
            size="h1"
          />

          <dl className="mt-10 flex flex-col">
            <Reveal>
              <div className="border-t border-[color:var(--hairline)] py-5">
                <dt className="t-label text-[color:var(--fg-faint)]">
                  {location.addressLabel}
                </dt>
                <dd className="t-body mt-2 text-[color:var(--fg)]">
                  {siteConfig.location}
                  <span className="mt-1 block text-[color:var(--fg-soft)]">
                    {location.addressPending}
                  </span>
                </dd>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="border-t border-[color:var(--hairline)] py-5">
                <dt className="t-label text-[color:var(--fg-faint)]">{location.hoursLabel}</dt>
                <dd className="t-body mt-2 text-[color:var(--fg-soft)]">
                  {location.hoursPending}
                </dd>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="border-t border-b border-[color:var(--hairline)] py-5">
                <dt className="t-label text-[color:var(--fg-faint)]">
                  {location.contactLabel}
                </dt>
                <dd className="t-body mt-2 text-[color:var(--fg)]">
                  {contact.phone || contact.email ? (
                    <span className="flex flex-col gap-1">
                      {contact.phone && (
                        <a href={`tel:${contact.phone}`} className="link-underline inline-flex min-h-11 w-fit items-center">
                          {contact.phoneDisplay}
                        </a>
                      )}
                      {contact.email && (
                        <a href={`mailto:${contact.email}`} className="link-underline w-fit">
                          {contact.email}
                        </a>
                      )}
                    </span>
                  ) : (
                    <span className="text-[color:var(--fg-soft)]">
                      {siteConfig.social.instagramHandle}
                    </span>
                  )}
                </dd>
              </div>
            </Reveal>
          </dl>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Cta
                href={hasReservationLink ? reservationHref(lang) : siteConfig.social.instagramUrl}
                external
                cursorLabel={t.common.cursor.open}
                icon={<WhatsApp className="h-4 w-4" />}
              >
                {t.common.actions.book}
              </Cta>

              {hasReservationLink ? (
                <Cta
                  href={whatsappHref}
                  external
                  variant="ghost"
                  cursorLabel={t.common.cursor.open}
                  icon={<WhatsApp className="h-4 w-4" />}
                >
                  {t.common.actions.whatsapp}
                </Cta>
              ) : null}

              {contact.googleMapsUrl ? (
                <Cta
                  href={contact.googleMapsUrl}
                  external
                  variant="ghost"
                  cursorLabel={t.common.cursor.open}
                  icon={<Pin className="h-4 w-4" />}
                >
                  {t.common.actions.openMaps}
                </Cta>
              ) : (
                <span className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-dashed border-[color:var(--hairline)] px-5 text-[0.7rem] font-semibold tracking-[0.14em] text-[color:var(--fg-faint)] uppercase">
                  <Pin className="h-4 w-4" />
                  {t.common.states.comingSoon}
                </span>
              )}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <ParallaxFrame className="aspect-4/5 w-full sm:aspect-4/3 lg:aspect-square">
            <Media slot="location" lang={lang} sizes="(max-width: 1024px) 100vw, 48vw" />
          </ParallaxFrame>
        </div>
      </div>
    </section>
  );
}
