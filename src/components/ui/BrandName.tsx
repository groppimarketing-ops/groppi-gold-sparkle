import React from 'react';
import { BRAND_NAME } from '@/i18n/config';

interface BrandNameProps {
  className?: string;
  as?: 'span' | 'div' | 'p';
}

/**
 * BrandName component - Always displays "GROPPI" in LTR with proper isolation
 * Use this component anywhere the brand name appears to ensure:
 * 1. Correct spelling (GROPPI)
 * 2. Proper LTR display even in RTL contexts (Arabic, Urdu)
 * 3. Consistent styling
 */
const BrandName: React.FC<BrandNameProps> = ({ 
  className = '', 
  as: Component = 'span' 
}) => {
  return (
    <Component 
      className={`brand-name ${className}`}
      dir="ltr"
      style={{ unicodeBidi: 'isolate', direction: 'ltr' }}
    >
      {BRAND_NAME}
    </Component>
  );
};

export default BrandName;

// Export the constant for direct use when component is overkill
export { BRAND_NAME };
