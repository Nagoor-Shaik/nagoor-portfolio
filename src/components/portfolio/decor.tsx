import { cn } from "@/lib/utils";

const ORBS = [
  { size: 420, top: "-6%",  left: "-4%",  color: "var(--accent-steel)", anim: "orb-drift-1", dur: 80 },
  { size: 320, top: "12%",  left: "62%",  color: "var(--accent-sage)",  anim: "orb-drift-2", dur: 95 },
  { size: 520, top: "38%",  left: "-10%", color: "var(--accent-sand)",  anim: "orb-drift-3", dur: 110 },
  { size: 260, top: "30%",  left: "85%",  color: "var(--accent-steel)", anim: "orb-drift-4", dur: 70 },
  { size: 380, top: "55%",  left: "40%",  color: "var(--accent-sage)",  anim: "orb-drift-5", dur: 100 },
  { size: 220, top: "70%",  left: "12%",  color: "var(--accent-sand)",  anim: "orb-drift-6", dur: 85 },
  { size: 300, top: "78%",  left: "70%",  color: "var(--accent-steel)", anim: "orb-drift-7", dur: 105 },
  { size: 180, top: "8%",   left: "32%",  color: "var(--accent-sage)",  anim: "orb-drift-8", dur: 75 },
  { size: 340, top: "92%",  left: "45%",  color: "var(--accent-sand)",  anim: "orb-drift-9", dur: 90 },
];

export function FloatingOrbs({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden z-0", className)}
    >
      {ORBS.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.size,
            height: o.size,
            top: o.top,
            left: o.left,
            background: o.color,
            opacity: 0.06,
            filter: "blur(80px)",
            animation: `${o.anim} ${o.dur}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none fixed inset-0 z-0 dot-grid", className)}
      style={{ opacity: 0.5 }}
    />
  );
}

export function KatakanaDeco({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 select-none font-display font-bold",
        className,
      )}
      style={{ opacity: 0.025 }}
    >
      <div className="absolute top-10 right-8 text-[120px] leading-none tracking-widest">
        ナガ
      </div>
      <div className="absolute bottom-10 left-8 text-[100px] leading-none tracking-widest">
        デザイン
      </div>
    </div>
  );
}

export function SpeedLines({ className }: { className?: string }) {
  return <div aria-hidden className={cn("hidden", className)} />;
}

export function ScanlineOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 z-[1]", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 3px)",
      }}
    />
  );
}
