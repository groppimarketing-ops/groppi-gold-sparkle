import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://groppi.be';

/**
 * Organization + LocalBusiness + WebSite JSON-LD
 * Rendered once in the root layout (Index page).
 */
const OrganizationSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'GROPPI',
        legalName: 'GROPPI Marketing Bureau',
        url: SITE_URL,
        logo: `${SITE_URL}/images/hero-poster.png`,
        sameAs: [
          'https://x.com/Groppimarketing',
          'https://www.facebook.com/profile.php?id=61582782063217',
          'https://www.instagram.com/groppimarketingbureau/',
          'https://www.linkedin.com/in/groppi-marketing-bureau/',
          'https://www.youtube.com/@GroppiMarketing',
          'https://www.tiktok.com/@groppimarketingbureau',
          'https://nl.pinterest.com/GroppiMarketingBureau/',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: '+32-494-31-11-19',
            contactType: 'sales',
            areaServed: ['BE', 'NL', 'DE', 'FR', 'EU'],
            availableLanguage: ['Dutch', 'English', 'French', 'German', 'Arabic'],
          },
          {
            '@type': 'ContactPoint',
            telephone: '+32-14-63-50-05',
            contactType: 'customer service',
            areaServed: 'BE',
            availableLanguage: ['Dutch', 'English'],
          },
        ],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: 'GROPPI Marketing Bureau',
        image: `${SITE_URL}/images/hero-poster.png`,
        url: SITE_URL,
        telephone: '+32 494 31 11 19',
        email: 'info@groppi.be',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Het Steeke 5A',
          addressLocality: 'Merksplas',
          postalCode: '2330',
          addressCountry: 'BE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 51.3547,
          longitude: 4.8547,
        },
        priceRange: '€€',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'GROPPI',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: ['nl-BE', 'en', 'fr', 'de', 'ar', 'es', 'it', 'pt', 'pl', 'ru', 'tr', 'bn', 'hi', 'ur', 'zh'],
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/**
 * Breadcrumb JSON-LD
 */
interface BreadcrumbItem {
  name: string;
  path: string;
}

const BreadcrumbSchema = ({ items }: { items: BreadcrumbItem[] }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://groppi.be${item.path}`,
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

/**
 * Service JSON-LD
 */
const ServiceSchema = ({ name, description, priceRange }: { name: string; description: string; priceRange?: string }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@id': 'https://groppi.be/#organization' },
    areaServed: { '@type': 'Country', name: 'Belgium' },
    ...(priceRange && { priceRange }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export { OrganizationSchema, BreadcrumbSchema, ServiceSchema };
