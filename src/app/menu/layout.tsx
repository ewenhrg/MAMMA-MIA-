import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Archivo, Inter, Instrument_Serif } from "next/font/google";
import { siteConfig } from "@/config/site";
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
  themeColor: "#fbf6ec",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: `Menu — ${siteConfig.shortName}`,
  description: "Day menu · Mamma Mia Beach Club, Hurghada",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: "/menu" },
};

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${inter.variable} ${instrument.variable}`}
      data-mood="day"
    >
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
