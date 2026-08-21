"use client";

import { LanguageSwitcher } from "@/components/chrome/LanguageSwitcher";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Cta } from "@/components/ui/Cta";
import { ArrowUpRight, Instagram, Snapchat, TikTok, WhatsApp } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { hasReservationLink, navigation, reservationHref, siteConfig, whatsappHref } from "@/config/site";

export function Footer() {
  const { t, lang } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[color:var(--hairline)]">
        <div className="shell py-14 max-lg:pb-[calc(var(--safe-b)+6.5rem)] lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Logo size={72} alt={t.common.a11y.logo} />
            <p className="font-display mt-5 text-[clamp(1.35rem,3vw,2rem)] text-[color:var(--fg)]">
              {siteConfig.name}
            </p>
            <p className="t-label mt-3 text-[color:var(--fg-faint)]">{siteConfig.tagline}</p>
            <p className="t-body mt-1 text-[color:var(--fg-soft)]">{siteConfig.location}</p>

            <div className="mt-8 max-w-xs">
              <Cta
                href={hasReservationLink ? reservationHref(lang) : "#contact"}
                external={hasReservationLink}
                size="sm"
                className="w-full"
                icon={<WhatsApp className="h-4 w-4" />}
              >
                {t.common.actions.book}
              </Cta>
            </div>
          </div>

          <nav className="lg:col-span-3" aria-label={t.common.a11y.footerNavigation}>
            <p className="t-label text-[color:var(--fg-faint)]">{t.common.footer.explore}</p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {navigation.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.hash}
                    className="link-underline t-body text-[color:var(--fg-soft)] transition-colors duration-300 hover:text-[color:var(--fg)]"
                  >
                    {t.common.nav[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="t-label text-[color:var(--fg-faint)]">{t.common.footer.connect}</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={siteConfig.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[color:var(--fg-soft)] transition-colors duration-300 hover:text-[color:var(--fg)]"
                >
                  <Instagram className="h-4 w-4" />
                  <span className="t-body">{siteConfig.social.instagramHandle}</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[color:var(--fg-soft)] transition-colors duration-300 hover:text-[color:var(--fg)]"
                >
                  <TikTok className="h-4 w-4" />
                  <span className="t-body">{siteConfig.social.tiktokHandle}</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              {hasReservationLink ? (
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-[color:var(--fg-soft)] transition-colors duration-300 hover:text-[color:var(--fg)]"
                  >
                    <WhatsApp className="h-4 w-4" />
                    <span className="t-body">{siteConfig.contact.phoneDisplay}</span>
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ) : null}
              <li>
                {siteConfig.social.snapchatUrl ? (
                  <a
                    href={siteConfig.social.snapchatUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-[color:var(--fg-soft)] transition-colors duration-300 hover:text-[color:var(--fg)]"
                  >
                    <Snapchat className="h-4 w-4" />
                    <span className="t-body">{siteConfig.social.snapchatHandle}</span>
                    <ArrowUpRight className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-3 text-[color:var(--fg-soft)]">
                    <Snapchat className="h-4 w-4" />
                    <span className="t-body">{siteConfig.social.snapchatHandle}</span>
                  </span>
                )}
              </li>
            </ul>

            <div className="mt-8">
              <p className="t-label mb-3 text-[color:var(--fg-faint)]">
                {t.common.language.label}
              </p>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[color:var(--hairline)] pt-6 text-[color:var(--fg-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs">
            © {year} {siteConfig.name}. {t.common.footer.rights}
          </p>
          <p className="text-xs">{t.common.footer.credit}</p>
        </div>
      </div>
    </footer>
  );
}
