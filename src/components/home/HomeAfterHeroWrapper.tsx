import { memo, forwardRef, ReactNode } from 'react';
import GoldAnimatedBackground from '@/components/effects/GoldAnimatedBackground';

interface HomeAfterHeroWrapperProps {
  children: ReactNode;
}

/**
 * HomeAfterHeroWrapper - Wraps all sections after the Hero with a continuous
 * gold animated background. This creates the same premium effect as the Services page.
 * 
 * The background uses the same GoldAnimatedBackground component with medium intensity.
 */
const HomeAfterHeroWrapper = memo(forwardRef<HTMLDivElement, HomeAfterHeroWrapperProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="relative overflow-hidden">
        {/* Continuous Gold Animated Background - same as Services page */}
        <GoldAnimatedBackground intensity="medium" showVignette={true} />
        
        {/* Background overlay for contrast - ensures readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background/80 z-[1]" />
        
        {/* Neural texture overlay */}
        <div className="absolute inset-0 neural-bg opacity-10 z-[1]" />
        
        {/* Content layer - above background */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
));

HomeAfterHeroWrapper.displayName = 'HomeAfterHeroWrapper';

export default HomeAfterHeroWrapper;
