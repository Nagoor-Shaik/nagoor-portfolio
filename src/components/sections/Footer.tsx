import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="relative pt-12 pb-10 overflow-hidden">
      <div
        className="h-px w-full mx-auto max-w-7xl"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--neon-violet), var(--neon-cyan), var(--neon-magenta), transparent)",
          backgroundSize: "200% 100%",
          animation: "mesh-shift 8s linear infinite",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-10 mt-8 flex flex-col items-center gap-4 text-center font-mono text-xs text-text-dim">
        <div className="flex flex-wrap gap-5 uppercase tracking-[0.25em]">
          <Link to="/" className="hover:text-neon-cyan">Home</Link>
          <Link to="/" hash="work" className="hover:text-neon-cyan">Work</Link>
          <Link to="/" hash="motion" className="hover:text-neon-cyan">Motion</Link>
          <Link to="/" hash="skills" className="hover:text-neon-cyan">Skills</Link>
          <Link to="/" hash="contact" className="hover:text-neon-cyan">Contact</Link>
          <a 
            href="/resume.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-neon-cyan transition-colors"
          >
            Resume
          </a>
        </div>
        <div>Designed &amp; Prototyped by Nagoor Shaik · Built in React · © 2025</div>
      </div>
    </footer>
  );
}