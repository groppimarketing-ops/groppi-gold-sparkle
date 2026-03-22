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
  | 'b2b'
  | 'medical'
  | 'education';

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
  | 'restaurants-hotels'
  | 'interior-architecture'
  | 'retail-local-shops'
  | 'ecommerce'
  | 'real-estate'
  | 'beauty-care'
  | 'local-services'
  | 'smes-startups'
  | 'medical-clinics'
  | 'educational-academies';

export const sectorLabels: Record<Sector, { nl: string; en: string }> = {
  'restaurants-hotels': { nl: 'Restaurants & Hotels', en: 'Restaurants & Hotels' },
  'interior-architecture': { nl: 'Interieur & Architectuur', en: 'Interior & Architecture' },
  'retail-local-shops': { nl: 'Retail & Lokale Winkels', en: 'Retail & Local Shops' },
  'ecommerce': { nl: 'E-commerce', en: 'E-commerce' },
  'real-estate': { nl: 'Vastgoed', en: 'Real Estate' },
  'beauty-care': { nl: 'Beauty & Care', en: 'Beauty & Care' },
  'local-services': { nl: 'Lokale Diensten', en: 'Local Services' },
  'smes-startups': { nl: "KMO's & Startups", en: 'SMEs & Startups' },
  'medical-clinics': { nl: 'Medische Klinieken', en: 'Medical Clinics' },
  'educational-academies': { nl: 'Educatieve Academies', en: 'Educational Academies' },
};

// Order for display
export const sectorOrder: Sector[] = [
  'restaurants-hotels',
  'interior-architecture',
  'retail-local-shops',
  'ecommerce',
  'real-estate',
  'beauty-care',
  'local-services',
  'smes-startups',
  'medical-clinics',
  'educational-academies',
];

// Map industry → sector
const industryToSectorMap: Record<Industry, Sector> = {
  restaurant: 'restaurants-hotels',
  hospitality: 'restaurants-hotels',
  retail: 'retail-local-shops',
  ecommerce: 'ecommerce',
  'real-estate': 'real-estate',
  beauty: 'beauty-care',
  interior: 'interior-architecture',
  construction: 'interior-architecture',
  renovation: 'interior-architecture',
  services: 'local-services',
  startup: 'smes-startups',
  b2b: 'smes-startups',
  medical: 'medical-clinics',
  education: 'educational-academies',
};

export const getSector = (industry: Industry): Sector => {
  return industryToSectorMap[industry] || 'local-services';
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
  medical: { nl: 'Medisch', en: 'Medical' },
  education: { nl: 'Educatie', en: 'Education' },
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
