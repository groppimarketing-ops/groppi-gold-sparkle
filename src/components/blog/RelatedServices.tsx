import { useTranslation } from 'react-i18next';
import LangLink from '@/components/LangLink';
import { ArrowRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

// Maps blog article slugs to relevant service slugs
const ARTICLE_SERVICE_MAP: Record<string, string[]> = {
  'website-strongest-sales-tool-2025': ['business-website', 'one-page-website', 'seo'],
  'social-media-management-what-businesses-need': ['social-media-management', 'visual-content-video', 'advertising-management'],
  'seo-explained-simply': ['seo', 'business-website', 'reputation-management'],
  'paid-advertising-without-waste': ['advertising-management', 'seo', 'social-media-management'],
  'online-reputation-why-reviews-matter': ['reputation-management', 'seo', 'social-media-management'],
};

// Maps service slugs to i18n title keys
const SERVICE_TITLE_MAP: Record<string, string> = {
  'business-website': 'services.items.businessWebsite.title',
  'one-page-website': 'services.items.onePage.title',
  'seo': 'services.items.seo.title',
  'social-media-management': 'services.items.social.title',
  'visual-content-video': 'services.items.contentProduction.title',
  'advertising-management': 'services.items.ads.title',
  'reputation-management': 'services.items.reputation.title',
  'webshop': 'services.items.ecommerce.title',
};

// Fallback short labels per slug
const SERVICE_FALLBACK: Record<string, string> = {
  'business-website': 'Business Website',
  'one-page-website': 'One-Page Website',
  'seo': 'SEO',
  'social-media-management': 'Social Media',
  'visual-content-video': 'Visual Content & Video',
  'advertising-management': 'Google & Meta Ads',
  'reputation-management': 'Reputatiebeheer',
  'webshop': 'Webshop',
};

interface RelatedServicesProps {
  articleSlug: string;
}

const RelatedServices = ({ articleSlug }: RelatedServicesProps) => {
  const { t } = useTranslation();
  const serviceSlugs = ARTICLE_SERVICE_MAP[articleSlug];

  if (!serviceSlugs || serviceSlugs.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-primary/20">
      <h3 className="text-lg font-bold mb-4 gold-gradient-text">
        {t('blog.relatedServices')}
      </h3>
      <div className="grid sm:grid-cols-3 gap-3">
        {serviceSlugs.map((slug) => {
          const title = t(SERVICE_TITLE_MAP[slug] || '', SERVICE_FALLBACK[slug] || slug);
          return (
            <LangLink key={slug} to={`/services/${slug}`}>
              <GlassCard className="!p-4 hover:border-primary/50 transition-colors group">
                <span className="text-sm font-medium group-hover:text-primary transition-colors flex items-center justify-between">
                  {title}
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </GlassCard>
            </LangLink>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedServices;
