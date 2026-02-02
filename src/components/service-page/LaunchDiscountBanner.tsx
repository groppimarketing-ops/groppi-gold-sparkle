import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useDiscountTimer from '@/hooks/useDiscountTimer';

interface LaunchDiscountBannerProps {
  compact?: boolean;
}

const LaunchDiscountBanner = memo(({ compact = false }: LaunchDiscountBannerProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  
  const {
    isUnlocked,
    isExpired,
    discountCode,
    timeRemaining,
    percentage,
  } = useDiscountTimer();

  const handleCopyCode = () => {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Don't show if not unlocked or expired
  if (!isUnlocked || isExpired || !discountCode) return null;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30"
      >
        <Sparkles className="w-3 h-3 text-primary" />
        <span className="text-xs font-medium text-primary">
          -{percentage}% • {timeRemaining?.days}d {timeRemaining?.hours}h
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
            {timeRemaining && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-mono font-bold text-primary">
                  {timeRemaining.days}d {String(timeRemaining.hours).padStart(2, '0')}h {String(timeRemaining.minutes).padStart(2, '0')}m {String(timeRemaining.seconds).padStart(2, '0')}s
                </span>
              </div>
            )}

            {/* Code */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="glass-button border-primary/30 gap-2"
            >
              <code className="font-mono font-bold text-primary">{discountCode}</code>
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
