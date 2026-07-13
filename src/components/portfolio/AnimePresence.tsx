import { cn } from "@/lib/utils";

type Variant = "silhouette" | "ripple";

/**
 * Subtle, quiet anime-inspired ambient layer.
 * - "silhouette": faint SVG side-profile shapes, breathing gently.
 * - "ripple":     concentric expanding circles, very low opacity.
 */
export function AnimePresence({
  variant = "silhouette",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  if (variant === "ripple") {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 overflow-hidden z-0", className)}
      >
        {[0, 2, 4].map((delay) => (
          <div
            key={delay}
            className="absolute left-1/2 top-1/2 rounded-full border"
            style={{
              width: 600,
              height: 600,
              marginLeft: -300,
              marginTop: -300,
              borderColor: "var(--accent-steel)",
              animation: `ripple-out 6s ease-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>
    );
  }

  // Silhouette — simple side-profile head + shoulders, 2 placements
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden z-0", className)}
      style={{ mixBlendMode: "lighten" }}
    >
      <Silhouette
        className="absolute -bottom-6 -left-10 animate-breathe"
        style={{ width: 220, opacity: 0.04 }}
      />
      <Silhouette
        flip
        className="absolute -top-4 -right-12 animate-breathe"
        style={{ width: 180, opacity: 0.04, animationDelay: "3s" }}
      />
    </div>
  );
}

function Silhouette({
  className,
  style,
  flip,
}: {
  className?: string;
  style?: React.CSSProperties;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 260"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined, ...style }}
      fill="currentColor"
      color="var(--accent-steel)"
    >
      {/* simple stylized side-profile: head, neck, shoulders */}
      <path d="M120 30 C 95 30 78 50 78 80 C 78 95 82 108 90 118 L 88 138 C 70 142 50 152 38 168 C 24 188 20 220 22 260 L 200 260 L 200 60 C 200 42 178 30 158 30 Z" />
    </svg>
  );
}
