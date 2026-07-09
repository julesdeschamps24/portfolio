import { HeroSection } from "@/components/sections/hero-section";
import { WorkSection } from "@/components/sections/work-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ApprocheSection } from "@/components/sections/approche-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <main className="studio">
      <HeroSection />
      <WorkSection />
      <ServicesSection />
      <ApprocheSection />
      <ContactSection />
    </main>
  );
}
