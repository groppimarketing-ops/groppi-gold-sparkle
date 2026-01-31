import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, TrendingUp, Users, Zap } from 'lucide-react';

interface ServiceWhySectionProps {
  serviceKey: string;
}

const ServiceWhySection = memo(({ serviceKey }: ServiceWhySectionProps) => {
  const { t } = useTranslation();

  const benefits = [
    t(`servicePage.${serviceKey}.why.benefit1`),
    t(`servicePage.${serviceKey}.why.benefit2`),
    t(`servicePage.${serviceKey}.why.benefit3`),
  ];

  const metrics = [
    {
      icon: TrendingUp,
      valueKey: `servicePage.${serviceKey}.why.metric1.value`,
      labelKey: `servicePage.${serviceKey}.why.metric1.label`,
    },
    {
      icon: Users,
      valueKey: `servicePage.${serviceKey}.why.metric2.value`,
      labelKey: `servicePage.${serviceKey}.why.metric2.label`,
    },
  ];

  return (
    <section id="section-why" className="relative py-16 lg:py-24 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4"
            >
              {t('servicePage.why.label')}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4"
            >
              {t(`servicePage.${serviceKey}.why.title`)}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t(`servicePage.${serviceKey}.why.subtitle`)}
            </motion.p>
          </div>

          {/* Benefits + Metrics Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Benefits Column */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 glass-card rounded-xl hover:border-primary/30 transition-colors"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-foreground font-medium">{benefit}</p>
                </div>
              ))}
            </motion.div>

            {/* Metrics Column */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col justify-center gap-6"
            >
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-6 glass-card rounded-xl bg-gradient-to-r from-primary/5 to-transparent border-primary/20"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-primary">
                        {t(metric.valueKey)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t(metric.labelKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceWhySection.displayName = 'ServiceWhySection';

export default ServiceWhySection;
