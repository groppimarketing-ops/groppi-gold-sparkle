import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Users, GraduationCap, Store, Shield, FileText,
  Settings, Globe, ChevronRight,
} from 'lucide-react';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LangLink from '@/components/LangLink';
import { languages, type LanguageCode, applyDocumentDirection } from '@/i18n/config';
import { getBasePath, getLangPath } from '@/utils/languageRouting';
import { useAuth } from '@/contexts/AuthContext';

interface DrawerLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClose: () => void;
}

const DrawerLink = ({ to, icon: Icon, label, active, onClose }: DrawerLinkProps) => (
  <LangLink
    to={to}
    onClick={onClose}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors active:scale-[0.98] ${
      active
        ? 'bg-primary/15 text-primary'
        : 'text-foreground/80 hover:bg-muted'
    }`}
  >
    <Icon className="h-5 w-5 shrink-0" strokeWidth={1.6} />
    <span className="flex-1 text-sm font-medium">{label}</span>
    <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
  </LangLink>
);

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MobileDrawer = memo(({ open, onOpenChange }: MobileDrawerProps) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const basePath = getBasePath(location.pathname);
  const { isAdmin } = useAuth();
  const close = () => onOpenChange(false);

  const secondaryLinks = [
    { to: '/about',     icon: Users,          label: t('nav.about')               },
    { to: '/team',      icon: Users,          label: t('nav.team', 'Our Team')    },
    { to: '/franchise', icon: Store,          label: t('nav.franchise')           },
    { to: '/careers',   icon: GraduationCap,  label: t('nav.careers')             },
    { to: '/privacy',   icon: Shield,         label: t('nav.privacy', 'Privacy')  },
    { to: '/terms',     icon: FileText,       label: t('nav.terms', 'Terms')      },
  ];

  const changeLanguage = (code: LanguageCode) => {
    i18n.changeLanguage(code);
    applyDocumentDirection(code);
    navigate(getLangPath(getBasePath(location.pathname), code));
    close();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] bg-background border-border/40 p-0 flex flex-col">
        <SheetHeader className="px-4 pt-5 pb-3">
          <SheetTitle className="text-left text-base font-semibold text-foreground">
            Menu
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {secondaryLinks.map((link) => (
            <DrawerLink
              key={link.to}
              {...link}
              active={basePath === link.to}
              onClose={close}
            />
          ))}

          {isAdmin && (
            <>
              <Separator className="my-3 bg-border/30" />
              <DrawerLink
                to="/admin"
                icon={Settings}
                label="Admin"
                active={basePath.startsWith('/admin')}
                onClose={close}
              />
            </>
          )}
        </div>

        {/* Language picker */}
        <div className="border-t border-border/30 px-4 py-3">
          <div className="flex items-center gap-1.5 mb-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground font-medium">Language</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {languages.map((lang) => {
              const isActive = i18n.language === lang.code || (lang.code === 'nl' && i18n.language.startsWith('nl'));
              return (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code as LanguageCode)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium transition-all ${
                    isActive
                      ? 'bg-primary/20 text-primary ring-1 ring-primary/40'
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <span className="text-sm leading-none">{lang.flag}</span>
                  <span>{lang.code.toUpperCase()}</span>
                </button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

MobileDrawer.displayName = 'MobileDrawer';
export default MobileDrawer;
