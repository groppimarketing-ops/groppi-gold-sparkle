import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Check, ArrowRight, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { ServiceData } from './ServiceCard';
import { SERVICE_PRICING_CONFIG, getPriceDisplayString, getPriceSuffix } from '@/config/pricingConfig';

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

  // Use centralized pricing config for consistent display
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

  // Video modal bullet points
  const bulletPoints = [
    `services.videoModal.bullets.${service.id.replace(/-/g, '_')}.when`,
    `services.videoModal.bullets.${service.id.replace(/-/g, '_')}.problem`,
    `services.videoModal.bullets.${service.id.replace(/-/g, '_')}.result`,
  ];

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
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-primary/20"
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
              aria-label={t('services.modal.close')}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Video Section */}
            <div className="relative aspect-video bg-black/80 rounded-t-2xl overflow-hidden">
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
                        className="w-20 h-20 rounded-full glass-card flex items-center justify-center"
                        style={{ boxShadow: '0 0 40px hsl(var(--primary) / 0.3)' }}
                      >
                        <Play className="w-10 h-10 text-primary fill-primary" />
                      </motion.div>
                    </div>
                  )}
                </>
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

              {/* Video duration badge */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm text-sm text-white/80">
                <Clock className="w-4 h-4" />
                <span>{t('services.videoModal.duration')}</span>
              </div>
            </div>

            {/* Content Below Video */}
            <div className="p-6 md:p-8">
              {/* Service Title */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold gold-gradient-text">
                  {t(service.titleKey)}
                </h2>
              </div>

              {/* Bullet Points */}
              <div className="space-y-4 mb-8">
                {bulletPoints.map((bulletKey, idx) => {
                  const bulletText = t(bulletKey);
                  // Only show if translation exists
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
                      <p className="text-foreground">{bulletText}</p>
                    </motion.div>
                  );
                })}
                
                {/* Fallback bullets if specific ones don't exist */}
                {bulletPoints.every(key => t(key) === key) && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-foreground">{t('services.videoModal.defaultBullets.when')}</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-foreground">{t('services.videoModal.defaultBullets.problem')}</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-foreground">{t('services.videoModal.defaultBullets.result')}</p>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Pricing Section */}
              <div className="mb-8 p-4 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">{pricingConfig?.priceDisplay === 'fixed' ? t('services.modal.indicativePrice') : t('services.startingFrom')}</span>
                  <span className="text-2xl font-bold text-primary">{priceDisplay}</span>
                </div>
                {priceSuffix && (
                  <p className="text-xs text-muted-foreground mt-1 text-right">{priceSuffix}</p>
                )}
                <p className="text-[10px] text-muted-foreground mt-1 text-right">{t('pricing.vatExcluded')}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
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
