import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { languages } from '@/i18n/config';
import { getLangPath } from '@/utils/languageRouting';

const SITE_URL = 'https://groppi.be';
const SITE_NAME = 'GROPPI';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-poster.png`;
const TWITTER_HANDLE = '@Groppimarketing';

interface PageSEOProps {
  /** Base path without language prefix, e.g. '/about' or '/' */
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  articlePublishedTime?: string;
}

/**
 * Reusable SEO component for all pages.
 * Provides: title, meta description, self-referencing canonical,
 * hreflang alternates for all 15 languages + x-default, OG tags, Twitter cards.
 */
const PageSEO = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  type = 'website',
  articlePublishedTime,
}: PageSEOProps) => {
  const { i18n } = useTranslation();

  // Self-referencing canonical based on the active language
  const canonicalUrl = `${SITE_URL}${getLangPath(path, i18n.language)}`;
  const fullTitle = path === '/' ? `${SITE_NAME} | Digital Marketing Bureau België` : `${title} | ${SITE_NAME}`;
  const truncatedDescription = description.length > 160 ? description.slice(0, 157) + '...' : description;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={truncatedDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* hreflang alternates for every supported language */}
      {languages.map(lang => (
        <link
          key={lang.code}
          rel="alternate"
          hrefLang={lang.code}
          href={`${SITE_URL}${getLangPath(path, lang.code)}`}
        />
      ))}
      {/* x-default points to the nl (Belgian Dutch) version */}
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${path}`} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="nl_BE" />

      {type === 'article' && articlePublishedTime && (
        <meta property="article:published_time" content={articlePublishedTime} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default PageSEO;
export { SITE_URL, SITE_NAME };
