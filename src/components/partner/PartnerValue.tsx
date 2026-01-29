import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Calculator, Briefcase, Users, Sparkles } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';

const PartnerValue = () => {
  const { t } = useTranslation();

  const cards = [
    { icon: Award, key: 'credibility' },
    { icon: Calculator, key: 'salesReady' },
    { icon: Briefcase, key: 'portfolio' },
    { icon: Users, key: 'longterm' },
  ];

  return (
    <section className="py-20 relative overflow-hidden" dir="ltr">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
        <SectionHeader
          subtitle={t('partner.value.subtitle')}
          title={t('partner.value.title')}
          centered
        />
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {cards.map((card, index) => (
            <GlassCard
              key={card.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group text-center py-8 px-6 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(43_100%_50%/0.15)] transition-all duration-500"
              hover3D={false}
            >
              <motion.div 
                className="w-14 h-14 rounded-full glass-card flex items-center justify-center mx-auto mb-4 border border-primary/30 group-hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <card.icon className="w-6 h-6 text-primary" />
              </motion.div>
              
              <h3 
                className="font-bold text-lg mb-3 group-hover:text-primary transition-colors"
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
              >
                {t(`partner.value.cards.${card.key}.title`)}
              </h3>
              
              <p 
                className="text-sm text-muted-foreground leading-relaxed"
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
              >
                {t(`partner.value.cards.${card.key}.body`)}
              </p>
            </GlassCard>
          ))}
        </div>

        {/* Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-full border border-primary/30">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0" />
            <span 
              className="text-foreground font-medium"
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
            >
              {t('partner.value.highlight')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerValue;
