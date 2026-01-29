import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

const PartnerApplyCTA = () => {
  const { t } = useTranslation();

  return (
    <section id="apply" className="py-20" dir="ltr">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <GlassCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center p-8 md:p-12 hover:border-primary/40 transition-colors"
          hover3D={false}
        >
          <motion.div
            className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-8 border border-primary/30"
            animate={{ 
              boxShadow: [
                '0 0 20px hsl(43 100% 50% / 0.2)',
                '0 0 35px hsl(43 100% 50% / 0.35)',
                '0 0 20px hsl(43 100% 50% / 0.2)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Handshake className="w-8 h-8 text-primary" />
          </motion.div>
          
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4 gold-shimmer-text"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {t('partner.apply.title')}
          </h2>
          
          <p 
            className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {t('partner.apply.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_25px_hsl(43_100%_50%/0.25)] hover:translate-y-[-2px] transition-all duration-300"
            >
              <Link to="/contact">
                {t('partner.apply.ctaPrimary')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              onClick={() => document.getElementById('call')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('partner.apply.ctaSecondary')}
            </Button>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

export default PartnerApplyCTA;
