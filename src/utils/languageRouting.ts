/**
 * Language-aware routing utilities.
 * nl (Belgian Dutch) uses unprefixed paths (e.g. /about).
 * All other languages use prefixed paths (e.g. /en/about).
 */

export const SUPPORTED_LANGS = ['nl','en','fr','de','ar','es','it','pt','pl','ru','tr','bn','hi','ur','zh'] as const;
export type SupportedLang = typeof SUPPORTED_LANGS[number];

/** Extract current language from pathname. Defaults to 'nl' for unprefixed paths. */
export function getCurrentLangFromPath(pathname: string): SupportedLang {
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  if (firstSegment && (SUPPORTED_LANGS as readonly string[]).includes(firstSegment)) {
    return firstSegment as SupportedLang;
  }
  return 'nl';
}

/** Strip language prefix from pathname to get the base path. */
export function getBasePath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && (SUPPORTED_LANGS as readonly string[]).includes(segments[0])) {
    const rest = segments.slice(1).join('/');
    return rest ? `/${rest}` : '/';
  }
  return pathname || '/';
}

/** Build a language-aware path. nl → unprefixed, others → /lang/path */
export function getLangPath(basePath: string, lang: string): string {
  if (lang === 'nl') return basePath;
  if (basePath === '/') return `/${lang}`;
  return `/${lang}${basePath}`;
}

/** Build a full absolute URL for a given base path and language. */
export function getLangUrl(basePath: string, lang: string, siteUrl: string): string {
  return `${siteUrl}${getLangPath(basePath, lang)}`;
}
