import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/portfolio/Reveal";

/* ---------------- Helpers ---------------- */

function SectionHeader({ code, title }: { code: string; title: string }) {
  return (
    <div className="w-full">
      <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-steel">
        [ {code} ] — {title}
      </div>
      <div
        className="mt-3 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(110,139,168,0.35), rgba(201,168,124,0.25), transparent)",
        }}
      />
    </div>
  );
}

/* ---------------- 1. Interview Insights ---------------- */

function StatBadge({ text }: { text: string }) {
  return (
    <div
      className="glass-card px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/90"
      style={{ borderColor: "rgba(110,139,168,0.4)" }}
    >
      [ {text} ]
    </div>
  );
}

function QuoteCard({ quote, label, delay }: { quote: string; label: string; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="glass-card corner-brackets p-6 h-full relative">
        <div
          className="absolute top-2 left-3 font-display text-[48px] leading-none text-accent-steel/70 select-none"
          aria-hidden
        >
          “
        </div>
        <p className="mt-8 font-body italic text-[15px] text-foreground/90 leading-relaxed">
          {quote}
        </p>
        <div className="mt-5 font-mono text-[11px] uppercase tracking-widest text-text-dim">
          — {label}
        </div>
      </div>
    </Reveal>
  );
}

function InterviewInsights() {
  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <StatBadge text="5/5 users abandoned a booking attempt due to lack of info" />
          <StatBadge text="0/5 had found a single platform for multiple sports" />
          <StatBadge text="5/5 said they'd switch to an app immediately if one existed" />
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuoteCard
          delay={0}
          quote="I searched Google Maps, called four places. Two didn't answer. One said just come and check. I've driven 20 minutes only to find the courts were full."
          label="International player, Austin TX"
        />
        <QuoteCard
          delay={100}
          quote="I didn't know there were six badminton courts in my city. There's no single place to search — what sports exist, where, how much. You just don't know."
          label="Immigrant player, Dallas TX"
        />
        <QuoteCard
          delay={200}
          quote="Back home we had apps for this. Here it feels like 2005. You have to physically show up just to check if a slot is open. If there was an app I'd use it every single week."
          label="International player, Houston TX"
        />
      </div>
    </div>
  );
}

/* ---------------- 2. User Personas ---------------- */

type Persona = {
  name: string;
  role: string;
  origin: string;
  color: string;
  avatar: string;
  isSvg?: boolean;
  quote: string;
  goals: string[];
  frustrations: string[];
  bars: { label: string; pct: number; value: string }[];
};

function StatBar({ label, pct, value, color }: { label: string; pct: number; value: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setFill(pct);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [pct]);
  return (
    <div ref={ref} className="grid grid-cols-[110px_1fr_90px] items-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-text-dim">{label}</span>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[1200ms] ease-out"
          style={{ width: `${fill}%`, background: color }}
        />
      </div>
      <span className="font-mono text-[10px] text-foreground/80 text-right">{value}</span>
    </div>
  );
}

