import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServicePageTemplate from '@/components/service-page/ServicePageTemplate';

// Service configuration with video/poster assets
const SERVICE_CONFIG: Record<string, { videoUrl?: string; posterImage?: string }> = {
  // New canonical service detail routes (requested)
  'social-media-management': {
    videoUrl: '/videos/portfolio/lebanon-promo-1.mp4',
    posterImage: '/images/hero-poster.png',
  },
  'advertising-management': {
    videoUrl: '/videos/portfolio/lebanon-promo-2.mp4',
    posterImage: '/images/hero-poster.png',
  },
  'visual-content-video': {
    videoUrl: '/videos/portfolio/il-fuoco-promo.mp4',
    posterImage: '/images/hero-poster.png',
  },
  'webshop': {
    posterImage: '/images/hero-poster.png',
  },

  // Backwards-compatible legacy slugs
  'social-media': {
    videoUrl: '/videos/portfolio/lebanon-promo-1.mp4',
    posterImage: '/images/hero-poster.png',
  },
  'ads-management': {
    videoUrl: '/videos/portfolio/lebanon-promo-2.mp4',
    posterImage: '/images/hero-poster.png',
  },
  'content-production': {
    videoUrl: '/videos/portfolio/il-fuoco-promo.mp4',
    posterImage: '/images/hero-poster.png',
  },
  'seo': {
    posterImage: '/images/hero-poster.png',
  },
  'business-website': {
    posterImage: '/images/hero-poster.png',
  },
  'one-page-website': {
    posterImage: '/images/hero-poster.png',
  },
  'ecommerce-website': {
    posterImage: '/images/hero-poster.png',
  },
  'branding': {
    posterImage: '/images/hero-poster.png',
  },
};

// Valid service slugs
const VALID_SERVICES = [
  // New canonical slugs (requested)
  'social-media-management',
  'advertising-management',
  'seo',
  'business-website',
  'webshop',
  'visual-content-video',

  // Legacy slugs (keep working)
  'social-media',
  'ads-management',
  'content-production',
  'one-page-website',
  'branding',
  'ecommerce-website',
];

// Map URL slugs to translation/service keys used by the service template
const SLUG_TO_SERVICE_KEY: Record<string, string> = {
  // New canonical slugs
  'social-media-management': 'socialMedia',
  'advertising-management': 'adsManagement',
  'visual-content-video': 'contentProduction',
  'webshop': 'ecommerceWebsite',

  // Legacy slugs
  'social-media': 'socialMedia',
  'ads-management': 'adsManagement',
  'content-production': 'contentProduction',
  'seo': 'seo',
  'business-website': 'businessWebsite',
  'one-page-website': 'onePageWebsite',
  'ecommerce-website': 'ecommerceWebsite',
  'branding': 'branding',
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  // Redirect to services page if invalid slug
  if (!slug || !VALID_SERVICES.includes(slug)) {
    return <Navigate to="/services" replace />;
  }

  const serviceKey = SLUG_TO_SERVICE_KEY[slug];

  if (!serviceKey) {
    return <Navigate to="/services" replace />;
  }

  const config = SERVICE_CONFIG[slug] || {};

  return (
    <ServicePageTemplate
      serviceKey={serviceKey}
      videoUrl={config.videoUrl}
      posterImage={config.posterImage}
    />
  );
};

export default ServiceDetail;
