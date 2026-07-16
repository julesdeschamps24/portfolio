import { HeroSection } from "@/components/sections/hero-section";
import { WorkSection } from "@/components/sections/work-section";
import { MobileSection } from "@/components/sections/mobile-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ApprocheSection } from "@/components/sections/approche-section";
import { ContactSection } from "@/components/sections/contact-section";
import { ScrollReveal } from "@/components/scroll-reveal";

export default function Home() {
  return (
    <main className="studio">
      <HeroSection />
      <WorkSection />
      <MobileSection />
      <ServicesSection />
      <ApprocheSection />
      <ContactSection />
      <ScrollReveal />
    </main>
  );
}
