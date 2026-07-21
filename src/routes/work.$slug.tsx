import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/portfolio/Navbar";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { ScrollToTop } from "@/components/portfolio/ScrollToTop";
import { Footer } from "@/components/sections/Footer";
import { UploadSlot } from "@/components/portfolio/UploadSlot";
import { StreamableEmbed } from "@/components/portfolio/StreamableEmbed";
import { GlassCard } from "@/components/portfolio/GlassCard";
import { Reveal } from "@/components/portfolio/Reveal";
import { FloatingOrbs } from "@/components/portfolio/decor";
import { caseStudies } from "@/lib/case-studies";
import { Personas, EmpathyMap, JourneyMap } from "@/components/sections/WePlayResearch";
import { projects, type ProjectSlug } from "@/lib/portfolio-data";
import type { DeviceVariant } from "@/components/portfolio/DeviceFrame";

const slugs = projects.map((p) => p.slug);

const deviceForSlug: Record<ProjectSlug, DeviceVariant> = {
  flexity: "macbook",
  "we-play": "iphone",
  "credit-card": "iphone",
  smartwatch: "watch",
};

export const Route = createFileRoute("/work/$slug")({
  params: {
    parse: (raw) => {
      const slug = raw.slug as ProjectSlug;
      if (!slugs.includes(slug)) throw notFound();
      return { slug };
    },
    stringify: (p) => ({ slug: p.slug }),
  },
  head: ({ params }) => {
    const cs = caseStudies[params.slug];
    return {
      meta: [
        { title: `${cs.title} — Nagoor Shaik` },
        { name: "description", content: cs.category },
        { property: "og:title", content: `${cs.title} — Case Study` },
        { property: "og:description", content: cs.category },
      ],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const params = Route.useParams() as { slug: ProjectSlug };
  const slug = params.slug;
  const cs = caseStudies[slug];
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];
  const device = deviceForSlug[slug];

  const isMobileDevice = device === "iphone" || device === "watch";
  const isVideoUrl = (url: string) => /\.(mp4|webm|ogg|mov)/i.test(url);

  const renderHeroMedia = () => {
    if (slug === "credit-card") {
      return (
        <div className="relative mx-auto flex w-full justify-center">
          <img
            src="/credit-card.jpg"
            alt="Credit Card Interactions"
            className="block h-auto max-h-[580px] w-auto max-w-[min(100%,270px)] rounded-[38px] border border-white/[0.12] object-contain mx-auto select-none pointer-events-none shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.endsWith(".jpg")) {
                target.src = "/credi-card-mockup.png"; 
              }
            }}
          />
        </div>
      );
    }

    if (slug === "we-play") {
      return (
        <div
          className="relative w-full max-w-[360px] h-[650px] lg:h-[720px] rounded-[2.5rem] overflow-hidden bg-black mx-auto shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-cover block mx-auto select-none pointer-events-none"
          >
            <source src="/weplay-hero.mp4" type="video/mp4" />
          </video>
        </div>
      );
    }

    if (slug === "flexity") {
      return (
        <div className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0C0E] aspect-video mx-auto max-w-5xl">
          <img
            src="/flexity-cover.png"
            alt="Flexity OTT Streaming Platform Cover"
            className="w-full h-full object-cover block mx-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.endsWith(".png")) {
                target.src = "/flexity-cover.jpg";
              }
            }}
          />
        </div>
      );
    }

    if (slug === "smartwatch") {
      return (
        <div
          className="mx-auto flex w-full max-w-[380px] items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0C0E]"
          style={{ aspectRatio: "890 / 1037" }}
        >
          <img
            src="/smartwatch-home.png"
            alt="SmartWatch OS Home Screen"
            className="block h-full w-full object-contain"
          />
        </div>
      );
    }

    if (cs.hero.slot && isVideoUrl(cs.hero.slot)) {
      return (
        <div className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0C0E] aspect-[393/853]">
          <video
            autoPlay
            muted
            loop
            playsInline
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-full object-cover block mx-auto"
          >
            <source src={cs.hero.slot} type="video/mp4" />
          </video>
        </div>
      );
    }

    if (cs.hero.slot && (cs.hero.slot.startsWith("http") || cs.hero.slot.startsWith("/"))) {
      return (
        <div className="w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0C0C0E] aspect-[393/853]">
          <img
            src={cs.hero.slot}
            alt={cs.title}
            className="w-full h-full object-cover block mx-auto"
          />
        </div>
      );
    }

    if (cs.hero.embedUrl) {
      return (
        <StreamableEmbed
          src={cs.hero.embedUrl}
          title={cs.title}
          aspect={isMobileDevice ? "393/853" : "21/9"}
          device={device}
        />
      );
    }

    return (
      <UploadSlot
        kind={cs.hero.kind}
        label={cs.title}
        note={cs.hero.note}
        slotName={cs.hero.slot}
        aspect={isMobileDevice ? "393/853" : "21/9"}
      />
    );
  };

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <FloatingOrbs />

      {isMobileDevice ? (
        <>
          <section className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-32 pb-12">
            <div className="mb-8 flex justify-start">
              <Link
                to="/"
                hash="work"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-text-dim hover:text-neon-cyan transition-colors"
              >
                <ArrowLeft size={14} /> Back to Home Page
              </Link>
            </div>

            <div
              className={`w-full lg:grid lg:gap-16 xl:gap-24 lg:items-start ${
                slug === "we-play" || slug === "credit-card"
                  ? "lg:grid-cols-[360px_1fr]"
                  : "lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr]"
              }`}
            >
              <div
                className={`mb-12 lg:mb-0 w-full mx-auto ${
                  slug === "we-play" || slug === "credit-card" ? "max-w-[360px]" : "max-w-[380px]"
                }`}
              >
                {renderHeroMedia()}
              </div>

              <div className="flex flex-col gap-12">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon-cyan">
                    {cs.category}
                  </div>
                  <h1 className="mt-3 font-display font-bold tracking-tight text-5xl sm:text-6xl lg:text-7xl">
                    {cs.title}
                  </h1>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {cs.tags.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full glass-card font-mono text-[10px] uppercase tracking-widest text-text-dim"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <GlassCard className="grid grid-cols-2 gap-6">
                  {[
                    ["My Role", cs.meta.role],
                    ["Tools", cs.meta.tools],
                    ["Year", cs.meta.year],
                    ["Platform", cs.meta.platform],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim mb-1">
                        {k}
                      </div>
                      <div className="font-display text-[base] text-foreground">
                        {v}
                      </div>
                    </div>
                  ))}
                </GlassCard>
              </div>
            </div>
          </section>

          <article
            className={`relative mx-auto px-6 lg:px-10 py-20 space-y-12 ${
              slug === "credit-card" ? "max-w-6xl" : "max-w-4xl"
            }`}
          >
            <CaseStudyBlocks blocks={cs.blocks} slug={slug} />
          </article>
        </>
      ) : (
        <>
          <section className="relative pt-16 overflow-hidden">
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-12">
              <Link
                to="/"
                hash="work"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-text-dim hover:text-neon-cyan transition-colors"
              >
                <ArrowLeft size={14} /> Back to Home Page
              </Link>
              <div className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-neon-cyan">
                {cs.category}
              </div>
              <h1
                className="mt-3 font-display font-bold tracking-tight"
                style={{
                  fontSize: "clamp(40px, 7vw, 92px)",
                  lineHeight: 0.95,
                }}
              >
                {cs.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-2">
                {cs.tags.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-full glass-card font-mono text-[10px] uppercase tracking-widest text-text-dim"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
              {renderHeroMedia()}
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-10 mt-8">
              <GlassCard className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  ["My Role", cs.meta.role],
                  ["Tools", cs.meta.tools],
                  ["Year", cs.meta.year],
                  ["Platform", cs.meta.platform],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim mb-1">
                      {k}
                    </div>
                    <div className="font-display text-[base] text-foreground">
                      {v}
                    </div>
                  </div>
                ))}
              </GlassCard>
            </div>
          </section>

          <article
            className={`relative mx-auto px-6 lg:px-10 py-20 space-y-12 ${
              slug === "credit-card" ? "max-w-6xl" : "max-w-4xl"
            }`}
          >
            <CaseStudyBlocks blocks={cs.blocks} slug={slug} />
          </article>
        </>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-20">
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          className="group block glass-card corner-brackets p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-neon-cyan/60 transition-colors"
        >
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-dim">
              Next Project · {next.number}
            </div>
            <div className="mt-2 font-display text-3xl sm:text-4xl group-hover:text-neon-violet transition-colors">
              {next.title}
            </div>
          </div>
          <ArrowRight
            size={28}
            className="text-neon-cyan group-hover:translate-x-2 transition-transform duration-300"
          />
        </Link>
      </div>

      <Footer />
      <ScrollToTop />
    </div>
  );
}

