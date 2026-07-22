# Nerd Signal — Design System

> Design system for M. Farhan Ramadhan's portfolio. Named for its subject (Nerd Dev) and its physics-adjacent metaphor: a portfolio is a signal — the noise around it is everything you have to cut through.

---

## 1. Subject & Brief

|                  |                                                                                                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Subject**      | M. Farhan Ramadhan — "Nerd Dev", a fullstack developer with a Physics & Instrumentation degree.                                                                                                                              |
| **Audience**     | Potential employers, startup co-founders, freelance clients, and fellow developers.                                                                                                                                          |
| **Page's job**   | Convert a visitor's curiosity into a connection (hire, collaborate, chat) by demonstrating both competence and genuine personality.                                                                                          |
| **Core tension** | The portfolio opens with "Newbie Software Engineer Wannabe" — vulnerability as a positioning strategy. The design must feel competent enough to back this up, but not so polished it contradicts the self-deprecating voice. |

---

## 2. Palette

Named after the warm glow of a CRT terminal — the orange acts as the single signal color against otherwise restrained surfaces.

### Core

| Token                | Light     | Dark      | Usage                       |
| -------------------- | --------- | --------- | --------------------------- |
| `--background`       | `#ffffff` | `#0d0d0d` | Page background             |
| `--foreground`       | `#1a1a1a` | `#efecea` | Body text                   |
| `--card`             | `#ffffff` | `#111418` | Card, sidebar               |
| `--card-alt`         | `#1e293b` | `#1e293b` | About card, section banners |
| `--secondary`        | `#273F4F` | `#273F4F` | FAQ bg, accent surfaces     |
| `--muted`            | `#e6e6e4` | `#1a252c` | Subtle backgrounds          |
| `--muted-foreground` | `#4a4a4a` | `#9aa5ac` | Secondary text              |
| `--border`           | `#d0d0cc` | `#273F4F` | Borders, dividers           |

### Signal

| Token                  | Value                   | Usage                                                 |
| ---------------------- | ----------------------- | ----------------------------------------------------- |
| `--primary`            | `#fe7743`               | CTAs, section labels, hover states, active indicators |
| `--primary-foreground` | `#ffffff`               | Text on primary bg                                    |
| `--primary-shadow`     | `rgba(254,119,67,0.25)` | Glow effects on CTAs                                  |
| `--destructive`        | `#e64b1e`               | Destructive actions                                   |

Green is reserved as a status indicator only — the "available for freelance" ping dot (`#22c55e`).

### Rationale

Orange was chosen over blue (the default for developer portfolios) because:

- Matches the warm, human tone of the copy — not cold/technical
- Pairs naturally with the dark slate backgrounds (complementary contrast)
- Distinctive without being aggressive; the saturation (`#fe7743`) sits in a sweet spot between safety-play and neon

---

## 3. Typography

### Type family

