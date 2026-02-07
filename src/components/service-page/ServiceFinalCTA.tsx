import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { socialLinks, trackEvent } from '@/utils/tracking';

interface ServiceFinalCTAProps {
  serviceKey: string;
}

const ServiceFinalCTA = memo(({ serviceKey }: ServiceFinalCTAProps) => {
  const { t } = useTranslation();

  const serviceName = t(`servicePage.${serviceKey}.title`);
  const whatsappMessage = encodeURIComponent(
    t('servicePage.whatsapp.template', { service: serviceName })
  );
  const whatsappUrl = `https://wa.me/32494311119?text=${whatsappMessage}`;

  return (
    <section className="relative py-20 lg:py-28 bg-background overflow-hidden">
      {/* Gold gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] via-primary/[0.08] to-primary/[0.03] pointer-events-none" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gold-gradient-text">
            {t('servicePage.finalCTA.title')}
          </h2>
          
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            {t('servicePage.finalCTA.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="luxury-button min-w-[220px] group">
              <Link to="/contact">
                {t('servicePage.finalCTA.primaryCTA')}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="glass-button min-w-[220px] border-primary/30 hover:border-primary/50"
            >
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackEvent({ event: 'whatsapp_click', location: `service_${serviceKey}_cta` })}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('servicePage.finalCTA.secondaryCTA')}
              </a>
            </Button>
          </div>

          {/* Calendly link */}
          <div className="mt-6">
            <a
              href={socialLinks.calendly}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent({ event: 'calendly_click', location: `service_${serviceKey}_cta` })}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Calendar className="w-4 h-4" />
              {t('calculator.cta.planCall')}
            </a>
          </div>

          {/* Trust microcopy */}
          <p className="text-xs text-muted-foreground mt-4">
            {t('servicePage.finalCTA.trustNote', 'Vrijblijvend gesprek · Definitieve offerte na intake · Prijzen excl. BTW')}
          </p>
        </motion.div>
      </div>
    </section>
  );
});

ServiceFinalCTA.displayName = 'ServiceFinalCTA';

export default ServiceFinalCTA;
