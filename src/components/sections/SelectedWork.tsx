import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "@/components/portfolio/SectionLabel";
import { projects } from "@/lib/portfolio-data";

export function SelectedWork() {
  const [hover, setHover] = useState<string | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="work" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel code="03" name="SELECTED WORK" jp="プロジェクト" subtitle="Case Studies" />

        <h2 className="mt-8 font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
          Selected <span className="neon-text-violet">Work.</span>
        </h2>

        <div ref={wrapRef} className="mt-12 divide-y divide-[rgba(123,47,255,0.18)]">
          {projects.map((p) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              data-cursor="hover"
              onMouseEnter={() => setHover(p.slug)}
              onMouseLeave={() => setHover(null)}
              className="group grid grid-cols-[64px_1fr_auto] items-center gap-4 sm:gap-8 py-6 sm:py-10 transition-colors"
            >
              <span className="font-mono text-sm text-text-dim group-hover:text-neon-cyan transition-colors">
                {p.number}
              </span>
              <span
                className="font-display font-bold text-3xl sm:text-5xl lg:text-7xl tracking-tight transition-all"
                style={
                  hover === p.slug
                    ? { color: "var(--neon-violet)", textShadow: "0 0 24px rgba(123,47,255,0.5)" }
                    : undefined
                }
              >
                {p.title}
              </span>
              <span className="hidden sm:flex flex-col items-end gap-1 font-mono text-[11px] uppercase tracking-widest text-text-dim text-right max-w-[260px]">
                <span>{p.category}</span>
                <span className="text-neon-cyan/70">{p.year}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* cursor-following preview */}
      {hover && (
        <div
          className="pointer-events-none fixed z-40 hidden lg:block transition-transform duration-200 ease-out"
          style={{
            left: pos.x + 24,
            top: pos.y - 80,
          }}
        >
          {hover === "credit-card" ? (
            <div
              className="glass-card corner-brackets overflow-hidden border border-white/[0.1]"
              style={{ height: 360, width: 360 * (393 / 852) }}
            >
              <img
                src="/credit-card.jpg"
                alt="Credit Card Preview"
                className="w-full h-full object-contain"
              />
            </div>
          ) : hover === "smartwatch" ? (
            <div
              className="glass-card corner-brackets overflow-hidden border border-white/[0.1]"
              style={{ height: 260, width: 260 * (890 / 1037) }}
            >
              <img
                src="/smartwatch-home.png"
                alt="SmartWatch Preview"
                className="w-full h-full object-contain"
              />
            </div>
          ) : (
            <div className="glass-card corner-brackets w-[280px] aspect-[4/3] overflow-hidden border border-white/[0.1]">
              {hover === "flexity" ? (
                <img
                  src="/flexity-cover.png"
                  alt="Flexity Preview"
                  className="w-full h-full object-cover"
                />
              ) : hover === "we-play" ? (
                <img
                  src="/weplay-card.png"
                  alt="We Play Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="grid place-items-center w-full h-full font-mono text-[10px] tracking-[0.3em] text-neon-cyan">
                  [ PREVIEW: {hover.toUpperCase()} ]
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}