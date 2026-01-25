import { motion } from 'framer-motion';
import { Target, TrendingUp, Eye, AlertCircle, Check, ChevronRight, HelpCircle, DollarSign, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface GoalScenario {
  goal: string;
  goalKey: string;
  budget: string;
  descriptionKey: string;
  icon: React.ElementType;
}

const AdsServiceContent = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  const goalScenarios: GoalScenario[] = [
    {
      goal: 'leadGeneration',
      goalKey: 'services.ads.goals.leadGeneration.title',
      budget: '€300',
      descriptionKey: 'services.ads.goals.leadGeneration.description',
      icon: Target,
    },
    {
      goal: 'ecommerce',
      goalKey: 'services.ads.goals.ecommerce.title',
      budget: '€500',
      descriptionKey: 'services.ads.goals.ecommerce.description',
      icon: TrendingUp,
    },
    {
      goal: 'brandAwareness',
      goalKey: 'services.ads.goals.brandAwareness.title',
      budget: '€200',
      descriptionKey: 'services.ads.goals.brandAwareness.description',
      icon: Eye,
    },
  ];

  const salesFlowSteps = [
    'services.ads.salesFlow.steps.0',
    'services.ads.salesFlow.steps.1',
    'services.ads.salesFlow.steps.2',
    'services.ads.salesFlow.steps.3',
    'services.ads.salesFlow.steps.4',
    'services.ads.salesFlow.steps.5',
  ];

  const faqItems = [
    { q: 'services.ads.faq.budgetIncluded.question', a: 'services.ads.faq.budgetIncluded.answer' },
    { q: 'services.ads.faq.smallBudget.question', a: 'services.ads.faq.smallBudget.answer' },
    { q: 'services.ads.faq.whoDecides.question', a: 'services.ads.faq.whoDecides.answer' },
    { q: 'services.ads.faq.lowerBudget.question', a: 'services.ads.faq.lowerBudget.answer' },
  ];

  return (
    <div className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Pre-pricing Qualification Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 rounded-xl border border-primary/20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold gold-gradient-text">
              {t('services.ads.qualification.headline')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('services.ads.qualification.description')}
            </p>
          </div>
        </div>

        {/* Goal Scenarios Grid */}
        <div className="grid gap-4 md:grid-cols-3 mt-6">
          {goalScenarios.map((scenario, idx) => (
            <motion.div
              key={scenario.goal}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-4 rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-3">
                <scenario.icon className="w-5 h-5 text-primary" />
                <span className="font-semibold text-sm">{t(scenario.goalKey)}</span>
              </div>
              <div className="mb-2">
                <span className="text-xs text-muted-foreground">
                  {t('services.ads.recommendedBudget')}
                </span>
                <p className="text-xl font-bold text-primary">
                  {t('services.startingFrom')} {scenario.budget}
                  <span className="text-xs font-normal text-muted-foreground">
                    {' '}{t('services.perMonth')}
                  </span>
                </p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t(scenario.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Budget Warning Note */}
        <div className="flex items-start gap-3 mt-6 p-4 rounded-lg bg-muted/20 border border-primary/20">
          <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            {t('services.ads.qualification.note')}
          </p>
        </div>
      </motion.div>

      {/* Budget Transparency Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 rounded-xl border border-primary/20"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold gold-gradient-text">
              {t('services.ads.transparency.headline')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('services.ads.transparency.subheadline')}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-4">
          {t('services.ads.transparency.description')}
        </p>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <DollarSign className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {t('services.ads.transparency.shortNote')}
          </span>
        </div>
      </motion.div>

      {/* Sales Flow Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {t('services.ads.salesFlow.title')}
        </h3>

        <div className="relative">
          {/* Connection Line */}
          <div className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-primary/10`} />

          <div className="space-y-4">
            {salesFlowSteps.map((stepKey, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * idx }}
                className={`flex items-start gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary relative z-10">
                  {idx + 1}
                </div>
                <div className="flex-1 glass-card p-3 rounded-lg">
                  <p className="text-sm text-foreground">{t(stepKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing Statement */}
        <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
          <p className="text-sm font-medium gold-gradient-text">
            {t('services.ads.salesFlow.closingStatement')}
          </p>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-6 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          {t('services.ads.faq.title')}
        </h3>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border-primary/10">
              <AccordionTrigger className="text-sm hover:text-primary hover:no-underline">
                {t(item.q)}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {t(item.a)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  );
};

export default AdsServiceContent;
