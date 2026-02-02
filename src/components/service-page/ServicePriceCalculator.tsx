import { memo, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, MessageCircle, CreditCard, RefreshCw, Info, Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  WEBSITE_PRICING,
  SUBSCRIPTION_PRICING,
  DISCOUNT_CONFIG,
  getDiscountInfo,
  generateQuoteCode,
} from '@/config/pricingConfig';

interface ServicePriceCalculatorProps {
  serviceKey: string;
}

type PaymentType = 'one_time' | 'monthly';

// Service-specific pricing configurations
const getServicePricing = (serviceKey: string) => {
  switch (serviceKey) {
    case 'businessWebsite':
      return {
        type: 'one_time' as const,
        basePrice: WEBSITE_PRICING.business.oneTime,
        setupFee: 0,
        hasMonthly: false,
      };
    case 'onePageWebsite':
      return {
        type: 'one_time' as const,
        basePrice: WEBSITE_PRICING.onePage.oneTime,
        setupFee: 0,
        hasMonthly: false,
      };
    case 'ecommerce':
      return {
        type: 'one_time' as const,
        basePrice: WEBSITE_PRICING.ecommerce.oneTime,
        setupFee: 0,
        hasMonthly: false,
      };
    case 'socialMedia':
      return {
        type: 'monthly' as const,
        basePrice: SUBSCRIPTION_PRICING.socialMedia.baseMonthly,
        setupFee: SUBSCRIPTION_PRICING.socialMedia.setupFee,
        hasMonthly: true,
      };
    case 'adsManagement':
      return {
        type: 'monthly' as const,
        basePrice: SUBSCRIPTION_PRICING.adsManagement.baseMonthly,
        setupFee: SUBSCRIPTION_PRICING.adsManagement.setupFee,
        hasMonthly: true,
      };
    case 'seo':
      return {
        type: 'monthly' as const,
        basePrice: SUBSCRIPTION_PRICING.seo.baseMonthly,
        setupFee: SUBSCRIPTION_PRICING.seo.setupFee,
        hasMonthly: true,
      };
    default:
      return {
        type: 'one_time' as const,
        basePrice: 0,
        setupFee: 0,
        hasMonthly: false,
      };
  }
};

// Add-on options
const ADD_ONS = {
  extraPages: { price: 150, label: 'Extra pagina (+€150)' },
  seoSetup: { price: 200, label: 'SEO basis setup (+€200)' },
  contentWriting: { price: 250, label: 'Content schrijven (+€250)' },
  socialIntegration: { price: 100, label: 'Social media integratie (+€100)' },
  analyticsSetup: { price: 150, label: 'Analytics dashboard (+€150)' },
};

