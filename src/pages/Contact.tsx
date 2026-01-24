import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Loader2, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  subject: z.string().min(2, 'Subject must be at least 2 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject,
        message: data.message,
      });

      if (error) throw error;

      toast({
        title: t('contact.success'),
        description: 'We will get back to you soon.',
      });
      reset();
    } catch (error) {
      toast({
        title: t('contact.error'),
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { 
      icon: MapPin, 
      title: t('contact.address'), 
      content: 'Het Steeke 5A, 2330 Merksplas, Belgium',
      href: 'https://maps.google.com/?q=Het+Steeke+5A,+2330+Merksplas,+Belgium',
      isLink: true
    },
    { 
      icon: Phone, 
      title: t('contact.mobileLabel'), 
      content: '+32 494 311 119',
      href: 'tel:+32494311119',
      isLink: true
    },
    { 
      icon: Phone, 
      title: t('contact.officeLabel'), 
      content: '+32 14 63 50 05',
      href: 'tel:+3214635005',
      isLink: true
    },
    { 
      icon: Mail, 
      title: t('contact.emailLabel'), 
      content: 'info@groppi.be',
      href: 'mailto:info@groppi.be',
      isLink: true
    },
    { 
      icon: Clock, 
      title: t('contact.hoursLabel'), 
      content: t('contact.hoursValue'),
      isLink: false
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('contact.subtitle')}
            title={t('contact.title')}
            description={t('contact.description')}
            showSparkle
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <GlassCard
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8"
            >
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center"
                >
                  <Sparkles className="w-5 h-5 text-primary" />
                </motion.div>
                <h3 className="text-2xl font-bold gold-gradient-text">
                  {t('contact.send')}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">{t('contact.name')}</label>
                    <input
                      {...register('name')}
                      placeholder={t('contact.name')}
                      className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">{t('contact.email')}</label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder={t('contact.email')}
                      className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">{t('contact.phone')}</label>
                    <input
                      {...register('phone')}
                      placeholder={t('contact.phone')}
                      className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground/80">{t('contact.subject')}</label>
                    <input
                      {...register('subject')}
                      placeholder={t('contact.subject')}
                      className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground"
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm">{errors.subject.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80">{t('contact.message')}</label>
                  <textarea
                    {...register('message')}
                    placeholder={t('contact.message')}
                    rows={5}
                    className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground resize-none"
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full luxury-button !py-4"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t('contact.send')}
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {contactInfo.map((info, index) => (
                <GlassCard
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                >
                  <motion.div 
                    className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center shrink-0 border border-primary/30 shadow-lg shadow-primary/10"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <info.icon className="w-7 h-7 text-primary drop-shadow-[0_0_8px_rgba(218,165,32,0.5)]" />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 gold-gradient-text text-lg">{info.title}</h4>
                    {info.isLink ? (
                      <motion.a
                        href={info.href}
                        target={info.icon === MapPin ? '_blank' : undefined}
                        rel={info.icon === MapPin ? 'noopener noreferrer' : undefined}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 inline-flex items-center gap-2 group-hover:text-primary"
                        whileHover={{ x: 5 }}
                      >
                        {info.content}
                        <motion.span
                          initial={{ opacity: 0, x: -5 }}
                          whileHover={{ opacity: 1, x: 0 }}
                          className="text-primary"
                        >
                          →
                        </motion.span>
                      </motion.a>
                    ) : (
                      <p className="text-muted-foreground">{info.content}</p>
                    )}
                  </div>
                </GlassCard>
              ))}

              {/* Map */}
              <GlassCard className="aspect-video overflow-hidden !p-0 border border-primary/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2496.8!2d4.8547!3d51.3547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6a9d15e52d8e7%3A0x1!2sHet+Steeke+5A%2C+2330+Merksplas%2C+Belgium!5e0!3m2!1sen!2sbe!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GROPPI Location - Merksplas, Belgium"
                />
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
