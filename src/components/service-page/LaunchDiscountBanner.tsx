import { memo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DISCOUNT_CONFIG, getDiscountInfo } from '@/config/pricingConfig';

const DISCOUNT_CODE = 'GROPPIGOLD20';

interface LaunchDiscountBannerProps {
  compact?: boolean;
}

const LaunchDiscountBanner = memo(({ compact = false }: LaunchDiscountBannerProps) => {
  const { t } = useTranslation();
  const [discountDaysLeft, setDiscountDaysLeft] = useState(0);
  const [discountActive, setDiscountActive] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const info = getDiscountInfo();
    setDiscountActive(info.active);
    setDiscountDaysLeft(info.daysLeft);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(DISCOUNT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!discountActive) return null;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30"
      >
        <Sparkles className="w-3 h-3 text-primary" />
        <span className="text-xs font-medium text-primary">
          -{DISCOUNT_CONFIG.percentage}% • {discountDaysLeft}d
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
              <p className="text-lg font-bold text-primary">
                {t('calculator.discountBadge')}
              </p>
              <p className="text-sm text-muted-foreground">
                {t('calculator.discountNote')}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Countdown */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-bold text-primary">
                {discountDaysLeft} {discountDaysLeft === 1 ? 'dag' : 'dagen'}
              </span>
            </div>

            {/* Code */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCode}
              className="glass-button border-primary/30 gap-2"
            >
              <code className="font-mono font-bold text-primary">{DISCOUNT_CODE}</code>
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