const ServicePriceCalculator = memo(({ serviceKey }: ServicePriceCalculatorProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [quoteCode] = useState(() => generateQuoteCode());

  const servicePricing = getServicePricing(serviceKey);

  // Step 1: Payment type
  const [paymentType, setPaymentType] = useState<PaymentType | null>(
    servicePricing.hasMonthly ? null : 'one_time'
  );

  // Add-ons state
  const [selectedAddons, setSelectedAddons] = useState<Record<string, boolean>>({
    extraPages: false,
    seoSetup: false,
    contentWriting: false,
    socialIntegration: false,
    analyticsSetup: false,
  });

  // Discount countdown
  const [discountDaysLeft, setDiscountDaysLeft] = useState(0);
  const [discountActive, setDiscountActive] = useState(false);

  useEffect(() => {
    const info = getDiscountInfo();
    setDiscountActive(info.active);
    setDiscountDaysLeft(info.daysLeft);
  }, []);

  // Calculate pricing
  const pricing = useMemo(() => {
    let addonsTotal = 0;
    Object.entries(selectedAddons).forEach(([key, enabled]) => {
      if (enabled && ADD_ONS[key as keyof typeof ADD_ONS]) {
        addonsTotal += ADD_ONS[key as keyof typeof ADD_ONS].price;
      }
    });

    const basePrice = servicePricing.basePrice;
    const setupFee = servicePricing.setupFee;
    const subtotal = basePrice + addonsTotal + setupFee;

    // Discount ONLY applies to one-time payments
    const discountEligible = paymentType === 'one_time' && discountActive;
    const discountAmount = discountEligible 
      ? Math.round(subtotal * (DISCOUNT_CONFIG.percentage / 100))
      : 0;
    
    const total = subtotal - discountAmount;

    return {
      basePrice,
      setupFee,
      addonsTotal,
      subtotal,
      discountAmount,
      discountEligible,
      total,
      isMonthly: servicePricing.hasMonthly && paymentType === 'monthly',
    };
  }, [selectedAddons, discountActive, paymentType, servicePricing]);

  const handleAddonToggle = (key: string) => {
    setSelectedAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(quoteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // WhatsApp message
  const generateWhatsAppMessage = () => {
    const serviceName = t(`servicePage.${serviceKey}.title`, serviceKey);
    const selectedAddonsList = Object.entries(selectedAddons)
      .filter(([, enabled]) => enabled)
      .map(([key]) => ADD_ONS[key as keyof typeof ADD_ONS]?.label || key)
      .join(', ');

    const paymentLabel = paymentType === 'one_time' ? 'Eenmalig project' : 'Maandelijks abonnement';

    const message = `Hallo! Hier is mijn berekening:

📋 Referentiecode: ${quoteCode}
🎯 Dienst: ${serviceName}
💳 Type: ${paymentLabel}
${selectedAddonsList ? `➕ Add-ons: ${selectedAddonsList}` : ''}

💰 Basisprijs: €${pricing.basePrice}${pricing.isMonthly ? '/maand' : ''}
${pricing.setupFee > 0 ? `🚀 Setup: €${pricing.setupFee}\n` : ''}${pricing.addonsTotal > 0 ? `➕ Add-ons: €${pricing.addonsTotal}\n` : ''}${pricing.discountAmount > 0 ? `🎉 Launchkorting (-${DISCOUNT_CONFIG.percentage}%): -€${pricing.discountAmount}\n` : ''}
✅ Totaal: €${pricing.total}${pricing.isMonthly ? '/maand' : ''} (excl. BTW)

Kan je dit bevestigen?`;

    return encodeURIComponent(message);
  };

  const whatsappUrl = `https://wa.me/32470123456?text=${generateWhatsAppMessage()}`;

  // For one-time only services, skip step 1
  const showPaymentTypeStep = servicePricing.hasMonthly;

  return (
    <section className="relative py-16 lg:py-24 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-primary/[0.04] to-primary/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-primary mb-4"
            >
              <Calculator className="w-5 h-5" />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase">
                {t('servicePage.calculator.label', 'Prijscalculator')}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text"
            >
              {t('servicePage.calculator.title', 'Bereken je prijs')}
            </motion.h2>
          </div>

          {/* Calculator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 lg:p-8 border-primary/20"
          >
            {/* STEP 1: Payment Type Selection (only for services with monthly option) */}
            {showPaymentTypeStep && (
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">1</span>
                  <Label className="text-lg font-semibold text-foreground">
                    {t('servicePage.calculator.step1', 'Kies je betaaltype')}
                  </Label>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setPaymentType('one_time')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      paymentType === 'one_time'
                        ? 'border-primary bg-primary/10'
                        : 'border-primary/20 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className={`w-5 h-5 ${paymentType === 'one_time' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-semibold ${paymentType === 'one_time' ? 'text-primary' : 'text-foreground'}`}>
                        {t('servicePage.calculator.oneTimeProject', 'Eenmalig project')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('servicePage.calculator.oneTimeDesc', 'Setup + eerste maand. Korting mogelijk.')}
                    </p>
                    {discountActive && (
                      <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                        <Sparkles className="w-3 h-3" />
                        -{DISCOUNT_CONFIG.percentage}% korting
                      </div>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setPaymentType('monthly')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      paymentType === 'monthly'
                        ? 'border-primary bg-primary/10'
                        : 'border-primary/20 hover:border-primary/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <RefreshCw className={`w-5 h-5 ${paymentType === 'monthly' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`font-semibold ${paymentType === 'monthly' ? 'text-primary' : 'text-foreground'}`}>
                        {t('servicePage.calculator.monthlySubscription', 'Maandelijks abonnement')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {t('servicePage.calculator.monthlyDesc', 'Doorlopend. Geen korting van toepassing.')}
                    </p>
                  </button>
                </div>
                
                {/* Discount notice for monthly */}
                {paymentType === 'monthly' && discountActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 p-3 rounded-lg bg-muted/50 border border-muted"
                  >
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>
                        {t('servicePage.calculator.noDiscountMonthly', 'De 20% launchkorting is niet van toepassing op maandelijkse abonnementen.')}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* STEP 2 (or STEP 1 for one-time services): Configure */}
            <AnimatePresence>
              {(paymentType || !showPaymentTypeStep) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                      {showPaymentTypeStep ? '2' : '1'}
                    </span>
                    <Label className="text-lg font-semibold text-foreground">
                      {t('servicePage.calculator.configureLabel', 'Configureer je pakket')}
                    </Label>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT: Base Price & Add-ons */}
                    <div className="space-y-6">
                      {/* Base Price Display */}
                      <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                        <div className="flex justify-between items-center">
                          <span className="text-foreground font-medium">Basisprijs</span>
                          <span className="text-2xl font-bold text-primary">
                            €{pricing.basePrice.toLocaleString('nl-BE')}
                            {pricing.isMonthly && <span className="text-sm font-normal">/maand</span>}
                          </span>
                        </div>
                        {pricing.setupFee > 0 && (
                          <div className="flex justify-between items-center mt-2 text-sm text-muted-foreground">
                            <span>+ Setup fee</span>
                            <span>€{pricing.setupFee}</span>
                          </div>
                        )}
                      </div>

                      {/* Add-ons */}
                      <div className="space-y-3">
                        <Label className="text-foreground font-medium">
                          {t('servicePage.calculator.addonsLabel', 'Extra opties')}
                        </Label>
                        {Object.entries(ADD_ONS).map(([key, addon]) => (
                          <div 
                            key={key} 
                            className="flex items-center justify-between p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                id={key}
                                checked={selectedAddons[key]}
                                onCheckedChange={() => handleAddonToggle(key)}
                              />
                              <label htmlFor={key} className="text-sm text-foreground cursor-pointer">
                                {addon.label}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* RIGHT: Summary */}
                    <div className="space-y-6 lg:pl-8 lg:border-l lg:border-primary/20">
                      {/* Price Breakdown */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between text-muted-foreground">
                            <span>Basisprijs</span>
                            <span>€{pricing.basePrice}</span>
                          </div>
                          {pricing.setupFee > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                              <span>Setup fee</span>
                              <span>€{pricing.setupFee}</span>
                            </div>
                          )}
                          {pricing.addonsTotal > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                              <span>Add-ons</span>
                              <span>€{pricing.addonsTotal}</span>
                            </div>
                          )}
                        </div>

                        <div className="border-t border-primary/20 pt-3 mt-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-muted-foreground">Subtotaal</span>
                            <span className={`font-semibold ${pricing.discountEligible ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                              €{pricing.subtotal}
                            </span>
                          </div>
                          
                          {pricing.discountEligible && (
                            <div className="flex justify-between items-center mb-2 text-primary">
                              <span className="flex items-center gap-1">
                                <Sparkles className="w-4 h-4" />
                                Launchkorting (-{DISCOUNT_CONFIG.percentage}%)
                              </span>
                              <span className="font-semibold">-€{pricing.discountAmount}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-2 border-t border-primary/10">
                            <span className="font-semibold text-foreground">Totaal</span>
                            <span className="text-2xl font-bold text-primary">
                              €{pricing.total}
                              {pricing.isMonthly && <span className="text-sm font-normal">/maand</span>}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t('pricing.vatExcludedNote', 'Alle prijzen excl. BTW.')}
                          </p>
                        </div>
                      </div>

                      {/* Quote Code */}
                      <div className="p-4 rounded-xl bg-muted/30 border border-muted">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Referentiecode</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyCode}
                            className="h-8 px-2"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-primary" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                        <div className="font-mono text-xl font-bold text-primary">
                          {quoteCode}
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-3">
                        <Button
                          asChild
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-5 h-5 mr-2" />
                            {t('servicePage.calculator.claimWhatsApp', 'Claim via WhatsApp')}
                          </a>
                        </Button>
                        
                        <p className="text-xs text-center text-muted-foreground">
                          {t('servicePage.calculator.confirmNote', 'Stuur je code door. Wij bevestigen binnen 24u.')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* VAT Disclaimer */}
            <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-muted">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-1">
                    {t('pricing.vatDisclaimer.title', 'Prijsinformatie')}
                  </p>
                  <ul className="space-y-1 text-xs">
                    <li>• {t('pricing.vatDisclaimer.line1', 'Alle prijzen zijn exclusief BTW (21%).')}</li>
                    <li>• {t('pricing.vatDisclaimer.line2', 'Korting geldt enkel voor eenmalige projecten.')}</li>
                    <li>• {t('pricing.vatDisclaimer.line3', 'Maandelijkse abonnementen zijn uitgesloten van korting.')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ServicePriceCalculator.displayName = 'ServicePriceCalculator';

export default ServicePriceCalculator;
