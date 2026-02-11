import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PostHeroTrust from '@/components/home/PostHeroTrust';
import BrandVideoPopup from '@/components/home/BrandVideoPopup';
import HomeTrustedBelgium from '@/components/home/HomeTrustedBelgium';
import HomeTrustSectors from '@/components/home/HomeTrustSectors';
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
import PageSEO from '@/components/seo/PageSEO';
import { OrganizationSchema } from '@/components/seo/StructuredData';

const Index = () => {
  const { t, i18n } = useTranslation();
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
    
    setTimeout(() => {
      servicesGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    setTimeout(() => {
      setHighlightedServices([]);
    }, 5000);
  };

  const validSectionTypes = ['hero', 'features', 'stats', 'content', 'cta'];
  const hasDynamicContent = sections.length > 0 && 
    sections.some(s => validSectionTypes.includes(s.section_type));

  const renderStaticContent = () => (
    <>
      <HeroSection />
      <BrandVideoPopup />
      <HomeAfterHeroWrapper>
        <PostHeroTrust />
        <HomeTrustedBelgium />
        <HomeTrustSectors />
        <HomePortfolioGrid />
        <HomeCaseStudies />
        <HomeClientLogoMarquee />
        <HomeQuickChoice onGoalSelect={handleGoalSelect} />
        <HomeServicesGrid 
          ref={servicesGridRef}
          highlightedServices={highlightedServices}
        />
        <HomeTrustSection />
        <HomeFinalCTA />
      </HomeAfterHeroWrapper>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Digital Marketing Bureau België"
        description={t('home.heroNew.subtitle', 'GROPPI is een full-service digital marketing bureau in België. Social media management, SEO, advertenties, webdesign en contentcreatie.')}
        path="/"
      />
      <OrganizationSchema />
      <Header />
      <main>
        {hasDynamicContent ? (
          sections.map((section) => (
            <DynamicSection
              key={section.id}
              section={section}
              getContent={getContent}
              getMediaUrl={getMediaUrl}
            />
          ))
        ) : (
          renderStaticContent()
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
