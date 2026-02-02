import { memo, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, MessageCircle, Sparkles, Image, Video, Film, FileText, CreditCard, RefreshCw, Info, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CONTENT_PRICING,
  DISCOUNT_CONFIG,
} from '@/config/pricingConfig';
import DiscountCountdownCard from './DiscountCountdownCard';
import { trackEvent, socialLinks } from '@/utils/tracking';

const CALENDLY_URL = socialLinks.calendly;

type PaymentType = 'one_time' | 'monthly';

// Check if discount is active from localStorage
function isDiscountActiveFromStorage(): boolean {
  const expiresAt = localStorage.getItem('gro_discount_expiresAt');
  if (!expiresAt) return false;
  return Date.now() < Number(expiresAt);
}

const ContentCalculator = memo(() => {
  const { t } = useTranslation();
  
  // Step 1: Payment type
  const [paymentType, setPaymentType] = useState<PaymentType | null>(null);
  
  // Quantities
  const [posterQty, setPosterQty] = useState(0);
  const [reelQty, setReelQty] = useState(0);
  const [reelType, setReelType] = useState<'ai' | 'clientFootage' | 'onSite'>('ai');
  const [videoQty, setVideoQty] = useState(0);
  const [articleQty, setArticleQty] = useState(0);

  // Calculate pricing using centralized config
  const pricing = useMemo(() => {
    const posterTotal = posterQty * CONTENT_PRICING.poster.ai;
    const reelTotal = reelQty * CONTENT_PRICING.reel[reelType];
    const videoTotal = videoQty * CONTENT_PRICING.video;
    const articleTotal = articleQty * CONTENT_PRICING.article;

    const subtotal = posterTotal + reelTotal + videoTotal + articleTotal;
    const hasItems = subtotal > 0;
    
    // Check if discount is active (from localStorage)
    const isDiscountActive = paymentType === 'one_time' && hasItems && isDiscountActiveFromStorage();
    
    // Discount ONLY applies to one-time payments when active
    const discountEligible = isDiscountActive;
    const discountAmount = discountEligible 
      ? Math.round(subtotal * (DISCOUNT_CONFIG.percentage / 100))
      : 0;
    
    const total = subtotal - discountAmount;

    return {
      posterTotal,
      reelTotal,
      videoTotal,
      articleTotal,
      subtotal,
      discountAmount,
      discountEligible,
      total,
      hasItems,
    };
  }, [posterQty, reelQty, reelType, videoQty, articleQty, paymentType]);

  // Get discount code from localStorage for WhatsApp message
  const getDiscountCode = (): string => {
    return localStorage.getItem('gro_discount_code') || 'N/A';
  };

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const items: string[] = [];
    if (posterQty > 0) items.push(`${posterQty}x Poster (AI) = €${pricing.posterTotal}`);
    if (reelQty > 0) {
      const reelTypeName = reelType === 'ai' ? 'AI' : reelType === 'clientFootage' ? 'Client Footage' : 'On-site';
      items.push(`${reelQty}x Reel (${reelTypeName}) = €${pricing.reelTotal}`);
    }
    if (videoQty > 0) items.push(`${videoQty}x Video (1 min) = €${pricing.videoTotal}`);
    if (articleQty > 0) items.push(`${articleQty}x Artikel (600w) = €${pricing.articleTotal}`);

    const paymentLabel = paymentType === 'one_time' 
      ? t('calculator.payment.oneTime') 
      : t('calculator.payment.monthly');
    
    const message = `Hallo! Hier is mijn berekening:

📋 ${t('calculator.referenceCode')}: ${getDiscountCode()}
💳 Type: ${paymentLabel}

${items.join('\n')}

💰 ${t('calculator.subtotal')}: €${pricing.subtotal} (${t('pricing.vatExcluded')})
${pricing.discountAmount > 0 ? `🎉 ${t('calculator.discountBadge')}: -€${pricing.discountAmount}\n` : ''}✅ ${t('calculator.total')}: €${pricing.total} (${t('pricing.vatExcluded')})

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
                {t('servicePage.contentCalculator.label')}
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text"
            >
              {t('servicePage.contentCalculator.title')}
            </motion.h2>
            <p className="text-muted-foreground mt-2">
              {t('servicePage.contentCalculator.subtitle')}
            </p>
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
                  {t('calculator.step1')}
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
                      {t('calculator.payment.oneTime')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('calculator.payment.oneTimeDesc')}
                  </p>
                  {isDiscountActiveFromStorage() && (
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      <Sparkles className="w-3 h-3" />
                      {t('calculator.discountBadge')}
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
                      {t('calculator.payment.monthly')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {t('calculator.payment.monthlyDesc')}
                  </p>
                </button>
              </div>
              
              {/* Discount notice for monthly */}
              {paymentType === 'monthly' && isDiscountActiveFromStorage() && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-3 rounded-lg bg-muted/50 border border-muted"
                >
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>
                      {t('calculator.noDiscountMonthly')}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* STEP 2: Select Deliverables - Only show after payment type selected */}
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
                      {t('calculator.step2')}
                    </Label>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT: Inputs */}
                    <div className="space-y-6">
                      {/* Posters */}
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium flex items-center gap-2">
                          <Image className="w-4 h-4 text-primary" />
                          {t('servicePage.contentCalculator.posters')}
                          <span className="text-primary font-bold ml-auto">€{CONTENT_PRICING.poster.ai}/{t('servicePage.contentCalculator.perItem')}</span>
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          max={50}
                          value={posterQty}
                          onChange={(e) => setPosterQty(Math.max(0, parseInt(e.target.value) || 0))}
                          className="glass-card border-primary/20"
                        />
                      </div>

                      {/* Reels */}
                      <div className="space-y-3">
                        <Label className="text-foreground font-medium flex items-center gap-2">
                          <Film className="w-4 h-4 text-primary" />
                          {t('servicePage.contentCalculator.reels')}
                        </Label>
                        <Select value={reelType} onValueChange={(v) => setReelType(v as typeof reelType)}>
                          <SelectTrigger className="glass-card border-primary/20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ai">
                              {t('servicePage.contentCalculator.reelTypes.ai')} — €{CONTENT_PRICING.reel.ai}/{t('servicePage.contentCalculator.perItem')}
                            </SelectItem>
                            <SelectItem value="clientFootage">
                              {t('servicePage.contentCalculator.reelTypes.clientFootage')} — €{CONTENT_PRICING.reel.clientFootage}/{t('servicePage.contentCalculator.perItem')}
                            </SelectItem>
                            <SelectItem value="onSite">
                              {t('servicePage.contentCalculator.reelTypes.onSite')} — €{CONTENT_PRICING.reel.onSite}/{t('servicePage.contentCalculator.perItem')}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          min={0}
                          max={50}
                          value={reelQty}
                          onChange={(e) => setReelQty(Math.max(0, parseInt(e.target.value) || 0))}
                          placeholder={t('servicePage.contentCalculator.quantity')}
                          className="glass-card border-primary/20"
                        />
                      </div>

                      {/* Videos */}
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium flex items-center gap-2">
                          <Video className="w-4 h-4 text-primary" />
                          {t('servicePage.contentCalculator.videos')}
                          <span className="text-primary font-bold ml-auto">€{CONTENT_PRICING.video}/{t('servicePage.contentCalculator.perItem')}</span>
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          max={50}
                          value={videoQty}
                          onChange={(e) => setVideoQty(Math.max(0, parseInt(e.target.value) || 0))}
                          className="glass-card border-primary/20"
                        />
                      </div>

                      {/* Articles */}
                      <div className="space-y-2">
                        <Label className="text-foreground font-medium flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          {t('servicePage.contentCalculator.articles')}
                          <span className="text-primary font-bold ml-auto">€{CONTENT_PRICING.article} {t('servicePage.contentCalculator.fixed')}</span>
                        </Label>
                        <Input
                          type="number"
                          min={0}
                          max={50}
                          value={articleQty}
                          onChange={(e) => setArticleQty(Math.max(0, parseInt(e.target.value) || 0))}
                          className="glass-card border-primary/20"
                        />
                      </div>
                    </div>

                    {/* RIGHT: Output */}
                    <div className="space-y-6 lg:pl-8 lg:border-l lg:border-primary/20">
                      {/* Line Items */}
                      {pricing.hasItems && (
                        <div className="space-y-2 text-sm">
                          {posterQty > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                              <span>{posterQty}x Poster (AI)</span>
                              <span>€{pricing.posterTotal}</span>
                            </div>
                          )}
                          {reelQty > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                              <span>{reelQty}x Reel ({reelType === 'ai' ? 'AI' : reelType === 'clientFootage' ? 'Edit' : 'On-site'})</span>
                              <span>€{pricing.reelTotal}</span>
                            </div>
                          )}
                          {videoQty > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                              <span>{videoQty}x Video (1 min)</span>
                              <span>€{pricing.videoTotal}</span>
                            </div>
                          )}
                          {articleQty > 0 && (
                            <div className="flex justify-between text-muted-foreground">
                              <span>{articleQty}x Artikel</span>
                              <span>€{pricing.articleTotal}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Subtotal */}
                      <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-muted-foreground">{t('calculator.subtotal')}</span>
                          <span className={`font-semibold ${pricing.discountEligible ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                            €{pricing.subtotal}
                          </span>
                        </div>
                        
                        {pricing.discountEligible && (
                          <div className="flex justify-between items-center mb-2 text-primary">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-4 h-4" />
                              {t('calculator.discountBadge')}
                            </span>
                            <span className="font-semibold">-€{pricing.discountAmount}</span>
                          </div>
                        )}
                        
                        <div className="border-t border-primary/20 pt-2 mt-2">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-foreground">{t('calculator.total')}</span>
                            <span className="text-2xl font-bold text-primary">€{pricing.total}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t('pricing.vatExcludedNote')}
                          </p>
                        </div>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-3">
                        <Button
                          asChild
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          disabled={!pricing.hasItems}
                        >
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            {t('calculator.cta.whatsapp')}
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full glass-button"
                          asChild
                        >
                          <a 
                            href={CALENDLY_URL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => trackEvent({ event: 'calendly_click', location: 'services_calculator' })}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            {t('calculator.cta.planCall')}
                          </a>
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">
                          {t('calculator.cta.planCallHelper')}
                        </p>
                      </div>

                      {/* Discount Countdown Card - only shows after one-time payment + items selected */}
                      <DiscountCountdownCard
                        isOneTime={paymentType === 'one_time'}
                        hasCalculatedPrice={pricing.hasItems}
                        triggerOnPageView={true}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContentCalculator.displayName = 'ContentCalculator';

export default ContentCalculator;
