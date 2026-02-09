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

// LEBANON RESTAURANT assets
import lebanonCover from '@/assets/portfolio/lebanon-restaurant/cover.jpg';
import lebanonTaouk from '@/assets/portfolio/lebanon-restaurant/taouk.jpg';
import lebanonBurger from '@/assets/portfolio/lebanon-restaurant/burger.jpg';
import lebanonMezzePromo from '@/assets/portfolio/lebanon-restaurant/mezze-promo.jpg';
import lebanonReview from '@/assets/portfolio/lebanon-restaurant/review.jpg';
import lebanonCollage from '@/assets/portfolio/lebanon-restaurant/collage.jpg';
import lebanonKofta from '@/assets/portfolio/lebanon-restaurant/kofta.png';
import lebanonSambousek from '@/assets/portfolio/lebanon-restaurant/sambousek.png';
import lebanonTaboule from '@/assets/portfolio/lebanon-restaurant/taboule.png';

// KMA WANDPANELEN assets
import kma1 from '@/assets/portfolio/kma/kma-1.jpg';
import kma2 from '@/assets/portfolio/kma/kma-2.jpg';
import kma3 from '@/assets/portfolio/kma/kma-3.jpg';
import kma4 from '@/assets/portfolio/kma/kma-4.jpg';
import kma5 from '@/assets/portfolio/kma/kma-5.jpg';
import kma6 from '@/assets/portfolio/kma/kma-6.jpg';
import kma7 from '@/assets/portfolio/kma/kma-7.jpg';
import kmaShowroom from '@/assets/portfolio/kma/kma-showroom.jpg';

// MANGIARE 3840 assets
import mangiareCover from '@/assets/portfolio/mangiare3840/cover.jpg';

// SANREMO PIZZERIA assets
import sanremoCover from '@/assets/portfolio/sanremo/cover.jpg';

