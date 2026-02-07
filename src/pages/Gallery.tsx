import { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import CaseStudyModal from '@/components/portfolio/CaseStudyModal';
import { portfolioItems } from '@/data/portfolioItems';
import type { PortfolioItem } from '@/types/portfolio';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

// NDA Disclaimer component - premium gold styling
const NdaDisclaimer = memo(() => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-center gap-2 text-sm text-primary/80"
    >
      <Lock className="w-4 h-4" />
      <span>{t('portfolio.nda.disclaimer')}</span>
    </motion.div>
  );
});

NdaDisclaimer.displayName = 'NdaDisclaimer';

const Gallery = () => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  return (
    <PageLayout>
      <PageSEO
        title={t('gallery.title', 'Portfolio')}
        description={t('gallery.description', 'Ontdek onze projecten. Van social media campagnes tot websites — bekijk het werk van GROPPI.')}
        path="/gallery"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: t('nav.gallery', 'Portfolio'), path: '/gallery' }]} />
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('gallery.subtitle')}
            title={t('gallery.title')}
            description={t('gallery.description')}
            showSparkle
          />
          
          {/* NDA Disclaimer - Top */}
          <div className="mt-8">
            <NdaDisclaimer />
          </div>
        </div>
      </section>

      {/* Portfolio Grid - Same layout as Home */}
      <section className="section-spacing relative overflow-hidden pb-24">
        <div className="absolute inset-0 neural-bg opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Projects Grid - 4 cols desktop, 2 tablet, 1 mobile (same as Home) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>

          {/* NDA Disclaimer - Bottom */}
          <div className="mt-14">
            <NdaDisclaimer />
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </PageLayout>
  );
};

export default Gallery;
