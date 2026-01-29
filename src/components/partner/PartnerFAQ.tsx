import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/ui/SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const PartnerFAQ = () => {
  const { t } = useTranslation();

  const faqKeys = ['isJob', 'bureau', 'exclusivity', 'leads', 'team', 'howToApply'];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <SectionHeader
          subtitle={t('partner.faq.subtitle')}
          title={t('partner.faq.title')}
          centered
        />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mt-12"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqKeys.map((key) => (
              <AccordionItem 
                key={key} 
                value={key}
                className="glass-card border border-primary/20 rounded-xl px-6 data-[state=open]:border-primary/40 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {t(`partner.faq.items.${key}.question`)}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {t(`partner.faq.items.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerFAQ;
