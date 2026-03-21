import { useTranslation } from 'react-i18next';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import {
  Target, Eye, Heart, Award, Users, Clock, Sparkles, Globe, Zap,
  Shield, Handshake, TrendingUp, Building2, MapPin, MessageSquare,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import LangLink from '@/components/LangLink';

const About = () => {
  const { t } = useTranslation();

  const credibilityPoints = [
    { icon: Clock,     key: 'founded'      },
    { icon: MapPin,    key: 'location'     },
    { icon: Globe,     key: 'reach'        },
    { icon: Users,     key: 'team'         },
    { icon: Handshake, key: 'partnerships' },
  ];

  const values = [
    { icon: Shield,     key: 'transparency' },
    { icon: Award,      key: 'quality'      },
    { icon: Handshake,  key: 'relationships'},
    { icon: TrendingUp, key: 'results'      },
    { icon: Heart,      key: 'humanFirst'   },
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

      {/* ─── Hero ─── */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        {/* CSS radial pulse — replaces framer-motion animated background */}
        <div className="about-hero-glow absolute inset-0 opacity-20 pointer-events-none" />
        <div className="neural-lines opacity-30" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="animate-fade-up max-w-4xl mx-auto text-center">
            <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">{t('about.hero.badge')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gold-gradient-text leading-tight">
              {t('about.hero.title')}
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              {t('about.hero.text')}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Who We Are ─── */}
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
                className={`animate-fade-up-${index + 1} text-center py-6 group`}
                hover3D={false}
                glowOnHover={false}
              >
                {/* CSS icon glow pulse — replaces framer-motion animate boxShadow */}
                <div className="icon-glow-pulse w-14 h-14 rounded-2xl glass-card flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <point.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
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

      {/* ─── Our Approach ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />

        {/* CSS floating dots — replaces framer-motion animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary/30 about-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3.5 + i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
            <div className="animate-fade-up">
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
                {(['strategy', 'creativity', 'technology'] as const).map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full glass-card text-sm">
                    {t(`about.approach.tags.${tag}`)}
                  </span>
                ))}
              </div>
            </div>

            <GlassCard className="animate-fade-up-2 p-8" hover3D={false} glowOnHover={false}>
              {(['humanExpertise', 'aiSupport'] as const).map((key, i) => (
                <div key={key} className={`flex items-start gap-4 ${i > 0 ? 'mt-6' : ''}`}>
                  <div className="icon-glow-pulse w-12 h-12 rounded-xl glass-card flex items-center justify-center shrink-0">
                    {key === 'humanExpertise'
                      ? <Users className="w-6 h-6 text-primary" />
                      : <Sparkles className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{t(`about.approach.${key}.title`)}</h4>
                    <p className="text-sm text-muted-foreground">{t(`about.approach.${key}.text`)}</p>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {([
              { icon: Target, titleKey: 'about.mission', textKey: 'about.missionText', delay: '1' },
              { icon: Eye,    titleKey: 'about.vision',  textKey: 'about.visionText',  delay: '2' },
            ] as const).map(({ icon: Icon, titleKey, textKey, delay }) => (
              <GlassCard
                key={titleKey}
                className={`animate-fade-up-${delay} p-8`}
                hover3D={false}
                glowOnHover={false}
              >
                <div className="icon-glow-pulse w-16 h-16 rounded-2xl glass-card flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 gold-gradient-text">{t(titleKey)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(textKey)}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Growth & Timeline ─── */}
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

            {timeline.map((item, index) => {
              const stagger = Math.min(index + 1, 10);
              return (
                <div
                  key={item.key}
                  className={`animate-fade-up-${stagger} relative flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <GlassCard className="inline-block p-6 w-full md:w-auto" hover3D={false} glowOnHover={false}>
                      <div className="text-2xl font-bold gold-gradient-text mb-2">{item.year}</div>
                      <h4 className="font-semibold text-lg mb-2">
                        {t(`about.timeline.${item.key}.title`)}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {t(`about.timeline.${item.key}.description`)}
                      </p>
                    </GlassCard>
                  </div>

                  {/* Timeline dot — CSS pulse replaces framer-motion scale animation */}
                  <div
                    className="timeline-dot w-4 h-4 rounded-full bg-primary shrink-0 z-10 gold-glow hidden md:block"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />

                  <div className="flex-1 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Values ─── */}
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
                className={`animate-fade-up-${index + 1} group relative overflow-hidden text-center py-8`}
                hover3D={false}
                glowOnHover={false}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative w-14 h-14 rounded-2xl glass-card flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>

                <h4 className="relative font-bold text-lg mb-2 group-hover:text-primary transition-colors">
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

      {/* ─── Team link ─── */}
      <section className="pb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="animate-fade-up text-muted-foreground text-lg">
            {t('about.teamLink.text', 'Meet our leadership and global team on the')}{' '}
            <LangLink to="/team" className="text-primary font-semibold hover:underline underline-offset-4 transition-colors">
              {t('about.teamLink.linkLabel', 'Our Team page')}
            </LangLink>
            .
          </p>
        </div>
      </section>

      {/* ─── Closing CTA ─── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />

        <div className="container mx-auto px-4 relative z-10">
          <GlassCard
            className="animate-fade-up max-w-3xl mx-auto p-8 md:p-12 text-center relative"
            hover3D={false}
            glowOnHover={false}
          >
            {/* CSS border glow — replaces framer-motion animate boxShadow */}
            <div className="about-cta-glow absolute inset-0 rounded-2xl pointer-events-none" />

            <div className="relative w-16 h-16 rounded-2xl glass-card flex items-center justify-center mx-auto mb-6 group-hover:scale-105 transition-transform duration-300">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 gold-gradient-text">
              {t('about.cta.title')}
            </h2>

            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t('about.cta.text')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <LangLink to="/contact">{t('about.cta.bookConsultation')}</LangLink>
              </Button>
              <Button asChild variant="outline" size="lg" className="glass-card border-primary/30 hover:bg-primary/10">
                <LangLink to="/contact">{t('about.cta.contactUs')}</LangLink>
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
