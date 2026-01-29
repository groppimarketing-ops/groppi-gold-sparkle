// GROPPI Portfolio Items - Real Client Data
// This is the single source of truth for all portfolio/case study data
// To add a new case: append to the portfolioItems array

import type { PortfolioItem } from '@/types/portfolio';

// Import portfolio images
import restaurantBranding from '@/assets/portfolio/restaurant-branding.jpg';
import modeWebshop from '@/assets/portfolio/mode-webshop.jpg';
import b2bPlatform from '@/assets/portfolio/b2b-platform.jpg';
import bouwbedrijfWebsite from '@/assets/portfolio/bouwbedrijf-website.jpg';
import influencerCampagne from '@/assets/portfolio/influencer-campagne.jpg';
import techStartupBranding from '@/assets/portfolio/tech-startup-branding.jpg';
import ecommerceGroei from '@/assets/portfolio/e-commerce-groei.jpg';
import contentStrategie from '@/assets/portfolio/content-strategie.jpg';

// IL FUOCO PIZZA assets
import ilFuocoChef from '@/assets/portfolio/il-fuoco/chef-pizza.jpg';
import ilFuocoMenu from '@/assets/portfolio/il-fuoco/menu.png';
import ilFuocoReviews from '@/assets/portfolio/il-fuoco/reviews.png';
import ilFuocoEvents from '@/assets/portfolio/il-fuoco/events.png';
import ilFuocoDeals from '@/assets/portfolio/il-fuoco/deals.png';
import ilFuocoInstagram from '@/assets/portfolio/il-fuoco/instagram.png';

