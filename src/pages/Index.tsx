import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PostHeroTrust from '@/components/home/PostHeroTrust';
import HomeTrustSectors from '@/components/home/HomeTrustSectors';
import HomeTrustedBelgium from '@/components/home/HomeTrustedBelgium';
import HomeQuickChoice from '@/components/home/HomeQuickChoice';
import HomeServicesGrid from '@/components/home/HomeServicesGrid';
import HomePortfolioGrid from '@/components/home/HomePortfolioGrid';
import HomeCaseStudies from '@/components/home/HomeCaseStudies';
import HomeClientLogoMarquee from '@/components/home/HomeClientLogoMarquee';
import HomeTrustSection from '@/components/home/HomeTrustSection';
import HomeFinalCTA from '@/components/home/HomeFinalCTA';
import HomeAfterHeroWrapper from '@/components/home/HomeAfterHeroWrapper';
import DynamicSection from '@/components/sections/DynamicSection';
import usePageContent from '@/hooks/usePageContent';

const Index = () => {
  const { i18n } = useTranslation();
  const servicesGridRef = useRef<HTMLElement>(null);
  const [highlightedServices, setHighlightedServices] = useState<string[]>([]);

  // Fetch dynamic content for the home page
  const { sections, getContent, getMediaUrl } = usePageContent({ pageSlug: 'home' });

  // Handle goal selection from quick choice
  const handleGoalSelect = (goal: 'visibility' | 'leads' | 'sales') => {
    const goalToServicesMap: Record<string, string[]> = {
      visibility: ['social-media', 'content-production'],
      leads: ['ads-management', 'seo'],
      sales: ['ecommerce-website', 'ads-management'],
    };
    
    setHighlightedServices(goalToServicesMap[goal]);
    
    // Scroll to services grid
    setTimeout(() => {
      servicesGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    // Clear highlights after a few seconds
    setTimeout(() => {
      setHighlightedServices([]);
    }, 5000);
  };

  // Only use dynamic content if we have meaningful sections
  const validSectionTypes = ['hero', 'features', 'stats', 'content', 'cta'];
  const hasDynamicContent = sections.length > 0 && 
    sections.some(s => validSectionTypes.includes(s.section_type));

  // Render default static content when no dynamic sections exist
  const renderStaticContent = () => (
    <>
      {/* Hero with Video Background - keeps its own background */}
      <HeroSection />

      {/* All sections after Hero wrapped with continuous gold animated background */}
      <HomeAfterHeroWrapper>
        {/* Post-Hero Trust Line */}
        <PostHeroTrust />

        {/* Trusted across Belgium - Social proof (directly after Hero) */}
        <HomeTrustedBelgium />

        {/* Trust Sectors - Premium credibility section */}
        <HomeTrustSectors />

        {/* Quick Choice - For non-expert visitors */}
        <HomeQuickChoice onGoalSelect={handleGoalSelect} />

        {/* Services Grid - Main section */}
        <HomeServicesGrid 
          ref={servicesGridRef}
          highlightedServices={highlightedServices}
        />

        {/* Portfolio Highlights */}
        <HomePortfolioGrid />

        {/* Case Studies - Proof-based */}
        <HomeCaseStudies />

        {/* Client Logo Marquee + Testimonials - NEW Trust proof section */}
        <HomeClientLogoMarquee />

        {/* Trust Section - 10+ years credibility */}
        <HomeTrustSection />

        {/* Final CTA */}
        <HomeFinalCTA />
      </HomeAfterHeroWrapper>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {hasDynamicContent ? (
          // Render dynamic sections from database
          sections.map((section) => (
            <DynamicSection
              key={section.id}
              section={section}
              getContent={getContent}
              getMediaUrl={getMediaUrl}
            />
          ))
        ) : (
          // Fallback to static content
          renderStaticContent()
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
