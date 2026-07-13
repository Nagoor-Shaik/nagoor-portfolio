type Props = { items: string[] };

export function MarqueeTicker({ items }: Props) {
  const line = items.join("  —  ") + "  —  ";
  return (
    <div
      className="relative w-full overflow-hidden py-3 my-12"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderTop: "1px solid rgba(123,47,255,0.2)",
        borderBottom: "1px solid rgba(123,47,255,0.2)",
      }}
    >
      <div className="flex w-max animate-marquee font-mono text-sm uppercase tracking-[0.25em] text-text-dim/70">
        <span className="pr-8 whitespace-nowrap">{line.repeat(4)}</span>
        <span className="pr-8 whitespace-nowrap" aria-hidden>
          {line.repeat(4)}
        </span>
      </div>
    </div>
  );
}
