import type { SceneVariant } from "@/components/ui/Scene";

/**
 * Photography slots.
 *
 * Real venue photos live in `public/photos/`. If `src` is set, the photo is
 * used; otherwise the illustrated scene of the same name stands in.
 */
export type MediaSlot = {
  scene: SceneVariant;
  /** e.g. "/photos/beach-01.png". Empty means "use the illustration". */
  src?: string;
  /** Required whenever `src` is set. */
  alt?: { en: string; fr: string };
};

export const media = {
  hero: { scene: "beach" },
  experience: { scene: "beach" },
  beachWide: {
    scene: "beach",
    src: "/photos/beach-01.png",
    alt: {
      en: "Loungers, thatched umbrellas and palm trees on the private beach",
      fr: "Transats, parasols en paille et palmiers sur la plage privée",
    },
  },
  beachTall: {
    scene: "sunset",
    src: "/photos/beach-02.png",
    alt: {
      en: "White sunbeds facing the sea under thatched umbrellas",
      fr: "Transats blancs face à la mer sous les parasols en paille",
    },
  },
  food: {
    scene: "dining",
    src: "/photos/lounge-01.png",
    alt: {
      en: "Indoor lounge seating at Mamma Mia",
      fr: "Salon intérieur chez Mamma Mia",
    },
  },
  foodDetail: {
    scene: "dining",
    src: "/photos/food-01.png",
    alt: {
      en: "Dessert served at Mamma Mia",
      fr: "Dessert servi chez Mamma Mia",
    },
  },
  drinks: {
    scene: "drinks",
    src: "/photos/drinks-guest-01.jpg",
    alt: {
      en: "Guest enjoying a cocktail on the night terrace",
      fr: "Invitée savourant un cocktail sur la terrasse le soir",
    },
  },
  shisha: {
    scene: "shisha",
    src: "/photos/shisha-01.png",
    alt: {
      en: "Shisha on a reserved table at Mamma Mia",
      fr: "Chicha sur une table réservée chez Mamma Mia",
    },
  },
  sunset: { scene: "sunset" },
  nightlife: {
    scene: "night",
    src: "/photos/night-01.png",
    alt: {
      en: "A night at Mamma Mia, with the crowd and the lights on",
      fr: "Une soirée chez Mamma Mia, foule et lumières",
    },
  },
  nightlifeDetail: {
    scene: "night",
    src: "/photos/night-02.png",
    alt: {
      en: "Dancing at Mamma Mia after dark",
      fr: "Ambiance dancefloor chez Mamma Mia",
    },
  },
  sports: {
    scene: "sports",
    src: "/photos/sports-02.jpg",
    alt: {
      en: "Live football on a large screen at Mamma Mia",
      fr: "Football en direct sur grand écran chez Mamma Mia",
    },
  },
  location: { scene: "night" },
} satisfies Record<string, MediaSlot>;

export type MediaKey = keyof typeof media;

export type GalleryCategory =
  | "beach"
  | "food"
  | "drinks"
  | "lounge"
  | "nights"
  | "events";

export type GalleryItem = {
  id: string;
  category: GalleryCategory;
  scene: SceneVariant;
  /** Layout weight: feature tiles span two columns. */
  feature?: boolean;
  src?: string;
  alt?: { en: string; fr: string };
};

/**
 * Gallery tiles. Only categories with items appear in the filter bar.
 */
