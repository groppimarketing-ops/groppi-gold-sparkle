import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Crown, Diamond, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import SectionHeader from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const services = [
    { icon: Crown, title: 'Premium Consulting', titleAr: 'استشارات متميزة' },
    { icon: Diamond, title: 'Luxury Products', titleAr: 'منتجات فاخرة' },
    { icon: Sparkles, title: 'Custom Solutions', titleAr: 'حلول مخصصة' },
    { icon: Star, title: 'VIP Experience', titleAr: 'تجربة VIP' },
  ];

  const stats = [
    { value: '130+', label: isRtl ? 'سنة من التميز' : 'Years of Excellence' },
    { value: '50K+', label: isRtl ? 'عميل سعيد' : 'Happy Customers' },
    { value: '100+', label: isRtl ? 'فريق خبراء' : 'Expert Team' },
    { value: '25+', label: isRtl ? 'دولة' : 'Countries' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />

        {/* Stats Section */}
        <section className="py-16 border-y border-border bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-display font-bold gold-gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <SectionHeader
              subtitle={t('services.subtitle')}
              title={t('services.title')}
              description={t('services.description')}
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {isRtl ? service.titleAr : service.title}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="border-primary/50">
                <Link to="/services">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* About Preview */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <span className="text-primary font-medium text-sm uppercase tracking-wider mb-2 block">
                  {t('about.subtitle')}
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold gold-gradient-text mb-6">
                  {t('about.title')}
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  {t('about.description')}
                </p>
                <Button asChild className="luxury-button">
                  <Link to="/about">
                    {t('blog.readMore')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden border border-border">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                    alt="About Groppi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 p-6 rounded-xl bg-primary text-primary-foreground">
                  <div className="text-4xl font-display font-bold">130+</div>
                  <div className="text-sm opacity-90">{isRtl ? 'سنة من التميز' : 'Years of Excellence'}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 gold-gradient-text">
                {isRtl ? 'هل أنت مستعد لتجربة التميز؟' : 'Ready to Experience Excellence?'}
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                {isRtl 
                  ? 'تواصل معنا اليوم لمناقشة كيف يمكننا مساعدتك في تحقيق أهدافك.'
                  : 'Contact us today to discuss how we can help you achieve your goals.'
                }
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
      </main>
      <Footer />
    </div>
  );
};

export default Index;
