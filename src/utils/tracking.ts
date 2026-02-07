/**
 * Tracking utility for analytics events
 * Compatible with GA4, GTM, Google Ads, and TikTok Pixel
 */

type TrackingEvent = 
  | 'whatsapp_click'
  | 'email_click'
  | 'phone_click'
  | 'instagram_click'
  | 'facebook_click'
  | 'tiktok_click'
  | 'linkedin_click'
  | 'twitter_click'
  | 'youtube_click'
  | 'pinterest_click'
  | 'calendly_click'
  | 'planbuilder_social_channels'
  | 'planbuilder_social_frequency'
  | 'planbuilder_social_ads_budget'
  | 'planbuilder_social_addons'
  | 'planbuilder_social_cta_custom_offer'
  | 'planbuilder_social_cta_save_plan';

interface TrackingParams {
  event: TrackingEvent;
  location?: string;
  label?: string;
  service?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (...args: unknown[]) => void;
    };
  }
}

/**
 * Track click events for analytics
 * Safely emits events without errors if tracking is not configured
 */
export const trackEvent = ({ event, location = 'unknown', label }: TrackingParams): void => {
  const eventData = {
    event_category: 'engagement',
    event_label: label || event,
    event_location: location,
  };

  try {
    // Google Analytics 4 / Google Tag Manager
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: event,
        ...eventData,
      });
    }

    // Google gtag (direct GA4)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, eventData);
    }

    // TikTok Pixel
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track(event, eventData);
    }

    // Facebook Pixel (Meta)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', event, eventData);
    }

    // Console log in development
    if (import.meta.env.DEV) {
      console.log('[Tracking]', event, eventData);
    }
  } catch (error) {
    // Silently fail - don't break the app if tracking fails
    if (import.meta.env.DEV) {
      console.warn('[Tracking Error]', error);
    }
  }
};

// Social media URLs
export const socialLinks = {
  whatsapp: 'https://wa.me/32494311119',
  instagram: 'https://www.instagram.com/groppimarketingbureau/',
  facebook: 'https://www.facebook.com/profile.php?id=61582782063217',
  tiktok: 'https://www.tiktok.com/@groppimarketingbureau?lang=nl-NL',
  linkedin: 'https://www.linkedin.com/in/groppi-marketing-bureau/',
  twitter: 'https://x.com/Groppimarketing',
  youtube: 'https://www.youtube.com/@GroppiMarketing',
  pinterest: 'https://nl.pinterest.com/GroppiMarketingBureau/',
  email: 'mailto:info@groppi.be',
  phone: 'tel:+32494311119',
  landline: 'tel:+3214635005',
  calendly: 'https://calendly.com/groppimarketing/30min',
} as const;

// Contact info
export const contactInfo = {
  phone: '+32 494 31 11 19',
  landline: '+32 14 63 50 05',
  email: 'info@groppi.be',
  address: 'Het Steeke 5A, 2330 Merksplas, Belgium',
} as const;
