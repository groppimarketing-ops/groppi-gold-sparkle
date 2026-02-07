import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Camera, Globe, ShoppingCart, Megaphone, Search, Share2, Star, RefreshCw, Brain, Rocket, Filter, FileText, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceCard, { ServiceData } from '@/components/services/ServiceCard';
import GoalBasedEntry from '@/components/services/GoalBasedEntry';
import ServiceDetailModal from '@/components/services/ServiceDetailModal';
import HomeServiceMap from '@/components/home/HomeServiceMap';
import ContentCalculator from '@/components/service-page/ContentCalculator';
import PricingFAQ from '@/components/service-page/PricingFAQ';
import GeneralFAQ from '@/components/service-page/GeneralFAQ';
import ServicesFAQ from '@/components/service-page/ServicesFAQ';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const Services = () => {
  const { t, i18n } = useTranslation(); // rebuilt
  const [filter, setFilter] = useState<'all' | 'monthly' | 'one_time' | 'custom'>('all');
  const [selectedService, setSelectedService] = useState<ServiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [highlightedServices, setHighlightedServices] = useState<string[]>([]);
  const servicesGridRef = useRef<HTMLElement>(null);
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // Handle goal selection from goal-based entry
  const handleGoalSelect = (goal: 'visibility' | 'leads' | 'sales') => {
    const goalToServicesMap: Record<string, string[]> = {
      visibility: ['social-media', 'content-production'],
      leads: ['ads-management', 'seo'],
      sales: ['ecommerce-website', 'ads-management'],
    };
    
    setHighlightedServices(goalToServicesMap[goal]);
    
    // Scroll to services grid
    setTimeout(() => {
      servicesGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    
    // Clear highlights after a few seconds
    setTimeout(() => {
      setHighlightedServices([]);
    }, 5000);
  };

  // Featured service ID for the "Most chosen by growing businesses" badge
  const featuredServiceId = 'social-media';

  // Enhanced GROPPI services with full deliverables and pricing clarity
  // All services use unified gold styling - no colored gradients
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
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'one_time',
      priceMin: 45,
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
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'one_time',
      priceMin: 500,
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
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'one_time',
      priceMin: 1500,
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
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'one_time',
      priceMin: 3000,
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
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'monthly',
      priceMin: 500,
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
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'monthly',
      priceMin: 300,
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
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'monthly',
      priceMin: 400,
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
      gradient: 'from-primary/5 to-primary/15',
      pricingType: 'monthly',
      priceMin: 200,
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
      gradient: 'from-primary/5 to-primary/15',
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

  // Handle recommendation from wizard
  const handleRecommendationSelect = (serviceId: string) => {
    const service = services.find(s => s.id === serviceId);
    if (service) {
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  return (
    <PageLayout>
      <PageSEO
        title={t('services.title', 'Diensten')}
        description={t('services.description', 'Ontdek onze diensten: social media management, SEO, advertenties, webdesign, contentcreatie en meer.')}
        path="/services"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: t('nav.services', 'Diensten'), path: '/services' }]} />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Note: Discount banner removed - only shown on service detail pages after user shows intent */}
          
          <SectionHeader
            subtitle={t('services.subtitle')}
            title={t('services.title')}
            description={t('services.description')}
            showSparkle
          />
        </div>
      </section>

      {/* Service Map - What We Do (moved from homepage) */}
      <HomeServiceMap />

      {/* Goal-Based Entry Section */}
      <GoalBasedEntry onGoalSelect={handleGoalSelect} />

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
      <section id="services-grid" ref={servicesGridRef} className="py-24">
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

          {/* Grid with enhanced spacing */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
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
                  isHighlighted={highlightedServices.includes(service.id)}
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

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          />
        </div>
      </section>

      {/* Service Detail Modal (for wizard recommendations) */}
      {selectedService && (
        <ServiceDetailModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
          service={selectedService}
        />
      )}

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

      {/* Content Calculator Section */}
      <ContentCalculator />

      {/* General FAQ Section */}
      <GeneralFAQ />

      {/* Services FAQ Section */}
      <ServicesFAQ />

      {/* Pricing FAQ Section */}
      <PricingFAQ />

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