export const gallery: GalleryItem[] = [
  {
    id: "g1",
    category: "beach",
    scene: "beach",
    feature: true,
    src: "/photos/beach-01.png",
    alt: {
      en: "Private beach with loungers, umbrellas and palm trees",
      fr: "Plage privée avec transats, parasols et palmiers",
    },
  },
  {
    id: "g2",
    category: "drinks",
    scene: "drinks",
    src: "/photos/drinks-02.jpg",
    alt: {
      en: "Layered cocktail with ice and fruit garnish",
      fr: "Cocktail en couches, glaçons et fruits",
    },
  },
  {
    id: "g2b",
    category: "drinks",
    scene: "drinks",
    src: "/photos/drinks-03.jpg",
    alt: {
      en: "Fresh cocktail with lime and grapes",
      fr: "Cocktail frais citron vert et raisins",
    },
  },
  {
    id: "g2c",
    category: "drinks",
    scene: "drinks",
    src: "/photos/drinks-guest-01.jpg",
    alt: {
      en: "Guest enjoying a berry cocktail at night",
      fr: "Invitée savourant un cocktail aux fruits rouges le soir",
    },
  },
  {
    id: "g2d",
    category: "drinks",
    scene: "drinks",
    src: "/photos/drinks-01.png",
    alt: {
      en: "A cocktail by the beach at sunset",
      fr: "Un cocktail au bord de la plage au coucher du soleil",
    },
  },
  {
    id: "g3",
    category: "food",
    scene: "dining",
    src: "/photos/food-01.png",
    alt: {
      en: "Dessert served at Mamma Mia",
      fr: "Dessert servi chez Mamma Mia",
    },
  },
  {
    id: "g4",
    category: "lounge",
    scene: "shisha",
    feature: true,
    src: "/photos/lounge-01.png",
    alt: {
      en: "Indoor lounge at Mamma Mia",
      fr: "Lounge intérieur chez Mamma Mia",
    },
  },
  {
    id: "g5",
    category: "lounge",
    scene: "night",
    src: "/photos/lounge-02.png",
    alt: {
      en: "Outdoor lounge seating on a sunny day",
      fr: "Salon extérieur en pleine journée",
    },
  },
  {
    id: "g6",
    category: "beach",
    scene: "sunset",
    src: "/photos/beach-02.png",
    alt: {
      en: "Sunbeds facing the Red Sea",
      fr: "Transats face à la mer Rouge",
    },
  },
  {
    id: "g7",
    category: "beach",
    scene: "sports",
    src: "/photos/beach-03.png",
    alt: {
      en: "Hanging daybeds on the beach",
      fr: "Lits suspendus sur la plage",
    },
  },
  {
    id: "g8",
    category: "nights",
    scene: "night",
    feature: true,
    src: "/photos/night-01.png",
    alt: {
      en: "A night at Mamma Mia, with the crowd and the lights on",
      fr: "Une soirée chez Mamma Mia, foule et lumières",
    },
  },
  {
    id: "g9",
    category: "nights",
    scene: "night",
    src: "/photos/night-02.png",
    alt: {
      en: "Dancing at Mamma Mia after dark",
      fr: "Ambiance dancefloor chez Mamma Mia",
    },
  },
  {
    id: "g10",
    category: "lounge",
    scene: "shisha",
    src: "/photos/shisha-01.png",
    alt: {
      en: "Shisha on a reserved table at Mamma Mia",
      fr: "Chicha sur une table réservée chez Mamma Mia",
    },
  },
  {
    id: "g10b",
    category: "lounge",
    scene: "shisha",
    src: "/photos/shisha-guest-01.jpg",
    alt: {
      en: "Guest with shisha on the night terrace",
      fr: "Invitée et chicha sur la terrasse le soir",
    },
  },
  {
    id: "g10c",
    category: "lounge",
    scene: "shisha",
    src: "/photos/shisha-guest-02.jpg",
    alt: {
      en: "Shisha evening under the pink lights",
      fr: "Soirée chicha sous les lumières roses",
    },
  },
  {
    id: "g11",
    category: "events",
    scene: "sports",
    src: "/photos/sports-02.jpg",
    alt: {
      en: "Live football on a large screen at Mamma Mia",
      fr: "Football en direct sur grand écran chez Mamma Mia",
    },
  },
  {
    id: "g11b",
    category: "events",
    scene: "sports",
    src: "/photos/sports-01.png",
    alt: {
      en: "Football on a large screen at Mamma Mia",
      fr: "Match de football sur grand écran chez Mamma Mia",
    },
  },
  {
    id: "g12",
    category: "nights",
    scene: "night",
    src: "/photos/night-03.jpg",
    alt: {
      en: "A couple enjoying a night out at Mamma Mia",
      fr: "Un couple qui profite d'une soirée chez Mamma Mia",
    },
  },
];

export const galleryCategories = (items: GalleryItem[]) =>
  Array.from(new Set(items.map((item) => item.category)));
