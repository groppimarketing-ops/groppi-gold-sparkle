import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { languages, type LanguageCode, applyDocumentDirection } from '@/i18n/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import groppiLogo from '@/assets/groppi-logo.png?format=webp&quality=90';
import { getCurrentLangFromPath, getBasePath, getLangPath } from '@/utils/languageRouting';

const languageOptions = languages.map(lang => ({
  code:      lang.code as LanguageCode,
  flag:      lang.flag,
  name:      lang.name,
  shortCode: lang.code.toUpperCase(),
}));

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen,  setIsMenuOpen]  = useState(false);
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [isHidden,    setIsHidden]    = useState(false);
  const location  = useLocation();
  const navigate  = useNavigate();
  const currentLang     = languages.find(l => l.code === i18n.language || i18n.language.startsWith(l.code)) || languages[0];
  const isRtl           = currentLang.dir === 'rtl';
  const currentUrlLang  = getCurrentLangFromPath(location.pathname);
  const currentBasePath = getBasePath(location.pathname);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setIsHidden(y > 100 ? y > lastScrollY : false);
      lastScrollY = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/about',     label: t('nav.about') },
    { path: '/team',      label: t('nav.team', 'Our Team') },
    { path: '/services',  label: t('nav.services') },
    { path: '/gallery',   label: t('nav.gallery') },
    { path: '/blog',      label: t('nav.blog') },
    { path: '/careers',   label: t('nav.careers') },
    { path: '/franchise', label: t('nav.franchise') },
    { path: '/contact',   label: t('nav.contact') },
  ];

  const allNavItems = [
    { path: '/', label: t('nav.home') },
    ...navItems,
  ];

  const changeLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    applyDocumentDirection(code);
    navigate(getLangPath(getBasePath(location.pathname), code));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${isScrolled ? 'glass-card !rounded-none border-x-0 border-t-0' : 'bg-transparent'}`}
    >
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to={getLangPath('/', currentUrlLang)} className="flex items-center group">
            <img
              src={groppiLogo}
              alt="GROPPI Digital Marketing Bureau"
              width={90}
              height={90}
              className="h-[64px] md:h-[76px] lg:h-[90px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              fetchPriority="high"
              decoding="sync"
            />
          </Link>

          {/* Desktop Navigation — flat nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={getLangPath(item.path, currentUrlLang)}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                  currentBasePath === item.path
                    ? 'text-primary drop-shadow-[0_0_8px_hsl(43_76%_52%/0.6)] bg-white/5 border border-primary/40 shadow-[0_0_15px_hsl(43_76%_52%/0.25)]'
                    : 'text-foreground/70 hover:text-foreground hover:text-primary/90 hover:drop-shadow-[0_0_6px_hsl(43_76%_52%/0.3)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right side — Language + Mobile toggle */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-white/5"
                >
                  <span className="text-base leading-none">{currentLang.flag}</span>
                  <span className="font-medium">{currentLang.name}</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align={isRtl ? 'start' : 'end'}
                className="z-[100] bg-background/98 backdrop-blur-md border-primary/20 shadow-xl max-h-80 overflow-y-auto pr-1"
              >
                {languageOptions.map((lang) => {
                  const isActive = i18n.language === lang.code || (lang.code === 'nl' && i18n.language.startsWith('nl'));
                  return (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center gap-2.5 cursor-pointer px-3 py-2 ${
                        isActive ? 'bg-primary/20 text-primary font-medium' : 'hover:bg-primary/10'
                      }`}
                    >
                      <span className="text-base w-6 text-center leading-none">{lang.flag}</span>
                      <span className="flex-1">{lang.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden glass-button !p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X className="text-primary" /> : <Menu className="text-primary" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 pb-4 animate-fade-up">
            <div className="rounded-2xl p-4 flex flex-col gap-1" style={{ background: 'hsl(0 0% 5% / 0.98)', border: '1px solid hsl(43 76% 52% / 0.25)', backdropFilter: 'blur(20px)' }}>
              {allNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={getLangPath(item.path, currentUrlLang)}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    currentBasePath === item.path
                      ? 'bg-primary/25 text-primary shadow-[0_0_12px_hsl(43_76%_52%/0.25)] drop-shadow-[0_0_6px_hsl(43_76%_52%/0.4)]'
                      : 'hover:bg-primary/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Language Switcher */}
              <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-t border-white/10 mt-2">
                <span className="text-xs text-muted-foreground mr-2 w-full mb-2">Language:</span>
                {languageOptions.map((lang) => {
                  const isActive = i18n.language === lang.code || (lang.code === 'nl' && i18n.language.startsWith('nl'));
                  return (
                    <button
                      key={lang.code}
                      onClick={() => { changeLanguage(lang.code); setIsMenuOpen(false); }}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-primary/20 text-primary ring-1 ring-primary/50'
                          : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                      }`}
                    >
                      <span className="text-sm leading-none">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
