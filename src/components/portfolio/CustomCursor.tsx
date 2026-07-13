import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    let dotX = 0,
      dotY = 0,
      ringX = 0,
      ringY = 0,
      raf = 0;

    const onMove = (e: MouseEvent) => {
      dotX = e.clientX;
      dotY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;
      }
      const target = e.target as HTMLElement | null;
      const clickable =
        !!target?.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']");
      setHover(clickable);
    };

    const loop = () => {
      ringX += (dotX - ringX) * 0.18;
      ringY += (dotY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 12}px, ${ringY - 12}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full transition-[width,height,opacity] duration-150"
        style={{
          width: hover ? 16 : 8,
          height: hover ? 16 : 8,
          background: "var(--neon-cyan)",
          boxShadow: "0 0 12px var(--neon-cyan)",
          marginLeft: hover ? -4 : 0,
          marginTop: hover ? -4 : 0,
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none rounded-full transition-[width,height,opacity] duration-200"
        style={{
          width: hover ? 40 : 24,
          height: hover ? 40 : 24,
          marginLeft: hover ? -8 : 0,
          marginTop: hover ? -8 : 0,
          border: "1.5px solid var(--neon-violet)",
          opacity: 0.45,
        }}
      />
    </>
  );
}
