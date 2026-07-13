import { SectionLabel } from "@/components/portfolio/SectionLabel";
import { Reveal } from "@/components/portfolio/Reveal";

const entries = [
  {
    company: "Vestaxis",
    role: "Full Stack Developer",
    when: "2024 – Present",
    where: "Austin, TX",
  },
  {
    company: "Vision Ze Consult IT Inc",
    role: "Software Developer",
    when: "2023 – 2024",
    where: "USA",
  },
  {
    company: "IBM / Kyndryl",
    role: "Software Developer",
    when: "2021 – 2023",
    where: "India",
  },
  {
    company: "Amazon",
    role: "Software Development Engineer",
    when: "2019 – 2021",
    where: "India",
  },
];

export function ExperienceSection() {
  return (
    <section id="about" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel code="05" name="EXPERIENCE" jp="経験" subtitle="Work History" />
        <Reveal>
          <h2 className="mt-8 font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            Where I've <span className="neon-text-violet">built.</span>
          </h2>
        </Reveal>

        <ul className="mt-12 divide-y divide-[rgba(123,47,255,0.18)]">
          {entries.map((e) => (
            <li
              key={e.company}
              className="group grid grid-cols-1 sm:grid-cols-[35%_1fr_auto] items-center gap-4 py-6 px-3 rounded-lg transition-colors hover:bg-[rgba(123,47,255,0.06)]"
            >
              <div className="font-display text-2xl sm:text-3xl text-foreground group-hover:text-neon-violet transition-colors">
                {e.company}
              </div>
              <div className="font-body text-sm text-foreground/80 text-left">
                {e.role}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-text-dim sm:text-right">
                {e.when} · {e.where}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
