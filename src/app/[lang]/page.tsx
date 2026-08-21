import { Beach } from "@/components/sections/Beach";
import { Drinks } from "@/components/sections/Drinks";
import { Events } from "@/components/sections/Events";
import { Experience } from "@/components/sections/Experience";
import { FinalCta } from "@/components/sections/FinalCta";
import { Food } from "@/components/sections/Food";
import { Footer } from "@/components/sections/Footer";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Location } from "@/components/sections/Location";
import { Nightlife } from "@/components/sections/Nightlife";
import { Shisha } from "@/components/sections/Shisha";
import { Social } from "@/components/sections/Social";
import { Sports } from "@/components/sections/Sports";
import { SunsetMoment } from "@/components/sections/SunsetMoment";
import { siteConfig } from "@/config/site";
import { getDictionary, isLocale } from "@/lib/i18n";

/** Structured data. Only facts confirmed by the venue are emitted. */
function StructuredData({ lang }: { lang: "en" | "fr" }) {
  const { meta } = getDictionary(lang);

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: siteConfig.name,
    description: meta.description,
    url: `${siteConfig.url}/${lang}`,
    image: `${siteConfig.url}${siteConfig.logo.src}`,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressCountry: "EG",
    },
    sameAs: [siteConfig.social.instagramUrl, siteConfig.social.snapchatUrl].filter(Boolean),
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Private beach", value: true },
      { "@type": "LocationFeatureSpecification", name: "Shisha", value: true },
      { "@type": "LocationFeatureSpecification", name: "Live sport on large screens", value: true },
    ],
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(siteConfig.contact.googleMapsUrl ? { hasMap: siteConfig.contact.googleMapsUrl } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "en";

  return (
    <>
      <StructuredData lang={locale} />

      {/* Day */}
      <Hero />
      <Experience />
      <Beach />
      <Food />
      <Drinks />

      {/* Golden hour */}
      <Shisha />
      <SunsetMoment />

      {/* Night */}
      <Nightlife />
      <Sports />
      <Events />
      <Gallery />
      <Social />
      <Location />
      <FinalCta />
      <Footer />
    </>
  );
}
