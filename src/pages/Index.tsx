import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Crown, Diamond, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/sections/DynamicSection';
import usePageContent from '@/hooks/usePageContent';

const Index = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  // Fetch dynamic content for the home page
  const { sections, getContent, getMediaUrl, isLoading } = usePageContent({ pageSlug: 'home' });

  // Default static content for fallback
  const defaultServices = [
    { icon: Crown, title: 'Premium Consulting', titleAr: 'استشارات متميزة', gradient: 'from-amber-500/20 to-orange-500/20' },
    { icon: Diamond, title: 'Luxury Products', titleAr: 'منتجات فاخرة', gradient: 'from-cyan-500/20 to-teal-500/20' },
    { icon: Sparkles, title: 'AI Solutions', titleAr: 'حلول الذكاء الاصطناعي', gradient: 'from-purple-500/20 to-blue-500/20' },
    { icon: Star, title: 'VIP Experience', titleAr: 'تجربة VIP', gradient: 'from-yellow-500/20 to-amber-500/20' },
  ];

  const defaultStats = [
    { value: '130+', label: isRtl ? 'سنة من التميز' : 'Years of Excellence' },
    { value: '50K+', label: isRtl ? 'عميل سعيد' : 'Happy Customers' },
    { value: '100+', label: isRtl ? 'فريق خبراء' : 'Expert Team' },
    { value: '25+', label: isRtl ? 'دولة' : 'Countries' },
  ];

  // If we have dynamic sections, render them
  const hasDynamicContent = sections.length > 0;

  // Render default static content when no dynamic sections exist
  const renderStaticContent = () => (
    <>
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-lines opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {defaultStats.map((stat, index) => (
              <GlassCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center py-8"
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold gold-shimmer-text mb-2"
                  animate={{ 
                    textShadow: [
                      '0 0 10px hsl(43 100% 50% / 0.3)',
                      '0 0 30px hsl(43 100% 50% / 0.5)',
                      '0 0 10px hsl(43 100% 50% / 0.3)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </GlassCard>
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
            showSparkle
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultServices.map((service, index) => (
              <GlassCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <motion.div 
                  className="relative w-14 h-14 rounded-xl glass-card flex items-center justify-center mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <service.icon className="w-7 h-7 text-primary" />
                </motion.div>
                
                <h3 className="relative font-bold text-lg mb-2 group-hover:gold-gradient-text transition-all">
                  {isRtl ? service.titleAr : service.title}
                </h3>
                
                <ChevronRight className="relative w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="glass-button">
              <Link to="/services">
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-[0.2em] mb-4">
                <Sparkles className="w-4 h-4" />
                {t('about.subtitle')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gold-shimmer-text mb-6">
                {t('about.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
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
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <GlassCard className="aspect-square overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                  alt="About Groppi"
                  className="w-full h-full object-cover"
                />
              </GlassCard>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 -left-6"
              >
                <GlassCard className="!p-4 gold-glow">
                  <div className="text-3xl font-bold gold-gradient-text">130+</div>
                  <div className="text-sm text-muted-foreground">
                    {isRtl ? 'سنة من التميز' : 'Years of Excellence'}
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard className="max-w-4xl mx-auto text-center p-8 md:p-12">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-8"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-shimmer-text">
                {isRtl ? 'هل أنت مستعد لتجربة التميز؟' : 'Ready to Experience Excellence?'}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
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
                <Button asChild size="lg" className="glass-button">
                  <Link to="/franchise">
                    {t('nav.franchise')}
                  </Link>
                </Button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {hasDynamicContent ? (
          // Render dynamic sections from database
          sections.map((section) => (
            <DynamicSection
              key={section.id}
              section={section}
              getContent={getContent}
              getMediaUrl={getMediaUrl}
            />
          ))
        ) : (
          // Fallback to static content
          renderStaticContent()
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
