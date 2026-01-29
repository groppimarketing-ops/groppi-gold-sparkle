import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Globe, ShoppingCart, Megaphone, Search, Share2, Star, RefreshCw, FileText, Award, Play, ArrowRight, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import HomeServiceModal from './HomeServiceModal';

export interface HomeServiceData {
  id: string;
  icon: typeof Camera;
  titleKey: string;
  descKey: string;
  priceMin: number;
  priceMax?: number;
  pricingType: 'monthly' | 'one_time' | 'custom';
  deliverables: string[];
  videoUrl?: string;
  hasCalculator?: boolean;
}

interface HomeServicesGridProps {
  highlightedServices?: string[];
}

const HomeServicesGrid = forwardRef<HTMLElement, HomeServicesGridProps>(({ highlightedServices = [] }, ref) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
  const [selectedService, setSelectedService] = useState<HomeServiceData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'deliverables' | 'pricing' | 'video' | 'calculator'>('overview');

  const featuredServiceId = 'social-media';

  const services: HomeServiceData[] = [
    {
      id: 'content-production',
      icon: Camera,
      titleKey: 'home.servicesGrid.items.contentProduction.title',
      descKey: 'home.servicesGrid.items.contentProduction.desc',
      priceMin: 500,
      pricingType: 'custom',
      deliverables: [
        'home.servicesGrid.items.contentProduction.deliverables.0',
        'home.servicesGrid.items.contentProduction.deliverables.1',
        'home.servicesGrid.items.contentProduction.deliverables.2',
      ],
    },
    {
      id: 'business-website',
      icon: Globe,
      titleKey: 'home.servicesGrid.items.businessWebsite.title',
      descKey: 'home.servicesGrid.items.businessWebsite.desc',
      priceMin: 1500,
      priceMax: 8000,
      pricingType: 'one_time',
      deliverables: [
        'home.servicesGrid.items.businessWebsite.deliverables.0',
        'home.servicesGrid.items.businessWebsite.deliverables.1',
        'home.servicesGrid.items.businessWebsite.deliverables.2',
      ],
    },
    {
      id: 'ecommerce-website',
      icon: ShoppingCart,
      titleKey: 'home.servicesGrid.items.ecommerce.title',
      descKey: 'home.servicesGrid.items.ecommerce.desc',
      priceMin: 3000,
      priceMax: 25000,
      pricingType: 'one_time',
      deliverables: [
        'home.servicesGrid.items.ecommerce.deliverables.0',
        'home.servicesGrid.items.ecommerce.deliverables.1',
        'home.servicesGrid.items.ecommerce.deliverables.2',
      ],
    },
    {
      id: 'ads-management',
      icon: Megaphone,
      titleKey: 'home.servicesGrid.items.ads.title',
      descKey: 'home.servicesGrid.items.ads.desc',
      priceMin: 500,
      priceMax: 5000,
      pricingType: 'monthly',
      deliverables: [
        'home.servicesGrid.items.ads.deliverables.0',
        'home.servicesGrid.items.ads.deliverables.1',
        'home.servicesGrid.items.ads.deliverables.2',
      ],
      hasCalculator: true,
    },
    {
      id: 'seo',
      icon: Search,
      titleKey: 'home.servicesGrid.items.seo.title',
      descKey: 'home.servicesGrid.items.seo.desc',
      priceMin: 300,
      priceMax: 2000,
      pricingType: 'monthly',
      deliverables: [
        'home.servicesGrid.items.seo.deliverables.0',
        'home.servicesGrid.items.seo.deliverables.1',
        'home.servicesGrid.items.seo.deliverables.2',
      ],
    },
    {
      id: 'social-media',
      icon: Share2,
      titleKey: 'home.servicesGrid.items.social.title',
      descKey: 'home.servicesGrid.items.social.desc',
      priceMin: 400,
      priceMax: 3000,
      pricingType: 'monthly',
      deliverables: [
        'home.servicesGrid.items.social.deliverables.0',
        'home.servicesGrid.items.social.deliverables.1',
        'home.servicesGrid.items.social.deliverables.2',
      ],
      hasCalculator: true,
    },
  ];

  const handleOpenModal = (service: HomeServiceData, tab: typeof activeTab = 'overview') => {
    setSelectedService(service);
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  const getPriceDisplay = (service: HomeServiceData) => {
    if (service.pricingType === 'custom') {
      return t('home.servicesGrid.customQuote');
    }
    if (service.priceMin && service.priceMax) {
      return `€${service.priceMin.toLocaleString()} - €${service.priceMax.toLocaleString()}`;
    }
    return `€${service.priceMin.toLocaleString()}+`;
  };

  const getPricingSuffix = (service: HomeServiceData) => {
    if (service.pricingType === 'monthly') return t('home.servicesGrid.perMonth');
    if (service.pricingType === 'one_time') return t('home.servicesGrid.oneTime');
    return '';
  };

  return (
    <>
      <section ref={ref} id="services-section" className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 neural-lines opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <SectionHeader
            subtitle={t('home.servicesGrid.subtitle')}
            title={t('home.servicesGrid.title')}
            description={t('home.servicesGrid.description')}
            showSparkle
          />

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <GlassCard
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group relative p-6 flex flex-col h-full transition-all duration-500 hover:border-primary/40 ${
                  highlightedServices.includes(service.id) ? 'ring-2 ring-primary/60 shadow-[0_0_50px_hsl(43_100%_50%/0.25)]' : ''
                } ${service.id === featuredServiceId ? 'ring-1 ring-primary/40' : ''}`}
              >
                {/* Featured Badge */}
                {service.id === featuredServiceId && (
                  <motion.div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
                    animate={{
                      boxShadow: [
                        '0 0 10px hsl(43 100% 50% / 0.3)',
                        '0 0 20px hsl(43 100% 50% / 0.5)',
                        '0 0 10px hsl(43 100% 50% / 0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ borderRadius: '9999px' }}
                  >
                    <Badge className="bg-primary/90 text-primary-foreground gap-1.5 px-3 py-1">
                      <Award className="w-3.5 h-3.5" />
                      {t('home.servicesGrid.featured')}
                    </Badge>
                  </motion.div>
                )}

                {/* Hover glow - gold only */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  whileHover={{
                    boxShadow: '0 0 30px hsl(43 100% 50% / 0.15)',
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative w-14 h-14 rounded-xl glass-card flex items-center justify-center mb-4 border border-primary/20"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <service.icon className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Title */}
                <h3 className="relative text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {t(service.titleKey)}
                </h3>

                {/* Description */}
                <p className="relative text-muted-foreground text-sm mb-4 flex-grow">
                  {t(service.descKey)}
                </p>

                {/* Price */}
                <div className="relative mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{getPriceDisplay(service)}</span>
                    {getPricingSuffix(service) && (
                      <span className="text-xs text-muted-foreground">{getPricingSuffix(service)}</span>
                    )}
                  </div>
                </div>

                {/* Deliverables Preview */}
                <div className="relative mb-6 space-y-2">
                  {service.deliverables.slice(0, 3).map((deliverable, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{t(deliverable)}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="relative space-y-3 mt-auto">
                  <Button
                    className="w-full glass-button hover:border-primary/50 hover:shadow-[0_0_20px_hsl(43_100%_50%/0.2)]"
                    variant="outline"
                    onClick={() => handleOpenModal(service, 'overview')}
                  >
                    {t('home.servicesGrid.viewDetails')}
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-button text-xs hover:border-primary/50 hover:shadow-[0_0_15px_hsl(43_100%_50%/0.15)]"
                      onClick={() => handleOpenModal(service, 'video')}
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span className={isRTL ? 'mr-1' : 'ml-1'}>{t('home.servicesGrid.watchVideo')}</span>
                    </Button>
                    
                    {service.hasCalculator ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-button text-xs hover:border-primary/50 hover:shadow-[0_0_15px_hsl(43_100%_50%/0.15)]"
                        onClick={() => handleOpenModal(service, 'calculator')}
                      >
                        <Calculator className="w-3 h-3" />
                        <span className={isRTL ? 'mr-1' : 'ml-1'}>{t('home.servicesGrid.buildPlan')}</span>
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        className="glass-button text-xs hover:border-primary/50 hover:shadow-[0_0_15px_hsl(43_100%_50%/0.15)]"
                        onClick={() => handleOpenModal(service, 'pricing')}
                      >
                        {t('home.servicesGrid.seePricing')}
                      </Button>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* View all services CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 hover:bg-primary/10 hover:border-primary/60"
            >
              <Link to="/services">
                {t('common.viewAll')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>

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

      {/* Service Modal */}
      {selectedService && (
        <HomeServiceModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedService(null);
          }}
          service={selectedService}
          initialTab={activeTab}
        />
      )}
    </>
  );
});

HomeServicesGrid.displayName = 'HomeServicesGrid';

export default HomeServicesGrid;
