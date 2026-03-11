import { useTranslation } from 'react-i18next';
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
    <section className="py-20" dir="ltr">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <SectionHeader
          subtitle={t('partner.faq.subtitle')}
          title={t('partner.faq.title')}
          centered
        />
        
        <div className="animate-fade-up max-w-3xl mx-auto mt-12">
          <Accordion type="single" collapsible className="space-y-4">
            {faqKeys.map((key) => (
              <AccordionItem 
                key={key} 
                value={key}
                className="glass-card border border-primary/20 rounded-xl px-6 !overflow-visible data-[state=open]:border-primary/40 transition-colors"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span 
                    className="font-semibold text-foreground group-hover:text-primary transition-colors"
                    dir="ltr"
                    style={{ unicodeBidi: 'isolate' }}
                  >
                    {t(`partner.faq.items.${key}.question`)}
                  </span>
                </AccordionTrigger>
                <AccordionContent 
                  className="text-muted-foreground pb-5"
                  dir="ltr"
                  style={{ unicodeBidi: 'isolate' }}
                >
                  {t(`partner.faq.items.${key}.answer`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default PartnerFAQ;
