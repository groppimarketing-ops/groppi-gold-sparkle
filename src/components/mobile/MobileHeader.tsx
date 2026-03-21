import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getCurrentLangFromPath } from '@/utils/languageRouting';
import { getLangPath } from '@/utils/languageRouting';
import { useLocation } from 'react-router-dom';
import groppiLogo from '@/assets/groppi-logo.png?format=webp&quality=90';
import MobileDrawer from './MobileDrawer';

const MobileHeader = memo(() => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const lang = getCurrentLangFromPath(location.pathname);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 md:hidden h-14 flex items-center justify-between px-3 bg-background/95 backdrop-blur-lg border-b border-border/30"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 text-primary"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <Link to={getLangPath('/', lang)} className="absolute left-1/2 -translate-x-1/2">
          <img
            src={groppiLogo}
            alt="GROPPI"
            width={56}
            height={56}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Right spacer to balance the layout */}
        <div className="w-10" />
      </header>

      <MobileDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
});

MobileHeader.displayName = 'MobileHeader';
export default MobileHeader;
