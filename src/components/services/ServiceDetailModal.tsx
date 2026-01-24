import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Clock, ArrowRight, Check, Package, CreditCard, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ServiceData } from './ServiceCard';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceData;
}

const ServiceDetailModal = ({
  isOpen,
  onClose,
  service,
}: ServiceDetailModalProps) => {
  const { t, i18n } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isYouTube, setIsYouTube] = useState(false);
  const [isVimeo, setIsVimeo] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // Detect video type and prepare embed URL
  useEffect(() => {
    if (!service.videoUrl) return;

    if (service.videoUrl.includes('youtube.com') || service.videoUrl.includes('youtu.be')) {
      setIsYouTube(true);
      setIsVimeo(false);
      const videoId = service.videoUrl.includes('youtu.be')
        ? service.videoUrl.split('/').pop()
        : new URLSearchParams(new URL(service.videoUrl).search).get('v');
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
    } else if (service.videoUrl.includes('vimeo.com')) {
      setIsVimeo(true);
      setIsYouTube(false);
      const videoId = service.videoUrl.split('/').pop();
      setEmbedUrl(`https://player.vimeo.com/video/${videoId}?autoplay=1`);
    } else {
      setIsYouTube(false);
      setIsVimeo(false);
      setEmbedUrl('');
    }
  }, [service.videoUrl]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setVideoLoaded(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Load video only when modal opens
  useEffect(() => {
    if (isOpen && service.videoUrl && !isYouTube && !isVimeo) {
      setVideoLoaded(true);
    }
  }, [isOpen, service.videoUrl, isYouTube, isVimeo]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
      },
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial="hidden"
          animate="visible"
          exit="hidden"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-primary/20 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--background) / 0.95), hsl(var(--background) / 0.9))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px hsl(var(--primary) / 0.15), inset 0 0 60px hsl(var(--primary) / 0.05)',
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t('services.modal.close')}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold gold-gradient-text">
                      {t(service.titleKey)}
                    </h2>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {t(service.descriptionKey)}
                </p>
              </div>

              {/* Tabbed Content */}
              <Tabs defaultValue="deliverables" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/30">
                  <TabsTrigger value="deliverables" className="gap-2 data-[state=active]:bg-primary/20">
                    <Package className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('services.modal.whatYouGet')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="pricing" className="gap-2 data-[state=active]:bg-primary/20">
                    <CreditCard className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('services.modal.pricingLogic')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="video" className="gap-2 data-[state=active]:bg-primary/20">
                    <Play className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('services.modal.watchVideo')}</span>
                  </TabsTrigger>
                </TabsList>

                {/* Section 1: What You Get */}
                <TabsContent value="deliverables" className="mt-0">
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      {t('services.modal.whatYouGet')}
                    </h3>
                    
                    {/* Deliverables List */}
                    <div className="space-y-3 mb-6">
                      {service.features.map((featureKey, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-foreground">{t(featureKey)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Packages Section (if applicable) */}
                    {service.packages && service.packages.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-primary/10">
                        <h4 className="text-md font-semibold mb-4">{t('services.modal.availablePackages')}</h4>
                        <div className="grid gap-4 md:grid-cols-3">
                          {service.packages.map((pkg) => (
                            <div key={pkg.id} className="glass-card p-4 rounded-lg border border-primary/10">
                              <h5 className="font-semibold text-primary mb-2">
                                {t(`services.packages.${pkg.id}`)}
                              </h5>
                              <ul className="space-y-1.5">
                                {pkg.features.map((feature, idx) => (
                                  <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                    <Check className="w-3 h-3 text-primary flex-shrink-0 mt-1" />
                                    {t(feature)}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-4 italic">
                          {t('services.modal.packagesNote')}
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Section 2: How Pricing Works */}
                <TabsContent value="pricing" className="mt-0">
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      {t('services.modal.pricingLogic')}
                    </h3>

                    {/* Price Display */}
                    <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{t('services.modal.indicativePrice')}</span>
                        <span className="text-2xl font-bold text-primary">
                          {service.priceMin && service.priceMax
                            ? `€${service.priceMin.toLocaleString()} - €${service.priceMax.toLocaleString()}`
                            : service.priceMin
                            ? `${t('services.startingFrom')} €${service.priceMin.toLocaleString()}`
                            : t('services.customQuote')
                          }
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {service.pricingType === 'monthly' ? t('services.perMonth') : 
                         service.pricingType === 'one_time' ? t('services.oneTimePayment') : ''}
                      </p>
                    </div>

                    {/* Pricing Factors */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-foreground">{t('services.modal.pricingFactors')}</h4>
                      
                      <div className="space-y-3">
                        {['quantity', 'complexity', 'onsite', 'customization'].map((factor) => (
                          <div key={factor} className="flex items-start gap-3 p-3 rounded-lg bg-muted/20">
                            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-medium text-foreground">
                                {t(`services.modal.factors.${factor}.title`)}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {t(`services.modal.factors.${factor}.description`)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Custom Pricing Note */}
                    <div className="mt-6 p-4 rounded-lg border border-primary/20 bg-primary/5">
                      <p className="text-sm text-muted-foreground">
                        {t('services.modal.pricingNote')}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* Section 3: Explainer Video */}
                <TabsContent value="video" className="mt-0">
                  <div className="glass-card p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Play className="w-5 h-5 text-primary" />
                      {t('services.modal.explainerVideo')}
                    </h3>

                    {/* Video Section */}
                    <div className="relative aspect-video bg-black/50 rounded-xl overflow-hidden mb-4">
                      {service.videoUrl ? (
                        <>
                          {(isYouTube || isVimeo) ? (
                            <iframe
                              src={embedUrl}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={t(service.titleKey)}
                            />
                          ) : videoLoaded ? (
                            <video
                              ref={videoRef}
                              src={service.videoUrl}
                              controls
                              autoPlay
                              className="w-full h-full object-cover"
                              preload="none"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-16 h-16 rounded-full glass-card flex items-center justify-center"
                              >
                                <Play className="w-8 h-8 text-primary fill-primary" />
                              </motion.div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <div className="text-center">
                            <Play className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                            <p className="text-muted-foreground">{t('services.modal.noVideo')}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Video Duration Info */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{t('services.modal.videoDuration')}</span>
                    </div>

                    {/* Video Summary */}
                    <p className="text-muted-foreground mb-6 border-l-2 border-primary/30 pl-4">
                      {t('services.modal.videoSummary')}
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild size="lg" className="luxury-button flex-1">
                  <Link to={`/contact?service=${service.id}`}>
                    {t('services.modal.cta')}
                    <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onClose}
                  className="glass-button flex-1"
                >
                  {t('services.modal.close')}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceDetailModal;
