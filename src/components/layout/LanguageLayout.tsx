import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { applyDocumentDirection } from '@/i18n/config';
import { getCurrentLangFromPath } from '@/utils/languageRouting';

/**
 * Layout wrapper that syncs the i18n language to the URL path.
 * - Unprefixed routes (/) → nl
 * - Prefixed routes (/en, /fr, etc.) → that language
 * Uses useLayoutEffect to avoid flash of wrong language.
 */
const LanguageLayout = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const targetLang = getCurrentLangFromPath(location.pathname);

  useLayoutEffect(() => {
    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
    applyDocumentDirection(targetLang);
  }, [targetLang, i18n]);

  return <Outlet />;
};

export default LanguageLayout;
