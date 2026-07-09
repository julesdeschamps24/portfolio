import { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Parlez-moi de votre projet de site web. Studio — Jules Deschamps, création de sites pour entreprises locales.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="studio">
      <ContactSection />
    </main>
  );
}
