import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Check, ArrowRight, Clock, Maximize, Minimize, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { ServiceData } from './ServiceCard';
import { SERVICE_PRICING_CONFIG, getPriceDisplayString, getPriceSuffix } from '@/config/pricingConfig';
import { getVideoIdBySlug, buildDrivePreviewUrl } from '@/data/serviceVideos';

interface ServiceVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueToDetails: () => void;
  service: ServiceData;
}

const ServiceVideoModal = ({
  isOpen,
  onClose,
  onContinueToDetails,
  service,
}: ServiceVideoModalProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const gdriveId = getVideoIdBySlug(service.id);
  const hasVideo = !!gdriveId;

  // Fullscreen handler
  const handleFullscreen = () => {
    const el = videoContainerRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  };

  // Track fullscreen state
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const pricingConfig = SERVICE_PRICING_CONFIG[service.id];
  const priceDisplay = pricingConfig
    ? getPriceDisplayString(pricingConfig, t)
    : (service.priceMin ? `€${service.priceMin.toLocaleString()}` : t('services.requestQuote'));
  const priceSuffix = pricingConfig ? getPriceSuffix(pricingConfig, t) : '';

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, scale: 1, y: 0,
      transition: { type: 'spring' as const, damping: 25, stiffness: 300 },
    },
    exit: { 
      opacity: 0, scale: 0.95, y: 20,
      transition: { duration: 0.2 },
    },
  };

  const bulletPoints = [
    `services.videoModal.bullets.${service.id.replace(/-/g, '_')}.when`,
    `services.videoModal.bullets.${service.id.replace(/-/g, '_')}.problem`,
    `services.videoModal.bullets.${service.id.replace(/-/g, '_')}.result`,
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Modal — flex column, max-h so it never exceeds viewport */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-[min(960px,92vw)] max-h-[85vh] flex flex-col rounded-2xl border border-primary/20 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--background) / 0.98), hsl(var(--background) / 0.95))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 60px hsl(var(--primary) / 0.2)',
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t('services.modal.close')}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Video Section — aspect-ratio container, flex-shrink-0 so it stays visible */}
            <div
              ref={videoContainerRef}
              className="relative w-full flex-shrink-0"
              style={{
                aspectRatio: '16 / 9',
                maxHeight: '55vh',
                background: 'hsl(var(--background) / 0.6)',
              }}
            >
              {hasVideo && isOpen ? (
                <iframe
                  src={buildDrivePreviewUrl(gdriveId)}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  loading="lazy"
                  title={t(service.titleKey)}
                  style={{ border: 'none', objectFit: 'contain' }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-4"
                      style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.3)' }}
                    >
                      <Play className="w-10 h-10 text-primary/50" />
                    </motion.div>
                    <p className="text-muted-foreground text-lg">{t('services.modal.noVideo')}</p>
                    <p className="text-sm text-muted-foreground/70 mt-2">{t('services.videoModal.comingSoon')}</p>
                  </div>
                </div>
              )}

              {/* Overlay controls */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                {/* Duration badge */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-sm text-white/80">
                  <Clock className="w-4 h-4" />
                  <span>{t('services.videoModal.duration')}</span>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2 pointer-events-auto">
                  {/* Quality selector (disabled for Drive embeds) */}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          disabled
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-sm text-white/50 cursor-not-allowed"
                        >
                          <Settings className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Auto</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-background border border-primary/20 text-foreground">
                        <p className="text-xs">{t('services.videoModal.qualityNote', { defaultValue: 'Quality depends on source' })}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {/* Fullscreen button */}
                  <button
                    onClick={handleFullscreen}
                    className="flex items-center justify-center w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm text-white/80 hover:text-primary hover:bg-black/80 transition-all duration-200"
                    aria-label="Fullscreen"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-4 h-4" />
                    ) : (
                      <Maximize className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Content Below Video — scrollable independently */}
            <div className="flex-1 min-h-0 overflow-y-auto p-5 md:p-6">
              {/* Service Title */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold gold-gradient-text">
                  {t(service.titleKey)}
                </h2>
              </div>

              {/* Bullet Points */}
              <div className="space-y-3 mb-6">
                {bulletPoints.map((bulletKey, idx) => {
                  const bulletText = t(bulletKey);
                  if (bulletText === bulletKey) return null;
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-foreground text-sm">{bulletText}</p>
                    </motion.div>
                  );
                })}
                
                {bulletPoints.every(key => t(key) === key) && (
                  <>
                    {['when', 'problem', 'result'].map((k, idx) => (
                      <motion.div
                        key={k}
                        initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-foreground text-sm">{t(`services.videoModal.defaultBullets.${k}`)}</p>
                      </motion.div>
                    ))}
                  </>
                )}
              </div>

              {/* Pricing Section */}
              <div className="mb-6 p-3 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground text-sm">{pricingConfig?.priceDisplay === 'fixed' ? t('services.modal.indicativePrice') : t('services.startingFrom')}</span>
                  <span className="text-xl font-bold text-primary">{priceDisplay}</span>
                </div>
                {priceSuffix && (
                  <p className="text-xs text-muted-foreground mt-1 text-right">{priceSuffix}</p>
                )}
                <p className="text-[10px] text-muted-foreground mt-1 text-right">{t('pricing.vatExcluded')}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="luxury-button flex-1 group"
                  onClick={onContinueToDetails}
                >
                  {t('services.videoModal.continueToDetails')}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="glass-button flex-1"
                >
                  <Link to={`/contact?service=${service.id}`}>
                    {t('services.modal.cta')}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceVideoModal;
