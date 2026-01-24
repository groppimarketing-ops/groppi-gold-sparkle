import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, ChevronRight, Crown, Diamond, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import SectionHeader from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/button';
import type { PageSection } from '@/types/cms';

interface DynamicSectionProps {
  section: PageSection;
  getContent: (sectionId: string, contentKey: string, fallback?: string) => string;
  getMediaUrl: (sectionId: string, contentKey: string, fallback?: string | null) => string | null;
}

const DynamicSection = forwardRef<HTMLElement, DynamicSectionProps>(({ section, getContent, getMediaUrl }, ref) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const renderHero = () => {
    const title = getContent(section.id, 'title', t('hero.title'));
    const subtitle = getContent(section.id, 'subtitle', t('hero.subtitle'));
    const description = getContent(section.id, 'description', t('hero.description'));
    const bgImage = getMediaUrl(section.id, 'background');

    return (
      <section 
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        style={bgImage ? { backgroundImage: `url(${bgImage})`, backgroundSize: 'cover' } : undefined}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-[0.2em] mb-4">
              <Sparkles className="w-4 h-4" />
              {subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gold-shimmer-text">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="luxury-button">
                <Link to="/contact">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="glass-button">
                <Link to="/gallery">
                  {t('hero.ctaSecondary')}
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  };

  const renderFeatures = () => {
    const title = getContent(section.id, 'title', t('services.title'));
    const subtitle = getContent(section.id, 'subtitle', t('services.subtitle'));
    const description = getContent(section.id, 'description', t('services.description'));

    // Default features if no dynamic content
    const defaultFeatures = [
      { icon: Crown, title: 'Premium Consulting', titleAr: 'استشارات متميزة', gradient: 'from-amber-500/20 to-orange-500/20' },
      { icon: Diamond, title: 'Luxury Products', titleAr: 'منتجات فاخرة', gradient: 'from-cyan-500/20 to-teal-500/20' },
      { icon: Sparkles, title: 'AI Solutions', titleAr: 'حلول الذكاء الاصطناعي', gradient: 'from-purple-500/20 to-blue-500/20' },
      { icon: Star, title: 'VIP Experience', titleAr: 'تجربة VIP', gradient: 'from-yellow-500/20 to-amber-500/20' },
    ];

    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={subtitle}
            title={title}
            description={description}
            showSparkle
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {defaultFeatures.map((feature, index) => (
              <GlassCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <motion.div 
                  className="relative w-14 h-14 rounded-xl glass-card flex items-center justify-center mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <feature.icon className="w-7 h-7 text-primary" />
                </motion.div>
                
                <h3 className="relative font-bold text-lg mb-2 group-hover:gold-gradient-text transition-all">
                  {isRtl ? feature.titleAr : feature.title}
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
    );
  };

  const renderStats = () => {
    const defaultStats = [
      { value: '130+', label: isRtl ? 'سنة من التميز' : 'Years of Excellence' },
      { value: '50K+', label: isRtl ? 'عميل سعيد' : 'Happy Customers' },
      { value: '100+', label: isRtl ? 'فريق خبراء' : 'Expert Team' },
      { value: '25+', label: isRtl ? 'دولة' : 'Countries' },
    ];

    // Try to get dynamic stats from content
    const stats = defaultStats.map((stat, index) => ({
      value: getContent(section.id, `stat_${index}_value`, stat.value),
      label: getContent(section.id, `stat_${index}_label`, stat.label),
    }));

    return (
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-lines opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
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
    );
  };

  const renderContent = () => {
    const title = getContent(section.id, 'title', t('about.title'));
    const subtitle = getContent(section.id, 'subtitle', t('about.subtitle'));
    const description = getContent(section.id, 'description', t('about.description'));
    const image = getMediaUrl(section.id, 'image', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800');

    return (
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
                {subtitle}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gold-shimmer-text mb-6">
                {title}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {description}
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
                  src={image || ''}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    );
  };

  const renderCTA = () => {
    const title = getContent(section.id, 'title', isRtl ? 'هل أنت مستعد لتجربة التميز؟' : 'Ready to Experience Excellence?');
    const description = getContent(section.id, 'description', isRtl 
      ? 'تواصل معنا اليوم لمناقشة كيف يمكننا مساعدتك في تحقيق أهدافك.'
      : 'Contact us today to discuss how we can help you achieve your goals.');

    return (
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
                {title}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                {description}
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
    );
  };

  const renderGallery = () => {
    const title = getContent(section.id, 'title', t('gallery.title'));
    const subtitle = getContent(section.id, 'subtitle', t('gallery.subtitle'));

    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={subtitle}
            title={title}
            showSparkle
          />
          {/* Gallery would be populated with dynamic images */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, index) => (
              <GlassCard
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="aspect-square overflow-hidden"
              >
                <img
                  src={getMediaUrl(section.id, `image_${index}`) || '/placeholder.svg'}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Render based on section type
  switch (section.section_type) {
    case 'hero':
      return renderHero();
    case 'features':
      return renderFeatures();
    case 'stats':
      return renderStats();
    case 'content':
      return renderContent();
    case 'cta':
      return renderCTA();
    case 'gallery':
      return renderGallery();
    default:
      return null;
  }
});

DynamicSection.displayName = 'DynamicSection';

export default DynamicSection;
