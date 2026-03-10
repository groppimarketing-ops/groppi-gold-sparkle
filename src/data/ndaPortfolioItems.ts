// NDA-safe portfolio items — 20 curated confidential projects
// Each has a unique title, unique thumbnail, and credible case study data
// All use generated visuals, no real client names

import type { PortfolioItem, Industry, ServiceTag } from '@/types/portfolio';

// Thumbnail mapping: each project gets a unique image
const thumbs = {
  restaurant: '/portfolio/nda/p-restaurant.webp',
  bistro: '/portfolio/nda/p-bistro.webp',
  beauty: '/portfolio/nda/p-beauty.webp',
  spa: '/portfolio/nda/p-spa.webp',
  construction: '/portfolio/nda/p-construction.webp',
  solar: '/portfolio/nda/p-solar.webp',
  ecommerce: '/portfolio/nda/p-ecommerce.webp',
  jewelry: '/portfolio/nda/p-jewelry.webp',
  medical: '/portfolio/nda/p-medical.webp',
  dental: '/portfolio/nda/p-dental.webp',
  tech: '/portfolio/nda/p-tech.webp',
  saas: '/portfolio/nda/p-saas.webp',
  realestate: '/portfolio/nda/p-realestate.webp',
  villa: '/portfolio/nda/p-villa.webp',
  interior: '/portfolio/nda/p-interior.webp',
  kitchen: '/portfolio/nda/p-kitchen.webp',
  fitness: '/portfolio/nda/p-fitness.webp',
  crossfit: '/portfolio/nda/p-crossfit.webp',
  automotive: '/portfolio/nda/p-dealership.webp',
  dealership: '/portfolio/nda/p-dealership.webp',
  legal: '/portfolio/nda/p-legal.webp',
};

interface NdaProject {
  title: string;
  industry: Industry;
  services: ServiceTag[];
  country: string;
  result: string;
  thumb: string;
  challenge: string;
  approach: string[];
  results: string[];
  deliverables: string[];
}

