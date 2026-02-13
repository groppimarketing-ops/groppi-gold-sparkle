import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Play, Calculator, ArrowRight, Info, Package, DollarSign, Video, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LangLink from '@/components/LangLink';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { HomeServiceData } from './HomeServicesGrid';
import { socialLinks, trackEvent } from '@/utils/tracking';
import { getPriceDisplayString, getPriceSuffix } from '@/config/pricingConfig';

interface HomeServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: HomeServiceData;
  initialTab?: 'overview' | 'deliverables' | 'pricing' | 'video' | 'calculator';
}

const HomeServiceModal = ({ isOpen, onClose, service, initialTab = 'overview' }: HomeServiceModalProps) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState(initialTab);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, service.id]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleWhatsAppClick = () => {
    trackEvent({ event: 'whatsapp_click', location: 'home_service_modal', label: service.id });
    window.open(socialLinks.whatsapp, '_blank');
  };

  // Use centralized pricing config
  const priceDisplay = getPriceDisplayString(service.pricingConfig, t);
  const priceSuffix = getPriceSuffix(service.pricingConfig, t);

  const tabs = [
    { id: 'overview', icon: Info, label: t('home.serviceModal.tabs.overview') },
    { id: 'deliverables', icon: Package, label: t('home.serviceModal.tabs.deliverables') },
    { id: 'pricing', icon: DollarSign, label: t('home.serviceModal.tabs.pricing') },
    { id: 'video', icon: Video, label: t('home.serviceModal.tabs.video') },
    ...(service.pricingConfig.hasCalculator ? [{ id: 'calculator', icon: Calculator, label: t('home.serviceModal.tabs.calculator') }] : []),
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-primary/20"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--background) / 0.98), hsl(var(--background) / 0.95))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 60px hsl(var(--primary) / 0.2)',
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Header */}
            <div className="p-6 border-b border-primary/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl glass-card flex items-center justify-center border border-primary/30">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold gold-gradient-text">
                    {t(service.titleKey)}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">{t(service.descKey)}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="flex flex-col h-[calc(90vh-200px)]">
              <TabsList className="flex justify-start gap-1 p-2 mx-6 mt-4 bg-background/50 rounded-lg overflow-x-auto flex-shrink-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-sm whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex-1 overflow-y-auto p-6">
                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-0 space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-lg">{t('home.serviceModal.overview.about')}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t(`home.serviceModal.overview.${service.id.replace(/-/g, '_')}`)}
                      </p>
                    </div>
                    <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                      <h3 className="font-bold text-lg mb-4">{t('home.serviceModal.overview.priceRange')}</h3>
                      <div className="text-3xl font-bold text-primary mb-2">{priceDisplay}</div>
                      {priceSuffix && (
                        <p className="text-sm text-muted-foreground">{priceSuffix}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">{t('pricing.vatExcluded')}</p>
                    </div>
                  </div>
                </TabsContent>

                {/* Deliverables Tab */}
                <TabsContent value="deliverables" className="mt-0 space-y-6">
                  <h3 className="font-bold text-lg">{t('home.serviceModal.deliverables.title')}</h3>
                  <div className="grid gap-4">
                    {service.deliverables.map((deliverable, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-foreground">{t(deliverable)}</span>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>

                {/* Pricing Tab */}
                <TabsContent value="pricing" className="mt-0 space-y-6">
                  <h3 className="font-bold text-lg">{t('home.serviceModal.pricing.title')}</h3>
                  <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-primary mb-2">{priceDisplay}</div>
                      {priceSuffix && (
                        <p className="text-muted-foreground">{priceSuffix}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-2">{t('pricing.vatExcluded')}</p>
                    </div>
                    <p className="text-muted-foreground text-center">
                      {t('home.serviceModal.pricing.note')}
                    </p>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">{t('home.serviceModal.pricing.factors')}</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t('home.serviceModal.pricing.factor1')}
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t('home.serviceModal.pricing.factor2')}
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t('home.serviceModal.pricing.factor3')}
                      </li>
                    </ul>
                  </div>
                </TabsContent>

                {/* Video Tab */}
                <TabsContent value="video" className="mt-0 space-y-6">
                  <div className="aspect-video bg-black/50 rounded-xl overflow-hidden flex items-center justify-center">
                    {service.videoUrl ? (
                      <video
                        ref={videoRef}
                        src={service.videoUrl}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <motion.div
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-4"
                          style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.3)' }}
                        >
                          <Play className="w-10 h-10 text-primary/50" />
                        </motion.div>
                        <p className="text-muted-foreground">{t('home.serviceModal.video.comingSoon')}</p>
                        <p className="text-sm text-muted-foreground/70 mt-2">{t('home.serviceModal.video.uploadNote')}</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Calculator Tab */}
                {service.pricingConfig.hasCalculator && (
                  <TabsContent value="calculator" className="mt-0 space-y-6">
                    <div className="text-center p-8 rounded-xl bg-primary/5 border border-primary/10">
                      <Calculator className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-bold text-xl mb-2">{t('home.serviceModal.calculator.title')}</h3>
                      <p className="text-muted-foreground mb-6">{t('home.serviceModal.calculator.desc')}</p>
                      <Button asChild className="luxury-button">
                        <LangLink to={`/services/${service.id}`}>
                          {t('home.serviceModal.calculator.cta')}
                          <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                        </LangLink>
                      </Button>
                    </div>
                  </TabsContent>
                )}
              </div>
            </Tabs>

            {/* Footer CTAs */}
            <div className="p-6 border-t border-primary/10 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="luxury-button flex-1 hover:shadow-[0_0_20px_hsl(43_100%_50%/0.3)]">
                <LangLink to="/contact">
                  {t('home.serviceModal.cta.quote')}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </LangLink>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass-button flex-1 hover:border-primary/50 hover:shadow-[0_0_20px_hsl(43_100%_50%/0.2)]"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5" />
                <span className={isRTL ? 'mr-2' : 'ml-2'}>{t('home.serviceModal.cta.whatsapp')}</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomeServiceModal;
