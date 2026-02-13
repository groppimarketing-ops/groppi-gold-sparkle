import { useParams, Navigate } from 'react-router-dom';
import LangLink from '@/components/LangLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
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

interface CaseStudyData {
  slug: string;
  image: string;
  tags: string[];
}

const caseStudies: CaseStudyData[] = [
  { slug: 'restaurant-branding', image: restaurantBranding, tags: ['website', 'branding'] },
  { slug: 'mode-webshop', image: modeWebshop, tags: ['ecommerce', 'ads'] },
  { slug: 'b2b-platform', image: b2bPlatform, tags: ['website', 'seo'] },
  { slug: 'bouwbedrijf-website', image: bouwbedrijfWebsite, tags: ['website', 'seo'] },
  { slug: 'influencer-campagne', image: influencerCampagne, tags: ['social', 'content'] },
  { slug: 'tech-startup-branding', image: techStartupBranding, tags: ['branding', 'website'] },
  { slug: 'e-commerce-groei', image: ecommerceGroei, tags: ['ads', 'ecommerce'] },
  { slug: 'content-strategie', image: contentStrategie, tags: ['content', 'social'] },
];

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const caseData = caseStudies.find(c => c.slug === slug);
  const currentIndex = caseStudies.findIndex(c => c.slug === slug);
  const nextCase = caseStudies[(currentIndex + 1) % caseStudies.length];
  const prevCase = caseStudies[(currentIndex - 1 + caseStudies.length) % caseStudies.length];

  if (!caseData) {
    return <Navigate to="/gallery" replace />;
  }

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Image */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src={caseData.image}
            alt={t(`caseStudy.cases.${slug}.title`)}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <LangLink 
                to="/gallery"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('caseStudy.backToPortfolio')}
              </LangLink>
              
              <h1 className="text-3xl md:text-5xl font-bold gold-gradient-text mb-4">
                {t(`caseStudy.cases.${slug}.title`)}
              </h1>
              
              <div className="flex flex-wrap gap-2">
                {caseData.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-primary/40 text-primary bg-background/50 backdrop-blur-sm"
                  >
                    {tagLabels[tag]}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-sm uppercase tracking-wider text-primary font-medium mb-3">
                  {t('caseStudy.challengeLabel')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`caseStudy.cases.${slug}.challenge`)}
                </p>
              </motion.div>

              {/* Approach */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="glass-card p-6 rounded-xl"
              >
                <h3 className="text-sm uppercase tracking-wider text-primary font-medium mb-3">
                  {t('caseStudy.approachLabel')}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`caseStudy.cases.${slug}.approach`)}
                </p>
              </motion.div>

              {/* Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 rounded-xl border-primary/30"
              >
                <h3 className="text-sm uppercase tracking-wider text-primary font-medium mb-3">
                  {t('caseStudy.resultsLabel')}
                </h3>
                <p className="text-xl font-bold gold-gradient-text">
                  {t(`caseStudy.cases.${slug}.result`)}
                </p>
              </motion.div>
            </div>

            {/* Services Used */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <h3 className="text-lg font-semibold mb-4">{t('caseStudy.servicesUsed')}</h3>
              <div className="flex flex-wrap gap-3">
                {caseData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
                  >
                    <Check className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">{tagLabels[tag]}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <LangLink to="/contact">
                  {t('caseStudy.ctaQuote')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </LangLink>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/40 hover:bg-primary/10"
              >
                <LangLink to="/services">
                  {t('caseStudy.ctaServices')}
                </LangLink>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Navigation */}
        <section className="py-12 border-t border-border/40">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <LangLink
                to={`/portfolio/${prevCase.slug}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:block">{t('caseStudy.prevCase')}</span>
              </LangLink>
              
              <LangLink
                to="/gallery"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t('caseStudy.allCases')}
              </LangLink>
              
              <LangLink
                to={`/portfolio/${nextCase.slug}`}
                className="group flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="hidden sm:block">{t('caseStudy.nextCase')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </LangLink>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CaseStudy;
