import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';

const HomeCaseStudies = () => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      id: 1,
      industryKey: 'restaurant',
      challengeKey: 'case1.challenge',
      solutionKey: 'case1.solution',
      metricKey: 'case1.metric',
    },
    {
      id: 2,
      industryKey: 'ecommerce',
      challengeKey: 'case2.challenge',
      solutionKey: 'case2.solution',
      metricKey: 'case2.metric',
    },
    {
      id: 3,
      industryKey: 'construction',
      challengeKey: 'case3.challenge',
      solutionKey: 'case3.solution',
      metricKey: 'case3.metric',
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
          {caseStudies.map((study, index) => (
            <GlassCard
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group py-8 px-6 hover:border-primary/40"
              hover3D={false}
            >
              {/* Industry Badge */}
              <Badge
                variant="outline"
                className="mb-4 border-primary/40 text-primary bg-primary/10"
              >
                {t(`home.caseStudies.industries.${study.industryKey}`)}
              </Badge>

              {/* Challenge */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {t('home.caseStudies.challengeLabel')}
                </p>
                <p className="text-foreground">
                  {t(`home.caseStudies.${study.challengeKey}`)}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  {t('home.caseStudies.solutionLabel')}
                </p>
                <p className="text-foreground">
                  {t(`home.caseStudies.${study.solutionKey}`)}
                </p>
              </div>

              {/* Result Metric - Bold Gold */}
              <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/20">
                <TrendingUp className="w-6 h-6 text-primary flex-shrink-0" />
                <p className="text-primary font-bold text-lg">
                  {t(`home.caseStudies.${study.metricKey}`)}
                </p>
              </div>
            </GlassCard>
          ))}
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_8px_25px_hsl(43_100%_50%/0.25)] hover:translate-y-[-2px] transition-all duration-300"
          >
            <Link to="/gallery">
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
