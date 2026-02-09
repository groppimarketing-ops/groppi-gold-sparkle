import { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import type { PortfolioItem } from '@/types/portfolio';
import { serviceTagLabels } from '@/types/portfolio';
interface PortfolioCardProps {
  item: PortfolioItem;
  onClick: () => void;
  index?: number;
}
const PortfolioCard = memo(({
  item,
  onClick,
  index = 0
}: PortfolioCardProps) => {
  const {
    t,
    i18n
  } = useTranslation();
  const lang = i18n.language.startsWith('nl') ? 'nl' : 'en';
  return <motion.article initial={{
    opacity: 0,
    y: 30
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    delay: index * 0.08,
    duration: 0.4,
    ease: [0.25, 0.1, 0.25, 1]
  }}>
      <button onClick={onClick} className="group block w-full text-left glass-card p-0 overflow-hidden rounded-xl border border-border/50 hover:border-primary/60 hover:shadow-[0_0_40px_hsl(var(--gold)/0.22)] hover:-translate-y-2 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-label={`${item.clientName} - ${t('portfolio.viewCase', 'Bekijk case')}`}>
        {/* Thumbnail */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <img src={item.coverMedia.url} alt={item.coverMedia.alt || item.clientName} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" width={400} height={300} />
          
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Hover overlay with gold tint */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />

          {/* View case overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg shadow">
            <span className="px-5 py-2.5 rounded-full bg-primary/95 text-primary-foreground text-sm font-semibold flex items-center gap-2 shadow-[0_0_25px_hsl(var(--gold)/0.5)]">
              {t('portfolio.viewCase', 'Bekijk case')}
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-2">
            {item.clientLogo && (
              <img src={item.clientLogo} alt={`${item.clientName} logo`} className="w-8 h-8 object-contain rounded" loading="lazy" />
            )}
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {item.clientName}
            </h3>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {item.services.map(service => <Badge key={service} variant="outline" className="text-[10px] px-2 py-0.5 border-primary/30 text-primary/80 group-hover:border-primary/50">
                {serviceTagLabels[service][lang]}
              </Badge>)}
          </div>

          {/* Result metric */}
          <p className="text-primary font-medium text-sm">
            {item.shortResultLine}
          </p>
        </div>
      </button>
    </motion.article>;
});
PortfolioCard.displayName = 'PortfolioCard';
export default PortfolioCard;