import { useTranslation } from 'react-i18next';
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
    <section className="py-20 relative overflow-hidden" dir="ltr">
      <div className="absolute inset-0 neural-bg opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10 max-w-[1100px]">
        <SectionHeader
          subtitle={t('partner.forWho.subtitle')}
          title={t('partner.forWho.title')}
          centered
        />
        
        <p
          className="animate-fade-up text-center text-muted-foreground max-w-2xl mx-auto mb-12"
          dir="ltr"
          style={{ unicodeBidi: 'isolate' }}
        >
          {t('partner.forWho.description')}
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((item, index) => (
            <GlassCard
              key={item.key}
              className={`group text-center py-6 px-4 hover:border-primary/40 hover:shadow-[0_0_20px_hsl(43_100%_50%/0.15)] transition-all duration-500 animate-fade-up-${Math.min(index + 1, 4)}`}
              hover3D={false}
            >
              <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center mx-auto mb-4 border border-primary/20 group-hover:border-primary/40 group-hover:scale-105 transition-all duration-200">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 
                className="font-semibold text-sm md:text-base group-hover:text-primary transition-colors"
                dir="ltr"
                style={{ unicodeBidi: 'isolate' }}
              >
                {t(`partner.forWho.items.${item.key}`)}
              </h3>
            </GlassCard>
          ))}
        </div>

        <p
          className="animate-fade-up text-center text-muted-foreground text-sm mt-8 italic"
          dir="ltr"
          style={{ unicodeBidi: 'isolate' }}
        >
          {t('partner.forWho.note')}
        </p>
      </div>
    </section>
  );
};

export default PartnerForWho;
