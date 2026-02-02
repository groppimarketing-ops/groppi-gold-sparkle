import { memo, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Send, MessageCircle, CreditCard, RefreshCw, Info, Clock, Sparkles, Copy, Check } from 'lucide-react';
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

interface ServicePriceCalculatorProps {
  serviceKey: string;
}

// Pricing constants (VAT excluded)
const PRICING = {
  base: {
    starter: { min: 350, max: 450 },
    growth: { min: 550, max: 750 },
    pro: { min: 950, max: 1350 },
  },
  setup: {
    starter: 150,
    growth: 250,
    pro: 450,
  },
  addons: {
    extraContent4: 120,
    extraContent12: 280,
    extraVideo2: 180,
    extraVideo6: 450,
    extraLandingPage: 350,
    extraTracking: 200,
  },
  adBudgetModifier: {
    '300': 0,
    '500': 50,
    '1000': 100,
    '3000': 200,
  },
};

// Discount settings
const DISCOUNT_PERCENTAGE = 20;
const DISCOUNT_DAYS = 10;
const STORAGE_KEY = 'groppi_launch_discount_start';

type PaymentType = 'one_time' | 'monthly';

const generateQuoteCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'GRO-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const ServicePriceCalculator = memo(({ serviceKey }: ServicePriceCalculatorProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [quoteCode] = useState(() => generateQuoteCode());

  // Step 1: Payment type
  const [paymentType, setPaymentType] = useState<PaymentType | null>(null);

  // Form state
  const [businessType, setBusinessType] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [packageLevel, setPackageLevel] = useState<'starter' | 'growth' | 'pro'>('growth');
  const [adBudget, setAdBudget] = useState<string>('500');
  const [addons, setAddons] = useState<Record<string, boolean>>({
    extraContent4: false,
    extraContent12: false,
    extraVideo2: false,
    extraVideo6: false,
    extraLandingPage: false,
    extraTracking: false,
  });

  // Discount countdown
  const [discountDaysLeft, setDiscountDaysLeft] = useState(0);
  const [discountActive, setDiscountActive] = useState(false);

  useEffect(() => {
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

  // Calculate pricing
  const pricing = useMemo(() => {
    const base = PRICING.base[packageLevel];
    const setup = PRICING.setup[packageLevel];
    const adModifier = PRICING.adBudgetModifier[adBudget as keyof typeof PRICING.adBudgetModifier] || 0;

    let addonsTotal = 0;
    Object.entries(addons).forEach(([key, enabled]) => {
      if (enabled) {
        addonsTotal += PRICING.addons[key as keyof typeof PRICING.addons] || 0;
      }
    });

    const monthlyMin = base.min + adModifier + addonsTotal;
    const monthlyMax = base.max + adModifier + addonsTotal;
    
    // Discount ONLY applies to one-time setup fees, NOT monthly subscriptions
    const discountEligible = paymentType === 'one_time' && discountActive;
    const setupDiscountAmount = discountEligible ? Math.round(setup * (DISCOUNT_PERCENTAGE / 100)) : 0;
    const discountedSetup = setup - setupDiscountAmount;
    
    const firstMonthMin = monthlyMin + discountedSetup;
    const firstMonthMax = monthlyMax + discountedSetup;

    return {
      monthlyMin,
      monthlyMax,
      setup,
      discountedSetup,
      setupDiscountAmount,
      discountEligible,
      firstMonthMin,
      firstMonthMax,
    };
  }, [packageLevel, adBudget, addons, discountActive, paymentType]);

  const handleAddonToggle = (key: string) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(quoteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // WhatsApp message with calculation
  const generateWhatsAppMessage = () => {
    const serviceName = t(`servicePage.${serviceKey}.title`);
    const selectedAddons = Object.entries(addons)
      .filter(([, enabled]) => enabled)
      .map(([key]) => t(`servicePage.calculator.addons.${key}`))
      .join(', ');

    const paymentLabel = paymentType === 'one_time' ? 'Eenmalig project' : 'Maandelijks abonnement';

    const message = `Hallo! Hier is mijn berekening:

📋 Referentiecode: ${quoteCode}
🎯 Dienst: ${serviceName}
💳 Type: ${paymentLabel}
🏢 Bedrijfstype: ${t(`servicePage.calculator.businessTypes.${businessType || 'other'}`)}
📈 Doel: ${t(`servicePage.calculator.goals.${goal || 'visibility'}`)}
📦 Pakket: ${t(`servicePage.calculator.packages.${packageLevel}`)}
💰 Advertentiebudget: €${adBudget}/maand
${selectedAddons ? `➕ Add-ons: ${selectedAddons}` : ''}

💵 Maandelijks: €${pricing.monthlyMin}–€${pricing.monthlyMax} (excl. BTW)
🚀 Setup: €${pricing.discountedSetup} (excl. BTW)${pricing.setupDiscountAmount > 0 ? ` (korting: -€${pricing.setupDiscountAmount})` : ''}

Kan je dit bevestigen?`;

    return encodeURIComponent(message);
  };

  const whatsappUrl = `https://wa.me/32470123456?text=${generateWhatsAppMessage()}`;

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
                {t('servicePage.calculator.label')}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text"
            >
              {t('servicePage.calculator.title')}
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
            {/* STEP 1: Payment Type Selection */}
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
                    {t('servicePage.calculator.oneTimeDesc', 'Setup + eerste maand. Korting op setup mogelijk.')}
                  </p>
                  {discountActive && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      -20% op setup
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

            {/* STEP 2: Configure - Only show after payment type selected */}
            <AnimatePresence>
              {paymentType && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm font-bold">2</span>
                    <Label className="text-lg font-semibold text-foreground">
                      {t('servicePage.calculator.step2Config', 'Configureer je pakket')}
                    </Label>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT: Inputs */}
                    <div className="space-y-6">
                      {/* Business Type */}
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium">
                          {t('servicePage.calculator.businessTypeLabel')}
                        </Label>
                        <Select value={businessType} onValueChange={setBusinessType}>
                          <SelectTrigger className="glass-card border-primary/20 hover:border-primary/40">
                            <SelectValue placeholder={t('servicePage.calculator.selectPlaceholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurant">{t('servicePage.calculator.businessTypes.restaurant')}</SelectItem>
                            <SelectItem value="retail">{t('servicePage.calculator.businessTypes.retail')}</SelectItem>
                            <SelectItem value="construction">{t('servicePage.calculator.businessTypes.construction')}</SelectItem>
                            <SelectItem value="beauty">{t('servicePage.calculator.businessTypes.beauty')}</SelectItem>
                            <SelectItem value="ecommerce">{t('servicePage.calculator.businessTypes.ecommerce')}</SelectItem>
                            <SelectItem value="other">{t('servicePage.calculator.businessTypes.other')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Goal */}
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium">
                          {t('servicePage.calculator.goalLabel')}
                        </Label>
                        <Select value={goal} onValueChange={setGoal}>
                          <SelectTrigger className="glass-card border-primary/20 hover:border-primary/40">
                            <SelectValue placeholder={t('servicePage.calculator.selectPlaceholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="visibility">{t('servicePage.calculator.goals.visibility')}</SelectItem>
                            <SelectItem value="leads">{t('servicePage.calculator.goals.leads')}</SelectItem>
                            <SelectItem value="sales">{t('servicePage.calculator.goals.sales')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Package Level */}
                      <div className="space-y-3">
                        <Label className="text-foreground font-medium">
                          {t('servicePage.calculator.packageLabel')}
                        </Label>
                        <div className="grid grid-cols-3 gap-3">
                          {(['starter', 'growth', 'pro'] as const).map((pkg) => (
                            <button
                              key={pkg}
                              onClick={() => setPackageLevel(pkg)}
                              className={`p-3 rounded-lg border text-center transition-all ${
                                packageLevel === pkg
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-primary/20 hover:border-primary/40 text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <span className="text-sm font-medium">
                                {t(`servicePage.calculator.packages.${pkg}`)}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Ad Budget */}
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium">
                          {t('servicePage.calculator.adBudgetLabel')}
                        </Label>
                        <Select value={adBudget} onValueChange={setAdBudget}>
                          <SelectTrigger className="glass-card border-primary/20 hover:border-primary/40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300">€300 / {t('servicePage.calculator.month')}</SelectItem>
                            <SelectItem value="500">€500 / {t('servicePage.calculator.month')}</SelectItem>
                            <SelectItem value="1000">€1.000 / {t('servicePage.calculator.month')}</SelectItem>
                            <SelectItem value="3000">€3.000 / {t('servicePage.calculator.month')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Add-ons */}
                      <div className="space-y-3">
                        <Label className="text-foreground font-medium">
                          {t('servicePage.calculator.addonsLabel')}
                        </Label>
                        <div className="space-y-2">
                          {Object.keys(PRICING.addons).map((key) => (
                            <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                              <div className="flex items-center gap-3">
                                <Checkbox
                                  id={key}
                                  checked={addons[key]}
                                  onCheckedChange={() => handleAddonToggle(key)}
                                  className="border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                />
                                <label htmlFor={key} className="text-sm text-foreground cursor-pointer">
                                  {t(`servicePage.calculator.addons.${key}`)}
                                </label>
                              </div>
                              <span className="text-sm text-primary font-medium">
                                +€{PRICING.addons[key as keyof typeof PRICING.addons]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT: Output */}
                    <div className="space-y-6 lg:pl-8 lg:border-l lg:border-primary/20">
                      {/* Quote Code */}
                      <div className="p-4 rounded-xl bg-background border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-2">
                          {t('servicePage.calculator.yourCode', 'Jouw referentiecode')}
                        </p>
                        <div className="flex items-center gap-3">
                          <code className="text-lg font-mono font-bold text-primary">{quoteCode}</code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyCode}
                            className="h-8 w-8 p-0"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-primary" />
                            ) : (
                              <Copy className="w-4 h-4 text-muted-foreground" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Monthly Service Fee */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">
                          {t('servicePage.calculator.monthlyFee')} <span className="text-xs">(excl. BTW)</span>
                        </p>
                        <p className="text-3xl font-bold text-primary">
                          €{pricing.monthlyMin}–€{pricing.monthlyMax}
                          <span className="text-lg font-normal text-muted-foreground ml-1">
                            / {t('servicePage.calculator.month')}
                          </span>
                        </p>
                      </div>

                      {/* Setup Fee */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground mb-1">
                          {t('servicePage.calculator.setupFee')} <span className="text-xs">(excl. BTW)</span>
                        </p>
                        <div className="flex items-baseline gap-2">
                          <p className="text-2xl font-bold text-foreground">
                            €{pricing.discountedSetup}
                          </p>
                          {pricing.setupDiscountAmount > 0 && (
                            <>
                              <span className="text-sm text-muted-foreground line-through">€{pricing.setup}</span>
                              <span className="text-sm text-primary font-medium">(-20%)</span>
                            </>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          ({t('servicePage.calculator.oneTime')})
                        </span>
                      </div>

                      {/* First Month Total */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30">
                        <p className="text-sm text-muted-foreground mb-1">
                          {t('servicePage.calculator.firstMonthTotal')} <span className="text-xs">(excl. BTW)</span>
                        </p>
                        <p className="text-3xl font-bold gold-gradient-text">
                          €{pricing.firstMonthMin}–€{pricing.firstMonthMax}
                        </p>
                      </div>

                      {/* VAT Note */}
                      <div className="p-3 rounded-lg bg-muted/30 border border-muted">
                        <p className="text-xs text-muted-foreground">
                          {t('servicePage.calculator.vatNote', 'Alle prijzen zijn exclusief BTW. BTW wordt toegevoegd op de definitieve factuur.')}
                        </p>
                      </div>

                      {/* Disclaimer */}
                      <p className="text-xs text-muted-foreground">
                        {t('servicePage.calculator.disclaimer')}
                      </p>

                      {/* CTA Buttons */}
                      <div className="space-y-3 pt-4">
                        <Button
                          asChild
                          className="w-full luxury-button group"
                          size="lg"
                        >
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {t('servicePage.calculator.claimWhatsapp', 'Claim je code via WhatsApp')}
                          </a>
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full glass-button border-primary/30"
                          asChild
                        >
                          <a href="https://calendly.com/groppi" target="_blank" rel="noopener noreferrer">
                            {t('servicePage.calculator.planCall', 'Plan een call')}
                          </a>
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          {t('servicePage.calculator.confirmNote', 'Stuur je code + keuze door. We bevestigen binnen 24u.')}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state */}
            {!paymentType && (
              <div className="text-center py-8 text-muted-foreground">
                <p>{t('servicePage.calculator.selectPaymentFirst', 'Selecteer eerst je betaaltype hierboven om verder te gaan.')}</p>
              </div>
            )}
          </motion.div>

          {/* Launch Discount Section */}
          {discountActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <div className="glass-card p-6 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/20">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary">
                        {t('servicePage.calculator.discountTitle', 'Start nu met 20% launchkorting')}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t('servicePage.calculator.discountSubtitle', 'Geldig voor 10 dagen — enkel op eenmalige projecten.')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-bold text-primary">
                      Nog {discountDaysLeft} {discountDaysLeft === 1 ? 'dag' : 'dagen'}
                    </span>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  *{t('servicePage.calculator.discountDisclaimer', 'Kortingen gelden enkel voor eenmalige projecten (setup). Maandelijkse abonnementen zijn uitgesloten.')}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
});

ServicePriceCalculator.displayName = 'ServicePriceCalculator';

export default ServicePriceCalculator;