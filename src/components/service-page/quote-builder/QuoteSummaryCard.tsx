import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, MessageCircle, Calendar, Clock, Sparkles, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { EstimatePayload, DISCOUNT_PERCENTAGE } from './types';

interface QuoteSummaryCardProps {
  serviceKey: string;
  tierKey: string | null;
  selectedOptions: string[];
  adBudget: string | null;
  priceMin: number;
  priceMax: number;
  setupFee: number;
  isPromoActive: boolean;
  promoTimeRemaining: string;
  currentEstimate: EstimatePayload | null;
  onReservePrice: () => void;
  isValid: boolean;
}

const QuoteSummaryCard = memo(({
  serviceKey,
  tierKey,
  selectedOptions,
  adBudget,
  priceMin,
  priceMax,
  setupFee,
  isPromoActive,
  promoTimeRemaining,
  currentEstimate,
  onReservePrice,
  isValid,
}: QuoteSummaryCardProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  // Calculate discount
  const discountAmount = isPromoActive ? Math.round((priceMin + priceMax) / 2 * (DISCOUNT_PERCENTAGE / 100)) : 0;
  const discountedMin = isPromoActive ? Math.round(priceMin * (1 - DISCOUNT_PERCENTAGE / 100)) : priceMin;
  const discountedMax = isPromoActive ? Math.round(priceMax * (1 - DISCOUNT_PERCENTAGE / 100)) : priceMax;

  const handleCopyEstimateId = async () => {
    if (!currentEstimate) return;
    try {
      await navigator.clipboard.writeText(currentEstimate.id);
      setCopied(true);
      toast({
        title: t('quoteBuilder.estimateCopied'),
        description: currentEstimate.id,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: t('quoteBuilder.copyFailed'),
        variant: 'destructive',
      });
    }
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const serviceName = t(`servicePage.${serviceKey}.title`);
    const tierName = tierKey ? t(`servicePage.calculator.packages.${tierKey}`) : '';
    const optionsList = selectedOptions.map(opt => t(`servicePage.calculator.addons.${opt}`)).join(', ');
    const priceRange = `€${discountedMin}–€${discountedMax}`;
    const discountLine = isPromoActive ? `(-${DISCOUNT_PERCENTAGE}% lanceringskorting)` : '';
    const estimateId = currentEstimate?.id || 'Nog niet gereserveerd';

    const message = `Hey GROPPI 👋 Ik wil een korte intake boeken.

Service: ${serviceName}${tierName ? ` (${tierName})` : ''}
${adBudget ? `Budget: €${adBudget}/maand` : ''}
${optionsList ? `Opties: ${optionsList}` : ''}
Schatting: ${priceRange} ${discountLine}
Offerte-ID: ${estimateId}

Wanneer kan ik bellen?`;

    return encodeURIComponent(message);
  };

  const whatsappUrl = `https://wa.me/32494311119?text=${generateWhatsAppMessage()}`;

  // Format expiry date
  const formatExpiry = () => {
    if (!currentEstimate) return '';
    const expiry = new Date(currentEstimate.expiresAt);
    return expiry.toLocaleString('nl-BE', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-2xl border-primary/20 sticky top-24"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">
          {t('quoteBuilder.summaryTitle')}
        </h3>
      </div>

      {/* Selected Service */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{t('quoteBuilder.service')}</span>
          <span className="text-foreground font-medium">
            {t(`servicePage.${serviceKey}.title`)}
          </span>
        </div>

        {tierKey && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('quoteBuilder.tier')}</span>
            <span className="text-foreground font-medium">
              {t(`servicePage.calculator.packages.${tierKey}`)}
            </span>
          </div>
        )}

        {selectedOptions.length > 0 && (
          <div className="text-sm">
            <span className="text-muted-foreground">{t('quoteBuilder.options')}</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {selectedOptions.map(opt => (
                <span key={opt} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                  {t(`servicePage.calculator.addons.${opt}`)}
                </span>
              ))}
            </div>
          </div>
        )}

        {adBudget && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t('quoteBuilder.adBudget')}</span>
            <span className="text-foreground font-medium">€{adBudget}/m</span>
          </div>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="border-t border-primary/10 pt-4 mb-4 space-y-2">
        {isPromoActive && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground line-through">
                {t('quoteBuilder.originalPrice')}
              </span>
              <span className="text-muted-foreground line-through">
                €{priceMin}–€{priceMax}
              </span>
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between text-sm"
            >
              <span className="text-primary flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {t('quoteBuilder.promoDiscount', { percent: DISCOUNT_PERCENTAGE })}
                <span className="text-xs text-muted-foreground">— nog {promoTimeRemaining}</span>
              </span>
              <span className="text-primary font-medium">-€{discountAmount}</span>
            </motion.div>
          </>
        )}

        <div className="flex justify-between items-baseline pt-2 border-t border-primary/10">
          <span className="text-foreground font-semibold">
            {t('quoteBuilder.estimatedMonthly')}
          </span>
          <span className="text-2xl font-bold gold-gradient-text">
            €{discountedMin}–€{discountedMax}
          </span>
        </div>

        {setupFee > 0 && (
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{t('quoteBuilder.setupFee')}</span>
            <span>€{setupFee} {t('quoteBuilder.oneTime')}</span>
          </div>
        )}
      </div>

      {/* Estimate ID Section */}
      <AnimatePresence>
        {currentEstimate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-primary/5 rounded-xl p-4 mb-4 border border-primary/20"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t('quoteBuilder.estimateId')}
              </span>
              <button
                onClick={handleCopyEstimateId}
                className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? t('quoteBuilder.copied') : t('quoteBuilder.copy')}
              </button>
            </div>
            <p className="font-mono text-lg font-bold text-foreground">{currentEstimate.id}</p>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{t('quoteBuilder.validUntil')}: {formatExpiry()} (24u)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTAs */}
      <div className="space-y-3">
        <Button
          onClick={onReservePrice}
          disabled={!isValid}
          className="w-full luxury-button group"
          size="lg"
        >
          <Calendar className="w-4 h-4 mr-2" />
          {t('quoteBuilder.reservePrice')}
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="w-full glass-button border-primary/30 hover:border-primary/50"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4 mr-2" />
            {t('quoteBuilder.chatWhatsApp')}
          </a>
        </Button>
      </div>

      {/* Trust/Urgency Lines */}
      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
        <p className="flex items-start gap-2">
          <span className="text-primary">•</span>
          {t('quoteBuilder.urgencyLine')}
        </p>
        <p className="flex items-start gap-2">
          <span className="text-primary">•</span>
          {t('quoteBuilder.proofLine')}
        </p>
      </div>

      {/* Helper text when invalid */}
      {!isValid && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          {t('quoteBuilder.selectRequired')}
        </p>
      )}
    </motion.div>
  );
});

QuoteSummaryCard.displayName = 'QuoteSummaryCard';

export default QuoteSummaryCard;