function CaseStudyBlocks({ blocks, slug }: { blocks: any[]; slug: string }) {
  const skipped = new Set<number>();

  return (
    <>
      {blocks.map((b, i) => {
        if (skipped.has(i)) return null;

        if (slug === "credit-card" && isCreditCardExplorationHeader(b)) {
          skipped.add(i + 1);
          skipped.add(i + 2);
          skipped.add(i + 3);

          return (
            <Reveal key={i}>
              <CreditCardExplorationRow
                title={b.text}
                videoBlock={blocks[i + 1]}
                paragraphs={[blocks[i + 2], blocks[i + 3]].filter(Boolean)}
              />
            </Reveal>
          );
        }

        if (slug === "smartwatch" && isFitnessRingsHeader(b)) {
          skipped.add(i + 1);
          skipped.add(i + 2);

          return (
            <Reveal key={i}>
              <FitnessRingsRow
                title={b.text}
                paragraph={blocks[i + 1]}
                videoBlock={blocks[i + 2]}
              />
            </Reveal>
          );
        }

        if (slug === "smartwatch" && isMusicControlsHeader(b)) {
          skipped.add(i + 1);
          skipped.add(i + 2);

          return (
            <Reveal key={i}>
              <MusicControlsRow
                title={b.text}
                paragraph={blocks[i + 1]}
                videoBlock={blocks[i + 2]}
              />
            </Reveal>
          );
        }

        const wePlayPairs: Record<string, string> = {
          "Sport Selection": "Venue Comparison",
          "Booking Summary": "Confirmation",
        };

        if (
          slug === "we-play" &&
          b?.type === "image" &&
          wePlayPairs[b?.label] &&
          blocks[i + 1]?.type === "image" &&
          blocks[i + 1]?.label === wePlayPairs[b?.label]
        ) {
          skipped.add(i + 1);

          return (
            <Reveal key={i}>
              <SportVenueRow left={b} right={blocks[i + 1]} />
            </Reveal>
          );
        }

        if (
          slug === "we-play" &&
          b?.type === "image" &&
          b?.label === "Home Dashboard" &&
          blocks[i + 1]?.type === "decisions"
        ) {
          skipped.add(i + 1);

          return (
            <Reveal key={i}>
              <DashboardFeaturesRow imageBlock={b} items={blocks[i + 1].items} />
            </Reveal>
          );
        }

        if (slug === "we-play" && b?.type === "h" && b?.text === "Interaction Design") {
          const collected = collectTextVideoRow(blocks, i);
          if (collected) {
            collected.skipIdx.forEach((n) => skipped.add(n));
            return (
              <Reveal key={i}>
                <VideoTextRow
                  title={b.text}
                  paragraphs={collected.paragraphs}
                  videoBlock={collected.videoBlock}
                />
              </Reveal>
            );
          }
        }

        if (slug === "we-play" && b?.type === "h" && b?.text === "Motion Design") {
          const collected = collectTextVideoRow(blocks, i);
          if (collected) {
            collected.skipIdx.forEach((n) => skipped.add(n));
            return (
              <Reveal key={i}>
                <TextVideoRow
                  title={b.text}
                  paragraphs={collected.paragraphs}
                  videoBlock={collected.videoBlock}
                />
              </Reveal>
            );
          }
        }

        return (
          <Reveal key={i}>
            <div className={slug === "credit-card" ? "mx-auto max-w-4xl" : undefined}>
              <BlockRender b={b} slug={slug} idx={i} blocks={blocks} />
            </div>
          </Reveal>
        );
      })}
    </>
  );
}

