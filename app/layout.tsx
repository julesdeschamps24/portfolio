import type { Metadata } from "next";
import { Syne, Schibsted_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { CookieBanner } from "@/components/cookie-banner";
import { HubSpotScript } from "@/components/hubspot-script";

import { Footer } from "@/components/footer";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrument = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const SITE_URL = process.env.NEXT_PUBLIC_URL || "https://julesdeschamps.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Studio — Jules Deschamps · Création de sites web pour entreprises locales",
    template: "%s · Studio — Jules Deschamps",
  },
  description:
    "Studio web indépendant. Je conçois et développe des sites soignés et sur-mesure pour les commerces, artisans et indépendants qui veulent une présence en ligne à leur image.",
  keywords: [
    "création site web",
    "site internet",
    "studio web",
    "site vitrine",
    "commerce local",
    "artisan",
    "TPE",
    "PME",
    "référencement local",
    "Jules Deschamps",
  ],
  authors: [{ name: "Jules Deschamps", url: SITE_URL }],
  creator: "Jules Deschamps",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Studio — Jules Deschamps · Sites web pour entreprises locales",
    description:
      "Des sites web sur-mesure pour les commerces, artisans et indépendants. Soignés, rapides, pensés pour être trouvés localement.",
    url: SITE_URL,
    siteName: "Studio — Jules Deschamps",
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/img/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Studio — Jules Deschamps",
    url: SITE_URL,
    image: `${SITE_URL}/img/favicon.ico`,
    description:
      "Studio web indépendant : création de sites web sur-mesure pour les commerces, artisans et indépendants locaux.",
    email: "contact@julesdeschamps.dev",
    founder: {
      "@type": "Person",
      name: "Jules Deschamps",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "École 42",
      },
    },
    knowsAbout: [
      "Création de sites web",
      "Sites vitrines",
      "Référencement local",
      "Design web",
    ],
    areaServed: "France",
    sameAs: [
      "https://www.linkedin.com/in/-jules-/",
      "https://github.com/julesdeschamps24",
      "https://gitlab.com/julesdeschamps24",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Soyaux",
      addressRegion: "Nouvelle-Aquitaine",
      addressCountry: "FR",
    },
  };

  return (
    <html lang="fr" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${syne.variable} ${schibsted.variable} ${instrument.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* HubSpot Tracking Script - chargé uniquement après consentement */}
        <HubSpotScript />
        <Navigation />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
