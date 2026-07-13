import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { SectionLabel } from "@/components/portfolio/SectionLabel";
import { VideoLightbox } from "@/components/portfolio/VideoLightbox";
import { Reveal } from "@/components/portfolio/Reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Device = "macbook" | "iphone" | "watch";
type Card = { title: string; duration: string; tag: string; slot: string; embedUrl?: string; device?: Device };

const cards: Card[] = [
  { title: "Flexity — Logo Reveal", duration: "0:15", tag: "Motion Design", slot: "/flexity-logo.mp4", device: "macbook" },
  { title: "We Play — App Launch Sequence", duration: "0:18", tag: "Motion · Mobile", slot: "/weplay-hero.mp4", device: "iphone" },
  { title: "Credit Card Microinteraction × 3", duration: "0:22", tag: "Microinteraction", slot: "/credit-card.mp4", device: "iphone" },
  { title: "SmartWatch — Ambient to Active", duration: "0:25", tag: "Wearable UX", slot: "/smartwatch-home.png", device: "watch" },
];

export function MotionShowcase() {
  const [open, setOpen] = useState<Card | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [snaps, setSnaps] = useState<number[]>([]);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setSnaps(api.scrollSnapList());
      setSelected(api.selectedScrollSnap());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
  }, [api]);

  return (
    <section id="motion" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionLabel code="02" name="MOTION IN ACTION" jp="モーション" subtitle="Design in Motion" />

        <Reveal>
          <div className="mt-8 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
                Motion that <span className="neon-text-cyan">breathes.</span>
              </h2>
              <p className="mt-4 max-w-2xl font-body text-text-dim">
                Microinteractions, animations, and motion design that make interfaces feel alive.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                aria-label="Previous"
                onClick={() => api?.scrollPrev()}
                className="w-10 h-10 grid place-items-center rounded-full glass-card hover:text-accent-steel transition-colors"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                aria-label="Next"
                onClick={() => api?.scrollNext()}
                className="w-10 h-10 grid place-items-center rounded-full glass-card hover:text-accent-steel transition-colors"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-10">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", dragFree: false, containScroll: "trimSnaps" }}
        >
          <CarouselContent className="-ml-4">
            {cards.map((c) => {
              const hasVideo = c.slot.startsWith("/");
              const isImage = hasVideo && /\.(png|jpe?g|webp|gif)$/i.test(c.slot);
              const clickable = !hasVideo && c.slot !== "RESERVED";
              const isMobileVideo = hasVideo && c.device === "iphone";

              return (
                <CarouselItem
                  key={c.title}
                  className="pl-4 basis-[92%] sm:basis-[62%] lg:basis-[40%]"
                >
                  <div
                    onClick={clickable ? () => setOpen(c) : undefined}
                    role={clickable ? "button" : undefined}
                    tabIndex={clickable ? 0 : undefined}
                    className={`group glass-card corner-brackets w-full text-left transition-transform duration-300 ${
                      clickable ? "cursor-pointer hover:-translate-y-1" : ""
                    }`}
                    style={{ padding: 14 }}
                  >
                    <div className="relative h-[220px] sm:h-[248px] lg:h-[280px] w-full rounded-lg overflow-hidden bg-[#0C0C0E] border border-white/[0.06] transition-transform duration-300 group-hover:scale-[1.02]">
                      {hasVideo ? (
                        isMobileVideo ? (
                          <div className="flex h-full w-full items-center">
                            <div className="flex h-full flex-[1.1] items-center justify-center">
                              <video
                                src={c.slot}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                onContextMenu={(e) => e.preventDefault()}
                                className="h-[90%] w-auto max-w-full rounded-[1rem] object-contain select-none pointer-events-none shadow-[0_10px_26px_rgba(0,0,0,0.4)]"
                              />
                            </div>
                            <div className="flex h-full min-w-0 flex-1 flex-col justify-center pr-3">
                              <div className="font-display text-xs leading-tight sm:text-sm">
                                {c.title}
                              </div>
                              <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-text-dim">
                                {c.tag}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {isImage ? (
                              <img
                                src={c.slot}
                                alt={c.title}
                                className="w-full h-full object-cover block select-none pointer-events-none"
                              />
                            ) : (
                              <video
                                src={c.slot}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                                onContextMenu={(e) => e.preventDefault()}
                                className="w-full h-full object-cover block select-none pointer-events-none"
                              />
                            )}
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-3 pb-2.5 pt-10">
                              <div className="font-display text-sm sm:text-base text-white">
                                {c.title}
                              </div>
                              <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/70">
                                {c.tag}
                              </div>
                            </div>
                          </>
                        )
                      ) : (
                        <>
                          <div className="absolute inset-0 grid place-items-center bg-black/40">
                            <div
                              className="w-14 h-14 rounded-full grid place-items-center"
                              style={{ background: "rgba(110,139,168,0.10)" }}
                            >
                              <Play size={22} className="text-accent-steel" />
                            </div>
                          </div>
                          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent px-3 pb-2.5 pt-10">
                            <div className="flex items-end justify-between gap-2">
                              <div>
                                <div className="font-display text-sm sm:text-base text-white">
                                  {c.title}
                                </div>
                                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-white/70">
                                  {c.tag}
                                </div>
                              </div>
                              <div className="font-mono text-[10px] text-accent-steel">
                                {c.duration}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {snaps.length > 1 && (
          <div className="mt-6 flex justify-center gap-2">
            {snaps.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === selected ? 24 : 8,
                  background:
                    i === selected
                      ? "var(--accent-steel)"
                      : "rgba(138,138,147,0.3)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      <VideoLightbox
        open={!!open}
        title={open?.title ?? ""}
        embedUrl={open?.embedUrl}
        device={open?.device}
        onClose={() => setOpen(null)}
      />
    </section>
  );
}
