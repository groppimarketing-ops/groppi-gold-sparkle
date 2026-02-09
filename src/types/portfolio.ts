// Portfolio data types for GROPPI case study system

export type Industry = 
  | 'restaurant'
  | 'retail'
  | 'renovation'
  | 'beauty'
  | 'ecommerce'
  | 'construction'
  | 'interior'
  | 'real-estate'
  | 'services'
  | 'startup'
  | 'hospitality'
  | 'b2b';

export type ServiceTag = 
  | 'website'
  | 'branding'
  | 'ads'
  | 'social'
  | 'ecommerce'
  | 'seo'
  | 'content'
  | 'video';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  posterUrl?: string; // For videos: poster/thumbnail
  alt?: string;
  aspectRatio?: '16:9' | '4:5' | '1:1' | '9:16'; // For proper display in gallery
}

export interface PortfolioItem {
  id: string;
  clientName: string;
  slug: string;
  industry: Industry;
  services: ServiceTag[]; // Max 3
  coverMedia: MediaItem;
  galleryMedia: MediaItem[];
  shortResultLine: string; // 1 KPI line for card display
  popupContent: {
    challenge: string; // 2-3 lines describing the problem
    approachPoints: string[]; // 3-5 bullet points for approach
    resultPoints: string[]; // 3-6 bullet points for results
    resultDisclaimer?: string; // Optional disclaimer for indicative metrics
    deliverables: string[]; // Chips list of what was delivered
  };
  clientLogo?: string; // Optional client logo image
  externalUrl?: string; // Link to live project website
  featured?: boolean;
  createdAt: Date;
}

// ===== SECTOR SYSTEM =====
export type Sector =
  | 'restaurants-hospitality'
  | 'retail-ecommerce'
  | 'platforms-booking'
  | 'corporate-services'
  | 'education-academy';

export const sectorLabels: Record<Sector, { nl: string; en: string }> = {
  'restaurants-hospitality': { nl: 'Restaurants & Hospitality', en: 'Restaurants & Hospitality' },
  'retail-ecommerce': { nl: 'Retail & E-commerce', en: 'Retail & E-commerce' },
  'platforms-booking': { nl: 'Platforms & Booking', en: 'Platforms & Booking' },
  'corporate-services': { nl: 'Corporate & Services', en: 'Corporate & Services' },
  'education-academy': { nl: 'Educatie & Academy', en: 'Education & Academy' },
};

// Order for display
export const sectorOrder: Sector[] = [
  'restaurants-hospitality',
  'retail-ecommerce',
  'platforms-booking',
  'corporate-services',
  'education-academy',
];

// Map industry → sector
const industryToSectorMap: Record<Industry, Sector> = {
  restaurant: 'restaurants-hospitality',
  hospitality: 'restaurants-hospitality',
  retail: 'retail-ecommerce',
  ecommerce: 'retail-ecommerce',
  startup: 'platforms-booking',
  b2b: 'corporate-services',
  construction: 'corporate-services',
  services: 'corporate-services',
  interior: 'corporate-services',
  beauty: 'corporate-services',
  renovation: 'corporate-services',
  'real-estate': 'corporate-services',
};

export const getSector = (industry: Industry): Sector => {
  return industryToSectorMap[industry] || 'corporate-services';
};

// Industry labels for filtering UI
export const industryLabels: Record<Industry, { nl: string; en: string }> = {
  restaurant: { nl: 'Restaurants & Horeca', en: 'Restaurants & Hospitality' },
  retail: { nl: 'Retail & Winkels', en: 'Retail & Shops' },
  renovation: { nl: 'Renovatie', en: 'Renovation' },
  beauty: { nl: 'Beauty & Wellness', en: 'Beauty & Wellness' },
  ecommerce: { nl: 'E-commerce', en: 'E-commerce' },
  construction: { nl: 'Bouw', en: 'Construction' },
  interior: { nl: 'Interieur & Design', en: 'Interior & Design' },
  'real-estate': { nl: 'Vastgoed', en: 'Real Estate' },
  services: { nl: 'Lokale Diensten', en: 'Local Services' },
  startup: { nl: 'Startups & Tech', en: 'Startups & Tech' },
  hospitality: { nl: 'Hospitality', en: 'Hospitality' },
  b2b: { nl: 'B2B', en: 'B2B' },
};

// Service tag labels
export const serviceTagLabels: Record<ServiceTag, { nl: string; en: string }> = {
  website: { nl: 'Website', en: 'Website' },
  branding: { nl: 'Branding', en: 'Branding' },
  ads: { nl: 'Advertenties', en: 'Ads' },
  social: { nl: 'Social Media', en: 'Social Media' },
  ecommerce: { nl: 'E-commerce', en: 'E-commerce' },
  seo: { nl: 'SEO', en: 'SEO' },
  content: { nl: 'Content', en: 'Content' },
  video: { nl: 'Video', en: 'Video' },
};

// Deliverable labels for chips display
export const deliverableLabels: Record<string, { nl: string; en: string }> = {
  'logo-design': { nl: 'Logo design', en: 'Logo design' },
  'brand-identity': { nl: 'Merkidentiteit', en: 'Brand identity' },
  'website-design': { nl: 'Website design', en: 'Website design' },
  'website-dev': { nl: 'Website ontwikkeling', en: 'Website development' },
  'social-content': { nl: 'Social content', en: 'Social content' },
  'photo-shoot': { nl: 'Fotoshoot', en: 'Photo shoot' },
  'video-production': { nl: 'Videoproductie', en: 'Video production' },
  'instagram-strategy': { nl: 'Instagram strategie', en: 'Instagram strategy' },
  'facebook-ads': { nl: 'Facebook Ads', en: 'Facebook Ads' },
  'google-ads': { nl: 'Google Ads', en: 'Google Ads' },
  'seo-optimization': { nl: 'SEO optimalisatie', en: 'SEO optimization' },
  'content-calendar': { nl: 'Contentkalender', en: 'Content calendar' },
  'copywriting': { nl: 'Copywriting', en: 'Copywriting' },
  'email-marketing': { nl: 'E-mail marketing', en: 'Email marketing' },
  'influencer-campaign': { nl: 'Influencer campagne', en: 'Influencer campaign' },
  'menu-design': { nl: 'Menu design', en: 'Menu design' },
  'packaging': { nl: 'Verpakking', en: 'Packaging' },
  'pitch-deck': { nl: 'Pitch deck', en: 'Pitch deck' },
  'gmb-optimization': { nl: 'Google Mijn Bedrijf', en: 'Google My Business' },
  'reels-production': { nl: 'Reels productie', en: 'Reels production' },
  'story-content': { nl: 'Stories content', en: 'Stories content' },
};
