import { useTranslation } from 'react-i18next';
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
            <div
              key={step.key}
              className={`relative animate-fade-up-${index + 1}`}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
              )}
              
              <GlassCard 
                className="text-center relative z-10 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(43_100%_50%/0.15)] transition-all duration-500 py-8"
                hover3D={false}
              >
                {/* Step number with CSS glow animation */}
                <div className="text-4xl font-bold text-primary mb-4 step-number-glow">
                  {step.number}
                </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSteps;
