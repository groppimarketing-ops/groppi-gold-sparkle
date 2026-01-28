import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Building2, 
  TrendingUp, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Globe,
  Handshake,
  Sparkles,
  Rocket,
  Target,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';

const Franchise = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const benefits = [
    { icon: Award, title: 'Established Brand', titleAr: 'علامة تجارية راسخة', description: 'Join a century-old legacy.', gradient: 'from-primary/5 to-primary/15' },
    { icon: TrendingUp, title: 'Proven Model', titleAr: 'نموذج مثبت', description: 'Tested business strategies.', gradient: 'from-primary/5 to-primary/15' },
    { icon: Users, title: 'Full Training', titleAr: 'تدريب كامل', description: 'Comprehensive support.', gradient: 'from-primary/5 to-primary/15' },
    { icon: Globe, title: 'Global Network', titleAr: 'شبكة عالمية', description: 'International presence.', gradient: 'from-primary/5 to-primary/15' },
  ];

  const steps = [
    { step: '01', title: 'Initial Inquiry', titleAr: 'الاستفسار المبدئي', description: 'Submit your application.' },
    { step: '02', title: 'Discovery', titleAr: 'الاكتشاف', description: 'Meet our team.' },
    { step: '03', title: 'Review', titleAr: 'المراجعة', description: 'Review documents.' },
    { step: '04', title: 'Launch', titleAr: 'الإطلاق', description: 'Start your journey.' },
  ];

  const requirements = [
    { text: 'Minimum investment of $250,000 - $500,000', textAr: 'استثمار بحد أدنى 250,000$ - 500,000$' },
    { text: 'Strong business acumen and leadership', textAr: 'خبرة قوية في الأعمال ومهارات قيادية' },
    { text: 'Passion for luxury and customer service', textAr: 'شغف بالفخامة وخدمة العملاء' },
    { text: 'Commitment to brand standards', textAr: 'الالتزام بمعايير العلامة التجارية' },
    { text: 'Prime location availability', textAr: 'توفر موقع متميز' },
    { text: 'Long-term partnership dedication', textAr: 'تفاني في الشراكة طويلة الأمد' },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('nav.franchise')}
            title={isRtl ? 'انضم إلى عائلة GROPPI' : 'Join the GROPPI Family'}
            description={isRtl 
              ? 'فرصة امتياز حصرية للانضمام إلى علامة تجارية عريقة.'
              : 'An exclusive franchise opportunity to join a century-old legacy.'
            }
            showSparkle
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={isRtl ? 'لماذا الشراكة معنا' : 'Why Partner With Us'}
            title={isRtl ? 'مزايا الامتياز' : 'Franchise Benefits'}
            showSparkle
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <GlassCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <motion.div 
                  className="relative w-14 h-14 rounded-xl glass-card flex items-center justify-center mb-4"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <benefit.icon className="w-7 h-7 text-primary" />
                </motion.div>
                
                <h3 className="relative font-bold text-lg mb-2 group-hover:gold-gradient-text transition-all">
                  {isRtl ? benefit.titleAr : benefit.title}
                </h3>
                
                <p className="relative text-muted-foreground text-sm">{benefit.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 neural-bg" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={isRtl ? 'كيف يعمل' : 'How It Works'}
            title={isRtl ? 'عملية الامتياز' : 'Franchise Process'}
            showSparkle
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                
                <GlassCard className="text-center">
                  <motion.div 
                    className="text-5xl font-bold gold-shimmer-text mb-4"
                    animate={{ 
                      textShadow: [
                        '0 0 10px hsl(43 100% 50% / 0.3)',
                        '0 0 30px hsl(43 100% 50% / 0.5)',
                        '0 0 10px hsl(43 100% 50% / 0.3)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {step.step}
                  </motion.div>
                  <h3 className="font-bold text-lg mb-2">
                    {isRtl ? step.titleAr : step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-[0.2em] mb-4">
                <Target className="w-4 h-4" />
                {isRtl ? 'المتطلبات' : 'Requirements'}
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold gold-shimmer-text mb-6">
                {isRtl ? 'ما نبحث عنه' : 'What We Look For'}
              </h2>
              
              <p className="text-muted-foreground mb-8">
                {isRtl 
                  ? 'نبحث عن شركاء يشاركوننا شغفنا بالتميز.'
                  : 'We seek partners who share our passion for excellence.'
                }
              </p>
              
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-6 h-6 rounded-full glass-card flex items-center justify-center shrink-0 mt-0.5"
                    >
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </motion.div>
                    <span className="text-foreground">{isRtl ? req.textAr : req.text}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <GlassCard
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <motion.div 
                  className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px hsl(43 100% 50% / 0.2)',
                      '0 0 40px hsl(43 100% 50% / 0.4)',
                      '0 0 20px hsl(43 100% 50% / 0.2)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Handshake className="w-8 h-8 text-primary" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl gold-gradient-text">
                    {isRtl ? 'ابدأ رحلتك' : 'Start Your Journey'}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {isRtl ? 'تواصل معنا اليوم' : 'Get in touch today'}
                  </p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {isRtl 
                  ? 'هل أنت مستعد لتصبح جزءًا من إرث GROPPI؟'
                  : 'Ready to become part of the GROPPI legacy?'
                }
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="luxury-button flex-1">
                  <Link to="/contact">
                    {isRtl ? 'تقدم الآن' : 'Apply Now'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild className="glass-button flex-1">
                  <a href="tel:+201234567890">
                    {isRtl ? 'اتصل بنا' : 'Call Us'}
                  </a>
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <GlassCard
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center p-8 md:p-12"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full glass-card flex items-center justify-center mx-auto mb-8"
            >
              <Rocket className="w-8 h-8 text-primary" />
            </motion.div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gold-shimmer-text">
              {isRtl ? 'هل أنت مستعد للانضمام إلينا؟' : 'Ready to Join Us?'}
            </h2>
            
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              {isRtl 
                ? 'انضم إلى شبكتنا المتنامية من شركاء الامتياز الناجحين.'
                : 'Join our growing network of successful franchise partners.'
              }
            </p>
            
            <Button asChild size="lg" className="luxury-button">
              <Link to="/contact">
                {isRtl ? 'تواصل معنا اليوم' : 'Contact Us Today'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </GlassCard>
        </div>
      </section>
    </PageLayout>
  );
};

export default Franchise;
