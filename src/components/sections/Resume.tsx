import { Reveal } from "@/components/portfolio/Reveal";

export function ResumeSection() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 border-t border-white/[0.05]">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">
        
        {/* Text Left */}
        <Reveal>
          <div className="flex flex-col gap-4">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon-cyan">
              Curriculum Vitae
            </div>
            <h2 className="font-display font-bold text-4xl sm:text-5xl tracking-tight text-foreground">
              Looking for the full picture?
            </h2>
            <p className="font-body text-base sm:text-lg text-text-dim max-w-xl leading-relaxed">
              My resume details my full engineering stack, professional architecture footprint, 
              and how I bridge the gap between design execution and production deployment. 
              Grab a copy to review offline.
            </p>
          </div>
        </Reveal>

        {/* Action Button Right */}
        <Reveal delay={100}>
          <div className="flex justify-start lg:justify-end">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl glass-card corner-brackets font-mono text-xs uppercase tracking-[0.25em] text-foreground hover:text-neon-cyan hover:border-neon-cyan/40 transition-all duration-300 bg-[#0C0C0E]/40"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300"
              >
                <path d="M15 3h6v6" />
                <path d="M10 14 21 3" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              </svg>
              <span>View &amp; Download Resume</span>
            </a>
          </div>
        </Reveal>

      </div>
    </section>
  );
}