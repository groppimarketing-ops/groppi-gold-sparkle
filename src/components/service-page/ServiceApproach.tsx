import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Lightbulb, Rocket, BarChart3 } from 'lucide-react';

interface ServiceApproachProps {
  serviceKey: string;
}

const approachCards = [
  { icon: Lightbulb, key: 'strategy' },
  { icon: Rocket, key: 'execution' },
  { icon: BarChart3, key: 'reporting' },
];

const ServiceApproach = memo(({ serviceKey }: ServiceApproachProps) => {
  const { t } = useTranslation();

  return (
    <section id="section-approach" className="relative py-16 lg:py-24 bg-background">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4"
          >
            {t('servicePage.approach.label')}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold gold-gradient-text"
          >
            {t('servicePage.approach.title')}
          </motion.h2>
        </div>

        {/* 3 Approach Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {approachCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl text-center group hover:border-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {t(`servicePage.approach.cards.${card.key}.title`)}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t(`servicePage.approach.cards.${card.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ServiceApproach.displayName = 'ServiceApproach';

export default ServiceApproach;
