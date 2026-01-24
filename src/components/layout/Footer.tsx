import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import groppiLogo from '@/assets/groppi-logo.png';

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ];

  const quickLinks = [
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/franchise', label: t('nav.franchise') },
    { path: '/contact', label: t('nav.contact') },
  ];

  return (
    <footer className="relative border-t border-primary/20 bg-gradient-to-b from-background to-[hsl(0,0%,2%)]">
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
            <Link to="/" className="inline-block">
              <motion.img
                src={groppiLogo}
                alt="GROPPI Digital Marketing Bureau"
                className="h-20 w-auto object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:gold-glow transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-6 gold-gradient-text">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-primary group-hover:w-4 transition-all duration-300" />
                    {link.label}
                  </Link>
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
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0 group-hover:gold-glow transition-all">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <span className="pt-1">Het Steeke 5A, 2330 Merksplas, Belgium</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0 group-hover:gold-glow transition-all">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col gap-1 pt-1">
                  <a href="tel:+32494311119" className="hover:text-primary transition-colors">+32 494 311 119 (Mobile)</a>
                  <a href="tel:+3214635005" className="hover:text-primary transition-colors">+32 14 63 50 05 (Office)</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground group">
                <div className="w-8 h-8 rounded-lg glass-card flex items-center justify-center shrink-0 group-hover:gold-glow transition-all">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <a href="mailto:info@groppi.be" className="hover:text-primary transition-colors">info@groppi.be</a>
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
              Stay Updated
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 px-4 py-3 glass-card !rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-transparent"
              />
              <Button className="luxury-button !rounded-xl !px-4">
                <Send className="h-4 w-4" />
              </Button>
            </div>
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
            <Link to="/privacy" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              {t('footer.terms')}
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
