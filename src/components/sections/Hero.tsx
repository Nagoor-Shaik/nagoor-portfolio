import { useEffect, useState } from "react";
import { Download, Linkedin, Mail, ExternalLink } from "lucide-react";
import { SectionLabel } from "@/components/portfolio/SectionLabel";
import { FloatingOrbs, KatakanaDeco, ScanlineOverlay } from "@/components/portfolio/decor";
import { AnimePresence } from "@/components/portfolio/AnimePresence";
import { UploadSlot } from "@/components/portfolio/UploadSlot";

// ═══════════════════════════════════════════
// 🔗 LINK: Updated to point to your local PDF
// ═══════════════════════════════════════════
const RESUME_URL = "/resume.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/shaik-nagoor-vali/";
const BEHANCE_URL = "https://www.behance.net/shaiknagoorvali";
const EMAIL = "shaiknagoorvali281@gmail.com";
const PROFILE_PHOTO = "https://i.ibb.co/N2JfvF6N/Profile-Pic.png";

const SUBTITLE = "Turning thoughts into ideas — in a creative perspective.";

function Letter({ char, delay }: { char: string; delay: number }) {
  return (
    <span
      className="inline-block opacity-0"
      style={{
        animation: `letter-in 0.7s ease-out forwards`,
        animationDelay: `${delay}ms`,
      }}
    >
      {char}
    </span>
  );
}

function Typewriter({ text, startMs }: { text: string; startMs: number }) {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startMs);
    return () => clearTimeout(t);
  }, [startMs]);
  useEffect(() => {
    if (!started) return;
    if (i >= text.length) return;
    const t = setTimeout(() => setI(i + 1), 28);
    return () => clearTimeout(t);
  }, [i, started, text.length]);
  return (
    <span>
      {text.slice(0, i)}
      <span className="inline-block w-2 h-5 align-middle bg-neon-cyan ml-0.5 animate-cursor-blink" />
    </span>
  );
}

export function HeroSection() {
  const nagoor = "NAGOOR";
  const shaik = "SHAIK";
  return (
    <section
      id="hero"
      className="relative min-h-screen lg:min-h-[calc(100vh+2rem)] overflow-hidden mesh-bg animate-mesh pt-20 pb-32 lg:pb-40"
    >
      <FloatingOrbs />
      <AnimePresence variant="silhouette" />
      <KatakanaDeco />
      <ScanlineOverlay />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-8">
        <SectionLabel code="01" name="HERO" jp="ヒーロー" subtitle="First Impression" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-20 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
        {/* LEFT */}
        <div>
          <div className="font-mono text-xs sm:text-sm text-neon-cyan tracking-[0.25em] mb-6 opacity-0 animate-fade-up" style={{ animationDelay: "300ms" }}>
            [ UX DESIGNER · MOTION · INTERACTION ]
            <span className="inline-block w-2 h-4 align-middle bg-neon-cyan ml-1 animate-cursor-blink" />
          </div>

          <h1
            className="font-display font-bold leading-[0.95] tracking-tight text-foreground"
            style={{ fontSize: "clamp(64px, 11vw, 132px)" }}
          >
            <div>
              {nagoor.split("").map((c, i) => (
                <Letter key={"n" + i} char={c} delay={600 + i * 70} />
              ))}
            </div>
            <div className="text-neon-violet" style={{ textShadow: "0 0 24px rgba(123,47,255,0.5)" }}>
              {shaik.split("").map((c, i) => (
                <Letter key={"s" + i} char={c} delay={1100 + i * 70} />
              ))}
            </div>
          </h1>

          <p className="mt-6 font-body text-lg sm:text-xl text-foreground/90 min-h-[2rem]">
            <Typewriter text={SUBTITLE} startMs={1400} />
          </p>

          <p
            className="mt-6 font-body text-base text-text-dim max-w-[480px] opacity-0 animate-fade-up"
            style={{ animationDelay: "1700ms" }}
          >
            A crazy anime fan who wants to make his own identity — as determined as Naruto,
            ambitious as Luffy, relentless as Asta, and precise as Hinata. I design experiences
            that move people, literally and figuratively.
          </p>

          <div
            className="mt-8 flex flex-wrap gap-4 opacity-0 animate-fade-up"
            style={{ animationDelay: "1900ms" }}
          >
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display font-semibold text-white overflow-hidden gradient-violet-cyan"
              style={{ boxShadow: "0 0 30px rgba(123,47,255,0.45)" }}
            >
              <span className="relative z-10">View My Work</span>
              <span
                aria-hidden
                className="absolute inset-y-0 -left-1/3 w-1/3 bg-white/30 blur-md opacity-0 group-hover:opacity-100"
                style={{ animation: "shimmer-sweep 1.4s ease-out infinite" }}
              />
            </a>
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-display font-semibold text-neon-cyan glass-card hover:text-foreground transition-colors"
              style={{ borderColor: "rgba(0,212,255,0.4)" }}
            >
              <Download size={16} /> Download Resume
            </a>
          </div>

          <div
            className="mt-6 flex flex-wrap gap-3 opacity-0 animate-fade-up"
            style={{ animationDelay: "2100ms" }}
          >
            {[
              { href: LINKEDIN_URL, icon: Linkedin, label: "LinkedIn" },
              { href: BEHANCE_URL, icon: ExternalLink, label: "Behance" },
              { href: `mailto:${EMAIL}`, icon: Mail, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card font-mono text-xs uppercase tracking-widest text-text-dim hover:text-neon-cyan transition-colors"
              >
                <s.icon size={14} /> {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-full animate-spin-slow"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--neon-violet), var(--neon-cyan), var(--neon-magenta), var(--neon-violet))",
                padding: 4,
                WebkitMask:
                  "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div
              className="absolute -inset-2 rounded-full animate-pulse-ring"
              style={{
                boxShadow:
                  "0 0 60px rgba(123,47,255,0.5), inset 0 0 40px rgba(0,212,255,0.3)",
              }}
            />
            <div
              className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden glass-card"
              style={{ padding: 0 }}
            >
              <img
                src={PROFILE_PHOTO}
                alt="Shaik Nagoor Vali"
                className="w-full h-full object-cover"
                loading="eager"
              />

            </div>
          </div>

          <div className="glass-card corner-brackets px-5 py-3 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse-dot"
                style={{ background: "#3DFFA1", color: "#3DFFA1" }}
              />
              <span className="text-foreground/90 tracking-widest uppercase">
                Available for Work
              </span>
            </div>
            <div className="font-mono text-xs text-text-dim mt-1">
              Austin, TX · Open to Relocation
            </div>
          </div>
        </div>
      </div>

      {/* tiny upload hint placeholder section to keep slot reference visible */}
      <div className="sr-only">
        <UploadSlot kind="PHOTO" label="Profile" slotName="PASTE_PHOTO_PATH_HERE" />
      </div>
    </section>
  );
}