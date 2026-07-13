
# Midnight Ink Refresh

Scoped visual + small interaction pass. No content, copy, layout structure, fonts, or section ordering changes.

## 1. Color system — "Midnight Ink"

Rewrite tokens in `src/styles.css` only. Every component already reads semantic vars, so no component edits needed for color.

```text
--bg              #0C0C0E   pure neutral dark
--surface         #131316   raised glass base
--text            #ECECEE
--text-dim        #8A8A93

--accent-steel    #6E8BA8   dusty steel blue   (replaces --neon-cyan)
--accent-sand     #C9A87C   warm sand          (replaces --neon-magenta)
--accent-sage     #8FA68E   sage green         (replaces --neon-violet)

--glass-bg        rgba(255,255,255,0.03)
--glass-border    rgba(255,255,255,0.08)
--shadow-soft     0 10px 40px rgba(0,0,0,0.4)
```

- Keep existing token *names* (`--neon-violet`, `--neon-cyan`, `--neon-magenta`) aliased to the new accents so no component file has to change. Add the new semantic names as the source of truth; aliases just point at them.
- Remove all purple — drop `text-shadow: ... rgba(123,47,255,...)` and any `box-shadow: ... rgba(123,47,255,...)` in `styles.css`. Tone down remaining glows to `rgba(110,139,168,0.18)` max.
- Soften `.glass-card` border + bg using new tokens. Lower default text-shadow / saturation everywhere.

## 2. Background system

Replace `FloatingOrbs` in `src/components/portfolio/decor.tsx`:

- Generate 9 soft circles, sizes 180–520px, `opacity: 0.06`, `filter: blur(80px)`, each with its own slow `drift-{n}` keyframe (60–110s, ease-in-out, infinite, alternate). Colors cycle steel / sand / sage.
- Positions hand-picked across viewport so movement is felt, not seen.
- Add new `DotGrid` decorative component: full-bleed fixed layer, `background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 22px 22px;` at ~3% opacity, mask-faded toward edges. Manga-print feel.
- Mount `DotGrid` once in `__root.tsx` behind `<Outlet />`; keep `FloatingOrbs` per-section as today.
- Delete `SpeedLines` usage from any section that still calls it (keeps file but unused), and dial `ScanlineOverlay` opacity to `0.012`.

## 3. Anime presence (subtle)

New component `AnimePresence.tsx` with a `variant` prop: `"silhouette" | "ripple"`. Default `"silhouette"`, fallback `"ripple"`.

- **Silhouette**: 2–3 inline SVG silhouettes (simple side-profile head + shoulders, hand-drawn path, no facial detail) positioned at section corners, `opacity: 0.04`, `mix-blend-mode: lighten`, very slow `translateY` breathing animation (8s).
- **Ripple**: 3 concentric circles expanding from 0→600px over 6s with fading opacity (0.05→0), staggered, infinite. Pure CSS.
- Drop one `<AnimePresence />` into Hero and one into Contact section. No other placements.
- If silhouettes look off in QA, flip default to `"ripple"` via single prop.

## 4. Hero clipping fix

`src/components/sections/Hero.tsx`:

- Add `pb-32 lg:pb-40` to the section (currently `pt-20` only; bottom content from the 2100ms social pills is being cut by viewport).
- Add `min-h-[calc(100vh+2rem)]` on small screens so the staggered letters + subtitle + pills all fit without overlap with the next section's marquee.
- Right column profile ring: cap at `w-[240px] h-[240px]` on mobile so it doesn't push the column past viewport.

## 5. Carousel / Motion Showcase

`src/components/sections/MotionShowcase.tsx` currently uses a plain overflow-x strip. Convert to the existing shadcn `@/components/ui/carousel` (Embla) and add:

- `<Carousel opts={{ align: "start", dragFree: false }}>` with snap behavior (Embla default).
- Visible `<CarouselPrevious />` / `<CarouselNext />` repositioned to sit above the strip on the right (not the default `-left-12 / -right-12` which clip on mobile).
- Dot indicator row below the strip: read `api.scrollSnapList()` + `api.selectedScrollSnap()` via `setApi`, render N dots, active dot uses `--accent-steel`, inactive `--text-dim/30`. Clicking a dot calls `api.scrollTo(i)`.
- Items get `basis-[85%] sm:basis-1/2 lg:basis-1/3` for snap-friendly sizing.

## 6. Marquee slowdown

`src/styles.css` — change `.animate-marquee` animation duration from current ~20–30s to `60s linear infinite`. No other marquee changes.

## 7. KEEP — do NOT touch

- All section copy, case study content, `portfolio-data.ts`, `case-studies.ts`
- Section order on landing page and case study template
- Fonts (Rajdhani / DM Sans / Space Mono) and type scale
- Letter-by-letter hero animation, typewriter subtitle, reveal-on-scroll, custom cursor, scroll-spy navbar
- Component file structure and routes
- UploadSlot placeholders and PASTE_* markers

## Files touched

```text
src/styles.css                              tokens, marquee duration, glass softening
src/components/portfolio/decor.tsx          new FloatingOrbs, new DotGrid export
src/components/portfolio/AnimePresence.tsx  new
src/routes/__root.tsx                       mount <DotGrid /> once
src/components/sections/Hero.tsx            padding/min-h fix, mount <AnimePresence />
src/components/sections/Contact.tsx         mount <AnimePresence />
src/components/sections/MotionShowcase.tsx  swap to shadcn Carousel + dots
```

Build will be verified after edits via dev server + screenshot QA.
