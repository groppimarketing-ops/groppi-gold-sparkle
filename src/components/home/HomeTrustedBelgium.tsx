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

  const proofCards = [
    { locationKey: 'antwerpen', industryKey: 'restaurant', outcomeKey: 'outcome1' },
    { locationKey: 'mechelen', industryKey: 'retail', outcomeKey: 'outcome2' },
    { locationKey: 'brussel', industryKey: 'interior', outcomeKey: 'outcome3' },
    { locationKey: 'vlaanderen', industryKey: 'localServices', outcomeKey: 'outcome4' },
    { locationKey: 'gent', industryKey: 'beauty', outcomeKey: 'outcome5' },
    { locationKey: 'belgie', industryKey: 'ecommerce', outcomeKey: 'outcome6' },
  ];

  // TODO: In future, fetch admin-uploaded logos from Supabase storage
  // For now, this is empty - logos row will be hidden
  const adminLogos: string[] = [];

  return (
    <section 
      id="trusted-belgium" 
      className="py-24 relative overflow-hidden scroll-mt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.02] to-background" />
      <div className="absolute inset-0 neural-bg opacity-10" />
      
      {/* Top gold separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Eyebrow label */}
          <span className="inline-block text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            {t('home.trustedBelgium.eyebrow')}
          </span>
          
          {/* Title */}
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            <span className="gold-gradient-text">
              {t('home.trustedBelgium.title')}
            </span>
          </h2>
          
          {/* Subtitle */}
          <p 
            className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            dir="ltr"
            style={{ unicodeBidi: 'isolate' }}
          >
            {t('home.trustedBelgium.subtitle')}
          </p>
        </motion.div>

        {/* Industry Badge Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <IndustryMarquee />
        </motion.div>

        {/* Gold separator line */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-12" />

        {/* Proof Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10"
        >
          {proofCards.map((card, index) => (
            <ProofCard
              key={index}
              locationKey={card.locationKey}
              industryKey={card.industryKey}
              outcomeKey={card.outcomeKey}
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
          className="text-center text-muted-foreground/60 text-sm italic mb-12"
        >
          {t('home.trustedBelgium.disclaimer')}
        </motion.p>

        {/* Admin Logos Row - Only shown if logos are uploaded */}
        {adminLogos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            {/* Separator */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />
            
            {/* Title */}
            <p className="text-center text-sm text-primary font-medium mb-6 tracking-wide">
              {t('home.trustedBelgium.officialClients')}
            </p>
            
            {/* Logos grid */}
            <div className="flex flex-wrap justify-center gap-6">
              {adminLogos.map((logo, index) => (
                <div
                  key={index}
                  className="w-28 h-14 glass-card flex items-center justify-center p-3 grayscale hover:grayscale-0 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(43_100%_50%/0.15)] transition-all duration-500"
                >
                  <img 
                    src={logo} 
                    alt="Client logo" 
                    className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom gold separator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  );
};

const IndustryMarquee = () => {
  const { t } = useTranslation();

  // Duplicate items for seamless loop
  const items = [...industryBadges, ...industryBadges];

  return (
    <div className="relative overflow-hidden group" dir="ltr">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 group-hover:[animation-play-state:paused]"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 30,
            ease: 'linear',
          },
        }}
      >
        {items.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={`badge-${index}`}
              className="flex-shrink-0 px-5 py-3 rounded-full border border-primary/30 bg-primary/5 flex items-center gap-3 hover:border-primary/60 hover:bg-primary/10 hover:shadow-[0_0_20px_hsl(var(--gold)/0.25)] transition-all duration-300 cursor-default"
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

interface ProofCardProps {
  locationKey: string;
  industryKey: string;
  outcomeKey: string;
  index: number;
}

const ProofCard = ({ locationKey, industryKey, outcomeKey, index }: ProofCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group glass-card p-5 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--gold)/0.15)] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      {/* Location + Industry Row */}
      <div className="flex items-center justify-between mb-3 gap-2">
        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          <span className="text-xs font-semibold text-primary">
            {t(`home.trustedBelgium.locations.${locationKey}`)}
          </span>
        </div>
        <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted/30 border border-primary/10">
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
