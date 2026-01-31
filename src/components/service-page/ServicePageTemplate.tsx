import { memo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicePageHero from './ServicePageHero';
import ServiceDeliverables from './ServiceDeliverables';
import ServiceProcess from './ServiceProcess';
import ServicePriceCalculator from './ServicePriceCalculator';
import ServiceFAQ from './ServiceFAQ';
import ServiceFinalCTA from './ServiceFinalCTA';

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
 * 4. Price Calculator (interactive)
 * 5. FAQ (6 questions)
 * 6. Final CTA
 */
const ServicePageTemplate = memo(({ serviceKey, videoUrl, posterImage }: ServicePageTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ServicePageHero 
          serviceKey={serviceKey} 
          videoUrl={videoUrl}
          posterImage={posterImage}
        />
        <ServiceDeliverables serviceKey={serviceKey} />
        <ServiceProcess serviceKey={serviceKey} />
        <ServicePriceCalculator serviceKey={serviceKey} />
        <ServiceFAQ serviceKey={serviceKey} />
        <ServiceFinalCTA serviceKey={serviceKey} />
      </main>
      <Footer />
    </div>
  );
});

ServicePageTemplate.displayName = 'ServicePageTemplate';

export default ServicePageTemplate;
