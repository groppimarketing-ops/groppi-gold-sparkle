import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { languages } from '@/i18n/config';

// RTL languages that need special handling
const RTL_LANGUAGES = ['ar', 'ur', 'he', 'fa'] as const;

// Forbidden characters in Flemish (nl-BE) content - Arabic punctuation/numerals
const FORBIDDEN_NL_CHARS = ['،', '؟', '؛', 'ـ', '٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

// Forbidden brand misspellings
const BRAND_MISSPELLINGS = ['Groopy', 'GROOPY', 'Groppi ', 'GROPPi', 'GROPPII', 'Groopi'];

export interface LocaleDirection {
  dir: 'ltr' | 'rtl';
  isRtl: boolean;
  locale: string;
  textStyle: React.CSSProperties;
  isolateStyle: React.CSSProperties;
}

/**
 * Hook to get locale direction and styles for proper i18n handling
 */
export function useLocaleDirection(): LocaleDirection {
  const { i18n } = useTranslation();
  
  return useMemo(() => {
    const currentLang = languages.find(l => l.code === i18n.language);
    const isRtl = RTL_LANGUAGES.includes(i18n.language as any);
    const dir = isRtl ? 'rtl' : 'ltr';
    
    return {
      dir,
      isRtl,
      locale: i18n.language,
      // Style for text that should follow locale direction
      textStyle: {
        direction: dir,
        textAlign: isRtl ? 'right' : 'left',
      } as React.CSSProperties,
      // Style for isolating text from surrounding direction context
      isolateStyle: {
        unicodeBidi: 'isolate',
        direction: 'ltr', // Force LTR for brand names, numbers, etc.
      } as React.CSSProperties,
    };
  }, [i18n.language]);
}

/**
 * Validate text for forbidden characters in Flemish locale
 * Returns array of found forbidden characters
 */
export function validateFlemishText(text: string): string[] {
  return FORBIDDEN_NL_CHARS.filter(char => text.includes(char));
}

/**
 * Validate brand name spelling
 * Returns array of found misspellings
 */
export function validateBrandSpelling(text: string): string[] {
  return BRAND_MISSPELLINGS.filter(misspelling => text.includes(misspelling));
}

/**
 * Clean text from RTL marks and normalize for LTR display
 */
export function cleanLtrText(text: string): string {
  // Remove RTL/LTR marks: RLM (U+200F), LRM (U+200E), RLE (U+202B), PDF (U+202C)
  return text
    .replace(/[\u200F\u200E\u202B\u202C\u202A\u202D\u202E\u2066\u2067\u2068\u2069]/g, '')
    .trim();
}

/**
 * Wrap brand name in LTR isolate for RTL contexts
 */
export function isolateBrandName(text: string): string {
  // Replace GROPPI with an LTR-isolated version
  return text.replace(/GROPPI/g, '\u2066GROPPI\u2069');
}

export default useLocaleDirection;
