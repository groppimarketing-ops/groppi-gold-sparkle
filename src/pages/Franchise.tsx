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
  Briefcase,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/button';

const Franchise = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const benefits = [
    {
      icon: Award,
      title: 'Established Brand',
      titleAr: 'علامة تجارية راسخة',
      description: 'Join a century-old legacy of excellence and luxury.',
      descriptionAr: 'انضم إلى إرث من التميز والفخامة يمتد لأكثر من قرن.',
    },
    {
      icon: TrendingUp,
      title: 'Proven Business Model',
      titleAr: 'نموذج أعمال مثبت',
      description: 'Benefit from our tested and successful business strategies.',
      descriptionAr: 'استفد من استراتيجيات الأعمال الناجحة والمجربة لدينا.',
    },
    {
      icon: Users,
      title: 'Comprehensive Training',
      titleAr: 'تدريب شامل',
      description: 'Full training and ongoing support for you and your team.',
      descriptionAr: 'تدريب كامل ودعم مستمر لك ولفريقك.',
    },
    {
      icon: Globe,
      title: 'Global Network',
      titleAr: 'شبكة عالمية',
      description: 'Access to our international network of partners and suppliers.',
      descriptionAr: 'الوصول إلى شبكتنا الدولية من الشركاء والموردين.',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Initial Inquiry',
      titleAr: 'الاستفسار المبدئي',
      description: 'Submit your application and express your interest.',
      descriptionAr: 'قدم طلبك وعبر عن اهتمامك.',
    },
    {
      step: '02',
      title: 'Discovery Meeting',
      titleAr: 'اجتماع الاكتشاف',
      description: 'Meet our team to learn more about the opportunity.',
      descriptionAr: 'قابل فريقنا لمعرفة المزيد عن الفرصة.',
    },
    {
      step: '03',
      title: 'Business Review',
      titleAr: 'مراجعة الأعمال',
      description: 'Review the franchise disclosure document and financials.',
      descriptionAr: 'مراجعة وثيقة الإفصاح عن الامتياز والبيانات المالية.',
    },
    {
      step: '04',
      title: 'Agreement & Launch',
      titleAr: 'الاتفاقية والإطلاق',
      description: 'Sign the agreement and start your journey to success.',
      descriptionAr: 'وقع الاتفاقية وابدأ رحلتك نحو النجاح.',
    },
  ];

  const requirements = [
    'Minimum investment of $250,000 - $500,000',
    'Strong business acumen and leadership skills',
    'Passion for luxury and customer service',
    'Commitment to brand standards and values',
    'Prime location in a high-traffic area',
    'Dedication to long-term partnership',
  ];

  const requirementsAr = [
    'استثمار بحد أدنى 250,000$ - 500,000$',
    'خبرة قوية في الأعمال ومهارات قيادية',
    'شغف بالفخامة وخدمة العملاء',
    'الالتزام بمعايير وقيم العلامة التجارية',
    'موقع متميز في منطقة ذات حركة مرورية عالية',
    'تفاني في الشراكة طويلة الأمد',
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('nav.franchise')}
            title={isRtl ? 'انضم إلى عائلة غروبي' : 'Join the Groppi Family'}
            description={isRtl 
              ? 'فرصة امتياز حصرية للانضمام إلى علامة تجارية تمتد لأكثر من قرن من التميز والفخامة.'
              : 'An exclusive franchise opportunity to join a century-old legacy of excellence and luxury.'
            }
          />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={isRtl ? 'لماذا الشراكة معنا' : 'Why Partner With Us'}
            title={isRtl ? 'مزايا الامتياز' : 'Franchise Benefits'}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-border bg-background hover:border-primary/50 transition-colors group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">
                  {isRtl ? benefit.titleAr : benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {isRtl ? benefit.descriptionAr : benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            subtitle={isRtl ? 'كيف يعمل' : 'How It Works'}
            title={isRtl ? 'عملية الامتياز' : 'Franchise Process'}
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border" />
                )}
                <div className="text-5xl font-display font-bold gold-gradient-text mb-4">
                  {step.step}
                </div>
                <h3 className="font-display font-bold text-xl mb-2">
                  {isRtl ? step.titleAr : step.title}
                </h3>
                <p className="text-muted-foreground">
                  {isRtl ? step.descriptionAr : step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-medium text-sm uppercase tracking-wider mb-2 block">
                {isRtl ? 'المتطلبات' : 'Requirements'}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold gold-gradient-text mb-6">
                {isRtl ? 'ما نبحث عنه' : 'What We Look For'}
              </h2>
              <p className="text-muted-foreground mb-8">
                {isRtl 
                  ? 'نبحث عن شركاء يشاركوننا شغفنا بالتميز ولديهم الموارد والتفاني للنجاح.'
                  : 'We seek partners who share our passion for excellence and have the resources and dedication to succeed.'
                }
              </p>
              <ul className="space-y-4">
                {(isRtl ? requirementsAr : requirements).map((req, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{req}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-background"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Handshake className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl">
                    {isRtl ? 'ابدأ رحلتك' : 'Start Your Journey'}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {isRtl ? 'تواصل معنا اليوم' : 'Get in touch with us today'}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mb-6">
                {isRtl 
                  ? 'هل أنت مستعد لتصبح جزءًا من إرث غروبي؟ تواصل معنا لمعرفة المزيد عن فرص الامتياز.'
                  : 'Ready to become part of the Groppi legacy? Contact us to learn more about franchise opportunities.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="luxury-button flex-1">
                  <Link to="/contact">
                    {isRtl ? 'تقدم الآن' : 'Apply Now'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-primary/50 flex-1">
                  <a href="tel:+201234567890">
                    {isRtl ? 'اتصل بنا' : 'Call Us'}
                  </a>
                </Button>
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
              {isRtl ? 'هل أنت مستعد للانضمام إلينا؟' : 'Ready to Join Us?'}
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              {isRtl 
                ? 'انضم إلى شبكتنا المتنامية من شركاء الامتياز الناجحين حول العالم.'
                : 'Join our growing network of successful franchise partners around the world.'
              }
            </p>
            <Button asChild size="lg" className="luxury-button">
              <Link to="/contact">
                {isRtl ? 'تواصل معنا اليوم' : 'Contact Us Today'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Franchise;
