import { SectionLabel } from "@/components/portfolio/SectionLabel";
import { Reveal } from "@/components/portfolio/Reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Are you available for full-time roles?",
    a: "Yes, actively looking for full-time UX/Product Designer roles. Currently based in Austin, TX. Requires H-1B sponsorship.",
  },
  {
    q: "What kind of design work do you specialize in?",
    a: "Interaction design, motion design, and microinteractions: the craft of making interfaces feel alive. I also cover end-to-end UX: research, wireframing, prototyping, and high-fidelity visual design.",
  },
  {
    q: "What tools do you use?",
    a: "Figma is my primary tool for everything from wireframes to advanced prototypes with Smart Animate. I also work with FigJam, Maze for research, Notion, and Miro.",
  },
  {
    q: "Do you have development experience?",
    a: "Yes, I'm also a Full Stack Developer with Java, Spring Boot, React, MySQL, Docker, and AWS. This cross-discipline background makes me a stronger designer: I understand what's technically feasible and how to design for implementation.",
  },
  {
    q: "Can I see more of your work?",
    a: "My Figma prototypes are available to interact with on each case study page. For additional work, check my Behance profile linked in the contact section.",
  },
];

export function FaqSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionLabel code="07" name="FAQ" jp="よくある質問" subtitle="Clarifications" />
        <Reveal>
          <h2 className="mt-8 font-display font-bold text-4xl sm:text-5xl tracking-tight">
            Frequently <span className="neon-text-cyan">asked.</span>
          </h2>
        </Reveal>

        <div className="mt-10 glass-card corner-brackets p-2 sm:p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q${i}`} className="border-glass-border">
                <AccordionTrigger className="font-display text-lg text-left hover:text-neon-cyan">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-text-dim">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
