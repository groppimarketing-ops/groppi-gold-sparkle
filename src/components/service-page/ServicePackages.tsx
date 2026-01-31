import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface ServicePackagesProps {
  serviceKey: string;
}

interface PackageConfig {
  id: 'starter' | 'growth' | 'pro';
  featured?: boolean;
}

const packages: PackageConfig[] = [
  { id: 'starter' },
  { id: 'growth', featured: true },
  { id: 'pro' },
];

const ServicePackages = memo(({ serviceKey }: ServicePackagesProps) => {
  const { t } = useTranslation();

  return (
    <section id="section-pricing" className="relative py-16 lg:py-24 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-primary/[0.04] to-primary/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4"
          >
            {t('servicePage.packages.label')}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold gold-gradient-text mb-4"
          >
            {t('servicePage.packages.title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {t('servicePage.packages.subtitle')}
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {packages.map((pkg, index) => {
            const features = [1, 2, 3, 4, 5].map(i => 
              t(`servicePage.${serviceKey}.packages.${pkg.id}.feature${i}`)
            );

            return (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass-card p-6 rounded-2xl ${
                  pkg.featured 
                    ? 'border-primary/50 shadow-[0_0_40px_hsl(var(--primary)/0.2)] scale-[1.02]' 
                    : 'border-primary/10 hover:border-primary/30'
                } transition-all duration-300`}
              >
                {/* Featured Badge */}
                {pkg.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 font-semibold">
                      <Star className="w-3 h-3 mr-1" />
                      {t('servicePage.packages.popular')}
                    </Badge>
                  </div>
                )}

                {/* Package Header */}
                <div className="text-center pb-6 border-b border-primary/10 mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {t(`servicePage.packages.${pkg.id}.name`)}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t(`servicePage.${serviceKey}.packages.${pkg.id}.description`)}
                  </p>
                  
                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-primary">
                      {t(`servicePage.${serviceKey}.packages.${pkg.id}.price`)}
                    </span>
                    <span className="text-sm text-muted-foreground ml-1">
                      / {t('servicePage.packages.perMonth')}
                    </span>
                  </div>

                  {/* Setup Fee */}
                  <p className="text-xs text-muted-foreground">
                    {t('servicePage.packages.setupFee')}: {t(`servicePage.${serviceKey}.packages.${pkg.id}.setup`)}
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button 
                  asChild 
                  className={`w-full ${pkg.featured ? 'luxury-button' : 'glass-button border-primary/30'}`}
                  variant={pkg.featured ? 'default' : 'outline'}
                >
                  <Link to={`/contact?service=${serviceKey}&package=${pkg.id}`}>
                    {t('servicePage.packages.choosePlan')}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Plan CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-4">
            {t('servicePage.packages.customNote')}
          </p>
          <Button asChild variant="link" className="text-primary hover:text-primary/80">
            <Link to="/contact">
              {t('servicePage.packages.customCta')}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
});

ServicePackages.displayName = 'ServicePackages';

export default ServicePackages;
