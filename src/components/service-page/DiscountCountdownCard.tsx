import { memo, useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, Copy, Check, MessageCircle, Calendar, AlertTriangle, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DISCOUNT_CONFIG } from '@/config/pricingConfig';
import { trackEvent, socialLinks } from '@/utils/tracking';

const CALENDLY_URL = socialLinks.calendly;
// LocalStorage keys
const LS_STARTED = 'gro_discount_startedAt';
const LS_EXPIRES = 'gro_discount_expiresAt';
const LS_CODE = 'gro_discount_code';
const TEN_DAYS_MS = DISCOUNT_CONFIG.validDays * 24 * 60 * 60 * 1000;

// Generate unique discount code
function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `GRO-${s}`;
}

interface DiscountCountdownCardProps {
  /** true when user selects One-time project */
  isOneTime: boolean;
  /** true when calculator has produced a price (items selected) */
  hasCalculatedPrice: boolean;
  /** Optional: trigger unlock when entering service detail page */
  triggerOnPageView?: boolean;
}

const DiscountCountdownCard = memo(({
  isOneTime,
  hasCalculatedPrice,
  triggerOnPageView = false,
}: DiscountCountdownCardProps) => {
  const { t } = useTranslation();
  
  // State
  const [now, setNow] = useState(Date.now());
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Unlock condition: 
  // - Must be one-time payment type AND have calculated price, OR
  // - Page view triggered (entering service detail page) - but only initializes, doesn't show yet
  const canUnlock = (isOneTime && hasCalculatedPrice) || triggerOnPageView;
  
  // Only SHOW the card if one-time + has price (intent shown)
  const showCard = isOneTime && hasCalculatedPrice;

  // Tick every second
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize from localStorage
  useEffect(() => {
    const s = localStorage.getItem(LS_STARTED);
    const e = localStorage.getItem(LS_EXPIRES);
    const c = localStorage.getItem(LS_CODE);
    
    if (s && e) {
      setStartedAt(Number(s));
      setExpiresAt(Number(e));
    }
    if (c) setCode(c);
  }, []);

  // Unlock once when conditions are met
  useEffect(() => {
    if (!canUnlock) return;

    // If already exists, don't reset
    const existingStarted = localStorage.getItem(LS_STARTED);
    const existingExpires = localStorage.getItem(LS_EXPIRES);
    const existingCode = localStorage.getItem(LS_CODE);

    if (existingStarted && existingExpires && existingCode) {
      setStartedAt(Number(existingStarted));
      setExpiresAt(Number(existingExpires));
      setCode(existingCode);
      return;
    }

    // First time unlock - create new timer
    const s = Date.now();
    const e = s + TEN_DAYS_MS;
    const c = generateCode();
    
    localStorage.setItem(LS_STARTED, String(s));
    localStorage.setItem(LS_EXPIRES, String(e));
    localStorage.setItem(LS_CODE, c);
    
    setStartedAt(s);
    setExpiresAt(e);
    setCode(c);
  }, [canUnlock]);

  // Calculate remaining time
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

  const isExpired = expiresAt ? remainingMs <= 0 : false;
  const isUnlocked = Boolean(startedAt && expiresAt && code);

  // Copy code handler
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  // WhatsApp URL with pre-filled message
  const whatsappMessage = encodeURIComponent(
    `Hallo! Ik heb mijn prijs berekend en wil mijn 20% kortingscode claimen: ${code}`
  );
  const whatsappUrl = `https://wa.me/32470123456?text=${whatsappMessage}`;

  // Show "no discount" message for monthly payment type
  if (!isOneTime && hasCalculatedPrice) {
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
              <AlertTriangle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
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

  // Don't show card if conditions not met
  // Show "no discount" message for monthly, or hide if not unlocked/shown
  if (!showCard || !isUnlocked) return null;

  // Expired state
  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs tracking-widest text-muted-foreground uppercase">
                {t('calculator.discountExpired')}
              </div>
              <h3 className="mt-1 text-lg font-semibold text-muted-foreground line-through">
                {code}
              </h3>
            </div>
            <div className="rounded-full border border-destructive/40 px-3 py-1 text-xs text-destructive">
              EXPIRED
            </div>
          </div>
          
          <p className="mt-3 text-sm text-muted-foreground">
            {t('calculator.expiredMessage')}
          </p>
          
          {/* CTAs without discount messaging */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild variant="default">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('calculator.cta.whatsapp')}
              </a>
            </Button>
            <Button asChild variant="outline">
              <a 
                href={CALENDLY_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackEvent({ event: 'calendly_click', location: 'discount_card' })}
              >
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
        <div className="rounded-2xl border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs tracking-widest text-primary/80 uppercase">
                LIMITED DEAL
              </div>
              <h3 className="mt-1 text-xl font-semibold text-primary flex items-center gap-2">
                <Gift className="w-5 h-5" />
                {DISCOUNT_CONFIG.percentage}% {t('calculator.launchDiscount')} unlocked
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {t('calculator.discountNote')} {t('pricing.vatExcludedNote')}
              </p>
            </div>
            <Badge className="bg-red-500/90 text-white text-[10px] px-2 py-0.5 animate-pulse">
              LIVE
            </Badge>
          </div>

          {/* Countdown Timer */}
          <div className="mt-4 rounded-xl bg-background/50 border border-primary/20 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="w-4 h-4" />
              <span>{t('calculator.offerEndsIn')}</span>
            </div>
            <div className="flex items-center gap-1">
              <TimeUnit value={timeRemaining.days} label="d" />
              <span className="text-primary font-bold text-lg">:</span>
              <TimeUnit value={timeRemaining.hours} label="h" />
              <span className="text-primary font-bold text-lg">:</span>
              <TimeUnit value={timeRemaining.minutes} label="m" />
              <span className="text-primary font-bold text-lg">:</span>
              <TimeUnit value={timeRemaining.seconds} label="s" />
            </div>
          </div>

          {/* Discount Code */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px] rounded-xl bg-background/50 border border-primary/20 px-4 py-3">
              <div className="text-xs text-muted-foreground">Your code</div>
              <div className="mt-1 font-mono text-lg font-bold text-primary">{code}</div>
            </div>
            <Button
              onClick={handleCopyCode}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy code
                </>
              )}
            </Button>
          </div>

          {/* CTAs */}
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                {t('calculator.cta.claimWhatsApp')}
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1 border-primary/30 hover:bg-primary/10">
              <a 
                href={CALENDLY_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => trackEvent({ event: 'calendly_click', location: 'discount_card' })}
              >
                <Calendar className="w-4 h-4 mr-2" />
                {t('calculator.cta.planCall')}
              </a>
            </Button>
          </div>
          
          {/* Helper text */}
          <p className="text-xs text-muted-foreground text-center mt-3">
            {t('calculator.cta.planCallHelper')}
          </p>

          {/* VAT Note */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            *{t('pricing.vatDisclaimer.line2')} {t('pricing.vatDisclaimer.line3')}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

// Time unit display component
const TimeUnit = memo(({ value, label }: { value: number; label: string }) => (
  <div className="flex items-baseline">
    <span className="font-mono font-bold text-primary text-xl tabular-nums min-w-[2ch] text-center">
      {String(value).padStart(2, '0')}
    </span>
    <span className="text-xs text-muted-foreground ml-0.5">{label}</span>
  </div>
));

TimeUnit.displayName = 'TimeUnit';
DiscountCountdownCard.displayName = 'DiscountCountdownCard';

export default DiscountCountdownCard;
