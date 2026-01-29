import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/badge';

// Import portfolio images
import restaurantBranding from '@/assets/portfolio/restaurant-branding.jpg';
import modeWebshop from '@/assets/portfolio/mode-webshop.jpg';
import b2bPlatform from '@/assets/portfolio/b2b-platform.jpg';
import bouwbedrijfWebsite from '@/assets/portfolio/bouwbedrijf-website.jpg';
import influencerCampagne from '@/assets/portfolio/influencer-campagne.jpg';
import techStartupBranding from '@/assets/portfolio/tech-startup-branding.jpg';
import ecommerceGroei from '@/assets/portfolio/e-commerce-groei.jpg';
import contentStrategie from '@/assets/portfolio/content-strategie.jpg';

interface Project {
  slug: string;
  tags: string[];
  image: string;
}

const projects: Project[] = [
  { slug: 'restaurant-branding', tags: ['website', 'branding'], image: restaurantBranding },
  { slug: 'mode-webshop', tags: ['ecommerce', 'ads'], image: modeWebshop },
  { slug: 'b2b-platform', tags: ['website', 'seo'], image: b2bPlatform },
  { slug: 'bouwbedrijf-website', tags: ['website', 'seo'], image: bouwbedrijfWebsite },
  { slug: 'influencer-campagne', tags: ['social', 'content'], image: influencerCampagne },
  { slug: 'tech-startup-branding', tags: ['branding', 'website'], image: techStartupBranding },
  { slug: 'e-commerce-groei', tags: ['ads', 'ecommerce'], image: ecommerceGroei },
  { slug: 'content-strategie', tags: ['content', 'social'], image: contentStrategie },
];

const HomePortfolioGrid = () => {
  const { t } = useTranslation();

  const tagLabels: Record<string, string> = {
    website: t('home.portfolio.tags.website'),
    branding: t('home.portfolio.tags.branding'),
    ads: t('home.portfolio.tags.ads'),
    social: t('home.portfolio.tags.social'),
    ecommerce: t('home.portfolio.tags.ecommerce'),
    seo: t('home.portfolio.tags.seo'),
    content: t('home.portfolio.tags.content'),
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 neural-bg opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          subtitle={t('home.portfolio.subtitle')}
          title={t('home.portfolio.title')}
          centered
        />

        {/* Projects Grid - 4 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/portfolio/${project.slug}`}
                className="group block glass-card p-0 overflow-hidden rounded-xl border border-border/50 hover:border-primary/50 hover:shadow-[0_0_35px_hsl(43_100%_50%/0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={t(`home.portfolio.projects.${project.slug}.title`)}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  
                  {/* Hover overlay with gold tint */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />

                  {/* View case overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-4 py-2 rounded-full bg-primary/90 text-primary-foreground text-sm font-medium flex items-center gap-2 shadow-[0_0_20px_hsl(43_100%_50%/0.4)]">
                      {t('home.portfolio.viewCase')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {t(`home.portfolio.projects.${project.slug}.title`)}
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-[10px] px-2 py-0.5 border-primary/30 text-primary/80 group-hover:border-primary/50"
                      >
                        {tagLabels[tag]}
                      </Badge>
                    ))}
                  </div>

                  {/* Result metric */}
                  <p className="text-primary font-medium text-sm">
                    {t(`home.portfolio.projects.${project.slug}.metric`)}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View Full Portfolio CTA - More prominent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_30px_hsl(43_100%_50%/0.35)] hover:translate-y-[-2px] transition-all duration-300 text-base px-10 py-6"
          >
            <Link to="/gallery">
              {t('home.portfolio.viewAll')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomePortfolioGrid;
