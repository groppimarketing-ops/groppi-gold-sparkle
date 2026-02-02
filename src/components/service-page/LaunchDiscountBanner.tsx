import { memo, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DISCOUNT_CONFIG } from '@/config/pricingConfig';

// LocalStorage keys
const LS_EXPIRES = 'gro_discount_expiresAt';
const LS_CODE = 'gro_discount_code';

interface LaunchDiscountBannerProps {
  compact?: boolean;
}

const LaunchDiscountBanner = memo(({ compact = false }: LaunchDiscountBannerProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(Date.now());
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [code, setCode] = useState<string | null>(null);

  // Tick every second
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Load from localStorage
  useEffect(() => {
    const e = localStorage.getItem(LS_EXPIRES);
    const c = localStorage.getItem(LS_CODE);
    if (e) setExpiresAt(Number(e));
    if (c) setCode(c);
  }, []);

  const remainingMs = useMemo(() => {
    if (!expiresAt) return 0;
    return Math.max(0, expiresAt - now);
  }, [expiresAt, now]);

  const timeRemaining = useMemo(() => {
    const totalSec = Math.floor(remainingMs / 1000);
    const days = Math.floor(totalSec / (24 * 3600));
    const hours = Math.floor((totalSec % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;
    return { days, hours, minutes, seconds };
  }, [remainingMs]);

  const isUnlocked = Boolean(expiresAt && code);
  const isExpired = expiresAt ? remainingMs <= 0 : false;

  const handleCopyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  // Don't show if not unlocked or expired
  if (!isUnlocked || isExpired || !code) return null;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30"
      >
        <Sparkles className="w-3 h-3 text-primary" />
        <span className="text-xs font-medium text-primary">
          -{DISCOUNT_CONFIG.percentage}% • {timeRemaining.days}d {timeRemaining.hours}h
        </span>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="glass-card p-5 border-primary/30 bg-primary/5 rounded-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/20">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-primary">
                  {t('calculator.discountBadge')}
                </p>
                <Badge className="bg-red-500/90 text-white text-[10px] px-1.5 py-0 animate-pulse">
                  LIVE
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('calculator.discountNote')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Countdown */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-mono font-bold text-primary">
                {timeRemaining.days}d {String(timeRemaining.hours).padStart(2, '0')}h {String(timeRemaining.minutes).padStart(2, '0')}m {String(timeRemaining.seconds).padStart(2, '0')}s
              </span>
            </div>

            {/* Code */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="glass-button border-primary/30 gap-2"
            >
              <code className="font-mono font-bold text-primary">{code}</code>
              {copied ? (
                <Check className="w-4 h-4 text-primary" />
              ) : (
                <Copy className="w-4 h-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground mt-4 text-center">
          *{t('pricing.vatDisclaimer.line2')} {t('pricing.vatDisclaimer.line3')}
        </p>
      </div>
    </motion.div>
  );
});

LaunchDiscountBanner.displayName = 'LaunchDiscountBanner';

export default LaunchDiscountBanner;
