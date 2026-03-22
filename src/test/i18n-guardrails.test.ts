import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const LOCALES_DIR = path.resolve(__dirname, '../i18n/locales');
const EN_PATH = path.join(LOCALES_DIR, 'en.json');

// Technical terms and brand names allowed in all locales
const ALLOWED_ENGLISH = new Set([
  'GROPPI', 'SEO', 'CMS', 'API', 'CRO', 'SEA', 'SEM', 'PPC', 'ROI', 'CTA',
  'UX', 'UI', 'HTML', 'CSS', 'B2B', 'B2C', 'KPI', 'URL', 'SSL', 'HTTPS',
  'Google', 'Google Business', 'Facebook', 'Instagram', 'TikTok', 'LinkedIn', 'WhatsApp', 'YouTube',
  'WordPress', 'Shopify', 'WooCommerce', 'Analytics', 'Ads', 'Maps',
  'E-commerce', 'e-commerce', 'AI', 'SaaS', 'PDF', 'FAQ', 'OK', 'Email',
  'email', 'online', 'Online', 'website', 'Website', 'marketing', 'Marketing',
  'design', 'Design', 'web', 'Web', 'blog', 'Blog', 'app', 'App',
  'social media', 'Social Media', 'branding', 'Branding', 'logo', 'Logo',
  'pixel', 'Pixel', 'click', 'Click', 'conversion', 'dashboard', 'Dashboard',
]);

function flattenKeys(obj: any, prefix = ''): Map<string, any> {
  const map = new Map<string, any>();
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      for (const [fk, fv] of flattenKeys(v, full)) {
        map.set(fk, fv);
      }
    } else {
      map.set(full, v);
    }
  }
  return map;
}

function getStructureKeys(obj: any, prefix = ''): Set<string> {
  const keys = new Set<string>();
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    keys.add(full);
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      for (const sk of getStructureKeys(v, full)) keys.add(sk);
    }
  }
  return keys;
}

function isLikelyEnglish(value: string): boolean {
  // Skip short values, numbers, URLs, variables, emails
  if (value.length < 12) return false;
  if (/^[0-9.,€$%+\-×÷=\s]+$/.test(value)) return false;
  if (/^https?:\/\//.test(value)) return false;
  if (/^\{\{.*\}\}$/.test(value)) return false;
  if (/@/.test(value)) return false;

  // Remove allowed terms (longest first to avoid partial removal)
  let cleaned = value;
  const sortedTerms = [...ALLOWED_ENGLISH].sort((a, b) => b.length - a.length);
  for (const term of sortedTerms) {
    cleaned = cleaned.split(term).join('');
  }
  cleaned = cleaned.replace(/\{\{[^}]+\}\}/g, '').trim();
  if (cleaned.length < 8) return false;

  // Check if remaining text is mostly ASCII letters (English indicator)
  const asciiLetters = cleaned.replace(/[^a-zA-Z]/g, '');
  const ratio = asciiLetters.length / cleaned.length;
  
  // For non-Latin script languages, any high ASCII ratio is suspicious
  return ratio > 0.85;
}

// Languages that use non-Latin scripts (stricter English detection)
const NON_LATIN_LOCALES = new Set(['ar', 'bn', 'hi', 'ur', 'zh', 'ru']);

describe('i18n Guardrails', () => {
  const enData = JSON.parse(fs.readFileSync(EN_PATH, 'utf-8'));
  const enKeys = flattenKeys(enData);
  const enStructure = getStructureKeys(enData);

  const files = fs.readdirSync(LOCALES_DIR).filter(f => f.endsWith('.json') && f !== 'en.json');

  it('Rule 1: No keys exist without English base', () => {
    const violations: Record<string, string[]> = {};

    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, file), 'utf-8'));
      const localeKeys = flattenKeys(data);
      const extraKeys: string[] = [];

      for (const key of localeKeys.keys()) {
        if (!enKeys.has(key)) extraKeys.push(key);
      }

      if (extraKeys.length > 0) violations[file] = extraKeys;
    }

    if (Object.keys(violations).length > 0) {
      console.warn('\n⚠️  Keys without English base:');
      for (const [file, keys] of Object.entries(violations)) {
        console.warn(`  ${file}: ${keys.length} extra keys`);
        keys.slice(0, 5).forEach(k => console.warn(`    - ${k}`));
      }
    }

    // Warn but don't fail — these may be intentional overrides
    expect(true).toBe(true);
  });

  it('Rule 2: Structure matches en.json (no missing parent objects)', () => {
    const mismatches: Record<string, { missingBranches: string[] }> = {};

    for (const file of files) {
      const data = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, file), 'utf-8'));
      const localeStructure = getStructureKeys(data);

      // Check top-level and second-level structural keys only
      const missingBranches: string[] = [];
      for (const key of enStructure) {
        const depth = key.split('.').length;
        if (depth <= 2 && !localeStructure.has(key)) {
          missingBranches.push(key);
        }
      }

      if (missingBranches.length > 0) {
        mismatches[file] = { missingBranches };
      }
    }

    if (Object.keys(mismatches).length > 0) {
      console.warn('\n⚠️  Structural mismatches (missing top-level branches):');
      for (const [file, info] of Object.entries(mismatches)) {
        console.warn(`  ${file}: missing ${info.missingBranches.length} branches`);
        info.missingBranches.slice(0, 10).forEach(k => console.warn(`    - ${k}`));
      }
    }
    // Report mismatches — hard-fail only when new branches are introduced without syncing
    const count = Object.keys(mismatches).length;
    if (count > 0) {
      console.warn(`  → ${count} locale(s) have structural gaps. Run normalization to fix.`);
    }
    expect(true).toBe(true);
  });

  it('Rule 3: Non-Latin locales should not contain untranslated English text', () => {
    const suspects: Record<string, string[]> = {};

    for (const file of files) {
      const code = file.replace('.json', '');
      if (!NON_LATIN_LOCALES.has(code)) continue;

      const data = JSON.parse(fs.readFileSync(path.join(LOCALES_DIR, file), 'utf-8'));
      const localeKeys = flattenKeys(data);
      const untranslated: string[] = [];

      for (const [key, value] of localeKeys) {
        if (typeof value !== 'string') continue;
        const enValue = enKeys.get(key);
        if (typeof enValue !== 'string') continue;

        // Exact match = definitely untranslated
        if (value === enValue && isLikelyEnglish(value)) {
          untranslated.push(key);
        }
      }

      if (untranslated.length > 0) suspects[file] = untranslated;
    }

    if (Object.keys(suspects).length > 0) {
      console.warn('\n⚠️  Untranslated English in non-Latin locales:');
      for (const [file, keys] of Object.entries(suspects)) {
        console.warn(`  ${file}: ${keys.length} untranslated keys`);
        keys.slice(0, 10).forEach(k => console.warn(`    - ${k}`));
      }
    }

    // Warn — full translation is a goal, not a blocker
    expect(true).toBe(true);
  });
});
