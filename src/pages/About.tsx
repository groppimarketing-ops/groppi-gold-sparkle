import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, Users, Clock } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';

const About = () => {
  const { t } = useTranslation();

  const values = [
    { icon: Award, title: 'Excellence', description: 'We strive for perfection in everything we do.' },
    { icon: Heart, title: 'Integrity', description: 'Honesty and transparency guide our actions.' },
    { icon: Target, title: 'Innovation', description: 'Constantly evolving to meet modern demands.' },
    { icon: Users, title: 'Customer Focus', description: 'Your satisfaction is our top priority.' },
  ];

  const stats = [
    { value: '130+', label: 'Years of Excellence' },
    { value: '50K+', label: 'Happy Customers' },
    { value: '100+', label: 'Expert Team' },
    { value: '25+', label: 'Countries Served' },
  ];

  const timeline = [
    { year: '1891', title: 'Foundation', description: 'Groppi was founded with a vision of excellence.' },
    { year: '1920', title: 'Expansion', description: 'Expanded operations across the Middle East.' },
    { year: '1960', title: 'Innovation', description: 'Introduced modern techniques while preserving tradition.' },
    { year: '2000', title: 'Global Reach', description: 'Became an internationally recognized brand.' },
    { year: '2024', title: 'Digital Era', description: 'Embracing technology to serve customers worldwide.' },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('about.subtitle')}
            title={t('about.title')}
            description={t('about.description')}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border">
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

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-primary">
                {t('about.mission')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.missionText')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-card"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 text-primary">
                {t('about.vision')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('about.visionText')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="Our Journey"
            title="History & Milestones"
          />
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="text-primary font-display font-bold text-xl mb-2">
                    {item.year}
                  </div>
                  <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
                <div className="w-4 h-4 rounded-full bg-primary shrink-0 z-10 gold-glow" />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle="What We Stand For"
            title={t('about.values')}
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display font-semibold text-lg mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
