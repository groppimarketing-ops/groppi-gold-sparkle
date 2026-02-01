import { memo, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, Sparkles } from 'lucide-react';
import QuoteBuilderSelectors from './QuoteBuilderSelectors';
import QuoteSummaryCard from './QuoteSummaryCard';
import { useEstimateId } from './useEstimateId';
import { usePromoCountdown } from './usePromoCountdown';
import { TierKey, EstimatePayload, DISCOUNT_PERCENTAGE } from './types';

interface ConsultationQuoteBuilderProps {
  serviceKey: string;
}

// Pricing configuration per service (can be extended)
const SERVICE_PRICING: Record<string, {
  base: Record<TierKey, { min: number; max: number }>;
  setup: Record<TierKey, number>;
  options: Record<string, number>;
  showAdBudget: boolean;
  adBudgetModifier: Record<string, number>;
}> = {
  socialMedia: {
    base: {
      starter: { min: 350, max: 450 },
      growth: { min: 550, max: 750 },
      pro: { min: 950, max: 1350 },
    },
    setup: { starter: 150, growth: 250, pro: 450 },
    options: {
      extraContent4: 120,
      extraContent12: 280,
      extraVideo2: 180,
      extraVideo6: 450,
    },
    showAdBudget: false,
    adBudgetModifier: {},
  },
  adsManagement: {
    base: {
      starter: { min: 300, max: 400 },
      growth: { min: 500, max: 700 },
      pro: { min: 900, max: 1200 },
    },
    setup: { starter: 200, growth: 350, pro: 500 },
    options: {
      extraLandingPage: 350,
      extraTracking: 200,
      remarketing: 150,
      abTesting: 100,
    },
    showAdBudget: true,
    adBudgetModifier: {
      '300': 0,
      '500': 50,
      '1000': 100,
      '3000': 200,
    },
  },
  seo: {
    base: {
      starter: { min: 350, max: 450 },
      growth: { min: 600, max: 800 },
      pro: { min: 1000, max: 1500 },
    },
    setup: { starter: 200, growth: 300, pro: 500 },
    options: {
      localSeo: 150,
      contentWriting: 200,
      linkBuilding: 250,
      competitorAnalysis: 180,
    },
    showAdBudget: false,
    adBudgetModifier: {},
  },
  businessWebsite: {
    base: {
      starter: { min: 1500, max: 2000 },
      growth: { min: 2500, max: 3500 },
      pro: { min: 4000, max: 6000 },
    },
    setup: { starter: 0, growth: 0, pro: 0 },
    options: {
      extraPages: 150,
      blogSetup: 300,
      multiLanguage: 500,
      animations: 400,
    },
    showAdBudget: false,
    adBudgetModifier: {},
  },
  ecommerceWebsite: {
    base: {
      starter: { min: 2000, max: 3000 },
      growth: { min: 3500, max: 5000 },
      pro: { min: 6000, max: 10000 },
    },
    setup: { starter: 0, growth: 0, pro: 0 },
    options: {
      paymentIntegration: 300,
      inventoryManagement: 400,
      emailAutomation: 250,
      analyticsSetup: 200,
    },
    showAdBudget: false,
    adBudgetModifier: {},
  },
  contentProduction: {
    base: {
      starter: { min: 25, max: 250 },
      growth: { min: 150, max: 500 },
      pro: { min: 250, max: 1000 },
    },
    setup: { starter: 0, growth: 0, pro: 0 },
    options: {
      posterAI: 25,
      posterClientFootage: 200,
      posterOnLocation: 250,
      reelAI: 150,
      reelClientFootage: 200,
      reelOnLocation: 250,
      video1Min: 250,
      article600Words: 99,
      photoshoot: 400,
      branding: 350,
    },
    showAdBudget: false,
    adBudgetModifier: {},
  },
};

// Default pricing for unknown services
const DEFAULT_PRICING = {
  base: {
    starter: { min: 400, max: 600 },
    growth: { min: 700, max: 1000 },
    pro: { min: 1200, max: 1800 },
  },
  setup: { starter: 150, growth: 250, pro: 400 },
  options: {},
  showAdBudget: false,
  adBudgetModifier: {},
};

