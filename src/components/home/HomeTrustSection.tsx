import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, Users, MapPin, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { memo } from 'react';

const HomeTrustSection = memo(() => {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  const trustItems = [
    {
      icon: Calendar,
      titleKey: 'home.trustSection.items.founded.title',
      descKey: 'home.trustSection.items.founded.desc',
      highlight: '2016',
    },
    {
      icon: Users,
      titleKey: 'home.trustSection.items.team.title',
      descKey: 'home.trustSection.items.team.desc',
      highlight: '9+',
    },
    {
      icon: MapPin,
      titleKey: 'home.trustSection.items.reach.title',
      descKey: 'home.trustSection.items.reach.desc',
      highlight: null,
    },
    {
      icon: Handshake,
      titleKey: 'home.trustSection.items.partnerships.title',
      descKey: 'home.trustSection.items.partnerships.desc',
      highlight: null,
    },
  ];

  const itemVariants = prefersReducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

  return (
    <section className="section-spacing relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute inset-0 neural-bg opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          subtitle={t('home.trustSection.subtitle')}
          title={t('home.trustSection.title')}
          centered
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {trustItems.map((item, index) => (
            <GlassCard
              key={index}
              initial={itemVariants.hidden}
              whileInView={itemVariants.visible}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: 0.5 }}
              className="group text-center py-8 px-6 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--gold)/0.18)] hover:-translate-y-1 transition-all duration-300"
              hover3D={false}
            >
              {/* Icon container */}
              <motion.div
                className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-4 border border-primary/30 group-hover:border-primary/60 group-hover:shadow-[0_0_18px_hsl(var(--gold)/0.2)] transition-all duration-300"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              >
                <item.icon className="w-7 h-7 text-primary" />
              </motion.div>

              {/* Highlight number if exists */}
              {item.highlight && (
                <p className="text-3xl font-bold text-primary mb-1">
                  {item.highlight}
                </p>
              )}
              
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {t(item.titleKey)}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(item.descKey)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
});

HomeTrustSection.displayName = 'HomeTrustSection';

export default HomeTrustSection;
