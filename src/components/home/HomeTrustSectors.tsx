import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import {
  UtensilsCrossed,
  Sofa,
  Store,
  ShoppingCart,
  Building2,
  Sparkles,
  Wrench,
  Rocket,
  Check,
  Stethoscope,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import LangLink from '@/components/LangLink';

const sectorIcons = {
  restaurant: UtensilsCrossed,
  interior: Sofa,
  retail: Store,
  ecommerce: ShoppingCart,
  realEstate: Building2,
  health: Sparkles,
  services: Wrench,
  sme: Rocket,
  medical: Stethoscope,
  education: GraduationCap,
};

const HomeTrustSectors = memo(() => {
  const { t } = useTranslation();

  const sectors = [
    { key: 'restaurant',  icon: sectorIcons.restaurant  },
    { key: 'interior',    icon: sectorIcons.interior    },
    { key: 'retail',      icon: sectorIcons.retail      },
    { key: 'ecommerce',   icon: sectorIcons.ecommerce   },
    { key: 'realEstate',  icon: sectorIcons.realEstate  },
    { key: 'health',      icon: sectorIcons.health      },
    { key: 'services',    icon: sectorIcons.services    },
    { key: 'sme',         icon: sectorIcons.sme         },
    { key: 'medical',     icon: sectorIcons.medical     },
    { key: 'education',   icon: sectorIcons.education   },
  ];

  const stats = [
    { value: '10+',                                         labelKey: 'home.trustSectors.stats.experience' },
    { value: t('home.trustSectors.statsValues.focus'),      labelKey: 'home.trustSectors.stats.focus'      },
    { value: t('home.trustSectors.statsValues.system'),     labelKey: 'home.trustSectors.stats.system'     },
    { value: t('home.trustSectors.statsValues.premium'),    labelKey: 'home.trustSectors.stats.premium'    },
  ];

  const proofPoints = [
    t('home.trustSectors.proofPoints.experience'),
    t('home.trustSectors.proofPoints.pricing'),
    t('home.trustSectors.proofPoints.system'),
    t('home.trustSectors.proofPoints.leads'),
  ];

  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Top Section - Headline & Stats */}
        <div className="text-center mb-16">
          <span className="animate-fade-up inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
            {t('home.trustSectors.eyebrow')}
          </span>

          <h2
            className="animate-fade-up text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            <span className="gold-gradient-text">{t('home.trustSectors.headline')}</span>
          </h2>

          <p
            className="animate-fade-up text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {t('home.trustSectors.subheadline')}
          </p>
        </div>

        {/* Numbers Proof Strip — CSS stagger */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.labelKey}
              className={`animate-fade-up-${index + 1} group glass-card p-6 text-center hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--gold)/0.2),0_0_80px_hsl(var(--gold)/0.08)] hover:-translate-y-1 transition-all duration-500`}
            >
              <p className="text-2xl md:text-3xl font-bold text-primary mb-2 gold-text-glow">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>

        {/* Micro Note */}
        <p className="animate-fade-up text-center text-xs text-muted-foreground/80 italic mb-16">
          {t('home.trustSectors.microNote')}
        </p>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left Column - Proof Points */}
          <div className="animate-fade-up space-y-8" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
            <ul className="space-y-4">
              {proofPoints.map((point, index) => (
                <li key={index} className={`animate-fade-up-${index + 1} flex items-center gap-3`}>
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground/80 italic">
              {t('home.trustSectors.note')}
            </p>

            <Button asChild className="luxury-button text-primary-foreground px-8 py-6 text-base rounded-xl">
              <LangLink to="/services">{t('home.trustSectors.cta')}</LangLink>
            </Button>
          </div>

          {/* Right Column - Sector Cards Grid */}
          <div className="animate-fade-up grid grid-cols-2 gap-4">
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              const stagger = Math.min(index + 1, 10);
              return (
                <div
                  key={sector.key}
                  className={`animate-fade-up-${stagger} group glass-card p-5 hover:border-primary/50 hover:shadow-[0_0_35px_hsl(var(--gold)/0.18),0_0_70px_hsl(var(--gold)/0.06)] hover:-translate-y-1 transition-all duration-500 cursor-pointer`}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsl(var(--gold)/0.25)] transition-all duration-300">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {t(`home.trustSectors.sectors.${sector.key}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`home.trustSectors.sectors.${sector.key}.subtitle`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

HomeTrustSectors.displayName = 'HomeTrustSectors';

export default HomeTrustSectors;
