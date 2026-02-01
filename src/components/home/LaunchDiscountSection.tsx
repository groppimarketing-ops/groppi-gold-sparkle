import { useState, useEffect, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, MessageCircle, FileText, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'groppi_discount_deadline';
const DISCOUNT_DAYS = 10;
const DISCOUNT_CODE = 'GROPPIGOLD20';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LaunchDiscountSection = memo(() => {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [copied, setCopied] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize deadline from localStorage or create new one
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    let deadline: number;

    if (stored) {
      deadline = parseInt(stored, 10);
    } else {
      deadline = Date.now() + DISCOUNT_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(STORAGE_KEY, deadline.toString());
    }

    const calculateTimeLeft = (): TimeLeft | null => {
      const diff = deadline - Date.now();
      if (diff <= 0) return null;

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      };
    };

    // Initial calculation
    const initial = calculateTimeLeft();
    if (!initial) {
      setIsExpired(true);
    } else {
      setTimeLeft(initial);
    }

    // Update every second
    const interval = setInterval(() => {
      const remaining = calculateTimeLeft();
      if (!remaining) {
        setIsExpired(true);
        clearInterval(interval);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = useCallback(async () => {
    if (isExpired) return;
    
    try {
      await navigator.clipboard.writeText(DISCOUNT_CODE);
      setCopied(true);
      toast({
        title: t('launchDiscount.codeCopied', 'Code gekopieerd!'),
        description: DISCOUNT_CODE,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: t('launchDiscount.copyFailed', 'Kopiëren mislukt'),
        variant: 'destructive',
      });
    }
  }, [isExpired, t]);

  const handleRequestQuote = useCallback(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  }, []);

  const handleWhatsApp = useCallback(() => {
    const message = encodeURIComponent(
      `Hallo! Ik wil graag gebruik maken van de lanceringskorting (${DISCOUNT_CODE}). Kunnen we bespreken wat jullie voor mij kunnen betekenen?`
    );
    window.open(`https://wa.me/32494311119?text=${message}`, '_blank');
  }, []);

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={value}
          initial={prefersReducedMotion ? {} : { y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReducedMotion ? {} : { y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-background/50 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">
              {value.toString().padStart(2, '0')}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
      <span className="text-xs sm:text-sm text-muted-foreground mt-2 uppercase tracking-wider">
        {label}
      </span>
    </div>
  );

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main card */}
          <div className="relative rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-md p-8 sm:p-12 shadow-2xl overflow-hidden">
            {/* Animated border glow */}
            <div 
              className={cn(
                "absolute inset-0 rounded-2xl pointer-events-none",
                !prefersReducedMotion && "animate-pulse"
              )}
              style={{
                background: 'linear-gradient(135deg, transparent 40%, hsl(var(--primary) / 0.1) 50%, transparent 60%)',
                animation: prefersReducedMotion ? 'none' : 'shimmer 3s infinite',
              }}
            />

            {/* Badge */}
            <div className="flex justify-center mb-6">
              <motion.div
                animate={prefersReducedMotion ? {} : { 
                  boxShadow: [
                    '0 0 20px hsl(var(--primary) / 0.3)',
                    '0 0 40px hsl(var(--primary) / 0.5)',
                    '0 0 20px hsl(var(--primary) / 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                  {t('launchDiscount.badge', 'LIMITED DEAL')}
                </span>
              </motion.div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 gold-gradient-text">
              {t('launchDiscount.headline', 'Start nu met 30% lanceringskorting.')}
            </h2>

            {/* Subheadline */}
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('launchDiscount.subheadline', 'Alleen voor nieuwe klanten — geldig gedurende 10 dagen. Geen kleine lettertjes, gewoon sneller groeien.')}
            </p>

            {/* Countdown or Expired state */}
            {isExpired ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-muted/50 border border-border">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-lg font-medium text-muted-foreground">
                    {t('launchDiscount.expired', 'Aanbieding verlopen')}
                  </span>
                </div>
              </div>
            ) : timeLeft && (
              <div className="flex justify-center gap-3 sm:gap-4 mb-8">
                <CountdownUnit value={timeLeft.days} label={t('launchDiscount.days', 'Dagen')} />
                <div className="flex items-center text-2xl text-primary/50 font-bold self-start mt-6">:</div>
                <CountdownUnit value={timeLeft.hours} label={t('launchDiscount.hours', 'Uren')} />
                <div className="flex items-center text-2xl text-primary/50 font-bold self-start mt-6">:</div>
                <CountdownUnit value={timeLeft.minutes} label={t('launchDiscount.minutes', 'Min')} />
                <div className="flex items-center text-2xl text-primary/50 font-bold self-start mt-6">:</div>
                <CountdownUnit value={timeLeft.seconds} label={t('launchDiscount.seconds', 'Sec')} />
              </div>
            )}

            {/* Discount code */}
            {!isExpired && (
              <div className="flex flex-col items-center gap-3 mb-8">
                <span className="text-sm text-muted-foreground">
                  {t('launchDiscount.codeLabel', 'Jouw kortingscode')}
                </span>
                <div className="flex items-center gap-2">
                  <div className="px-6 py-3 rounded-xl bg-primary/10 border-2 border-dashed border-primary/40 font-mono text-lg sm:text-xl font-bold text-primary tracking-wider">
                    {DISCOUNT_CODE}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    className="h-12 w-12 border-primary/30 hover:bg-primary/10 hover:border-primary/50 transition-all"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-primary" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Trust line */}
            <p className="text-center text-sm text-muted-foreground mb-6">
              {t('launchDiscount.trustLine', 'Toegepast op je eerste factuur. Enkel voor nieuwe klanten.')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              {isExpired ? (
                <Button
                  onClick={handleRequestQuote}
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  {t('launchDiscount.ctaExpired', 'Vraag een offerte aan')}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={handleRequestQuote}
                    size="lg"
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg shadow-primary/20"
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    {t('launchDiscount.ctaPrimary', 'Vraag een offerte aan')}
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-primary/30 hover:bg-primary/10 hover:border-primary/50 font-semibold px-8"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('launchDiscount.ctaSecondary', 'Chat via WhatsApp')}
                  </Button>
                </>
              )}
            </div>

            {/* Disclaimer */}
            <p className="text-center text-xs text-muted-foreground/70">
              {t('launchDiscount.disclaimer', 'Aanbod vervalt zodra de timer op nul staat.')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

LaunchDiscountSection.displayName = 'LaunchDiscountSection';

export default LaunchDiscountSection;
