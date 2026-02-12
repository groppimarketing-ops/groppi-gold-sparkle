/**
 * CENTRAL PRICING CONFIGURATION - Single Source of Truth
 * All prices are VAT excluded (excl. BTW)
 * 
 * CRITICAL: All UI components must import from this file.
 * DO NOT hardcode prices anywhere else.
 */

// Content Production - Add-on pricing (one-time per item)
export const CONTENT_PRICING = {
  poster: {
    ai: 45, // AI-generated poster
  },
  reel: {
    ai: 150,           // AI-generated full reel (1 minute)
    clientFootage: 200, // Client provides footage, we edit + branding
    onSite: 250,        // We visit and film on location
  },
  video: 250, // 1 minute video
  article: 99, // 600 words, fixed price
} as const;

// Website Services - One-time project pricing
export const WEBSITE_PRICING = {
  onePage: {
    oneTime: 500,
    monthlyMaintenance: null, // No monthly option
  },
  business: {
    oneTime: 1500,
    monthlyMaintenance: null,
  },
  ecommerce: {
    oneTime: 3000,
    monthlyMaintenance: null,
  },
} as const;

// Mobile App Development - Dual pricing (one-time + monthly maintenance)
export const MOBILE_APP_PRICING = {
  oneTime: 4000,       // Project build fee
  monthlyMaintenance: 250, // Monthly maintenance subscription
} as const;

// Monthly subscription services
export const SUBSCRIPTION_PRICING = {
  socialMedia: {
    baseMonthly: 400,
    setupFee: 150,
  },
  adsManagement: {
    baseMonthly: 500,
    setupFee: 200,
  },
  seo: {
    baseMonthly: 300,
    setupFee: 150,
  },
  reputation: {
    baseMonthly: 200,
    setupFee: 100,
  },
} as const;

// Service card display configuration
// Maps service IDs to their pricing display
export type PriceDisplayType = 'custom' | 'from' | 'fixed';
export type PricingType = 'monthly' | 'one_time' | 'custom';

export interface ServicePricingConfig {
  id: string;
  priceDisplay: PriceDisplayType;
  priceMin?: number;
  priceMax?: number;
  priceUnit?: string; // e.g., '/item', '/maand'
  pricingType: PricingType;
  hasCalculator: boolean;
  /** For dual-pricing services (one-time + monthly maintenance) */
  secondaryPriceMin?: number;
  secondaryPriceUnit?: string;
  secondaryPricingType?: PricingType;
}

export const SERVICE_PRICING_CONFIG: Record<string, ServicePricingConfig> = {
  'content-production': {
    id: 'content-production',
    priceDisplay: 'from',
    priceMin: CONTENT_PRICING.poster.ai, // €25 (lowest item)
    priceUnit: '/item',
    pricingType: 'one_time',
    hasCalculator: true,
  },
  'business-website': {
    id: 'business-website',
    priceDisplay: 'fixed',
    priceMin: WEBSITE_PRICING.business.oneTime, // €1500
    pricingType: 'one_time',
    hasCalculator: false,
  },
  'one-page-website': {
    id: 'one-page-website',
    priceDisplay: 'fixed',
    priceMin: WEBSITE_PRICING.onePage.oneTime, // €500
    pricingType: 'one_time',
    hasCalculator: false,
  },
  'ecommerce-website': {
    id: 'ecommerce-website',
    priceDisplay: 'fixed',
    priceMin: WEBSITE_PRICING.ecommerce.oneTime, // €3000
    pricingType: 'one_time',
    hasCalculator: false,
  },
  'ads-management': {
    id: 'ads-management',
    priceDisplay: 'from',
    priceMin: SUBSCRIPTION_PRICING.adsManagement.baseMonthly, // €500/maand
    priceUnit: '/maand',
    pricingType: 'monthly',
    hasCalculator: true,
  },
  'seo': {
    id: 'seo',
    priceDisplay: 'from',
    priceMin: SUBSCRIPTION_PRICING.seo.baseMonthly, // €300/maand
    priceUnit: '/maand',
    pricingType: 'monthly',
    hasCalculator: false,
  },
  'social-media': {
    id: 'social-media',
    priceDisplay: 'from',
    priceMin: SUBSCRIPTION_PRICING.socialMedia.baseMonthly, // €400/maand
    priceUnit: '/maand',
    pricingType: 'monthly',
    hasCalculator: true,
  },
  'reputation': {
    id: 'reputation',
    priceDisplay: 'from',
    priceMin: SUBSCRIPTION_PRICING.reputation.baseMonthly, // €200/maand
    priceUnit: '/maand',
    pricingType: 'monthly',
    hasCalculator: false,
  },
  'mobile-app-development': {
    id: 'mobile-app-development',
    priceDisplay: 'from',
    priceMin: MOBILE_APP_PRICING.oneTime, // €4,000 one-time
    pricingType: 'one_time',
    hasCalculator: false,
    secondaryPriceMin: MOBILE_APP_PRICING.monthlyMaintenance, // €250/month
    secondaryPriceUnit: '/maand',
    secondaryPricingType: 'monthly',
  },
} as const;

// Helper function to get price display string
export function getPriceDisplayString(
  config: ServicePricingConfig,
  t: (key: string) => string
): string {
  if (config.priceDisplay === 'custom') {
    return t('pricing.customQuote');
  }
  if (config.priceDisplay === 'from' && config.priceMin) {
    return `${t('pricing.from')} €${config.priceMin.toLocaleString('nl-BE')}`;
  }
  if (config.priceDisplay === 'fixed' && config.priceMin) {
    return `€${config.priceMin.toLocaleString('nl-BE')}`;
  }
  return t('pricing.customQuote');
}

// Helper function to get price suffix
export function getPriceSuffix(
  config: ServicePricingConfig,
  t: (key: string) => string
): string {
  if (config.priceDisplay === 'custom') return '';
  // Use translation keys for price units instead of hardcoded Dutch strings
  if (config.priceUnit) {
    if (config.priceUnit === '/maand') return t('pricing.perMonth');
    if (config.priceUnit === '/item') return '/ item';
    return config.priceUnit;
  }
  if (config.pricingType === 'monthly') return t('pricing.perMonth');
  if (config.pricingType === 'one_time') return t('pricing.oneTime');
  return '';
}

