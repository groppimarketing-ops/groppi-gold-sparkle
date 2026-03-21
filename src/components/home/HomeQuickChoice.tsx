import { Eye, Users, ShoppingCart, ArrowRight, HelpCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { memo } from 'react';

interface HomeQuickChoiceProps {
  onGoalSelect: (goal: 'visibility' | 'leads' | 'sales') => void;
}

const HomeQuickChoice = memo(({ onGoalSelect }: HomeQuickChoiceProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  const goals = [
    {
      id: 'visibility' as const,
      icon: Eye,
      titleKey: 'home.quickChoice.visibility.title',
      descKey:  'home.quickChoice.visibility.desc',
    },
    {
      id: 'leads' as const,
      icon: Users,
      titleKey: 'home.quickChoice.leads.title',
      descKey:  'home.quickChoice.leads.desc',
    },
    {
      id: 'sales' as const,
      icon: ShoppingCart,
      titleKey: 'home.quickChoice.sales.title',
      descKey:  'home.quickChoice.sales.desc',
    },
  ];

  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header — CSS fade */}
        <div className="animate-fade-up text-center mb-12">
          <div className="inline-flex items-center gap-2 text-primary mb-4">
            <HelpCircle className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">
              {t('home.quickChoice.badge')}
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-gradient-text">
            {t('home.quickChoice.title')}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t('home.quickChoice.subtitle')}
          </p>
        </div>

        {/* Goal Cards — CSS stagger */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            return (
              <div
                key={goal.id}
                role="button"
                tabIndex={0}
                onClick={() => onGoalSelect(goal.id)}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onGoalSelect(goal.id); } }}
                aria-label={`${t(goal.titleKey)}: ${t(goal.descKey)}`}
                className={`animate-fade-up-${index + 1} group relative glass-card p-8 text-center hover:border-primary/50 hover:shadow-[0_0_35px_hsl(var(--gold)/0.18)] cursor-pointer hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl`}
              >
                {/* Hover glow overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

                {/* Icon */}
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-6 border border-primary/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" aria-hidden="true">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors relative">
                  {t(goal.titleKey)}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-6 relative">
                  {t(goal.descKey)}
                </p>

                {/* CTA Button — visual only, parent handles click */}
                <div className="w-full glass-button flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border border-primary/30 group-hover:border-primary/60 group-hover:shadow-[0_0_25px_hsl(var(--gold)/0.22)] transition-all duration-300 pointer-events-none">
                  <span>{t('home.quickChoice.cta')}</span>
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

HomeQuickChoice.displayName = 'HomeQuickChoice';
export default HomeQuickChoice;
