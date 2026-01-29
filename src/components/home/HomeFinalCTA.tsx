import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';
import { socialLinks, trackEvent } from '@/utils/tracking';
import { memo } from 'react';

const HomeFinalCTA = memo(() => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';
  const prefersReducedMotion = useReducedMotion();
  const handleWhatsAppClick = () => {
    trackEvent({ event: 'whatsapp_click', location: 'home_final_cta' });
    window.open(socialLinks.whatsapp, '_blank');
  };

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="max-w-4xl mx-auto text-center p-8 md:p-12 relative overflow-hidden border-primary/30">
            {/* Animated gold shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
            
            {/* Icon */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-8 border border-primary/30"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient-text relative z-10">
              {t('home.finalCTA.title')}
            </h2>
            
            {/* Description */}
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto relative z-10">
              {t('home.finalCTA.description')}
            </p>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button 
                asChild 
                size="lg" 
                className="luxury-button hover:shadow-[0_0_40px_hsl(var(--gold)/0.45)] hover:-translate-y-1 transition-all duration-300 px-10 py-6 rounded-xl text-base font-semibold"
              >
                <Link to="/contact">
                  {t('home.finalCTA.ctaPrimary')}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="glass-button hover:border-primary/60 hover:shadow-[0_0_25px_hsl(var(--gold)/0.25)] hover:-translate-y-1 transition-all duration-300 px-10 py-6 rounded-xl text-base"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-5 h-5" />
                <span className={isRTL ? 'mr-2' : 'ml-2'}>{t('home.finalCTA.ctaWhatsApp')}</span>
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
});

HomeFinalCTA.displayName = 'HomeFinalCTA';

export default HomeFinalCTA;
