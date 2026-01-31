import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { TierKey } from './types';

interface QuoteBuilderSelectorsProps {
  serviceKey: string;
  tierKey: TierKey | null;
  setTierKey: (tier: TierKey) => void;
  selectedOptions: string[];
  toggleOption: (option: string) => void;
  adBudget: string | null;
  setAdBudget: (budget: string) => void;
  showAdBudget: boolean;
  availableOptions: string[];
}

const TIERS: TierKey[] = ['starter', 'growth', 'pro'];

const AD_BUDGETS = [
  { value: '300', label: '€300/m' },
  { value: '500', label: '€500/m' },
  { value: '1000', label: '€1.000/m' },
  { value: '3000', label: '€3.000/m' },
];

const QuoteBuilderSelectors = memo(({
  serviceKey,
  tierKey,
  setTierKey,
  selectedOptions,
  toggleOption,
  adBudget,
  setAdBudget,
  showAdBudget,
  availableOptions,
}: QuoteBuilderSelectorsProps) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      {/* Tier Selection */}
      <div className="space-y-4">
        <Label className="text-foreground font-semibold text-base">
          {t('quoteBuilder.selectTier')}
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {TIERS.map((tier) => (
            <motion.button
              key={tier}
              onClick={() => setTierKey(tier)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl border text-left transition-all ${
                tierKey === tier
                  ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(var(--primary)/0.2)]'
                  : 'border-primary/20 hover:border-primary/40 bg-card/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-semibold ${tierKey === tier ? 'text-primary' : 'text-foreground'}`}>
                  {t(`servicePage.calculator.packages.${tier}`)}
                </span>
                {tier === 'growth' && (
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold rounded-full uppercase">
                    {t('quoteBuilder.mostChosen')}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {t(`servicePage.${serviceKey}.packages.${tier}.description`)}
              </p>
              <p className="text-sm font-medium text-primary mt-2">
                {t(`servicePage.${serviceKey}.packages.${tier}.price`)}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Options (Checkboxes) */}
      {availableOptions.length > 0 && (
        <div className="space-y-4">
          <Label className="text-foreground font-semibold text-base">
            {t('quoteBuilder.selectOptions')}
          </Label>
          <div className="space-y-2">
            {availableOptions.map((optionKey) => (
              <motion.div
                key={optionKey}
                whileHover={{ x: 4 }}
                className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${
                  selectedOptions.includes(optionKey)
                    ? 'bg-primary/10 border border-primary/30'
                    : 'bg-primary/5 border border-transparent hover:bg-primary/10'
                }`}
                onClick={() => toggleOption(optionKey)}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    id={optionKey}
                    checked={selectedOptions.includes(optionKey)}
                    onCheckedChange={() => toggleOption(optionKey)}
                    className="border-primary/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <label htmlFor={optionKey} className="text-sm text-foreground cursor-pointer">
                    {t(`servicePage.calculator.addons.${optionKey}`)}
                  </label>
                </div>
                <span className="text-sm text-primary font-medium">
                  +€{t(`quoteBuilder.optionPrices.${optionKey}`, { defaultValue: '0' })}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Ad Budget (Radio - only for ads services) */}
      {showAdBudget && (
        <div className="space-y-4">
          <Label className="text-foreground font-semibold text-base">
            {t('quoteBuilder.selectAdBudget')}
          </Label>
          <p className="text-xs text-muted-foreground -mt-2">
            {t('quoteBuilder.adBudgetNote')}
          </p>
          <RadioGroup
            value={adBudget || ''}
            onValueChange={setAdBudget}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {AD_BUDGETS.map(({ value, label }) => (
              <motion.div
                key={value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center justify-center p-4 rounded-xl border cursor-pointer transition-all ${
                  adBudget === value
                    ? 'border-primary bg-primary/10'
                    : 'border-primary/20 hover:border-primary/40 bg-card/50'
                }`}
              >
                <RadioGroupItem value={value} id={`budget-${value}`} className="sr-only" />
                <Label
                  htmlFor={`budget-${value}`}
                  className={`cursor-pointer font-medium ${
                    adBudget === value ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {label}
                </Label>
              </motion.div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
});

QuoteBuilderSelectors.displayName = 'QuoteBuilderSelectors';

export default QuoteBuilderSelectors;
