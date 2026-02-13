import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentLangFromPath, getLangPath } from '@/utils/languageRouting';

/**
 * Returns a function that prefixes any base path with the current language.
 * e.g. if the user is on /en/about, langPath('/contact') → '/en/contact'
 * If on / (nl), langPath('/contact') → '/contact' (unprefixed = nl)
 */
export function useLangPath() {
  const { pathname } = useLocation();
  const lang = getCurrentLangFromPath(pathname);

  const langPath = useCallback(
    (basePath: string) => getLangPath(basePath, lang),
    [lang],
  );

  return langPath;
}
