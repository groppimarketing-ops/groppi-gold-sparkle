import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface ServiceFAQProps {
  serviceKey: string;
}

const ServiceFAQ = memo(({ serviceKey }: ServiceFAQProps) => {
  const { t } = useTranslation();

  // 10 FAQ items covering all key questions
  const faqs = [
    { questionKey: 'servicePage.faq.q1', answerKey: 'servicePage.faq.a1' },
    { questionKey: 'servicePage.faq.q2', answerKey: 'servicePage.faq.a2' },
    { questionKey: 'servicePage.faq.q3', answerKey: 'servicePage.faq.a3' },
    { questionKey: 'servicePage.faq.q4', answerKey: 'servicePage.faq.a4' },
    { questionKey: 'servicePage.faq.q5', answerKey: 'servicePage.faq.a5' },
    { questionKey: 'servicePage.faq.q6', answerKey: 'servicePage.faq.a6' },
    { questionKey: 'servicePage.faq.q7', answerKey: 'servicePage.faq.a7' },
    { questionKey: 'servicePage.faq.q8', answerKey: 'servicePage.faq.a8' },
    { questionKey: 'servicePage.faq.q9', answerKey: 'servicePage.faq.a9' },
    { questionKey: 'servicePage.faq.q10', answerKey: 'servicePage.faq.a10' },
  ];

  return (
    <section id="section-faq" className="relative py-16 lg:py-24 bg-background scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4"
            >
              {t('servicePage.faq.label')}
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text"
            >
              {t('servicePage.faq.title')}
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
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="glass-card border-primary/20 px-6 rounded-xl overflow-hidden data-[state=open]:border-primary/40 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="text-foreground font-medium pr-4">
                      {t(faq.questionKey)}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                    {t(faq.answerKey)}
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

ServiceFAQ.displayName = 'ServiceFAQ';

export default ServiceFAQ;
