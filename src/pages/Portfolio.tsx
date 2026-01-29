import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import PortfolioFilters from '@/components/portfolio/PortfolioFilters';
import CaseStudyModal from '@/components/portfolio/CaseStudyModal';
import { filterPortfolio } from '@/data/portfolioItems';
import type { PortfolioItem } from '@/types/portfolio';

const Portfolio = () => {
  const { t } = useTranslation();
  
  // Filter state
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtered portfolio items
  const filteredItems = useMemo(() => {
    return filterPortfolio(selectedIndustry, selectedService, searchQuery);
  }, [selectedIndustry, selectedService, searchQuery]);

  const handleCardClick = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedIndustry('all');
    setSelectedService('all');
    setSearchQuery('');
  }, []);

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('portfolio.page.subtitle', 'Ons werk')}
            title={t('portfolio.page.title', 'Portfolio')}
            description={t('portfolio.page.description', 'Ontdek onze projecten en de resultaten die we voor onze klanten hebben bereikt.')}
            showSparkle
          />
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <PortfolioFilters
            selectedIndustry={selectedIndustry}
            selectedService={selectedService}
            searchQuery={searchQuery}
            onIndustryChange={setSelectedIndustry}
            onServiceChange={setSelectedService}
            onSearchChange={setSearchQuery}
            onClearFilters={handleClearFilters}
          />
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4">
          {/* Results count */}
          <p className="text-center text-muted-foreground mb-8">
            {filteredItems.length} {filteredItems.length === 1 
              ? t('portfolio.page.resultSingle', 'project gevonden') 
              : t('portfolio.page.resultPlural', 'projecten gevonden')
            }
          </p>

          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PortfolioCard
                      item={item}
                      index={index}
                      onClick={() => handleCardClick(item)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-muted-foreground text-lg">
                  {t('portfolio.page.noResults', 'Geen projecten gevonden met deze filters.')}
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-primary hover:text-primary/80 underline underline-offset-4"
                >
                  {t('portfolio.filters.clearAll', 'Wis alle filters')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
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

export default Portfolio;
