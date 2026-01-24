import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import groppiLogo from '@/assets/groppi-logo.png';
import { trackEvent, socialLinks as socialUrls } from '@/utils/tracking';

// TikTok icon component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const TopBar = () => {
  const { t } = useTranslation();
  
  const socialLinksData = [
    { icon: Instagram, href: socialUrls.instagram, label: 'Instagram', event: 'instagram_click' as const },
    { icon: Facebook, href: socialUrls.facebook, label: 'Facebook', event: 'facebook_click' as const },
    { icon: TikTokIcon, href: socialUrls.tiktok, label: 'TikTok', event: 'tiktok_click' as const },
    { icon: Linkedin, href: socialUrls.linkedin, label: 'LinkedIn', event: 'linkedin_click' as const },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-background/90 backdrop-blur-md border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.img
              src={groppiLogo}
              alt="GROPPI Digital Marketing Bureau"
              className="h-10 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </Link>

          {/* Social Media Icons + WhatsApp */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinksData.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  onClick={() => trackEvent({ event: social.event, location: 'topbar' })}
                  whileHover={{ scale: 1.15, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:gold-glow transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-6 bg-primary/20" />

            {/* WhatsApp Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                size="sm"
                className="h-8 px-4 bg-[#25D366] hover:bg-[#128C7E] text-white border-0 rounded-full text-xs font-medium gap-2"
              >
                <a 
                  href={socialUrls.whatsapp}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => trackEvent({ event: 'whatsapp_click', location: 'topbar' })}
                >
                  <svg 
                    className="w-4 h-4" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('social.whatsapp')}
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
