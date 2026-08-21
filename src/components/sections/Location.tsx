"use client";

import { useLocale } from "@/components/providers/LocaleProvider";
import { Cta } from "@/components/ui/Cta";
import { Pin, WhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { hasReservationLink, reservationHref, siteConfig, whatsappHref } from "@/config/site";

/**
 * Contact and location.
 *
 * Address tip and Google Maps pin come from the venue. Hours stay ask-us until
 * confirmed. Phone / WhatsApp is wired to +201208185554.
 */
export function Location() {
  const { t, lang } = useLocale();
  const { location } = t.home;
  const { contact } = siteConfig;

  return (
    <section id="contact" className="section">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
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
                        <a
                          href={`tel:${contact.phone}`}
                          className="link-underline inline-flex min-h-11 w-fit items-center"
                        >
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
              ) : null}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="frame relative aspect-[4/3] w-full sm:aspect-[16/11]">
              <iframe
                title={location.mapLabel}
                src={contact.googleMapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href={contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={t.common.cursor.open}
                className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-night/80 px-3.5 py-2.5 text-[0.65rem] font-semibold tracking-[0.14em] text-cream uppercase backdrop-blur-sm transition-colors duration-300 hover:bg-night sm:bottom-5 sm:left-5"
              >
                <Pin className="h-3.5 w-3.5" />
                {t.common.actions.openMaps}
              </a>
            </div>
            <p className="t-body mt-4 max-w-[42ch] text-[color:var(--fg-soft)]">
              {location.addressPending}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
