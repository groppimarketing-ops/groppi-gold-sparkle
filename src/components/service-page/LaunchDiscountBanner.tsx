import { memo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Discount settings
const DISCOUNT_PERCENTAGE = 20;
const DISCOUNT_DAYS = 10;
const STORAGE_KEY = 'groppi_launch_discount_start';
const DISCOUNT_CODE = 'GROPPIGOLD20';

interface LaunchDiscountBannerProps {
  compact?: boolean;
}

const LaunchDiscountBanner = memo(({ compact = false }: LaunchDiscountBannerProps) => {
  const [discountDaysLeft, setDiscountDaysLeft] = useState(0);
  const [discountActive, setDiscountActive] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Initialize or retrieve discount start date
    let startDate = localStorage.getItem(STORAGE_KEY);
    if (!startDate) {
      startDate = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, startDate);
    }
    
    const start = new Date(startDate);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const remaining = DISCOUNT_DAYS - diffDays;
    
    if (remaining > 0) {
      setDiscountDaysLeft(remaining);
      setDiscountActive(true);
    } else {
      setDiscountActive(false);
    }
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
          -{DISCOUNT_PERCENTAGE}% • Nog {discountDaysLeft}d
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
                {DISCOUNT_PERCENTAGE}% Launchkorting
              </p>
              <p className="text-sm text-muted-foreground">
                Geldt enkel voor eenmalige projecten (geen abonnementen)
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Countdown */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-bold text-primary">
                Nog {discountDaysLeft} {discountDaysLeft === 1 ? 'dag' : 'dagen'}
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
          *Kortingen gelden enkel voor eenmalige projecten. Maandelijkse abonnementen zijn uitgesloten.
        </p>
      </div>
    </motion.div>
  );
});

LaunchDiscountBanner.displayName = 'LaunchDiscountBanner';

export default LaunchDiscountBanner;
