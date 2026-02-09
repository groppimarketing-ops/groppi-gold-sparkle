import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Country data with unique client counts and sectors per country
const countryData = [
  {
    key: 'belgium',
    flag: '🇧🇪',
    clientCount: '30+',
    sectors: ['restaurants', 'localServices', 'beauty', 'retail', 'medical'],
  },
  {
    key: 'netherlands',
    flag: '🇳🇱',
    clientCount: '20+',
    sectors: ['ecommerce', 'interior', 'sme', 'retail'],
  },
  {
    key: 'germany',
    flag: '🇩🇪',
    clientCount: '15+',
    sectors: ['sme', 'realEstate', 'localServices'],
  },
  {
    key: 'france',
    flag: '🇫🇷',
    clientCount: '12+',
    sectors: ['beauty', 'ecommerce', 'restaurants'],
  },
  {
    key: 'luxembourg',
    flag: '🇱🇺',
    clientCount: '8+',
    sectors: ['realEstate', 'medical', 'sme'],
  },
  {
    key: 'uk',
    flag: '🇬🇧',
    clientCount: '18+',
    sectors: ['ecommerce', 'sme', 'localServices'],
  },
  {
    key: 'switzerland',
    flag: '🇨🇭',
    clientCount: '10+',
    sectors: ['medical', 'realEstate', 'beauty'],
  },
  {
    key: 'italy',
    flag: '🇮🇹',
    clientCount: '5+',
    sectors: ['restaurants', 'beauty', 'retail'],
  },
  {
    key: 'usa',
    flag: '🇺🇸',
    clientCount: '7+',
    sectors: ['ecommerce', 'startups', 'professionalServices', 'localServices'],
  },
];

const HomeTrustedBelgium = memo(() => {
  const { t } = useTranslation();

  return (
    <section 
      id="trusted-belgium" 
      className="section-spacing relative overflow-hidden scroll-mt-20"
    >
      {/* Top gold separator */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10" />

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
          
          {/* Europe-wide credibility line */}
          <p className="text-primary/80 text-sm font-medium mt-3 tracking-wide">
            {t('home.trustedBelgium.europeCredibility')}
          </p>
        </motion.div>

        {/* Country Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10"
        >
          {countryData.map((country, index) => (
            <CountryCard
              key={country.key}
              countryKey={country.key}
              flag={country.flag}
              clientCount={country.clientCount}
              sectors={country.sectors}
              index={index}
            />
          ))}
        </motion.div>

        {/* NDA Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center space-y-1 mb-12"
        >
          <p className="text-muted-foreground/60 text-sm italic">
            {t('home.trustedBelgium.disclaimer')}
          </p>
        </motion.div>
      </div>

      {/* Bottom gold separator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-10" />
    </section>
  );
});

HomeTrustedBelgium.displayName = 'HomeTrustedBelgium';

interface CountryCardProps {
  countryKey: string;
  flag: string;
  clientCount: string;
  sectors: string[];
  index: number;
}

const CountryCard = ({ countryKey, flag, clientCount, sectors, index }: CountryCardProps) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group glass-card p-5 hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--gold)/0.15)] hover:-translate-y-1 transition-all duration-500"
    >
      {/* Country Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl" role="img" aria-label={countryKey}>
            {flag}
          </span>
          <span className="text-base font-semibold text-foreground">
            {t(`home.trustedBelgium.countries.${countryKey}`)}
          </span>
        </div>
      </div>

      {/* Client Count Badge */}
      <div className="mb-4">
        <Badge 
          variant="outline" 
          className="border-primary/40 bg-primary/10 text-primary font-semibold px-3 py-1"
        >
          {clientCount} {t('home.trustedBelgium.activeClients')}
        </Badge>
      </div>

      {/* Sectors Label */}
      <p className="text-xs text-muted-foreground mb-2 font-medium">
        {t('home.trustedBelgium.sectorsWeServe')}
      </p>

      {/* Sector Chips */}
      <div className="flex flex-wrap gap-1.5">
        {sectors.map((sectorKey) => (
          <span
            key={sectorKey}
            className="text-xs px-2 py-0.5 rounded-full bg-muted/40 border border-primary/10 text-muted-foreground"
          >
            {t(`home.trustedBelgium.sectors.${sectorKey}`)}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default HomeTrustedBelgium;
