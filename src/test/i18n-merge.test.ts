/**
 * This "test" performs the structural merge of en.json into zh/hi/bn.json.
 * It preserves existing translations and adds English values for missing keys.
 * Run with: npx vitest run src/test/i18n-merge.test.ts
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import en from '@/i18n/locales/en.json';
import zh from '@/i18n/locales/zh.json';
import hi from '@/i18n/locales/hi.json';
import bn from '@/i18n/locales/bn.json';

type JsonObj = Record<string, unknown>;

function deepMerge(source: unknown, target: unknown): unknown {
  if (source === null || typeof source !== 'object' || Array.isArray(source)) {
    if (Array.isArray(source)) {
      return Array.isArray(target) && target.length === source.length ? target : source;
    }
    return (target !== undefined && target !== null && typeof target === typeof source) ? target : source;
  }
  const sourceObj = source as JsonObj;
  const targetObj = (target !== null && typeof target === 'object' && !Array.isArray(target)) ? target as JsonObj : {};
  const result: JsonObj = {};
  for (const key of Object.keys(sourceObj)) {
    const sv = sourceObj[key];
    const tv = targetObj[key];
    if (sv !== null && typeof sv === 'object' && !Array.isArray(sv)) {
      result[key] = deepMerge(sv, tv);
    } else {
      result[key] = (tv !== undefined && tv !== null && typeof tv === typeof sv) ? tv : sv;
    }
  }
  return result;
}

function flatKeys(obj: JsonObj, prefix = ''): string[] {
  const keys: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...flatKeys(v as JsonObj, p));
    } else {
      keys.push(p);
    }
  }
  return keys;
}

const enKeys = new Set(flatKeys(en as unknown as JsonObj));
const LOCALES_DIR = resolve(__dirname, '../i18n/locales');

describe('i18n structural merge', () => {
  const targets = [
    { code: 'zh', data: zh },
    { code: 'hi', data: hi },
    { code: 'bn', data: bn },
  ];

  for (const { code, data } of targets) {
    it(`${code}.json should be merged to parity with en.json`, () => {
      const merged = deepMerge(en, data) as JsonObj;
      const mergedKeys = new Set(flatKeys(merged));

      // Write file
      const outPath = resolve(LOCALES_DIR, `${code}.json`);
      writeFileSync(outPath, JSON.stringify(merged, null, 2) + '\n');

      // Verify parity
      const missing = [...enKeys].filter(k => !mergedKeys.has(k));
      console.log(`${code}.json: ${mergedKeys.size} keys (was ${flatKeys(data as unknown as JsonObj).length}). Missing after merge: ${missing.length}`);
      expect(missing).toEqual([]);
    });
  }
});