export const portfolioItems: PortfolioItem[] = [
  {
    id: '9',
    clientName: 'IL FUOCO PIZZA',
    slug: 'il-fuoco-pizza',
    industry: 'restaurant',
    services: ['branding', 'social'],
    coverMedia: {
      id: 'cover-9',
      type: 'image',
      url: ilFuocoChef,
      alt: 'IL FUOCO PIZZA - Pizzaiolo aan het werk',
    },
    galleryMedia: [
      {
        id: 'gallery-9-1',
        type: 'image',
        url: ilFuocoChef,
        alt: 'IL FUOCO PIZZA - Chef bereidt pizza',
      },
      {
        id: 'gallery-9-2',
        type: 'video',
        url: '/videos/portfolio/il-fuoco-promo.mp4',
        posterUrl: ilFuocoChef,
        alt: 'IL FUOCO PIZZA - Promo video',
      },
      {
        id: 'gallery-9-3',
        type: 'image',
        url: ilFuocoMenu,
        alt: 'IL FUOCO PIZZA - Menu design',
      },
      {
        id: 'gallery-9-4',
        type: 'image',
        url: ilFuocoReviews,
        alt: 'IL FUOCO PIZZA - Reviews sectie',
      },
      {
        id: 'gallery-9-5',
        type: 'image',
        url: ilFuocoEvents,
        alt: 'IL FUOCO PIZZA - Events pagina',
      },
      {
        id: 'gallery-9-6',
        type: 'image',
        url: ilFuocoDeals,
        alt: 'IL FUOCO PIZZA - Deals en acties',
      },
      {
        id: 'gallery-9-7',
        type: 'image',
        url: ilFuocoInstagram,
        alt: 'IL FUOCO PIZZA - Instagram post',
      },
    ],
    shortResultLine: '+65% online reserveringen',
    popupContent: {
      challenge: 'Authentieke Italiaanse pizzeria wilde hun huiselijke sfeer en ambachtelijke aanpak online vertalen.',
      approach: 'Complete visuele identiteit met professionele fotografie, social media content en digitaal menukaart-systeem.',
      results: '+65% online reserveringen en sterke merkbekendheid in de regio',
    },
    featured: true,
    createdAt: new Date('2025-01-28'),
  },
  {
    id: '1',
    clientName: 'La Maison Dorée',
    slug: 'restaurant-branding',
    industry: 'restaurant',
    services: ['website', 'branding'],
    coverMedia: {
      id: 'cover-1',
      type: 'image',
      url: restaurantBranding,
      alt: 'La Maison Dorée restaurant branding',
    },
    galleryMedia: [
      {
        id: 'gallery-1-1',
        type: 'image',
        url: restaurantBranding,
        alt: 'La Maison Dorée restaurant branding',
      },
    ],
    shortResultLine: '+180% reserveringen',
    popupContent: {
      challenge: 'Weinig online zichtbaarheid en verouderde branding die niet aansloot bij het premium aanbod.',
      approach: 'Complete rebrand met luxe website, professionele fotoshoot en Google Ads-campagne.',
      results: '+180% reserveringen binnen 6 maanden',
    },
    featured: true,
    createdAt: new Date('2024-11-15'),
  },
  {
    id: '2',
    clientName: 'LUXE Mode',
    slug: 'mode-webshop',
    industry: 'ecommerce',
    services: ['ecommerce', 'ads'],
    coverMedia: {
      id: 'cover-2',
      type: 'image',
      url: modeWebshop,
      alt: 'LUXE Mode webshop',
    },
    galleryMedia: [
      {
        id: 'gallery-2-1',
        type: 'image',
        url: modeWebshop,
        alt: 'LUXE Mode webshop homepage',
      },
    ],
    shortResultLine: '€85K omzet in 3 maanden',
    popupContent: {
      challenge: 'Startende webshop met nul online aanwezigheid en beperkt marketingbudget.',
      approach: 'Shopify setup, productfotografie en gerichte Meta Ads-campagnes met retargeting.',
      results: '€85K omzet gegenereerd in eerste 3 maanden',
    },
    featured: true,
    createdAt: new Date('2024-10-20'),
  },
  {
    id: '3',
    clientName: 'TechFlow Solutions',
    slug: 'b2b-platform',
    industry: 'b2b',
    services: ['website', 'seo'],
    coverMedia: {
      id: 'cover-3',
      type: 'image',
      url: b2bPlatform,
      alt: 'TechFlow Solutions B2B platform',
    },
    galleryMedia: [
      {
        id: 'gallery-3-1',
        type: 'image',
        url: b2bPlatform,
        alt: 'TechFlow Solutions platform dashboard',
      },
    ],
    shortResultLine: '+320% leads',
    popupContent: {
      challenge: 'Complexe B2B SaaS met lange salesfunnel en te weinig gekwalificeerde leads.',
      approach: 'Geoptimaliseerde landingspagina\'s, lead magnets en SEO-strategie voor long-tail keywords.',
      results: '+320% gekwalificeerde leads binnen 4 maanden',
    },
    featured: false,
    createdAt: new Date('2024-09-10'),
  },
  {
    id: '4',
    clientName: 'Van Damme Bouw',
    slug: 'bouwbedrijf-website',
    industry: 'construction',
    services: ['website', 'seo'],
    coverMedia: {
      id: 'cover-4',
      type: 'image',
      url: bouwbedrijfWebsite,
      alt: 'Van Damme Bouw website',
    },
    galleryMedia: [
      {
        id: 'gallery-4-1',
        type: 'image',
        url: bouwbedrijfWebsite,
        alt: 'Van Damme Bouw portfolio',
      },
    ],
    shortResultLine: '#1 Google lokaal',
    popupContent: {
      challenge: 'Familiebedrijf werkte alleen op mond-tot-mondreclame, geen online aanwezigheid.',
      approach: 'Professionele website met projectportfolio, Google My Business optimalisatie en lokale SEO.',
      results: '#1 positie in Google voor lokale zoektermen + 45 leads/maand',
    },
    featured: true,
    createdAt: new Date('2024-08-25'),
  },
  {
    id: '5',
    clientName: 'Belgian Beauty Collective',
    slug: 'influencer-campagne',
    industry: 'beauty',
    services: ['social', 'content'],
    coverMedia: {
      id: 'cover-5',
      type: 'image',
      url: influencerCampagne,
      alt: 'Belgian Beauty Collective influencer campagne',
    },
    galleryMedia: [
      {
        id: 'gallery-5-1',
        type: 'image',
        url: influencerCampagne,
        alt: 'Influencer campagne content',
      },
    ],
    shortResultLine: '2.4M bereik',
    popupContent: {
      challenge: 'Nieuw beautymerk had naamsbekendheid nodig bij doelgroep 18-35 jaar.',
      approach: 'Influencer partnership strategie met 12 Belgische creators + UGC-campagne op Instagram en TikTok.',
      results: '2.4 miljoen organisch bereik in 2 maanden',
    },
    featured: false,
    createdAt: new Date('2024-07-15'),
  },
  {
    id: '6',
    clientName: 'NovaTech AI',
    slug: 'tech-startup-branding',
    industry: 'startup',
    services: ['branding', 'website'],
    coverMedia: {
      id: 'cover-6',
      type: 'image',
      url: techStartupBranding,
      alt: 'NovaTech AI branding',
    },
    galleryMedia: [
      {
        id: 'gallery-6-1',
        type: 'image',
        url: techStartupBranding,
        alt: 'NovaTech AI brand identity',
      },
    ],
    shortResultLine: 'Complete merkidentiteit',
    popupContent: {
      challenge: 'Pre-seed startup had professionele uitstraling nodig voor investeerdersgesprekken.',
      approach: 'Complete brand identity inclusief logo, pitch deck design en investor-ready website.',
      results: 'Succesvolle seed-ronde gesloten binnen 3 maanden na launch',
    },
    featured: false,
    createdAt: new Date('2024-06-20'),
  },
  {
    id: '7',
    clientName: 'HomeStyle Interieur',
    slug: 'e-commerce-groei',
    industry: 'interior',
    services: ['ads', 'ecommerce'],
    coverMedia: {
      id: 'cover-7',
      type: 'image',
      url: ecommerceGroei,
      alt: 'HomeStyle Interieur e-commerce',
    },
    galleryMedia: [
      {
        id: 'gallery-7-1',
        type: 'image',
        url: ecommerceGroei,
        alt: 'HomeStyle webshop analytics',
      },
    ],
    shortResultLine: '+240% ROAS',
    popupContent: {
      challenge: 'Bestaande webshop draaide verlies op advertenties met een ROAS onder 1.0.',
      approach: 'Volledige audit van campagnes, nieuwe doelgroepsegmentatie en A/B-testen van creatives.',
      results: '+240% ROAS verbetering binnen 90 dagen',
    },
    featured: true,
    createdAt: new Date('2024-05-10'),
  },
  {
    id: '8',
    clientName: 'FitLife Studios',
    slug: 'content-strategie',
    industry: 'services',
    services: ['content', 'social'],
    coverMedia: {
      id: 'cover-8',
      type: 'image',
      url: contentStrategie,
      alt: 'FitLife Studios content strategie',
    },
    galleryMedia: [
      {
        id: 'gallery-8-1',
        type: 'image',
        url: contentStrategie,
        alt: 'FitLife content calendar',
      },
    ],
    shortResultLine: '50+ video\'s/maand',
    popupContent: {
      challenge: 'Fitnessketen wilde consistent content produceren maar had geen tijd of expertise.',
      approach: 'Full-service content retainer: planning, productie en publicatie van video en foto content.',
      results: '50+ kwalitatieve video\'s per maand geproduceerd',
    },
    featured: false,
    createdAt: new Date('2024-04-05'),
  },
];

