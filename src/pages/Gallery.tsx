import { useState, useCallback, useMemo, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Lock, ChevronDown } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import CaseStudyModal from '@/components/portfolio/CaseStudyModal';
import { allPortfolioItems } from '@/data/portfolioItems';
import type { PortfolioItem } from '@/types/portfolio';
import { getSector, sectorLabels, sectorOrder, type Sector } from '@/types/portfolio';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const ITEMS_PER_PAGE = 12;

// NDA Disclaimer Component - Premium gold styling
const NDADisclaimer = memo(({ className = '' }: { className?: string }) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex items-center justify-center gap-2 text-primary/80 ${className}`}
    >
      <Lock className="w-3.5 h-3.5 flex-shrink-0" />
      <span className="text-sm font-medium" style={{ color: 'hsl(43 76% 52% / 0.85)' }}>
        {t('portfolio.nda.disclaimer', 'Some client names are not shared publicly due to NDAs (Non-Disclosure Agreements).')}
      </span>
    </motion.div>
  );
});

NDADisclaimer.displayName = 'NDADisclaimer';

// Sector filter pills
const SectorFilters = memo(({
  activeSector,
  onSectorChange,
  sectorCounts,
  lang,
}: {
  activeSector: Sector | null;
  onSectorChange: (sector: Sector | null) => void;
  sectorCounts: Record<Sector, number>;
  lang: 'nl' | 'en';
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="flex flex-wrap justify-center gap-2 mt-8"
    >
      {/* All button */}
      <button
        onClick={() => onSectorChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
          activeSector === null
            ? 'bg-primary/20 border-primary/60 text-primary shadow-[0_0_15px_hsl(var(--gold)/0.2)]'
            : 'border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary/80'
        }`}
      >
        {t('portfolio.filters.all', 'Alles')}
      </button>

      {sectorOrder.map((sector) => {
        const count = sectorCounts[sector] || 0;
        if (count === 0) return null;

        return (
          <button
            key={sector}
            onClick={() => onSectorChange(activeSector === sector ? null : sector)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
              activeSector === sector
                ? 'bg-primary/20 border-primary/60 text-primary shadow-[0_0_15px_hsl(var(--gold)/0.2)]'
                : 'border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary/80'
            }`}
          >
            {sectorLabels[sector][lang]}
            <span className="ml-1.5 text-xs opacity-60">({count})</span>
          </button>
        );
      })}
    </motion.div>
  );
});

SectorFilters.displayName = 'SectorFilters';

const Gallery = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('nl') ? 'nl' : 'en';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSector, setActiveSector] = useState<Sector | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  
  // Modal state
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sector counts (from full list, before search)
  const sectorCounts = useMemo(() => {
    const counts = {} as Record<Sector, number>;
    for (const s of sectorOrder) counts[s] = 0;
    for (const item of allPortfolioItems) {
      const sector = getSector(item.industry);
      counts[sector] = (counts[sector] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered & sorted portfolio items
  const filteredItems = useMemo(() => {
    let items = allPortfolioItems;

    // Sector filter
    if (activeSector) {
      items = items.filter(item => getSector(item.industry) === activeSector);
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.clientName.toLowerCase().includes(query) ||
        item.industry.toLowerCase().includes(query) ||
        item.services.some(s => s.toLowerCase().includes(query))
      );
    }

    // Sort: featured first, then by date descending
    return [...items].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }, [searchQuery, activeSector]);

  // Visible subset
  const visibleItems = useMemo(() => filteredItems.slice(0, visibleCount), [filteredItems, visibleCount]);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + ITEMS_PER_PAGE);
  }, []);

  const handleCardClick = useCallback((item: PortfolioItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  const handleSectorChange = useCallback((sector: Sector | null) => {
    setActiveSector(sector);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  const handleClearAll = useCallback(() => {
    setSearchQuery('');
    setActiveSector(null);
    setVisibleCount(ITEMS_PER_PAGE);
  }, []);

  return (
    <PageLayout>
      <PageSEO
        title={t('gallery.title', 'Portfolio')}
        description={t('gallery.description', 'Ontdek onze projecten. Van social media campagnes tot websites — bekijk het werk van GROPPI.')}
        path="/gallery"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: t('nav.gallery', 'Portfolio'), path: '/gallery' }]} />

      {/* Portfolio Section */}
      <section className="section-spacing relative overflow-hidden">
        <div className="absolute inset-0 neural-bg opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('home.portfolio.subtitle', 'Ons werk')}
            title={t('portfolio.page.title', 'Portfolio')}
            description={t('portfolio.page.description', 'Ontdek onze projecten en de resultaten die we voor onze klanten hebben bereikt.')}
            centered
            showSparkle
          />

          {/* NDA Disclaimer */}
          <NDADisclaimer className="mt-6" />

          {/* Sector Filter Pills */}
          <SectorFilters
            activeSector={activeSector}
            onSectorChange={handleSectorChange}
            sectorCounts={sectorCounts}
            lang={lang}
          />

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto mt-6 mb-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('portfolio.filters.search', 'Zoek projecten...')}
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-10 glass-card border-primary/20 focus:border-primary/40"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(''); setVisibleCount(ITEMS_PER_PAGE); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Results count */}
          {(searchQuery || activeSector) && (
            <p className="text-center text-muted-foreground text-sm mb-8">
              {filteredItems.length} {filteredItems.length === 1 
                ? t('portfolio.page.resultSingle', 'project gevonden') 
                : t('portfolio.page.resultPlural', 'projecten gevonden')
              }
            </p>
          )}

          {/* Projects Grid */}
          <AnimatePresence mode="popLayout">
            {visibleItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                {visibleItems.map((item, index) => (
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
                  onClick={handleClearAll}
                  className="mt-4 text-primary hover:text-primary/80 underline underline-offset-4"
                >
                  {t('portfolio.filters.clearAll', 'Wis alle filters')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Load More */}
          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center mt-12"
            >
              <Button
                onClick={handleLoadMore}
                variant="outline"
                size="lg"
                className="border-primary/30 hover:border-primary/60 hover:shadow-[0_0_25px_hsl(var(--gold)/0.2)] transition-all duration-300"
              >
                {t('portfolio.loadMore', 'Meer projecten laden')}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Count indicator */}
          <p className="text-center text-muted-foreground text-xs mt-6">
            {visibleItems.length} / {filteredItems.length} {t('portfolio.page.projects', 'projecten')}
          </p>

          {/* NDA Disclaimer - Bottom */}
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

export default Gallery;
