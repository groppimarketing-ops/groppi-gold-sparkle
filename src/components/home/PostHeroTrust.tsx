import { useTranslation } from 'react-i18next';
import { memo } from 'react';

const PostHeroTrust = memo(() => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  return (
    <section
      className="relative py-10 md:py-12 bg-background overflow-hidden"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="animate-fade-up max-w-3xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold gold-gradient-text mb-3 heading-balanced">
            {t('home.postHeroTrust.title')}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('home.postHeroTrust.subtitle')}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </section>
  );
});

PostHeroTrust.displayName = 'PostHeroTrust';
export default PostHeroTrust;
