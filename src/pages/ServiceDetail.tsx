import { useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServicePageTemplate from '@/components/service-page/ServicePageTemplate';

// Service configuration with video/poster assets
const SERVICE_CONFIG: Record<string, { videoUrl?: string; posterImage?: string }> = {
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
  'social-media',
  'ads-management',
  'content-production',
  'seo',
  'business-website',
  'one-page-website',
  'ecommerce-website',
  'branding',
];

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  // Redirect to services page if invalid slug
  if (!slug || !VALID_SERVICES.includes(slug)) {
    return <Navigate to="/services" replace />;
  }

  // Convert slug to serviceKey (e.g., 'social-media' -> 'socialMedia')
  const serviceKey = slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

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
