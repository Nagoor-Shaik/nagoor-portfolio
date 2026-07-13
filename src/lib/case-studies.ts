import type { ProjectSlug } from "./portfolio-data";

export type Block =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "problem"; text: string }
  | { type: "stepper"; steps: string[] }
  | { type: "image"; label: string; slot: string; note?: string; aspect?: string }
  | { type: "video"; label: string; slot: string; note?: string; aspect?: string }
  | { type: "embed"; label?: string; url: string; aspect?: string }
  | { type: "decisions"; items: string[] }
  | { type: "figma"; slot: string }
  | { type: "custom"; component: "weplay-research" | "weplay-personas" | "weplay-empathy" | "weplay-journey" };

export type CaseStudy = {
  slug: ProjectSlug;
  category: string;
  title: string;
  tags: string[];
  meta: { role: string; tools: string; year: string; platform: string };
  hero: { kind: "PHOTO" | "VIDEO"; slot: string; note: string; embedUrl?: string };
  blocks: Block[];
};

export const caseStudies: Record<ProjectSlug, CaseStudy> = {
  "we-play": {
    slug: "we-play",
    category: "PRODUCT UX CASE STUDY",
    title: "We Play — Sports Reservation App",
    tags: ["Product Design", "UX Research", "Interaction Design", "Motion Design", "Prototyping"],
    meta: {
      role: "Product Designer",
      tools: "Figma · FigJam · ProtoPie · Maze · Notion",
      year: "2026",
      platform: "iOS Mobile · 6 Weeks",
    },
    hero: {
      kind: "VIDEO",
      slot: "/weplay-hero.mp4",
      note: "A multi-sport booking platform that helps players discover venues, compare availability, and reserve courts without phone calls or wasted trips.",
    },
    blocks: [
      { type: "h", text: "Overview" },
      {
        type: "p",
        text:
          "Finding a place to play sports should not require searching multiple websites, calling venues, or driving across town just to check availability.",
      },
      {
        type: "p",
        text:
          "We Play is a multi-sport booking platform that helps users discover nearby sports venues, compare facilities, check real-time availability, and reserve courts from one mobile application.",
      },
      {
        type: "p",
        text:
          "The goal was simple: reduce the uncertainty between wanting to play and actually reaching the court.",
      },
      {
        type: "image",
        label: "Final Product Preview",
        slot: "PASTE_WEPLAY_FINAL_PRODUCT_PREVIEW",
        note: "A preview of the core We Play experience across discovery, booking, payment, and confirmation.",
        aspect: "16/10",
      },

      { type: "h", text: "Why I Built This" },
      {
        type: "p",
        text:
          "I grew up playing badminton in India, where booking a court was straightforward. Apps like Playo made it easy to discover nearby venues, compare prices, check availability, and reserve a court within minutes.",
      },
      {
        type: "p",
        text:
          "After moving to Texas, I expected a similar experience. Instead, I found a fragmented process. Some venues had outdated websites. Some required phone calls. Some only offered memberships. Others had no online booking system at all.",
      },
      {
        type: "p",
        text:
          "As a player, it was frustrating. As a designer, it felt like a clear product opportunity.",
      },

      { type: "h", text: "The Problem" },
      {
        type: "problem",
        text:
          "People who recently move to a new city often struggle to find where they can play sports, whether courts are available, how much a session costs, and whether booking is possible online. Because most venues operate independently, users are forced to switch between Google Maps, outdated websites, Instagram pages, phone calls, and in-person visits before they can make a simple decision. The real problem is not just booking. The real problem is uncertainty before booking.",
      },

      { type: "h", text: "Research" },
      {
        type: "p",
        text:
          "I spoke with five recreational sports players living in Texas, including international students and working professionals. The goal was not to validate a specific feature. The goal was to understand how people currently discover venues, check availability, compare options, and decide whether to play.",
      },
      {
        type: "quote",
        text:
          "I drove twenty minutes only to find the courts were already full. — International player, Austin, TX",
      },
      {
        type: "quote",
        text:
          "I didn't even know there were badminton courts near me. — Immigrant player, Dallas, TX",
      },
      {
        type: "quote",
        text:
          "If one app existed for every sport, I'd use it every week. — Recreational player, Houston, TX",
      },

      { type: "h", text: "Meet the Users" },
      {
        type: "p",
        text:
          "Two personas emerged from the interviews, representing different motivations and tech comfort levels but the same core frustration: no reliable way to discover and book sports facilities.",
      },
      { type: "custom", component: "weplay-personas" },

      { type: "h", text: "Empathy Map" },
      {
        type: "p",
        text:
          "Synthesizing what users think, feel, say, and do surfaced a consistent pattern: people want to play, but the discovery and booking process gets in the way.",
      },
      { type: "custom", component: "weplay-empathy" },

      { type: "h", text: "User Journey — Before & After" },
      {
        type: "p",
        text:
          "Mapping the journey end-to-end showed exactly where the current process breaks down, and how a centralized booking experience removes friction at every stage.",
      },
      { type: "custom", component: "weplay-journey" },

      { type: "h", text: "Key Insights" },
      {
        type: "decisions",
        items: [
          "Discovery is fragmented — Users do not struggle only with booking. They struggle to find reliable venue information in the first place. Most people rely on Google Maps, friends, outdated websites, or social media pages.",
          "Availability decides behavior — Users may prefer one sport, but availability often determines what they actually play. If volleyball is unavailable, they are open to badminton, basketball, pickleball, or another sport.",
          "Returning users value speed — Many recreational players repeatedly book the same venue or sport. For them, forcing the journey to start from search every time creates unnecessary friction.",
        ],
      },

      { type: "h", text: "Product Opportunity" },
      {
        type: "problem",
        text:
          "How might we reduce the uncertainty involved in discovering, comparing, and booking sports facilities?",
      },

      { type: "h", text: "Product Vision" },
      {
        type: "p",
        text:
          "We Play centralizes venue discovery, availability, pricing, reviews, and booking into one experience so users can spend less time searching and more time playing.",
      },
      {
        type: "p",
        text:
          "The product is designed around one user intent: “I want to play.” Not: “I want to search five websites and call three venues before deciding.”",
      },

      { type: "h", text: "Design Principles" },
      {
        type: "decisions",
        items: [
          "Speed First — A repeat user should be able to rebook a familiar venue quickly without restarting the full search process.",
          "Transparency — Availability, price, duration, amenities, and booking rules should be visible before checkout.",
          "Momentum — If one option fails, the experience should guide users toward another venue, time, or sport instead of ending the journey.",
        ],
      },

      { type: "h", text: "Key Product Decisions" },
      {
        type: "decisions",
        items: [
          "Multi-Sport Discovery — Problem: Users often abandon the journey when their preferred sport is unavailable. Decision: Instead of designing We Play around one sport, I designed it as a multi-sport platform. Impact: A failed search becomes an alternative path instead of a dead end.",
          "Compare Venues in One Place — Problem: Users currently compare venues across Google Maps, outdated websites, social media pages, and phone calls. Decision: I designed venue cards that combine distance, rating, price, sport type, amenities, and availability. Impact: Users can compare options without jumping between different platforms.",
          "Availability First — Problem: Users often call or visit venues just to ask whether courts are available. Decision: Availability became one of the most visible parts of the booking experience through a visual slot grid. Impact: Users can answer the most important question immediately: Can I play today?",
          "Fast Repeat Booking — Problem: Returning users often book the same sport or venue repeatedly. Decision: I prioritized recent bookings on the Home screen instead of forcing every user to begin with search. Impact: Returning players can rebook a familiar venue in seconds.",
          "Transparent Checkout — Problem: Many booking experiences hide final pricing, fees, or rules until the last step. Decision: The booking summary shows venue, sport, court, date, time, duration, taxes, fees, and total price before payment. Impact: Users know exactly what they are paying for before committing.",
        ],
      },

      {
        type: "image",
        label: "Sport Selection",
        slot: "/sports-selection.png",
        note: "Cross-sport discovery lets users continue exploring when their first choice is unavailable.",
        aspect: "393/852",
      },
      {
        type: "image",
        label: "Venue Comparison",
        slot: "/venue-selection.png",
        note: "Venue cards combine availability, distance, ratings, pricing, and amenities to support faster decisions.",
        aspect: "393/852",
      },
      {
        type: "image",
        label: "Slot Selection",
        slot: "/weplay-slot-selection.png",
        note: "A visual time grid helps users scan availability faster than reading repeated text labels.",
        aspect: "16/10",
      },
      {
        type: "image",
        label: "Home Dashboard",
        slot: "/home-dashboard.png",
        note: "Recent bookings support fast repeat behavior while sports categories keep discovery accessible.",
        aspect: "393/853",
      },
      {
        type: "decisions",
        items: [
          "Personalized Greeting — A handwritten-style welcome paired with the user's profile photo makes the home screen feel personal rather than transactional.",
          "Set a Weekly Goal — A prominent pill CTA nudges users toward habit-forming engagement, turning one-off bookings into a recurring routine.",
          "Book Again — Surfaces the most recent venue or session for one-tap rebooking, directly supporting the Fast Repeat Booking decision.",
          "My Calendar — Gives users a quick glance at upcoming bookings without leaving the home screen.",
          "Groups — Lets users manage or join group and team bookings, supporting the social side of sports.",
          "Offers — Surfaces active promotions and discounts to encourage return visits.",
          "Bottom Navigation — A five-tab structure (Home, Book, Me, Learn, Meet) mirrors the app's core information architecture, keeping every major flow one tap away.",
        ],
      },
      {
        type: "image",
        label: "Booking Summary",
        slot: "/booking-1.png",
        note: "The summary screen reduces payment hesitation by making all booking details visible upfront.",
        aspect: "393/852",
      },
      {
        type: "image",
        label: "Confirmation",
        slot: "/booking-2.png",
        note: "A clear confirmation state reassures users the booking was completed successfully.",
        aspect: "393/852",
      },

      { type: "h", text: "User Flow" },
      {
        type: "stepper",
        steps: [
          "Open App",
          "Choose Sport",
          "Browse Venues",
          "View Details",
          "Select Slot",
          "Review Booking",
          "Payment",
          "Confirmation",
        ],
      },

      { type: "h", text: "Information Architecture" },
      {
        type: "p",
        text:
          "The app structure follows the user's natural decision-making process: Discover → Compare → Book → Play.",
      },
      {
        type: "p",
        text:
          "Home supports fast repeat actions and venue discovery. Book supports sport selection, venue selection, slot selection, payment, and confirmation. Learning supports coaching, beginner programs, and training opportunities for users who want to explore new sports. Profile stores bookings, favorites, account settings, and saved preferences.",
      },
      {
        type: "image",
        label: "Information Architecture",
        slot: "PASTE_WEPLAY_INFORMATION_ARCHITECTURE",
        note: "The app structure supports both fast repeat booking and open-ended sports discovery.",
        aspect: "16/10",
      },

      { type: "h", text: "Wireframing" },
      {
        type: "p",
        text:
          "Before moving into high-fidelity design, I explored low-fidelity layouts to simplify the booking journey. The goal was not visual polish. The goal was to decide what users should see first, which actions needed priority, and how many decisions should exist on each screen.",
      },
      {
        type: "image",
        label: "Low-Fidelity Wireframes",
        slot: "PASTE_WEPLAY_LOW_FIDELITY_WIREFRAMES",
        note: "Early layouts explored home hierarchy, slot selection, and booking summary structure before visual design.",
        aspect: "16/10",
      },

      { type: "h", text: "Design System" },
      {
        type: "p",
        text:
          "The interface uses a reusable component system to keep the booking experience consistent across screens. Core components include venue cards, sport category cards, slot grid states, primary buttons, secondary buttons, booking summary rows, bottom navigation, and confirmation cards.",
      },
      {
        type: "p",
        text:
          "The visual system uses clear hierarchy, consistent spacing, and strong action states so users always understand what to do next.",
      },
      {
        type: "image",
        label: "Design System",
        slot: "/weplay-design-system.png",
        note: "Reusable cards, buttons, slot states, and navigation patterns create consistency across the app.",
        aspect: "1600/1250",
      },

      { type: "h", text: "High-Fidelity Design" },
      {
        type: "p",
        text:
          "The final interface balances clarity with energy. Sports are active, social, and fast-moving, so the product needed to feel modern and dynamic without slowing down the booking task. The final screens focus on direct actions, readable information, clean cards, and strong feedback states.",
      },
      {
        type: "image",
        label: "High-Fidelity Screens",
        slot: "PASTE_WEPLAY_HIGH_FIDELITY_SCREENS",
        note: "Final UI screens across home, sport selection, venue browsing, slot booking, payment, and confirmation.",
        aspect: "16/10",
      },

      { type: "h", text: "Interaction Design" },
      {
        type: "p",
        text:
          "Every interaction was designed to reduce friction or confirm user action. Key interaction patterns include animated slot selection, expandable venue cards, clear booking progress feedback, bottom navigation transitions, swipe-friendly cards, button press feedback, loading states, and confirmation feedback.",
      },
      {
        type: "p",
        text:
          "The goal was to make the experience feel responsive without adding unnecessary motion.",
      },
      {
        type: "video",
        label: "Interaction Demo",
        slot: "/weplay-interactions.mp4",
        note: "Microinteractions across slot selection, venue cards, navigation, and booking confirmation.",
        aspect: "748/1488",
      },

      { type: "h", text: "Motion Design" },
      {
        type: "p",
        text:
          "Motion was used as communication, not decoration. The launch animation introduces the product identity. Page transitions maintain spatial continuity. Slot selection animations confirm choice. Payment and confirmation motion reassure users that the booking has been completed successfully.",
      },
      {
        type: "video",
        label: "Motion Design System",
        slot: "/weplay-logo.mp4",
        note: "Launch animation, page transitions, slot feedback, and confirmation motion.",
        aspect: "756/1504",
      },

      { type: "h", text: "Interactive Prototype" },
      {
        type: "p",
        text:
          "The interactive prototype demonstrates the complete booking experience from opening the app to receiving confirmation. The prototype allows users to browse sports, compare venues, select a slot, review details, complete payment, and receive a booking confirmation.",
      },
      {
        type: "figma",
        slot: "https://embed.figma.com/proto/LEMxA2Yhh0GUn5VkpNB39l/We-Play-App?node-id=44-29&p=f&viewport=275%2C626%2C0.04&scaling=scale-down&content-scaling=fixed&starting-point-node-id=58%3A278&page-id=0%3A1&show-proto-sidebar=1&embed-host=share",
      },

      { type: "h", text: "Accessibility Considerations" },
      {
        type: "p",
        text:
          "I considered accessibility throughout the interface by using readable typography, clear tap targets, strong contrast, consistent icon labels, visible selected states, and availability indicators supported by both color and text.",
      },
      {
        type: "p",
        text:
          "This is especially important for the slot grid, where users should not rely on color alone to understand availability.",
      },

      { type: "h", text: "Reflection" },
      {
        type: "p",
        text:
          "Designing We Play taught me that users do not always need more features. They need more certainty.",
      },
      {
        type: "p",
        text:
          "The biggest challenge was not designing an attractive booking interface. It was reducing the number of questions users had to answer before they could confidently decide where to play.",
      },
      {
        type: "p",
        text:
          "This project helped me think more clearly about product strategy, user behavior, interaction design, and how small decisions in a flow can prevent users from giving up.",
      },

      { type: "h", text: "Future Improvements" },
      {
        type: "decisions",
        items: [
          "Live availability integrations with venues",
          "Venue dashboard for facility owners",
          "Group booking and split payments",
          "Coach and academy onboarding",
          "Pick-up games and community play",
          "Skill-based player matching",
          "Tournament registration",
          "Wallet passes for confirmed bookings",
          "Personalized sport and venue recommendations",
        ],
      },

      { type: "h", text: "Outcome" },
      {
        type: "p",
        text:
          "We Play demonstrates an end-to-end product design process: identifying a real problem, validating it through user conversations, translating insights into product decisions, designing a complete booking flow, building interaction patterns, and prototyping a polished mobile experience.",
      },
      {
        type: "p",
        text:
          "The final product reduces friction across the sports booking journey by helping users discover venues, compare availability, recover from unavailable slots, and book with confidence.",
      },
    ],
  },

  flexity: {
    slug: "flexity",
    category: "INTERACTION DESIGN · MOTION DESIGN · PROTOTYPING",
    title: "Flexity — OTT Streaming Platform",
    tags: ["Desktop Web", "Streaming UI", "Motion System", "Interactive Prototype"],
    meta: {
      role: "Interaction Designer · Motion Designer · UI Designer",
      tools: "Figma · Smart Animate · FigJam",
      year: "2024",
      platform: "Desktop Web",
    },
    hero: {
      kind: "PHOTO",
      slot: "/flexity-cover.png",
      note:
        "A motion-focused OTT streaming platform prototype designed around cinematic discovery, responsive carousel behavior, and polished card microinteractions.",
    },
    blocks: [
      {
        type: "quote",
        text:
          "Flexity was designed to test whether a streaming interface could feel alive through motion — not just look good as a static homepage.",
      },

      { type: "h", text: "Overview" },
      {
        type: "p",
        text:
          "Flexity is a desktop OTT streaming platform concept focused on content discovery, motion behavior, and interactive browsing. The project explores how a streaming homepage can feel cinematic, responsive, and premium through carefully designed transitions, hover states, carousel movement, and brand animation.",
      },
      {
        type: "p",
        text:
          "The goal was not to copy an existing platform. The goal was to understand what makes premium streaming interfaces feel polished — then design an original experience with its own visual identity and motion language.",
      },

      {
        type: "image",
        label: "Flexity Homepage",
        slot: "PASTE_FLEXITY_HOMEPAGE_SCREENSHOT",
        note:
          "Homepage layout with hero carousel, movie rows, favorites section, and dark streaming UI structure.",
        aspect: "16/9",
      },

      { type: "h", text: "The Problem" },
      {
        type: "problem",
        text:
          "Many streaming UI concepts look polished in screenshots but feel flat when users interact with them. Content cards, hero sections, and navigation often appear visually complete, but the experience lacks motion feedback, browsing momentum, and the cinematic quality users expect from entertainment platforms.",
      },

      { type: "h", text: "Project Goal" },
      {
        type: "p",
        text:
          "Design a streaming homepage that feels dynamic and interactive from the first second: a logo reveal that establishes brand identity, a hero carousel that responds to user input, movie cards that reward exploration, and a visual system that feels distinct from existing streaming brands.",
      },

      { type: "h", text: "My Role" },
      {
        type: "p",
        text:
          "I worked across visual design, interaction design, and motion prototyping. I designed the brand direction, homepage layout, hero carousel, movie cards, hover states, color system, and interactive Figma prototype.",
      },

      {
        type: "stepper",
        steps: ["Benchmark", "Define Motion", "Design System", "Prototype", "Refine"],
      },

      { type: "h", text: "Design Strategy" },
      {
        type: "p",
        text:
          "I treated motion as part of the product system, not decoration. Each animation had a job: introduce the brand, guide attention, confirm interaction, or create browsing momentum. This helped the prototype feel more like a real streaming experience instead of a static UI board.",
      },

      { type: "h", text: "Phase 01 — Brand Launch Animation" },
      {
        type: "video",
        label: "Flexity Logo Reveal",
        slot: "PASTE_FLEXITY_LOGO_REVEAL",
        note: "Logo reveal animation establishing the Flexity brand before the homepage appears.",
        aspect: "16/9",
      },
      {
        type: "p",
        text:
          "The launch animation became the first expression of the brand. I explored timing, spacing, fade behavior, letter reveal, and contrast to make the Flexity identity feel cinematic before users even reached the homepage.",
      },
      {
        type: "p",
        text:
          "The final direction uses a dark stage, bold letter spacing, and a restrained reveal. It feels premium without becoming too loud or distracting.",
      },

      { type: "h", text: "Phase 02 — Hero Carousel Interaction" },
      {
        type: "video",
        label: "Hero Carousel Motion",
        slot: "PASTE_FLEXITY_HERO_CAROUSEL",
        note:
          "Carousel interaction showing character movement, title transition, background shift, and arrow-triggered animation.",
        aspect: "16/9",
      },
      {
        type: "p",
        text:
          "The hero carousel was the most complex interaction in the project. Each arrow click triggers multiple coordinated changes: character movement, title transition, summary animation, background color shift, and button state updates.",
      },
      {
        type: "p",
        text:
          "The challenge was making all of these elements move together without feeling chaotic. The final interaction creates energy while keeping the selected title readable and easy to understand.",
      },

      { type: "h", text: "Phase 03 — Card Microinteractions" },
      {
        type: "video",
        label: "Movie Card Hover States",
        slot: "PASTE_FLEXITY_CARD_HOVER_VIDEO",
        note:
          "Hover interaction showing card expansion, border emphasis, gradient reveal, and title movement.",
        aspect: "16/9",
      },
      {
        type: "p",
        text:
          "The movie cards were designed to feel rewarding without demanding attention. On hover, the card expands slightly, the border becomes more visible, a dark gradient improves readability, and the title moves into view.",
      },
      {
        type: "p",
        text:
          "This small interaction gives the page a sense of responsiveness. Users get feedback immediately, but the animation stays subtle enough to support browsing instead of interrupting it.",
      },

      { type: "h", text: "Key Design Decisions" },
      {
        type: "decisions",
        items: [
          "Motion as brand introduction — The logo reveal establishes the Flexity identity before users enter the product.",
          "Carousel as the main discovery engine — The hero section gives featured content a cinematic moment while encouraging exploration.",
          "Color-reactive hero system — Background colors shift with selected titles to make each carousel state feel distinct.",
          "Subtle card rewards — Hover states make browsing feel interactive without overwhelming the interface.",
          "Dark visual system — Black, mint green, and soft contrast create a premium streaming feel while separating Flexity from Netflix red and Hulu green.",
          "Prototype-first thinking — The design was judged by how it moved, not only by how it looked in static screens.",
        ],
      },

      { type: "h", text: "Visual System" },
      {
        type: "p",
        text:
          "The visual system uses a dark interface, mint-green brand accents, large media surfaces, soft gradients, and high-contrast content cards. The goal was to make the platform feel immersive while keeping navigation and browsing actions clear.",
      },
      {
        type: "p",
        text:
          "The interface avoids unnecessary visual noise. Content remains the focus, while motion and color create personality around it.",
      },

      { type: "h", text: "Interaction Details" },
      {
        type: "p",
        text:
          "Key interactions include logo reveal, carousel transitions, arrow-triggered content changes, character movement, title stagger animation, card hover expansion, gradient overlays, and animated emphasis states.",
      },
      {
        type: "p",
        text:
          "Together, these details create a streaming interface that feels active, polished, and intentional.",
      },

      { type: "h", text: "What I Learned" },
      {
        type: "p",
        text:
          "Flexity helped me understand that motion design is not about adding animation after the layout is finished. Motion changes how users feel the product. It controls rhythm, focus, feedback, and personality.",
      },
      {
        type: "p",
        text:
          "The biggest lesson was learning to design movement with restraint. The best interactions are often the ones users do not consciously analyze — they simply make the product feel better.",
      },

      { type: "h", text: "What I Would Improve" },
      {
        type: "p",
        text:
          "The next step would be designing a complete title-detail page with trailer preview, episode list, cast information, related recommendations, and continue-watching behavior. The current prototype focuses on discovery; a complete OTT product also needs a strong detail experience.",
      },

      { type: "h", text: "Prototype" },
      {
        type: "video",
        label: "Flexity Prototype Highlight",
        slot: "PASTE_FLEXITY_HIGHLIGHT_REEL",
        note:
          "High-fidelity prototype loop showing launch, homepage, carousel behavior, and card microinteractions.",
        aspect: "16/9",
      },
      {
        type: "figma",
        slot: "PASTE_FLEXITY_FIGMA_EMBED_URL",
      },

      { type: "h", text: "Outcome" },
      {
        type: "p",
        text:
          "Flexity demonstrates my ability to design a polished interaction-heavy product experience, create a distinct visual system, prototype complex motion behavior, and think beyond static UI screens.",
      },
    ],
  },

  "credit-card": {
    slug: "credit-card",
    category: "MICROINTERACTION DESIGN · MOTION DESIGN",
    title: "Credit Card Animation × 3",
    tags: ["Microinteraction", "Fintech UI", "Figma Prototype", "Motion Study"],
    meta: {
      role: "Motion Designer · Interaction Designer",
      tools: "Figma · Smart Animate",
      year: "2024",
      platform: "Motion Study",
    },
    hero: {
      kind: "VIDEO",
      slot: "/credit-card-hero.mp4",
      note: "A motion study exploring three ways a credit card interface can reveal transaction details through flip, axis, and rotation-based interactions.",
      embedUrl: "https://go.screenpal.com/watch/cO1lFEnuxZr",
    },
    blocks: [
      {
        type: "quote",
        text:
          "This project explores how one simple fintech interaction can feel completely different when motion, direction, and timing change.",
      },

      { type: "h", text: "Overview" },
      {
        type: "p",
        text:
          "Credit Card Animation × 3 is a focused microinteraction study built in Figma. I designed three variations of the same core interaction: a card revealing transaction details through motion.",
      },
      {
        type: "p",
        text:
          "The goal was to understand how animation direction, easing, timing, and trigger behavior change the feeling of a digital object.",
      },

      { type: "h", text: "The Problem" },
      {
        type: "problem",
        text:
          "Financial interfaces often treat motion as decoration. A card flips, slides, or expands, but the movement does not always communicate state, hierarchy, or user control. I wanted to explore how a small interaction could feel more physical, intentional, and responsive.",
      },

      { type: "h", text: "Motion Goal" },
      {
        type: "p",
        text:
          "Create three motion directions for the same credit card interaction and compare how each one changes the emotional quality of the experience.",
      },

      {
        type: "stepper",
        steps: ["Define Motion", "Prototype", "Test Axis", "Refine Timing", "Compare"],
      },

      { type: "h", text: "Exploration 01 — Horizontal Flip" },
      {
        type: "video",
        label: "Card 01 — Horizontal Flip",
        slot: "PASTE_CARD1_VIDEO",
        note: "Front face flips left to right to reveal transaction history.",
      },
      {
        type: "p",
        text:
          "The first version uses a left-to-right flip. This motion feels direct and familiar because it behaves like turning over a physical card.",
      },
      {
        type: "p",
        text:
          "This became the baseline interaction. It helped me understand the basic timing needed for the card to feel believable: front state, edge moment, back state, and settling motion.",
      },

      { type: "h", text: "Exploration 02 — Vertical Flip" },
      {
        type: "video",
        label: "Card 02 — Vertical Flip",
        slot: "PASTE_CARD2_VIDEO",
        note: "The same card reveal using a top-to-bottom motion direction.",
      },
      {
        type: "p",
        text:
          "The second version changes the motion axis from horizontal to vertical. The interaction still reveals the same information, but the feeling changes.",
      },
      {
        type: "p",
        text:
          "The vertical flip feels more like opening a panel or lifting a cover. It is less expected than the horizontal version, which makes it feel more experimental.",
      },

      { type: "h", text: "Exploration 03 — Rotational Reveal" },
      {
        type: "video",
        label: "Card 03 — Rotational Reveal",
        slot: "PASTE_CARD3_VIDEO",
        note: "A bottom-edge rotation with bouncy easing and coordinated card movement.",
      },
      {
        type: "p",
        text:
          "The third version moves beyond a simple flip. The card rotates upward from the bottom edge and settles into the transaction view.",
      },
      {
        type: "p",
        text:
          "This was the most challenging version because the selected card had to rotate while the other cards moved away without competing animations. The final result feels more dynamic, dimensional, and premium.",
      },

      { type: "h", text: "Key Interaction Decisions" },
      {
        type: "decisions",
        items: [
          "One action, three motion directions — The same reveal pattern was tested through horizontal, vertical, and rotational movement.",
          "Motion communicates state — The card does not simply animate; it moves from front-facing summary to detailed transaction view.",
          "Click and drag support — The prototype supports both direct tapping and physical drag behavior.",
          "Bouncy easing for weight — The third card uses easing to make the rotation feel more physical and less mechanical.",
          "Controlled surrounding motion — Non-selected cards move away so the active card becomes the focus.",
        ],
      },

      { type: "h", text: "What I Learned" },
      {
        type: "p",
        text:
          "This project taught me that motion direction changes perception. A horizontal flip feels familiar. A vertical flip feels more like a reveal. A rotational motion feels more dimensional and premium.",
      },
      {
        type: "p",
        text:
          "I also learned that interaction design is not only about the selected object. The surrounding elements matter too. When one card becomes active, the other cards need to move in a way that supports focus instead of creating visual noise.",
      },

      { type: "h", text: "Prototype" },
      {
        type: "video",
        label: "Full Motion Showcase",
        slot: "/credit-card.mp4",
        note: "A continuous prototype showing Card 01, Card 02, and Card 03 interactions.",
        aspect: "16/9",
      },
      {
        type: "figma",
        slot: "https://embed.figma.com/proto/ZAosYpLqgSxG0Wrv4qwdO1/Credit-card-Animation?page-id=0%3A1&node-id=166-27&embed-host=share",
      },

      { type: "h", text: "Outcome" },
      {
        type: "p",
        text:
          "Credit Card Animation × 3 demonstrates my ability to explore motion systematically, compare interaction alternatives, prototype advanced Figma behaviors, and use animation to make interface states feel physical and intentional.",
      },
    ],
  },

  smartwatch: {
    slug: "smartwatch",
    category: "WEARABLE UX · INTERACTION DESIGN · UI SYSTEMS",
    title: "SmartWatch OS — Wearable UX Redesign",
    tags: ["Wearable UX", "Circular UI", "Interaction Design", "Companion App"],
    meta: {
      role: "Wearable UX/UI Designer · Interaction Designer",
      tools: "Figma · FigJam · Prototyping",
      year: "2024",
      platform: "Smartwatch · Companion Mobile App",
    },
    hero: {
      kind: "PHOTO",
      slot: "PASTE_SMARTWATCH_HERO_IMAGE",
      note:
        "A wearable UX redesign exploring circular interfaces, glanceable information, compact navigation, fitness tracking, and companion app continuity.",
    },
    blocks: [
      {
        type: "quote",
        text:
          "Designing for a smartwatch forced me to rethink interface design at its smallest scale: less space, fewer actions, faster decisions.",
      },

      { type: "h", text: "Overview" },
      {
        type: "p",
        text:
          "SmartWatch OS is a wearable UX redesign focused on compact interface design, circular screen constraints, glanceable information, and companion app continuity.",
      },
      {
        type: "p",
        text:
          "The project explores how core smartwatch experiences — watch face, fitness tracking, music, notifications, ambient display, and companion mobile controls — can work together as one connected ecosystem.",
      },

      {
        type: "image",
        label: "SmartWatch OS Hero Preview",
        slot: "/smartwatch-preview.png",
        note:
          "Hero visual showing the redesigned smartwatch interface system across core wearable screens.",
        aspect: "16/10",
      },

      { type: "h", text: "The Problem" },
      {
        type: "problem",
        text:
          "Smartwatch interfaces operate under extreme constraints: small circular screens, limited input methods, short attention spans, and glance-based usage. A successful wearable interface must communicate quickly, reduce unnecessary interaction, and make every screen useful within seconds.",
      },

      { type: "h", text: "Design Goal" },
      {
        type: "p",
        text:
          "Redesign a smartwatch experience that makes key information easier to scan, reduces interaction effort, supports quick task completion, and extends important watch features into a companion mobile app.",
      },

      {
        type: "stepper",
        steps: ["Study Device", "Define Constraints", "Map Screens", "Design System", "Prototype"],
      },

      { type: "h", text: "Wearable UX Constraints" },
      {
        type: "decisions",
        items: [
          "Small screen — The interface needed to prioritize only the most important information and remove anything that required long reading.",
          "Circular layout — Content had to fit naturally inside a round screen without feeling cropped, crowded, or misaligned.",
          "Glance-based behavior — Most smartwatch interactions happen quickly, so each screen needed to communicate its purpose immediately.",
          "Limited input — Without a keyboard or large touch area, the design had to rely on simple taps, swipes, and clear navigation states.",
          "Ambient display — The always-on state needed a simplified visual system that preserved battery, reduced clutter, and kept time visible.",
        ],
      },

      { type: "h", text: "Research Approach" },
      {
        type: "p",
        text:
          "I used the physical smartwatch as the research object. I studied how information appears on the wrist, how quickly screens need to be understood, how swipe-based movement feels, and where compact UI patterns become difficult to read.",
      },
      {
        type: "p",
        text:
          "Instead of designing from desktop assumptions, I treated the watch as a separate interaction environment with its own constraints, habits, and expectations.",
      },

      { type: "h", text: "Core Experience Map" },
      {
        type: "p",
        text:
          "The redesign focused on the screens users are most likely to check quickly: watch face, ambient mode, fitness progress, music controls, notifications, settings, and companion app controls.",
      },
      {
        type: "image",
        label: "Core Screen Map",
        slot: "/smartwatch-core.png",
        note:
          "A grid of redesigned screens including watch face, ambient display, fitness, music, notifications, and settings.",
        aspect: "16/10",
      },

      { type: "h", text: "Decision 01 — Glanceable Watch Face" },
      {
        type: "p",
        text:
          "The watch face was designed to make key information visible at a glance. Time remains the primary element, while secondary details such as activity progress, battery, and quick status indicators stay visually controlled.",
      },
      {
        type: "image",
        label: "Watch Face Design",
        slot: "/watchface.png",
        note:
          "Primary watch face layout focused on time-first hierarchy and glanceable status information.",
        aspect: "2116/582",
      },

      { type: "h", text: "Decision 02 — Ambient Display Simplification" },
      {
        type: "p",
        text:
          "Ambient mode reduces the interface to only essential information. The design removes heavy visual elements and keeps the screen readable without overwhelming the always-on state.",
      },
      {
        type: "image",
        label: "Ambient Display",
        slot: "/watchambient.png",
        note:
          "Always-on display state using reduced visual density and time-first hierarchy.",
        aspect: "2116/582",
      },

      { type: "h", text: "Decision 03 — Fitness Progress Rings" },
      {
        type: "p",
        text:
          "For fitness tracking, I used a ring-based progress system because circular progress fits naturally inside the watch form factor. This made activity status easier to scan without relying on dense numbers.",
      },
      {
        type: "video",
        label: "Fitness Tracking Screen",
        slot: "/fitness.mp4",
        note:
          "Ring-based activity screen designed for quick progress scanning on a circular interface.",
        aspect: "736/1056",
      },

      { type: "h", text: "Decision 04 — Music Controls for Quick Actions" },
      {
        type: "p",
        text:
          "The music screen prioritizes large touch targets, visible playback status, and simple controls. The goal was to make common actions usable without forcing users to focus on the screen for too long.",
      },
      {
        type: "video",
        label: "Music Control Screen",
        slot: "/music.mp4",
        note:
          "Compact music interface optimized for quick playback control and readable touch targets.",
        aspect: "736/1056",
      },

      { type: "h", text: "Decision 05 — Companion App Continuity" },
      {
        type: "p",
        text:
          "After designing the watch interface, I extended the system into a companion mobile app. The mobile app gives users more space for settings, progress review, personalization, and feature management while keeping the watch experience lightweight.",
      },
      {
        type: "image",
        label: "Companion Mobile App",
        slot: "/smartwatch-companion.png",
        note:
          "Companion app screens showing how the smartwatch system extends into a larger mobile interface.",
        aspect: "1280/720",
      },

      { type: "h", text: "Key Design Decisions" },
      {
        type: "decisions",
        items: [
          "Time-first hierarchy — The watch face keeps time as the dominant element because it is the most frequently checked information.",
          "Circular progress patterns — Fitness data uses ring-based visuals to match the shape of the device and improve quick scanning.",
          "Reduced ambient state — The always-on display removes nonessential visual noise while preserving readability.",
          "Large touch targets — Interactive controls are kept simple and easy to tap within the limited screen area.",
          "Companion app extension — Complex settings and deeper information move to mobile so the watch remains fast and lightweight.",
          "System consistency — Watch and mobile screens share visual language, spacing logic, and interaction patterns.",
        ],
      },

      { type: "h", text: "Interaction Design" },
      {
        type: "p",
        text:
          "The interaction system focuses on fast movement between compact screens. Swipe navigation supports quick transitions, while tap targets are designed around the limited precision of a small wearable display.",
      },
      {
        type: "p",
        text:
          "Animations were kept simple and functional. Motion supports state changes, screen transitions, and feedback without slowing down the glance-based nature of smartwatch use.",
      },
      { type: "h", text: "Design System" },
      {
        type: "p",
        text:
          "The design system uses compact typography, high-contrast UI elements, circular alignment, simplified icons, and reusable components for watch faces, progress indicators, control cards, and mobile companion screens.",
      },
      {
        type: "image",
        label: "SmartWatch Design System",
        slot: "/smartwatch-design-system.png",
        note:
          "Reusable wearable components, circular spacing rules, typography, icons, and mobile companion UI patterns.",
        aspect: "1600/1150",
      },

      { type: "h", text: "What I Learned" },
      {
        type: "p",
        text:
          "This project helped me understand that wearable design is not just smaller mobile design. It requires a different mindset: reduce choices, prioritize glanceability, respect physical constraints, and design for moments that last only a few seconds.",
      },
      {
        type: "p",
        text:
          "The biggest learning was that every pixel on a smartwatch has to earn its place. When space is limited, hierarchy, spacing, and interaction feedback become even more important.",
      },

      { type: "h", text: "What I Would Improve" },
      {
        type: "p",
        text:
          "The next step would be testing the prototype on an actual watch frame with users, refining tap target sizes, validating readability under different lighting conditions, and improving accessibility for color contrast, motion sensitivity, and text scaling.",
      },

      { type: "h", text: "Prototype" },
      {
        type: "video",
        label: "SmartWatch Prototype Highlight",
        slot: "/smartwatch.mp4",
        note:
          "A short prototype highlight showing the redesigned smartwatch flow from ambient state to active interactions.",
        aspect: "736/1056",
      },
      {
        type: "figma",
        slot: "https://embed.figma.com/proto/nFskVeFCSjWaGYxwRNIOfx/SmartWatch?page-id=0%3A1&node-id=73-276&p=f&viewport=47%2C378%2C0.16&scaling=scale-down&content-scaling=fixed&starting-point-node-id=73%3A179&embed-host=share",
      },

      { type: "h", text: "Outcome" },
      {
        type: "p",
        text:
          "SmartWatch OS demonstrates my ability to design for constrained interfaces, create glanceable wearable UI systems, structure compact navigation, prototype interaction flows, and extend a wearable product into a companion mobile experience.",
      },
    ],
  },
};
