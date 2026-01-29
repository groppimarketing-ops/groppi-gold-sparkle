import { forwardRef, memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  showSparkle?: boolean;
}

const SectionHeader = memo(forwardRef<HTMLDivElement, SectionHeaderProps>(({ 
  title, 
  subtitle, 
  description, 
  centered = true,
  showSparkle = false 
}, ref) => {
  const prefersReducedMotion = useReducedMotion();
  
  const fadeUp = prefersReducedMotion 
    ? { opacity: 0 } 
    : { opacity: 0, y: 16 };
  const fadeUpVisible = prefersReducedMotion 
    ? { opacity: 1 } 
    : { opacity: 1, y: 0 };

  return (
    <motion.div
      ref={ref}
      initial={fadeUp}
      whileInView={fadeUpVisible}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0.1 : 0.5 }}
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
      dir="ltr"
    >
      {subtitle && (
        <motion.div 
          initial={fadeUp}
          whileInView={fadeUpVisible}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.1 }}
          className={`flex items-center gap-2 mb-4 ${centered ? 'justify-center' : ''}`}
        >
          {showSparkle && <Sparkles className="w-4 h-4 text-primary" />}
          <span 
            className="text-primary font-medium text-sm uppercase tracking-[0.2em]"
            style={{ unicodeBidi: 'isolate' }}
          >
            {subtitle}
          </span>
          {showSparkle && <Sparkles className="w-4 h-4 text-primary" />}
        </motion.div>
      )}
      
      <motion.h2 
        initial={fadeUp}
        whileInView={fadeUpVisible}
        viewport={{ once: true }}
        transition={{ delay: prefersReducedMotion ? 0 : 0.15 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold gold-shimmer-text mb-5 tracking-tight heading-balanced"
        style={{ unicodeBidi: 'isolate' }}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p 
          initial={fadeUp}
          whileInView={fadeUpVisible}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.2 }}
          className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ unicodeBidi: 'isolate' }}
        >
          {description}
        </motion.p>
      )}
      
      {/* Decorative Line */}
      <motion.div 
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: prefersReducedMotion ? 0 : 0.3, duration: prefersReducedMotion ? 0.1 : 0.5 }}
        className={`mt-6 flex gap-2 ${centered ? 'justify-center' : ''}`}
      >
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        <div className="w-3 h-0.5 bg-primary/50 rounded-full" />
        <div className="w-1 h-0.5 bg-primary/30 rounded-full" />
      </motion.div>
    </motion.div>
  );
}));

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
