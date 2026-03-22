import { forwardRef, memo } from 'react';
import { Sparkles } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  showSparkle?: boolean;
}

/**
 * SectionHeader — pure CSS version (no framer-motion).
 * Uses animate-fade-up classes for GPU-accelerated entrance animations.
 * Respects prefers-reduced-motion via the CSS @media query in index.css.
 */
const SectionHeader = memo(forwardRef<HTMLDivElement, SectionHeaderProps>(({ 
  title, 
  subtitle, 
  description, 
  centered = true,
  showSparkle = false 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-16 animate-fade-up ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <div className={`flex items-center gap-2 mb-4 ${centered ? 'justify-center' : ''}`}>
          {showSparkle && <Sparkles className="w-4 h-4 text-primary" />}
          <span 
            className="text-primary font-medium text-sm uppercase tracking-[0.2em]"
            style={{ unicodeBidi: 'isolate' }}
          >
            {subtitle}
          </span>
          {showSparkle && <Sparkles className="w-4 h-4 text-primary" />}
        </div>
      )}
      
      <h2 
        className="text-3xl md:text-4xl lg:text-5xl font-bold gold-shimmer-text mb-5 tracking-tight heading-balanced"
        style={{ unicodeBidi: 'isolate' }}
      >
        {title}
      </h2>
      
      {description && (
        <p 
          className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ unicodeBidi: 'isolate' }}
        >
          {description}
        </p>
      )}
      
      {/* Decorative Line — CSS scale-in animation */}
      <div className={`mt-6 flex gap-2 animate-fade-up ${centered ? 'justify-center' : ''}`}>
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        <div className="w-3 h-0.5 bg-primary/50 rounded-full" />
        <div className="w-1 h-0.5 bg-primary/30 rounded-full" />
      </div>
    </div>
  );
}));

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
