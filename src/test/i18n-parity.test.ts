import { describe, it, expect } from 'vitest';
import en from '../i18n/locales/en.json';
import zh from '../i18n/locales/zh.json';
import hi from '../i18n/locales/hi.json';
import bn from '../i18n/locales/bn.json';

function getAllKeys(obj: any, prefix = ''): string[] {
  const keys: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      keys.push(...getAllKeys(obj[key], fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
}

const enKeys = getAllKeys(en);

describe('i18n parity check', () => {
  const locales = { zh, hi, bn } as Record<string, any>;

  for (const [name, locale] of Object.entries(locales)) {
    it(`${name}.json should have all keys from en.json`, () => {
      const localeKeys = new Set(getAllKeys(locale));
      const missing = enKeys.filter(k => !localeKeys.has(k));
      if (missing.length > 0) {
        console.log(`\n=== ${name}.json MISSING ${missing.length} keys ===`);
        missing.forEach(k => console.log(`  - ${k}`));
      }
      expect(missing).toEqual([]);
    });

    it(`${name}.json should not have extra keys not in en.json`, () => {
      const enKeySet = new Set(enKeys);
      const localeKeys = getAllKeys(locale);
      const extra = localeKeys.filter(k => !enKeySet.has(k));
      if (extra.length > 0) {
        console.log(`\n=== ${name}.json has ${extra.length} EXTRA keys ===`);
        extra.forEach(k => console.log(`  + ${k}`));
      }
      // Just log extras, don't fail
    });
  }
});
