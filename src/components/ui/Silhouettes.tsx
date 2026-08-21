/**
 * Flat silhouettes lifted from the vocabulary of the official badge — palm,
 * parasol, deckchair, birds and the hard-edged sun rays. Shared by the scene
 * artwork and the hero so the whole site speaks one visual language.
 */

export const INK = "#0A0A0A";

export const Rays = ({
  x,
  y,
  flip = false,
  opacity = 0.85,
}: {
  x: number;
  y: number;
  flip?: boolean;
  opacity?: number;
}) => (
  <g
    fill="#FFFFFF"
    opacity={opacity}
    transform={`translate(${x} ${y})${flip ? " scale(-1 1)" : ""}`}
  >
    <path d="M0 0h250l-40 22H0z" />
    <path d="M0 52h205l-40 22H0z" />
    <path d="M0 104h160l-40 22H0z" />
  </g>
);

export const Palm = ({
  x,
  y,
  scale = 1,
  flip = false,
  fill = INK,
}: {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
  fill?: string;
}) => (
  <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} fill={fill}>
    <path d="M0 0c-6-96-14-192-46-286 14-4 28-6 42-6 26 96 34 194 38 292z" />
    <path d="M-4-292c-46-52-104-80-176-84 34-30 78-38 122-22 34 12 58 34 74 62z" />
    <path d="M-4-292c-62-16-124-4-182 40 8-44 40-76 84-88 40-10 76 4 106 34z" />
    <path d="M4-292c48-50 108-74 180-72-32-32-76-42-121-28-36 11-61 46-77 88z" />
    <path d="M4-292c64-10 124 8 178 56-4-46-34-80-78-94-42-13-79 4-108 32z" />
    <path d="M0-296c-16-40-40-72-74-96 40-6 78 10 104 44 14 18 20 36 22 54z" />
  </g>
);

export const Parasol = ({
  x,
  y,
  scale = 1,
  fill = INK,
}: {
  x: number;
  y: number;
  scale?: number;
  fill?: string;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fill={fill}>
    <path d="M-92 0c0-52 41-94 92-94s92 42 92 94c-24-14-48-21-70-15-9-10-14-15-22-15s-13 5-22 15c-22-6-46 1-70 15z" />
    <rect x="-4" y="-4" width="8" height="150" rx="4" />
  </g>
);

/** Side-on sun lounger: flat seat, raised backrest, two splayed legs. */
export const Lounger = ({
  x,
  y,
  scale = 1,
  flip = false,
  fill = INK,
}: {
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
  fill?: string;
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}
    fill={fill}
  >
    <rect x="-62" y="0" width="130" height="13" rx="6" />
    <path d="M-62 4-72-60a7 7 0 0 1 13-3l16 61z" />
    <path d="M-58-52 8-14l-4 11-66-38z" opacity="0.9" />
    <path d="M50 13 62 46h-13L38 13z" />
    <path d="M-54 13-66 46h13l11-33z" />
  </g>
);

export const Bucket = ({
  x,
  y,
  scale = 1,
  fill = INK,
}: {
  x: number;
  y: number;
  scale?: number;
  fill?: string;
}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fill={fill}>
    <path d="M-26-40h52l-8 46a6 6 0 0 1-6 5h-24a6 6 0 0 1-6-5z" />
    <path d="M-26-40c0-14 12-22 26-22s26 8 26 22h-10c0-8-7-13-16-13s-16 5-16 13z" />
    <path d="M40-70c8-3 15 1 17 8l10 34-14 4-10-34c-1-4-3-5-6-4z" />
    <path d="M44-78h20l-4 16h-12z" />
  </g>
);

export const Birds = ({
  x,
  y,
  scale = 1,
  stroke = INK,
}: {
  x: number;
  y: number;
  scale?: number;
  stroke?: string;
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${scale})`}
    fill="none"
    stroke={stroke}
    strokeWidth="7"
    strokeLinecap="round"
  >
    <path d="M0 0c10-13 20-13 29 0 9-13 19-13 29 0" />
    <path d="M74 34c9-11 17-11 25 0 8-11 16-11 25 0" />
    <path d="M22 62c8-10 15-10 22 0 7-10 14-10 22 0" />
  </g>
);

export const StringLights = ({ y }: { y: number }) => (
  <g>
    {[0, 1, 2].map((row) => {
      const offset = y + row * 62;
      return (
        <g key={row}>
          <path
            d={`M-20 ${offset} Q 300 ${offset + 78} 620 ${offset + 12} T 1220 ${offset + 56}`}
            fill="none"
            stroke="#FFD27D"
            strokeOpacity="0.35"
            strokeWidth="2"
          />
          {Array.from({ length: 14 }).map((_, i) => {
            const t = i / 13;
            const bx = -20 + t * 1240;
            const by = offset + Math.sin(t * Math.PI * 2.1) * 40 + 34;
            return (
              <g key={i}>
                <circle cx={bx} cy={by} r="16" fill="#FFC24A" opacity="0.12" />
                <circle cx={bx} cy={by} r="4.5" fill="#FFE0A0" />
              </g>
            );
          })}
        </g>
      );
    })}
  </g>
);
