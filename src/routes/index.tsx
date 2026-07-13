import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";
import { MarqueeTicker } from "@/components/portfolio/MarqueeTicker";
import { HeroSection } from "@/components/sections/Hero";
import { MotionShowcase } from "@/components/sections/MotionShowcase";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { SkillsSection } from "@/components/sections/Skills";
import { ExperienceSection } from "@/components/sections/Experience";
import { GalleryStrip } from "@/components/sections/Gallery";
import { FaqSection } from "@/components/sections/Faq";
import { ResumeSection } from "@/components/sections/Resume";
import { ContactSection } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nagoor Shaik — UX / Product Designer · Motion & Interaction" },
      {
        name: "description",
        content:
          "Portfolio of Nagoor Shaik — UX & Product designer turning thoughts into motion-rich, interaction-led product experiences.",
      },
      { property: "og:title", content: "Nagoor Shaik — UX / Product Designer" },
      {
        property: "og:description",
        content: "Motion · Microinteraction · Interaction Design. Austin, TX.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen text-foreground">
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        
        <MarqueeTicker
          items={[
            "MOTION DESIGN",
            "INTERACTION DESIGN",
            "MICROINTERACTION",
            "PROTOTYPING",
            "UX RESEARCH",
            "FIGMA SMART ANIMATE",
            "WEARABLE UX",
            "DARK UI",
            "ANIMATION",
          ]}
        />
        <MotionShowcase />
        <MarqueeTicker
          items={[
            "WE PLAY",
            "FLEXITY",
            "CREDIT CARD ANIMATION",
            "SAMSUNG GALAXY WATCH",
            "INTERACTION DESIGN",
            "MOTION FIRST",
            "RESEARCH DRIVEN",
            "FIGMA",
          ]}
        />
        <SelectedWork />
        <MarqueeTicker
          items={[
            "UX DESIGNER",
            "MOTION DESIGNER",
            "INTERACTION DESIGNER",
            "AVAILABLE FOR WORK",
            "AUSTIN TX",
            "FIGMA",
            "OPEN TO RELOCATION",
            "H1B SPONSORSHIP",
          ]}
        />
        <SkillsSection />
        <ExperienceSection />
        <GalleryStrip />
        <FaqSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}