import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { 
  Target, 
  Eye, 
  Heart, 
  Award, 
  Users, 
  Clock, 
  Sparkles, 
  Globe, 
  Zap,
  Shield,
  Handshake,
  TrendingUp,
  Building2,
  MapPin,
  MessageSquare
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import LangLink from '@/components/LangLink';

const About = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const credibilityPoints = [
    { icon: Clock, key: 'founded' },
    { icon: MapPin, key: 'location' },
    { icon: Globe, key: 'reach' },
    { icon: Users, key: 'team' },
    { icon: Handshake, key: 'partnerships' },
  ];

  const values = [
    { icon: Shield, key: 'transparency' },
    { icon: Award, key: 'quality' },
    { icon: Handshake, key: 'relationships' },
    { icon: TrendingUp, key: 'results' },
    { icon: Heart, key: 'humanFirst' },
  ];

  const timeline = [
    { year: '2016', key: '2016' },
    { year: '2018', key: '2018' },
    { year: '2020', key: '2020' },
    { year: '2023', key: '2023' },
    { year: '2026', key: '2026' },
  ];

  return (
    <PageLayout>
      <PageSEO
        title={t('about.hero.title', 'Over GROPPI')}
        description={t('about.hero.text', 'Leer ons team kennen. GROPPI is een digital marketing bureau in Merksplas, België, dat bedrijven helpt groeien.')}
        path="/about"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: t('nav.about', 'Over ons'), path: '/about' }]} />
      {/* Hero Section - Story Intro */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, hsl(43 100% 50% / 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, hsl(43 100% 50% / 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, hsl(43 100% 50% / 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t('about.hero.badge')}</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gold-gradient-text leading-tight">
              {t('about.hero.title')}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('about.hero.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are - Business Credibility */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={t('about.whoWeAre.subtitle')}
            title={t('about.whoWeAre.title')}
            showSparkle
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {credibilityPoints.map((point, index) => (
              <GlassCard
                key={point.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center py-6 group"
              >
                <motion.div 
                  className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  animate={{
                    boxShadow: [
                      '0 0 15px hsl(43 100% 50% / 0.1)',
                      '0 0 25px hsl(43 100% 50% / 0.2)',
                      '0 0 15px hsl(43 100% 50% / 0.1)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <point.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h4 className="font-semibold text-lg mb-2 group-hover:gold-gradient-text transition-all">
                  {t(`about.whoWeAre.points.${point.key}.title`)}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {t(`about.whoWeAre.points.${point.key}.text`)}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach - Human + Technology */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card mb-4">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{t('about.approach.badge')}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-gradient-text">
                {t('about.approach.title')}
              </h2>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {t('about.approach.text')}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full glass-card text-sm">
                  {t('about.approach.tags.strategy')}
                </span>
                <span className="px-4 py-2 rounded-full glass-card text-sm">
                  {t('about.approach.tags.creativity')}
                </span>
                <span className="px-4 py-2 rounded-full glass-card text-sm">
                  {t('about.approach.tags.technology')}
                </span>
              </div>
            </motion.div>
            
            <GlassCard
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <div className="flex items-start gap-4 mb-6">
                <motion.div 
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center shrink-0"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px hsl(43 100% 50% / 0.2)',
                      '0 0 40px hsl(43 100% 50% / 0.4)',
                      '0 0 20px hsl(43 100% 50% / 0.2)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h4 className="font-semibold mb-1">{t('about.approach.humanExpertise.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('about.approach.humanExpertise.text')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <motion.div 
                  className="w-12 h-12 rounded-xl glass-card flex items-center justify-center shrink-0"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px hsl(43 100% 50% / 0.2)',
                      '0 0 40px hsl(43 100% 50% / 0.4)',
                      '0 0 20px hsl(43 100% 50% / 0.2)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h4 className="font-semibold mb-1">{t('about.approach.aiSupport.title')}</h4>
                  <p className="text-sm text-muted-foreground">{t('about.approach.aiSupport.text')}</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <GlassCard
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-6"
                animate={{ 
                  boxShadow: [
                    '0 0 20px hsl(43 100% 50% / 0.2)',
                    '0 0 40px hsl(43 100% 50% / 0.4)',
                    '0 0 20px hsl(43 100% 50% / 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Target className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 gold-gradient-text">
                {t('about.mission')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.missionText')}
              </p>
            </GlassCard>

            <GlassCard
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <motion.div 
                className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-6"
                animate={{ 
                  boxShadow: [
                    '0 0 20px hsl(43 100% 50% / 0.2)',
                    '0 0 40px hsl(43 100% 50% / 0.4)',
                    '0 0 20px hsl(43 100% 50% / 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                <Eye className="w-8 h-8 text-primary" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 gold-gradient-text">
                {t('about.vision')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.visionText')}
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Growth & Timeline */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-lines opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('about.growth.subtitle')}
            title={t('about.growth.title')}
            showSparkle
          />
          
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent -translate-x-1/2 hidden md:block" />
            
            {timeline.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <GlassCard className="inline-block p-6 w-full md:w-auto">
                    <div className="text-2xl font-bold gold-gradient-text mb-2">
                      {item.year}
                    </div>
                    <h4 className="font-semibold text-lg mb-2">
                      {t(`about.timeline.${item.key}.title`)}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {t(`about.timeline.${item.key}.description`)}
                    </p>
                  </GlassCard>
                </div>
                
                <motion.div 
                  className="w-4 h-4 rounded-full bg-primary shrink-0 z-10 gold-glow hidden md:block"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                />
                
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={t('about.valuesSection.subtitle')}
            title={t('about.valuesSection.title')}
            showSparkle
          />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <GlassCard
                key={value.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden text-center py-8"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.div 
                  className="relative w-14 h-14 rounded-2xl glass-card flex items-center justify-center mx-auto mb-4"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <value.icon className="w-6 h-6 text-primary" />
                </motion.div>
                
                <h4 className="relative font-bold text-lg mb-2 group-hover:gold-gradient-text transition-all">
                  {t(`about.valuesSection.items.${value.key}.title`)}
                </h4>
                
                <p className="relative text-muted-foreground text-sm px-2">
                  {t(`about.valuesSection.items.${value.key}.text`)}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        
        <div className="container mx-auto px-4 relative z-10">
          <GlassCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto p-8 md:p-12 text-center"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 30px hsl(43 100% 50% / 0.1)',
                  '0 0 60px hsl(43 100% 50% / 0.2)',
                  '0 0 30px hsl(43 100% 50% / 0.1)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl pointer-events-none"
            />
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center mx-auto mb-6"
            >
              <MessageSquare className="w-8 h-8 text-primary" />
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4 gold-gradient-text">
              {t('about.cta.title')}
            </h2>
            
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('about.cta.text')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <LangLink to="/contact">
                  {t('about.cta.bookConsultation')}
                </LangLink>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="glass-card border-primary/30 hover:bg-primary/10"
              >
                <LangLink to="/contact">
                  {t('about.cta.contactUs')}
                </LangLink>
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
