import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import {
  UtensilsCrossed,
  Sofa, 
  Store, 
  ShoppingCart, 
  Building2, 
  Sparkles, 
  Wrench, 
  Rocket,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import GoldAnimatedBackground from '@/components/effects/GoldAnimatedBackground';

const sectorIcons = {
  restaurant: UtensilsCrossed,
  interior: Sofa,
  retail: Store,
  ecommerce: ShoppingCart,
  realEstate: Building2,
  health: Sparkles,
  services: Wrench,
  sme: Rocket,
};

const HomeTrustSectors = memo(() => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  const sectors = [
    { key: 'restaurant', icon: sectorIcons.restaurant },
    { key: 'interior', icon: sectorIcons.interior },
    { key: 'retail', icon: sectorIcons.retail },
    { key: 'ecommerce', icon: sectorIcons.ecommerce },
    { key: 'realEstate', icon: sectorIcons.realEstate },
    { key: 'health', icon: sectorIcons.health },
    { key: 'services', icon: sectorIcons.services },
    { key: 'sme', icon: sectorIcons.sme },
  ];

  const stats = [
    { value: '10+', labelKey: 'home.trustSectors.stats.experience' },
    { value: 'BE + EU', labelKey: 'home.trustSectors.stats.focus' },
    { value: 'System-driven', labelKey: 'home.trustSectors.stats.system' },
    { value: 'Premium', labelKey: 'home.trustSectors.stats.premium' },
  ];

  const proofPoints = [
    t('home.trustSectors.proofPoints.experience'),
    t('home.trustSectors.proofPoints.pricing'),
    t('home.trustSectors.proofPoints.system'),
    t('home.trustSectors.proofPoints.leads'),
  ];

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-grid');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Premium Gold Animated Background */}
      <GoldAnimatedBackground intensity="medium" showVignette={true} />
      
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-[1]" />
      <div className="absolute inset-0 neural-bg opacity-20 z-[1]" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Section - Headline & Stats */}
        <div className="text-center mb-16">
          {/* Eyebrow */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4"
          >
            {t('home.trustSectors.eyebrow')}
          </motion.span>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            <span className="gold-gradient-text">
              {t('home.trustSectors.headline')}
            </span>
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {t('home.trustSectors.subheadline')}
          </motion.p>
        </div>

        {/* Numbers Proof Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
              className="group glass-card p-6 text-center hover:border-primary/50 hover:shadow-[0_0_40px_hsl(var(--gold)/0.2),0_0_80px_hsl(var(--gold)/0.08)] transition-all duration-500"
            >
              <p className="text-2xl md:text-3xl font-bold text-primary mb-2 gold-text-glow">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">
                {t(stat.labelKey)}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Micro Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-muted-foreground/60 italic mb-16"
        >
          {t('home.trustSectors.microNote')}
        </motion.p>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Proof Points */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {/* Proof Points */}
            <ul className="space-y-4">
              {proofPoints.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-foreground">{point}</span>
                </motion.li>
              ))}
            </ul>

            {/* NDA Note */}
            <p className="text-sm text-muted-foreground/70 italic">
              {t('home.trustSectors.note')}
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <Button
                asChild
                className="luxury-button text-primary-foreground px-8 py-6 text-base rounded-xl"
              >
                <Link to="/services">
                  {t('home.trustSectors.cta')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Sector Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {sectors.map((sector, index) => {
              const Icon = sector.icon;
              return (
                <motion.div
                  key={sector.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={{ 
                    y: -4,
                    transition: { duration: 0.3 }
                  }}
                  className="group glass-card p-5 hover:border-primary/50 hover:shadow-[0_0_35px_hsl(var(--gold)/0.18),0_0_70px_hsl(var(--gold)/0.06)] transition-all duration-500 cursor-pointer"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsl(var(--gold)/0.25)] transition-all duration-300">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {t(`home.trustSectors.sectors.${sector.key}.title`)}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-muted-foreground">
                    {t(`home.trustSectors.sectors.${sector.key}.subtitle`)}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

HomeTrustSectors.displayName = 'HomeTrustSectors';

export default HomeTrustSectors;
