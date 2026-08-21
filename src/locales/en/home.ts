export const home = {
  loader: {
    line: "Beach club • Restaurant • Lounge",
    place: "Hurghada, Egypt",
  },

  hero: {
    eyebrow: "Hurghada, Egypt",
    title: ["Your beach.", "Your *vibe.*"],
    lead: "Beach days. Sunset moods. Good food. Great nights.",
    scroll: "Start the day",
    marquee: [
      "Private beach",
      "Restaurant",
      "Virgin cocktails",
      "Shisha",
      "Live sports",
      "Sunset",
    ],
  },

  experience: {
    eyebrow: "The place",
    title: ["More than", "a *beach.*"],
    lead: "From lazy beach days to unforgettable nights, Mamma Mia is where Hurghada comes to relax, eat, connect and celebrate.",
    body: "One address, two moods. Feet in the sand and a slow morning by the water, then warm lights, music and a full table once the sun drops behind the Red Sea.",
    pillars: [
      {
        title: "Private beach",
        body: "Our own stretch of sand and sea, set up for long, easy days.",
      },
      {
        title: "Restaurant",
        body: "A proper kitchen and a real table, a few steps from the water.",
      },
      {
        title: "Virgin cocktails",
        body: "Alcohol-free, made to be sipped slowly in the sun.",
      },
      {
        title: "Shisha",
        body: "The quiet ritual that stretches an evening into the night.",
      },
      {
        title: "Two big screens",
        body: "Football and live sport, watched the way it should be.",
      },
      {
        title: "Evenings",
        body: "When the light changes, so does the whole place.",
      },
    ],
  },

  beach: {
    eyebrow: "Chapter one",
    title: ["Day mode:", "*on.*"],
    lead: "Sand, sea and absolutely nowhere to be.",
    body: "Claim a lounger, order something cold and let the Red Sea do the rest. This is the part of the day where the only decision is shade or sun.",
    notes: [
      { label: "Setting", value: "Private beach on the Red Sea" },
      { label: "Mood", value: "Slow, warm, unhurried" },
      { label: "Best for", value: "Long days with friends and family" },
    ],
  },

  food: {
    eyebrow: "Chapter two",
    title: ["Good food.", "Great *mood.*"],
    lead: "Everything tastes better with sand under the table.",
    body: "Beach dining at Mamma Mia is made for sharing: plates in the middle, conversation on top, and the sea a few metres away. Our full menu is served all day long.",
    menuNote: "Our menu is served at the restaurant and on the beach.",
    menuCta: "Ask for the menu",
  },

  drinks: {
    eyebrow: "Chapter three",
    title: ["Refresh", "your *day.*"],
    lead: "Virgin cocktails, built to be drunk in the sun.",
    body: "Fresh, colourful and completely alcohol-free. Ice, fruit and a tall glass — the simplest way to reset in the middle of a Hurghada afternoon.",
    badge: "100% alcohol-free",
    tags: ["Fresh fruit", "Ice cold", "Alcohol-free", "All day long"],
  },

  shisha: {
    eyebrow: "Chapter four",
    title: ["Chill.", "Smoke.", "*Unwind.*"],
    lead: "The moment the day starts to slow down.",
    body: "Low light, low tables, and the kind of conversation that runs long. Shisha at Mamma Mia is the bridge between the beach and the night.",
  },

  sunset: {
    eyebrow: "Golden hour",
    title: "The sun goes *down.*",
    lead: "The sky turns gold, the music comes up, and Mamma Mia changes character.",
  },

  nightlife: {
    eyebrow: "Chapter five",
    title: ["When the sun goes down,", "the vibe goes *up.*"],
    lead: "The beach turns into a lounge.",
    body: "Warm lights across the sand, music through the evening and a room that fills up with people who came to stay a while. Nights at Mamma Mia have their own rhythm.",
    tags: ["Lounge", "Music", "Late tables", "Sea breeze"],
  },

  sports: {
    eyebrow: "Chapter six",
    title: ["Game night,", "but *better.*"],
    lead: "Two big screens, one very good atmosphere.",
    body: "Football and live sport on two large screens, with food on the table, a virgin cocktail in hand and the sea behind you. Come early if it's a big one.",
    features: [
      { title: "Two large screens", body: "Set up so there is no bad seat." },
      { title: "Football & live sport", body: "The big fixtures and the big moments." },
      { title: "Full menu", body: "Kitchen and drinks running through the match." },
    ],
    scheduleNote:
      "Fixtures are announced on our Instagram. Message us to reserve a table for a specific match.",
  },

  events: {
    eyebrow: "What's on",
    title: ["Nights worth", "*planning for.*"],
    lead: "Live events, music nights and match days at Mamma Mia.",
    categories: {
      football: "Football",
      live: "Live event",
      music: "Music",
      special: "Special night",
    },
    reserve: "Reserve for this night",
  },

  gallery: {
    eyebrow: "The look",
    title: ["Mamma Mia,", "*frame by frame.*"],
    lead: "Sand, plates, glasses, lights and everything in between.",
    categories: {
      all: "All",
      beach: "Beach",
      food: "Food",
      drinks: "Drinks",
      lounge: "Lounge",
      nights: "Nights",
      events: "Events",
    },
  },

  social: {
    eyebrow: "Social",
    title: ["Follow", "the *vibe.*"],
    lead: "The freshest Mamma Mia lives on our socials — beach days, sunsets, plates, nights and everything we get up to in Hurghada.",
  },

  location: {
    eyebrow: "Find us",
    title: ["On the Red Sea,", "in *Hurghada.*"],
    lead: "Come for the afternoon, stay for the night.",
    addressLabel: "Address",
    addressPending:
      "Right in the centre of Hurghada, near the marina.",
    mapLabel: "Map of Mamma Mia Restaurant & Lounge in Hurghada",
    hoursLabel: "Opening hours",
    hoursPending: "Ask us for today's hours on Instagram or WhatsApp.",
    contactLabel: "Reservations",
  },

  finalCta: {
    title: "See you at *Mamma Mia.*",
    lead: "Beach days. Sunset moods. Good food. Great nights.",
  },
} as const;

export type Home = typeof home;
