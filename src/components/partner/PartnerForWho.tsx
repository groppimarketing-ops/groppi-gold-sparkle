import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Building2, 
  TrendingUp, 
  Code, 
  Video, 
  Target, 
  Search,
  Share2
} from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';

const PartnerForWho = () => {
  const { t } = useTranslation();

  const items = [
    { icon: Building2, key: 'bureauOwners' },
    { icon: TrendingUp, key: 'growthMarketeers' },
    { icon: Code, key: 'webStudios' },
    { icon: Video, key: 'contentTeams' },
    { icon: Target, key: 'adsSpecialists' },
    { icon: Search, key: 'seoSpecialists' },
    { icon: Share2, key: 'socialAgencies' },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 neural-bg opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
        <SectionHeader
          subtitle={t('partner.forWho.subtitle')}
          title={t('partner.forWho.title')}
          centered
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          {t('partner.forWho.description')}
        </motion.p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, index) => (
            <GlassCard
              key={item.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group text-center py-6 px-4 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(43_100%_50%/0.15)] transition-all duration-500"
              hover3D={false}
            >
              <motion.div 
                className="w-12 h-12 rounded-xl glass-card flex items-center justify-center mx-auto mb-4 border border-primary/20 group-hover:border-primary/40 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <item.icon className="w-6 h-6 text-primary" />
              </motion.div>
              
              <h3 className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors">
                {t(`partner.forWho.items.${item.key}`)}
              </h3>
            </GlassCard>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground text-sm mt-8 italic"
        >
          {t('partner.forWho.note')}
        </motion.p>
      </div>
    </section>
  );
};

export default PartnerForWho;
