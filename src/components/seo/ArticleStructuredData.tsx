import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://groppi.be';

interface ArticleStructuredDataProps {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}

/**
 * Article JSON-LD schema for dynamic DB articles.
 * Renders NewsArticle markup so Google can display rich results.
 */
const ArticleStructuredData = ({
  slug,
  title,
  excerpt,
  image,
  datePublished,
  dateModified,
  author = 'GROPPI Team',
}: ArticleStructuredDataProps) => {
  const articleUrl = `${SITE_URL}/blog/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${articleUrl}#article`,
    headline: title,
    description: excerpt,
    url: articleUrl,
    datePublished,
    dateModified: dateModified ?? datePublished,
    ...(image && { image: { '@type': 'ImageObject', url: image } }),
    author: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: author,
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    isPartOf: {
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog`,
      name: 'GROPPI Blog',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ArticleStructuredData;
