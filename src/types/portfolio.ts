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
}

export interface PortfolioItem {
  id: string;
  clientName: string;
  slug: string;
  industry: Industry;
  services: ServiceTag[]; // Max 2
  coverMedia: MediaItem;
  galleryMedia: MediaItem[];
  shortResultLine: string; // 1 KPI line
  popupContent: {
    challenge: string; // 1-2 lines
    approach: string; // 1-2 lines
    results: string; // 1 KPI line
  };
  featured?: boolean;
  createdAt: Date;
}

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
