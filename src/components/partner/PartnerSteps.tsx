import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';

const PartnerSteps = () => {
  const { t } = useTranslation();

  const steps = [
    { number: '1', key: 'step1' },
    { number: '2', key: 'step2' },
    { number: '3', key: 'step3' },
  ];

  return (
    <section className="py-20 relative overflow-hidden" dir="ltr">
      <div className="absolute inset-0 neural-bg opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
        <SectionHeader
          subtitle={t('partner.howItWorks.subtitle')}
          title={t('partner.howItWorks.title')}
          centered
        />
        
        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              
              <GlassCard 
                className="text-center relative z-10 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(43_100%_50%/0.15)] transition-all duration-500 py-8"
                hover3D={false}
              >
                <motion.div 
                  className="text-4xl font-bold text-primary mb-4"
                  animate={{ 
                    textShadow: [
                      '0 0 10px hsl(43 100% 50% / 0.3)',
                      '0 0 20px hsl(43 100% 50% / 0.4)',
                      '0 0 10px hsl(43 100% 50% / 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {step.number}
                </motion.div>
                <h3 
                  className="font-bold text-lg mb-2"
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {t(`partner.howItWorks.steps.${step.key}.title`)}
                </h3>
                <p 
                  className="text-muted-foreground text-sm leading-relaxed"
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {t(`partner.howItWorks.steps.${step.key}.desc`)}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSteps;
