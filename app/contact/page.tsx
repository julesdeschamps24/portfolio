import { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Contact & Devis",
  description: "Contactez-moi pour discuter de vos projets ou opportunités de collaboration.",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <ContactSection />
    </main>
  );
}
