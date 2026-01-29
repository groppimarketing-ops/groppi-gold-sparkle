import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, TrendingUp, UtensilsCrossed, ShoppingCart, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/ui/SectionHeader';
import { Badge } from '@/components/ui/badge';

const HomeCaseStudies = () => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      id: 1,
      industryKey: 'restaurant',
      icon: UtensilsCrossed,
      challengeKey: 'case1.challenge',
      solutionKey: 'case1.solution',
      metricKey: 'case1.metric',
      link: '/portfolio/restaurant-branding',
    },
    {
      id: 2,
      industryKey: 'ecommerce',
      icon: ShoppingCart,
      challengeKey: 'case2.challenge',
      solutionKey: 'case2.solution',
      metricKey: 'case2.metric',
      link: '/portfolio/e-commerce-groei',
    },
    {
      id: 3,
      industryKey: 'construction',
      icon: Building2,
      challengeKey: 'case3.challenge',
      solutionKey: 'case3.solution',
      metricKey: 'case3.metric',
      link: '/portfolio/bouwbedrijf-website',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader
          subtitle={t('home.caseStudies.subtitle')}
          title={t('home.caseStudies.title')}
          centered
        />

        {/* Case Studies Grid - 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {caseStudies.map((study, index) => {
            const Icon = study.icon;
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link
                  to={study.link}
                  className="group block glass-card py-8 px-6 h-full cursor-pointer hover:border-primary/50 hover:shadow-[0_0_35px_hsl(var(--gold)/0.18)] hover:-translate-y-2 transition-all duration-300"
                >
                  {/* Industry Badge with Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant="outline"
                      className="border-primary/40 text-primary bg-primary/10"
                    >
                      {t(`home.caseStudies.industries.${study.industryKey}`)}
                    </Badge>
                    <div className="w-10 h-10 rounded-lg glass-card flex items-center justify-center border border-primary/30 group-hover:border-primary/60 group-hover:shadow-[0_0_18px_hsl(var(--gold)/0.25)] transition-all">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>

                  {/* Challenge */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {t('home.caseStudies.challengeLabel')}
                    </p>
                    <p className="text-foreground text-sm">
                      {t(`home.caseStudies.${study.challengeKey}`)}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-6">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      {t('home.caseStudies.solutionLabel')}
                    </p>
                    <p className="text-foreground text-sm">
                      {t(`home.caseStudies.${study.solutionKey}`)}
                    </p>
                  </div>

                  {/* Result Metric - Bold Gold with glow */}
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/30 group-hover:border-primary/60 group-hover:shadow-[0_0_25px_hsl(var(--gold)/0.2)] transition-all">
                    <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
                    <p className="text-primary font-bold text-lg">
                      {t(`home.caseStudies.${study.metricKey}`)}
                    </p>
                  </div>

                  {/* View case CTA */}
                  <div className="mt-4 flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {t('home.portfolio.viewCase')}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-[0_8px_35px_hsl(var(--gold)/0.4)] hover:translate-y-[-2px] transition-all duration-300 text-base px-10 py-6 rounded-xl"
          >
            <Link to="/contact">
              {t('home.caseStudies.cta')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCaseStudies;
