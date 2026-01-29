import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GlassCard from '@/components/ui/GlassCard';

const PartnerBooking = () => {
  const { t } = useTranslation();

  return (
    <section id="call" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
        <GlassCard
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center p-8 md:p-10 hover:border-primary/40 transition-colors"
          hover3D={false}
        >
          <motion.div
            className="w-14 h-14 rounded-full glass-card flex items-center justify-center mx-auto mb-6 border border-primary/30"
            whileHover={{ scale: 1.05 }}
          >
            <Calendar className="w-7 h-7 text-primary" />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-3 gold-shimmer-text">
            {t('partner.booking.title')}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {t('partner.booking.subtitle')}
          </p>
          
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_25px_hsl(43_100%_50%/0.25)] hover:translate-y-[-2px] transition-all duration-300"
            onClick={() => window.open('https://calendly.com', '_blank')}
          >
            {t('partner.booking.cta')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </GlassCard>
      </div>
    </section>
  );
};

export default PartnerBooking;
