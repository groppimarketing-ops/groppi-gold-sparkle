import { useState } from 'react';
import { Eye, Users, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GlassCard from '@/components/ui/GlassCard';

interface GoalBasedEntryProps {
  onGoalSelect: (goal: 'visibility' | 'leads' | 'sales') => void;
}

const GoalBasedEntry = ({ onGoalSelect }: GoalBasedEntryProps) => {
  const { t, i18n } = useTranslation();
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  const goals = [
    {
      id: 'visibility' as const,
      icon: Eye,
      titleKey: 'services.goalEntry.visibility.title',
      descriptionKey: 'services.goalEntry.visibility.description',
      ctaKey: 'services.goalEntry.visibility.cta',
    },
    {
      id: 'leads' as const,
      icon: Users,
      titleKey: 'services.goalEntry.leads.title',
      descriptionKey: 'services.goalEntry.leads.description',
      ctaKey: 'services.goalEntry.leads.cta',
    },
    {
      id: 'sales' as const,
      icon: ShoppingCart,
      titleKey: 'services.goalEntry.sales.title',
      descriptionKey: 'services.goalEntry.sales.description',
      ctaKey: 'services.goalEntry.sales.cta',
    },
  ];

  return (
    <section className="relative py-10 md:py-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />

      {/* Decorative gold line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-fade-up" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{t('services.goalEntry.badge')}</span>
          </div>

          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 gold-shimmer-text">
            {t('services.goalEntry.title')}
          </h2>

          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto">
            {t('services.goalEntry.subtitle')}
          </p>
        </div>

        {/* Goal Cards */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            const isHovered = hoveredGoal === goal.id;

            return (
              <div
                key={goal.id}
                className={`animate-fade-up-${index + 1}`}
              >
                <GlassCard
                  className={`relative p-6 md:p-8 cursor-pointer group h-full transition-all duration-500 ${
                    isHovered ? 'ring-2 ring-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)] -translate-y-2' : ''
                  }`}
                  onMouseEnter={() => setHoveredGoal(goal.id)}
                  onMouseLeave={() => setHoveredGoal(null)}
                  onClick={() => onGoalSelect(goal.id)}
                >
                  {/* Gold Gradient Background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Icon */}
                  <div
                    className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl glass-card flex items-center justify-center mb-4 md:mb-6 transition-all duration-300 ${
                      isHovered ? 'scale-110 rotate-3' : ''
                    }`}
                    style={{ boxShadow: isHovered ? '0 0 30px hsl(var(--primary) / 0.3)' : 'none' }}
                  >
                    <Icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="relative text-lg md:text-2xl font-bold mb-2 md:mb-3 group-hover:gold-gradient-text transition-all duration-300">
                    {t(goal.titleKey)}
                  </h3>

                  <p className="relative text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                    {t(goal.descriptionKey)}
                  </p>

                  {/* CTA */}
                  <div className={`relative flex items-center gap-2 text-primary font-medium transition-transform duration-200 ${isHovered ? (isRTL ? '-translate-x-1' : 'translate-x-1') : ''}`}>
                    <span className="text-sm md:text-base">{t(goal.ctaKey)}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </div>
                </GlassCard>
              </div>
            );
          })}
        </div>

        {/* Browse all hint */}
        <p className="text-center text-sm text-muted-foreground mt-8 md:mt-10 animate-fade-up">
          {t('services.goalEntry.browseHint')}
        </p>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default GoalBasedEntry;
