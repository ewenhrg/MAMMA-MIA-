/**
 * Single source of truth for everything Mamma Mia.
 *
 * Values that have not been confirmed by the venue are intentionally left empty
 * and are wired to environment variables. Nothing here is invented: an empty
 * string means "not provided yet", and the UI hides or disables the matching
 * element until it is filled in.
 */

const env = (value: string | undefined) => (value ?? "").trim();

export const siteConfig = {
  name: "Mamma Mia Restaurant & Lounge",
  shortName: "Mamma Mia",
  tagline: "Beach Club • Restaurant • Lounge",
  city: "Hurghada",
  country: "Egypt",
  location: "Hurghada, Egypt",

  /** Set NEXT_PUBLIC_SITE_URL in production for canonical + Open Graph URLs. */
  url: env(process.env.NEXT_PUBLIC_SITE_URL) || "https://mammamiahurghada.com",

  social: {
    instagramHandle: "@mammamiahurghada",
    instagramUrl: "https://www.instagram.com/mammamiahurghada/",
    snapchatHandle: "Mammamia_hrg",
    /** No official Snapchat URL was provided — configurable. */
    snapchatUrl: env(process.env.NEXT_PUBLIC_SNAPCHAT_URL),
  },

  contact: {
    whatsappUrl:
      env(process.env.NEXT_PUBLIC_WHATSAPP_URL) || "https://wa.me/201208185564",
    googleMapsUrl: env(process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL),
    email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    phone: env(process.env.NEXT_PUBLIC_CONTACT_PHONE) || "+201208185564",
    phoneDisplay: "+20 120 818 5564",
  },

  logo: {
    src: "/brand/logo.png",
    width: 676,
    height: 676,
  },
} as const;

/**
 * Book CTAs open WhatsApp with a short reservation message.
 * The WhatsApp icon opens the same chat without a preset text.
 */
export const whatsappHref = siteConfig.contact.whatsappUrl;
export const hasReservationLink = Boolean(whatsappHref);

export const reservationHref = (lang: "en" | "fr" = "en") => {
  if (!whatsappHref) return "#contact";
  const text =
    lang === "fr"
      ? "Bonjour Mamma Mia, je voudrais réserver une table."
      : "Hi Mamma Mia, I would like to book a table.";
  return `${whatsappHref}?text=${encodeURIComponent(text)}`;
};

export type NavKey =
  | "home"
  | "experience"
  | "food"
  | "drinks"
  | "events"
  | "gallery"
  | "contact";

export const navigation: { key: NavKey; hash: string }[] = [
  { key: "home", hash: "#top" },
  { key: "experience", hash: "#experience" },
  { key: "food", hash: "#food" },
  { key: "drinks", hash: "#drinks" },
  { key: "events", hash: "#events" },
  { key: "gallery", hash: "#gallery" },
  { key: "contact", hash: "#contact" },
];
