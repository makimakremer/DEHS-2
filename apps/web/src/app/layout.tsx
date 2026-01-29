import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "DEHS - Ihr Großhandel für Heizungsanlagen",
    template: "%s | DEHS Heizungstechnik",
  },
  description:
    "DEHS - Ihr zuverlässiger Großhandel für Heizungsanlagen. Wärmepumpen, Gasheizungen, Solarthermie und mehr. Qualitätsprodukte für Fachbetriebe.",
  keywords: [
    "Heizungsgroßhandel",
    "Wärmepumpen",
    "Gasheizungen",
    "Heizungstechnik",
    "B2B Heizung",
    "Heizungsanlagen",
  ],
  authors: [{ name: "DEHS GmbH" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "DEHS Heizungstechnik",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
