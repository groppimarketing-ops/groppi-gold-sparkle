import { memo } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { Industry, ServiceTag } from '@/types/portfolio';
import { industryLabels, serviceTagLabels } from '@/types/portfolio';

interface PortfolioFiltersProps {
  selectedIndustry: string;
  selectedService: string;
  searchQuery: string;
  onIndustryChange: (industry: string) => void;
  onServiceChange: (service: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

const industries: (Industry | 'all')[] = [
  'all',
  'restaurant',
  'ecommerce',
  'construction',
  'beauty',
  'interior',
  'b2b',
  'startup',
  'services',
  'retail',
];

const serviceTags: (ServiceTag | 'all')[] = [
  'all',
  'website',
  'branding',
  'ads',
  'social',
  'ecommerce',
  'seo',
  'content',
];

const PortfolioFilters = memo(({
  selectedIndustry,
  selectedService,
  searchQuery,
  onIndustryChange,
  onServiceChange,
  onSearchChange,
  onClearFilters,
}: PortfolioFiltersProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('nl') ? 'nl' : 'en';

  const hasActiveFilters = selectedIndustry !== 'all' || selectedService !== 'all' || searchQuery.trim() !== '';

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t('portfolio.filters.searchPlaceholder', 'Zoek op klantnaam...')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-10 py-3 glass-card border-primary/20 focus:border-primary/50 text-foreground placeholder:text-muted-foreground"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
            aria-label="Wis zoekopdracht"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Industry Filter */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          {t('portfolio.filters.industryLabel', 'Filter op sector')}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {industries.map((industry) => (
            <motion.button
              key={industry}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onIndustryChange(industry)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedIndustry === industry
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--gold)/0.3)]'
                  : 'glass-card border-primary/20 hover:border-primary/40 text-foreground/80'
              }`}
            >
              {industry === 'all' 
                ? t('portfolio.filters.all', 'Alle') 
                : industryLabels[industry][lang]
              }
            </motion.button>
          ))}
        </div>
      </div>

      {/* Service Filter */}
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center">
          {t('portfolio.filters.serviceLabel', 'Filter op dienst')}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {serviceTags.map((service) => (
            <motion.button
              key={service}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onServiceChange(service)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedService === service
                  ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--gold)/0.3)]'
                  : 'glass-card border-primary/20 hover:border-primary/40 text-foreground/80'
              }`}
            >
              {service === 'all' 
                ? t('portfolio.filters.all', 'Alle') 
                : serviceTagLabels[service][lang]
              }
            </motion.button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="text-primary hover:text-primary hover:bg-primary/10"
          >
            <X className="w-4 h-4 mr-2" />
            {t('portfolio.filters.clearAll', 'Wis alle filters')}
          </Button>
        </motion.div>
      )}
    </div>
  );
});

PortfolioFilters.displayName = 'PortfolioFilters';

export default PortfolioFilters;
