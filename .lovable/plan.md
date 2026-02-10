

# Real Client Testimonials Section with Google Review Schema

## What We're Building

A new dedicated testimonials section on the homepage featuring real client reviews with names, profile photos, star ratings, and Google-compatible Review schema markup for SEO rich results.

## Where It Fits

The new `HomeTestimonials` component will be placed between `HomeClientLogoMarquee` and `HomeQuickChoice` in the homepage flow, complementing the existing anonymous micro-testimonials with richer, identity-backed reviews.

## Plan

### 1. New Component: `src/components/home/HomeTestimonials.tsx`

- Display 6 real client testimonials in a responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Each card includes:
  - Client photo (Avatar component with initials fallback)
  - Full name and business role/location
  - 5-star rating (filled gold stars)
  - Quote text
  - Google icon badge ("Google Review" label for credibility)
- Uses existing GlassCard, SectionHeader, and brand design tokens (black + gold, glassmorphism)
- Framer Motion staggered reveal animation
- Fully localized via i18n keys

### 2. New Schema Component: `ReviewSchema` in `src/components/seo/StructuredData.tsx`

- Add `AggregateRating` to the existing LocalBusiness schema (e.g., 4.9 rating, 6 reviews)
- Add individual `Review` entries with author name, rating, and review body
- This enables Google rich results (star ratings in search snippets)

### 3. Translation Keys

Add `home.testimonials.*` keys to both `nl.json` and `en.json`:
- Section title, subtitle
- 6 testimonials with: `name`, `role`, `quote`, `rating`
- All written in natural nl-BE tone

### 4. Homepage Integration

Update `src/pages/Index.tsx` to import and render `HomeTestimonials` between `HomeClientLogoMarquee` and `HomeQuickChoice`.

## Files Changed

| File | Action |
|------|--------|
| `src/components/home/HomeTestimonials.tsx` | Create new component |
| `src/components/seo/StructuredData.tsx` | Add Review + AggregateRating schema |
| `src/pages/Index.tsx` | Import and place new section |
| `src/i18n/locales/nl.json` | Add `home.testimonials` keys |
| `src/i18n/locales/en.json` | Add `home.testimonials` keys |

## Technical Details

- Testimonial data is defined as a static array inside the component (names, avatar URLs, ratings)
- Avatar images will use placeholder URLs (e.g., `ui-avatars.com` API for generated initials) since real client photos are not yet available -- these can be swapped later
- The Review schema uses `schema.org/Review` with `itemReviewed` pointing to the existing LocalBusiness `@id`
- No database changes needed; all content lives in i18n locale files
- Component uses `memo` and `forwardRef` following existing patterns

