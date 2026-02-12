/**
 * i18n Parity Check Script
 *
 * Compares all locale JSON files against en.json (source of truth).
 * Outputs a report with missing and extra keys per locale.
 *
 * Run: npx tsx scripts/i18n-parity-check.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOCALES_DIR = resolve(__dirname, '../src/i18n/locales');
const LOCALES = ['ar', 'bn', 'es', 'fr', 'hi', 'it', 'nl', 'pl', 'pt', 'ru', 'tr', 'zh'];

function flattenKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...flattenKeys(value as Record<string, unknown>, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

// Load en.json
const en = JSON.parse(readFileSync(resolve(LOCALES_DIR, 'en.json'), 'utf-8'));
const enKeys = new Set(flattenKeys(en));

interface LocaleReport {
  missing: string[];
  extra: string[];
  missingCount: number;
  extraCount: number;
}

const report: Record<string, LocaleReport> = {};

for (const locale of LOCALES) {
  const filePath = resolve(LOCALES_DIR, `${locale}.json`);
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (e) {
    report[locale] = { missing: [...enKeys], extra: [], missingCount: enKeys.size, extraCount: 0 };
    continue;
  }

  const localeKeys = new Set(flattenKeys(data));
  const missing = [...enKeys].filter(k => !localeKeys.has(k)).sort();
  const extra = [...localeKeys].filter(k => !enKeys.has(k)).sort();

  report[locale] = { missing, extra, missingCount: missing.length, extraCount: extra.length };
}

// Summary
console.log('\n=== i18n Parity Report ===\n');
console.log(`Source of truth: en.json (${enKeys.size} keys)\n`);
for (const locale of LOCALES) {
  const r = report[locale];
  const status = r.missingCount === 0 && r.extraCount === 0 ? '✅' : '❌';
  console.log(`${status} ${locale}.json — missing: ${r.missingCount}, extra: ${r.extraCount}`);
}

// Write report
const outPath = resolve(__dirname, 'i18n-parity-report.json');
writeFileSync(outPath, JSON.stringify(report, null, 2));
console.log(`\nReport written to: ${outPath}\n`);
