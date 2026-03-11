import { useTranslation } from 'react-i18next';
import { CheckCircle, ArrowRight, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PartnerHero = () => {
  const { t } = useTranslation();

  const bullets = ['bullet1', 'bullet2', 'bullet3'] as const;

  return (
    <section className="relative py-24 md:py-36 overflow-hidden" dir="ltr">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="neural-lines opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
        <div
          className="animate-fade-up max-w-4xl mx-auto text-center"
          style={{ unicodeBidi: 'isolate', direction: 'ltr' }}
        >
          {/* Eyebrow */}
          <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-[0.2em] mb-6">
            <Handshake className="w-4 h-4" />
            <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{t('partner.badge')}</span>
          </span>

          {/* Headline */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold gold-shimmer-text mb-6"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {t('partner.hero.title')}
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {t('partner.hero.subtitle')}
          </p>

          {/* Bullets */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10">
            {bullets.map((key) => (
              <div key={key} className="flex items-center gap-2" dir="ltr">
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground" style={{ unicodeBidi: 'isolate' }}>{t(`partner.hero.${key}`)}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_25px_hsl(43_100%_50%/0.25)] hover:-translate-y-0.5 transition-all duration-300"
              onClick={() => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('partner.hero.ctaPrimary')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              onClick={() => document.getElementById('call')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('partner.hero.ctaSecondary')}
            </Button>
          </div>

          {/* Microcopy */}
          <p
            className="text-sm text-muted-foreground"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {t('partner.hero.microcopy')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnerHero;
