"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import {
  Birds,
  Bucket,
  INK,
  Lounger,
  Palm,
  Parasol,
  Rays,
  StringLights,
} from "./Silhouettes";

export type SceneVariant =
  | "beach"
  | "sunset"
  | "dining"
  | "drinks"
  | "shisha"
  | "night"
  | "sports"
  | "abstract";

/**
 * Illustrated artwork used wherever real venue photography has not been supplied.
 *
 * The visual language is taken straight from the official badge — flat black
 * silhouettes, hard-edged sun rays and red-to-gold gradients — so the site has a
 * coherent look before a single photo exists. Every scene is a plain inline SVG:
 * no images to download, and it scales perfectly on any display.
 */
export function Scene({
  variant,
  className,
}: {
  variant: SceneVariant;
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const id = (name: string) => `${uid}-${name}`;

  return (
    <svg
      viewBox="0 0 1200 900"
      preserveAspectRatio={anchor[variant]}
      className={cn("h-full w-full", className)}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>{gradients(variant, id)}</defs>
      <rect width="1200" height="900" fill={`url(#${id("sky")})`} />
      {content(variant, id)}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Where each composition should stay pinned when the frame is a different shape
 * than the 4:3 artboard. Bottom-heavy beach scenes keep their horizon; the sports
 * lounge is centred so both screens and the crowd survive a portrait crop.
 */
const anchor: Record<SceneVariant, string> = {
  beach: "xMidYMax slice",
  sunset: "xMidYMax slice",
  dining: "xMidYMax slice",
  drinks: "xMidYMax slice",
  shisha: "xMidYMax slice",
  night: "xMidYMax slice",
  sports: "xMidYMid slice",
  abstract: "xMidYMid slice",
};

const gradients = (variant: SceneVariant, id: (name: string) => string) => {
  const skies: Record<SceneVariant, [string, string, string, string]> = {
    beach: ["#7FD3F0", "#B7E8F7", "#EDF2E4", "#E0C79C"],
    sunset: ["#3C2450", "#B54258", "#F2712C", "#F9B233"],
    dining: ["#2A1710", "#7A3517", "#D96A24", "#F6A93B"],
    drinks: ["#12A5DE", "#66D3E8", "#F7C55A", "#F58220"],
    shisha: ["#0B0F18", "#2A1B2C", "#6E3324", "#B45B22"],
    night: ["#02050B", "#071121", "#0E2438", "#173040"],
    sports: ["#03070E", "#0A1626", "#12283C", "#1B3A50"],
    abstract: ["#EF4B22", "#F58220", "#F9B233", "#FFD27D"],
  };

  const [a, b, c, d] = skies[variant];

  return (
    <>
      <linearGradient id={id("sky")} x1="0" y1="0" x2="0.15" y2="1">
        <stop offset="0%" stopColor={a} />
        <stop offset="38%" stopColor={b} />
        <stop offset="70%" stopColor={c} />
        <stop offset="100%" stopColor={d} />
      </linearGradient>

      <radialGradient id={id("glow")} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF3CE" stopOpacity="0.95" />
        <stop offset="55%" stopColor="#FFC96B" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#FFB347" stopOpacity="0" />
      </radialGradient>

      <linearGradient id={id("sea")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1B9BD8" />
        <stop offset="100%" stopColor="#0A5C87" />
      </linearGradient>

      <linearGradient id={id("seaNight")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0B2033" />
        <stop offset="100%" stopColor="#040A12" />
      </linearGradient>

      <linearGradient id={id("sand")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E9CFA3" />
        <stop offset="100%" stopColor="#CFA96F" />
      </linearGradient>

      <linearGradient id={id("screen")} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4BD6A8" />
        <stop offset="100%" stopColor="#1D8F6A" />
      </linearGradient>
    </>
  );
};

/* -------------------------------------------------------------------------- */

const content = (variant: SceneVariant, id: (name: string) => string) => {
  switch (variant) {
    case "beach":
      return (
        <>
          <circle cx="820" cy="188" r="170" fill={`url(#${id("glow")})`} />
          <circle cx="820" cy="188" r="72" fill="#FFF6D6" opacity="0.95" />
          <Rays x={600} y={158} flip opacity={0.7} />
          <Birds x={350} y={188} scale={0.6} />
          <rect y="520" width="1200" height="180" fill={`url(#${id("sea")})`} />
          <g fill="#FFFFFF" opacity="0.38">
            <rect x="180" y="566" width="150" height="6" rx="3" />
            <rect x="430" y="604" width="210" height="6" rx="3" />
            <rect x="760" y="580" width="180" height="6" rx="3" />
            <rect x="300" y="648" width="260" height="6" rx="3" />
            <rect x="820" y="656" width="170" height="6" rx="3" />
          </g>
          <path d="M0 700c180-34 320 18 520 6s340-52 680-26v220H0z" fill={`url(#${id("sand")})`} />
          {/* Kept within the central band so portrait crops still show the set-up. */}
          <Palm x={872} y={756} scale={0.48} />
          <Parasol x={392} y={676} scale={0.62} />
          <Lounger x={506} y={786} scale={0.6} />
          <Lounger x={706} y={796} scale={0.55} flip />
          <Bucket x={614} y={800} scale={0.5} />
        </>
      );

    case "sunset":
      return (
        <>
          <circle cx="620" cy="560" r="330" fill={`url(#${id("glow")})`} />
          <circle cx="620" cy="560" r="188" fill="#FFCF6B" />
          <Rays x={760} y={470} opacity={0.7} />
          <Rays x={480} y={498} flip opacity={0.7} />
          <Birds x={352} y={240} scale={0.62} />
          <rect y="600" width="1200" height="300" fill={`url(#${id("sea")})`} opacity="0.75" />
          <rect y="600" width="1200" height="300" fill="#3D1830" opacity="0.55" />
          <g fill="#FFD27D" opacity="0.55">
            {Array.from({ length: 9 }).map((_, i) => (
              <rect
                key={i}
                x={620 - (30 + i * 12)}
                y={624 + i * 30}
                width={60 + i * 24}
                height="9"
                rx="4"
              />
            ))}
          </g>
          <Palm x={192} y={900} scale={0.6} />
          <Palm x={1032} y={886} scale={0.5} flip />
        </>
      );

    case "dining":
      return (
        <>
          <circle cx="600" cy="240" r="300" fill={`url(#${id("glow")})`} opacity="0.7" />
          {[330, 600, 870].map((x, i) => (
            <g key={x}>
              <rect x={x - 2} y="0" width="4" height={150 + i * 26} fill={INK} />
              <path
                d={`M${x - 54} ${150 + i * 26} h108 l-24 -54 h-60 z`}
                fill={INK}
                transform={`rotate(180 ${x} ${150 + i * 26 - 27})`}
              />
              <path
                d={`M${x - 96} ${420 + i * 20} L${x - 54} ${178 + i * 26} h108 L${x + 96} ${420 + i * 20} z`}
                fill="#FFD9A0"
                opacity="0.18"
              />
              <circle cx={x} cy={186 + i * 26} r="26" fill="#FFE3B0" opacity="0.5" />
            </g>
          ))}
          <rect y="620" width="1200" height="30" fill={INK} />
          <rect y="650" width="1200" height="250" fill={INK} opacity="0.86" />
          <g fill={INK}>
            <ellipse cx="290" cy="606" rx="96" ry="22" />
            <ellipse cx="600" cy="596" rx="120" ry="26" />
            <ellipse cx="900" cy="608" rx="86" ry="20" />
            <path d="M162 552c0-26 12-44 12-44v82h-12z" />
            <path d="M1030 508c18 0 30 22 26 48-3 20-12 28-12 28v34h-12v-34s-9-8-12-28c-4-26 8-48 10-48z" />
            <rect x="742" y="500" width="34" height="52" rx="6" />
            <rect x="752" y="470" width="14" height="34" rx="6" />
            <rect x="430" y="512" width="30" height="46" rx="4" />
            <path d="M430 512c0-16 6-30 15-30s15 14 15 30z" />
          </g>
          <g fill="#FFFFFF" opacity="0.16">
            <ellipse cx="600" cy="590" rx="120" ry="26" />
            <ellipse cx="290" cy="600" rx="96" ry="22" />
          </g>
        </>
      );

    case "drinks":
      return (
        <>
          <circle cx="600" cy="330" r="360" fill={`url(#${id("glow")})`} opacity="0.55" />
          <Rays x={840} y={160} />
          <g fill={INK}>
            <path d="M300 300h150l-16 300h-118z" />
            <rect x="358" y="180" width="10" height="130" rx="5" transform="rotate(9 363 245)" />
            <path d="M540 290h170l-22 210c-2 22-20 38-42 38h-42c-22 0-40-16-42-38z" />
            <rect x="616" y="538" width="18" height="66" rx="6" />
            <rect x="566" y="600" width="118" height="18" rx="9" />
            <path d="M800 330h140l-14 270h-112z" />
            <rect x="852" y="200" width="10" height="140" rx="5" transform="rotate(-7 857 270)" />
          </g>
          <g>
            <circle cx="470" cy="300" r="58" fill="#F9B233" />
            <path d="M470 242v116M412 300h116" stroke={INK} strokeWidth="7" />
            <circle cx="470" cy="300" r="58" fill="none" stroke={INK} strokeWidth="10" />
            <circle cx="770" cy="336" r="44" fill="#8CD64B" />
            <path d="M770 292v88M726 336h88" stroke={INK} strokeWidth="6" />
            <circle cx="770" cy="336" r="44" fill="none" stroke={INK} strokeWidth="9" />
          </g>
          <g fill="#FFFFFF" opacity="0.4">
            <rect x="324" y="336" width="46" height="46" rx="8" transform="rotate(-12 347 359)" />
            <rect x="384" y="392" width="42" height="42" rx="8" transform="rotate(14 405 413)" />
            <rect x="576" y="344" width="52" height="52" rx="9" transform="rotate(10 602 370)" />
            <rect x="828" y="372" width="44" height="44" rx="8" transform="rotate(-8 850 394)" />
          </g>
          <rect y="700" width="1200" height="200" fill={INK} opacity="0.9" />
          <rect y="690" width="1200" height="14" fill={INK} />
        </>
      );

    case "shisha":
      return (
        <>
          <circle cx="600" cy="420" r="330" fill={`url(#${id("glow")})`} opacity="0.4" />
          <g fill={INK}>
            <path d="M540 700c0-70 24-96 24-140 0-30-10-40-10-70 0-24 20-40 46-40s46 16 46 40c0 30-10 40-10 70 0 44 24 70 24 140z" />
            <rect x="576" y="290" width="48" height="30" rx="8" />
            <rect x="584" y="256" width="32" height="42" rx="10" />
            <path d="M624 400c70 6 118 40 118 96 0 44-34 74-78 74" stroke={INK} strokeWidth="16" fill="none" strokeLinecap="round" />
            <rect x="644" y="556" width="30" height="72" rx="14" transform="rotate(14 659 592)" />
            <rect x="380" y="700" width="440" height="20" rx="10" />
            <rect x="404" y="720" width="18" height="90" rx="8" />
            <rect x="778" y="720" width="18" height="90" rx="8" />
            <ellipse cx="290" cy="762" rx="120" ry="34" />
            <ellipse cx="930" cy="774" rx="132" ry="38" />
          </g>
          <g opacity="0.45">
            <circle cx="600" cy="268" r="46" fill="#FF8A3D" opacity="0.5" />
            <circle cx="600" cy="268" r="20" fill="#FFD27D" />
          </g>
          <g fill="#FFC98A" opacity="0.14">
            <circle cx="170" cy="300" r="72" />
            <circle cx="1040" cy="238" r="92" />
          </g>
          <rect y="820" width="1200" height="80" fill={INK} opacity="0.85" />
        </>
      );

    case "night":
      return (
        <>
          <g fill="#FFFFFF">
            {[
              [140, 120, 2.2],
              [280, 78, 1.6],
              [420, 168, 2],
              [560, 96, 1.5],
              [700, 150, 2.3],
              [840, 84, 1.7],
              [980, 176, 2],
              [1100, 110, 1.6],
              [220, 240, 1.5],
              [660, 262, 1.8],
              [1040, 300, 1.5],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} opacity={0.35 + (i % 3) * 0.22} />
            ))}
          </g>
          <circle cx="960" cy="180" r="120" fill="#FFE9BC" opacity="0.12" />
          <circle cx="960" cy="180" r="54" fill="#FBF0D6" opacity="0.9" />
          <circle cx="928" cy="164" r="48" fill="#0A1424" opacity="0.85" />
          <StringLights y={200} />
          <rect y="600" width="1200" height="300" fill={`url(#${id("seaNight")})`} />
          <g fill="#FFD27D" opacity="0.28">
            {Array.from({ length: 7 }).map((_, i) => (
              <rect key={i} x={520 + i * 6} y={628 + i * 34} width={130 - i * 6} height="6" rx="3" />
            ))}
          </g>
          <path d="M0 700c200-26 340 14 560 4s360-42 640-20v216H0z" fill="#050A12" />
          <Palm x={228} y={880} scale={0.6} />
          <Palm x={1000} y={862} scale={0.5} flip />
          <Parasol x={782} y={732} scale={0.5} />
          <Lounger x={430} y={800} scale={0.52} />
        </>
      );

    case "sports":
      return (
        <>
          <rect x="120" y="130" width="640" height="380" rx="18" fill="#040A12" />
          <rect x="136" y="146" width="608" height="348" rx="10" fill={`url(#${id("screen")})`} />
          <g stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="4" fill="none">
            <rect x="164" y="176" width="552" height="288" rx="4" />
            <path d="M440 176v288" />
            <circle cx="440" cy="320" r="60" />
            <rect x="164" y="248" width="72" height="144" />
            <rect x="644" y="248" width="72" height="144" />
          </g>
          <circle cx="366" cy="352" r="13" fill="#FFFFFF" />
          <rect x="120" y="510" width="640" height="26" rx="8" fill="#050B14" />
          <rect x="410" y="536" width="60" height="60" fill="#050B14" />

          <rect x="812" y="200" width="336" height="216" rx="14" fill="#040A12" />
          <rect x="824" y="212" width="312" height="192" rx="8" fill={`url(#${id("screen")})`} opacity="0.82" />
          <g stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="3" fill="none">
            <rect x="844" y="232" width="272" height="152" rx="3" />
            <path d="M980 232v152" />
            <circle cx="980" cy="308" r="32" />
          </g>
          <rect x="812" y="416" width="336" height="18" rx="6" fill="#050B14" />
          <rect x="962" y="434" width="36" height="42" fill="#050B14" />

          <ellipse cx="600" cy="330" rx="520" ry="300" fill="#4BD6A8" opacity="0.07" />

          <g fill={INK}>
            <path d="M0 900v-92c0-38 26-64 62-64s60 26 60 64v92z" />
            <circle cx="62" cy="716" r="42" />
            <path d="M170 900v-118c0-40 28-68 66-68s66 28 66 68v118z" />
            <circle cx="236" cy="686" r="46" />
            <path d="M352 900v-86c0-36 24-60 58-60s58 24 58 60v86z" />
            <circle cx="410" cy="726" r="40" />
            <path d="M528 900v-124c0-42 30-72 70-72s70 30 70 72v124z" />
            <circle cx="598" cy="678" r="48" />
            <path d="M718 900v-92c0-38 26-64 62-64s62 26 62 64v92z" />
            <circle cx="780" cy="716" r="42" />
            <path d="M890 900v-112c0-40 28-68 66-68s66 28 66 68v112z" />
            <circle cx="956" cy="692" r="45" />
            <path d="M1060 900v-90c0-36 26-62 62-62s62 26 62 62v90z" />
            <circle cx="1122" cy="720" r="41" />
          </g>
        </>
      );

    case "abstract":
    default:
      return (
        <>
          <circle cx="600" cy="480" r="360" fill={`url(#${id("glow")})`} opacity="0.6" />
          <circle cx="600" cy="470" r="200" fill="#FFCF6B" opacity="0.85" />
          <Rays x={760} y={390} />
          <Rays x={440} y={418} flip />
          <path d="M0 720c220-40 380 20 600 8s360-56 600-24v196H0z" fill={INK} opacity="0.9" />
        </>
      );
  }
};