function PersonaCard({ p, delay }: { p: Persona; delay: number }) {
  return (
    <Reveal delay={delay}>
      <div className="glass-card corner-brackets overflow-hidden h-full flex flex-col">
        <div
          className="px-6 py-4"
          style={{ background: `${p.color}22` }}
        >
          <div className="font-display font-bold text-[22px] tracking-tight">{p.name}</div>
          <div className="font-mono text-[11px] text-text-dim mt-1">{p.role}</div>
          <div className="font-mono text-[11px] text-text-dim/80">{p.origin}</div>
        </div>

        <div className="flex justify-center pt-6">
          <div
            className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-black/20"
            style={{ border: `1.5px solid ${p.color}` }}
          >
            {p.isSvg ? (
              <svg viewBox="0 0 100 100" className="w-full h-full object-cover">
                <defs>
                  <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8D5B4C" />
                    <stop offset="100%" stopColor="#5C3A21" />
                  </linearGradient>
                  <linearGradient id="hair" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1A1A1A" />
                    <stop offset="100%" stopColor="#0D0D0D" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="50" fill={`${p.color}08`} />
                <path d="M20,90 C20,70 35,65 50,65 C65,65 80,70 80,90" fill="#2E3A4E" />
                <path d="M42,65 L50,78 L58,65" fill="url(#skin)" />
                <path d="M44,65 L50,74 L56,65" fill="#FFFFFF" />
                <rect x="43" y="50" width="14" height="15" fill="url(#skin)" />
                <ellipse cx="50" cy="42" rx="17" ry="21" fill="url(#skin)" />
                <path d="M31,38 C31,20 42,15 52,15 C64,15 69,22 69,35 C66,32 62,31 56,33 C52,29 42,28 36,34 C34,35 32,37 31,38 Z" fill="url(#hair)" />
                <path d="M37,32 Q42,29 46,32" stroke="url(#hair)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M54,32 Q58,29 63,32" stroke="url(#hair)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <circle cx="42" cy="36" r="2" fill="#1A1A1A" />
                <circle cx="58" cy="36" r="2" fill="#1A1A1A" />
                <path d="M50,36 L48,44 L52,44" fill="none" stroke="#4A3125" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M44,50 Q50,55 56,50" fill="none" stroke="#4A3125" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <img 
                src={p.avatar} 
                alt={p.name} 
                className="w-full h-full object-cover block" 
              />
            )}
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col gap-5">
          <div
            className="pl-4 italic font-body text-[14px] text-foreground/90"
            style={{ borderLeft: `2px solid ${p.color}` }}
          >
            "{p.quote}"
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim mb-2">
              Goals
            </div>
            <ul className="space-y-1.5">
              {p.goals.map((g) => (
                <li key={g} className="font-body text-[13px] text-foreground/85">
                  • {g}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim mb-2">
              Frustrations
            </div>
            <ul className="space-y-1.5">
              {p.frustrations.map((g) => (
                <li key={g} className="font-body text-[13px] text-foreground/85">
                  • {g}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 mt-auto pt-2">
            {p.bars.map((b) => (
              <StatBar key={b.label} label={b.label} pct={b.pct} value={b.value} color={p.color} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

const PERSONAS: Persona[] = [
  {
    name: "ARJUN MEHTA",
    role: "Software Engineer · Austin, TX",
    origin: "Originally from Hyderabad, India",
    color: "#A8BFC9",
    avatar: "",
    isSvg: true,
    quote: "Back home I had Playo. Here I have Google and hope.",
    goals: [
      "Find courts near him with real-time availability",
      "Book without calling or commuting just to check",
      "Discover new venues beyond the one he accidentally found",
    ],
    frustrations: [
      "No real-time availability shown anywhere online",
      "Venues don't answer calls or don't know their own slots",
      "Forced into memberships when he just wants one session",
    ],
    bars: [
      { label: "Tech Comfort", pct: 92, value: "High" },
      { label: "Plays / week", pct: 70, value: "3x per week" },
      { label: "App Adoption", pct: 98, value: "Very High" },
    ],
  },
  {
    name: "MARCUS JOHNSON",
    role: "Project Manager · Dallas, TX",
    origin: "Originally from Atlanta, USA",
    color: "#C9B097",
    avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
    quote: "I want to try new sports but I have no idea where to even start looking.",
    goals: [
      "Discover what sports venues exist near him",
      "Read reviews before committing to a venue",
      "See pricing upfront without visiting in person",
    ],
    frustrations: [
      "Every sport has a different website — or no website at all",
      "No way to compare multiple venues in one place",
      "Booking feels like an administrative task, not something fun",
    ],
    bars: [
      { label: "Tech Comfort", pct: 75, value: "Moderate-High" },
      { label: "Plays / week", pct: 40, value: "Occasional" },
      { label: "App Adoption", pct: 68, value: "Moderate" },
    ],
  },
];

export function Personas() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {PERSONAS.map((p, i) => (
        <PersonaCard key={p.name} p={p} delay={i * 120} />
      ))}
    </div>
  );
}

/* ---------------- 3. Empathy Map ---------------- */

export function EmpathyMap() {
  const quads: { title: string; items: string[] }[] = [
    {
      title: "THINKS",
      items: [
        '"There has to be a better way"',
        '"I know there are courts near me but I can\'t find them"',
        '"I\'m wasting my weekend doing research instead of playing"',
      ],
    },
    {
      title: "FEELS",
      items: [
        "Frustrated by wasted commutes to check availability",
        "Confused about what sports venues exist near him",
        "Excited when he finally finds somewhere that works",
      ],
    },
    {
      title: "SAYS",
      items: [
        '"I had Playo back home — why is there nothing here?"',
        '"I called and no one picked up. I just gave up."',
        '"If there was an app I\'d use it every week."',
      ],
    },
    {
      title: "DOES",
      items: [
        'Searches Google Maps for "badminton near me"',
        "Calls venues and hangs up after no answer",
        "Relies on word of mouth from coworkers",
        "Goes to the same single court because it's the only one he found",
      ],
    },
  ];
  return (
    <Reveal>
      <div className="glass-card corner-brackets p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
          {quads.map((q, i) => (
            <div
              key={q.title}
              className={`p-5 ${i < 2 ? "sm:border-b sm:border-white/[0.08]" : ""}`}
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-steel mb-3">
                {q.title}
              </div>
              <ul className="space-y-2">
                {q.items.map((it) => (
                  <li key={it} className="font-body text-[13px] text-foreground/80">
                    • {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center font-display text-base">
          ARJUN MEHTA — <span className="text-accent-steel">"I just want to play"</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- 4. Journey Map ---------------- */

type Row = {
  stage: string;
  actions: string;
  thoughts: string;
  feelings: string;
  emotion: string;
  tint: "neutral" | "bad" | "good";
};

const BEFORE_ROWS: Row[] = [
  { stage: "Awareness", actions: "Decides he wants to play this weekend", thoughts: '"This should be easy"', feelings: "Excited", emotion: "😊", tint: "neutral" },
  { stage: "Search", actions: "Searches Google Maps, visits random outdated websites", thoughts: '"Why do none of these have websites?"', feelings: "Confused, Overwhelmed", emotion: "😕", tint: "bad" },
  { stage: "Contact", actions: "Calls 3-4 venues, tries Instagram pages", thoughts: '"No one answers. What do I do now?"', feelings: "Frustrated, Annoyed", emotion: "😤", tint: "bad" },
  { stage: "Booking", actions: "Drives to venue to check in person", thoughts: '"I could have done this in 2 minutes on an app"', feelings: "Resigned, Stressed", emotion: "😞", tint: "bad" },
  { stage: "Playing", actions: "Finally plays — 2+ hours later than planned", thoughts: '"I\'m not doing that process again next weekend"', feelings: "Relieved but exhausted", emotion: "😌", tint: "neutral" },
];

const AFTER_ROWS: Row[] = [
  { stage: "Open App", actions: "Opens We Play, sees recent slots on home screen", thoughts: '"My last court is right here"', feelings: "Comfortable", emotion: "😊", tint: "good" },
  { stage: "Discover", actions: "Browses sport categories, sees venues near him", thoughts: '"I didn\'t know there were 6 courts near me"', feelings: "Delighted", emotion: "😃", tint: "good" },
  { stage: "Select", actions: "Picks venue, reads reviews, checks price", thoughts: '"This has reviews and the price is fair"', feelings: "Confident", emotion: "😌", tint: "good" },
  { stage: "Book", actions: "Selects time slot, sees breakdown, pays in-app", thoughts: '"Done in under 2 minutes"', feelings: "Satisfied", emotion: "😊", tint: "good" },
  { stage: "Playing", actions: "Shows up, court is ready", thoughts: '"I\'m coming back every week"', feelings: "Happy", emotion: "🏸", tint: "good" },
];

function JourneyTable({ rows }: { rows: Row[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr>
            {["Stage", "Actions", "Thoughts", "Feelings", "Emotion"].map((h) => (
              <th
                key={h}
                className="text-left font-mono text-[11px] uppercase tracking-widest text-text-dim px-4 py-3 border-b border-white/[0.08]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const bg =
              r.tint === "bad"
                ? "rgba(255,100,100,0.04)"
                : r.tint === "good"
                  ? "rgba(100,255,150,0.04)"
                  : "transparent";
            return (
              <tr
                key={r.stage + i}
                style={{
                  background: bg,
                  animation: `fade-up 0.5s ease-out ${i * 80}ms both`,
                }}
              >
                <td className="px-4 py-4 font-display font-bold text-accent-steel text-sm border-b border-white/[0.05]">
                  {r.stage}
                </td>
                <td className="px-4 py-4 font-body text-[13px] text-foreground/85 border-b border-white/[0.05]">
                  {r.actions}
                </td>
                <td className="px-4 py-4 font-body text-[13px] text-foreground/80 border-b border-white/[0.05] italic">
                  {r.thoughts}
                </td>
                <td className="px-4 py-4 font-body text-[13px] text-foreground/80 border-b border-white/[0.05]">
                  {r.feelings}
                </td>
                <td className="px-4 py-4 text-[20px] text-center border-b border-white/[0.05]">
                  {r.emotion}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function JourneyMap() {
  const [tab, setTab] = useState<"before" | "after">("before");
  return (
    <Reveal>
      <div className="glass-card corner-brackets p-4 sm:p-6">
        <div className="flex gap-2 mb-5">
          {(["before", "after"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all"
              style={
                tab === t
                  ? {
                      background: "rgba(110,139,168,0.18)",
                      border: "1px solid rgba(110,139,168,0.6)",
                      color: "var(--accent-steel)",
                    }
                  : {
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "var(--text-dim)",
                    }
              }
            >
              {t === "before" ? "Before We Play" : "After We Play"}
            </button>
          ))}
        </div>
        <JourneyTable rows={tab === "before" ? BEFORE_ROWS : AFTER_ROWS} />
      </div>
    </Reveal>
  );
}

/* ---------------- 5. How Might We ---------------- */

function HMW() {
  const cards = [
    "HMW make it effortless for any player to discover ALL sports venues near them — not just the ones with good Google presence?",
    "HMW let users check real-time court availability without calling or physically visiting the venue?",
    "HMW make the booking experience feel as energizing as the sport itself?",
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((q, i) => (
        <Reveal key={i} delay={i * 100}>
          <div className="glass-card corner-brackets p-6 h-full relative flex flex-col">
            <div className="font-display font-bold text-[36px] leading-none text-accent-steel mb-4">
              HMW
            </div>
            <p className="font-body text-[16px] text-foreground/90 leading-relaxed flex-1">
              {q.replace(/^HMW\s/, "")}
            </p>
            <div
              className="mt-5 h-px w-full"
              style={{ background: "linear-gradient(90deg, var(--accent-steel), transparent)" }}
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------- 6. Competitive Intelligence & Research ---------------- */

function CompetitorsSection() {
  return (
    <Reveal>
      <div className="w-full">
        <SectionHeader code="COMPETITOR RESEARCH" title="Market Landscape Architecture" />
        <div 
          className="mt-8 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#0C0C0E] grid place-items-center"
          style={{ aspectRatio: "16 / 10" }}
        >
          <img 
            src="/pic.png" 
            alt="WePlay Competitors Benchmarking Landscape Matrix Diagram" 
            className="w-full h-full object-contain block select-none pointer-events-none mx-auto"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.endsWith(".png")) {
                target.src = "/pic.jpg";
              } else if (target.src.endsWith(".jpg")) {
                target.src = "/pic.jpeg";
              } else if (target.src.endsWith(".jpeg")) {
                target.src = "/pic.webp";
              }
            }}
          />
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- 7. Information Architecture ---------------- */

function SitemapNode({
  label,
  level = 2,
  root = false,
}: {
  label: string;
  level?: 1 | 2;
  root?: boolean;
}) {
  return (
    <div
      className="glass-card px-3 py-1.5 font-mono text-center transition-colors hover:border-accent-steel/60"
      style={{
        borderRadius: 8,
        fontSize: level === 1 ? 12 : 10,
        fontWeight: level === 1 ? 700 : 400,
        color: root
          ? "var(--accent-steel)"
          : level === 1
            ? "var(--foreground)"
            : "var(--text-dim)",
        borderColor: root ? "rgba(110,139,168,0.6)" : undefined,
      }}
    >
      {label}
    </div>
  );
}

function Sitemap() {
  const branches: { l1: string; children: string[] }[] = [
    { l1: "ONBOARDING", children: ["Launch", "Welcome", "Login"] },
    { l1: "HOME", children: ["Recent Slots", "Featured Venues"] },
    {
      l1: "BOOK",
      children: ["Sport Select", "Venue List", "Slot Select", "Summary", "Payment", "Confirmation"],
    },
    { l1: "LEARNING", children: ["Find Coach", "Learn Sport", "My Progress"] },
    { l1: "PROFILE", children: ["My Bookings", "Favourites", "Settings"] },
  ];

  return (
    <Reveal>
      <div className="glass-card corner-brackets p-6 sm:p-10">
        <div className="hidden md:flex flex-col items-center gap-8">
          <SitemapNode label="WE PLAY APP" level={1} root />
          <div className="w-px h-6 bg-white/15" />
          <div className="grid grid-cols-5 gap-4 w-full">
            {branches.map((b) => (
              <div key={b.l1} className="flex flex-col items-center gap-3">
                <SitemapNode label={b.l1} level={1} />
                <div className="w-px h-4 bg-white/15" />
                <div className="flex flex-col items-center gap-2 w-full">
                  {b.children.map((c) => (
                    <SitemapNode key={c} label={c} level={2} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:hidden">
          <div className="font-mono text-[12px] font-bold text-accent-steel mb-3">WE PLAY APP</div>
          <ul className="space-y-3">
            {branches.map((b) => (
              <li key={b.l1}>
                <div className="font-mono text-[11px] font-bold text-foreground">{b.l1}</div>
                <ul className="pl-4 mt-1.5 space-y-1 border-l border-white/10">
                  {b.children.map((c) => (
                    <li key={c} className="font-mono text-[10px] text-text-dim pl-3">
                      — {c}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

/* ---------------- 8. Lo-Fi Wireframes ---------------- */

const wireBar = "rgba(255,255,255,0.1)";
const wireFaint = "rgba(255,255,255,0.06)";

function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3 flex-shrink-0">
      <div
        style={{
          width: 180,
          border: "2px solid rgba(255,255,255,0.15)",
          borderRadius: 24,
          background: "#0C0C0E",
          padding: 8,
        }}
      >
        <div className="h-[4px] w-12 mx-auto rounded-full" style={{ background: wireFaint }} />
        <div className="mt-2 flex flex-col gap-2" style={{ minHeight: 320 }}>
          {children}
        </div>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">{label}</div>
    </div>
  );
}

const Bar = ({ h = 8, w = "100%", bg = wireBar, mt = 0 }: { h?: number; w?: string | number; bg?: string; mt?: number }) => (
  <div style={{ height: h, width: w, background: bg, borderRadius: 2, marginTop: mt }} />
);

function WireHome() {
  return (
    <PhoneFrame label="HOME SCREEN">
      <div className="flex items-center justify-between">
        <Bar h={10} w={14} />
        <Bar h={10} w={40} />
        <Bar h={10} w={14} />
      </div>
      <Bar h={14} w="60%" />
      <div className="font-mono text-[7px] text-text-dim/60 mt-1">RECENT SLOTS</div>
      <div className="flex gap-1.5">
        <Bar h={36} w="50%" />
        <Bar h={36} w="50%" />
      </div>
      <div className="font-mono text-[7px] text-text-dim/60 mt-1">BROWSE SPORTS</div>
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <Bar key={i} h={22} bg={wireFaint} />
        ))}
      </div>
      <div className="font-mono text-[7px] text-text-dim/60 mt-1">VENUES NEAR YOU</div>
      <div className="flex gap-1.5">
        <Bar h={50} w="50%" />
        <Bar h={50} w="50%" />
      </div>
      <div className="mt-auto flex justify-around pt-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: wireBar }} />
        ))}
      </div>
    </PhoneFrame>
  );
}

function WireSlot() {
  return (
    <PhoneFrame label="SLOT SELECTION">
      <div className="flex items-center gap-2">
        <Bar h={8} w={10} />
        <Bar h={10} w="55%" />
      </div>
      <div className="flex gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Bar key={i} h={14} w="30%" bg={i === 1 ? wireBar : wireFaint} />
        ))}
      </div>
      <div className="grid grid-cols-6 gap-1 mt-1">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: 14,
              background: [9, 16].includes(i) ? "rgba(110,139,168,0.5)" : wireFaint,
              borderRadius: 2,
            }}
          />
        ))}
      </div>
      <div className="font-mono text-[7px] text-text-dim/60 mt-1">MORNING</div>
      <div className="grid grid-cols-4 gap-1">
        {[1, 1, 0, 0].map((on, i) => (
          <Bar key={i} h={12} bg={on ? wireBar : wireFaint} />
        ))}
      </div>
      <div className="font-mono text-[7px] text-text-dim/60 mt-1">AFTERNOON</div>
      <div className="grid grid-cols-4 gap-1">
        {[1, 1, 1, 0].map((on, i) => (
          <Bar key={i} h={12} bg={on ? wireBar : wireFaint} />
        ))}
      </div>
      <div className="mt-auto" style={{ background: "rgba(110,139,168,0.4)", height: 24, borderRadius: 4 }} />
      <div className="flex justify-around pt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: wireBar }} />
        ))}
      </div>
    </PhoneFrame>
  );
}

function WireSummary() {
  return (
    <PhoneFrame label="BOOKING SUMMARY">
      <div className="flex items-center gap-2">
        <Bar h={8} w={10} />
        <Bar h={10} w="55%" />
      </div>
      <Bar h={12} w="80%" mt={4} />
      <Bar h={8} w="50%" bg={wireFaint} />
      <div className="h-px bg-white/10 my-1" />
      {["Date", "Time", "Duration"].map((l) => (
        <div key={l} className="flex justify-between items-center">
          <Bar h={8} w={32} bg={wireFaint} />
          <Bar h={8} w={50} />
        </div>
      ))}
      <div className="font-mono text-[7px] text-text-dim/60 mt-1">PRICE BREAKDOWN</div>
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex justify-between items-center">
          <Bar h={7} w={40} bg={wireFaint} />
          <Bar h={7} w={28} bg={wireFaint} />
        </div>
      ))}
      <div className="h-px bg-white/10 my-1" />
      <div className="flex justify-between items-center">
        <Bar h={10} w={36} />
        <Bar h={10} w={40} />
      </div>
      <div className="mt-auto" style={{ background: "rgba(110,139,168,0.4)", height: 24, borderRadius: 4 }} />
    </PhoneFrame>
  );
}

function Wireframes() {
  return (
    <div>
      <Reveal>
        <div className="font-mono text-[11px] uppercase tracking-widest text-text-dim mb-6 text-center">
          Lo-Fidelity Wireframes — Layout decisions before visual design
        </div>
      </Reveal>
      <Reveal>
        <div className="flex gap-6 justify-center overflow-x-auto pb-4 px-2 no-scrollbar">
          <WireHome />
          <WireSlot />
          <WireSummary />
        </div>
      </Reveal>
    </div>
  );
}

/* ---------------- 9. Iterations ---------------- */

function IterationCard({
  num,
  title,
  before,
  after,
  delay,
}: {
  num: string;
  title: string;
  before: string;
  after: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="glass-card corner-brackets p-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-text-dim">
          {num}
        </div>
        <div className="font-display text-[18px] mt-1 mb-5">{title}</div>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_auto_3fr] gap-4 items-stretch">
          <div
            className="p-4 rounded-lg"
            style={{ background: "rgba(255,80,80,0.04)", border: "1px solid rgba(255,80,80,0.12)" }}
          >
            <div
              className="font-mono text-[10px] uppercase tracking-widest mb-2"
              style={{ color: "rgba(255,100,100,0.7)" }}
            >
              Before
            </div>
            <p className="font-body text-[13px] text-foreground/80 whitespace-pre-line leading-relaxed">
              {before}
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center font-display text-2xl text-accent-steel">
            →
          </div>
          <div className="md:hidden text-center font-display text-xl text-accent-steel">↓</div>
          <div
            className="p-4 rounded-lg"
            style={{ background: "rgba(80,255,120,0.04)", border: "1px solid rgba(80,255,120,0.12)" }}
          >
            <div
              className="font-mono text-[10px] uppercase tracking-widest mb-2"
              style={{ color: "rgba(100,255,120,0.7)" }}
            >
              After
            </div>
            <p className="font-body text-[13px] text-foreground/80 whitespace-pre-line leading-relaxed">
              {after}
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function Iterations() {
  return (
    <div className="space-y-6">
      <IterationCard
        delay={0}
        num="01"
        title="NAVIGATION STRUCTURE"
        before={`4 tabs: Home, Search, Bookings, Profile\n→ Booking-focused only.\nNo space for learning or coaching discovery.`}
        after={`5 tabs: Home, Book, Cart, Learning, Profile\n→ Added Learning tab after realizing users also want coaching and to discover new sports — not just book what they already know.\nWe Play becomes a long-term companion, not just a booking tool.`}
      />
      <IterationCard
        delay={100}
        num="02"
        title="HOME SCREEN PRIORITY"
        before={`Search bar as the dominant home screen element.\n→ Assumes every visit is a new search.`}
        after={`Recent Slots as the first visible element.\n→ Returning users are the most valuable users. One tap to rebook a previous slot removes 5 steps from the returning user's journey. Booking reduced from 6 taps to 1.`}
      />
      <IterationCard
        delay={200}
        num="03"
        title="AVAILABILITY DISPLAY"
        before={`Text labels: "Available" / "Full"\n→ Requires reading each slot individually.`}
        after={`Color-coded grid: Green (available) / Gray (full) / Amber (1 left)\n→ Processed in a glance, not read. Athletes checking mid-day should scan and tap in seconds. The Amber "almost full" state was added after research showed urgency signals help users decide faster.`}
      />
    </div>
  );
}

/* ---------------- 10. Design Principles ---------------- */

function Principles() {
  const items = [
    {
      n: "01",
      t: "Speed Over Completeness",
      d: "A returning user should complete a booking in under 60 seconds. Every added feature was tested against this constraint.",
    },
    {
      n: "02",
      t: "Transparency at Every Step",
      d: "Price, distance, availability, and reviews — visible before the user commits, not revealed at checkout.",
    },
    {
      n: "03",
      t: "Motion as Communication",
      d: "Animations aren't decoration. The launch animation sets the brand's energy. The confirmation animation signals success. Every motion carries meaning.",
    },
  ];
  return (
    <div>
      <Reveal>
        <div className="text-center mb-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent-steel">
            Design Principles
          </div>
          <p className="mt-3 font-body text-foreground/80">
            Three rules that guided every decision in this project.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((p, i) => (
          <Reveal key={p.n} delay={i * 120}>
            <div className="glass-card corner-brackets p-6 h-full">
              <div className="font-display font-bold text-[48px] leading-none text-accent-steel mb-2">
                {p.n}
              </div>
              <div className="font-display text-[18px] mb-3">{p.t}</div>
              <p className="font-body text-[13px] text-foreground/80 leading-relaxed">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Main Wrapper ---------------- */

export function WePlayResearch() {
  return (
    <div className="space-y-16">
      <Reveal>
        <div>
          <SectionHeader code="UX RESEARCH" title="How the design was grounded in real people." />
          <p className="mt-6 font-body text-foreground/85 text-lg leading-relaxed">
            Before a single frame was designed in Figma, I spoke to real people who had the same
            problem I did. Five informal conversations with international immigrants living in
            Texas. No formal script — just honest questions about how they actually experience
            finding and booking sports facilities in the US.
          </p>
        </div>
      </Reveal>

      <InterviewInsights />
      <Personas />
      <EmpathyMap />
      <JourneyMap />
      <HMW />
      <CompetitorsSection />
      <Sitemap />
      <Wireframes />
      <Iterations />
      <Principles />
    </div>
  );
}