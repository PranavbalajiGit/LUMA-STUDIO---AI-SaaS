import { GalleryShowcaseSection } from "@/components/GalleryShowCaseSection";
import {HomeHeroSection} from "@/components/HomeHeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-3 sm:p-4 lg:p-5">

      <HomeHeroSection />
      <GalleryShowcaseSection />
      <HowItWorksSection />
      <Testimonials />

    </main>
  );
} 
