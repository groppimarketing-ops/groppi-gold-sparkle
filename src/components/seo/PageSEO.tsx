import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://groppi.be';
const SITE_NAME = 'GROPPI';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-poster.png`;
const TWITTER_HANDLE = '@Groppimarketing';

interface PageSEOProps {
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
 * Provides: title, meta description, canonical, OG tags, Twitter cards.
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
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? `${SITE_NAME} | Digital Marketing Bureau België` : `${title} | ${SITE_NAME}`;
  const truncatedDescription = description.length > 160 ? description.slice(0, 157) + '...' : description;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={truncatedDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

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
