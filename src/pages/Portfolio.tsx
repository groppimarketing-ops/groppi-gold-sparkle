import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Lock } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import CaseStudyModal from '@/components/portfolio/CaseStudyModal';
import { allPortfolioItems } from '@/data/portfolioItems';
import type { PortfolioItem } from '@/types/portfolio';
import { Input } from '@/components/ui/input';

// NDA Disclaimer Component - Premium gold styling
const NDADisclaimer = ({ className = '' }: { className?: string }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center justify-center gap-2 text-primary/80 ${className}`}
    >
      <Lock className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="text-sm font-medium" style={{ color: 'hsl(43 76% 52% / 0.85)' }}>
        {t('portfolio.nda.disclaimer')}
      </span>
    </motion.div>
  );
};

const Portfolio = () => {
  const { t } = useTranslation();
  
  // Simple search state only (matching Home simplicity)
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtered portfolio items - show all by default
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return allPortfolioItems;
    const query = searchQuery.toLowerCase();
    return allPortfolioItems.filter(item => 
      item.clientName.toLowerCase().includes(query) ||
      item.industry.toLowerCase().includes(query) ||
      item.services.some(s => s.toLowerCase().includes(query))
    );
  }, [searchQuery]);

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
      {/* Portfolio Section - Matching Home "Our Work" exactly */}
      <section className="section-spacing relative overflow-hidden">
        {/* Background - Same as Home */}
        <div className="absolute inset-0 neural-bg opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header - Same style as Home */}
          <SectionHeader
            subtitle={t('home.portfolio.subtitle', 'Ons werk')}
            title={t('portfolio.page.title', 'Portfolio')}
            description={t('portfolio.page.description', 'Ontdek onze projecten en de resultaten die we voor onze klanten hebben bereikt.')}
            centered
            showSparkle
          />

          {/* NDA Disclaimer - Under header */}
          <NDADisclaimer className="mt-6" />

          {/* Optional Search - Minimal style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mt-8 mb-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('portfolio.filters.search', 'Zoek projecten...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 glass-card border-primary/20 focus:border-primary/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Results count */}
          {searchQuery && (
            <p className="text-center text-muted-foreground text-sm mb-8">
              {filteredItems.length} {filteredItems.length === 1 
                ? t('portfolio.page.resultSingle', 'project gevonden') 
                : t('portfolio.page.resultPlural', 'projecten gevonden')
              }
            </p>
          )}

          {/* Projects Grid - Exact same as Home: 4 cols desktop, 2 tablet, 1 mobile */}
          <AnimatePresence mode="popLayout">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {filteredItems.map((item, index) => (
                  <PortfolioCard
                    key={item.id}
                    item={item}
                    index={index}
                    onClick={() => handleCardClick(item)}
                  />
                ))}
              </div>
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
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-primary hover:text-primary/80 underline underline-offset-4"
                >
                  {t('portfolio.filters.clearAll', 'Wis alle filters')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* NDA Disclaimer - Bottom of grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-primary/10"
          >
            <NDADisclaimer />
          </motion.div>
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
