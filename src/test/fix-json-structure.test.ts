import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Fix structural issue: keys like contact, footer, franchise, about, stats, admin, social, planBuilder
 * are incorrectly nested inside `home` in zh/hi/bn.json.
 * They need to be moved to the root level to match en.json structure.
 * After moving, run the merge to ensure full parity.
 */

const LOCALES_DIR = resolve(__dirname, '../i18n/locales');

// Keys that should be at root level (per en.json), not inside home
const ROOT_KEYS = [
  'about', 'contact', 'footer', 'franchise', 'stats', 'admin', 'social', 'planBuilder',
];

type JsonObj = Record<string, unknown>;

function deepMergePreferTarget(source: unknown, target: unknown): unknown {
  if (source === null || typeof source !== 'object' || Array.isArray(source)) {
    if (target !== undefined && target !== null && typeof target === typeof source) return target;
    return source;
  }
  const s = source as JsonObj;
  const t = (target !== null && typeof target === 'object' && !Array.isArray(target)) ? target as JsonObj : {};
  const result: JsonObj = {};
  for (const key of Object.keys(s)) {
    if (s[key] !== null && typeof s[key] === 'object' && !Array.isArray(s[key])) {
      result[key] = deepMergePreferTarget(s[key], t[key]);
    } else {
      result[key] = (t[key] !== undefined && t[key] !== null && typeof t[key] === typeof s[key]) ? t[key] : s[key];
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

describe('Fix JSON structure for zh, hi, bn', () => {
  const enJson = JSON.parse(readFileSync(resolve(LOCALES_DIR, 'en.json'), 'utf-8'));
  const enKeyCount = flattenKeys(enJson).length;

  for (const locale of ['zh', 'hi', 'bn']) {
    it(`fixes ${locale}.json structure`, () => {
      const filePath = resolve(LOCALES_DIR, `${locale}.json`);
      const data = JSON.parse(readFileSync(filePath, 'utf-8')) as JsonObj;

      // Step 1: Move misplaced keys from home.xxx to root xxx
      const home = data.home as JsonObj | undefined;
      if (home) {
        for (const key of ROOT_KEYS) {
          if (home[key] && typeof home[key] === 'object') {
            // If root already has partial data, deep merge; otherwise just move
            if (data[key] && typeof data[key] === 'object') {
              // Merge home.key INTO root key (home values take priority as they're the translations)
              data[key] = deepMergePreferTarget(data[key] as JsonObj, home[key] as JsonObj);
            } else {
              data[key] = home[key];
            }
            delete home[key];
          }
        }
        // Also remove any marker keys
        delete home['_footer_merged'];
      }

      // Also remove root-level marker keys
      delete data['_footer_merged'];

      // Step 2: Deep merge with en.json to ensure full structural parity
      const merged = deepMergePreferTarget(enJson, data) as JsonObj;
      const mergedKeys = flattenKeys(merged);

      // Write
      writeFileSync(filePath, JSON.stringify(merged, null, 2) + '\n');

      console.log(`${locale}.json: ${mergedKeys.length} keys (target: ${enKeyCount})`);
      expect(mergedKeys.length).toBe(enKeyCount);
    });
  }
});
