import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  showSparkle?: boolean;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(({ 
  title, 
  subtitle, 
  description, 
  centered = true,
  showSparkle = false 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-16 ${centered ? 'text-center' : ''}`}
      dir="ltr"
    >
      {subtitle && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
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
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold gold-shimmer-text mb-6 tracking-tight"
        style={{ unicodeBidi: 'isolate' }}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground max-w-2xl mx-auto text-lg"
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
        transition={{ delay: 0.4, duration: 0.6 }}
        className={`mt-8 flex gap-2 ${centered ? 'justify-center' : ''}`}
      >
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        <div className="w-3 h-0.5 bg-primary/50 rounded-full" />
        <div className="w-1 h-0.5 bg-primary/30 rounded-full" />
      </motion.div>
    </motion.div>
  );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
