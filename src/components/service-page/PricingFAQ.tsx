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

const PricingFAQ = memo(() => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: 'Geldt de korting op maandelijkse abonnementen?',
      answer: 'Nee. De 20% launchkorting geldt enkel voor eenmalige projecten zoals posters, reels, video\'s en artikels. Maandelijkse diensten (social media beheer, advertising management, etc.) zijn uitgesloten.',
    },
    {
      question: 'Hoe lang is de korting geldig?',
      answer: '10 dagen vanaf je eerste bezoek. Daarna vervalt de korting automatisch.',
    },
    {
      question: 'Hoe werkt de prijs voor Reels?',
      answer: 'Je hebt 3 opties: AI volledig (€150), wij editen jouw footage (€200), of wij filmen on-site bij jou (€250). De prijs hangt af van hoeveel werk wij doen.',
    },
    {
      question: 'Hoe lang is een video/reel?',
      answer: 'Standaard rekenen we met 1 minuut per video. Voor langere video\'s vragen we een offerte op maat.',
    },
    {
      question: 'Hoe lang is een artikel?',
      answer: '600 woorden is de standaard. De prijs is vast: €99 per artikel. Voor langere of kortere artikels kunnen we een aangepaste prijs bespreken.',
    },
    {
      question: 'Kan ik online betalen?',
      answer: 'Nee, wij accepteren geen online betalingen via de website. Na je berekening stuur je je code via WhatsApp of plan je een call. We bevestigen binnen 24 uur met een definitieve offerte.',
    },
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
                Veelgestelde vragen
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text"
            >
              FAQ over prijzen
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
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
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

PricingFAQ.displayName = 'PricingFAQ';

export default PricingFAQ;