function collectTextVideoRow(blocks: any[], i: number) {
  let j = i + 1;
  const paragraphs: any[] = [];
  while (blocks[j]?.type === "p") {
    paragraphs.push(blocks[j]);
    j++;
  }
  if (blocks[j]?.type !== "video") return null;

  const skipIdx: number[] = [];
  for (let k = i + 1; k <= j; k++) skipIdx.push(k);

  return { paragraphs, videoBlock: blocks[j], skipIdx };
}

function TextVideoRow({
  title,
  paragraphs,
  videoBlock,
}: {
  title: string;
  paragraphs: any[];
  videoBlock: any;
}) {
  return (
    <section className="glass-card corner-brackets grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(320px,1fr)_minmax(220px,0.7fr)]">
      <div className="flex min-h-[240px] flex-col justify-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
          {videoBlock?.label}
        </div>
        <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight">
          {title}
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="font-body text-lg text-foreground/85 leading-relaxed">
              {p.text}
            </p>
          ))}
        </div>
        {videoBlock?.note && (
          <p className="mt-4 font-body text-sm uppercase tracking-[0.16em] text-text-dim">
            {videoBlock.note}
          </p>
        )}
      </div>

      <div className="flex h-full min-h-[240px] w-full items-center justify-center">
        <video
          src={videoBlock?.slot}
          autoPlay
          muted
          loop
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          style={{ aspectRatio: videoBlock?.aspect }}
          className="block h-full max-h-[420px] w-auto max-w-full rounded-[2.5rem] bg-black object-contain pointer-events-none select-none shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />
      </div>
    </section>
  );
}

function VideoTextRow({
  title,
  paragraphs,
  videoBlock,
}: {
  title: string;
  paragraphs: any[];
  videoBlock: any;
}) {
  return (
    <section className="glass-card corner-brackets grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(220px,0.7fr)_minmax(320px,1fr)]">
      <div className="flex h-full min-h-[240px] w-full items-center justify-center lg:order-1">
        <video
          src={videoBlock?.slot}
          autoPlay
          muted
          loop
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          style={{ aspectRatio: videoBlock?.aspect }}
          className="block h-full max-h-[420px] w-auto max-w-full rounded-[2.5rem] bg-black object-contain pointer-events-none select-none shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        />
      </div>

      <div className="flex min-h-[240px] flex-col justify-center lg:order-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
          {videoBlock?.label}
        </div>
        <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight">
          {title}
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="font-body text-lg text-foreground/85 leading-relaxed">
              {p.text}
            </p>
          ))}
        </div>
        {videoBlock?.note && (
          <p className="mt-4 font-body text-sm uppercase tracking-[0.16em] text-text-dim">
            {videoBlock.note}
          </p>
        )}
      </div>
    </section>
  );
}

