
# Golden Glow Effect for Header Navigation Items

## What will change
When you click on any navigation item in the header (Services, Blog, Franchise, etc.), the active item will glow with a golden light effect matching the site's luxury gold aesthetic -- instead of just turning gold text color.

## Changes

### 1. Desktop Navigation Links (Header.tsx)
- **Active state**: Add a golden glow shadow (`box-shadow`) and golden border to the active nav item's background pill, making it clearly "lit up" in gold.
- **Hover state**: Add a subtle gold glow on hover for non-active items too, so the user feels the interactive gold effect before clicking.
- The existing `layoutId="activeNav"` animated background will get enhanced with a gold border glow and gold box-shadow.

### 2. Mobile Navigation Links (Header.tsx)
- Same golden glow treatment for the active item in the mobile slide-down menu.
- Active item gets a gold shadow and brighter gold background tint.

---

## Technical Details

**File: `src/components/layout/Header.tsx`**

Desktop nav links (lines 201-219):
- Active link class: add `text-primary drop-shadow-[0_0_8px_hsl(43_76%_52%/0.6)]` for text glow
- Active `motion.div` background: add gold border + gold box-shadow via style or class: `border-primary/40 shadow-[0_0_15px_hsl(43_76%_52%/0.25)]`
- Hover on non-active links: add `hover:text-primary/90 hover:drop-shadow-[0_0_6px_hsl(43_76%_52%/0.3)]`

Mobile nav links (around lines 380-400):
- Active link: add `shadow-[0_0_12px_hsl(43_76%_52%/0.25)]` and brighter gold background

No new files, no design changes, no layout shifts -- just enhanced glow effects on the existing elements.
