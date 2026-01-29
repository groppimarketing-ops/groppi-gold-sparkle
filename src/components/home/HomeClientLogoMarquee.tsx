import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  UtensilsCrossed, 
  Store, 
  Home, 
  ShoppingBag, 
  Sparkles, 
  Building, 
  Rocket, 
  Star, 
  Quote,
  Truck,
  Briefcase,
  Hotel,
  Globe,
  CheckCircle,
  ArrowRight,
  MessageCircle
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/button';

// 12 client placeholders with icons
const clientPlaceholders = [
  { key: 'restaurant', icon: UtensilsCrossed },
  { key: 'interior', icon: Home },
  { key: 'retail', icon: Store },
  { key: 'ecommerce', icon: ShoppingBag },
  { key: 'beauty', icon: Sparkles },
  { key: 'realEstate', icon: Building },
  { key: 'construction', icon: Building2 },
  { key: 'startup', icon: Rocket },
  { key: 'logistics', icon: Truck },
  { key: 'professional', icon: Briefcase },
  { key: 'hospitality', icon: Hotel },
  { key: 'b2b', icon: Globe },
];

const testimonials = [
  { key: 'testimonial1' },
  { key: 'testimonial2' },
  { key: 'testimonial3' },
];

const HomeClientLogoMarquee = () => {
  const { t } = useTranslation();

  // Duplicate for seamless loop
  const logos = [...clientPlaceholders, ...clientPlaceholders];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      
      {/* Top separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="block text-center text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4"
        >
          {t('home.clientLogoMarquee.eyebrow')}
        </motion.span>

        <SectionHeader
          subtitle={t('home.clientLogoMarquee.subtitle')}
          title={t('home.clientLogoMarquee.title')}
          centered
        />

        {/* Benefits Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 mb-12"
        >
          {['benefit1', 'benefit2', 'benefit3'].map((benefit, index) => (
            <div 
              key={benefit}
              className="flex items-center gap-2 text-sm text-foreground/80"
            >
              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{t(`home.clientLogoMarquee.benefits.${benefit}`)}</span>
            </div>
          ))}
        </motion.div>

        {/* Marquee Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-primary font-medium mb-6 tracking-wide"
        >
          {t('home.clientLogoMarquee.marqueeLabel')}
        </motion.p>

        {/* Logo Marquee */}
        <div className="relative overflow-hidden group" dir="ltr">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-4 group-hover:[animation-play-state:paused]"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 45,
                ease: 'linear',
              },
            }}
          >
            {logos.map((client, index) => {
              const Icon = client.icon;
              return (
                <div
                  key={`logo-${index}`}
                  className="flex-shrink-0 w-44 h-16 glass-card flex items-center justify-center gap-3 border border-primary/20 hover:border-primary/50 hover:shadow-[0_0_25px_hsl(var(--gold)/0.2)] transition-all duration-300 cursor-default px-4"
                >
                  <Icon className="w-5 h-5 text-primary/70 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                    {t(`home.clientLogoMarquee.clients.${client.key}`)}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* NDA Disclaimer */}
        <p className="text-center text-sm text-muted-foreground/60 italic mt-8 max-w-2xl mx-auto">
          {t('home.clientLogoMarquee.ndaNote')}
        </p>

        {/* Gold separator */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto my-12" />

        {/* Micro Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 hover:border-primary/50 hover:shadow-[0_0_25px_hsl(var(--gold)/0.15)] hover:-translate-y-1 transition-all duration-500"
            >
              {/* Quote icon */}
              <Quote className="w-5 h-5 text-primary/40 mb-3" />
              
              {/* Quote text */}
              <p className="text-foreground text-sm mb-4 leading-relaxed">
                "{t(`home.clientLogoMarquee.testimonials.${testimonial.key}.quote`)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">
                  — {t(`home.clientLogoMarquee.testimonials.${testimonial.key}.role`)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          {/* Gold separator */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-10" />
          
          <h3 className="text-2xl md:text-3xl font-bold gold-gradient-text mb-3">
            {t('home.clientLogoMarquee.cta.title')}
          </h3>
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-8">
            {t('home.clientLogoMarquee.cta.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-[0_0_25px_hsl(var(--gold)/0.25)] hover:shadow-[0_0_40px_hsl(var(--gold)/0.4)] hover:-translate-y-1 transition-all duration-300 px-10 py-6 rounded-xl text-base"
            >
              <Link to="/contact">
                {t('home.clientLogoMarquee.cta.primaryButton')}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary/40 hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--gold)/0.15)] hover:-translate-y-1 transition-all duration-300 px-10 py-6 rounded-xl text-base"
            >
              <a 
                href="https://wa.me/32494396641?text=Hallo%2C%20ik%20wil%20graag%20meer%20weten%20over%20jullie%20diensten."
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t('home.clientLogoMarquee.cta.secondaryButton')}
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default HomeClientLogoMarquee;
