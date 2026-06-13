# Legacy Hoopers — Website Rebuild Design Brainstorm

## Three Stylistic Approaches

### 1. "Court Noir" — Cinematic Sports Editorial
A dark, immersive experience inspired by ESPN Films and Nike campaign microsites. Deep navy-to-black gradients with electric cobalt accents that pulse like arena lights. Typography is bold and condensed — screaming athleticism. Every scroll reveals content like a highlight reel unfolding.
**Probability:** 0.04

### 2. "Blueprint Academy" — Technical Precision
Clean white space meets architectural grid lines. Inspired by sports science labs and scouting reports. Light backgrounds with precise data visualization, blueprint-style line drawings, and a clinical-yet-premium feel. Think: if a basketball academy had a design language by Dieter Rams.
**Probability:** 0.03

### 3. "Legacy Gold" — Heritage & Prestige
Warm golds, deep blacks, and cream textures. Inspired by championship banners and Hall of Fame induction ceremonies. Serif typography meets modern layout. Feels like opening a trophy case — reverent, prestigious, timeless.
**Probability:** 0.03

---

## Selected Approach: "Court Noir" — Cinematic Sports Editorial

### Design Movement
**Sports Brutalism meets Cinematic Editorial** — the raw power of condensed type and bold geometry from brutalist design, softened by cinematic lighting effects, depth-of-field blur, and editorial-grade white space. References: Nike SNKRS app, ESPN+ documentary pages, Kobe Bryant's Mamba Sports Academy branding, NBA Top Shot.

### Core Principles
1. **Darkness as Canvas** — The dark background isn't just a theme; it's the stage. Content emerges from shadow like players stepping into arena spotlights.
2. **Motion as Storytelling** — Every animation has purpose. Scroll-triggered reveals mimic the rhythm of a fast break. Nothing moves without meaning.
3. **Data as Drama** — Stats aren't just numbers; they're cinematic moments. Win streaks glow. Records pulse. Every data point earns its visual weight.
4. **Contrast as Hierarchy** — Electric cobalt (#4a8fd4) against deep navy creates an unmistakable visual hierarchy that guides the eye like a play diagram.

### Color Philosophy
The palette draws from the experience of watching basketball under arena lights — deep shadows punctuated by electric blue spotlights, with gold reserved for championship moments.

| Role | Color | OKLCH | Intent |
|------|-------|-------|--------|
| Canvas | #070d17 | oklch(0.12 0.02 250) | Deep void — the arena in darkness |
| Surface | #0e1e33 | oklch(0.18 0.04 250) | Elevated cards — players stepping forward |
| Primary Accent | #4a8fd4 | oklch(0.63 0.14 245) | Electric cobalt — the spotlight |
| Gold Accent | #f0a500 | oklch(0.78 0.17 75) | Championship gold — reserved for excellence |
| Success | #22c55e | oklch(0.72 0.19 145) | Win green — victory moments |
| Text Primary | #ffffff | oklch(1 0 0) | Pure white — maximum contrast |
| Text Secondary | #94a3b8 | oklch(0.72 0.02 250) | Muted silver — supporting info |

### Layout Paradigm
**Asymmetric Cinematic Panels** — Reject centered, symmetric grids. Instead:
- Hero sections use full-bleed imagery with off-center text positioning
- Content sections alternate between wide editorial spreads and tight data-dense panels
- Horizontal scroll sections for team cards (like a film strip)
- Overlapping layers create depth (cards that break out of their containers)
- Diagonal clip-paths and angled section dividers create forward momentum

### Signature Elements
1. **The Glow Line** — A 3px cobalt accent line that appears throughout: under headers, beside cards, as section dividers. It pulses subtly on hover, like an arena LED strip.
2. **Watermark Typography** — Massive, semi-transparent condensed text in the background of sections (like "RECORDS", "LEGACY", "ELITE") that creates depth and brand reinforcement.
3. **The Stat Ticker** — A persistent, animated stat bar that transitions between key program numbers, always visible, always reinforcing credibility.

### Interaction Philosophy
Interactions should feel like the precision of a well-executed play:
- **Hover states** reveal hidden information (like a scouting report sliding out)
- **Scroll triggers** are choreographed — elements enter in sequence, not all at once
- **Click feedback** is immediate and satisfying — scale(0.97) with a cobalt glow pulse
- **Page transitions** use a quick fade-to-black (like a camera cut) rather than sliding

### Animation Guidelines
- **Entrance:** Elements fade up from 20px below with 0.6s duration, staggered 80ms apart
- **Scroll reveals:** Use intersection observer with 0.2 threshold, animate once only
- **Hover:** 200ms ease-out, translateY(-4px) + subtle box-shadow expansion
- **Numbers:** Count-up animation on stat bars when they enter viewport
- **Background:** Subtle parallax on hero images (0.3x scroll speed)
- **Glow effects:** CSS box-shadow animations with cobalt rgba, 2s infinite pulse on key elements
- **Page load:** Staggered cascade from top — nav → hero text → hero image → stat bar → content

### Typography System
| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|----------|
| Display / H1 | Barlow Condensed | 800 | clamp(42px, 8vw, 80px) | -0.02em |
| Section Headers / H2 | Barlow Condensed | 700 | clamp(28px, 5vw, 44px) | 0.01em |
| Card Titles / H3 | Barlow | 700 | 18-22px | 0 |
| Body | Inter | 400-500 | 15-17px | 0 |
| Labels / Eyebrow | Barlow Condensed | 700 | 11-13px | 0.15em (uppercase) |
| Stats / Numbers | Barlow Condensed | 800 | clamp(30px, 6vw, 64px) | 0.02em |

### Brand Essence
**Legacy Hoopers: Where elite basketball development meets next-generation technology — built for families who demand excellence, not just participation.**

Personality adjectives: **Commanding, Precise, Relentless**

### Brand Voice
Headlines and CTAs sound like a coach who respects your intelligence — direct, confident, no fluff. Microcopy is warm but efficient.

- Example headline: "Five Teams. One Standard. Zero Shortcuts."
- Example CTA: "See the Program →" (not "Get Started Today!")

Ban list: "Welcome to our website", "Get started today", "Join us", "Learn more", "Click here"

### Wordmark & Logo
A bold geometric mark combining a basketball's arc lines with an upward-pointing chevron (representing growth/legacy). The mark is rendered in electric cobalt on dark backgrounds, or deep navy on light surfaces. It's angular, modern, and unmistakably athletic — never rounded or playful.

### Signature Brand Color
**Electric Cobalt (#4a8fd4)** — This isn't just blue. It's the specific frequency of arena spotlights, the glow of a scoreboard, the flash of a championship banner unfurling. It's ownable because it sits between corporate blue and electric cyan — a space no other youth basketball program occupies.
