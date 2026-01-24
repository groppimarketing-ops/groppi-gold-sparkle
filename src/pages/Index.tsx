import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Video, 
  Globe, 
  Megaphone, 
  Palette,
  Users,
  MapPin,
  Calendar,
  Handshake,
  Brain,
  Heart,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import DynamicSection from '@/components/sections/DynamicSection';
import usePageContent from '@/hooks/usePageContent';
import { socialLinks, trackEvent } from '@/utils/tracking';

const Index = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  // Fetch dynamic content for the home page
  const { sections, getContent, getMediaUrl } = usePageContent({ pageSlug: 'home' });

  // Real services based on GROPPI's actual offerings
  const services = [
    { 
      icon: Video, 
      titleKey: 'home.services.content.title',
      descKey: 'home.services.content.desc',
      gradient: 'from-primary/20 to-amber-500/20' 
    },
    { 
      icon: Globe, 
      titleKey: 'home.services.websites.title',
      descKey: 'home.services.websites.desc',
      gradient: 'from-cyan-500/20 to-teal-500/20' 
    },
    { 
      icon: Megaphone, 
      titleKey: 'home.services.marketing.title',
      descKey: 'home.services.marketing.desc',
      gradient: 'from-purple-500/20 to-blue-500/20' 
    },
    { 
      icon: Palette, 
      titleKey: 'home.services.branding.title',
      descKey: 'home.services.branding.desc',
      gradient: 'from-rose-500/20 to-orange-500/20' 
    },
  ];

  // Real trust highlights based on GROPPI facts
  const trustHighlights = [
    { 
      icon: Calendar, 
      titleKey: 'home.trust.founded.title',
      descKey: 'home.trust.founded.desc'
    },
    { 
      icon: Users, 
      titleKey: 'home.trust.team.title',
      descKey: 'home.trust.team.desc'
    },
    { 
      icon: MapPin, 
      titleKey: 'home.trust.reach.title',
      descKey: 'home.trust.reach.desc'
    },
    { 
      icon: Handshake, 
      titleKey: 'home.trust.partnerships.title',
      descKey: 'home.trust.partnerships.desc'
    },
  ];

  // Only use dynamic content if we have meaningful sections
  const validSectionTypes = ['hero', 'features', 'stats', 'content', 'cta'];
  const hasDynamicContent = sections.length > 0 && 
    sections.some(s => validSectionTypes.includes(s.section_type));

  const handleWhatsAppClick = () => {
    trackEvent({ event: 'whatsapp_click', location: 'home_cta' });
    window.open(socialLinks.whatsapp, '_blank');
  };

  // Render default static content when no dynamic sections exist
  const renderStaticContent = () => (
    <>
      <HeroSection />

      {/* What We Do Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={t('home.whatWeDo.subtitle')}
            title={t('home.whatWeDo.title')}
            description={t('home.whatWeDo.description')}
            showSparkle
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
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
                
                <h3 className="relative font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {t(service.titleKey)}
                </h3>
                
                <p className="relative text-sm text-muted-foreground mb-4">
                  {t(service.descKey)}
                </p>
              </GlassCard>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild className="luxury-button">
              <Link to="/services">
                {t('home.whatWeDo.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why GROPPI Section - Trust Highlights */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-lines opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('home.whyGroppi.subtitle')}
            title={t('home.whyGroppi.title')}
            description={t('home.whyGroppi.description')}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustHighlights.map((item, index) => (
              <GlassCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center py-8 group hover:gold-glow transition-all duration-300"
              >
                <motion.div
                  className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <item.icon className="w-8 h-8 text-primary" />
                </motion.div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {t(item.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(item.descKey)}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-[0.2em] mb-4">
                <Brain className="w-4 h-4" />
                {t('home.approach.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gold-shimmer-text mb-6">
                {t('home.approach.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t('home.approach.text')}
              </p>
              
              {/* Human + AI Tags */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="px-4 py-2 rounded-full glass-card text-sm font-medium text-primary">
                  {t('home.approach.tags.humanExpertise')}
                </span>
                <span className="px-4 py-2 rounded-full glass-card text-sm font-medium text-primary">
                  {t('home.approach.tags.smartTechnology')}
                </span>
                <span className="px-4 py-2 rounded-full glass-card text-sm font-medium text-primary">
                  {t('home.approach.tags.sustainableResults')}
                </span>
              </div>

              <Button asChild className="luxury-button">
                <Link to="/about">
                  {t('home.approach.cta')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Human-first visual representation */}
              <GlassCard className="p-8">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-4 gold-glow">
                      <Heart className="w-10 h-10 text-primary" />
                    </div>
                    <h4 className="font-bold mb-2">{t('home.approach.human.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('home.approach.human.desc')}</p>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h4 className="font-bold mb-2">{t('home.approach.ai.title')}</h4>
                    <p className="text-sm text-muted-foreground">{t('home.approach.ai.desc')}</p>
                  </motion.div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={t('home.featured.subtitle')}
            title={t('home.featured.title')}
            description={t('home.featured.description')}
            showSparkle
          />
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <GlassCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6 hover:gold-glow transition-all duration-300"
            >
              <div className="text-primary font-bold text-xl mb-2">{t('services.packages.starter')}</div>
              <p className="text-sm text-muted-foreground">{t('home.featured.starter')}</p>
            </GlassCard>
            
            <GlassCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-6 hover:gold-glow transition-all duration-300 relative"
            >
              <motion.div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {t('home.featured.popular')}
              </motion.div>
              <div className="text-primary font-bold text-xl mb-2">{t('services.packages.growth')}</div>
              <p className="text-sm text-muted-foreground">{t('home.featured.growth')}</p>
            </GlassCard>
            
            <GlassCard
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-6 hover:gold-glow transition-all duration-300"
            >
              <div className="text-primary font-bold text-xl mb-2">{t('services.packages.pro')}</div>
              <p className="text-sm text-muted-foreground">{t('home.featured.pro')}</p>
            </GlassCard>
          </div>
          
          <div className="text-center mt-10">
            <Button asChild className="glass-button">
              <Link to="/services">
                {t('home.featured.cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
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
            <GlassCard className="max-w-4xl mx-auto text-center p-8 md:p-12 relative overflow-hidden">
              {/* Subtle gold glow animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
              
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-8"
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-shimmer-text relative z-10">
                {t('home.cta.title')}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto relative z-10">
                {t('home.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <Button asChild size="lg" className="luxury-button">
                  <Link to="/contact">
                    {t('home.cta.contact')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  className="glass-button"
                  onClick={handleWhatsAppClick}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('home.cta.whatsapp')}
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
