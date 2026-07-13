import { SectionLabel } from "@/components/portfolio/SectionLabel";

const slots = [
  "/weplay-mockup.jpg",
  "/Smartwatch.jpg",
  "/credit-card.jpg",
  "/flexity-cover2.png",
  "/weplay-mockup-2.jpg",
  "/credi-card-mockup.png",
  "/flexity-cover3.png",
  "/smartwatch-home.png",
];

const aspects = ["3/4", "4/5", "3/4", "16/10", "3/4", "16/10", "4/5", "3/4"];

export function GalleryStrip() {
  const list = [...slots, ...slots];
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel code="06" name="VISUAL GALLERY" jp="ギャラリー" subtitle="Mockups" />
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="flex gap-4 w-max animate-gallery">
          {list.map((s, i) => {
            const a = aspects[i % aspects.length];
            const isMedia = s.startsWith("/");
            const isVideo = /\.(mp4|webm|mov)$/i.test(s);

            return (
              <div
                key={i}
                className="glass-card corner-brackets shrink-0 flex items-center justify-center font-mono text-[10px] tracking-[0.3em] text-neon-violet/70 overflow-hidden"
                style={{
                  // Dynamically drop the fixed aspect ratio so the frame matches the actual media size
                  aspectRatio: isMedia ? "auto" : a,
                  height: 320,
                  padding: 0,
                }}
              >
                {isMedia ? (
                  isVideo ? (
                    <video
                      src={s}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onContextMenu={(e) => e.preventDefault()}
                      className="h-full w-auto object-cover block select-none pointer-events-none"
                    />
                  ) : (
                    <img
                      src={s}
                      alt={`Mockup ${i + 1}`}
                      // Let the height dictate the width proportionally based on the original image dimensions
                      className="h-full w-auto object-cover block select-none pointer-events-none"
                    />
                  )
                ) : (
                  <span>[ {s} ]</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}