function isCreditCardExplorationHeader(b: any) {
  const text = (b?.text || "").toLowerCase();
  return (
    b?.type === "h" &&
    (text.includes("exploration 01") ||
      text.includes("exploration 02") ||
      text.includes("exploration 03"))
  );
}

function isFitnessRingsHeader(b: any) {
  const text = (b?.text || "").toLowerCase();
  return b?.type === "h" && text.includes("fitness progress rings");
}

function FitnessRingsRow({
  title,
  paragraph,
  videoBlock,
}: {
  title: string;
  paragraph: any;
  videoBlock: any;
}) {
  return (
    <section className="glass-card corner-brackets grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(320px,1fr)_minmax(260px,0.75fr)]">
      <div className="flex min-h-[240px] flex-col justify-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
          {videoBlock?.label}
        </div>
        <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight">
          {title}
        </h2>
        {paragraph?.text && (
          <p className="mt-4 font-body text-lg text-foreground/85 leading-relaxed">
            {paragraph.text}
          </p>
        )}
        {videoBlock?.note && (
          <p className="mt-4 font-body text-sm uppercase tracking-[0.16em] text-text-dim">
            {videoBlock.note}
          </p>
        )}
      </div>

      <div className="flex h-full min-h-[240px] w-full items-center justify-center">
        <video
          src={videoBlock?.slot}
          autoPlay
          muted
          loop
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          style={{ aspectRatio: videoBlock?.aspect }}
          className="block h-full max-h-[400px] w-auto max-w-full rounded-xl border border-white/[0.08] bg-[#0C0C0E] object-contain pointer-events-none select-none"
        />
      </div>
    </section>
  );
}

function isMusicControlsHeader(b: any) {
  const text = (b?.text || "").toLowerCase();
  return b?.type === "h" && text.includes("music controls");
}

function MusicControlsRow({
  title,
  paragraph,
  videoBlock,
}: {
  title: string;
  paragraph: any;
  videoBlock: any;
}) {
  return (
    <section className="glass-card corner-brackets grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(260px,0.75fr)_minmax(320px,1fr)]">
      <div className="flex h-full min-h-[240px] w-full items-center justify-center lg:order-1">
        <video
          src={videoBlock?.slot}
          autoPlay
          muted
          loop
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          style={{ aspectRatio: videoBlock?.aspect }}
          className="block h-full max-h-[400px] w-auto max-w-full rounded-xl border border-white/[0.08] bg-[#0C0C0E] object-contain pointer-events-none select-none"
        />
      </div>

      <div className="flex min-h-[240px] flex-col justify-center lg:order-2">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
          {videoBlock?.label}
        </div>
        <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight">
          {title}
        </h2>
        {paragraph?.text && (
          <p className="mt-4 font-body text-lg text-foreground/85 leading-relaxed">
            {paragraph.text}
          </p>
        )}
        {videoBlock?.note && (
          <p className="mt-4 font-body text-sm uppercase tracking-[0.16em] text-text-dim">
            {videoBlock.note}
          </p>
        )}
      </div>
    </section>
  );
}

