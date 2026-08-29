import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Admin — Mamma Mia",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${archivo.variable} ${inter.variable}`} data-mood="night">
      <body className="min-h-dvh bg-night text-cream antialiased">{children}</body>
    </html>
  );
}
