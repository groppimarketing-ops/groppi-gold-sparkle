import { useState } from 'react';
import { motion } from 'framer-motion';
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

  // All goal cards use gold-only gradients - no colored variants
  const goals = [
    {
      id: 'visibility' as const,
      icon: Eye,
      titleKey: 'services.goalEntry.visibility.title',
      descriptionKey: 'services.goalEntry.visibility.description',
      ctaKey: 'services.goalEntry.visibility.cta',
      services: ['social-media', 'content-production'],
    },
    {
      id: 'leads' as const,
      icon: Users,
      titleKey: 'services.goalEntry.leads.title',
      descriptionKey: 'services.goalEntry.leads.description',
      ctaKey: 'services.goalEntry.leads.cta',
      services: ['ads-management', 'seo'],
    },
    {
      id: 'sales' as const,
      icon: ShoppingCart,
      titleKey: 'services.goalEntry.sales.title',
      descriptionKey: 'services.goalEntry.sales.description',
      ctaKey: 'services.goalEntry.sales.cta',
      services: ['ecommerce-website', 'ads-management'],
    },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.08),transparent_70%)]" />
      
      {/* Decorative gold line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">{t('services.goalEntry.badge')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gold-shimmer-text"
          >
            {t('services.goalEntry.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto"
          >
            {t('services.goalEntry.subtitle')}
          </motion.p>
        </motion.div>

        {/* Goal Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {goals.map((goal, index) => {
            const Icon = goal.icon;
            const isHovered = hoveredGoal === goal.id;
            
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              >
                <GlassCard
                  className={`relative p-8 cursor-pointer group h-full transition-all duration-500 ${
                    isHovered ? 'ring-2 ring-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)]' : ''
                  }`}
                  onMouseEnter={() => setHoveredGoal(goal.id)}
                  onMouseLeave={() => setHoveredGoal(null)}
                  onClick={() => onGoalSelect(goal.id)}
                  whileHover={{ y: -8 }}
                >
                  {/* Gold Gradient Background on hover - no colored gradients */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" 
                  />

                  {/* Icon */}
                  <motion.div
                    className="relative w-16 h-16 rounded-xl glass-card flex items-center justify-center mb-6"
                    animate={isHovered ? { rotate: 5, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: isHovered ? '0 0 30px hsl(var(--primary) / 0.3)' : 'none',
                    }}
                  >
                    <Icon className="w-8 h-8 text-primary" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="relative text-xl md:text-2xl font-bold mb-3 group-hover:gold-gradient-text transition-all duration-300">
                    {t(goal.titleKey)}
                  </h3>

                  <p className="relative text-muted-foreground mb-6 leading-relaxed">
                    {t(goal.descriptionKey)}
                  </p>

                  {/* CTA */}
                  <motion.div
                    className="relative flex items-center gap-2 text-primary font-medium"
                    animate={isHovered ? { x: isRTL ? -5 : 5 } : { x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>{t(goal.ctaKey)}</span>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </motion.div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        {/* Browse all hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          {t('services.goalEntry.browseHint')}
        </motion.p>
      </div>

      {/* Bottom decorative line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
      />
    </section>
  );
};

export default GoalBasedEntry;