const ConsultationQuoteBuilder = memo(({ serviceKey }: ConsultationQuoteBuilderProps) => {
  const { t } = useTranslation();
  const { saveEstimate } = useEstimateId();
  const promoState = usePromoCountdown();

  // State
  const [tierKey, setTierKey] = useState<TierKey | null>('growth');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [adBudget, setAdBudget] = useState<string | null>(null);
  const [currentEstimate, setCurrentEstimate] = useState<EstimatePayload | null>(null);

  // Get pricing config for this service
  const pricingConfig = SERVICE_PRICING[serviceKey] || DEFAULT_PRICING;

  // Calculate price
  const { priceMin, priceMax, setupFee } = useMemo(() => {
    if (!tierKey) {
      return { priceMin: 0, priceMax: 0, setupFee: 0 };
    }

    const base = pricingConfig.base[tierKey];
    const setup = pricingConfig.setup[tierKey];
    const adModifier = adBudget 
      ? (pricingConfig.adBudgetModifier[adBudget] || 0)
      : 0;

    let optionsTotal = 0;
    selectedOptions.forEach(opt => {
      optionsTotal += pricingConfig.options[opt] || 0;
    });

    return {
      priceMin: base.min + adModifier + optionsTotal,
      priceMax: base.max + adModifier + optionsTotal,
      setupFee: setup,
    };
  }, [tierKey, selectedOptions, adBudget, pricingConfig]);

  // Toggle option
  const toggleOption = useCallback((option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
    // Clear existing estimate when options change
    setCurrentEstimate(null);
  }, []);

  // Handle tier change
  const handleTierChange = useCallback((tier: TierKey) => {
    setTierKey(tier);
    setCurrentEstimate(null);
  }, []);

  // Handle ad budget change
  const handleAdBudgetChange = useCallback((budget: string) => {
    setAdBudget(budget);
    setCurrentEstimate(null);
  }, []);

  // Check if form is valid
  const isValid = tierKey !== null;

  // Reserve price (create estimate)
  const handleReservePrice = useCallback(() => {
    if (!isValid || !tierKey) return;

    const discountApplied = promoState.isActive;
    const discountAmount = discountApplied 
      ? Math.round((priceMin + priceMax) / 2 * (DISCOUNT_PERCENTAGE / 100))
      : 0;

    const estimate = saveEstimate({
      serviceKey,
      tierKey,
      options: selectedOptions,
      adBudget,
      priceMin: discountApplied ? Math.round(priceMin * (1 - DISCOUNT_PERCENTAGE / 100)) : priceMin,
      priceMax: discountApplied ? Math.round(priceMax * (1 - DISCOUNT_PERCENTAGE / 100)) : priceMax,
      discountApplied,
      discountAmount,
    });

    setCurrentEstimate(estimate);

    // Scroll to summary on mobile
    const summaryElement = document.getElementById('quote-summary');
    if (summaryElement && window.innerWidth < 1024) {
      summaryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [isValid, tierKey, selectedOptions, adBudget, priceMin, priceMax, promoState.isActive, serviceKey, saveEstimate]);

  return (
    <section id="opties-prijzen" className="relative py-16 lg:py-24 bg-background scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-primary/[0.04] to-primary/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-primary mb-4"
            >
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                {t('quoteBuilder.label')}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text mb-3"
            >
              {t('quoteBuilder.title')}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              {t('quoteBuilder.subtitle')}
            </motion.p>

            {/* Promo Badge */}
            {promoState.isActive && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full"
              >
                <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  {t('quoteBuilder.promoBadge', { percent: DISCOUNT_PERCENTAGE })} — nog {promoState.formatTimeRemaining()}
                </span>
              </motion.div>
            )}
          </div>

          {/* Main Content: Two Columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          >
            {/* Left: Selectors (3 cols) */}
            <div className="lg:col-span-3 glass-card p-6 lg:p-8 rounded-2xl border-primary/20">
              <QuoteBuilderSelectors
                serviceKey={serviceKey}
                tierKey={tierKey}
                setTierKey={handleTierChange}
                selectedOptions={selectedOptions}
                toggleOption={toggleOption}
                adBudget={adBudget}
                setAdBudget={handleAdBudgetChange}
                showAdBudget={pricingConfig.showAdBudget}
                availableOptions={Object.keys(pricingConfig.options)}
              />
            </div>

            {/* Right: Summary Card (2 cols) */}
            <div id="quote-summary" className="lg:col-span-2">
              <QuoteSummaryCard
                serviceKey={serviceKey}
                tierKey={tierKey}
                selectedOptions={selectedOptions}
                adBudget={adBudget}
                priceMin={priceMin}
                priceMax={priceMax}
                setupFee={setupFee}
                isPromoActive={promoState.isActive}
                promoTimeRemaining={promoState.formatTimeRemaining()}
                currentEstimate={currentEstimate}
                onReservePrice={handleReservePrice}
                isValid={isValid}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ConsultationQuoteBuilder.displayName = 'ConsultationQuoteBuilder';

export default ConsultationQuoteBuilder;
