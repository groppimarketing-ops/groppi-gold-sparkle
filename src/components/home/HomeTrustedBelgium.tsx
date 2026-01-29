import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  UtensilsCrossed, 
  Store, 
  Hammer, 
  Sofa, 
  Wrench, 
  Sparkles, 
  ShoppingCart, 
  Rocket,
  MapPin
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';

const industryBadges = [
  { key: 'restaurants', icon: UtensilsCrossed },
  { key: 'retail', icon: Store },
  { key: 'construction', icon: Hammer },
  { key: 'interior', icon: Sofa },
  { key: 'localServices', icon: Wrench },
  { key: 'beauty', icon: Sparkles },
  { key: 'ecommerce', icon: ShoppingCart },
  { key: 'sme', icon: Rocket },
];

const HomeTrustedBelgium = () => {
  const { t } = useTranslation();

  const anonymizedClients = [
    { locationKey: 'antwerpen', industryKey: 'restaurant', outcomeKey: 'outcome1' },
    { locationKey: 'mechelen', industryKey: 'retail', outcomeKey: 'outcome2' },
    { locationKey: 'brussel', industryKey: 'construction', outcomeKey: 'outcome3' },
    { locationKey: 'vlaanderen', industryKey: 'interior', outcomeKey: 'outcome4' },
    { locationKey: 'gent', industryKey: 'beauty', outcomeKey: 'outcome5' },
    { locationKey: 'leuven', industryKey: 'ecommerce', outcomeKey: 'outcome6' },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute inset-0 neural-bg opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title & Subtitle */}
        <SectionHeader
          subtitle={t('home.trustedBelgium.eyebrow')}
          title={t('home.trustedBelgium.title')}
          description={t('home.trustedBelgium.subtitle')}
          centered
        />

        {/* Industry Badge Marquee */}
        <div className="mt-12 mb-16">
          <IndustryMarquee />
        </div>

        {/* Anonymized Proof Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {anonymizedClients.map((client, index) => (
            <AnonymizedCard
              key={index}
              locationKey={client.locationKey}
              industryKey={client.industryKey}
              outcomeKey={client.outcomeKey}
              index={index}
            />
          ))}
        </motion.div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground/60 text-sm mt-10 italic"
        >
          {t('home.trustedBelgium.disclaimer')}
        </motion.p>
      </div>
    </section>
  );
};

const IndustryMarquee = () => {
  const { t } = useTranslation();

  // Duplicate items for seamless loop
  const items = [...industryBadges, ...industryBadges];

  return (
    <div className="relative overflow-hidden" dir="ltr">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: 'linear',
          },
        }}
      >
        {items.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={`badge-${index}`}
              className="flex-shrink-0 px-5 py-3 rounded-full border border-primary/30 bg-primary/5 flex items-center gap-3 hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_15px_hsl(43_100%_50%/0.15)] transition-all duration-300 cursor-default"
            >
              <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {t(`home.trustedBelgium.industries.${badge.key}`)}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

interface AnonymizedCardProps {
  locationKey: string;
  industryKey: string;
  outcomeKey: string;
  index: number;
}

const AnonymizedCard = ({ locationKey, industryKey, outcomeKey, index }: AnonymizedCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group glass-card p-5 hover:border-primary/40 hover:shadow-[0_0_25px_hsl(43_100%_50%/0.12)] transition-all duration-500"
    >
      {/* Location + Industry Row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">
            {t(`home.trustedBelgium.locations.${locationKey}`)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted/30">
          {t(`home.trustedBelgium.industries.${industryKey}`)}
        </span>
      </div>

      {/* Outcome */}
      <p className="text-sm text-foreground leading-relaxed group-hover:text-primary/90 transition-colors">
        {t(`home.trustedBelgium.outcomes.${outcomeKey}`)}
      </p>
    </motion.div>
  );
};

export default HomeTrustedBelgium;
