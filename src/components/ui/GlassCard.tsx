import { forwardRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hover3D?: boolean;
  glowOnHover?: boolean;
  // framer-motion pass-through props (kept for API compat, ignored)
  initial?: unknown;
  animate?: unknown;
  whileInView?: unknown;
  whileHover?: unknown;
  viewport?: unknown;
  transition?: unknown;
  layout?: unknown;
  layoutId?: unknown;
}

/**
 * GlassCard — pure CSS version (no framer-motion).
 * Hover lift + glow handled entirely in CSS → zero JS animation cost.
 */
const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(({
  children,
  className,
  hover3D = true,
  glowOnHover = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  initial, animate, whileInView, whileHover, viewport, transition, layout, layoutId,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'glass-card p-6 transition-all duration-500',
        hover3D && 'hover:-translate-y-1 hover:scale-[1.01]',
        glowOnHover && 'hover:shadow-[0_0_30px_hsl(var(--gold)/0.18)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
