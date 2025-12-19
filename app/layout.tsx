import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { CookieBanner } from "@/components/cookie-banner";
import { HubSpotScript } from "@/components/hubspot-script";

import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://julesdeschamps.dev'),
  title: {
    default: "Jules Deschamps - Développeur Web Freelance",
    template: "%s | Jules Deschamps"
  },
  description: "Portfolio de Jules Deschamps, développeur web spécialisé en React, Next.js et TypeScript. Création de sites web performants et esthétiques.",
  keywords: ["Développeur Web", "Freelance", "React", "Next.js", "TypeScript", "Portfolio", "Jules Deschamps", "Creative Developer", "Frontend", "Fullstack"],
  authors: [{ name: "Jules Deschamps", url: "https://julesdeschamps.dev" }],
  creator: "Jules Deschamps",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Jules Deschamps - Portfolio",
    description: "Découvrez mon portfolio et mes projets web.",
    url: process.env.NEXT_PUBLIC_URL || 'https://julesdeschamps.dev',
    siteName: 'Jules Deschamps Portfolio',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Jules Deschamps',
    url: 'https://julesdeschamps.dev',
    image: 'https://julesdeschamps.dev/img/favicon.ico',
    jobTitle: 'Développeur Web Freelance',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'École 42'
    },
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'C', 'C++'],
    sameAs: [
      'https://www.linkedin.com/in/-jules-/',
      'https://github.com/julesdeschamps24',
      'https://gitlab.com/julesdeschamps24',
    ],
    description: 'Développeur web passionné spécialisé dans la création d\'expériences numériques modernes.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Soyaux',
      addressRegion: 'Nouvelle-Aquitaine',
      addressCountry: 'FR'
    }
  }

  return (
    <html lang="fr" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
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
