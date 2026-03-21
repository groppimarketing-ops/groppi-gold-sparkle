import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Briefcase, Image, BookOpen, MessageCircle } from 'lucide-react';
import LangLink from '@/components/LangLink';
import { getBasePath } from '@/utils/languageRouting';

const tabs = [
  { path: '/',         icon: Home,          labelKey: 'nav.home'     },
  { path: '/services', icon: Briefcase,     labelKey: 'nav.services' },
  { path: '/gallery',  icon: Image,         labelKey: 'nav.gallery'  },
  { path: '/blog',     icon: BookOpen,      labelKey: 'nav.blog'     },
  { path: '/contact',  icon: MessageCircle, labelKey: 'nav.contact'  },
] as const;

const MobileBottomTabs = memo(() => {
  const { t } = useTranslation();
  const location = useLocation();
  const basePath = getBasePath(location.pathname);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      role="tablist"
      aria-label="Main navigation"
    >
      <div className="flex items-stretch justify-around h-14">
        {tabs.map(({ path, icon: Icon, labelKey }) => {
          const isActive = basePath === path || (path === '/gallery' && basePath === '/portfolio');
          return (
            <LangLink
              key={path}
              to={path}
              role="tab"
              aria-selected={isActive}
              className={`flex flex-col items-center justify-center flex-1 gap-0.5 text-[10px] font-medium transition-colors duration-150 active:scale-95 ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'drop-shadow-[0_0_6px_hsl(43_76%_52%/0.5)]' : ''}`} strokeWidth={isActive ? 2.2 : 1.6} />
              <span className="leading-none">{t(labelKey)}</span>
            </LangLink>
          );
        })}
      </div>
    </nav>
  );
});

MobileBottomTabs.displayName = 'MobileBottomTabs';
export default MobileBottomTabs;
