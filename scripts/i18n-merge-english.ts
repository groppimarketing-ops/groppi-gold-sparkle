/**
 * i18n Structural Parity Merge Script
 * 
 * For each target locale, deep-merges en.json as the structural base.
 * Existing translated values are preserved; missing keys get the English value.
 * Extra keys not in en.json are removed.
 * 
 * Run: npx tsx scripts/i18n-merge-english.ts
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOCALES_DIR = resolve(__dirname, '../src/i18n/locales');
const TARGETS = ['zh', 'hi', 'bn'];

type JsonObj = Record<string, unknown>;

/**
 * Deep merge: uses `source` (en.json) as structural template.
 * For each key in source:
 *   - If target has the key and it's a matching type, keep target value
 *   - If target is missing the key, copy from source (English fallback)
 * Keys in target NOT in source are dropped (extra keys removed).
 */
function deepMerge(source: unknown, target: unknown): unknown {
  // If source is not an object, return target if it exists and is same type, else source
  if (source === null || typeof source !== 'object' || Array.isArray(source)) {
    // For arrays: if target is also an array with same length, keep target; else use source
    if (Array.isArray(source)) {
      if (Array.isArray(target) && target.length === source.length) {
        return target;
      }
      return source;
    }
    // For primitives (strings, numbers, booleans)
    if (target !== undefined && target !== null && typeof target === typeof source) {
      return target;
    }
    return source;
  }

  // Both should be objects
  const sourceObj = source as JsonObj;
  const targetObj = (target !== null && typeof target === 'object' && !Array.isArray(target))
    ? target as JsonObj
    : {};

  const result: JsonObj = {};

  // Iterate source keys IN ORDER (preserves en.json key order)
  for (const key of Object.keys(sourceObj)) {
    const sourceVal = sourceObj[key];
    const targetVal = targetObj[key];

    if (sourceVal !== null && typeof sourceVal === 'object' && !Array.isArray(sourceVal)) {
      // Recurse into nested objects
      result[key] = deepMerge(sourceVal, targetVal);
    } else {
      // Leaf value: keep target if it exists and is a string (translated), else use source
      if (targetVal !== undefined && targetVal !== null && typeof targetVal === typeof sourceVal) {
        result[key] = targetVal;
      } else {
        result[key] = sourceVal;
      }
    }
  }

  return result;
}

function flattenKeys(obj: JsonObj, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...flattenKeys(value as JsonObj, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

// Load en.json
const enJson = JSON.parse(readFileSync(resolve(LOCALES_DIR, 'en.json'), 'utf-8'));
const enKeyCount = flattenKeys(enJson).length;

console.log(`\n=== i18n Structural Parity Merge ===\n`);
console.log(`Source: en.json (${enKeyCount} keys)\n`);

for (const locale of TARGETS) {
  const filePath = resolve(LOCALES_DIR, `${locale}.json`);
  const original = JSON.parse(readFileSync(filePath, 'utf-8'));
  const originalKeys = new Set(flattenKeys(original));

  // Merge
  const merged = deepMerge(enJson, original) as JsonObj;
  const mergedKeys = flattenKeys(merged);

  // Count added keys
  const addedKeys = mergedKeys.filter(k => !originalKeys.has(k));
  const removedKeys = [...originalKeys].filter(k => !new Set(mergedKeys).has(k));

  // Write
  writeFileSync(filePath, JSON.stringify(merged, null, 2) + '\n');


  console.log(`✅ ${locale}.json — ${addedKeys.length} keys added, ${removedKeys.length} extra keys removed. Total: ${mergedKeys.length}`);
}

console.log(`\nDone. All target files now structurally match en.json.\n`);
