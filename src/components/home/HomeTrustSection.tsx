import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Handshake } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';

const HomeTrustSection = () => {
  const { t } = useTranslation();

  const trustItems = [
    {
      icon: Calendar,
      titleKey: 'home.trustSection.items.founded.title',
      descKey: 'home.trustSection.items.founded.desc',
    },
    {
      icon: Users,
      titleKey: 'home.trustSection.items.team.title',
      descKey: 'home.trustSection.items.team.desc',
    },
    {
      icon: MapPin,
      titleKey: 'home.trustSection.items.reach.title',
      descKey: 'home.trustSection.items.reach.desc',
    },
    {
      icon: Handshake,
      titleKey: 'home.trustSection.items.partnerships.title',
      descKey: 'home.trustSection.items.partnerships.desc',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group text-center py-8 px-6 hover:border-primary/40 transition-all duration-500"
            >
              {/* Hover glow - gold only */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                whileHover={{
                  boxShadow: '0 0 40px hsl(43 100% 50% / 0.15)',
                }}
              />
              
              <motion.div
                className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-4 border border-primary/30"
                whileHover={{ scale: 1.1 }}
              >
                <item.icon className="w-8 h-8 text-primary" />
              </motion.div>
              
              <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                {t(item.titleKey)}
              </h3>
              
              <p className="text-sm text-muted-foreground">
                {t(item.descKey)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTrustSection;
