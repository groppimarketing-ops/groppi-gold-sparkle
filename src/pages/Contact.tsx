import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Clock, Send, Loader2, Sparkles, MessageCircle, Smartphone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { trackEvent, socialLinks as socialUrls, contactInfo } from '@/utils/tracking';
import SocialIconsPill from '@/components/shared/SocialIconsPill';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(1000),
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
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            subject: data.subject,
            message: data.message,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error(t('contact.rateLimited', 'Te veel aanvragen. Probeer later opnieuw.'));
        }
        throw new Error(result.error || t('forms.submitError'));
      }

      toast({
        title: t('contact.success'),
        description: t('forms.submitSuccess'),
      });
      reset();

      // GTM conversion tracking
      trackEvent({ event: 'contact_form_submit', location: 'contact_page', label: data.subject });
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'generate_lead',
          currency: 'EUR',
          value: 1,
        });
      }
    } catch (error: any) {
      toast({
        title: t('contact.error'),
        description: error.message || t('forms.submitError'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    { 
      icon: MessageCircle, 
      title: t('social.whatsappChat'),
      action: t('social.actions.chat'),
      href: socialUrls.whatsapp,
      isExternal: true,
      color: 'bg-[#25D366]/15 text-[#25D366] border border-[#25D366]/30',
      iconColor: 'text-[#25D366]',
      event: 'whatsapp_click' as const,
    },
    { 
      icon: Phone, 
      title: t('contact.landline'),
      action: contactInfo.landline,
      href: socialUrls.landline,
      isExternal: false,
      color: 'bg-primary/15 border border-primary/30',
      iconColor: 'text-primary',
      event: 'phone_click' as const,
    },
    { 
      icon: Smartphone, 
      title: t('contact.mobile'),
      action: contactInfo.phone,
      href: socialUrls.phone,
      isExternal: false,
      color: 'bg-primary/15 border border-primary/30',
      iconColor: 'text-primary',
      event: 'phone_click' as const,
    },
    { 
      icon: Mail, 
      title: t('social.emailUs'),
      action: t('social.actions.email'),
      href: socialUrls.email,
      isExternal: false,
      color: 'bg-primary/15 border border-primary/30',
      iconColor: 'text-primary',
      event: 'email_click' as const,
    },
  ];

  const contactInfoItems = [
    { 
      icon: MapPin, 
      title: t('contact.address'), 
      content: contactInfo.address,
      href: 'https://maps.google.com/?q=Het+Steeke+5A,+2330+Merksplas,+Belgium',
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
      <PageSEO
        title={t('contact.title', 'Contact')}
        description={t('contact.description', 'Neem contact op met GROPPI. Bel, mail of chat via WhatsApp. Wij helpen je graag verder.')}
        path="/contact"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: t('nav.contact', 'Contact'), path: '/contact' }]} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
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
      <section className="section-spacing pt-0">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <GlassCard className="p-8 animate-fade-up">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center" aria-hidden="true">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-bold gold-gradient-text">
                  {t('contact.formHeading', 'Send us a message')}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-sm font-medium text-foreground/80">{t('contact.name')}</label>
                    <input
                      id="contact-name"
                      {...register('name')}
                      placeholder={t('contact.name')}
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm" role="alert">{t('validation.required')}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-sm font-medium text-foreground/80">{t('contact.email')}</label>
                    <input
                      id="contact-email"
                      {...register('email')}
                      type="email"
                      placeholder={t('contact.email')}
                      autoComplete="email"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground"
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm" role="alert">{t('validation.email')}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-phone" className="text-sm font-medium text-foreground/80">{t('contact.phone')}</label>
                    <input
                      id="contact-phone"
                      {...register('phone')}
                      placeholder={t('contact.phone')}
                      autoComplete="tel"
                      className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-sm font-medium text-foreground/80">{t('contact.subject')}</label>
                    <input
                      id="contact-subject"
                      {...register('subject')}
                      placeholder={t('contact.subject')}
                      aria-required="true"
                      aria-invalid={!!errors.subject}
                      className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground"
                    />
                    {errors.subject && (
                      <p className="text-destructive text-sm" role="alert">{t('validation.required')}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-sm font-medium text-foreground/80">{t('contact.message')}</label>
                  <textarea
                    id="contact-message"
                    {...register('message')}
                    placeholder={t('contact.message')}
                    rows={5}
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    className="w-full px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent placeholder:text-muted-foreground resize-none"
                  />
                  {errors.message && (
                    <p className="text-destructive text-sm" role="alert">{t('validation.required')}</p>
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                      {t('contact.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                      {t('contact.send')}
                    </>
                  )}
                </Button>
              </form>
            </GlassCard>

            {/* Contact Methods Cards + Info */}
            <div className="space-y-6 animate-fade-up-2">
              {/* Quick Contact Methods */}
              <div className="grid gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.href}
                    target={method.isExternal ? '_blank' : undefined}
                    rel={method.isExternal ? 'noopener noreferrer' : undefined}
                    onClick={() => trackEvent({ event: method.event, location: 'contact_page' })}
                    className="block hover:-translate-y-0.5 hover:scale-[1.01] transition-transform duration-200"
                  >
                    <GlassCard className="flex items-center gap-4 p-5 border border-primary/20 hover:border-primary/40 transition-all duration-300 group cursor-pointer">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${method.color} border border-white/10 shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                        <method.icon className={`w-7 h-7 ${method.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold gold-gradient-text text-lg">{method.title}</h4>
                        <p className="text-muted-foreground text-sm">{method.action}</p>
                      </div>
                      <span className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                        →
                      </span>
                    </GlassCard>
                  </a>
                ))}
              </div>

              {/* Social Media Profiles */}
              <GlassCard className="p-6 border border-primary/20">
                <h4 className="font-semibold gold-gradient-text text-lg mb-4">{t('social.followUs')}</h4>
                <SocialIconsPill 
                  location="header" 
                  iconSize="h-5 w-5"
                  showTooltips={true}
                />
              </GlassCard>

              {/* Additional Contact Info */}
              {contactInfoItems.map((info, index) => (
                    <GlassCard
                      key={index}
                      className="flex items-start gap-4 p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300 group"
                    >
                      <div className="w-14 h-14 rounded-2xl border border-primary/30 bg-primary/15 flex items-center justify-center shrink-0 shadow-lg shadow-primary/10 group-hover:scale-105 transition-transform duration-200">
                    <info.icon className="w-7 h-7 text-primary drop-shadow-[0_0_8px_rgba(218,165,32,0.5)]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 gold-gradient-text text-lg">{info.title}</h4>
                    {info.isLink ? (
                      <a
                        href={info.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 group-hover:text-primary"
                      >
                        {info.content}
                        <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{info.content}</p>
                    )}
                  </div>
                </GlassCard>
              ))}

              {/* Map */}
              <GlassCard className="aspect-video overflow-hidden !p-0 border border-primary/20">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2496.8!2d4.8547!3d51.3547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6db6c5980346f%3A0x5765a23e1f498a36!2sHet%20Steeke%205A%2C%202330%20Merksplas%2C%20Belgium!5e0!3m2!1sen!2sbe!4v1711000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GROPPI Location - Merksplas, Belgium"
                />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
