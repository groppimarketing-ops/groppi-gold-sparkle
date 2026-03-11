import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import LangLink from '@/components/LangLink';
import {
  Globe, FileText, ShoppingCart, Video,
  Search, MapPin, MousePointerClick, BarChart3,
  Palette, Instagram, Film, Sparkles,
  Megaphone, Users, Target, TrendingUp,
  ArrowRight, Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import WaveAnimation from '@/components/effects/WaveAnimation';

interface ServiceItem {
  labelKey: string;
  icon: React.ElementType;
  href: string;
}

interface ServiceColumn {
  titleKey: string;
  services: ServiceItem[];
}

const serviceColumns: ServiceColumn[] = [
  {
    titleKey: 'home.serviceMap.columns.online.title',
    services: [
      { labelKey: 'home.serviceMap.columns.online.services.businessWebsite', icon: Globe, href: '/services#business-website' },
      { labelKey: 'home.serviceMap.columns.online.services.onePage', icon: FileText, href: '/services#one-page-website' },
      { labelKey: 'home.serviceMap.columns.online.services.webshop', icon: ShoppingCart, href: '/services#ecommerce-website' },
      { labelKey: 'home.serviceMap.columns.online.services.visualContent', icon: Video, href: '/services#content-production' },
    ],
  },
  {
    titleKey: 'home.serviceMap.columns.findable.title',
    services: [
      { labelKey: 'home.serviceMap.columns.findable.services.seo', icon: Search, href: '/services#seo' },
      { labelKey: 'home.serviceMap.columns.findable.services.googleBusiness', icon: MapPin, href: '/services#google-business' },
      { labelKey: 'home.serviceMap.columns.findable.services.sea', icon: MousePointerClick, href: '/services#ads-management' },
      { labelKey: 'home.serviceMap.columns.findable.services.dataTracking', icon: BarChart3, href: '/services#analytics' },
    ],
  },
  {
    titleKey: 'home.serviceMap.columns.standout.title',
    services: [
      { labelKey: 'home.serviceMap.columns.standout.services.branding', icon: Palette, href: '/services#branding' },
      { labelKey: 'home.serviceMap.columns.standout.services.socialContent', icon: Instagram, href: '/services#social-media' },
      { labelKey: 'home.serviceMap.columns.standout.services.videoAds', icon: Film, href: '/services#video-ads' },
      { labelKey: 'home.serviceMap.columns.standout.services.creativeCampaigns', icon: Sparkles, href: '/services#campaigns' },
    ],
  },
  {
    titleKey: 'home.serviceMap.columns.attract.title',
    services: [
      { labelKey: 'home.serviceMap.columns.attract.services.adManagement', icon: Megaphone, href: '/services#ads-management' },
      { labelKey: 'home.serviceMap.columns.attract.services.socialManagement', icon: Users, href: '/services#social-media' },
      { labelKey: 'home.serviceMap.columns.attract.services.leadGen', icon: Target, href: '/services#lead-generation' },
      { labelKey: 'home.serviceMap.columns.attract.services.conversionOptimization', icon: TrendingUp, href: '/services#conversion' },
    ],
  },
];

const HomeServiceMap = memo(() => {
  const { t } = useTranslation();

  return (
    <section className="relative py-10 lg:py-24 bg-background overflow-hidden">
      <WaveAnimation />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header — CSS fade-up */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="animate-fade-up inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">
            {t('home.serviceMap.label')}
          </span>
          <h2 className="animate-fade-up-2 text-3xl md:text-4xl lg:text-5xl font-bold mb-4 gold-gradient-text">
            {t('home.serviceMap.title')}
          </h2>
          <p className="animate-fade-up-3 text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('home.serviceMap.subtitle')}
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {serviceColumns.map((column, colIndex) => (
            <div
              key={column.titleKey}
              className={`animate-fade-up-${colIndex + 2} space-y-4`}
            >
              <h3 className="text-lg font-bold text-foreground border-b border-primary/30 pb-3 mb-4">
                {t(column.titleKey)}
              </h3>
              <div className="space-y-1">
                {column.services.map((service) => (
                  <div key={service.labelKey} className="flex items-center gap-3 p-3 rounded-lg">
                    <service.icon className="w-5 h-5 text-primary/70 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{t(service.labelKey)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-up-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="luxury-button min-w-[240px] group">
            <LangLink to="/services">
              {t('home.serviceMap.cta.viewServices')}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </LangLink>
          </Button>
          <Button asChild variant="outline" size="lg" className="glass-button min-w-[240px] group border-primary/30 hover:border-primary/50">
            <LangLink to="/services#calculator">
              <Calculator className="w-4 h-4 mr-2" />
              {t('home.serviceMap.cta.calculatePrice')}
            </LangLink>
          </Button>
        </div>
      </div>
    </section>
  );
});

HomeServiceMap.displayName = 'HomeServiceMap';
export default HomeServiceMap;