**Poppins** (Google Fonts) is the sole UI typeface, loaded in all weights 100–900 including italics. It was chosen for its geometric precision (suits a developer's systematic thinking) tempered by humanist apertures — it doesn't feel robotic.

Only one typeface is used. The variety comes from weight and tracking:

| Role                        | Weight          | Tracking          | Size range                     | Example                            |
| --------------------------- | --------------- | ----------------- | ------------------------------ | ---------------------------------- |
| **Hero / Section heading**  | 800 (ExtraBold) | `tracking-tight`  | `text-3xl` → `text-7xl` (90px) | "Newbie Software Engineer Wannabe" |
| **Section label** (eyebrow) | 700 (Bold)      | `tracking-widest` | `text-sm`                      | "PROJECTS"                         |
| **Body / Description**      | 400 (Regular)   | `tracking-normal` | `text-sm` → `text-base`        | Service card descriptions          |
| **Nav links**               | 600 (SemiBold)  | `tracking-normal` | `text-sm`                      | "Home", "Stack", "Projects"        |
| **CTA buttons**             | 700 (Bold)      | `tracking-normal` | `text-sm` → `text-lg`          | "View my Work", "Send Message"     |
| **Caption / Badge**         | 500 (Medium)    | `tracking-normal` | `text-xs`                      | Timeline dates, tag chips          |
| **Mono (decoration)**       | 400 (Regular)   | `tracking-normal` | `text-[10px]` → `text-xs`      | Code snippet in About section      |

### Type scale

```
xs  (0.75rem / 12px)   → captions, badges
sm  (0.875rem / 14px)  → body text, nav, section labels
base (1rem / 16px)     → default body
lg  (1.125rem / 18px)  → larger body
xl  (1.25rem / 20px)   → subheadings
2xl (1.5rem / 24px)    → card titles
3xl (1.875rem / 30px)  → section headings (mobile)
4xl (2.25rem / 36px)   → section headings
5xl (3rem / 48px)      → large headings
6xl (3.75rem / 60px)   → hero (md+)
7xl (4.5rem / 72px)    → hero (desktop), used at 90px
```

Line height for headlines: `leading-[1.1]` (tight). Body: `leading-relaxed` (1.625).

---

## 4. Layout

### Container

Max-width: `max-w-6xl` (72rem / 1152px) for most sections. `max-w-7xl` (80rem / 1280px) for project grids and certificate sliders. Padding: `px-4 sm:px-6`.

### Section rhythm

Every section follows the same spine:

```
w-full
py-16 sm:py-24     (vertical padding)
px-4 sm:px-6       (horizontal padding)
```

Sections are stacked vertically with `flex flex-col items-center`. Content inside gets `max-w-6xl mx-auto`.

### Section header pattern

```
┌─ eyebrow ─────────────────────────────┐
│  <span> SECTION LABEL </span>          │  text-primary, tracking-widest, uppercase
│  <h2>  Heading text with emoji 😅  </h2>  │  text-3xl→5xl, font-extrabold
│  <p>   Optional subtitle             </p>  │  text-slate-500/400, max-w-2xl
└───────────────────────────────────────┘
```

### Major section layouts

**Hero (Home)**

```
┌──────────────────────────────────────────┐
│          Floating tech icons             │  absolute positioned, float animation
│                                          │
│       ┌──────────────────────┐           │
│       │  👋 Hello, I'm ...   │           │  pill badge, backdrop-blur
│       │                      │           │
│       │  Newbie Software     │           │  h1, 90px max, font-extrabold
│       │  Engineer Wannabe    │           │
│       │                      │           │
│       │  [View my Work] [CV] │           │  two buttons, full-width on mobile
│       └──────────────────────┘           │
│                                          │
└──────────────────────────────────────────┘
    min-h-[85vh], centered, parallax fade-up
```

**About**

```
┌──────────────────────────────────────────┐
│  ┌────────────────────────────────────┐  │
│  │  Left text block   │  Profile img  │  │  dark card (#1e293b)
│  │  + bio + social    │  (floating)   │  │  rounded-[24→40px]
│  │                    │  + code block │  │  md:flex-row
│  │                    │  + orange     │  │
│  │                    │    circle dec │  │
│  └────────────────────────────────────┘  │
└──────────────────────────────────────────┘
```

**Experience — Timeline**

```
┌──────────────────────────────────────────┐
│  Left (5/12)        │  Right (7/12)      │  lg:flex-row
│  - "Things I've     │                     │
│    done outside     │  ●─── Card ───────┐ │  timeline dots connected
│    my localhost"    │  ●─── Card ───────┤ │  by vertical line
│  - Track record     │  ●─── Card ───────┘ │  staggerChildren: 0.2
│    card             │                     │
└──────────────────────────────────────────┘
```

**Projects — Filtered Grid**

```
┌──────────────────────────────────────────┐
│            "Some of the                  │
│             projects I have built 😅"    │
│                                          │
│  [All] [Web App] [AI] [Mobile]           │  category filter pills
│                                          │
│  ┌─────┐ ┌─────┐ ┌─────┐               │
│  │Card │ │Card │ │Card │               │  3 cols desktop
│  └─────┘ └─────┘ └─────┘               │  2 cols tablet
│  ┌─────┐ ┌─────┐                         │  1 col mobile
│  │Card │ │Card │                        │
│  └─────┘ └─────┘                        │
└──────────────────────────────────────────┘
```

### Border radius system

| Token            | Value           | Usage                          |
| ---------------- | --------------- | ------------------------------ |
| `--radius`       | 10px (0.625rem) | Base shadcn/ui                 |
| `rounded-xl`     | 14px            | Inputs, small cards            |
| `rounded-2xl`    | 16px            | Cards, containers              |
| `rounded-3xl`    | 24px            | Large containers, modals       |
| `rounded-[32px]` | 32px            | Project cards                  |
| `rounded-[40px]` | 40px            | About card, footer top         |
| `rounded-full`   | 9999px          | Navbar, buttons, pills, badges |

---

## 5. Motion

### Philosophy

Motion is atmospheric, not instructional. The goal is a sense of depth and life without distracting from content. Three tiers:

| Tier                 | Technique                                                                 | Where                                                                                | Duration/Easing           |
| -------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------- |
| **Ambient**          | Parallax blur circles (6 large orange orbs), floating tech icons, marquee | Background, hero, tools section                                                      | Infinite, 4–20s           |
| **Scroll-triggered** | fadeUp, fadeIn, fadeLeft, fadeRight                                       | Section reveals on viewport entry                                                    | 0.8–1s, `easeOut`         |
| **Scroll-linked**    | useTransform (y, opacity, scale)                                          | Hero (fades up on scroll), Contact form (scale/opacity), Tools header, Timeline left | Tied to `scrollYProgress` |
| **Hover**            | Lift (-translate-y-4), scale, border color shift, gradient overlay        | Cards, buttons, badges, social links                                                 | 0.3s, `easeOut`           |

### Orchestration

- **Stagger**: Experience timeline uses `staggerChildren: 0.2` for cascading reveal
- **Reduced motion**: No custom reduced-motion queries yet — relies on browser defaults. Motion library respects `prefers-reduced-motion` at the browser level.
- **Smooth scroll**: Lenis with `lerp: 0.1`, `duration: 1.2`, plus a 3px orange scroll-progress bar at the viewport top.

### Signature animation

The 6 parallax orange circles are the single most distinctive motion element. They drift at different speeds (some positive, some negative Y) as the user scrolls, creating a sense of the page breathing. They're never sharp — all use `blur-[100px→180px]` — so they read as atmospheric light, not objects.

---

## 6. Voice & Copy

### Tone

Casual, self-deprecating, Indonesian-bilingual developer voice. Uses emojis deliberately (👋, 😅, 🏆, 🔥, 🚀) as tonal markers. Not slang-heavy but unmistakably not corporate.

### Recurring copy patterns

| Pattern                 | Example                                                       | Why it works                                                         |
| ----------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------- |
| Self-deprecating opener | "Newbie Software Engineer Wannabe"                            | Disarms ego, invites sympathy, then proves competence below the fold |
| Placeholder-as-hook     | "Things I've done outside my localhost"                       | Developer in-joke that signals "I code a lot"                        |
| Emoji-as-period         | "Some certifications to back the grind 🏆"                    | Tone marker — keeps it from feeling like LinkedIn                    |
| Direct address          | "What do I use for work? Check this out 🔥"                   | Conversational, not brochure-like                                    |
| Honest framing          | "Still learning, still experimenting, still shipping things." | Undercuts impostor syndrome with action                              |

### Section label convention

Every section has an uppercase, `tracking-widest`, `text-primary` label preceding the heading. These labels are single English words:

> ABOUT ME · MY SERVICES · TECH STACK · EXPERIENCES · PROJECTS · CERTIFICATES · FAQ · CONTACT

These serve as structural wayfinding — they're always visible in the nav and anchor-linked.

---

## 7. Component Architecture

### Navbar

Sticky at `top-4`, centered, `max-w-6xl`. Glass-morphism (`bg-white/80 dark:bg-[#111]/80 backdrop-blur-md`), rounded-full, border. Logo is a `Terminal` icon in a primary-tinted square plus "Nerd Dev" in ExtraBold. Desktop: 8 nav links + CTA "Let's Talk" + theme toggle. Mobile: hamburger → full-width dropdown with `rounded-3xl`.

### Project cards

```tsx
<Card>
  <Image rotation: -10deg />   // subtle tilt for depth
  <Overlay>
    <Category pill />
    <Title />                   // group-hover turns primary
    <Tags />                    // max 3, white bg black text
    <Actions>                   // Demo (outline) + Github (orange filled)
  </Overlay>
</Card>
```

### Certificate cards

Full-bleed background image, `h-[280px]`, `min-w-[300px]` (horizontal slider on homepage, grid on /certificate page). White border (`6px`). Hover reveals title + issuer + date in frosted-glass badges.

### Buttons

Primary: `bg-primary text-white rounded-full shadow-xl shadow-orange-500/25 hover:bg-primary/90`. Outline: `border border-slate-200 dark:border-slate-700 bg-white dark:bg-card`. Both use `active:scale-[0.98]` for tactile feedback.

### Section separators

None. Sections stack with `py-16 sm:py-24`. The visual separation comes from alternating background colors:

- White/transparent (hero, about content, tools, experience, projects, certificates, contact)
- Dark slate `bg-secondary` (FAQ)

The footer breaks the pattern as a dark `bg-slate-900 dark:bg-card` with `rounded-t-[40px]`.

### Border radius choices by intent

| Intent                                | Radius                              |
| ------------------------------------- | ----------------------------------- |
| Primary CTA (hero buttons)            | full (pill)                         |
| Cards with content preview            | rounded-2xl (16px) → rounded-[32px] |
| Container cards (About, Contact form) | rounded-3xl (24px) → rounded-[40px] |
| Inputs, badges, small elements        | rounded-xl (14px)                   |
| Theme toggle, social icons            | full (circle)                       |

---

## 8. Signature Element

### The parallax orange glow

The 6 blurred orange circles that drift at different speeds as the user scrolls is the single most memorable visual element. It is the design's risk: orange blur is a decorative effect that could feel like an AI-generated default. It earns its place because:

1. **It mirrors the orange accent** — the same #fe7743 color, so it's not an extra color, just an amplification of the existing primary.
2. **It has physics** — each circle moves at a different rate and direction, mapped to scroll position. This feels intentional, not random.
3. **It stays background** — always behind content, always blurred enough (`blur-[100px]` min) to never compete with text legibility.
4. **It only appears on the homepage** — not overused across subpages.

The design's real risk is not the glow but the **copy tone**. "Newbie Software Engineer Wannabe" as the hero headline is what most portfolios would never dare. The design's job is to make that headline feel earned — the projects, certificates, experience, and professional bio below it must deliver on the implicit promise: "I'm self-aware about what I don't know, but here's proof of what I do."

---

## 9. Responsive Behavior

| Breakpoint              | Key changes                                                                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Mobile** (<640px)     | Single column everywhere. Hero text drops to `text-4xl`. Buttons full-width. About section stacks (image below text). Timeline dots hidden. |
| **Tablet** (640–1024px) | 2-column project grid. About becomes side-by-side. Nav collapses to hamburger.                                                              |
| **Desktop** (>1024px)   | 3-column project grid. Full nav visible. Timeline dots visible. Floating decorations shown.                                                 |

---

## 10. Edge Cases & Open Questions

| Issue               | Status                                                                                                                                               |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Reduced motion**  | No explicit `prefers-reduced-motion` overrides. Motion library provides defaults. Consider adding a `motion-safe:` variant for the parallax circles. |
| **Loading states**  | Skeleton components exist for projects (4-card skeleton). No loading states for experience, certificates, or FAQ yet.                                |
| **Empty states**    | Project list shows "No projects found" when filter returns empty. No empty state for certificates or experience.                                     |
| **Long content**    | Card descriptions capped at 3 visible lines via `line-clamp-3`. Expand on hover/click not implemented.                                               |
| **Image fallbacks** | Project and certificate images load from Cloudinary via URL. No fallback placeholder if image fails.                                                 |
| **Font loading**    | Poppins loaded via `next/font/google` with `display: swap`. Flash of invisible text is mitigated by the swap strategy.                               |

---

## 11. Design Precedents & What Was Rejected

| Rejected direction                             | Reason                                                                                                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Monospace-heavy "developer terminal" aesthetic | Too on-the-nose for "Nerd Dev"; the Terminal icon in the nav is sufficient reference                                                           |
| Minimalist black/white with no accent          | Would contradict the warm, human copy tone                                                                                                     |
| Neon gradients (purple → cyan)                 | Reads as generic SaaS/startup template; clashes with the warm orange                                                                           |
| Serif display face for headings                | Too formal for "Newbie Wannabe"; Poppins keeps it approachable                                                                                 |
| Heavy data visualization                       | Overengineering for a portfolio; the physics background is better served by the precision of the layout and spacing rather than literal charts |
| Grid background / architectural lines          | Common dev portfolio trope; the organic blur circles intentionally push against it                                                             |

---

## 12. Token Reference

```css
/* Light mode */
--background: #ffffff;
--foreground: #1a1a1a;
--card: #ffffff;
--primary: #fe7743;
--secondary: #273F4F;
--muted: #e6e6e4;
--border: #d0d0cc;

/* Dark mode */
.dark {
  --background: #0d0d0d;
  --foreground: #efecea;
  --card: #111418;
  --primary: #fe7743;
  --secondary: #273F4F;
  --muted: #1a252c;
  --border: #273F4F;
}

/* Type */
--font-sans: Poppins, ui-sans-serif, system-ui, sans-serif;
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, ...;

/* Radius */
--radius: 0.625rem; /* 10px base */
--radius-xl: 14px;   /* calc(radius + 4px) */

/* Shadow */
--shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.1), 0 8px 10px -1px hsl(0 0% 0% / 0.1);
--shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);

/* Custom shadow (used inline) */
shadow-xl shadow-orange-500/25  /* CTA glow */
```

---

## 13. Revision History

| Date    | Change                                                              |
| ------- | ------------------------------------------------------------------- |
| Initial | Established design system based on existing codebase implementation |
