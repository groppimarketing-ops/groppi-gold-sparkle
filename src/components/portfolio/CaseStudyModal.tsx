import { useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MessageCircle, Check, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MediaCarousel from './MediaCarousel';
import type { PortfolioItem } from '@/types/portfolio';
import { industryLabels, serviceTagLabels, deliverableLabels } from '@/types/portfolio';

interface CaseStudyModalProps {
  item: PortfolioItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaseStudyModal = memo(({ item, isOpen, onClose }: CaseStudyModalProps) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith('nl') ? 'nl' : 'en';

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  const handleWhatsAppClick = useCallback(() => {
    const message = encodeURIComponent(
      `Hallo GROPPI, ik heb jullie portfolio bekeken en ben geïnteresseerd in een gesprek.`
    );
    window.open(`https://wa.me/32470123456?text=${message}`, '_blank');
  }, []);

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
          style={{ background: 'hsl(0 0% 4% / 0.95)', backdropFilter: 'blur(20px)' }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full glass-card flex items-center justify-center hover:border-primary/60 transition-colors z-50"
            onClick={onClose}
            aria-label="Sluiten"
          >
            <X className="h-5 w-5 text-primary" />
          </motion.button>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card border border-primary/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media Carousel */}
            <div className="relative">
              <MediaCarousel 
                media={[item.coverMedia, ...item.galleryMedia]} 
                clientName={item.clientName}
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className="border-primary/40 text-primary bg-primary/10"
                  >
                    {industryLabels[item.industry][lang]}
                  </Badge>
                  {item.services.map((service) => (
                    <Badge 
                      key={service}
                      variant="outline" 
                      className="border-primary/30 text-primary/80"
                    >
                      {serviceTagLabels[service][lang]}
                    </Badge>
                  ))}
                </div>
                
                <h2 
                  id="case-study-title"
                  className="text-2xl md:text-3xl font-bold text-foreground"
                >
                  {item.clientName}
                </h2>
                
                <p className="text-primary font-semibold text-xl">
                  {item.shortResultLine}
                </p>
              </div>

              {/* Challenge Section */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t('portfolio.modal.challenge', 'Uitdaging')}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {item.popupContent.challenge}
                </p>
              </div>

              {/* Approach Section - Bullet Points */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t('portfolio.modal.approach', 'Aanpak')}
                </h3>
                <ul className="space-y-2">
                  {item.popupContent.approachPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results Section - Bullet Points */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t('portfolio.modal.results', 'Resultaten')}
                </h3>
                <ul className="space-y-2">
                  {item.popupContent.resultPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="leading-relaxed font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
                {item.popupContent.resultDisclaimer && (
                  <div className="flex items-start gap-2 mt-3 p-3 rounded-lg bg-muted/30 border border-border/50">
                    <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-muted-foreground italic">
                      {item.popupContent.resultDisclaimer}
                    </p>
                  </div>
                )}
              </div>

              {/* Deliverables Section - Chips */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  {t('portfolio.modal.deliverables', 'Wat we geleverd hebben')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.popupContent.deliverables.map((deliverable) => {
                    const label = deliverableLabels[deliverable]?.[lang] || deliverable;
                    return (
                      <Badge 
                        key={deliverable}
                        className="bg-primary/10 text-primary border-primary/30 hover:bg-primary/20"
                      >
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border/50">
                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-[0_8px_30px_hsl(var(--gold)/0.35)] hover:-translate-y-0.5 transition-all"
                  onClick={() => window.location.href = '/contact'}
                >
                  {t('portfolio.modal.ctaPrimary', 'Vraag een offerte aan')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('portfolio.modal.ctaWhatsApp', 'Chat via WhatsApp')}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

CaseStudyModal.displayName = 'CaseStudyModal';

export default CaseStudyModal;
