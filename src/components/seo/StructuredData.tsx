import { Helmet } from 'react-helmet-async';
import { SERVICE_PRICING_CONFIG } from '@/config/pricingConfig';

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

// re-exported at bottom of file

/* ─────────────────────────────────────────────
   ServiceOfferingSchema
   Full ProfessionalService + Offer markup for
   individual service pages — boosts rich results
   in Google Belgium (nl-BE / en).
───────────────────────────────────────────── */

/** Maps service slugs to human-readable serviceType labels */
const SERVICE_TYPE_MAP: Record<string, string> = {
  'social-media':           'Social Media Management',
  'ads-management':         'Online Advertising Management',
  'content-production':     'Content Production',
  'seo':                    'Search Engine Optimisation',
  'business-website':       'Business Website Design',
  'one-page-website':       'One-Page Website Design',
  'ecommerce-website':      'E-Commerce Website Development',
  'branding':               'Brand Identity Design',
  'mobile-app-development': 'Mobile Application Development',
  'reputation':             'Online Reputation Management',
  'data-sync':              'Data Integration & Synchronisation',
};

interface ServiceOfferingSchemaProps {
  slug: string;
  name: string;
  description: string;
}

const ServiceOfferingSchema = ({ slug, name, description }: ServiceOfferingSchemaProps) => {
  const pricing = SERVICE_PRICING_CONFIG[slug];
  const serviceUrl = `${SITE_URL}/services/${slug}`;
  const serviceType = SERVICE_TYPE_MAP[slug] ?? name;

  /* Build Offer node only when we have real price data */
  const offerNode = pricing?.priceMin
    ? {
        '@type': 'Offer',
        url: serviceUrl,
        priceCurrency: 'EUR',
        price: pricing.priceMin,
        priceSpecification: {
          '@type': pricing.pricingType === 'monthly'
            ? 'UnitPriceSpecification'
            : 'PriceSpecification',
          price: pricing.priceMin,
          priceCurrency: 'EUR',
          ...(pricing.pricingType === 'monthly' && {
            unitCode: 'MON',
            unitText: 'per month',
          }),
        },
        seller: { '@id': `${SITE_URL}/#organization` },
        availability: 'https://schema.org/InStock',
        areaServed: [
          { '@type': 'Country', name: 'Belgium' },
          { '@type': 'Country', name: 'Netherlands' },
          { '@type': 'AdministrativeArea', name: 'European Union' },
        ],
      }
    : undefined;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${serviceUrl}#service`,
    name,
    description,
    url: serviceUrl,
    serviceType,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Belgium' },
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'AdministrativeArea', name: 'European Union' },
    ],
    inLanguage: ['nl-BE', 'en', 'fr', 'de'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${name} — GROPPI`,
      itemListElement: [
        {
          '@type': 'OfferCatalogItem',
          name,
          description,
          ...(offerNode && { offers: offerNode }),
        },
      ],
    },
    ...(offerNode && { offers: offerNode }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export { OrganizationSchema, BreadcrumbSchema, ServiceSchema, ServiceOfferingSchema };
