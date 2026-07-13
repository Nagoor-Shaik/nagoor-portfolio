import { cn } from "@/lib/utils";

type Props = {
  kind: "PHOTO" | "VIDEO" | "FIGMA";
  label?: string;
  note?: string;
  aspect?: string; // e.g. "16/9"
  className?: string;
  /** Optional pasteable variable name to display */
  slotName?: string;
};

/**
 * Visible placeholder for image/video/figma upload slots.
 * Each slot carries the exact TODO comment so you know what to drop in.
 */
export function UploadSlot({
  kind,
  label,
  note,
  aspect = "16/9",
  className,
  slotName,
}: Props) {
  const accent =
    kind === "VIDEO"
      ? "var(--neon-cyan)"
      : kind === "FIGMA"
        ? "var(--neon-magenta)"
        : "var(--neon-violet)";

  return (
    <div
      className={cn(
        "relative w-full glass-card corner-brackets overflow-hidden flex items-center justify-center text-center",
        className,
      )}
      style={{ aspectRatio: aspect }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 10px, transparent 10px 20px)",
        }}
      />
      <div className="relative z-10 px-6 py-4">
        <div
          className="font-mono text-[11px] tracking-[0.3em] uppercase mb-2"
          style={{ color: accent }}
        >
          [ {kind} ]
        </div>
        {label && (
          <div className="font-display text-lg sm:text-xl text-foreground/90">
            {label}
          </div>
        )}
        {note && (
          <div className="mt-2 max-w-md mx-auto text-xs text-text-dim font-body">
            {note}
          </div>
        )}
        {slotName && (
          <div className="mt-3 inline-block rounded border border-glass-border px-2 py-1 font-mono text-[10px] text-text-dim">
            {slotName}
          </div>
        )}
      </div>
    </div>
  );
}
