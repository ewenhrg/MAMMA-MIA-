# Venue photography

This folder is empty on purpose.

No real Mamma Mia photography was supplied, and the site never presents an
illustration as a photo of the venue. Every image slot currently renders an
illustrated scene built from the brand's own visual language (flat silhouettes,
sunset gradients, hard-edged sun rays).

## Adding real photos

1. Drop the files here, e.g. `beach-01.jpg`, `food-01.jpg`.
2. Open `src/config/media.ts`.
3. For a section slot, add `src` and `alt` next to the existing `scene`:

```ts
beachWide: {
  scene: "beach",
  src: "/photos/beach-01.jpg",
  alt: {
    en: "Loungers and parasols on the private beach",
    fr: "Transats et parasols sur la plage privée",
  },
},
```

4. For the gallery, do the same on the matching entry in the `gallery` array.

The illustration is only used while `src` is absent, so sections can be
switched over to real photography one at a time.

## Guidance

- Landscape slots look best around **2000 × 1500** or wider.
- The gallery tiles are square-cropped; keep the subject centred.
- Export as JPEG or WebP; Next.js serves AVIF/WebP variants automatically.
- `alt` text is required in both languages whenever `src` is set.
