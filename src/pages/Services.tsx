import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Crown, Diamond, Star, Gem, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/button';

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const services = [
    {
      icon: Crown,
      title: 'Premium Consulting',
      titleAr: 'استشارات متميزة',
      description: 'Expert guidance for your business growth and development.',
      descriptionAr: 'إرشادات خبراء لنمو وتطوير أعمالك.',
      features: ['Strategic Planning', 'Market Analysis', 'Growth Strategy'],
    },
    {
      icon: Diamond,
      title: 'Luxury Products',
      titleAr: 'منتجات فاخرة',
      description: 'Exclusive collection of premium quality products.',
      descriptionAr: 'مجموعة حصرية من المنتجات عالية الجودة.',
      features: ['Handcrafted Items', 'Premium Materials', 'Exclusive Designs'],
    },
    {
      icon: Sparkles,
      title: 'Custom Solutions',
      titleAr: 'حلول مخصصة',
      description: 'Tailored services designed to meet your unique needs.',
      descriptionAr: 'خدمات مصممة خصيصًا لتلبية احتياجاتك الفريدة.',
      features: ['Personalized Service', 'Flexible Options', 'Dedicated Support'],
    },
    {
      icon: Star,
      title: 'VIP Experience',
      titleAr: 'تجربة VIP',
      description: 'Exclusive treatment and premium benefits for our valued clients.',
      descriptionAr: 'معاملة حصرية ومزايا متميزة لعملائنا الكرام.',
      features: ['Priority Access', 'Personal Concierge', 'Exclusive Events'],
    },
    {
      icon: Gem,
      title: 'Investment Opportunities',
      titleAr: 'فرص استثمارية',
      description: 'Premium investment options with excellent returns.',
      descriptionAr: 'خيارات استثمارية متميزة بعوائد ممتازة.',
      features: ['High Returns', 'Secure Investments', 'Expert Management'],
    },
    {
      icon: Award,
      title: 'Excellence Programs',
      titleAr: 'برامج التميز',
      description: 'Comprehensive programs for achieving excellence.',
      descriptionAr: 'برامج شاملة لتحقيق التميز.',
      features: ['Training', 'Certification', 'Recognition'],
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('services.subtitle')}
            title={t('services.title')}
            description={t('services.description')}
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-display font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {isRtl ? service.titleAr : service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {isRtl ? service.descriptionAr : service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button
                  variant="ghost"
                  className="group/btn text-primary hover:text-primary p-0"
                >
                  {t('blog.readMore')}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 gold-gradient-text">
              Ready to Experience Excellence?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today to discuss how we can help you achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="luxury-button">
                <Link to="/contact">
                  {t('hero.ctaSecondary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary/50">
                <Link to="/franchise">
                  {t('nav.franchise')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
