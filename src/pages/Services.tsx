import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Camera, Globe, ShoppingCart, Megaphone, Search, Share2, Star, RefreshCw, Brain, Rocket, Filter, FileText, Layout, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import ServiceCard, { ServiceData } from '@/components/services/ServiceCard';

const Services = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<'all' | 'monthly' | 'one_time' | 'custom'>('all');

  // Enhanced GROPPI services with full deliverables and pricing clarity
  const services: ServiceData[] = [
    // Content Production - Core Service with Packages
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
      gradient: 'from-purple-500/20 to-blue-500/20',
      pricingType: 'custom',
      priceMin: 500,
      targetAudience: ['business', 'creator'],
      packages: [
        {
          id: 'starter',
          titleKey: 'services.packages.starter',
          features: [
            'services.items.contentProduction.packages.starter.0',
            'services.items.contentProduction.packages.starter.1',
            'services.items.contentProduction.packages.starter.2',
            'services.items.contentProduction.packages.starter.3',
          ],
        },
        {
          id: 'growth',
          titleKey: 'services.packages.growth',
          features: [
            'services.items.contentProduction.packages.growth.0',
            'services.items.contentProduction.packages.growth.1',
            'services.items.contentProduction.packages.growth.2',
            'services.items.contentProduction.packages.growth.3',
          ],
        },
        {
          id: 'pro',
          titleKey: 'services.packages.pro',
          features: [
            'services.items.contentProduction.packages.pro.0',
            'services.items.contentProduction.packages.pro.1',
            'services.items.contentProduction.packages.pro.2',
            'services.items.contentProduction.packages.pro.3',
          ],
        },
      ],
    },
    // One-Page Website
    {
      id: 'one-page-website',
      icon: FileText,
      titleKey: 'services.items.onePage.title',
      descriptionKey: 'services.items.onePage.description',
      features: [
        'services.items.onePage.features.0',
        'services.items.onePage.features.1',
        'services.items.onePage.features.2',
        'services.items.onePage.features.3',
      ],
      gradient: 'from-cyan-500/20 to-teal-500/20',
      pricingType: 'one_time',
      priceMin: 500,
      priceMax: 1500,
      targetAudience: ['individual', 'business'],
      packageTier: 'starter',
    },
    // Business Website
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
      gradient: 'from-blue-500/20 to-indigo-500/20',
      pricingType: 'one_time',
      priceMin: 1500,
      priceMax: 8000,
      targetAudience: ['business'],
      packageTier: 'growth',
    },
    // E-commerce Website
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
      gradient: 'from-green-500/20 to-emerald-500/20',
      pricingType: 'one_time',
      priceMin: 3000,
      priceMax: 25000,
      targetAudience: ['business'],
      packageTier: 'pro',
    },
    // Ads Management
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
      gradient: 'from-orange-500/20 to-red-500/20',
      pricingType: 'monthly',
      priceMin: 500,
      priceMax: 5000,
      targetAudience: ['business'],
    },
    // SEO
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
      gradient: 'from-blue-500/20 to-indigo-500/20',
      pricingType: 'monthly',
      priceMin: 300,
      priceMax: 2000,
      targetAudience: ['business'],
    },
    // Social Media Management
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
      gradient: 'from-pink-500/20 to-rose-500/20',
      pricingType: 'monthly',
      priceMin: 400,
      priceMax: 3000,
      targetAudience: ['business', 'creator'],
    },
    // Reputation Management
    {
      id: 'reputation',
      icon: Star,
      titleKey: 'services.items.reputation.title',
      descriptionKey: 'services.items.reputation.description',
      features: [
        'services.items.reputation.features.0',
        'services.items.reputation.features.1',
        'services.items.reputation.features.2',
        'services.items.reputation.features.3',
      ],
      gradient: 'from-amber-500/20 to-yellow-500/20',
      pricingType: 'monthly',
      priceMin: 200,
      priceMax: 1000,
      targetAudience: ['business'],
    },
    // Data Sync
    {
      id: 'data-sync',
      icon: RefreshCw,
      titleKey: 'services.items.dataSync.title',
      descriptionKey: 'services.items.dataSync.description',
      features: [
        'services.items.dataSync.features.0',
        'services.items.dataSync.features.1',
        'services.items.dataSync.features.2',
        'services.items.dataSync.features.3',
      ],
      gradient: 'from-violet-500/20 to-purple-500/20',
      pricingType: 'custom',
      targetAudience: ['business'],
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
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
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
      <section className="py-8 border-b border-primary/10">
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            layout
          >
            {filteredServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
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

      {/* AI Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <GlassCard className="p-8 md:p-12 text-center">
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 30px hsl(var(--primary) / 0.2)',
                    '0 0 60px hsl(var(--primary) / 0.4)',
                    '0 0 30px hsl(var(--primary) / 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-8"
              >
                <Brain className="w-10 h-10 text-primary" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-shimmer-text">
                {t('services.ai.title')}
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {t('services.ai.description')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="luxury-button">
                  <Link to="/contact">
                    {t('services.ai.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="glass-button">
                  <Link to="/about">
                    {t('services.ai.learnMore')}
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={t('services.process.subtitle')}
            title={t('services.process.title')}
            centered
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              { icon: '01', titleKey: 'services.process.steps.0.title', descKey: 'services.process.steps.0.description' },
              { icon: '02', titleKey: 'services.process.steps.1.title', descKey: 'services.process.steps.1.description' },
              { icon: '03', titleKey: 'services.process.steps.2.title', descKey: 'services.process.steps.2.description' },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold gold-gradient-text">{step.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{t(step.titleKey)}</h3>
                  <p className="text-muted-foreground">{t(step.descKey)}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <GlassCard className="p-8 md:p-12">
              <Rocket className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-shimmer-text">
                {t('services.cta.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {t('services.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="luxury-button">
                  <Link to="/contact">
                    {t('services.cta.button')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="glass-button">
                  <Link to="/franchise">
                    {t('nav.franchise')}
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
