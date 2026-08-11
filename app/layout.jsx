import { Cormorant_Garamond, Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import { wedding } from "@/lib/config";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://mariage.vercel.app"),
  title: `${wedding.groom} & ${wedding.bride} — Invitation de Mariage`,
  description: `Vous êtes convié(e) à la célébration de ${wedding.groom} & ${wedding.bride}, le ${wedding.dateLabel} à ${wedding.venue.name}, ${wedding.venue.city}.`,
  openGraph: {
    title: `${wedding.groom} & ${wedding.bride} — Invitation de Mariage`,
    description: `Le ${wedding.dateLabel} à ${wedding.venue.name}, ${wedding.venue.city}. Vous êtes invité(e).`,
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A1714",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${greatVibes.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
