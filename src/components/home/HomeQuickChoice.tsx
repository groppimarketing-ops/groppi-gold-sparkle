import { motion, useReducedMotion } from 'framer-motion';
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
  const prefersReducedMotion = useReducedMotion();
  const goals = [
    {
      id: 'visibility' as const,
      icon: Eye,
      titleKey: 'home.quickChoice.visibility.title',
      descKey: 'home.quickChoice.visibility.desc',
      services: ['Social Media', 'Content Productie'],
    },
    {
      id: 'leads' as const,
      icon: Users,
      titleKey: 'home.quickChoice.leads.title',
      descKey: 'home.quickChoice.leads.desc',
      services: ['Advertentie Beheer', 'SEO'],
    },
    {
      id: 'sales' as const,
      icon: ShoppingCart,
      titleKey: 'home.quickChoice.sales.title',
      descKey: 'home.quickChoice.sales.desc',
      services: ['E-commerce Website', 'Ads Management'],
    },
  ];

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background subtle effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
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
        </motion.div>

        {/* Goal Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {goals.map((goal, index) => (
            <GlassCard
              key={goal.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group relative p-8 text-center hover:border-primary/50 hover:shadow-[0_0_35px_hsl(var(--gold)/0.18)] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              onClick={() => onGoalSelect(goal.id)}
            >
              {/* Hover glow - gold only */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                className="absolute inset-0 rounded-xl"
                whileHover={{
                  boxShadow: '0 0 45px hsl(var(--gold) / 0.22)',
                }}
              />
              
              {/* Icon */}
              <motion.div
                className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-6 border border-primary/30"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <goal.icon className="w-8 h-8 text-primary" />
              </motion.div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {t(goal.titleKey)}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm mb-6">
                {t(goal.descKey)}
              </p>

              {/* CTA Button */}
              <Button
                className="w-full glass-button group/btn hover:border-primary/60 hover:shadow-[0_0_25px_hsl(var(--gold)/0.22)]"
                variant="outline"
              >
                <span>{t('home.quickChoice.cta')}</span>
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover/btn:translate-x-1 transition-transform`} />
              </Button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
});

HomeQuickChoice.displayName = 'HomeQuickChoice';

export default HomeQuickChoice;
