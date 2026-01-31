import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ServiceStickyTabsProps {
  serviceKey: string;
}

const TABS = [
  { id: 'why', labelKey: 'servicePage.tabs.why' },
  { id: 'howItWorks', labelKey: 'servicePage.tabs.howItWorks' },
  { id: 'approach', labelKey: 'servicePage.tabs.approach' },
  { id: 'pricing', labelKey: 'servicePage.tabs.pricing' },
  { id: 'faq', labelKey: 'servicePage.tabs.faq' },
];

const ServiceStickyTabs = memo(({ serviceKey }: ServiceStickyTabsProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('why');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Become sticky after scrolling past hero (approx 500px)
      setIsSticky(window.scrollY > 500);

      // Determine active section based on scroll position
      const sections = TABS.map(tab => document.getElementById(`section-${tab.id}`));
      const scrollPos = window.scrollY + 150; // Offset for sticky header

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveTab(TABS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (tabId: string) => {
    const section = document.getElementById(`section-${tabId}`);
    if (section) {
      const offset = 120; // Account for sticky nav height
      const top = section.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div
      className={cn(
        'w-full z-40 transition-all duration-300',
        isSticky ? 'fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-primary/10 shadow-lg' : 'relative bg-background'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center gap-1 py-3 overflow-x-auto no-scrollbar">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-all duration-200',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t(tab.labelKey)}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
});

ServiceStickyTabs.displayName = 'ServiceStickyTabs';

export default ServiceStickyTabs;
