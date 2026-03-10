import { memo, forwardRef, ReactNode } from 'react';
import WaveAnimation from '@/components/effects/WaveAnimation';

interface HomeAfterHeroWrapperProps {
  children: ReactNode;
}

/**
 * HomeAfterHeroWrapper - Wraps all sections after the Hero with a continuous
 * gold animated background. Uses the EXACT SAME WaveAnimation component as 
 * the Services page (via PageLayout) to ensure pixel-identical appearance.
 */
const HomeAfterHeroWrapper = memo(forwardRef<HTMLDivElement, HomeAfterHeroWrapperProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="relative">
        {/* WaveAnimation - SAME component as Services page uses via PageLayout */}
        <WaveAnimation intensity="medium" />
        
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