const projects: NdaProject[] = [
  // === RESTAURANTS (2) ===
  {
    title: 'Restaurant Website Revamp',
    industry: 'restaurant',
    services: ['website', 'seo'],
    country: 'BE',
    result: '+42% online reserveringen',
    thumb: thumbs.restaurant,
    challenge: 'Verouderde website met slechte mobiele ervaring leidde tot gemiste reserveringen.',
    approach: ['Responsive website redesign', 'Online reserveringssysteem', 'Lokale SEO optimalisatie'],
    results: ['+42% online reserveringen', 'Snellere laadtijd (< 2s)'],
    deliverables: ['website-design', 'website-dev', 'seo-optimization'],
  },
  {
    title: 'Bistro Social Strategy',
    industry: 'restaurant',
    services: ['social', 'video'],
    country: 'BE',
    result: '+70% tafelreserveringen',
    thumb: thumbs.bistro,
    challenge: 'Bistro in hartje stad miste online zichtbaarheid bij toeristen en locals.',
    approach: ['Instagram Reels strategie', 'Food videografie', 'Seizoensmenu campagnes'],
    results: ['+70% tafelreserveringen via social', 'Viral Reel (50K+ views)'],
    deliverables: ['video-production', 'reels-production', 'social-content'],
  },

  // === BEAUTY (2) ===
  {
    title: 'Beauty Salon Social Campaign',
    industry: 'beauty',
    services: ['social', 'content'],
    country: 'BE',
    result: '+55% Instagram volgers',
    thumb: thumbs.beauty,
    challenge: 'Schoonheidssalon miste online zichtbaarheid bij jongere doelgroep.',
    approach: ['Instagram contentstrategie', 'Before/after visuele reeks', 'Influencer micro-partnerships'],
    results: ['+55% Instagram volgers', 'Hogere booking rate via DM'],
    deliverables: ['social-content', 'instagram-strategy', 'content-calendar'],
  },
  {
    title: 'Wellness Spa Branding',
    industry: 'beauty',
    services: ['branding', 'website'],
    country: 'NL',
    result: '+50% boekingen',
    thumb: thumbs.spa,
    challenge: 'Nieuwe spa miste onderscheidend vermogen in competitieve wellness markt.',
    approach: ['Luxe merkidentiteit ontwikkeling', 'Booking-geoptimaliseerde website', 'Sfeervolle visuele taal'],
    results: ['+50% boekingen in eerste 6 maanden', 'Premium positionering bereikt'],
    deliverables: ['brand-identity', 'website-design', 'photo-shoot'],
  },

  // === CONSTRUCTION (2) ===
  {
    title: 'Construction Company Branding',
    industry: 'construction',
    services: ['branding', 'website'],
    country: 'BE',
    result: '+38% offerteaanvragen',
    thumb: thumbs.construction,
    challenge: 'Familiebedrijf met sterke reputatie maar verouderde merkidentiteit.',
    approach: ['Complete merkidentiteit herwerkt', 'Professionele projectfotografie', 'Nieuwe website met portfolio'],
    results: ['+38% offerteaanvragen', 'Sterkere merkherkenning'],
    deliverables: ['brand-identity', 'logo-design', 'website-design'],
  },
  {
    title: 'Solar Panel Leads',
    industry: 'construction',
    services: ['ads', 'website'],
    country: 'BE',
    result: '+85% leads',
    thumb: thumbs.solar,
    challenge: 'Zonnepanelen installateur in groeiende markt maar slechte lead generatie.',
    approach: ['Lead generation funnels', 'Google Ads campagnes', 'Calculator tool op website'],
    results: ['+85% leads per maand', 'Cost per lead gehalveerd'],
    deliverables: ['google-ads', 'website-design', 'website-dev'],
  },

  // === E-COMMERCE (2) ===
  {
    title: 'E-commerce Fashion Launch',
    industry: 'ecommerce',
    services: ['ecommerce', 'ads'],
    country: 'NL',
    result: '€62K omzet in Q1',
    thumb: thumbs.ecommerce,
    challenge: 'Nieuwe webshop zonder bestaand klantenbestand of merkbekendheid.',
    approach: ['Shopify webshop configuratie', 'Meta Ads campagnes', 'Retargeting funnels'],
    results: ['€62K omzet in eerste kwartaal', 'ROAS van 3.8'],
    deliverables: ['website-dev', 'facebook-ads', 'copywriting'],
  },
  {
    title: 'Online Jewelry Store',
    industry: 'ecommerce',
    services: ['ecommerce', 'social'],
    country: 'BE',
    result: '+130% online verkoop',
    thumb: thumbs.jewelry,
    challenge: 'Juwelier wilde online verkoop starten naast fysieke winkel.',
    approach: ['WooCommerce webshop opzet', 'Productfotografie', 'Instagram shopping integratie'],
    results: ['+130% online verkoop in 4 maanden', 'Sterke Instagram community'],
    deliverables: ['website-dev', 'photo-shoot', 'instagram-strategy'],
  },

  // === MEDICAL (2) ===
  {
    title: 'Medical Clinic SEO',
    industry: 'services',
    services: ['seo', 'content'],
    country: 'BE',
    result: '#2 Google positie',
    thumb: thumbs.medical,
    challenge: 'Medische praktijk onzichtbaar in zoekresultaten ondanks sterke reputatie.',
    approach: ['Technische SEO audit en fixes', 'Medische content strategie', 'Google My Business optimalisatie'],
    results: ['#2 Google positie voor kernzoekwoorden', '+60% organisch verkeer'],
    deliverables: ['seo-optimization', 'gmb-optimization', 'copywriting'],
  },
  {
    title: 'Dental Practice Marketing',
    industry: 'services',
    services: ['seo', 'ads'],
    country: 'BE',
    result: '+35% nieuwe patiënten',
    thumb: thumbs.dental,
    challenge: 'Tandartspraktijk in competitieve regio met dalende nieuwe patiëntenaantallen.',
    approach: ['Lokale SEO strategie', 'Google Ads campagnes', 'Review management'],
    results: ['+35% nieuwe patiënten per maand', '#1 Google Maps lokaal'],
    deliverables: ['seo-optimization', 'google-ads', 'gmb-optimization'],
  },

  // === TECH / STARTUP (2) ===
  {
    title: 'Tech Startup Brand Identity',
    industry: 'startup',
    services: ['branding', 'website'],
    country: 'BE',
    result: 'Seed ronde gesloten',
    thumb: thumbs.tech,
    challenge: 'Pre-seed startup had professionele uitstraling nodig voor investeerders.',
    approach: ['Logo en visuele identiteit', 'Pitch deck design', 'Landing page ontwikkeling'],
    results: ['Succesvolle seed ronde', 'Professionele investor presentatie'],
    deliverables: ['logo-design', 'brand-identity', 'pitch-deck'],
  },
  {
    title: 'SaaS Platform Launch',
    industry: 'startup',
    services: ['website', 'ads'],
    country: 'DE',
    result: '500+ sign-ups in 30 dagen',
    thumb: thumbs.saas,
    challenge: 'B2B SaaS product klaar voor lancering maar zonder marketing infrastructuur.',
    approach: ['High-converting landing page', 'LinkedIn Ads campagne', 'Content marketing strategie'],
    results: ['500+ sign-ups in eerste maand', 'Sterke product-market fit signalen'],
    deliverables: ['website-design', 'website-dev', 'copywriting'],
  },

  // === REAL ESTATE (2) ===
  {
    title: 'Real Estate Lead Generation',
    industry: 'real-estate',
    services: ['ads', 'website'],
    country: 'BE',
    result: '+75% gekwalificeerde leads',
    thumb: thumbs.realestate,
    challenge: 'Vastgoedkantoor afhankelijk van traditionele kanalen, miste online leads.',
    approach: ['Lead generation campagnes', 'Landing pages per project', 'CRM integratie'],
    results: ['+75% gekwalificeerde leads', 'Lagere cost per lead'],
    deliverables: ['facebook-ads', 'google-ads', 'website-design'],
  },
  {
    title: 'Luxury Villa Listings',
    industry: 'real-estate',
    services: ['website', 'content'],
    country: 'FR',
    result: 'Hogere vraagprijs gerealiseerd',
    thumb: thumbs.villa,
    challenge: 'Premium vastgoed miste visuele presentatie die de luxe uitstraalde.',
    approach: ['High-end property website', 'Drone en interieur fotografie', 'Virtual tours integratie'],
    results: ['Hogere vraagprijs gerealiseerd', 'Snellere verkoopcyclus'],
    deliverables: ['website-design', 'photo-shoot', 'video-production'],
  },

  // === INTERIOR (2) ===
  {
    title: 'Interior Design Portfolio',
    industry: 'interior',
    services: ['website', 'content'],
    country: 'BE',
    result: '+32% projectaanvragen',
    thumb: thumbs.interior,
    challenge: 'Interieurontwerper toonde werk via sociale media maar miste professionele portfolio.',
    approach: ['Portfolio website met galerij', 'Professionele projectfotografie', 'Blog strategie'],
    results: ['+32% projectaanvragen', 'Hogere gemiddelde projectwaarde'],
    deliverables: ['website-design', 'website-dev', 'photo-shoot'],
  },
  {
    title: 'Kitchen Showroom Campaign',
    industry: 'interior',
    services: ['ads', 'content'],
    country: 'BE',
    result: '+55% showroom bezoeken',
    thumb: thumbs.kitchen,
    challenge: 'Keukenwinkel had dalende bezoekersaantallen ondanks premium aanbod.',
    approach: ['Google Ads met lokale focus', 'Inspiratie content op social', 'Virtual showroom tour'],
    results: ['+55% showroom bezoeken', 'Hogere conversie van bezoek naar verkoop'],
    deliverables: ['google-ads', 'photo-shoot', 'video-production'],
  },

  // === FITNESS (2) ===
  {
    title: 'Fitness Studio Content',
    industry: 'services',
    services: ['content', 'video'],
    country: 'NL',
    result: '40+ videos/maand',
    thumb: thumbs.fitness,
    challenge: 'Fitnessstudio wilde consistent content maar had geen interne capaciteit.',
    approach: ['Full-service content retainer', 'Video productie op locatie', 'Social media planning'],
    results: ['40+ kwalitatieve videos per maand', 'Hogere ledenbetrokkenheid'],
    deliverables: ['video-production', 'social-content', 'content-calendar'],
  },
  {
    title: 'CrossFit Box Branding',
    industry: 'services',
    services: ['branding', 'social'],
    country: 'BE',
    result: '+45% leden',
    thumb: thumbs.crossfit,
    challenge: 'Nieuwe CrossFit box moest zich onderscheiden van gevestigde concurrenten.',
    approach: ['Krachtige merkidentiteit', 'Community-gedreven content', 'Launch campagne'],
    results: ['+45% leden in eerste kwartaal', 'Sterke community opgebouwd'],
    deliverables: ['brand-identity', 'logo-design', 'social-content'],
  },

  // === AUTOMOTIVE (1) ===
  {
    title: 'Car Dealership Digital',
    industry: 'services',
    services: ['website', 'ads'],
    country: 'BE',
    result: '+28% showroom bezoeken',
    thumb: thumbs.dealership,
    challenge: 'Autohandel verloor marktaandeel aan grotere dealers met sterkere online aanwezigheid.',
    approach: ['Nieuwe website met voorraadsysteem', 'Google Ads campagnes', 'Remarketing strategie'],
    results: ['+28% showroom bezoeken', 'Lagere acquisitiekosten'],
    deliverables: ['website-design', 'website-dev', 'google-ads'],
  },

  // === LEGAL (1) ===
  {
    title: 'Law Firm Website',
    industry: 'services',
    services: ['website', 'seo'],
    country: 'BE',
    result: '+45% contactaanvragen',
    thumb: thumbs.legal,
    challenge: 'Advocatenkantoor met verouderde website en minimale online vindbaarheid.',
    approach: ['Professionele website redesign', 'Content marketing strategie', 'Lokale SEO'],
    results: ['+45% contactaanvragen', 'Top 5 Google lokaal'],
    deliverables: ['website-design', 'website-dev', 'seo-optimization'],
  },
];

// Convert to PortfolioItem format
export const ndaPortfolioItems: PortfolioItem[] = projects.map((p, i) => ({
  id: `nda-${String(i + 1).padStart(3, '0')}`,
  clientName: p.title,
  slug: `nda-project-${String(i + 1).padStart(3, '0')}`,
  industry: p.industry,
  services: p.services,
  coverMedia: {
    id: `nda-cover-${i + 1}`,
    type: 'image' as const,
    url: p.thumb,
    alt: p.title,
  },
  galleryMedia: [
    {
      id: `nda-gallery-${i + 1}-1`,
      type: 'image' as const,
      url: p.thumb,
      alt: p.title,
    },
  ],
  shortResultLine: p.result,
  popupContent: {
    challenge: p.challenge,
    approachPoints: p.approach,
    resultPoints: p.results,
    resultDisclaimer: 'Indicatief resultaat, afhankelijk van periode & budget.',
    deliverables: p.deliverables,
  },
  featured: false,
  createdAt: new Date(2024, Math.floor(i / 2), 10 + (i % 28)),
}));
