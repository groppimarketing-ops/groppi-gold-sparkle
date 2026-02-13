import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import LangLink from '@/components/LangLink';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/ui/SectionHeader';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import CaseStudyModal from '@/components/portfolio/CaseStudyModal';
import { getLatestPortfolioItems } from '@/data/portfolioItems';
import type { PortfolioItem } from '@/types/portfolio';

const HomePortfolioGrid = memo(() => {
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get latest 8 portfolio items
  const portfolioItems = getLatestPortfolioItems(8);

  const handleCardClick = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    // Delay clearing the item for exit animation
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  return (
    <>
      <section className="section-spacing relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 neural-bg opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('home.portfolio.subtitle', 'Ons werk')}
            title={t('home.portfolio.title', 'Portfolio highlights')}
            centered
          />

          {/* Projects Grid - 4 cols desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {portfolioItems.map((item, index) => (
              <PortfolioCard
                key={item.id}
                item={item}
                index={index}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>

          {/* View Full Portfolio CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-14"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-[0_8px_35px_hsl(var(--gold)/0.4)] hover:translate-y-[-3px] transition-all duration-300 text-lg px-12 py-7 rounded-xl"
            >
              <LangLink to="/gallery">
                {t('home.portfolio.viewAll', 'Bekijk volledig portfolio')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </LangLink>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
});

HomePortfolioGrid.displayName = 'HomePortfolioGrid';

export default HomePortfolioGrid;
