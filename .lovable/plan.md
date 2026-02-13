
# Website Launch Readiness Review - GROPPI.be

## ✅ Completed Items

| # | Item | Status |
|---|------|--------|
| 3 | Fix RLS policies | ✅ Done — removed permissive INSERT on contact_messages & job_applications |
| 4 | Hero video performance on mobile | ✅ Done — iframes hidden on mobile, replaced with lightweight play button |
| 5 | Hero social icons responsiveness | ✅ Done — responsive gap/padding/sizing for mobile |
| 7 | Add lastmod to sitemap | ✅ Done — all URLs have lastmod dates |
| 8 | Webmanifest + theme-color | ✅ Done — site.webmanifest + meta theme-color added |
| 9 | Sync lang attribute with i18n | ✅ Already done — applyDocumentDirection() sets document.documentElement.lang |

## 🔲 Items Requiring Your Action

### 1. Publish + Connect Domain (groppi.be)
- Click **Publish** in Lovable
- Go to Project Settings > Domains
- Connect `groppi.be` and `www.groppi.be`
- Add DNS records: A record → `185.158.133.1` + TXT verification at your registrar

### 2. Add GTM/GA4 Tracking Scripts
You need to provide your **GTM Container ID** (e.g., `GTM-XXXXXXX`). Once provided, I'll add the snippet to `index.html` respecting cookie consent.

### 6. Google Search Console Verification
Add your verification meta tag once you have access to Google Search Console.
