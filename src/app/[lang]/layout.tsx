import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { CustomCursor } from "@/components/chrome/CustomCursor";
import { JourneyRail } from "@/components/chrome/JourneyRail";
import { Navbar } from "@/components/chrome/Navbar";
import { MobileActionBar } from "@/components/chrome/MobileActionBar";
import { PageLoader } from "@/components/chrome/PageLoader";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";
import { Sky } from "@/components/chrome/Sky";
import { JourneyProvider } from "@/components/providers/JourneyProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { siteConfig } from "@/config/site";
import {
  getDictionary,
  htmlLang,
  isLocale,
  locales,
  ogLocale,
  type Locale,
} from "@/lib/i18n";
import "../globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#eaf4f8" },
    { media: "(prefers-color-scheme: dark)", color: "#060b12" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { meta } = getDictionary(lang);
  const base = siteConfig.url;
  const path = `/${lang}`;

  return {
    metadataBase: new URL(base),
    title: { default: meta.title, template: meta.titleTemplate },
    description: meta.description,
    keywords: [...meta.keywords],
    applicationName: siteConfig.name,
    alternates: {
      canonical: path,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title: meta.ogTitle,
      description: meta.ogDescription,
      url: path,
      locale: ogLocale[lang],
      alternateLocale: locales.filter((item) => item !== lang).map((item) => ogLocale[item]),
      images: [
        {
          url: siteConfig.logo.src,
          width: siteConfig.logo.width,
          height: siteConfig.logo.height,
          alt: meta.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [siteConfig.logo.src],
    },
    icons: {
      icon: [{ url: "/brand/favicon.png", type: "image/png" }],
      apple: [{ url: "/brand/apple-icon.png" }],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const locale = lang as Locale;
  const dictionary = getDictionary(locale);

  return (
    <html
      lang={htmlLang[locale]}
      className={`${archivo.variable} ${inter.variable} ${instrument.variable}`}
      data-mood="day"
      suppressHydrationWarning
    >
      <body>
        <LocaleProvider lang={locale}>
          <JourneyProvider>
            <a href="#main" className="skip-link">
              {dictionary.common.a11y.skipToContent}
            </a>

            <Sky />
            <SmoothScroll />
            <PageLoader />
            <CustomCursor />

            <ScrollProgress />
            <Navbar />
            <JourneyRail />

            <main id="main">{children}</main>

            <MobileActionBar />
          </JourneyProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
