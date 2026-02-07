import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicePageHero from './ServicePageHero';
import ServiceDeliverables from './ServiceDeliverables';
import ServiceProcess from './ServiceProcess';
import ServicePriceCalculator from './ServicePriceCalculator';
import ServiceFAQ from './ServiceFAQ';
import ServiceFinalCTA from './ServiceFinalCTA';
import ContentCalculator from './ContentCalculator';
import PricingFAQ from './PricingFAQ';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/StructuredData';

interface ServicePageTemplateProps {
  serviceKey: string;
  videoUrl?: string;
  posterImage?: string;
}

/**
 * ServicePageTemplate - Reusable template for ALL service detail pages
 * 
 * Sections:
 * 1. Hero (split layout with video)
 * 2. Deliverables (6 cards grid)
 * 3. Process (3 steps timeline)
 * 4. Price Calculator (interactive) - OR Content Calculator for content-production
 * 5. FAQ (6 questions)
 * 6. Final CTA
 */
const ServicePageTemplate = memo(({ serviceKey, videoUrl, posterImage }: ServicePageTemplateProps) => {
  const { t } = useTranslation();
  const isContentProduction = serviceKey === 'contentProduction';
  
  // Convert camelCase key to slug for URL (e.g., 'socialMedia' -> 'social-media')
  const slug = serviceKey.replace(/([A-Z])/g, '-$1').toLowerCase();
  const serviceTitle = t(`servicePage.${serviceKey}.title`, serviceKey);
  const serviceDescription = t(`servicePage.${serviceKey}.subtitle`, '');
  
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title={serviceTitle}
        description={serviceDescription || `${serviceTitle} — Professionele dienst door GROPPI Marketing Bureau.`}
        path={`/services/${slug}`}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: t('nav.services', 'Diensten'), path: '/services' },
        { name: serviceTitle, path: `/services/${slug}` },
      ]} />
      <ServiceSchema name={serviceTitle} description={serviceDescription} />
      <Header />
      <main>
        <ServicePageHero 
          serviceKey={serviceKey} 
          videoUrl={videoUrl}
          posterImage={posterImage}
        />
        <ServiceDeliverables serviceKey={serviceKey} />
        <ServiceProcess serviceKey={serviceKey} />
        
        {/* Calculator with integrated discount module (shown after intent) */}
        {isContentProduction ? (
          <>
            <ContentCalculator />
            <PricingFAQ />
          </>
        ) : (
          <>
            <ServicePriceCalculator serviceKey={serviceKey} />
            <ServiceFAQ serviceKey={serviceKey} />
          </>
        )}
        
        <ServiceFinalCTA serviceKey={serviceKey} />
      </main>
      <Footer />
    </div>
  );
});

ServicePageTemplate.displayName = 'ServicePageTemplate';

export default ServicePageTemplate;
