import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, Copy, Check, MessageCircle, Calendar, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface DiscountCountdownCardProps {
  isUnlocked: boolean;
  isExpired: boolean;
  discountCode: string | null;
  timeRemaining: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null;
  percentage: number;
  paymentType: 'one_time' | 'monthly' | null;
}

const DiscountCountdownCard = memo(({
  isUnlocked,
  isExpired,
  discountCode,
  timeRemaining,
  percentage,
  paymentType,
}: DiscountCountdownCardProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (discountCode) {
      navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Show message for monthly payment type
  if (paymentType === 'monthly') {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-6"
        >
          <div className="p-4 rounded-xl bg-muted/50 border border-muted">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground">
                  {t('calculator.noDiscountMonthlyTitle')}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('calculator.noDiscountMonthly')}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // Don't show if not unlocked yet
  if (!isUnlocked || !discountCode) {
    return null;
  }

  // Expired state
  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        <div className="p-5 rounded-xl bg-muted/30 border border-muted">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-muted">
                <Clock className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="font-medium text-muted-foreground">
                  {t('calculator.discountExpired')}
                </p>
                <p className="text-sm text-muted-foreground line-through">
                  {discountCode}
                </p>
              </div>
            </div>
          </div>
          
          {/* Still show CTAs but without discount messaging */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4 pt-4 border-t border-muted">
            <Button
              asChild
              variant="outline"
              className="flex-1"
            >
              <a href="https://wa.me/32470123456">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('calculator.cta.whatsapp')}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1"
            >
              <a href="https://calendly.com/groppi" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4 mr-2" />
                {t('calculator.cta.planCall')}
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Active countdown state
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="mt-6"
      >
        <div className="p-5 rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          {/* Header with LIVE badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-primary">
                    {percentage}% {t('calculator.launchDiscount')}
                  </h4>
                  <Badge className="bg-red-500/90 text-white text-[10px] px-1.5 py-0 animate-pulse">
                    LIVE
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {t('calculator.discountNote')}
                </p>
              </div>
            </div>
          </div>

          {/* Countdown Timer */}
          {timeRemaining && (
            <div className="flex items-center justify-center gap-1 sm:gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{t('calculator.offerEndsIn')}:</span>
              </div>
              <div className="flex items-center gap-1">
                <TimeUnit value={timeRemaining.days} label="d" />
                <span className="text-primary font-bold">:</span>
                <TimeUnit value={timeRemaining.hours} label="h" />
                <span className="text-primary font-bold">:</span>
                <TimeUnit value={timeRemaining.minutes} label="m" />
                <span className="text-primary font-bold">:</span>
                <TimeUnit value={timeRemaining.seconds} label="s" />
              </div>
            </div>
          )}

          {/* Discount Code */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-primary/20 mb-4">
            <code className="font-mono font-bold text-primary text-lg">
              {discountCode}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyCode}
              className="text-primary hover:bg-primary/10"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <a href="https://wa.me/32470123456">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('calculator.cta.claimWhatsApp')}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="flex-1 border-primary/30 hover:bg-primary/10"
            >
              <a href="https://calendly.com/groppi" target="_blank" rel="noopener noreferrer">
                <Calendar className="w-4 h-4 mr-2" />
                {t('calculator.cta.planCall')}
              </a>
            </Button>
          </div>

          {/* VAT Note */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            *{t('pricing.vatDisclaimer.line2')}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

// Time unit display component
const TimeUnit = memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex items-baseline">
    <span className="font-mono font-bold text-primary text-lg sm:text-xl tabular-nums">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs text-muted-foreground ml-0.5">{label}</span>
  </div>
));

TimeUnit.displayName = 'TimeUnit';
DiscountCountdownCard.displayName = 'DiscountCountdownCard';

export default DiscountCountdownCard;
