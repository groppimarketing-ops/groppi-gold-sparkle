import { describe, it } from 'vitest';
import fs from 'fs';
import path from 'path';

const LOCALES_DIR = path.resolve(__dirname, '../i18n/locales');

const KEEP_VALUES = new Set([
  'GROPPI', 'Gold Standard', 'Beyond Standard', 'SEO', 'Google', 'WhatsApp',
  'Meta', 'Facebook', 'Instagram', 'LinkedIn', 'TikTok', 'CTA', 'API', 'CRM',
  'EU', 'BE', 'ROAS', 'KPI', '%', 'Dashboard', 'Templates',
  // Extended technical/brand terms that are standard in Dutch
  'Blog', 'Portfolio', 'Email', 'email', 'Budget', 'Branding', 'SaaS',
  'Newsletter', 'Reels', 'Content', 'ROI', 'E-commerce', 'App', 'UX', 'UI',
  'Starter', 'Growth', 'Pro', 'Premium', 'B2B', 'B2C',
  'Pinterest', 'YouTube', 'X (Twitter)', 'Google Business',
  'Freelance', 'Remote', 'Hybrid',
]);

const KEEP_PATTERNS = [
  /^\d+[%+KM€]/, /^[€$]\d/, /^\+\d/, /^#\d/, /^✦/, /^⏱/,
  /GROPPI/i, /^\d+\s?(sec|min|MB|px)/,
  /^https?:\/\//, /^[A-Z]{2,5}$/, // Pure acronyms
];

function flattenKeys(obj: any, prefix = ''): Map<string, string> {
  const map = new Map<string, string>();
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      for (const [fk, fv] of flattenKeys(v, full)) map.set(fk, fv);
    } else if (typeof v === 'string') {
      map.set(full, v);
    }
  }
  return map;
}

describe('NL audit: find exact EN matches', () => {
  it('lists all keys where nl === en and not in KEEP', () => {
    const en = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'en.json'), 'utf-8'));
    const nl = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, 'nl.json'), 'utf-8'));
    const enKeys = flattenKeys(en);
    const nlKeys = flattenKeys(nl);

    const translate: string[] = [];
    const keep: string[] = [];

    for (const [key, nlVal] of nlKeys) {
      const enVal = enKeys.get(key);
      if (!enVal || nlVal !== enVal) continue;
      if (nlVal.length < 3) continue;

      const isKeep = KEEP_VALUES.has(nlVal.trim()) || KEEP_PATTERNS.some(p => p.test(nlVal));
      if (isKeep) {
        keep.push(key);
      } else {
        translate.push(key);
      }
    }

    console.log(`\n=== TRANSLATE_REQUIRED (${translate.length}) ===`);
    translate.forEach(k => console.log(`  "${k}": "${nlKeys.get(k)}"`));
    console.log(`\n=== KEEP (${keep.length}) ===`);
    keep.forEach(k => console.log(`  "${k}": "${nlKeys.get(k)}"`));
  });
});