export const portfolioItems: PortfolioItem[] = [
  {
    id: '13',
    clientName: 'Sanremo Pizzeria Restaurant',
    slug: 'sanremo-pizzeria',
    industry: 'restaurant',
    services: ['social', 'content', 'branding'],
    coverMedia: {
      id: 'cover-13',
      type: 'image',
      url: sanremoCover,
      alt: 'Sanremo Pizzeria Restaurant - Social media & visual content',
    },
    galleryMedia: [
      { id: 'gallery-13-1', type: 'image', url: sanremoCover, alt: 'Sanremo Pizzeria Restaurant - Premium restaurant visual' },
    ],
    shortResultLine: 'Strong social media presence and visual content for a local restaurant.',
    popupContent: {
      challenge: 'Sanremo Pizzeria Restaurant had een trouwe lokale klantenkring, maar miste een professionele digitale aanwezigheid om nieuwe klanten aan te trekken en de sfeer van het restaurant online over te brengen.',
      approachPoints: [
        'Facebook pagina management en optimalisatie',
        'Professionele visuele content creatie',
        'Social media strategie en consistente posting',
        'Digitale aanwezigheid opbouw en onderhoud',
      ],
      resultPoints: [
        'Professionele en consistente online aanwezigheid',
        'Visueel sterke social media content',
        'Betere vindbaarheid en zichtbaarheid online',
        'Doorlopend beheer en optimalisatie',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['social-content', 'content-calendar', 'photo-shoot', 'instagram-strategy'],
    },
    externalUrl: 'https://www.facebook.com/pizzeriarestaurantsanremo',
    featured: true,
    createdAt: new Date('2025-02-05'),
  },
  {
    id: '12',
    clientName: 'Mangiare Borgloon',
    slug: 'mangiare-3840',
    industry: 'restaurant',
    services: ['website', 'branding', 'content'],
    coverMedia: {
      id: 'cover-12',
      type: 'image',
      url: mangiareCover,
      alt: 'Mangiare 3840 - Modern restaurant website',
    },
    galleryMedia: [
      { id: 'gallery-12-1', type: 'image', url: mangiareCover, alt: 'Mangiare 3840 - Website mockup' },
    ],
    shortResultLine: 'Modern restaurant website with strong visual identity.',
    popupContent: {
      challenge: 'Mangiare 3840 had een sterke lokale reputatie, maar miste een professionele online aanwezigheid die de sfeer en kwaliteit van het restaurant weerspiegelde.',
      approachPoints: [
        'Volledig op maat ontworpen website met dark premium design',
        'Visuele content en branding passend bij de restaurantsfeer',
        'Doorlopende digitale ondersteuning en optimalisatie',
        'Menukaart en reserveringssysteem geïntegreerd',
      ],
      resultPoints: [
        'Professionele online aanwezigheid die de merkbeleving versterkt',
        'Verbeterde gebruikservaring voor bezoekers',
        'Sterke visuele identiteit over alle digitale kanalen',
        'Doorlopend beheer en optimalisatie',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['website-design', 'website-dev', 'brand-identity', 'content-calendar'],
    },
    externalUrl: 'https://www.mangiare3840.be/',
    featured: true,
    createdAt: new Date('2025-02-01'),
  },
  {
    id: '11',
    clientName: 'KMA Wandpanelen',
    slug: 'kma-wandpanelen',
    industry: 'interior',
    services: ['branding', 'social'],
    coverMedia: {
      id: 'cover-11',
      type: 'image',
      url: kma6,
      alt: 'KMA Wandpanelen - WPC panelen in diverse kleuren',
    },
    galleryMedia: [
      { id: 'gallery-11-1', type: 'image', url: kma1, alt: 'KMA - Schoonmaken wandpanelen' },
      { id: 'gallery-11-2', type: 'image', url: kma2, alt: 'KMA - Marmeren keuken design' },
      { id: 'gallery-11-3', type: 'image', url: kma3, alt: 'KMA - Hout- en marmeralternatieven collectie' },
      { id: 'gallery-11-4', type: 'image', url: kma4, alt: 'KMA - WPC wandpanelen exclusief aanbod' },
      { id: 'gallery-11-5', type: 'image', url: kma5, alt: 'KMA - WPC wandpanelen donkere variant' },
      { id: 'gallery-11-6', type: 'image', url: kma6, alt: 'KMA - WPC panelen strak en duurzaam' },
      { id: 'gallery-11-7', type: 'image', url: kma7, alt: 'KMA - Eén materiaal, meerdere stijlen' },
      { id: 'gallery-11-8', type: 'image', url: kmaShowroom, alt: 'KMA - Premium showroom Antwerpen' },
    ],
    shortResultLine: '+85% showroom bezoekers',
    popupContent: {
      challenge: 'KMA Wandpanelen in Antwerpen had een premium productlijn van hout- en marmeralternatieven, maar miste online zichtbaarheid. De sterke punten (vochtbestendig, krasbestendig, makkelijk onderhoud) werden niet helder gecommuniceerd.',
      approachPoints: [
        'Professionele productfotografie van alle paneelvarianten',
        'Social media contentstrategie voor Instagram en Facebook',
        'Visuele vergelijking: WPC vs. traditioneel hout',
        'Focus op USP\'s: onderhoudsvriendelijk en duurzaam',
      ],
      resultPoints: [
        '+85% meer showroombezoekers',
        'Sterke online productinteresse via social',
        'Meer gerichte aanvragen van interieurbouwers',
        'Duidelijke positionering als premium alternatief',
      ],
      resultDisclaimer: 'Indicatief resultaat, afhankelijk van periode & budget.',
      deliverables: ['photo-shoot', 'social-content', 'instagram-strategy', 'content-calendar'],
    },
    featured: true,
    createdAt: new Date('2025-01-29'),
  },
  {
    id: '10',
    clientName: 'Restaurant Le Banon',
    slug: 'lebanon-restaurant',
    industry: 'restaurant',
    services: ['branding', 'social', 'content'],
    coverMedia: {
      id: 'cover-10',
      type: 'image',
      url: lebanonCover,
      alt: 'Lebanon Restaurant - Authentieke Libanese keuken',
    },
    galleryMedia: [
      { id: 'gallery-10-1', type: 'image', url: lebanonCover, alt: 'Lebanon Restaurant - Hummus - Le Classique Indémodable' },
      { id: 'gallery-10-2', type: 'image', url: lebanonTaouk, alt: 'Lebanon Restaurant - Grand Opening Taouk' },
      { id: 'gallery-10-3', type: 'image', url: lebanonBurger, alt: 'Lebanon Restaurant - Burger Special' },
      { id: 'gallery-10-4', type: 'image', url: lebanonMezzePromo, alt: 'Lebanon Restaurant - Plateau Mezze Complet' },
      { id: 'gallery-10-5', type: 'image', url: lebanonReview, alt: 'Lebanon Restaurant - Critique Culinaire' },
      { id: 'gallery-10-6', type: 'image', url: lebanonCollage, alt: 'Lebanon Restaurant - Venez nous rendre visite' },
      { id: 'gallery-10-7', type: 'image', url: lebanonKofta, alt: 'Lebanon Restaurant - Kofta Dawood Basha' },
      { id: 'gallery-10-8', type: 'image', url: lebanonSambousek, alt: 'Lebanon Restaurant - Sambousek' },
      { id: 'gallery-10-9', type: 'image', url: lebanonTaboule, alt: 'Lebanon Restaurant - Taboulé' },
      { id: 'gallery-10-10', type: 'video', url: '/videos/portfolio/lebanon-promo-1.mp4', posterUrl: lebanonCover, alt: 'Lebanon Restaurant - Promo video', aspectRatio: '9:16' },
    ],
    shortResultLine: '+120% social media bereik',
    popupContent: {
      challenge: 'Libanees restaurant in Brussel met authentieke gerechten, maar beperkte online aanwezigheid. De warme sfeer en traditionele keuken kwamen niet tot hun recht op social media.',
      approachPoints: [
        'Complete social media strategie voor Instagram en Facebook',
        'Professionele food fotografie en styling',
        'Korte promo video\'s en Reels voor engagement',
        'Wekelijkse contentplanning met consistente posting',
        'Review & testimonial content voor social proof',
      ],
      resultPoints: [
        '+120% social media bereik',
        'Merkbare stijging in nieuwe klanten via Instagram',
        'Hogere engagement rate op posts',
        'Sterkere merkherkenning in de regio Brussel',
        'Meer tafelreserveringen via DM\'s',
      ],
      resultDisclaimer: 'Indicatief resultaat, afhankelijk van periode & budget.',
      deliverables: ['photo-shoot', 'video-production', 'reels-production', 'social-content', 'instagram-strategy', 'content-calendar'],
    },
    featured: true,
    createdAt: new Date('2025-01-29'),
  },
  {
    id: '9',
    clientName: 'Restaurant IL Fuoco',
    slug: 'il-fuoco-pizza',
    industry: 'restaurant',
    services: ['branding', 'social'],
    coverMedia: {
      id: 'cover-9',
      type: 'image',
      url: ilFuocoChef,
      alt: 'Restaurant IL Fuoco - Pizzaiolo aan het werk',
    },
    galleryMedia: [
      { id: 'gallery-9-1', type: 'image', url: ilFuocoChef, alt: 'Restaurant IL Fuoco - Chef bereidt pizza' },
      { id: 'gallery-9-2', type: 'video', url: '/videos/portfolio/il-fuoco-promo.mp4', posterUrl: ilFuocoChef, alt: 'Restaurant IL Fuoco - Promo video' },
      { id: 'gallery-9-3', type: 'image', url: ilFuocoMenu, alt: 'Restaurant IL Fuoco - Menu design' },
      { id: 'gallery-9-4', type: 'image', url: ilFuocoReviews, alt: 'Restaurant IL Fuoco - Reviews sectie' },
      { id: 'gallery-9-5', type: 'image', url: ilFuocoEvents, alt: 'Restaurant IL Fuoco - Events pagina' },
      { id: 'gallery-9-6', type: 'image', url: ilFuocoDeals, alt: 'Restaurant IL Fuoco - Deals en acties' },
      { id: 'gallery-9-7', type: 'image', url: ilFuocoInstagram, alt: 'Restaurant IL Fuoco - Instagram post' },
    ],
    shortResultLine: '+65% online reserveringen',
    popupContent: {
      challenge: 'Authentieke Italiaanse pizzeria met ambachtelijke aanpak, maar verouderde online aanwezigheid. De huiselijke sfeer en kwaliteit van de pizza kwam niet over in hun digitale uitstraling.',
      approachPoints: [
        'Complete visuele identiteit herwerkt',
        'Professionele food en sfeer fotografie',
        'Digitaal menukaart-systeem met QR-integratie',
        'Social media content voor Instagram & Facebook',
        'Reviews en testimonials strategie',
      ],
      resultPoints: [
        '+65% meer online reserveringen',
        'Sterke merkbekendheid in de regio',
        'Hogere gemiddelde orderwaarde',
        'Meer herhaalbezoekers dankzij loyalty content',
        'Verbeterde online reviews en ratings',
      ],
      resultDisclaimer: 'Indicatief resultaat, afhankelijk van periode & budget.',
      deliverables: ['brand-identity', 'photo-shoot', 'menu-design', 'social-content', 'instagram-strategy'],
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
      { id: 'gallery-1-1', type: 'image', url: restaurantBranding, alt: 'La Maison Dorée restaurant branding' },
    ],
    shortResultLine: '+180% reserveringen',
    popupContent: {
      challenge: 'Premium restaurant met weinig online zichtbaarheid. De verouderde branding sloot niet aan bij het exclusieve aanbod en de doelgroep werd niet bereikt.',
      approachPoints: [
        'Complete rebrand met luxe uitstraling',
        'Nieuwe website met reserveringssysteem',
        'Professionele fotoshoot van interieur en gerechten',
        'Google Ads-campagne gericht op lokale zoekers',
      ],
      resultPoints: [
        '+180% reserveringen binnen 6 maanden',
        'Hogere gemiddelde besteding per tafel',
        'Betere online reviews en ratings',
        'Top 3 positie in Google voor lokale zoektermen',
      ],
      deliverables: ['brand-identity', 'website-design', 'website-dev', 'photo-shoot', 'google-ads'],
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
      { id: 'gallery-2-1', type: 'image', url: modeWebshop, alt: 'LUXE Mode webshop homepage' },
    ],
    shortResultLine: '€85K omzet in 3 maanden',
    popupContent: {
      challenge: 'Startende online modewinkel zonder digitale aanwezigheid. Beperkt marketingbudget maar hoge ambitie om snel te groeien in de Belgische markt.',
      approachPoints: [
        'Shopify webshop setup en configuratie',
        'Professionele productfotografie',
        'Meta Ads-campagnes met retargeting',
        'Conversiegerichte landingspagina\'s',
      ],
      resultPoints: [
        '€85K omzet in eerste 3 maanden',
        'ROAS van 4.2 op advertenties',
        'Stabiele terugkerende klantenbasis',
        'Succesvolle uitbreiding naar Nederland',
      ],
      deliverables: ['website-design', 'website-dev', 'photo-shoot', 'facebook-ads'],
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
      { id: 'gallery-3-1', type: 'image', url: b2bPlatform, alt: 'TechFlow Solutions platform dashboard' },
    ],
    shortResultLine: '+320% leads',
    popupContent: {
      challenge: 'Complexe B2B SaaS met lange salesfunnel. Te weinig gekwalificeerde leads en website converteerde slecht. Concurrent positionering was sterker.',
      approachPoints: [
        'Geoptimaliseerde landingspagina\'s per persona',
        'Lead magnets (whitepapers, case studies)',
        'SEO-strategie voor long-tail keywords',
        'A/B-testen van formulieren en CTA\'s',
      ],
      resultPoints: [
        '+320% gekwalificeerde leads binnen 4 maanden',
        'Lagere cost per lead',
        'Kortere salesfunnel duur',
        'Betere lead kwaliteit (SQL ratio)',
      ],
      deliverables: ['website-design', 'website-dev', 'seo-optimization', 'copywriting'],
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
      { id: 'gallery-4-1', type: 'image', url: bouwbedrijfWebsite, alt: 'Van Damme Bouw portfolio' },
    ],
    shortResultLine: '#1 Google lokaal',
    popupContent: {
      challenge: 'Familiebouwbedrijf leefde puur op mond-tot-mondreclame. Geen website, geen online aanwezigheid. Jongere generatie wilde moderniseren.',
      approachPoints: [
        'Professionele website met projectportfolio',
        'Google My Business optimalisatie',
        'Lokale SEO-strategie',
        'Projectfotografie en case studies',
      ],
      resultPoints: [
        '#1 positie in Google voor lokale zoektermen',
        '45+ leads per maand via website',
        'Hogere gemiddelde projectwaarde',
        'Sterkere positionering t.o.v. concurrenten',
      ],
      deliverables: ['website-design', 'website-dev', 'seo-optimization', 'gmb-optimization', 'photo-shoot'],
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
      { id: 'gallery-5-1', type: 'image', url: influencerCampagne, alt: 'Influencer campagne content' },
    ],
    shortResultLine: '2.4M bereik',
    popupContent: {
      challenge: 'Nieuw beautymerk zonder naamsbekendheid. Doelgroep 18-35 jaar moeilijk te bereiken via traditionele kanalen.',
      approachPoints: [
        'Influencer partnership strategie',
        '12 Belgische creators geactiveerd',
        'UGC-campagne op Instagram en TikTok',
        'Branded content en giveaways',
      ],
      resultPoints: [
        '2.4 miljoen organisch bereik in 2 maanden',
        'Hoge engagement op UGC content',
        'Sterke merkbekendheid bij doelgroep',
        'Succesvolle productlancering',
      ],
      deliverables: ['influencer-campaign', 'social-content', 'video-production', 'content-calendar'],
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
      { id: 'gallery-6-1', type: 'image', url: techStartupBranding, alt: 'NovaTech AI brand identity' },
    ],
    shortResultLine: 'Complete merkidentiteit',
    popupContent: {
      challenge: 'Pre-seed startup had professionele uitstraling nodig voor investeerdersgesprekken. Huidige DIY-branding was niet overtuigend.',
      approachPoints: [
        'Complete brand identity development',
        'Logo en visuele taal ontwerp',
        'Pitch deck design voor investeerders',
        'Investor-ready website',
      ],
      resultPoints: [
        'Succesvolle seed-ronde gesloten binnen 3 maanden',
        'Professionele uitstraling naar investeerders',
        'Consistent merkbeeld over alle touchpoints',
        'Basis gelegd voor schaalbare branding',
      ],
      deliverables: ['logo-design', 'brand-identity', 'pitch-deck', 'website-design', 'website-dev'],
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
      { id: 'gallery-7-1', type: 'image', url: ecommerceGroei, alt: 'HomeStyle webshop analytics' },
    ],
    shortResultLine: '+240% ROAS',
    popupContent: {
      challenge: 'Bestaande interieurwebshop draaide verlies op advertenties. ROAS onder 1.0 en geen duidelijke strategie. Budget werd verspild.',
      approachPoints: [
        'Volledige audit van bestaande campagnes',
        'Nieuwe doelgroepsegmentatie',
        'A/B-testen van creatives',
        'Retargeting funnels opgezet',
      ],
      resultPoints: [
        '+240% ROAS verbetering binnen 90 dagen',
        'Winstgevende advertentie-uitgaven',
        'Lagere cost per acquisition',
        'Schaalbare campagnestructuur',
      ],
      deliverables: ['facebook-ads', 'google-ads', 'copywriting'],
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
      { id: 'gallery-8-1', type: 'image', url: contentStrategie, alt: 'FitLife content calendar' },
    ],
    shortResultLine: '50+ video\'s/maand',
    popupContent: {
      challenge: 'Fitnessketen wilde consistent content produceren maar had intern geen tijd of expertise. Social media werd verwaarloosd.',
      approachPoints: [
        'Full-service content retainer opgezet',
        'Planning, productie en publicatie',
        'Video en fotocontent voor alle locaties',
        'Consistente posting strategie',
      ],
      resultPoints: [
        '50+ kwalitatieve video\'s per maand',
        'Consistente merkbeleving over alle kanalen',
        'Hogere ledenbetrokkenheid',
        'Meer aanmeldingen via social media',
      ],
      deliverables: ['video-production', 'photo-shoot', 'social-content', 'content-calendar', 'reels-production'],
    },
    featured: false,
    createdAt: new Date('2024-04-05'),
  },
];

// Import NDA items
import { ndaPortfolioItems } from './ndaPortfolioItems';

// All portfolio items (real + NDA)
export const allPortfolioItems: PortfolioItem[] = [
  ...portfolioItems,
  ...ndaPortfolioItems,
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
  if (industry === 'all') return allPortfolioItems;
  return allPortfolioItems.filter(item => item.industry === industry);
};

// Helper: Filter portfolio items by service tag
export const filterByService = (service: string): PortfolioItem[] => {
  if (service === 'all') return allPortfolioItems;
  return allPortfolioItems.filter(item => item.services.includes(service as any));
};

// Helper: Search portfolio items by client name
export const searchPortfolio = (query: string): PortfolioItem[] => {
  const lowerQuery = query.toLowerCase();
  return allPortfolioItems.filter(item => 
    item.clientName.toLowerCase().includes(lowerQuery)
  );
};

// Combined filter helper
export const filterPortfolio = (
  industry: string = 'all',
  service: string = 'all',
  searchQuery: string = ''
): PortfolioItem[] => {
  let results = [...allPortfolioItems];
  
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
