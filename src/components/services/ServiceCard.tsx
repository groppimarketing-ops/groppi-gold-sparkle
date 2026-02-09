import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Calendar, CreditCard, MessageSquare, LucideIcon, Check, Users, User, Video, Briefcase, Zap, Crown, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceDetailModal from './ServiceDetailModal';
import ServiceVideoModal from './ServiceVideoModal';
import { SERVICE_PRICING_CONFIG, getPriceDisplayString, getPriceSuffix } from '@/config/pricingConfig';

export interface ServicePackage {
  id: 'starter' | 'growth' | 'pro';
  titleKey: string;
  features: string[];
}

export interface ServiceDeliverable {
  key: string;
  quantity?: string;
}

export interface ServiceData {
  id: string;
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
  features: string[];
  gradient: string;
  pricingType: 'one_time' | 'monthly' | 'custom';
  priceMin?: number;
  priceMax?: number;
  videoUrl?: string;
  imageUrl?: string;
  // New fields for enhanced services
  targetAudience: ('business' | 'individual' | 'creator')[];
  packageTier?: 'starter' | 'growth' | 'pro';
  packages?: ServicePackage[];
  deliverables?: ServiceDeliverable[];
  pricingExplanationKey?: string;
  hasCalculator?: boolean;
}

interface ServiceCardProps {
  service: ServiceData;
  index: number;
  isFeatured?: boolean;
  isHighlighted?: boolean;
}

