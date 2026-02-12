

# Plan: Remove German (de) and Urdu (ur) Languages

## Overview
Remove German and Urdu from the entire site -- configuration, translation files, RTL lists, admin editors, and the sitemap.

## Changes

### 1. Delete translation files
- Delete `src/i18n/locales/de.json`
- Delete `src/i18n/locales/ur.json`

### 2. `src/i18n/config.ts`
- Remove `import de from './locales/de.json'` and `import ur from './locales/ur.json'`
- Remove `de` and `ur` entries from the `languages` array
- Remove `de` and `ur` from the `resources` object
- Remove `'ur'` from the `RTL_LANGUAGES` array (keep `'ar'`)
- Remove `'de'` and `'ur'` from the `supported` array inside `convertDetectedLanguage`

### 3. `src/hooks/useLocaleDirection.ts`
- Remove `'ur'` from the local `RTL_LANGUAGES` array

### 4. `src/pages/admin/ArticleEditor.tsx`
- Remove the `{ code: 'de', name: 'Deutsch', dir: 'ltr' }` entry from the languages list

### 5. `src/components/admin/SectionEditorDialog.tsx`
- Remove the `{ code: 'de', label: 'Deutsch' }` entry from the languages list

### 6. `public/sitemap.xml`
- No changes needed (sitemap uses routes, not language codes)

## Technical Details
- After removal, the site will support 13 languages instead of 15
- If a user's browser is set to German or Urdu, the `convertDetectedLanguage` function will fall back to Dutch (`nl`) as the default
- No database changes required

