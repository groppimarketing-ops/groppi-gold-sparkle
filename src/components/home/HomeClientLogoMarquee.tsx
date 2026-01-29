import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Building2, UtensilsCrossed, Store, Home, ShoppingBag, Sparkles, Building, Rocket, Star, Quote } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

// Placeholder client "logos" - anonymized industry badges
const clientPlaceholders = [
  { key: 'restaurant', icon: UtensilsCrossed },
  { key: 'interior', icon: Home },
  { key: 'retail', icon: Store },
  { key: 'ecommerce', icon: ShoppingBag },
  { key: 'beauty', icon: Sparkles },
  { key: 'realEstate', icon: Building },
  { key: 'construction', icon: Building2 },
  { key: 'startup', icon: Rocket },
];

const testimonials = [
  { 
    key: 'testimonial1',
    role: 'antwerp'
  },
  { 
    key: 'testimonial2',
    role: 'brussels'
  },
  { 
    key: 'testimonial3',
    role: 'ghent'
  },
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
        <SectionHeader
          subtitle={t('home.clientLogoMarquee.subtitle')}
          title={t('home.clientLogoMarquee.title')}
          centered
        />

        {/* Logo Marquee */}
        <div className="relative overflow-hidden mt-12 group" dir="ltr">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          <motion.div
            className="flex gap-6 group-hover:[animation-play-state:paused]"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 40,
                ease: 'linear',
              },
            }}
          >
            {logos.map((client, index) => {
              const Icon = client.icon;
              return (
                <div
                  key={`logo-${index}`}
                  className="flex-shrink-0 w-40 h-20 glass-card flex flex-col items-center justify-center gap-2 border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(43_100%_50%/0.15)] transition-all duration-300 cursor-default"
                >
                  <Icon className="w-6 h-6 text-primary/70" strokeWidth={1.5} />
                  <span className="text-xs font-medium text-muted-foreground text-center px-2">
                    {t(`home.clientLogoMarquee.clients.${client.key}`)}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* NDA Disclaimer */}
        <p className="text-center text-sm text-muted-foreground/60 italic mt-8">
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
              className="glass-card p-6 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(43_100%_50%/0.12)] transition-all duration-500"
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
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

export default HomeClientLogoMarquee;
