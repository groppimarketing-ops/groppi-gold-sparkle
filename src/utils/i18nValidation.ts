/**
 * i18n Validation Utilities
 * Development-only validation for translation quality
 */

// Forbidden characters in Flemish (nl-BE) content
const FORBIDDEN_NL_CHARS = ['،', '؟', '؛', 'ـ', '٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

// Forbidden brand misspellings
const BRAND_MISSPELLINGS = ['Groopy', 'GROOPY', 'Groppi ', 'GROPPi', 'GROPPII', 'Groopi'];

// Correct brand name
export const BRAND_NAME = 'GROPPI';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validate Flemish text for Arabic characters/punctuation artifacts
 */
export function validateFlemishText(text: string, key?: string): ValidationResult {
  const errors: string[] = [];
  const foundForbidden = FORBIDDEN_NL_CHARS.filter(char => text.includes(char));
  
  if (foundForbidden.length > 0) {
    errors.push(
      `[i18n] Forbidden Arabic characters in nl-BE${key ? ` (${key})` : ''}: ${foundForbidden.join(', ')}`
    );
  }
  
  // Check for RTL marks in LTR content
  const rtlMarks = text.match(/[\u200F\u202B\u202E\u2067]/g);
  if (rtlMarks) {
    errors.push(
      `[i18n] RTL marks found in nl-BE content${key ? ` (${key})` : ''}: ${rtlMarks.length} occurrences`
    );
  }
  
  // Check for leading dots before words (direction artifact)
  if (/^[.،]\s*[a-zA-Z]/.test(text) || /\s[.،][a-zA-Z]/.test(text)) {
    errors.push(
      `[i18n] Leading punctuation artifact in nl-BE${key ? ` (${key})` : ''}: "${text.slice(0, 30)}..."`
    );
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validate brand name spelling across all locales
 */
export function validateBrandSpelling(text: string, key?: string): ValidationResult {
  const errors: string[] = [];
  const foundMisspellings = BRAND_MISSPELLINGS.filter(misspelling => 
    text.toLowerCase().includes(misspelling.toLowerCase().trim())
  );
  
  if (foundMisspellings.length > 0) {
    errors.push(
      `[i18n] Brand misspelling${key ? ` in ${key}` : ''}: Found "${foundMisspellings.join(', ')}", should be "${BRAND_NAME}"`
    );
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Log missing translation key (dev only)
 */
export function logMissingKey(lng: string, ns: string, key: string): void {
  if (import.meta.env.DEV) {
    console.warn(
      `[i18n] Missing translation key: "${key}" for locale "${lng}" in namespace "${ns}"`
    );
  }
}

/**
 * Post-process translated value for validation (dev only)
 */
export function postProcessTranslation(
  value: string, 
  key: string, 
  lng: string
): string {
  if (!import.meta.env.DEV) return value;
  
  // Validate brand spelling in all locales
  const brandResult = validateBrandSpelling(value, key);
  brandResult.errors.forEach(err => console.warn(err));
  
  // Validate Flemish text specifically
  if (lng === 'nl' || lng === 'nl-BE') {
    const flemishResult = validateFlemishText(value, key);
    flemishResult.errors.forEach(err => console.warn(err));
  }
  
  return value;
}

/**
 * Scan rendered DOM for i18n issues (dev utility)
 * Call this in dev console: window.__scanI18nIssues()
 */
export function scanDomForI18nIssues(): void {
  if (!import.meta.env.DEV) {
    console.log('i18n scanning only available in development');
    return;
  }
  
  const allTextNodes: Text[] = [];
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );
  
  let node: Text | null;
  while (node = walker.nextNode() as Text) {
    if (node.textContent?.trim()) {
      allTextNodes.push(node);
    }
  }
  
  let issueCount = 0;
  
  allTextNodes.forEach(textNode => {
    const text = textNode.textContent || '';
    
    // Check for Arabic chars in visible text (if not in Arabic context)
    const htmlDir = document.documentElement.dir;
    if (htmlDir !== 'rtl') {
      FORBIDDEN_NL_CHARS.forEach(char => {
        if (text.includes(char)) {
          console.warn(`[i18n-scan] Found Arabic character "${char}" in LTR context:`, text.slice(0, 50));
          issueCount++;
        }
      });
    }
    
    // Check for brand misspellings
    BRAND_MISSPELLINGS.forEach(misspelling => {
      if (text.toLowerCase().includes(misspelling.toLowerCase().trim())) {
        console.warn(`[i18n-scan] Brand misspelling "${misspelling}" found:`, text.slice(0, 50));
        issueCount++;
      }
    });
  });
  
  console.log(`[i18n-scan] Scan complete. Found ${issueCount} potential issues.`);
}

// Expose to window for dev debugging
if (import.meta.env.DEV && typeof window !== 'undefined') {
  (window as any).__scanI18nIssues = scanDomForI18nIssues;
}
