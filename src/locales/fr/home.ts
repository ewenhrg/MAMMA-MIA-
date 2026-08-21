import type { Home } from "../en/home";
import type { Translated } from "../types";

export const home: Translated<Home> = {
  loader: {
    line: "Beach club • Restaurant • Lounge",
    place: "Hurghada, Égypte",
  },

  hero: {
    eyebrow: "Hurghada, Égypte",
    title: ["Votre plage.", "Votre *ambiance.*"],
    lead: "Des journées à la plage. Des couchers de soleil. De bons plats. De belles soirées.",
    scroll: "Commencer la journée",
    marquee: [
      "Plage privée",
      "Restaurant",
      "Cocktails sans alcool",
      "Chicha",
      "Sport en direct",
      "Coucher de soleil",
    ],
  },

  experience: {
    eyebrow: "Le lieu",
    title: ["Bien plus", "qu'une *plage.*"],
    lead: "Des journées au bord de la plage aux soirées inoubliables, Mamma Mia est l'endroit où Hurghada vient se détendre, manger, partager et profiter.",
    body: "Une seule adresse, deux atmosphères. Les pieds dans le sable et une matinée qui prend son temps, puis les lumières chaudes, la musique et une grande tablée dès que le soleil passe derrière la mer Rouge.",
    pillars: [
      {
        title: "Plage privée",
        body: "Notre coin de sable et de mer, pensé pour les longues journées.",
      },
      {
        title: "Restaurant",
        body: "Une vraie cuisine et une vraie table, à quelques pas de l'eau.",
      },
      {
        title: "Cocktails sans alcool",
        body: "Des virgin cocktails à savourer tranquillement au soleil.",
      },
      {
        title: "Chicha",
        body: "Le rituel tranquille qui étire la soirée jusque tard.",
      },
      {
        title: "Deux grands écrans",
        body: "Le football et le sport en direct, comme il se doit.",
      },
      {
        title: "Soirées",
        body: "Quand la lumière change, tout l'endroit change avec elle.",
      },
    ],
  },

  beach: {
    eyebrow: "Chapitre un",
    title: ["Mode jour :", "*activé.*"],
    lead: "Le sable, la mer, et rien d'autre à faire.",
    body: "On choisit son transat, on commande quelque chose de frais et on laisse la mer Rouge s'occuper du reste. À ce moment de la journée, la seule décision à prendre, c'est ombre ou soleil.",
    notes: [
      { label: "Cadre", value: "Plage privée sur la mer Rouge" },
      { label: "Ambiance", value: "Douce, chaude, sans précipitation" },
      { label: "Idéal pour", value: "Les longues journées entre amis et en famille" },
    ],
  },

  food: {
    eyebrow: "Chapitre deux",
    title: ["De bons plats.", "De belles *humeurs.*"],
    lead: "Tout a meilleur goût avec du sable sous la table.",
    body: "Manger à Mamma Mia, c'est fait pour être partagé : les plats au milieu, la conversation par-dessus, et la mer à quelques mètres. Notre carte est servie toute la journée.",
    menuNote: "Notre carte est servie au restaurant comme sur la plage.",
    menuCta: "Demander la carte",
  },

  drinks: {
    eyebrow: "Chapitre trois",
    title: ["Rafraîchissez", "votre *journée.*"],
    lead: "Des virgin cocktails, pensés pour être bus au soleil.",
    body: "Frais, colorés et totalement sans alcool. De la glace, des fruits et un grand verre : la façon la plus simple de repartir à zéro au milieu d'un après-midi à Hurghada.",
    badge: "100 % sans alcool",
    tags: ["Fruits frais", "Bien glacé", "Sans alcool", "Toute la journée"],
  },

  shisha: {
    eyebrow: "Chapitre quatre",
    title: ["Se poser.", "Fumer.", "*Souffler.*"],
    lead: "Le moment où la journée commence à ralentir.",
    body: "Lumière tamisée, tables basses, et ce genre de conversation qui s'éternise. La chicha, à Mamma Mia, c'est le passage entre la plage et la nuit.",
  },

  sunset: {
    eyebrow: "L'heure dorée",
    title: "Le soleil se *couche.*",
    lead: "Le ciel devient doré, la musique monte, et Mamma Mia change de caractère.",
  },

  nightlife: {
    eyebrow: "Chapitre cinq",
    title: ["Quand le soleil se couche,", "l'ambiance *monte.*"],
    lead: "La plage se transforme en lounge.",
    body: "Des lumières chaudes sur le sable, de la musique toute la soirée et une salle qui se remplit de gens venus pour rester. Les nuits de Mamma Mia ont leur propre rythme.",
    tags: ["Lounge", "Musique", "Tables tardives", "Air marin"],
  },

  sports: {
    eyebrow: "Chapitre six",
    title: ["Soir de match,", "en *mieux.*"],
    lead: "Deux grands écrans, une très bonne ambiance.",
    body: "Le football et le sport en direct sur deux grands écrans, avec de quoi manger sur la table, un virgin cocktail à la main et la mer derrière vous. Venez tôt pour les grandes affiches.",
    features: [
      { title: "Deux grands écrans", body: "Installés pour qu'aucune place ne soit mauvaise." },
      { title: "Football & sport en direct", body: "Les grandes affiches et les grands moments." },
      { title: "Carte complète", body: "Cuisine et boissons assurées pendant tout le match." },
    ],
    scheduleNote:
      "Les matchs sont annoncés sur notre Instagram. Écrivez-nous pour réserver une table pour une rencontre précise.",
  },

  events: {
    eyebrow: "À l'affiche",
    title: ["Des soirées qui", "*méritent le détour.*"],
    lead: "Événements live, soirées musicales et soirs de match à Mamma Mia.",
    categories: {
      football: "Football",
      live: "Événement live",
      music: "Musique",
      special: "Soirée spéciale",
    },
    reserve: "Réserver pour cette soirée",
  },

  gallery: {
    eyebrow: "L'atmosphère",
    title: ["Mamma Mia,", "*image par image.*"],
    lead: "Le sable, les assiettes, les verres, les lumières et tout ce qu'il y a entre.",
    categories: {
      all: "Tout",
      beach: "Plage",
      food: "Cuisine",
      drinks: "Boissons",
      lounge: "Lounge",
      nights: "Soirées",
      events: "Événements",
    },
  },

  social: {
    eyebrow: "Réseaux",
    title: ["Suivez", "*l'ambiance.*"],
    lead: "Le meilleur de Mamma Mia se passe sur nos réseaux : journées à la plage, couchers de soleil, assiettes, soirées et tout ce qu'on vit à Hurghada.",
  },

  location: {
    eyebrow: "Nous trouver",
    title: ["Sur la mer Rouge,", "à *Hurghada.*"],
    lead: "Venez pour l'après-midi, restez pour la soirée.",
    addressLabel: "Adresse",
    addressPending:
      "En plein centre-ville de Hurghada, proche de la marina.",
    mapLabel: "Carte de Mamma Mia Restaurant & Lounge à Hurghada",
    hoursLabel: "Horaires",
    hoursPending: "Demandez-nous les horaires du jour sur Instagram ou WhatsApp.",
    contactLabel: "Réservations",
  },

  finalCta: {
    title: "À bientôt chez *Mamma Mia.*",
    lead: "Des journées à la plage. Des couchers de soleil. De bons plats. De belles soirées.",
  },
};
