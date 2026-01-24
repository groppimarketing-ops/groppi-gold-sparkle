import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all language files
import ar from './locales/ar.json';
import en from './locales/en.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import es from './locales/es.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import nl from './locales/nl.json';
import pl from './locales/pl.json';
import ru from './locales/ru.json';
import tr from './locales/tr.json';
import bn from './locales/bn.json';
import hi from './locales/hi.json';
import ur from './locales/ur.json';
import zh from './locales/zh.json';

export const languages = [
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
  { code: 'es', name: 'Español', dir: 'ltr', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', dir: 'ltr', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', dir: 'ltr', flag: '🇵🇹' },
  { code: 'nl', name: 'Nederlands', dir: 'ltr', flag: '🇳🇱' },
  { code: 'pl', name: 'Polski', dir: 'ltr', flag: '🇵🇱' },
  { code: 'ru', name: 'Русский', dir: 'ltr', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr', flag: '🇹🇷' },
  { code: 'bn', name: 'বাংলা', dir: 'ltr', flag: '🇧🇩' },
  { code: 'hi', name: 'हिन्दी', dir: 'ltr', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو', dir: 'rtl', flag: '🇵🇰' },
  { code: 'zh', name: '中文', dir: 'ltr', flag: '🇨🇳' },
] as const;

export type LanguageCode = typeof languages[number]['code'];

const resources = {
  ar: { translation: ar },
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
  es: { translation: es },
  it: { translation: it },
  pt: { translation: pt },
  nl: { translation: nl },
  pl: { translation: pl },
  ru: { translation: ru },
  tr: { translation: tr },
  bn: { translation: bn },
  hi: { translation: hi },
  ur: { translation: ur },
  zh: { translation: zh },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'nl',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
