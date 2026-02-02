import { memo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicePageHero from './ServicePageHero';
import ServiceDeliverables from './ServiceDeliverables';
import ServiceProcess from './ServiceProcess';
import ServicePriceCalculator from './ServicePriceCalculator';
import ServiceFAQ from './ServiceFAQ';
import ServiceFinalCTA from './ServiceFinalCTA';
// Note: LaunchDiscountBanner removed - discount now integrated into calculators
import ContentCalculator from './ContentCalculator';
import PricingFAQ from './PricingFAQ';

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
  // Show Content Calculator for content production service
  const isContentProduction = serviceKey === 'contentProduction';
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Note: Discount banner removed from top - now shown UNDER calculator after user shows intent */}
        
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
