import { useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MediaCarousel from './MediaCarousel';
import type { PortfolioItem } from '@/types/portfolio';
import { industryLabels, serviceTagLabels } from '@/types/portfolio';

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
            className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card border border-primary/20"
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
            <div className="p-6 md:p-8 space-y-6">
              {/* Header */}
              <div className="space-y-3">
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
                
                <p className="text-primary font-semibold text-lg">
                  {item.shortResultLine}
                </p>
              </div>

              {/* Challenge / Approach / Results */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-card p-4 rounded-xl border-l-2 border-l-primary/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {t('portfolio.modal.challenge', 'Uitdaging')}
                  </p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {item.popupContent.challenge}
                  </p>
                </div>
                
                <div className="glass-card p-4 rounded-xl border-l-2 border-l-primary/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {t('portfolio.modal.approach', 'Onze aanpak')}
                  </p>
                  <p className="text-foreground text-sm leading-relaxed">
                    {item.popupContent.approach}
                  </p>
                </div>
                
                <div className="glass-card p-4 rounded-xl border-l-2 border-l-primary bg-primary/5">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    {t('portfolio.modal.results', 'Resultaat')}
                  </p>
                  <p className="text-primary font-bold text-base">
                    {item.popupContent.results}
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border/50">
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
