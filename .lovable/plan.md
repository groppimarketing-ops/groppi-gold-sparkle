

# Complete Translation Fix Plan: German (de) and Portuguese (pt)

## Problem Summary

The previous "Stage 1 fix" was cosmetic -- it added a few small keys but left enormous sections completely untranslated. Both files are missing thousands of lines of content compared to the English reference (2811 lines).

---

## German (de.json) - Currently 526 lines

### Sections that EXIST and are complete:
- nav, careers, pricing, servicesHome, calculator, common, validation, forms, hero
- home (comprehensive - all subsections)
- about (comprehensive)
- ai
- services (comprehensive - with items, ads, videoModal, wizard, etc.)
- blog (with all 5 full articles)
- planBuilder (comprehensive)
- partner (comprehensive)
- caseStudy (comprehensive with all 8 cases)
- servicePage (comprehensive - all 11 service types + contentCalculator + pricingFAQ + generalFAQ + servicesFAQ)
- terms, privacy, cookies, notFound

### Sections COMPLETELY MISSING (estimated ~450 lines to add):

| Missing Section | Approx Lines | Content |
|----------------|-------------|---------|
| `gallery` | ~12 | Gallery page title, filters (all, web, branding, social, ecommerce) |
| `portfolio` | ~330 | Page meta, NDA disclaimer, filters, modal labels, AND all 20+ portfolio item translations (castello-vicchiomaggio, cose-pazzi, augusto-torino, pummaro, fratelli-roselli, boothuis, sanremo, mangiare, kma, lebanon, il-fuoco, plus 20 NDA projects) |
| `contact` | ~25 | Full contact page (title, subtitle, form labels, success/error messages, address labels) |
| `franchise` | ~25 | Franchise page (title, benefits, requirements, CTA) |
| `footer` | ~20 | Footer with newsletter section (title, placeholder, subscribe, success/error) |
| `stats` | ~10 | Stats with values (years, clients, projects, team) |
| `admin` | ~12 | Admin panel labels (dashboard, articles, media, login) |
| `social` | ~15 | Social media labels (WhatsApp, call, email, follow links) |

---

## Portuguese (pt.json) - Currently 613 lines

### Sections that EXIST and are complete:
- nav, careers, pricing, servicesHome, calculator, common, validation, forms, hero
- home (comprehensive)
- about (comprehensive)
- ai
- services (comprehensive - with all items, ads, videoModal, wizard, etc.)
- blog (with all 5 full articles)
- privacy, terms, social, stats, admin, notFound, footer, cookies

### Sections COMPLETELY MISSING (estimated ~850 lines to add):

| Missing Section | Approx Lines | Content |
|----------------|-------------|---------|
| `gallery` | ~12 | Gallery page title and filters |
| `portfolio` | ~330 | Page meta, NDA, filters, modal, AND all 20+ portfolio items with challenge/approach/results |
| `contact` | ~25 | Full contact page with all form fields |
| `franchise` | ~25 | Franchise page content |
| `planBuilder` | ~100 | Complete plan builder (channels, frequency, ads budget, addons, summary, FAQ) |
| `partner` | ~55 | Partner program (hero, clarity, forWho, value, howItWorks, FAQ, apply, booking) |
| `caseStudy` | ~60 | Case study labels + all 8 case study translations |
| `servicePage` | ~280 | ALL service detail pages (socialMedia, adsManagement, contentProduction, seo, businessWebsite, onePageWebsite, ecommerceWebsite, branding, mobileAppDevelopment, reputation, dataSync) + contentCalculator + pricingFAQ + generalFAQ + servicesFAQ |

---

## Implementation Strategy

Due to the volume (~1,300 total lines to add), this will be done in sub-stages to avoid truncation/errors:

### Sub-stage 1A: German missing sections
Add all 8 missing sections to de.json (~450 lines):
- gallery, portfolio (with ALL items), contact, franchise, footer, stats, admin, social

### Sub-stage 1B: Portuguese structural sections
Add planBuilder, partner, caseStudy, servicePage to pt.json (~495 lines)

### Sub-stage 1C: Portuguese remaining sections
Add gallery, portfolio (with ALL items), contact, franchise to pt.json (~390 lines)

---

## Quality Assurance

- Every key from en.json will be present in both de.json and pt.json
- All portfolio items (real + NDA) will be translated
- All service detail pages will have full benefits, deliverables, and process sections
- Brand name "GROPPI" will remain untranslated
- Technical terms (SEO, CMS, API, etc.) will remain in English where appropriate

