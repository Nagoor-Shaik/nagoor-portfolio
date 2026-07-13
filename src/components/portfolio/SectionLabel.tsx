type Props = {
  code: string; // e.g. "01"
  name: string; // "HERO"
  jp: string; // "ヒーロー"
  subtitle: string;
};

export function SectionLabel({ code, name, jp, subtitle }: Props) {
  return (
    <div className="w-full">
      <div className="font-mono text-[11px] uppercase tracking-widest text-text-dim flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span>
          © {name} <span className="ml-1 text-neon-violet/70">{jp}</span>
        </span>
        
        <span>{subtitle}</span>
      </div>
      <div
        className="mt-3 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(123,47,255,0.35), rgba(0,212,255,0.25), transparent)",
        }}
      />
    </div>
  );
}
