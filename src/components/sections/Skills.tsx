import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/portfolio/SectionLabel";
import { Reveal } from "@/components/portfolio/Reveal";

const uxSkills = [
  "User Research",
  "Wireframing",
  "Prototyping",
  "Usability Testing",
  "Information Architecture",
  "Interaction Design",
  "Motion Design",
  "Microinteraction Design",
  "Design Systems",
  "Visual Design",
];

const tools = [
  "Figma",
  "FigJam",
  "Maze",
  "Notion",
  "Miro",
  "Framer",
  "Lottie",
  "ProtoPie",
  "Adobe XD",
  "Zeplin",
];

const stats = [
  { label: "MOTION DESIGN", pct: 85 },
  { label: "PROTOTYPING", pct: 95 },
  { label: "INTERACTION", pct: 90 },
  { label: "RESEARCH", pct: 80 },
];

function Bar({ label, pct }: { label: string; pct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => e.forEach((x) => x.isIntersecting && setSeen(true)),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between font-mono text-[11px] uppercase tracking-widest text-text-dim">
        <span>{label}</span>
        <span className="text-neon-cyan">{pct}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden bg-white/5">
        <div
          className="h-full gradient-violet-cyan transition-[width] duration-[1400ms] ease-out"
          style={{ width: seen ? `${pct}%` : 0 }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 speed-lines">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel code="04" name="POWER LEVEL" jp="スキル" subtitle="Capabilities" />
        <Reveal>
          <h2 className="mt-8 font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
            What I bring <span className="neon-text-cyan">to the team.</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="glass-card corner-brackets p-8">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neon-violet mb-4">
                [ UX SKILLS ]
              </div>
              <div className="flex flex-wrap gap-2">
                {uxSkills.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full text-sm font-body border transition-all hover:scale-105"
                    style={{
                      borderColor: "rgba(123,47,255,0.4)",
                      background: "rgba(123,47,255,0.08)",
                      color: "#E8E0FF",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-card corner-brackets p-8">
              <div className="font-mono text-[11px] uppercase tracking-widest text-neon-cyan mb-4">
                [ TOOLS ]
              </div>
              <div className="flex flex-wrap gap-2">
                {tools.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full text-sm font-body border transition-all hover:scale-105"
                    style={{
                      borderColor: "rgba(0,212,255,0.4)",
                      background: "rgba(0,212,255,0.06)",
                      color: "#D8F4FF",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-10 glass-card corner-brackets p-8 grid sm:grid-cols-2 gap-5">
            {stats.map((s) => (
              <Bar key={s.label} {...s} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
