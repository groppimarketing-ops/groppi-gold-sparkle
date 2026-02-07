import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ServicesFAQ = memo(() => {
  const { t } = useTranslation();

  const faqKeys = [
    'onePageVsBusiness',
    'seoOneTimeOrOngoing',
    'adBudgetManagement',
    'contentOrManagement',
    'withoutWebsite',
    'videoInSocial',
    'ecommerceVsBusiness',
    'reputationHowItWorks',
    'dataSyncExplained',
  ];

  return (
    <section className="relative py-16 lg:py-24 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-primary mb-4"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                {t('servicePage.servicesFAQ.label')}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text"
            >
              {t('servicePage.servicesFAQ.title')}
            </motion.h2>
          </div>

          {/* FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqKeys.map((key, index) => (
                <AccordionItem
                  key={key}
                  value={`services-faq-${index}`}
                  className="glass-card border-primary/20 px-6 rounded-xl !overflow-visible data-[state=open]:border-primary/40 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="text-foreground font-medium pr-4">
                      {t(`servicePage.servicesFAQ.questions.${key}.q`)}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {t(`servicePage.servicesFAQ.questions.${key}.a`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ServicesFAQ.displayName = 'ServicesFAQ';

export default ServicesFAQ;
