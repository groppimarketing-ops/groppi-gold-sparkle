/**
 * BRAND CONSTANTS - Single source of truth for brand identity
 * IMPORTANT: The correct brand name is "Groppi" (NOT "Groopy")
 */

export const BRAND = {
  NAME: 'Groppi',
  NAME_UPPER: 'GROPPI',
  TAGLINE: 'Structure. Content. Growth.',
  FOUNDED: 2016,
  TEAM_SIZE: '9+',
} as const;

/**
 * COLOR PALETTE - Black & Gold Only
 * STRICT: No green, blue, red, cyan, teal, or purple allowed
 */
export const COLORS = {
  // Backgrounds
  BG_MAIN: '#050505',
  BG_CARD: 'rgba(255, 255, 255, 0.03)',
  BG_HOVER: 'rgba(255, 255, 255, 0.04)',
  
  // Gold (Primary accent)
  GOLD: '#D4AF37',
  GOLD_LIGHT: '#E8C547',
  GOLD_DARK: '#B8942E',
  
  // Text
  TEXT_PRIMARY: '#FFFFFF',
  TEXT_MUTED: 'rgba(255, 255, 255, 0.72)',
  TEXT_SUBTLE: 'rgba(255, 255, 255, 0.5)',
  
  // Borders
  CARD_BORDER: 'rgba(212, 175, 55, 0.20)',
  HOVER_BORDER: 'rgba(212, 175, 55, 0.55)',
} as const;

/**
 * EFFECTS - Gold-only glows and shadows
 */
export const EFFECTS = {
  // Gold glow effects
  GOLD_GLOW: '0 0 18px rgba(212, 175, 55, 0.35)',
  GOLD_GLOW_SUBTLE: '0 0 10px rgba(212, 175, 55, 0.2)',
  GOLD_GLOW_INTENSE: '0 0 30px rgba(212, 175, 55, 0.5)',
  
  // Card shadows
  CARD_SHADOW: '0 4px 20px rgba(0, 0, 0, 0.3)',
  CARD_SHADOW_HOVER: '0 8px 30px rgba(0, 0, 0, 0.4)',
} as const;

/**
 * TAILWIND CLASS HELPERS - Use these for consistent styling
 */
export const TW_CLASSES = {
  // Gold-only hover glow (use in className)
  HOVER_GOLD_GLOW: 'hover:shadow-[0_0_20px_hsl(43_100%_50%/0.3)]',
  HOVER_GOLD_GLOW_SUBTLE: 'hover:shadow-[0_0_15px_hsl(43_100%_50%/0.2)]',
  HOVER_GOLD_BORDER: 'hover:border-primary/50',
  
  // Card base styles
  CARD_BASE: 'glass-card border-primary/20',
  CARD_HOVER: 'hover:border-primary/40 transition-all duration-500',
} as const;

/**
 * Brand name validator - prevents "Groopy" typo
 * @param text - Text to validate
 * @returns Corrected text with "Groppi" instead of "Groopy"
 */
export const validateBrandName = (text: string): string => {
  return text
    .replace(/Groopy/gi, 'Groppi')
    .replace(/GROOPY/g, 'GROPPI');
};
