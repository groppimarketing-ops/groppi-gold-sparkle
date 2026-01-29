import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Video, 
  Camera, 
  Palette, 
  Code, 
  PenTool, 
  Target,
  Users,
  CheckCircle, 
  ArrowRight,
  Handshake,
  TrendingUp,
  Briefcase,
  Clock,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Franchise = () => {
  const { t } = useTranslation();

  const partnerTypes = [
    { icon: Video, key: 'videomaker' },
    { icon: Camera, key: 'photographer' },
    { icon: Palette, key: 'designer' },
    { icon: Code, key: 'developer' },
    { icon: PenTool, key: 'copywriter' },
    { icon: Target, key: 'adsSpecialist' },
    { icon: Users, key: 'influencer' },
  ];

  const benefits = [
    { icon: TrendingUp, key: 'moreClients' },
    { icon: Briefcase, key: 'biggerProjects' },
    { icon: Target, key: 'portfolio' },
    { icon: Clock, key: 'longterm' },
  ];

  const steps = [
    { step: '1', key: 'step1' },
    { step: '2', key: 'step2' },
    { step: '3', key: 'step3' },
  ];

  const faqs = [
    { key: 'paid' },
    { key: 'exclusive' },
    { key: 'speed' },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-[0.2em] mb-6"
            >
              <Handshake className="w-4 h-4" />
              {t('partner.badge')}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold gold-shimmer-text mb-6"
            >
              {t('partner.hero.title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8"
            >
              {t('partner.hero.subtitle')}
            </motion.p>

            {/* Benefit Bullets */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10"
            >
              {['bullet1', 'bullet2', 'bullet3'].map((key, i) => (
                <div key={key} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{t(`partner.hero.${key}`)}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_25px_hsl(43_100%_50%/0.25)] hover:translate-y-[-2px] transition-all duration-300"
              >
                <Link to="/contact">
                  {t('partner.hero.ctaPrimary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <Link to="/contact">
                  {t('partner.hero.ctaSecondary')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Who We Look For */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('partner.whoWeSeek.subtitle')}
            title={t('partner.whoWeSeek.title')}
            centered
          />
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-12">
            {partnerTypes.map((type, index) => (
              <GlassCard
                key={type.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center py-6 px-4 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(43_100%_50%/0.15)] transition-all duration-500"
                hover3D={false}
              >
                <motion.div 
                  className="w-14 h-14 rounded-xl glass-card flex items-center justify-center mx-auto mb-4 border border-primary/20 group-hover:border-primary/40 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <type.icon className="w-7 h-7 text-primary" />
                </motion.div>
                
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {t(`partner.whoWeSeek.types.${type.key}.title`)}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {t(`partner.whoWeSeek.types.${type.key}.desc`)}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Why You Win More */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('partner.benefits.subtitle')}
            title={t('partner.benefits.title')}
            centered
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {benefits.map((benefit, index) => (
              <GlassCard
                key={benefit.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group text-center py-8 px-6 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(43_100%_50%/0.15)] transition-all duration-500"
                hover3D={false}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-4 border border-primary/30 group-hover:border-primary/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  <benefit.icon className="w-7 h-7 text-primary" />
                </motion.div>
                
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {t(`partner.benefits.items.${benefit.key}.title`)}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {t(`partner.benefits.items.${benefit.key}.desc`)}
                </p>
              </GlassCard>
            ))}
          </div>

          {/* Trust Line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 glass-card px-6 py-4 rounded-full border border-primary/30">
              <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium">
                {t('partner.benefits.trustLine')}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - 3 Simple Steps */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('partner.howItWorks.subtitle')}
            title={t('partner.howItWorks.title')}
            centered
          />
          
          <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-0" />
                )}
                
                <GlassCard 
                  className="text-center relative z-10 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(43_100%_50%/0.15)] transition-all duration-500"
                  hover3D={false}
                >
                  <motion.div 
                    className="text-4xl font-bold text-primary mb-4"
                    animate={{ 
                      textShadow: [
                        '0 0 10px hsl(43 100% 50% / 0.3)',
                        '0 0 20px hsl(43 100% 50% / 0.4)',
                        '0 0 10px hsl(43 100% 50% / 0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">
                    {t(`partner.howItWorks.steps.${step.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`partner.howItWorks.steps.${step.key}.desc`)}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
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
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={faq.key} 
                  value={faq.key}
                  className="glass-card border border-primary/20 rounded-xl px-6 data-[state=open]:border-primary/40 transition-colors"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-5">
                    <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {t(`partner.faq.items.${faq.key}.question`)}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {t(`partner.faq.items.${faq.key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
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
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-shimmer-text">
              {t('partner.cta.title')}
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {t('partner.cta.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_25px_hsl(43_100%_50%/0.25)] hover:translate-y-[-2px] transition-all duration-300"
              >
                <Link to="/contact">
                  {t('partner.cta.ctaPrimary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-primary/30 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <a href="https://wa.me/32000000000" target="_blank" rel="noopener noreferrer">
                  {t('partner.cta.ctaWhatsApp')}
                </a>
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default Franchise;
