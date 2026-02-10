

# Services Video Player Overhaul

## What Changes
Fix the video modal so it never crops at 100% zoom, add fullscreen support, add a quality selector (best-effort), and ensure card modal + service detail page use the exact same video mapping.

## Changes Overview

### 1. Video Modal Sizing Fix (ServiceVideoModal.tsx)
- Change modal max-width from `min(900px, 90vw)` to `min(960px, 92vw)`
- Change max-height from `90vh` to `85vh`
- Replace `overflow-y-auto` on the outer modal with a flex column layout so the video area + content below share the available height without scrolling past the viewport
- Video container uses `aspect-video` with `object-fit: contain` -- no cropping, letterboxing is acceptable
- Content below the video (title, bullets, pricing, CTAs) gets `overflow-y-auto` with `flex-shrink` so it scrolls independently if needed, while the video always stays fully visible
- Close button stays `z-20` and always accessible

### 2. Fullscreen Button (ServiceVideoModal.tsx)
- Add a "Fullscreen" icon button (Maximize lucide icon) inside the video area, bottom-right corner
- Uses the native Fullscreen API (`element.requestFullscreen()`) on the video container div
- On mobile: tapping fullscreen expands the video container to fill screen
- ESC exits fullscreen (native browser behavior)
- Styled as a pill button matching the existing duration badge style (glass pill, gold icon)

### 3. Quality Selector (ServiceVideoModal.tsx)
- Add a small dropdown (Auto / 1080p / 720p) next to the fullscreen button
- Since videos are Google Drive embeds (iframes), real quality switching is not possible -- the dropdown renders **disabled** with a tooltip "Quality depends on source"
- If in the future HTML5 `<video>` sources are used, the dropdown will activate (code structure supports it but currently disabled)
- No playback breakage: the selector is purely cosmetic for iframe sources

### 4. Performance
- Video iframe only mounts when `isOpen === true` (already implemented, kept as-is)
- On close: iframe unmounts (React handles this via conditional render)
- `loading="lazy"` kept on iframe
- No autoplay on page load (user must click to open modal first)

### 5. Video Mapping Consistency (serviceVideos.ts)
- The central mapping already covers all 10 services and is used by both ServiceVideoModal (via `getVideoIdBySlug(service.id)`) and ServicePageHero (via slug derived from serviceKey)
- **Problem**: ServicePageHero derives slug from camelCase serviceKey (e.g., `contentProduction` -> `content-production`), and ServiceDetail passes `serviceKey` as camelCase. The mapping keys match the slugs, so this works correctly
- **Verification**: The 7 services listed by the user map to existing keys: `content-production`, `business-website`, `reputation`, `seo`, `ads-management`, `ecommerce-website`, `one-page-website` -- all present in the mapping
- No changes needed to the mapping file itself; IDs stay identical

### 6. ServiceDetailModal Video Tab (ServiceDetailModal.tsx)
- The "Video" tab inside the detail modal currently uses `service.videoUrl` (which may be undefined or a local mp4 path) instead of the centralized Google Drive mapping
- **Fix**: Replace `service.videoUrl` logic with `getVideoIdBySlug(service.id)` + `buildDrivePreviewUrl()`, matching the same source of truth as the card modal
- Add the same fullscreen button to this video embed
- If no video exists, show the existing "Video coming soon" placeholder

### 7. No Design Changes
- Dark glass background, gold border/glow, smooth framer-motion animations all kept
- Close icon stays top-right
- Brand styling (black + gold) untouched
- Card layout on the services page unchanged

---

## Technical Details

### Files Modified

| File | Change |
|------|--------|
| `src/components/services/ServiceVideoModal.tsx` | Resize modal (960px/85vh), flex layout, add fullscreen button, add disabled quality dropdown, ensure no cropping |
| `src/components/services/ServiceDetailModal.tsx` | Replace `service.videoUrl` video logic with centralized `getVideoIdBySlug()` mapping, add fullscreen button |

### No Files Created or Deleted

### Key Implementation Notes

**Modal layout structure (ServiceVideoModal):**
```text
modal container (max-w-[min(960px,92vw)], max-h-[85vh], flex flex-col)
  +-- video area (aspect-video, flex-shrink-0, object-fit: contain)
  |     +-- iframe (Google Drive /preview)
  |     +-- fullscreen button (bottom-right pill)
  |     +-- quality dropdown (bottom-right, disabled for iframes)
  |     +-- duration badge (bottom-left)
  +-- content area (flex-1, overflow-y-auto, min-h-0)
        +-- title, bullets, pricing, CTAs
```

**Fullscreen implementation:**
```text
const handleFullscreen = () => {
  const el = videoContainerRef.current;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    el?.requestFullscreen();
  }
};
```

**Quality selector (disabled for Drive embeds):**
- Renders as a small `<select>` or custom dropdown with options Auto/1080p/720p
- `disabled` attribute set, with `title="Quality depends on source"`
- Styled to match the glass pill aesthetic

