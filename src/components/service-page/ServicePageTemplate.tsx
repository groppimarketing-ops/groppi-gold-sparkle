import { memo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ServicePageHero from './ServicePageHero';
import ServiceStickyTabs from './ServiceStickyTabs';
import ServiceWhySection from './ServiceWhySection';
import ServiceProcess from './ServiceProcess';
import ServiceApproach from './ServiceApproach';
import ServicePackages from './ServicePackages';
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
 * 1. Hero (split layout: left text + right video)
 * 2. Sticky Tabs Navigation
 * 3. Why This Service (benefits + metrics)
 * 4. How It Works (3-step process)
 * 5. Our Approach (3 cards)
 * 6. Packages & Pricing (Starter, Growth, Pro)
 * 7. Custom Plan Calculator
 * 8. FAQ (6 questions)
 * 9. Final CTA
 */
const ServicePageTemplate = memo(({ serviceKey, videoUrl, posterImage }: ServicePageTemplateProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <ServicePageHero 
          serviceKey={serviceKey} 
          videoUrl={videoUrl}
          posterImage={posterImage}
        />
        
        {/* Sticky Tab Navigation */}
        <ServiceStickyTabs serviceKey={serviceKey} />
        
        {/* Section: Why This Service */}
        <ServiceWhySection serviceKey={serviceKey} />
        
        {/* Section: How It Works (3 steps) */}
        <ServiceProcess serviceKey={serviceKey} />
        
        {/* Section: Our Approach */}
        <ServiceApproach serviceKey={serviceKey} />
        
        {/* Section: Packages & Pricing */}
        <ServicePackages serviceKey={serviceKey} />
        
        {/* Section: Custom Plan Calculator */}
        <ServicePriceCalculator serviceKey={serviceKey} />
        
        {/* Section: FAQ */}
        <ServiceFAQ serviceKey={serviceKey} />
        
        {/* Final CTA */}
        <ServiceFinalCTA serviceKey={serviceKey} />
      </main>
      <Footer />
    </div>
  );
});

ServicePageTemplate.displayName = 'ServicePageTemplate';

export default ServicePageTemplate;
