import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { memo } from 'react';

const PostHeroTrust = memo(() => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      className="relative py-10 md:py-12 bg-background overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Subtle gold gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Title */}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold gold-gradient-text mb-3 heading-balanced">
            {t('home.postHeroTrust.title')}
          </h2>
          
          {/* Subtitle */}
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('home.postHeroTrust.subtitle')}
          </p>
        </motion.div>
      </div>
      
      {/* Subtle gold gradient line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
});

PostHeroTrust.displayName = 'PostHeroTrust';

export default PostHeroTrust;
