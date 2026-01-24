import { forwardRef, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
  glowOnHover?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({ 
  children, 
  className, 
  hover3D = true,
  glowOnHover = true,
  ...props 
}, ref) => {
  return (
    <motion.div
      ref={ref}
      className={cn(
        'glass-card p-6 transition-all duration-500',
        hover3D && 'card-3d',
        glowOnHover && 'hover:animate-pulse-glow',
        className
      )}
      whileHover={hover3D ? {
        scale: 1.02,
        rotateX: 2,
        rotateY: -2,
        z: 20,
      } : undefined}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
