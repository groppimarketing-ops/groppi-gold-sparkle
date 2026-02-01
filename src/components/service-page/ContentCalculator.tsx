import { memo, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calculator, Send, MessageCircle, Copy, Check, Clock, Sparkles, Image, Video, Film, FileText } from 'lucide-react';
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

// FIXED PRICING (as per user requirements)
const FIXED_PRICES = {
  poster: {
    ai: 25,
  },
  reel: {
    ai: 150,
    clientFootage: 200,
    onSite: 250,
  },
  video: 250, // 1 minute
  article: 99, // 600 words, fixed price
};

// Discount settings
const DISCOUNT_PERCENTAGE = 20;
const DISCOUNT_DAYS = 10;
const STORAGE_KEY = 'groppi_launch_discount_start';

const generateQuoteCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'GRO-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const ContentCalculator = memo(() => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [quoteCode] = useState(() => generateQuoteCode());
  
  // Quantities
  const [posterQty, setPosterQty] = useState(0);
  const [reelQty, setReelQty] = useState(0);
  const [reelType, setReelType] = useState<'ai' | 'clientFootage' | 'onSite'>('ai');
  const [videoQty, setVideoQty] = useState(0);
  const [articleQty, setArticleQty] = useState(0);

  // Discount countdown
  const [discountDaysLeft, setDiscountDaysLeft] = useState(0);
  const [discountActive, setDiscountActive] = useState(false);

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

  // Calculate pricing
  const pricing = useMemo(() => {
    const posterTotal = posterQty * FIXED_PRICES.poster.ai;
    const reelTotal = reelQty * FIXED_PRICES.reel[reelType];
    const videoTotal = videoQty * FIXED_PRICES.video;
    const articleTotal = articleQty * FIXED_PRICES.article;

    const subtotal = posterTotal + reelTotal + videoTotal + articleTotal;
    
    // Discount only applies if within 10-day window AND subtotal > 0
    const discountAmount = discountActive && subtotal > 0 
      ? Math.round(subtotal * (DISCOUNT_PERCENTAGE / 100))
      : 0;
    
    const total = subtotal - discountAmount;

    return {
      posterTotal,
      reelTotal,
      videoTotal,
      articleTotal,
      subtotal,
      discountAmount,
      total,
      hasItems: subtotal > 0,
    };
  }, [posterQty, reelQty, reelType, videoQty, articleQty, discountActive]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(quoteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

    const message = `Hallo! Hier is mijn berekening:

📋 Referentiecode: ${quoteCode}

${items.join('\n')}

💰 Subtotaal: €${pricing.subtotal}
${pricing.discountAmount > 0 ? `🎉 Korting (-20%): -€${pricing.discountAmount}\n` : ''}✅ Totaal: €${pricing.total}

Kan je dit bevestigen?`;

    return encodeURIComponent(message);
  };

  const whatsappUrl = `https://wa.me/32470123456?text=${generateWhatsAppMessage()}`;

  return (
    <section className="relative py-16 lg:py-24 bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-primary/[0.04] to-primary/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Launch Discount Badge */}
          {discountActive && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="glass-card p-4 border-primary/30 bg-primary/5 rounded-xl">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/20">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-primary">20% Launchkorting</p>
                      <p className="text-sm text-muted-foreground">
                        Geldt enkel voor eenmalige projecten
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
                <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
                  *Kortingen gelden enkel voor eenmalige projecten. Maandelijkse abonnementen zijn uitgesloten.
                </p>
              </div>
            </motion.div>
          )}

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
                Content Calculator
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold gold-gradient-text"
            >
              Bereken je contentprijs
            </motion.h2>
            <p className="text-muted-foreground mt-2">
              Vaste prijzen. Geen verrassingen.
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT: Inputs */}
              <div className="space-y-6">
                {/* Posters */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium flex items-center gap-2">
                    <Image className="w-4 h-4 text-primary" />
                    Posters (AI)
                    <span className="text-primary font-bold ml-auto">€{FIXED_PRICES.poster.ai}/stuk</span>
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
                    Reels
                  </Label>
                  <Select value={reelType} onValueChange={(v) => setReelType(v as typeof reelType)}>
                    <SelectTrigger className="glass-card border-primary/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ai">
                        AI volledig — €{FIXED_PRICES.reel.ai}/stuk
                      </SelectItem>
                      <SelectItem value="clientFootage">
                        Client footage (wij editen) — €{FIXED_PRICES.reel.clientFootage}/stuk
                      </SelectItem>
                      <SelectItem value="onSite">
                        Wij filmen on-site — €{FIXED_PRICES.reel.onSite}/stuk
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    min={0}
                    max={50}
                    value={reelQty}
                    onChange={(e) => setReelQty(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="Aantal"
                    className="glass-card border-primary/20"
                  />
                </div>

                {/* Videos */}
                <div className="space-y-2">
                  <Label className="text-foreground font-medium flex items-center gap-2">
                    <Video className="w-4 h-4 text-primary" />
                    Video's (1 minuut)
                    <span className="text-primary font-bold ml-auto">€{FIXED_PRICES.video}/stuk</span>
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
                    Artikels (600 woorden)
                    <span className="text-primary font-bold ml-auto">€{FIXED_PRICES.article} vast</span>
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
                  <p className="text-sm text-muted-foreground mb-1">Subtotaal</p>
                  <p className="text-2xl font-bold text-foreground">
                    €{pricing.subtotal}
                  </p>
                </div>

                {/* Discount */}
                {discountActive && pricing.discountAmount > 0 && (
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                    <p className="text-sm text-primary mb-1">Launchkorting (-20%)</p>
                    <p className="text-xl font-bold text-primary">
                      -€{pricing.discountAmount}
                    </p>
                  </div>
                )}

                {/* Total */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30">
                  <p className="text-sm text-muted-foreground mb-1">Totaal</p>
                  <p className="text-3xl font-bold gold-gradient-text">
                    €{pricing.total}
                  </p>
                </div>

                {/* Quote Code */}
                {pricing.hasItems && (
                  <div className="p-4 rounded-xl bg-background border border-primary/20">
                    <p className="text-xs text-muted-foreground mb-2">Jouw referentiecode</p>
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
                )}

                {/* Disclaimer */}
                <p className="text-xs text-muted-foreground">
                  Indicatieve prijs. Definitieve bevestiging via WhatsApp of call.
                </p>

                {/* CTA Buttons */}
                {pricing.hasItems && (
                  <div className="space-y-3 pt-4">
                    <Button
                      asChild
                      className="w-full luxury-button group"
                      size="lg"
                    >
                      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Claim je code via WhatsApp
                      </a>
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full glass-button border-primary/30"
                      asChild
                    >
                      <a href="https://calendly.com/groppi" target="_blank" rel="noopener noreferrer">
                        Plan een call
                      </a>
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Stuur je code + keuze door. We bevestigen binnen 24u.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContentCalculator.displayName = 'ContentCalculator';

export default ContentCalculator;
