import { useTranslation } from 'react-i18next';
import { Award, Cog, TrendingUp, CheckCircle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';

const PartnerClarity = () => {
  const { t } = useTranslation();

  const cards = [
    { icon: Award, key: 'brand' },
    { icon: Cog, key: 'delivery' },
    { icon: TrendingUp, key: 'growth' },
  ];

  return (
    <section className="py-20 relative overflow-hidden" dir="ltr">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
        <SectionHeader
          subtitle={t('partner.clarity.subtitle')}
          title={t('partner.clarity.title')}
          centered
        />
        
        <p
          className="animate-fade-up text-center text-muted-foreground max-w-3xl mx-auto mb-12 text-lg leading-relaxed"
          dir="ltr"
          style={{ unicodeBidi: 'isolate' }}
        >
          {t('partner.clarity.body')}
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <GlassCard
              key={card.key}
              className={`group text-center py-8 px-6 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(43_100%_50%/0.15)] transition-all duration-500 animate-fade-up-${index + 1}`}
              hover3D={false}
            >
              <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-6 border border-primary/30 group-hover:border-primary/50 group-hover:scale-105 transition-all duration-200">
                <card.icon className="w-7 h-7 text-primary" />
              </div>
              
              <h3 
                className="font-bold text-xl mb-4 group-hover:text-primary transition-colors"
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
              >
                {t(`partner.clarity.cards.${card.key}.title`)}
              </h3>
              
              <ul className="space-y-3 text-left" dir="ltr">
                {[0, 1].map((bulletIndex) => (
                  <li key={bulletIndex} className="flex items-start gap-2 text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    <span className="text-sm" style={{ unicodeBidi: 'isolate' }}>
                      {t(`partner.clarity.cards.${card.key}.bullets.${bulletIndex}`)}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerClarity;
