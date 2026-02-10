import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CONSENT_KEY = 'groppi_cookie_consent';

export type ConsentValue = 'accepted' | 'rejected' | null;

export const getConsentValue = (): ConsentValue => {
  try {
    return localStorage.getItem(CONSENT_KEY) as ConsentValue;
  } catch {
    return null;
  }
};

const CookieConsent = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner after a short delay if no consent stored
    const timer = setTimeout(() => {
      if (!getConsentValue()) {
        setVisible(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
    // Fire dataLayer event for GTM
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'cookie_consent_accepted' });
    }
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected');
    setVisible(false);
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'cookie_consent_rejected' });
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto glass-card border border-primary/20 rounded-2xl p-5 md:p-6 shadow-2xl shadow-black/40">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Cookie className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-1">
                    {t('cookies.title', 'Wij gebruiken cookies')}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t('cookies.description', 'Deze website gebruikt cookies om je ervaring te verbeteren en om onze prestaties te meten. Door op "Accepteren" te klikken, ga je akkoord met ons cookiebeleid.')}{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      {t('cookies.learnMore', 'Meer info')}
                    </Link>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleReject}
                  className="flex-1 sm:flex-none glass-button text-xs"
                >
                  {t('cookies.reject', 'Weigeren')}
                </Button>
                <Button
                  size="sm"
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none luxury-button text-xs"
                >
                  {t('cookies.accept', 'Accepteren')}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
