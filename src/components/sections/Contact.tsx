import { useState } from "react";
import { Linkedin, Mail, ExternalLink, Check } from "lucide-react";
import { SectionLabel } from "@/components/portfolio/SectionLabel";
import { Reveal } from "@/components/portfolio/Reveal";
import { AnimePresence } from "@/components/portfolio/AnimePresence";

const LINKEDIN_URL = "https://www.linkedin.com/in/shaik-nagoor-vali/";
const BEHANCE_URL = "https://www.behance.net/shaiknagoorvali";
const EMAIL = "shaiknagoorvali281@gmail.com";

export function ContactSection() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <AnimePresence variant="silhouette" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel code="09" name="CONTACT" jp="コンタクト" subtitle="Get in Touch" />

        <Reveal>
          <h2 className="mt-8 font-display font-bold leading-[0.9] tracking-tight" style={{ fontSize: "clamp(56px, 10vw, 140px)" }}>
            LET'S BUILD
            <br />
            <span className="neon-text-violet">SOMETHING.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-8">
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const name = (data.get("name") as string) || "";
                const email = (data.get("email") as string) || "";
                const message = (data.get("message") as string) || "";

                const subject = `Portfolio inquiry from ${name}`;
                const body = `${message}\n\n— ${name} (${email})`;
                window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
                  subject,
                )}&body=${encodeURIComponent(body)}`;

                setSent(true);
              }}
              className="glass-card corner-brackets p-8 space-y-4"
            >
              {sent ? (
                <div className="flex flex-col items-center gap-2 py-12 text-center">
                  <div className="flex items-center gap-3 text-neon-cyan font-display text-xl">
                    <Check size={20} /> Opening your email client…
                  </div>
                  <p className="font-body text-sm text-text-dim max-w-xs">
                    Your message is prefilled and ready to send to {EMAIL}. If nothing opened,
                    email me directly using the link on the right.
                  </p>
                </div>
              ) : (
                <>
                  <Field label="Name" name="name" type="text" />
                  <Field label="Email" name="email" type="email" />
                  <div className="space-y-1.5">
                    <label className="font-mono text-[11px] uppercase tracking-widest text-text-dim">
                      Message
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      className="w-full rounded-md bg-black/40 border border-glass-border focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/30 px-3 py-2 font-body text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-2 px-6 py-3 rounded-lg font-display font-semibold text-white gradient-violet-cyan"
                    style={{ boxShadow: "0 0 24px rgba(123,47,255,0.4)" }}
                  >
                    Send Message →
                  </button>
                </>
              )}
            </form>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass-card corner-brackets p-8 h-full">
              <div className="font-display text-2xl mb-6">Other ways to reach me</div>
              <div className="space-y-3">
                {[
                  { href: LINKEDIN_URL, label: "LinkedIn", icon: Linkedin, color: "var(--neon-cyan)" },
                  { href: BEHANCE_URL, label: "Behance", icon: ExternalLink, color: "var(--neon-violet)" },
                  { href: `mailto:${EMAIL}`, label: EMAIL, icon: Mail, color: "var(--neon-magenta)" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-full glass-card hover:translate-x-1 transition-transform"
                  >
                    <span
                      className="w-8 h-8 rounded-full grid place-items-center shrink-0"
                      style={{ background: "rgba(255,255,255,0.05)", color: c.color }}
                    >
                      <c.icon size={14} />
                    </span>
                    <span className="font-body text-sm text-foreground/90">{c.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div className="space-y-1.5">
      <label className="font-mono text-[11px] uppercase tracking-widest text-text-dim">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        className="w-full rounded-md bg-black/40 border border-glass-border focus:border-neon-cyan focus:outline-none focus:ring-2 focus:ring-neon-cyan/30 px-3 py-2 font-body text-sm"
      />
    </div>
  );
}
