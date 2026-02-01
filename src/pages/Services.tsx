import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Filter, Award } from 'lucide-react';
import { useState, useRef } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/badge';
import ServiceCard, { ServiceData } from '@/components/services/ServiceCard';
import { Camera, Globe, ShoppingCart, Megaphone, Search, Share2 } from 'lucide-react';

const Services = () => {
  const { t, i18n } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'monthly' | 'one_time' | 'custom'>('all');
  const servicesGridRef = useRef<HTMLElement>(null);
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // Featured service ID for the "Most chosen" badge
  const featuredServiceId = 'social-media';

  // Clean service list - only 6 core services with canonical slugs
  // PRICING LOCK: Only content-production has fixed prices (€25–€250)
  // All other services show "Offerte op maat" (no numeric prices)
  const services: ServiceData[] = [
    // Social Media Management - NO PRICE (custom quote)
    {
      id: 'social-media',
      icon: Share2,
      titleKey: 'services.items.social.title',
      descriptionKey: 'services.items.social.description',
      features: [
        'services.items.social.features.0',
        'services.items.social.features.1',
        'services.items.social.features.2',
        'services.items.social.features.3',
      ],
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'monthly',
      // No priceMin/priceMax - shows "Offerte op maat"
      targetAudience: ['business', 'creator'],
      videoUrl: '/videos/portfolio/lebanon-promo-1.mp4',
    },
    // Ads Management - NO PRICE (custom quote)
    {
      id: 'ads-management',
      icon: Megaphone,
      titleKey: 'services.items.ads.title',
      descriptionKey: 'services.items.ads.description',
      features: [
        'services.items.ads.features.0',
        'services.items.ads.features.1',
        'services.items.ads.features.2',
        'services.items.ads.features.3',
      ],
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'monthly',
      // No priceMin/priceMax - shows "Offerte op maat"
      targetAudience: ['business'],
      videoUrl: '/videos/portfolio/lebanon-promo-2.mp4',
    },
    // SEO - NO PRICE (custom quote)
    {
      id: 'seo',
      icon: Search,
      titleKey: 'services.items.seo.title',
      descriptionKey: 'services.items.seo.description',
      features: [
        'services.items.seo.features.0',
        'services.items.seo.features.1',
        'services.items.seo.features.2',
        'services.items.seo.features.3',
      ],
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'monthly',
      // No priceMin/priceMax - shows "Offerte op maat"
      targetAudience: ['business'],
    },
    // Business Website - NO PRICE (custom quote)
    {
      id: 'business-website',
      icon: Globe,
      titleKey: 'services.items.businessWebsite.title',
      descriptionKey: 'services.items.businessWebsite.description',
      features: [
        'services.items.businessWebsite.features.0',
        'services.items.businessWebsite.features.1',
        'services.items.businessWebsite.features.2',
        'services.items.businessWebsite.features.3',
        'services.items.businessWebsite.features.4',
      ],
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'one_time',
      // No priceMin/priceMax - shows "Offerte op maat"
      targetAudience: ['business'],
    },
    // E-commerce / Webshop - NO PRICE (custom quote)
    {
      id: 'ecommerce-website',
      icon: ShoppingCart,
      titleKey: 'services.items.ecommerce.title',
      descriptionKey: 'services.items.ecommerce.description',
      features: [
        'services.items.ecommerce.features.0',
        'services.items.ecommerce.features.1',
        'services.items.ecommerce.features.2',
        'services.items.ecommerce.features.3',
        'services.items.ecommerce.features.4',
      ],
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'one_time',
      // No priceMin/priceMax - shows "Offerte op maat"
      targetAudience: ['business'],
    },
    // Content Production - FIXED PRICES: €25 (poster AI), €99 (article), €150 (reel AI), €250 (video/shoot)
    {
      id: 'content-production',
      icon: Camera,
      titleKey: 'services.items.contentProduction.title',
      descriptionKey: 'services.items.contentProduction.description',
      features: [
        'services.items.contentProduction.features.0',
        'services.items.contentProduction.features.1',
        'services.items.contentProduction.features.2',
        'services.items.contentProduction.features.3',
        'services.items.contentProduction.features.4',
      ],
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'one_time',
      priceMin: 25, // Lowest price: AI-generated poster
      // No priceMax - only show "Vanaf €25"
      targetAudience: ['business', 'creator'],
      videoUrl: '/videos/portfolio/il-fuoco-promo.mp4',
    },
  ];

  const filteredServices = services.filter(service => {
    if (filter === 'all') return true;
    return service.pricingType === filter;
  });

  const filters = [
    { key: 'all', labelKey: 'services.filters.all' },
    { key: 'monthly', labelKey: 'services.filters.monthly' },
    { key: 'one_time', labelKey: 'services.filters.oneTime' },
    { key: 'custom', labelKey: 'services.filters.custom' },
  ];

  return (
    <PageLayout>
      {/* Hero Section - Clean and minimal */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('services.subtitle')}
            title={t('services.title')}
            description={t('services.description')}
            showSparkle
          />
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-6 border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Filter className="w-5 h-5 text-muted-foreground" />
            {filters.map((f) => (
              <motion.button
                key={f.key}
                onClick={() => setFilter(f.key as typeof filter)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === f.key
                    ? 'bg-primary text-primary-foreground'
                    : 'glass-card text-muted-foreground hover:text-foreground'
                }`}
              >
                {t(f.labelKey)}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services-grid" ref={servicesGridRef} className="py-20">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{t('services.gridTitle')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t('services.gridSubtitle')}</p>
          </motion.div>

          {/* Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredServices.map((service, index) => (
              <div key={service.id} className="relative">
                {/* Featured Badge with gold pulse animation */}
                {service.id === featuredServiceId && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 10px hsl(43 100% 50% / 0.3)',
                          '0 0 20px hsl(43 100% 50% / 0.5)',
                          '0 0 10px hsl(43 100% 50% / 0.3)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="rounded-full"
                    >
                      <Badge className="bg-primary/90 text-primary-foreground gap-1.5 px-3 py-1 shadow-lg whitespace-nowrap">
                        <Award className="w-3.5 h-3.5" />
                        {t('services.featuredBadge')}
                      </Badge>
                    </motion.div>
                  </motion.div>
                )}
                <ServiceCard 
                  service={service} 
                  index={index} 
                  isFeatured={service.id === featuredServiceId}
                />
              </div>
            ))}
          </motion.div>

          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg">
                {t('services.noResults')}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 rounded-2xl text-center max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 gold-gradient-text">
              {t('services.cta.title')}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t('services.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/32471234567?text=Hey%20GROPPi%20%F0%9F%91%8B%20Ik%20wil%20graag%20meer%20info%20over%20jullie%20diensten."
                target="_blank"
                rel="noopener noreferrer"
                className="luxury-button inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium"
              >
                {t('services.cta.whatsapp')}
              </a>
              <a
                href="/contact"
                className="glass-button inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium"
              >
                {t('services.cta.contact')}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