// Helper: Get latest N portfolio items (sorted by createdAt descending)
export const getLatestPortfolioItems = (count: number = 8): PortfolioItem[] => {
  return [...portfolioItems]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, count);
};

// Helper: Get featured portfolio items
export const getFeaturedPortfolioItems = (): PortfolioItem[] => {
  return portfolioItems.filter(item => item.featured);
};

// Helper: Filter portfolio items by industry
export const filterByIndustry = (industry: string): PortfolioItem[] => {
  if (industry === 'all') return portfolioItems;
  return portfolioItems.filter(item => item.industry === industry);
};

// Helper: Filter portfolio items by service tag
export const filterByService = (service: string): PortfolioItem[] => {
  if (service === 'all') return portfolioItems;
  return portfolioItems.filter(item => item.services.includes(service as any));
};

// Helper: Search portfolio items by client name
export const searchPortfolio = (query: string): PortfolioItem[] => {
  const lowerQuery = query.toLowerCase();
  return portfolioItems.filter(item => 
    item.clientName.toLowerCase().includes(lowerQuery)
  );
};

// Combined filter helper
export const filterPortfolio = (
  industry: string = 'all',
  service: string = 'all',
  searchQuery: string = ''
): PortfolioItem[] => {
  let results = [...portfolioItems];
  
  if (industry !== 'all') {
    results = results.filter(item => item.industry === industry);
  }
  
  if (service !== 'all') {
    results = results.filter(item => item.services.includes(service as any));
  }
  
  if (searchQuery.trim()) {
    const lowerQuery = searchQuery.toLowerCase();
    results = results.filter(item => 
      item.clientName.toLowerCase().includes(lowerQuery)
    );
  }
  
  // Sort by date (newest first)
  return results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
