import { useTranslation } from 'react-i18next';
import { useRef, useState, lazy, Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import PostHeroTrust from '@/components/home/PostHeroTrust';
import HomeAfterHeroWrapper from '@/components/home/HomeAfterHeroWrapper';
import DynamicSection from '@/components/sections/DynamicSection';
import usePageContent from '@/hooks/usePageContent';
import PageSEO from '@/components/seo/PageSEO';
import { OrganizationSchema } from '@/components/seo/StructuredData';

// Lazy-load below-fold sections
const HomeTrustedBelgium = lazy(() => import('@/components/home/HomeTrustedBelgium'));
const HomeTrustSectors = lazy(() => import('@/components/home/HomeTrustSectors'));
const HomePortfolioGrid = lazy(() => import('@/components/home/HomePortfolioGrid'));
const HomeCaseStudies = lazy(() => import('@/components/home/HomeCaseStudies'));
const HomeClientLogoMarquee = lazy(() => import('@/components/home/HomeClientLogoMarquee'));
const HomeQuickChoice = lazy(() => import('@/components/home/HomeQuickChoice'));
const HomeServicesGrid = lazy(() => import('@/components/home/HomeServicesGrid'));
const HomeTrustSection = lazy(() => import('@/components/home/HomeTrustSection'));
const HomeFinalCTA = lazy(() => import('@/components/home/HomeFinalCTA'));

const LazyFallback = () => <div className="min-h-[200px]" />;

const Index = () => {
  const { t } = useTranslation();
  const servicesGridRef = useRef<HTMLElement>(null);
  const [highlightedServices, setHighlightedServices] = useState<string[]>([]);

  const { sections, getContent, getMediaUrl } = usePageContent({ pageSlug: 'home' });

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
    setTimeout(() => setHighlightedServices([]), 5000);
  };

  const validSectionTypes = ['hero', 'features', 'stats', 'content', 'cta'];
  const hasDynamicContent = sections.length > 0 &&
    sections.some(s => validSectionTypes.includes(s.section_type));

  const renderStaticContent = () => (
    <>
      <HeroSection />
      <HomeAfterHeroWrapper>
        <PostHeroTrust />
        <Suspense fallback={<LazyFallback />}>
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
        </Suspense>
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
