import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, TrendingUp, Users, Globe } from 'lucide-react';

const METRICS = [
  { key: 'clients',  icon: Users,      value: '200+' },
  { key: 'countries', icon: Globe,      value: '10' },
  { key: 'growth',   icon: TrendingUp, value: '3×' },
  { key: 'rating',   icon: Star,       value: '4.9' },
] as const;

const HeroSocialProof = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="relative py-8 md:py-10 bg-card/50 border-y border-border/30 overflow-hidden">
      {/* Subtle gold glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/[0.03] to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Metrics row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8">
          {METRICS.map(({ key, icon: Icon, value }) => (
            <div key={key} className="flex flex-col items-center gap-1.5 animate-fade-up">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
                <span className="text-2xl md:text-3xl font-bold gold-gradient-text">{value}</span>
              </div>
              <span className="text-xs md:text-sm text-muted-foreground font-medium text-center">
                {t(`home.socialProof.metrics.${key}`)}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-6 md:mb-8" />

        {/* Mini testimonial */}
        <blockquote className="animate-fade-up max-w-2xl mx-auto text-center">
          <p className="text-sm md:text-base text-foreground/80 italic leading-relaxed mb-3">
            "{t('home.socialProof.testimonial.quote')}"
          </p>
          <footer className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              — {t('home.socialProof.testimonial.author')}
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
});

HeroSocialProof.displayName = 'HeroSocialProof';
export default HeroSocialProof;
