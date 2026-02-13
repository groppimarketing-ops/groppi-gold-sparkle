import { memo, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, MessageCircle, ArrowRight, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import LangLink from '@/components/LangLink';
import { Button } from '@/components/ui/button';
import { trackEvent, socialLinks } from '@/utils/tracking';
import { getVideoIdBySlug, buildDrivePreviewUrl } from '@/data/serviceVideos';

const CALENDLY_URL = socialLinks.calendly;

interface ServicePageHeroProps {
  serviceKey: string;
  posterImage?: string;
}

const ServicePageHero = memo(({ serviceKey, posterImage }: ServicePageHeroProps) => {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const [showVideoGlow, setShowVideoGlow] = useState(false);

  // Derive slug from serviceKey (e.g., 'contentProduction' -> 'content-production')
  const slug = serviceKey.replace(/([A-Z])/g, '-$1').toLowerCase();
  const gdriveId = getVideoIdBySlug(slug);

  // Handle #video hash: scroll to video section + gold glow
  useEffect(() => {
    if (location.hash === '#video' && videoSectionRef.current) {
      // Small delay to ensure layout is ready
      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setShowVideoGlow(true);
        setTimeout(() => setShowVideoGlow(false), 1500);
      }, 300);
    }
  }, [location.hash]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const benefits = [
    t(`servicePage.${serviceKey}.benefits.1`),
    t(`servicePage.${serviceKey}.benefits.2`),
    t(`servicePage.${serviceKey}.benefits.3`),
  ];

  // WhatsApp message
  const serviceName = t(`servicePage.${serviceKey}.title`);
  const whatsappMessage = encodeURIComponent(
    t('servicePage.whatsapp.template', { service: serviceName })
  );
  const whatsappUrl = `https://wa.me/32470123456?text=${whatsappMessage}`;

  return (
    <section className="relative py-16 lg:py-24 bg-background overflow-hidden">
      {/* Subtle gold gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT COLUMN */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Service Name */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gold-gradient-text leading-tight">
              {t(`servicePage.${serviceKey}.title`)}
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground max-w-lg">
              {t(`servicePage.${serviceKey}.subtitle`)}
            </p>

            {/* 3 Bullet Benefits */}
            <ul className="space-y-3 py-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button asChild size="lg" className="luxury-button group">
                <LangLink to="/contact">
                  {t('servicePage.cta.requestQuote')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </LangLink>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="glass-button border-primary/30 hover:border-primary/50 group"
              >
                <a 
                  href={CALENDLY_URL} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ event: 'calendly_click', location: 'services_hero' })}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('servicePage.cta.planCall')}
                </a>
              </Button>
            </div>

            {/* Trust Note */}
            <p className="text-sm text-muted-foreground pt-2">
              {t('servicePage.trustNote')}
            </p>
          </motion.div>

          {/* RIGHT COLUMN - Video */}
          <motion.div
            ref={videoSectionRef}
            id="video"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`relative aspect-video rounded-2xl overflow-hidden glass-card transition-shadow duration-500 ${
              showVideoGlow ? 'shadow-[0_0_40px_hsl(var(--primary)/0.5),0_0_80px_hsl(var(--primary)/0.2)]' : ''
            }`}
            style={{
              outline: showVideoGlow ? '2px solid hsl(var(--primary) / 0.6)' : 'none',
              outlineOffset: '2px',
            }}
          >
            {gdriveId ? (
              <iframe
                src={buildDrivePreviewUrl(gdriveId)}
                className="w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                loading="lazy"
                title={t(`servicePage.${serviceKey}.title`)}
                style={{ border: 'none' }}
              />
            ) : posterImage ? (
              <img
                src={posterImage}
                alt={t(`servicePage.${serviceKey}.title`)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-primary">▶</span>
                  </div>
                  <p className="text-muted-foreground">{t('servicePage.videoPlaceholder')}</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ServicePageHero.displayName = 'ServicePageHero';

export default ServicePageHero;
