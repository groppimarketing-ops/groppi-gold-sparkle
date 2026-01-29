import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const PartnerMarquee = () => {
  const { t } = useTranslation();

  const marqueeItems = [
    t('partner.marquee.item1'),
    t('partner.marquee.item2'),
    t('partner.marquee.item3'),
    t('partner.marquee.item4'),
    t('partner.marquee.item5'),
    t('partner.marquee.item6'),
  ];

  return (
    <section className="py-8 relative overflow-hidden border-y border-primary/10" dir="ltr">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-8 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 25,
              ease: 'linear',
            },
          }}
        >
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={index}
              className="text-primary font-medium text-sm md:text-base tracking-wide flex items-center gap-3"
              dir="ltr"
              style={{ unicodeBidi: 'isolate' }}
            >
              <span className="text-primary/50">•</span>
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerMarquee;