function SportVenueRow({ left, right }: { left: any; right: any }) {
  const items = [left, right];
  return (
    <section className="glass-card corner-brackets grid grid-cols-2 gap-6 p-6 sm:gap-8 sm:p-8">
      {items.map((b, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
            {b.label}
          </div>
          <div
            className="mt-3 w-full max-w-[220px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E]"
            style={{ aspectRatio: b.aspect }}
          >
            <img
              src={b.slot}
              alt={b.label}
              className="block h-full w-full object-cover"
            />
          </div>
          {b.note && (
            <p className="mt-4 text-center font-body text-sm text-text-dim leading-relaxed">
              {b.note}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}

function DashboardFeaturesRow({
  imageBlock,
  items,
}: {
  imageBlock: any;
  items: string[];
}) {
  return (
    <section className="glass-card corner-brackets grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(220px,0.7fr)_minmax(320px,1fr)]">
      <div className="flex flex-col items-center lg:items-start">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
          {imageBlock.label}
        </div>
        <div
          className="mt-3 w-full max-w-[260px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E]"
          style={{ aspectRatio: imageBlock.aspect }}
        >
          <img
            src={imageBlock.slot}
            alt={imageBlock.label}
            className="block h-full w-full object-contain"
          />
        </div>
        {imageBlock.note && (
          <p className="mt-4 text-center font-body text-sm text-text-dim leading-relaxed lg:text-left">
            {imageBlock.note}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {items.map((d, i) => {
          const [lead, ...rest] = d.split(" — ");
          const desc = rest.join(" — ");
          return (
            <div key={i} className="flex gap-4">
              <div className="font-mono text-xs text-neon-cyan shrink-0 pt-0.5">
                0{i + 1}
              </div>
              <div className="font-body text-sm leading-relaxed">
                <span className="font-display font-semibold text-foreground">
                  {lead}
                </span>
                {desc && <span className="text-foreground/80"> — {desc}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CreditCardExplorationRow({
  title,
  videoBlock,
  paragraphs,
}: {
  title: string;
  videoBlock: any;
  paragraphs: any[];
}) {
  const lowerTitle = title.toLowerCase();
  const isVertical = lowerTitle.includes("vertical");
  const isRotational = lowerTitle.includes("rotational");
  const videoSrc = isVertical
    ? "/credit-card-2.mp4"
    : isRotational
      ? "/credit-card-3.mp4"
      : "/credit-card-1.mp4";
  const mediaFirst = !isVertical;

  const media = (
    <div className="flex h-full min-h-[360px] w-full items-center justify-center lg:min-h-0">
      <video
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        onContextMenu={(e) => e.preventDefault()}
        className="block h-full max-h-[520px] min-h-[360px] w-auto max-w-full rounded-[38px] border border-white/[0.12] object-contain pointer-events-none select-none shadow-[0_24px_70px_rgba(0,0,0,0.5)] lg:min-h-0"
      />
    </div>
  );

  const copy = (
    <div className="glass-card corner-brackets flex min-h-[360px] flex-col justify-center self-stretch p-6 sm:p-8">
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
        {videoBlock?.label}
      </div>
      <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight">
        {title}
      </h2>
      {videoBlock?.note && (
        <p className="mt-4 font-body text-sm uppercase tracking-[0.16em] text-text-dim">
          {videoBlock.note}
        </p>
      )}
      <div className="mt-6 space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="font-body text-lg text-foreground/85 leading-relaxed">
            {p.text}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <section className="grid items-stretch gap-8 lg:grid-cols-[minmax(300px,0.82fr)_minmax(360px,1fr)]">
      {mediaFirst ? (
        <>
          {media}
          {copy}
        </>
      ) : (
        <>
          <div className="lg:order-2">{media}</div>
          <div className="lg:order-1">{copy}</div>
        </>
      )}
    </section>
  );
}

function BlockRender({
  b,
  slug,
  idx,
  blocks,
}: {
  b: any;
  slug: string;
  idx: number;
  blocks: any[];
}) {
  const adaptiveAspect = b.aspect ?? "16/10";

  // -----------------------------------------------------
  // SMARTWATCH PROTOTYPE HIGHLIGHT — keep the frame size,
  // center the video instead of cropping/zooming into it
  // -----------------------------------------------------
  if (slug === "smartwatch" && b.type === "video" && b.slot === "/smartwatch.mp4") {
    return (
      <div className="glass-card corner-brackets mx-auto flex w-full items-center justify-center overflow-hidden px-10 py-3 sm:px-16">
        <div
          className="flex w-full items-center justify-center overflow-hidden rounded-lg bg-[#0C0C0E]"
          style={{ height: 339 }}
        >
          <video
            src={b.slot}
            autoPlay
            muted
            loop
            playsInline
            onContextMenu={(e) => e.preventDefault()}
            className="block h-full w-full object-contain pointer-events-none select-none"
          />
        </div>
      </div>
    );
  }

  // -----------------------------------------------------
  // CREDIT CARD LOGIC
  // -----------------------------------------------------
  if (slug === "credit-card") {
    const targetStr = (b.slot || b.label || "").toLowerCase();
    let activeHeader = "";
    
    for (let i = idx; i >= 0; i--) {
      if (blocks[i].type === "h") {
        activeHeader = (blocks[i].text || "").toLowerCase();
        break;
      }
    }

    if (["image", "video", "custom", "embed"].includes(b.type)) {
      if (b.type === "video" && targetStr.includes("credit-card.mp4")) {
        return (
          <div className="flex w-full justify-center">
            <video
              src="/credit-card.mp4"
              autoPlay
              muted
              loop
              playsInline
              onContextMenu={(e) => e.preventDefault()}
              className="block h-auto max-h-[560px] w-auto max-w-[min(100%,720px)] rounded-[38px] border border-white/[0.12] object-contain pointer-events-none select-none shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
            />
          </div>
        );
      }

      if (activeHeader.includes("horizontal") || targetStr.includes("horizontal")) {
        return (
          <div 
            className="w-full mx-auto group rounded-xl overflow-hidden border border-white/[0.08] bg-[#0C0C0E] px-[5px]"
            style={{ aspectRatio: adaptiveAspect }}
          >
            <video
              src="/credit-card-1.mp4"
              autoPlay
              muted
              loop
              playsInline
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-contain block mx-auto pointer-events-none select-none"
            />
          </div>
        );
      }

      if (activeHeader.includes("vertical") || targetStr.includes("vertical")) {
        return (
          <div 
            className="w-full mx-auto group rounded-xl overflow-hidden border border-white/[0.08] bg-[#0C0C0E] px-[5px]"
            style={{ aspectRatio: adaptiveAspect }}
          >
            <video
              src="/credit-card-2.mp4"
              autoPlay
              muted
              loop
              playsInline
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-contain block mx-auto pointer-events-none select-none"
            />
          </div>
        );
      }

      if (activeHeader.includes("rotational") || targetStr.includes("rotational")) {
        return (
          <div 
            className="w-full mx-auto group rounded-xl overflow-hidden border border-white/[0.08] bg-[#0C0C0E] px-[5px]"
            style={{ aspectRatio: adaptiveAspect }}
          >
            <video
              src="/credit-card-3.mp4"
              autoPlay
              muted
              loop
              playsInline
              onContextMenu={(e) => e.preventDefault()}
              className="w-full h-full object-contain block mx-auto pointer-events-none select-none"
            />
          </div>
        );
      }

      return null;
    }
  }

  // -----------------------------------------------------
  // WE-PLAY LOGIC
  // -----------------------------------------------------
  if (slug === "we-play") {
    const targetStr = (b.slot || b.label || "").toLowerCase();
    let activeHeader = "";
    for (let i = idx; i >= 0; i--) {
      if (blocks[i].type === "h") {
        activeHeader = (blocks[i].text || "").toLowerCase();
        break;
      }
    }

    if (targetStr.includes("competitor") && ["image", "custom"].includes(b.type)) {
      return (
        <div
          className="w-full mx-auto grid place-items-center"
          style={{ aspectRatio: "16 / 10" }}
        >
          <img
            src="/pic.png"
            alt="WePlay Competitive Landscape Benchmark Analysis Matrix"
            className="w-full h-full object-contain block select-none pointer-events-none mx-auto"
          />
        </div>
      );
    }
    
    if (["image", "video", "custom", "embed"].includes(b.type)) {
      if (activeHeader.includes("architecture") || activeHeader.includes("ia") || targetStr.includes("architecture") || targetStr.includes("ia")) {
        return (
          <div className="w-full flex flex-col gap-6 font-mono my-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon-cyan">
              Visual Architecture · Navigation & Functional Hierarchy Mapping
            </div>
            <div className="w-full mx-auto rounded-xl overflow-hidden border border-white/[0.08] bg-[#0C0C0E]">
              <img
                src="/weplay-ia.png" 
                alt="WePlay Information Architecture"
                className="w-full h-auto object-contain block mx-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (target.src.endsWith(".png")) {
                    target.src = "/weplay-ia.jpg";
                  }
                }}
              />
            </div>
          </div>
        );
      }

      if (activeHeader.includes("low fidelity") || targetStr.includes("low")) {
        return (
          <div 
            className="w-full mx-auto group rounded-xl overflow-hidden border border-white/[0.08] bg-[#0C0C0E]"
            style={{ aspectRatio: adaptiveAspect }}
          >
            <img
              src="/Lo-fi.png"
              alt="Low Fidelity Wireframes"
              className="w-full h-full object-contain block mx-auto"
            />
          </div>
        );
      }

      if (activeHeader.includes("high fidelity") || targetStr.includes("high")) {
        return (
          <div 
            className="w-full mx-auto group rounded-xl overflow-hidden border border-white/[0.08] bg-[#0C0C0E]"
            style={{ aspectRatio: adaptiveAspect }}
          >
            <img
              src="/Hi-fi.png"
              alt="High Fidelity Wireframes"
              className="w-full h-full object-contain block mx-auto"
            />
          </div>
        );
      }

      if (b.label === "Home Dashboard" || targetStr.includes("home-dashboard")) {
        return (
          <div
            className="mx-auto w-full max-w-[300px] overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E]"
            style={{ aspectRatio: adaptiveAspect }}
          >
            <img
              src={b.slot}
              alt={b.label}
              className="w-full h-full object-contain block mx-auto"
            />
          </div>
        );
      }

      if (activeHeader.includes("final product") || activeHeader.includes("preview") || targetStr.includes("final")) {
        return (
          <div 
            className="w-full mx-auto group rounded-xl overflow-hidden border border-white/[0.08] bg-[#0C0C0E]"
            style={{ aspectRatio: adaptiveAspect }}
          >
            <img
              src="/Final-Product-Preview.png"
              alt="Final Product Preview"
              className="w-full h-full object-contain block mx-auto"
            />
          </div>
        );
      }
    }
  }

  // -----------------------------------------------------
  // FLEXITY LOGIC
  // -----------------------------------------------------
  if (slug === "flexity") {
    if (
      b.label?.toLowerCase().includes("logo") ||
      b.slot?.toLowerCase().includes("logo")
    ) {
      return (
        <div className="w-full flex flex-col gap-3">
          <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E] mx-auto aspect-video">
            <video
              src="/flexity-logo.mp4"
              onContextMenu={(e) => e.preventDefault()}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover block select-none pointer-events-none mx-auto"
            />
          </div>
        </div>
      );
    }

    if (
      b.slot === "PASTE_FLEXITY_HOMEPAGE_SCREENSHOT" ||
      b.label?.toLowerCase().includes("homepage")
    ) {
      return (
        <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E] mx-auto aspect-video">
          <img
            src="/flexity-home.png"
            alt="Flexity Homepage Layout Showcase"
            className="w-full h-full object-cover block"
          />
        </div>
      );
    }

    if (
      b.slot === "PASTE_FLEXITY_COLOR_SYSTEM" ||
      b.label?.toLowerCase().includes("color system")
    ) {
      return null;
    }

    if (
      b.slot === "PASTE_FLEXITY_HIGHLIGHT_REEL" ||
      b.label?.toLowerCase().includes("highlight reel")
    ) {
      return (
        <div className="w-full flex flex-col gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
            Design Realization · High-Fidelity Prototype Loop
          </div>
          <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E] mx-auto aspect-video">
            <video
              src="/flexity.mp4"
              onContextMenu={(e) => e.preventDefault()}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover block mx-auto select-none pointer-events-none"
            />
          </div>
        </div>
      );
    }

    if (b.type === "figma" || b.label?.toLowerCase().includes("prototype embed")) {
      return (
        <div className="w-full flex flex-col gap-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-cyan">
            Design Realization · Flexity Figma Prototype
          </div>
          <div className="glass-card corner-brackets p-3">
            <iframe
              src="https://embed.figma.com/proto/eyKCK4XkjNu9S9lTvCuMEp/Flexity?node-id=308-2905&p=f&viewport=754%2C468%2C0.06&scaling=scale-down&content-scaling=fixed&starting-point-node-id=434%3A645&page-id=0%3A1&embed-host=share"
              className="w-full rounded-lg select-none"
              style={{
                aspectRatio: "16 / 10",
                filter: "brightness(0.9) contrast(1.05)",
              }}
              allowFullScreen
            />
          </div>
        </div>
      );
    }

    if (b.type === "decisions") {
      return (
        <div className="w-full flex flex-col gap-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-neon-cyan">
            Visual Architecture · Color System & Visual Design Analysis
          </div>
          <div
            className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E]"
            style={{ aspectRatio: "16 / 10" }}
          >
            <img
              src="/flexity-color-system.png"
              alt="FLEXITY STREAMING APP | COLOR SYSTEM & VISUAL DESIGN ANALYSIS"
              className="w-full h-full object-contain block select-none pointer-events-none mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (target.src.endsWith(".png")) {
                  target.src = "/flexity-color-system.jpg";
                }
              }}
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-2">
            {b.items.map((d: string, i: number) => (
              <div key={i} className="glass-card corner-brackets p-5">
                <div className="font-mono text-xs text-neon-cyan mb-2">
                  0{i + 1}
                </div>
                <div className="font-body text-foreground/90 text-sm leading-relaxed">
                  {d}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    let isInsidePhase01 = false;
    let isInsidePhase02 = false;
    let isInsidePhase03 = false;
    let phase01MediaCount = 0;
    let targetHeaderIdx = -1;

    for (let i = idx; i >= 0; i--) {
      if (blocks[i].type === "h") {
        if (blocks[i].text?.toLowerCase().includes("phase 01")) {
          isInsidePhase01 = true;
          targetHeaderIdx = i;
        }
        if (blocks[i].text?.toLowerCase().includes("phase 02")) {
          isInsidePhase02 = true;
          targetHeaderIdx = i;
        }
        if (blocks[i].text?.toLowerCase().includes("phase 03")) {
          isInsidePhase03 = true;
          targetHeaderIdx = i;
        }
        break;
      }
    }

    if (isInsidePhase01 && targetHeaderIdx !== -1) {
      for (let j = targetHeaderIdx + 1; j < idx; j++) {
        if (["video", "image", "figma", "embed"].includes(blocks[j].type)) {
          phase01MediaCount++;
        }
      }

      if (["video", "image", "figma", "embed"].includes(b.type)) {
        if (phase01MediaCount === 0) {
          return (
            <div className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E] mx-auto group aspect-video">
              <video
                src="/flexity-logo.mp4"
                onContextMenu={(e) => e.preventDefault()}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover block"
              />
            </div>
          );
        } else if (phase01MediaCount === 1) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mx-auto">
              {["/flexity-cover.png", "/flexity-cover2.png", "/flexity-cover3.png"].map(
                (src, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="overflow-hidden rounded-xl border border-white/[0.08] bg-black/20 aspect-video"
                  >
                    <img
                      src={src}
                      alt={`Flexity Phase 01 Composition ${imgIdx + 1}`}
                      className="w-full h-full object-cover block"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.endsWith(".png")) {
                          target.src = src.replace(".png", ".jpg");
                        }
                      }}
                    />
                  </div>
                )
              )}
            </div>
          );
        } else {
          return null;
        }
      }
    }

    if (isInsidePhase02 && ["video", "image", "figma", "embed"].includes(b.type)) {
      return (
        <div
          className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E] mx-auto group"
          style={{ aspectRatio: "1130 / 281" }}
        >
          <video
            src="/flexity-carousel.mp4"
            onContextMenu={(e) => e.preventDefault()}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain block mx-auto"
          />
        </div>
      );
    }

    if (isInsidePhase03 && ["video", "image", "figma", "embed"].includes(b.type)) {
      return (
        <div
          className="w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E] mx-auto group"
          style={{ aspectRatio: "1153 / 527" }}
        >
          <video
            src="/flexity-favs.mp4"
            onContextMenu={(e) => e.preventDefault()}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-contain block mx-auto"
          />
        </div>
      );
    }
  }

  // -----------------------------------------------------
  // DEFAULT LOGIC
  // -----------------------------------------------------
  switch (b.type) {
    case "h":
      return (
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight mt-4 mb-2">
          {b.text}
        </h2>
      );

    case "p":
      return (
        <p className="font-body text-lg text-foreground/85 leading-relaxed">
          {b.text}
        </p>
      );

    case "quote":
      return (
        <blockquote className="font-display font-medium text-2xl sm:text-3xl text-center text-foreground/95 leading-snug py-8 border-y border-glass-border">
          <span className="neon-text-violet">"</span>
          {b.text}
          <span className="neon-text-violet">"</span>
        </blockquote>
      );

    case "custom":
      if (b.component === "weplay-personas") return <Personas />;
      if (b.component === "weplay-empathy") return <EmpathyMap />;
      if (b.component === "weplay-journey") return <JourneyMap />;
      return null;

    case "problem":
      return (
        <div
          className="glass-card corner-brackets p-6 sm:p-8 border-l-4"
          style={{ borderLeftColor: "var(--neon-violet)" }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-neon-violet mb-3">
            Problem
          </div>
          <p className="font-body text-foreground/90 leading-relaxed">
            {b.text}
          </p>
        </div>
      );

    case "stepper":
      return (
        <div className="flex flex-wrap gap-3 justify-center">
          {b.steps.map((s: string, i: number) => (
            <div key={i} className="flex items-center gap-3">
              <span
                className="px-4 py-2 rounded-full glass-card font-mono text-xs uppercase tracking-widest"
                style={{ color: "var(--text-dim)" }}
              >
                {s}
              </span>
              {i < b.steps.length - 1 && (
                <span className="text-text-dim font-mono">→</span>
              )}
            </div>
          ))}
        </div>
      );

    case "decisions":
      return (
        <div className="grid gap-4 sm:grid-cols-2">
          {b.items.map((d: string, i: number) => (
            <div key={i} className="glass-card corner-brackets p-5">
              <div className="font-mono text-xs text-neon-cyan mb-2">
                0{i + 1}
              </div>
              <div className="font-body text-foreground/90 text-sm leading-relaxed">
                {d}
              </div>
            </div>
          ))}
        </div>
      );

    case "image":
      return b.slot.startsWith("http") || b.slot.startsWith("/") ? (
        <div
          className="w-full mx-auto"
          style={{ aspectRatio: adaptiveAspect }}
        >
          <img
            src={b.slot}
            alt={b.label}
            className="w-full h-full object-cover block"
          />
        </div>
      ) : (
        <UploadSlot
          kind="PHOTO"
          label={b.label}
          note={b.note}
          slotName={b.slot}
          aspect={adaptiveAspect}
        />
      );

    case "video":
      return b.slot.startsWith("http") || b.slot.startsWith("/") ? (
        <div
          className="w-full mx-auto group"
          style={{ aspectRatio: adaptiveAspect }}
        >
          <video
            src={b.slot}
            onContextMenu={(e) => e.preventDefault()}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover block"
          />
        </div>
      ) : (
        <UploadSlot
          kind="VIDEO"
          label={b.label}
          note={b.note}
          slotName={b.slot}
          aspect={adaptiveAspect}
        />
      );

    case "embed":
      return (
        <StreamableEmbed
          src={b.url}
          title={b.label}
          aspect={adaptiveAspect}
          device="iphone"
        />
      );

    case "figma":
      if (b.slot?.startsWith("http")) {
        return (
          <div className="glass-card corner-brackets p-3">
            <iframe
              src={b.slot}
              title="Figma Prototype Embed"
              className="w-full rounded-lg border border-white/[0.08] bg-black"
              style={{ aspectRatio: "16 / 9" }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        );
      }

      return (
        <div className="glass-card corner-brackets p-3">
          <UploadSlot
            kind="FIGMA"
            label="Figma Prototype Embed"
            note="Replace this with your Figma embed iframe (Share → Embed → Copy src)."
            slotName={b.slot}
            aspect="16/10"
          />
        </div>
      );
  }
}
