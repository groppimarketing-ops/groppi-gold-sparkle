

# Redesign Hero Section -- "Gold Standard" Spectacle

## Overview

Replace the current `HeroSection` component with a visually stunning "Gold Standard" hero inspired by the provided HTML mockup. The new hero keeps the existing video background but adds floating gold icons, rising gold particles, animated gold chart bars (LEADS / SALES / ROI), and a refined content hierarchy -- all fully integrated with i18n, RTL, reduced motion, and the existing design system.

---

## What Changes

### 1. Update `HeroSection.tsx` (full rewrite)

The new component preserves all existing functionality (video background, poster fallback, i18n, RTL, reduced motion, scroll indicator) and adds:

- **Floating Gold Icons** -- 15 absolutely positioned Lucide icons (TrendingUp, BarChart3, Rocket, Crown, Gem, Target, Star, Zap, Award, Globe, Sparkles, ChartLine, DollarSign, Users, Eye) with a slow `floatGold` keyframe animation. Each icon is gold-colored with drop-shadow glow, pointer-events none.

- **Rising Gold Particles** -- 10 small gold circles that rise from the bottom with fade-out, using a CSS `riseGold` keyframe. Replaces the current Framer Motion particle dots.

- **Content hierarchy** (centered):
  1. Gold logo icon (Crown with shimmer animation)
  2. "GOLD STANDARD" headline (existing `gold-gradient-text`)
  3. "GROWTH . CONTENT . ROI" subtitle in a bordered pill
  4. Animated gold chart bars (3 bars: LEADS, SALES, ROI) with breathing glow
  5. Primary CTA button ("ENTER" / i18n `ctaPrimary`) -- gold pill style
  6. Footer micro-text ("BEYOND STANDARD")

- **Scroll indicator** stays as-is (ChevronDown at bottom).

### 2. Add CSS keyframes to `index.css`

Add three new keyframes under the existing `@layer utilities` block:

```css
@keyframes floatGold {
  0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity:0.4; }
  25%  { transform: translate(30px,-40px) rotate(15deg) scale(1.2); opacity:0.8; }
  50%  { transform: translate(-25px,20px) rotate(-10deg) scale(0.9); opacity:0.6; }
  75%  { transform: translate(20px,30px) rotate(20deg) scale(1.1); opacity:0.7; }
  100% { transform: translate(0,0) rotate(0deg) scale(1); opacity:0.4; }
}

@keyframes riseGold {
  0%   { transform: translateY(0) scale(1); opacity:0.8; }
  100% { transform: translateY(-700px) scale(1.8); opacity:0; }
}

@keyframes barBreath {
  0%   { box-shadow: 0 0 15px #D4AF37; opacity:0.8; }
  100% { box-shadow: 0 0 45px #FFD700; opacity:1; }
}
```

Plus utility classes:

```css
.animate-float-gold { animation: floatGold 20s infinite ease-in-out; }
.animate-rise-gold  { animation: riseGold 8s infinite ease-out; }
.animate-bar-breath { animation: barBreath 2.5s infinite alternate; }
```

### 3. Add i18n keys (all locale files)

Add the following keys under `home.heroNew` in every locale file. The content uses existing keys where possible:

```json
"heroNew": {
  ...existing keys stay...
  "logoAlt": "GROPPI Gold Standard",
  "chartLeads": "LEADS",
  "chartSales": "SALES",
  "chartRoi": "ROI",
  "tagline": "GROWTH · CONTENT · ROI",
  "beyondStandard": "✦ BEYOND STANDARD ✦"
}
```

These 5 new keys will be added to all 15 locale files (nl, en, fr, de, es, it, pt, pl, tr, ru, zh, ar, ur, bn, hi).

---

## What Stays the Same

- Video background + poster fallback
- Dark multi-stop overlay for text readability
- RTL support (dir attribute, icon mirroring)
- Reduced motion respect (skip animations)
- Scroll-to-services indicator
- Header/Footer remain untouched (social icons + language switcher live in Header, not Hero)

---

## Technical Details

### Component structure (pseudo-JSX)

```text
section (relative, min-height 80vh)
  |-- Video BG layer (z-0)         [existing]
  |-- Dark overlay (z-1)           [existing]
  |-- Floating gold icons (z-2)    [NEW - 15 Lucide icons, absolute, pointer-events-none]
  |-- Rising gold particles (z-3)  [NEW - 10 divs, bottom-up animation]
  |-- Content (z-10)               [UPDATED layout]
  |   |-- Crown icon (shimmer)
  |   |-- H1 "GOLD STANDARD"
  |   |-- Subtitle pill "GROWTH . CONTENT . ROI"
  |   |-- Chart bars (3 animated bars)
  |   |-- CTA button (gold pill)
  |   |-- Micro footer text
  |-- Scroll indicator (z-10)      [existing]
```

### Reduced motion handling

When `prefers-reduced-motion` is active:
- Floating icons render statically (no animation)
- Particles hidden entirely
- Chart bars show without breathing animation
- Crown icon without shimmer

### Files modified

| File | Change |
|------|--------|
| `src/components/home/HeroSection.tsx` | Full rewrite with new visual layout |
| `src/index.css` | Add 3 keyframes + 3 utility classes |
| `src/i18n/locales/*.json` (x15) | Add 5 new `home.heroNew.*` keys each |

