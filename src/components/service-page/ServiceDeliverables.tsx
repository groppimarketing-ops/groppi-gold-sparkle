import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Lightbulb, Palette, Settings, TrendingUp, FileText, Headphones 
} from 'lucide-react';

interface ServiceDeliverablesProps {
  serviceKey: string;
}

const deliverableIcons = [Lightbulb, Palette, Settings, TrendingUp, FileText, Headphones];

const ServiceDeliverables = memo(({ serviceKey }: ServiceDeliverablesProps) => {
  const { t } = useTranslation();

  const deliverables = [
    {
      titleKey: `servicePage.${serviceKey}.deliverables.1.title`,
      descKey: `servicePage.${serviceKey}.deliverables.1.desc`,
    },
    {
      titleKey: `servicePage.${serviceKey}.deliverables.2.title`,
      descKey: `servicePage.${serviceKey}.deliverables.2.desc`,
    },
    {
      titleKey: `servicePage.${serviceKey}.deliverables.3.title`,
      descKey: `servicePage.${serviceKey}.deliverables.3.desc`,
    },
    {
      titleKey: `servicePage.${serviceKey}.deliverables.4.title`,
      descKey: `servicePage.${serviceKey}.deliverables.4.desc`,
    },
    {
      titleKey: `servicePage.${serviceKey}.deliverables.5.title`,
      descKey: `servicePage.${serviceKey}.deliverables.5.desc`,
    },
    {
      titleKey: `servicePage.${serviceKey}.deliverables.6.title`,
      descKey: `servicePage.${serviceKey}.deliverables.6.desc`,
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4"
          >
            {t('servicePage.deliverables.label')}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold gold-gradient-text"
          >
            {t('servicePage.deliverables.title')}
          </motion.h2>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((deliverable, index) => {
            const Icon = deliverableIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 group hover:border-primary/40 hover:shadow-[0_0_25px_hsl(var(--primary)/0.15)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(deliverable.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(deliverable.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

ServiceDeliverables.displayName = 'ServiceDeliverables';

export default ServiceDeliverables;
