import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { languages, type LanguageCode, applyDocumentDirection } from '@/i18n/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import groppiLogo from '@/assets/groppi-logo.png';
import { trackEvent, socialLinks as socialUrls } from '@/utils/tracking';

// Brand color social icons
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
  </svg>
);

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
);

// Social media data with brand colors
const socialIconsData = [
  { 
    icon: XIcon, 
    href: socialUrls.twitter, 
    label: 'X (Twitter)', 
    event: 'twitter_click' as const,
    color: '#1DA1F2',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(29,161,242,0.5)]'
  },
  { 
    icon: FacebookIcon, 
    href: socialUrls.facebook, 
    label: 'Facebook', 
    event: 'facebook_click' as const,
    color: '#1877F2',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(24,119,242,0.5)]'
  },
  { 
    icon: InstagramIcon, 
    href: socialUrls.instagram, 
    label: 'Instagram', 
    event: 'instagram_click' as const,
    color: '#E4405F',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(228,64,95,0.5)]'
  },
  { 
    icon: LinkedInIcon, 
    href: socialUrls.linkedin, 
    label: 'LinkedIn', 
    event: 'linkedin_click' as const,
    color: '#0A66C2',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(10,102,194,0.5)]'
  },
  { 
    icon: YouTubeIcon, 
    href: socialUrls.youtube, 
    label: 'YouTube', 
    event: 'youtube_click' as const,
    color: '#FF0000',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]'
  },
  { 
    icon: TikTokIcon, 
    href: socialUrls.tiktok, 
    label: 'TikTok', 
    event: 'tiktok_click' as const,
    color: '#69C9D0',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(105,201,208,0.5)]'
  },
  { 
    icon: PinterestIcon, 
    href: socialUrls.pinterest, 
    label: 'Pinterest', 
    event: 'pinterest_click' as const,
    color: '#E60023',
    hoverGlow: 'hover:drop-shadow-[0_0_6px_rgba(230,0,35,0.5)]'
  },
];

// Mobile priority icons (shown first on mobile)
const mobileIconsData = socialIconsData.filter(s => 
  ['Instagram', 'Facebook', 'TikTok', 'LinkedIn'].includes(s.label)
);
const mobileHiddenIconsData = socialIconsData.filter(s => 
  !['Instagram', 'Facebook', 'TikTok', 'LinkedIn'].includes(s.label)
);

// Language options with flags
const languageOptions = [
  { code: 'nl' as LanguageCode, flag: '🇧🇪', label: 'NL' },
  { code: 'en' as LanguageCode, flag: '🇬🇧', label: 'EN' },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];
  const isRtl = currentLang.dir === 'rtl';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/about', label: t('nav.about') },
    { path: '/services', label: t('nav.services') },
    { path: '/blog', label: t('nav.blog') },
    { path: '/gallery', label: t('nav.gallery') },
    { path: '/franchise', label: t('nav.partnership') },
    { path: '/contact', label: t('nav.contact') },
  ];

  const changeLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    applyDocumentDirection(code);
  };

  return (
    <TooltipProvider delayDuration={300}>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-card !rounded-none border-x-0 border-t-0' 
            : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <motion.img
                src={groppiLogo}
                alt="GROPPI Digital Marketing Bureau"
                className="h-[64px] md:h-[76px] lg:h-[90px] w-auto object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    location.pathname === item.path 
                      ? 'text-primary' 
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 glass-card -z-10"
                      transition={{ type: 'spring', duration: 0.5 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Right side: Language + Social + CTA */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Language Switcher (Flags) */}
              <div className="hidden sm:flex items-center gap-1">
                {languageOptions.map((lang) => {
                  const isActive = i18n.language === lang.code || 
                    (lang.code === 'nl' && i18n.language.startsWith('nl'));
                  
                  return (
                    <motion.button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary/20 text-primary ring-1 ring-primary/50' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                      }`}
                      aria-label={`Switch to ${lang.label}`}
                    >
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Social Icons - Desktop (all icons) */}
              <div className="hidden lg:flex items-center gap-3">
                {socialIconsData.map((social) => (
                  <Tooltip key={social.label}>
                    <TooltipTrigger asChild>
                      <motion.a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${social.label}`}
                        onClick={() => trackEvent({ event: social.event, location: 'header' })}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className={`flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded ${social.hoverGlow}`}
                        style={{ color: social.color }}
                      >
                        <social.icon className="h-[18px] w-[18px]" />
                      </motion.a>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      {social.label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              {/* Social Icons - Tablet (4 priority icons + dropdown) */}
              <div className="hidden md:flex lg:hidden items-center gap-2">
                {mobileIconsData.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${social.label}`}
                    onClick={() => trackEvent({ event: social.event, location: 'header' })}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className={`flex items-center justify-center transition-all duration-200 rounded ${social.hoverGlow}`}
                    style={{ color: social.color }}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
                {mobileHiddenIconsData.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="!p-1.5 h-auto text-muted-foreground hover:text-foreground">
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align={isRtl ? 'start' : 'end'} className="glass-card border-primary/20">
                      {mobileHiddenIconsData.map((social) => (
                        <DropdownMenuItem key={social.label} asChild>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent({ event: social.event, location: 'header' })}
                            className="flex items-center gap-2 cursor-pointer"
                            style={{ color: social.color }}
                          >
                            <social.icon className="h-4 w-4" />
                            <span className="text-foreground">{social.label}</span>
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* Contact CTA Button */}
              <Button
                asChild
                size="sm"
                className="hidden sm:flex luxury-button text-primary-foreground"
              >
                <Link to="/contact">{t('nav.contact')}</Link>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden glass-button !p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="text-primary" /> : <Menu className="text-primary" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 pb-4"
              >
                <div className="glass-card p-4 flex flex-col gap-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg transition-all ${
                          location.pathname === item.path 
                            ? 'bg-primary/20 text-primary' 
                            : 'hover:bg-primary/10'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Language Switcher */}
                  <div className="flex items-center gap-2 px-4 py-3 border-t border-white/10 mt-2">
                    <span className="text-xs text-muted-foreground mr-2">Language:</span>
                    {languageOptions.map((lang) => {
                      const isActive = i18n.language === lang.code || 
                        (lang.code === 'nl' && i18n.language.startsWith('nl'));
                      
                      return (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                            isActive 
                              ? 'bg-primary/20 text-primary ring-1 ring-primary/50' 
                              : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Mobile Social Icons */}
                  <div className="flex items-center justify-center gap-4 px-4 py-3 border-t border-white/10">
                    {socialIconsData.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${social.label}`}
                        onClick={() => trackEvent({ event: social.event, location: 'header_mobile' })}
                        className="transition-transform hover:scale-110"
                        style={{ color: social.color }}
                      >
                        <social.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </TooltipProvider>
  );
};

export default Header;