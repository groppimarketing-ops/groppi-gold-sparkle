import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import language files — only 7 supported languages
import nl from './locales/nl.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import tr from './locales/tr.json';
import it from './locales/it.json';
import es from './locales/es.json';
import ar from './locales/ar.json';

// Brand name constant - use this everywhere
export const BRAND_NAME = 'GROPPI';

// RTL languages
export const RTL_LANGUAGES = ['ar'] as const;

export const languages = [
  { code: 'nl', name: 'Nederlands (BE)', dir: 'ltr' as const, flag: '🇧🇪' },
  { code: 'en', name: 'English', dir: 'ltr' as const, flag: '🇬🇧' },
  { code: 'fr', name: 'Français', dir: 'ltr' as const, flag: '🇫🇷' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' as const, flag: '🇹🇷' },
  { code: 'it', name: 'Italiano', dir: 'ltr' as const, flag: '🇮🇹' },
  { code: 'es', name: 'Español', dir: 'ltr' as const, flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', dir: 'rtl' as const, flag: '🇦🇪' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

const resources = {
  nl: { translation: nl },
  en: { translation: en },
  fr: { translation: fr },
  tr: { translation: tr },
  it: { translation: it },
  es: { translation: es },
  ar: { translation: ar },
};

/**
 * Release-safety: Never render raw i18n keys in UI.
 *
 * If a key is missing in the active language, we fall back to English.
 * If it's missing in English too, we return a humanized fallback string.
 */
const EN_FALLBACKS: Record<string, string> = {
  // Content Calculator
  'servicePage.contentCalculator.title': 'Calculate your price in 60 sec',
  'servicePage.contentCalculator.subtitle': 'Choose what you need and get an instant estimate.',
  'servicePage.contentCalculator.step1': 'Choose payment type',
  'servicePage.contentCalculator.oneTime': 'One-time project',
  'servicePage.contentCalculator.monthly': 'Monthly subscription',
  'servicePage.contentCalculator.step2': 'Select your deliverables',
  'servicePage.contentCalculator.posters': 'Posters',
  'servicePage.contentCalculator.reels': 'Reels',
  'servicePage.contentCalculator.videos': 'Videos',
  'servicePage.contentCalculator.articles': 'Articles',
  'calculator.subtotal': 'Subtotal',
  'calculator.total': 'Total',
  'pricing.vatExcludedNote': 'All prices excl. VAT. VAT will be added on the invoice.',

  // Pricing FAQ
  'servicePage.pricingFAQ.label': 'Frequently asked questions',
  'servicePage.pricingFAQ.title': 'Pricing FAQ',
};

function humanizeFallback(key: string): string {
  const last = key.split('.').pop() || key;
  const spaced = last
    .replace(/_/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .trim();
  return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : 'Text';
}

/**
 * Get language direction for a given locale
 */
export function getLanguageDirection(code: string): 'ltr' | 'rtl' {
  const lang = languages.find(l => l.code === code);
  return lang?.dir || 'ltr';
}

/**
 * Check if a language is RTL
 */
export function isRtlLanguage(code: string): boolean {
  return RTL_LANGUAGES.includes(code as any);
}

/**
 * Apply document direction based on language
 */
export function applyDocumentDirection(code: string): void {
  const dir = getLanguageDirection(code);
  document.documentElement.dir = dir;
  document.documentElement.lang = code;
  
  // Add/remove RTL class for CSS targeting
  if (dir === 'rtl') {
    document.documentElement.classList.add('rtl');
  } else {
    document.documentElement.classList.remove('rtl');
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: ['nl'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    returnEmptyString: false,
    returnNull: false,
    // Critical: never show raw keys; fall back to EN (or a humanized string)
    parseMissingKeyHandler: (key) => {
      const enValue = i18n.getResource('en', 'translation', key);
      if (typeof enValue === 'string' && enValue.trim().length > 0) return enValue;

      const mapped = EN_FALLBACKS[key];
      if (mapped) return mapped;

      return humanizeFallback(key);
    },
    // Dev-only: log missing keys
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lngs, ns, key, fallbackValue) => {
      if (import.meta.env.DEV) {
        console.warn(
          `[i18n] Missing key: "${key}" for locales [${lngs.join(', ')}] in namespace "${ns}". Fallback: "${fallbackValue}"`
        );
      }
    },
  });

// Apply initial direction
applyDocumentDirection(i18n.language);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  applyDocumentDirection(lng);
});

export default i18n;
