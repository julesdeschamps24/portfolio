import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Node4 - Portfolio",
  description: "Portfolio personnel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold text-white">
              Node4
            </Link>
            <nav className="flex items-center gap-6 text-sm text-zinc-200">
              <Link
                href="/"
                className="transition hover:text-white hover:underline underline-offset-4"
              >
                Accueil
              </Link>
              <Link
                href="/projets"
                className="transition hover:text-white hover:underline underline-offset-4"
              >
                Projets
              </Link>
              <Link
                href="/contact"
                className="transition hover:text-white hover:underline underline-offset-4"
              >
                Contact
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
