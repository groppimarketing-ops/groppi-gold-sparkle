import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/ui/SectionHeader';

const HomeClientMarquee = () => {
  const { t } = useTranslation();

  // 24 placeholder logos
  const logos = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
  }));

  // Split into two rows for richer look
  const row1 = logos.slice(0, 12);
  const row2 = logos.slice(12, 24);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          subtitle={t('home.clientMarquee.subtitle')}
          title={t('home.clientMarquee.title')}
          centered
        />

        {/* Marquee Container */}
        <div className="mt-12 space-y-6">
          {/* Row 1 - moves left */}
          <div className="relative overflow-hidden group">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex gap-8 group-hover:[animation-play-state:paused]"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...row1, ...row1].map((logo, index) => (
                <LogoPlaceholder key={`row1-${index}`} logo={logo} />
              ))}
            </motion.div>
          </div>

          {/* Row 2 - moves right (slower) */}
          <div className="relative overflow-hidden group">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <motion.div
              className="flex gap-8 group-hover:[animation-play-state:paused]"
              initial={{ x: '-50%' }}
              animate={{ x: '0%' }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 35,
                  ease: 'linear',
                },
              }}
            >
              {/* Duplicate for seamless loop */}
              {[...row2, ...row2].map((logo, index) => (
                <LogoPlaceholder key={`row2-${index}`} logo={logo} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* NDA Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground/80 text-sm mt-10 italic"
        >
          {t('home.clientMarquee.ndaNote')}
        </motion.p>
      </div>
    </section>
  );
};

interface LogoPlaceholderProps {
  logo: { id: number; name: string };
}

const LogoPlaceholder = ({ logo }: LogoPlaceholderProps) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      className="flex-shrink-0 w-32 h-16 glass-card flex items-center justify-center border border-primary/10 rounded-lg cursor-pointer transition-all duration-500 group/logo"
      whileHover={{
        borderColor: 'hsl(43 100% 50% / 0.4)',
        boxShadow: '0 0 20px hsl(43 100% 50% / 0.2)',
      }}
    >
      {/* Placeholder logo - monochrome by default, gold on hover */}
      <div className="w-20 h-8 rounded bg-muted-foreground/20 group-hover/logo:bg-primary/30 transition-colors duration-500 flex items-center justify-center">
        <span className="text-[10px] text-muted-foreground/50 group-hover/logo:text-primary transition-colors duration-500 font-medium">
          {t('home.clientMarquee.logoPlaceholder')}
        </span>
      </div>
    </motion.div>
  );
};

export default HomeClientMarquee;