// Service IDs that have dedicated detail pages
const SERVICES_WITH_PAGES = [
  'social-media',
  'ads-management',
  'content-production',
  'seo',
  'business-website',
  'one-page-website',
  'ecommerce-website',
  'branding',
];

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(({ service, index, isFeatured = false, isHighlighted = false }, ref) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  // Determine if this service has a dedicated page
  const hasDetailPage = SERVICES_WITH_PAGES.includes(service.id);
  
  // DEBUG: log service.id for video mapping verification
  if (import.meta.env.DEV) {
    console.log(`[ServiceCard] service.id = "${service.id}"`);
  }

  // Determine if this service has a calculator
  const hasCalculator = service.id === 'social-media' || service.id === 'ads-management';

  const getPricingBadge = () => {
    // All badges use gold styling only - no colored badges
    switch (service.pricingType) {
      case 'monthly':
        return (
          <Badge className="bg-primary/10 text-primary border-primary/30 gap-1">
            <Calendar className="w-3 h-3" />
            {t('services.monthly')}
          </Badge>
        );
      case 'one_time':
        return (
          <Badge className="bg-primary/10 text-primary border-primary/30 gap-1">
            <CreditCard className="w-3 h-3" />
            {t('services.oneTime')}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-primary/10 text-primary border-primary/30 gap-1">
            <MessageSquare className="w-3 h-3" />
            {t('services.customQuote')}
          </Badge>
        );
    }
  };

  const getPriceDisplay = () => {
    // Use centralized pricing config
    const config = SERVICE_PRICING_CONFIG[service.id];
    
    if (config) {
      const priceStr = getPriceDisplayString(config, t);
      const suffix = getPriceSuffix(config, t);
      
      return (
        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
          <span className="text-2xl font-bold text-primary">{priceStr}</span>
          {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
        </div>
      );
    }
    
    // Fallback for services not in centralized config
    if (service.pricingType === 'custom') {
      return (
        <div className="text-center">
          <span className="text-lg font-bold text-primary">{t('services.requestQuote')}</span>
        </div>
      );
    }
    
    if (service.priceMin) {
      const pricingLabel = service.pricingType === 'monthly' ? t('services.perMonth') : '';
      return (
        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
          <span className="text-xs text-muted-foreground">{t('services.startingFrom')}</span>
          <span className="text-2xl font-bold text-primary">€{service.priceMin.toLocaleString()}</span>
          {pricingLabel && <span className="text-xs text-muted-foreground">{pricingLabel}</span>}
        </div>
      );
    }
    
    return (
      <span className="text-lg font-bold text-primary">{t('services.requestQuote')}</span>
    );
  };

  const handleViewDetails = () => {
    if (hasDetailPage) {
      // Navigate to the dedicated service detail page
      navigate(`/services/${service.id}`);
    } else {
      // Fallback to modal for services without dedicated pages
      setIsModalOpen(true);
    }
  };

  const handleWatchVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVideoModalOpen(true);
  };

  const handleVideoModalContinue = () => {
    setIsVideoModalOpen(false);
    if (hasDetailPage) {
      navigate(`/services/${service.id}`);
    } else {
      setIsModalOpen(true);
    }
  };

  // Get simple explanation line for the service
  const getSimpleExplanation = (): string => {
    const explanationKey = `services.simpleExplanation.${service.id.replace(/-/g, '_')}`;
    const explanation = t(explanationKey);
    return explanation !== explanationKey ? explanation : '';
  };

  return (
    <>
      <GlassCard
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className={`group relative overflow-hidden flex flex-col h-full transition-all duration-500 hover:ring-1 hover:ring-primary/40 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] ${
          isFeatured ? 'ring-2 ring-primary/40 shadow-[0_0_30px_hsl(var(--primary)/0.15)]' : ''
        } ${
          isHighlighted ? 'ring-2 ring-primary/60 shadow-[0_0_50px_hsl(var(--primary)/0.25)]' : ''
        }`}
      >
        {/* Gold Gradient Background on hover - no colored gradients */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
        />

        {/* Top Section: Badge */}
        <div className="relative flex flex-wrap items-start gap-2 mb-4">
          {getPricingBadge()}
        </div>

        {/* Icon */}
        <motion.div 
          className="relative w-14 h-14 rounded-xl glass-card flex items-center justify-center mb-4 icon-3d"
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          <service.icon className="w-7 h-7 text-primary" />
        </motion.div>
        
        {/* Title */}
        <h3 className="relative text-xl font-bold mb-2 group-hover:gold-gradient-text transition-all duration-300">
          {t(service.titleKey)}
        </h3>

        {/* Simple Explanation Line */}
        {getSimpleExplanation() && (
          <p className="relative text-sm text-muted-foreground mb-4 leading-relaxed">
            {getSimpleExplanation()}
          </p>
        )}

        {/* Price Display - Now more prominent */}
        <div className="relative mb-6 p-3 rounded-lg bg-primary/5 border border-primary/10">
          {getPriceDisplay()}
          <span className="text-[10px] text-muted-foreground">{t('pricing.vatExcluded')}</span>
        </div>
        
        {/* CTA Buttons - VIDEO FIRST */}
        <div className="relative space-y-3 mt-auto">
          {/* PRIMARY CTA - Watch Video */}
          <Button
            className="w-full luxury-button group/btn relative overflow-hidden"
            onClick={handleWatchVideo}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/10 to-primary/0"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
            <Play className="w-5 h-5 fill-current" />
            <span className={`${isRTL ? 'mr-2' : 'ml-2'}`}>{t('services.card.watchVideo')}</span>
          </Button>

          {/* SECONDARY CTA - Build Plan or View Details */}
          {hasCalculator ? (
            <Button
              variant="outline"
              className="w-full glass-button gap-2 hover:border-primary/50 group/calc"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              <Calculator className="w-4 h-4 text-primary group-hover/calc:scale-110 transition-transform" />
              {t('services.card.buildPlan')}
            </Button>
          ) : (
            <Button
              variant="outline"
              className="w-full glass-button gap-2"
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails();
              }}
            >
              {t('services.modal.viewDetails')}
              <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-1 rotate-180' : 'ml-1'}`} />
            </Button>
          )}

          {/* Helper micro-text for calculator */}
          {hasCalculator && (
            <p className="text-xs text-center text-muted-foreground">
              {t('services.card.calculatorHint')}
            </p>
          )}
        </div>
      </GlassCard>

      {/* Video Modal - Primary explanation layer */}
      <ServiceVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onContinueToDetails={handleVideoModalContinue}
        service={service}
      />

      {/* Detail Modal */}
      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={service}
      />
    </>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default ServiceCard;
