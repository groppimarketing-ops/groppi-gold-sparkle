import { forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LangLink from '@/components/LangLink';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Calendar, Smartphone, Loader2, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import groppiLogo from '@/assets/groppi-logo.png';
import { trackEvent, socialLinks as socialUrls, contactInfo } from '@/utils/tracking';
import SocialIconsPill from '@/components/shared/SocialIconsPill';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

const Footer = forwardRef<HTMLElement>((_, ref) => {
  const { t } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('submit-newsletter', {
        body: { email: newsletterEmail.trim() },
      });

      if (error) throw error;

      if (data?.success) {
        setIsSubscribed(true);
        setNewsletterEmail('');
        toast({
          title: t('footer.newsletter.successTitle'),
          description: t('footer.newsletter.successMessage'),
        });
        trackEvent({ event: 'newsletter_subscribe', location: 'footer' });
      } else {
        throw new Error(data?.error || 'Subscription failed');
      }
    } catch (err: any) {
      const message = err?.message || t('footer.newsletter.errorMessage');
      toast({
        title: t('footer.newsletter.errorTitle'),
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickLinks = [
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/franchise', label: t('nav.franchise') },
    { path: '/careers', label: t('nav.careers') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer ref={ref} className="relative border-t border-primary/20 bg-gradient-to-b from-background to-[hsl(0,0%,2%)]">
      {/* Neural Pattern Overlay */}
      <div className="absolute inset-0 neural-lines opacity-50" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <LangLink to="/" className="inline-block">
              <motion.img
                src={groppiLogo}
                alt="GROPPI Digital Marketing Bureau"
                className="h-[60px] md:h-[70px] lg:h-[80px] w-auto object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </LangLink>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            {/* Social Icons - Same as Header */}
            <SocialIconsPill 
              location="footer" 
              iconSize="h-4 w-4"
              showTooltips={false}
            />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-6 gold-gradient-text">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <LangLink
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </LangLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-bold text-lg mb-6 gold-gradient-text">
              {t('contact.title')}
            </h3>
            <ul className="space-y-4">
              {/* WhatsApp */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0 group-hover:gold-glow transition-all bg-[#25D366]/10">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                </div>
                <a 
                  href={socialUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ event: 'whatsapp_click', location: 'footer' })}
                  className="pt-1 hover:text-primary transition-colors"
                >
                  {t('social.whatsappChat')}
                </a>
              </li>
              {/* Plan a Call */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0 group-hover:gold-glow transition-all bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <a 
                  href={socialUrls.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ event: 'calendly_click', location: 'footer' })}
                  className="pt-1 hover:text-primary transition-colors"
                >
                  {t('footer.planCall')}
                </a>
              </li>
              {/* Address */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0 group-hover:gold-glow transition-all">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="pt-1">{contactInfo.address}</span>
              </li>
              {/* Landline */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0 group-hover:gold-glow transition-all">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <a 
                  href={socialUrls.landline}
                  onClick={() => trackEvent({ event: 'phone_click', location: 'footer' })}
                  className="pt-1 hover:text-primary transition-colors"
                >
                  {contactInfo.landline}
                </a>
              </li>
              {/* Mobile */}
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0 group-hover:gold-glow transition-all">
                  <Smartphone className="h-4 w-4 text-primary" />
                </div>
                <a 
                  href={socialUrls.phone}
                  onClick={() => trackEvent({ event: 'phone_click', location: 'footer' })}
                  className="pt-1 hover:text-primary transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </li>
              {/* Email */}
              <li className="flex items-center gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0 group-hover:gold-glow transition-all">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a 
                  href={socialUrls.email}
                  onClick={() => trackEvent({ event: 'email_click', location: 'footer' })}
                  className="hover:text-primary transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-bold text-lg mb-6 gold-gradient-text">
              {t('footer.newsletter.title')}
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              {t('footer.newsletter.description')}
            </p>
            {isSubscribed ? (
              <div className="flex items-center gap-2 text-sm text-primary">
                <CheckCircle className="h-5 w-5" />
                <span>{t('footer.newsletter.subscribed')}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  required
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent disabled:opacity-50"
                />
                <Button type="submit" disabled={isSubmitting} className="luxury-button !rounded-xl !px-4">
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            )}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} GROPPI Gold Standard. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <LangLink to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t('footer.privacy')}
            </LangLink>
            <LangLink to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t('footer.terms')}
            </LangLink>
          </div>
        </motion.div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;
