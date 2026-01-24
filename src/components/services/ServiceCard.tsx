import { forwardRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Calendar, CreditCard, MessageSquare, LucideIcon, Check, Users, User, Video, Briefcase, Zap, Crown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ServiceDetailModal from './ServiceDetailModal';

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
}

interface ServiceCardProps {
  service: ServiceData;
  index: number;
}

const ServiceCard = forwardRef<HTMLDivElement, ServiceCardProps>(({ service, index }, ref) => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isRTL = i18n.language === 'ar' || i18n.language === 'ur';

  const getTargetAudienceIcon = (audience: string) => {
    switch (audience) {
      case 'business':
        return <Briefcase className="w-3 h-3" />;
      case 'individual':
        return <User className="w-3 h-3" />;
      case 'creator':
        return <Video className="w-3 h-3" />;
      default:
        return <Users className="w-3 h-3" />;
    }
  };

  const getPackageBadge = () => {
    if (!service.packageTier) return null;
    
    const configs = {
      starter: { icon: Zap, colorClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
      growth: { icon: Users, colorClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
      pro: { icon: Crown, colorClass: 'bg-primary/20 text-primary border-primary/30' },
    };
    
    const config = configs[service.packageTier];
    const Icon = config.icon;
    
    return (
      <Badge className={`${config.colorClass} gap-1`}>
        <Icon className="w-3 h-3" />
        {t(`services.packages.${service.packageTier}`)}
      </Badge>
    );
  };

  const getPricingBadge = () => {
    switch (service.pricingType) {
      case 'monthly':
        return (
          <Badge className="bg-primary/20 text-primary border-primary/30 gap-1">
            <Calendar className="w-3 h-3" />
            {t('services.monthly')}
          </Badge>
        );
      case 'one_time':
        return (
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 gap-1">
            <CreditCard className="w-3 h-3" />
            {t('services.oneTime')}
          </Badge>
        );
      default:
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 gap-1">
            <MessageSquare className="w-3 h-3" />
            {t('services.customQuote')}
          </Badge>
        );
    }
  };

  const getPriceDisplay = () => {
    const pricingLabel = service.pricingType === 'monthly' 
      ? t('services.perMonth')
      : service.pricingType === 'one_time'
      ? t('services.oneTimePayment')
      : '';

    if (service.pricingType === 'custom') {
      return (
        <div className="text-center">
          <span className="text-lg font-bold text-primary">{t('services.requestQuote')}</span>
        </div>
      );
    }
    
    if (service.priceMin && service.priceMax) {
      return (
        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
          <span className="text-xs text-muted-foreground">{t('services.startingFrom')}</span>
          <span className="text-xl font-bold text-primary">
            €{service.priceMin.toLocaleString()} - €{service.priceMax.toLocaleString()}
          </span>
          {pricingLabel && (
            <span className="text-xs text-muted-foreground">{pricingLabel}</span>
          )}
        </div>
      );
    }
    
    if (service.priceMin) {
      return (
        <div className={`flex flex-col ${isRTL ? 'items-end' : 'items-start'}`}>
          <span className="text-xs text-muted-foreground">{t('services.startingFrom')}</span>
          <span className="text-xl font-bold text-primary">
            €{service.priceMin.toLocaleString()}+
          </span>
          {pricingLabel && (
            <span className="text-xs text-muted-foreground">{pricingLabel}</span>
          )}
        </div>
      );
    }
    
    return (
      <span className="text-lg font-bold text-primary">{t('services.requestQuote')}</span>
    );
  };

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const handleWatchVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <GlassCard
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={handleViewDetails}
      >
        {/* Gradient Background */}
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
        />

        {/* Top Section: Badges */}
        <div className="relative flex flex-wrap items-start gap-2 mb-4">
          {getPricingBadge()}
          {getPackageBadge()}
        </div>

        {/* Target Audience */}
        <div className="relative flex flex-wrap gap-1.5 mb-4">
          {service.targetAudience.map((audience) => (
            <span 
              key={audience}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/30 px-2 py-1 rounded-full"
            >
              {getTargetAudienceIcon(audience)}
              {t(`services.audience.${audience}`)}
            </span>
          ))}
        </div>

        {/* Price Display */}
        <div className="relative mb-4">
          {getPriceDisplay()}
        </div>

        {/* Icon */}
        <motion.div 
          className="relative w-14 h-14 rounded-xl glass-card flex items-center justify-center mb-4 icon-3d"
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          <service.icon className="w-7 h-7 text-primary" />
        </motion.div>
        
        {/* Title */}
        <h3 className="relative text-xl font-bold mb-3 group-hover:gold-gradient-text transition-all duration-300">
          {t(service.titleKey)}
        </h3>
        
        {/* Description */}
        <p className="relative text-muted-foreground mb-5 text-sm leading-relaxed line-clamp-3">
          {t(service.descriptionKey)}
        </p>
        
        {/* Features / Key Inclusions */}
        <div className="relative mb-6 flex-grow">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
            {t('services.keyInclusions')}
          </p>
          <ul className="space-y-2">
            {service.features.slice(0, 4).map((featureKey, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{t(featureKey)}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA Buttons */}
        <div className="relative space-y-3 mt-auto">
          {/* Primary CTA */}
          <Button
            className="w-full luxury-button"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
          >
            {t('services.modal.viewDetails')}
            <ArrowRight className={`h-4 w-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'} group-hover:translate-x-1 transition-transform`} />
          </Button>

          {/* Secondary CTA - Watch Video */}
          <Button
            variant="outline"
            className="w-full glass-button gap-2"
            onClick={handleWatchVideo}
          >
            <Play className="w-4 h-4 text-primary" />
            {t('services.modal.watchVideo')}
          </Button>
        </div>
      </GlassCard>

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
