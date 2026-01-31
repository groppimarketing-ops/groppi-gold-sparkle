import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Search, Rocket, TrendingUp } from 'lucide-react';

interface ServiceProcessProps {
  serviceKey: string;
}

const processSteps = [
  { icon: Search, number: '01' },
  { icon: Rocket, number: '02' },
  { icon: TrendingUp, number: '03' },
];

const ServiceProcess = memo(({ serviceKey }: ServiceProcessProps) => {
  const { t } = useTranslation();

  const steps = [
    {
      titleKey: `servicePage.${serviceKey}.process.1.title`,
      descKey: `servicePage.${serviceKey}.process.1.desc`,
    },
    {
      titleKey: `servicePage.${serviceKey}.process.2.title`,
      descKey: `servicePage.${serviceKey}.process.2.desc`,
    },
    {
      titleKey: `servicePage.${serviceKey}.process.3.title`,
      descKey: `servicePage.${serviceKey}.process.3.desc`,
    },
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4"
          >
            {t('servicePage.process.label')}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold gold-gradient-text"
          >
            {t('servicePage.process.title')}
          </motion.h2>
        </div>

        {/* 3 Steps Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden lg:block" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const { icon: Icon, number } = processSteps[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative text-center"
                >
                  {/* Step Number + Icon */}
                  <div className="relative inline-flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-2xl glass-card flex items-center justify-center mb-3 group-hover:border-primary/40 transition-all">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-xs font-bold text-primary tracking-wider">
                      {number}
                    </span>
                  </div>
                  
                  {/* Step Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                    {t(step.descKey)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

ServiceProcess.displayName = 'ServiceProcess';

export default ServiceProcess;
