import { memo, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, Send, MessageCircle } from 'lucide-react';
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

// Pricing constants (editable)
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

const ServicePriceCalculator = memo(({ serviceKey }: ServicePriceCalculatorProps) => {
  const { t } = useTranslation();

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
    const firstMonthMin = monthlyMin + setup;
    const firstMonthMax = monthlyMax + setup;

    return {
      monthlyMin,
      monthlyMax,
      setup,
      firstMonthMin,
      firstMonthMax,
    };
  }, [packageLevel, adBudget, addons]);

  const handleAddonToggle = (key: string) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // WhatsApp message with calculation
  const generateWhatsAppMessage = () => {
    const serviceName = t(`servicePage.${serviceKey}.title`);
    const selectedAddons = Object.entries(addons)
      .filter(([, enabled]) => enabled)
      .map(([key]) => t(`servicePage.calculator.addons.${key}`))
      .join(', ');

    const message = t('servicePage.calculator.whatsappTemplate', {
      service: serviceName,
      businessType: t(`servicePage.calculator.businessTypes.${businessType || 'other'}`),
      goal: t(`servicePage.calculator.goals.${goal || 'visibility'}`),
      package: t(`servicePage.calculator.packages.${packageLevel}`),
      adBudget: `€${adBudget}`,
      addons: selectedAddons || t('servicePage.calculator.noAddons'),
      monthlyRange: `€${pricing.monthlyMin}–€${pricing.monthlyMax}`,
      setup: `€${pricing.setup}`,
    });

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
                <div className="space-y-4">
                  {/* Monthly Service Fee */}
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-1">
                      {t('servicePage.calculator.monthlyFee')}
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
                      {t('servicePage.calculator.setupFee')}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      €{pricing.setup}
                      <span className="text-sm font-normal text-muted-foreground ml-1">
                        ({t('servicePage.calculator.oneTime')})
                      </span>
                    </p>
                  </div>

                  {/* First Month Total */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30">
                    <p className="text-sm text-muted-foreground mb-1">
                      {t('servicePage.calculator.firstMonthTotal')}
                    </p>
                    <p className="text-3xl font-bold gold-gradient-text">
                      €{pricing.firstMonthMin}–€{pricing.firstMonthMax}
                    </p>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-xs text-muted-foreground">
                    {t('servicePage.calculator.disclaimer')}
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-4">
                  <Button className="w-full luxury-button group" size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    {t('servicePage.calculator.sendCalculation')}
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="w-full glass-button border-primary/30 hover:border-primary/50"
                  >
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t('servicePage.calculator.sendWhatsapp')}
                    </a>
                  </Button>
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
