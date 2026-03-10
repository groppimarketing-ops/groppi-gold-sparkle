// GROPPI Portfolio Items - Real Client Data
// This is the single source of truth for all portfolio/case study data
// All image paths use /public/portfolio/ (string paths, NOT ES6 imports)
// This eliminates 120+ JS chunks and saves 100+ HTTP requests.

import type { PortfolioItem } from '@/types/portfolio';
import { ndaPortfolioItems } from './ndaPortfolioItems';

export const portfolioItems: PortfolioItem[] = [
  {
    id: '19',
    clientName: 'Castello Vicchiomaggio',
    slug: 'castello-vicchiomaggio',
    industry: 'hospitality',
    services: ['website', 'branding', 'content'],
    coverMedia: {
      id: 'cover-19',
      type: 'image',
      url: '/portfolio/vicchiomaggio/hero.webp',
      alt: 'Castello Vicchiomaggio - Tuscan winery estate at golden hour',
    },
    galleryMedia: [
      { id: 'gallery-19-1', type: 'image', url: '/portfolio/vicchiomaggio/desktop-mockup.webp', alt: 'Vicchiomaggio - Website desktop mockup' },
      { id: 'gallery-19-2', type: 'image', url: '/portfolio/vicchiomaggio/mobile-mockup.webp', alt: 'Vicchiomaggio - Mobile booking experience', aspectRatio: '9:16' },
      { id: 'gallery-19-3', type: 'image', url: '/portfolio/vicchiomaggio/wine-cellar.webp', alt: 'Vicchiomaggio - Wine cellar experience' },
      { id: 'gallery-19-4', type: 'image', url: '/portfolio/vicchiomaggio/dining.webp', alt: 'Vicchiomaggio - Terrace dining with Tuscan views' },
      { id: 'gallery-19-5', type: 'image', url: '/portfolio/vicchiomaggio/landscape.webp', alt: 'Vicchiomaggio - Chianti vineyard landscape' },
      { id: 'gallery-19-6', type: 'image', url: '/portfolio/vicchiomaggio/brand-mood.webp', alt: 'Vicchiomaggio - Brand mood and textures', aspectRatio: '4:5' },
      { id: 'gallery-19-7', type: 'image', url: '/portfolio/vicchiomaggio/digital-presence.webp', alt: 'Vicchiomaggio - Multi-device digital presence' },
    ],
    shortResultLine: 'Digital presentation and visual direction for a historic Tuscan winery and hospitality estate.',
    popupContent: {
      challenge: 'Castello Vicchiomaggio, a historic winery and hospitality estate in the Chianti region of Tuscany, needed a refined digital presence to match the prestige of their centuries-old heritage and attract international guests.',
      approachPoints: [
        'Premium website design with luxury hospitality focus',
        'Visual content direction capturing estate atmosphere',
        'Mobile-first booking experience optimization',
        'Digital brand identity aligned with historic heritage',
        'Multi-device responsive presentation',
      ],
      resultPoints: [
        'Elevated digital presence reflecting estate prestige',
        'Immersive visual storytelling across all touchpoints',
        'Streamlined guest booking experience',
        'Consistent brand presentation across devices',
        'Enhanced international visibility and appeal',
      ],
      resultDisclaimer: 'Visuals recreated for portfolio presentation purposes.',
      deliverables: ['website-design', 'website-dev', 'content-calendar', 'photo-shoot', 'social-content'],
    },
    clientLogo: '/portfolio/vicchiomaggio/logo.png',
    externalUrl: 'https://www.vicchiomaggio.it/',
    featured: true,
    createdAt: new Date('2025-03-15'),
  },
  {
    id: '18',
    clientName: 'Pizzeria Cose Pazzi Torino',
    slug: 'cose-pazzi-torino',
    industry: 'restaurant',
    services: ['website', 'branding', 'content'],
    coverMedia: {
      id: 'cover-18',
      type: 'image',
      url: '/portfolio/cose-pazzi/food-hero.webp',
      alt: 'Pizzeria Cose Pazzi Torino - Premium pizza presentation',
    },
    galleryMedia: [
      { id: 'gallery-18-1', type: 'image', url: '/portfolio/cose-pazzi/website-mobile.webp', alt: 'Cose Pazzi - Mobile menu experience', aspectRatio: '9:16' },
      { id: 'gallery-18-2', type: 'image', url: '/portfolio/cose-pazzi/food-hero.webp', alt: 'Cose Pazzi - Premium pizza presentation' },
      { id: 'gallery-18-3', type: 'image', url: '/portfolio/cose-pazzi/interior.webp', alt: 'Cose Pazzi - Warm restaurant ambiance' },
      { id: 'gallery-18-4', type: 'image', url: '/portfolio/cose-pazzi/social-mockup.webp', alt: 'Cose Pazzi - Social media visual identity', aspectRatio: '4:5' },
      { id: 'gallery-18-5', type: 'image', url: '/portfolio/cose-pazzi/brand-mood.webp', alt: 'Cose Pazzi - Brand mood and palette' },
    ],
    shortResultLine: 'Authentic Italian pizzeria website with strong food-focused visuals and local brand character.',
    popupContent: {
      challenge: 'Pizzeria Cose Pazzi in Torino needed a polished digital presence to reflect their authentic Italian cuisine and vibrant neighborhood character, attracting both locals and visitors to their pizzeria.',
      approachPoints: [
        'Website structure & optimization',
        'Visual presentation & food-focused hierarchy',
        'Mobile-first usability improvements',
        'Local Italian brand feel and storytelling',
      ],
      resultPoints: [
        'Premium restaurant branding online',
        'Strong food visibility and appetite appeal',
        'Clear and simple customer journey',
        'Improved online visibility and local SEO',
      ],
      resultDisclaimer: 'Visuals are illustrative and created for presentation purposes.',
      deliverables: ['website-design', 'website-dev', 'content-calendar', 'social-content'],
    },
    clientLogo: '/portfolio/cose-pazzi/logo.png',
    externalUrl: 'https://www.pizzeriacosepazztorino.it/',
    featured: true,
    createdAt: new Date('2025-02-10'),
  },
  {
    id: '17',
    clientName: 'Augusto Torino',
    slug: 'augusto-torino',
    industry: 'restaurant',
    services: ['website', 'branding', 'content'],
    coverMedia: {
      id: 'cover-17',
      type: 'image',
      url: '/portfolio/augusto-torino/cover.jpg',
      alt: 'Augusto Torino - Elegant Italian restaurant in Turin',
    },
    galleryMedia: [
      { id: 'gallery-17-1', type: 'image', url: '/portfolio/augusto-torino/exterior.jpg', alt: 'Augusto Torino - Restaurant exterior at night' },
      { id: 'gallery-17-2', type: 'image', url: '/portfolio/augusto-torino/interior.jpg', alt: 'Augusto Torino - Dining room interior' },
      { id: 'gallery-17-3', type: 'image', url: '/portfolio/augusto-torino/ambiance.jpg', alt: 'Augusto Torino - Warm ambiance detail' },
      { id: 'gallery-17-4', type: 'image', url: '/portfolio/augusto-torino/door.jpg', alt: 'Augusto Torino - Signature blue door' },
      { id: 'gallery-17-5', type: 'image', url: '/portfolio/augusto-torino/bar.jpg', alt: 'Augusto Torino - Bar and draft beer setup' },
    ],
    shortResultLine: 'Elegant restaurant website with strong visual identity and refined food presentation.',
    popupContent: {
      challenge: 'Ristorante Pizzeria Augusto in Torino needed a polished digital presence to reflect their refined Italian cuisine and welcoming atmosphere, attracting both locals and visitors.',
      approachPoints: [
        'Website structure & optimization',
        'Visual hierarchy & food-focused layout',
        'Performance and mobile usability',
        'Event and reservation integration',
      ],
      resultPoints: [
        'Premium restaurant branding online',
        'Clear customer journey from menu to booking',
        'Strong visual storytelling across all pages',
        'Improved online visibility and local SEO',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['website-design', 'website-dev', 'content-calendar', 'photo-shoot'],
    },
    externalUrl: 'https://augustotorino.com/',
    featured: true,
    createdAt: new Date('2025-02-09'),
  },
  {
    id: '16',
    clientName: 'Pizzeria Pummarò',
    slug: 'pummaro-torino',
    industry: 'restaurant',
    services: ['website', 'branding', 'content'],
    coverMedia: {
      id: 'cover-16',
      type: 'image',
      url: '/portfolio/pummaro/cover.jpg',
      alt: 'Pizzeria Pummarò - Authentic Italian pizzeria in Torino',
    },
    galleryMedia: [
      { id: 'gallery-16-1', type: 'image', url: '/portfolio/pummaro/pizza-box.jpg', alt: 'Pummarò - Pizza in branded box' },
      { id: 'gallery-16-2', type: 'image', url: '/portfolio/pummaro/farinata.jpg', alt: 'Pummarò - Traditional farinata' },
      { id: 'gallery-16-3', type: 'image', url: '/portfolio/pummaro/burger.jpg', alt: 'Pummarò - Gourmet burger' },
    ],
    shortResultLine: 'Modern restaurant website with strong food presentation and clear customer flow.',
    popupContent: {
      challenge: 'Pizzeria Pummarò in Torino needed a professional digital presence that reflected their commitment to authentic Italian cuisine using premium ingredients from small Italian producers.',
      approachPoints: [
        'Website structure & optimization',
        'Visual hierarchy & food presentation',
        'Mobile usability improvements',
        'Online reservation and delivery integration',
      ],
      resultPoints: [
        'Conversion-friendly layout with clear navigation',
        'Strong local restaurant branding online',
        'Professional food visibility and ingredient storytelling',
        'Seamless customer journey from menu to reservation',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['website-design', 'website-dev', 'content-calendar', 'photo-shoot'],
    },
    externalUrl: 'https://pizzeriapummaro.com/',
    featured: true,
    createdAt: new Date('2025-02-09'),
  },
  {
    id: '15',
    clientName: 'Pizzeria Fratelli Roselli',
    slug: 'fratelli-roselli',
    industry: 'restaurant',
    services: ['website', 'branding', 'content'],
    clientLogo: '/portfolio/fratelli-roselli/logo.png',
    coverMedia: {
      id: 'cover-15',
      type: 'image',
      url: '/portfolio/fratelli-roselli/cover.jpg',
      alt: 'Pizzeria Fratelli Roselli - Logo',
    },
    galleryMedia: [
      { id: 'gallery-15-1', type: 'image', url: '/portfolio/fratelli-roselli/pizza-hero.jpg', alt: 'Fratelli Roselli - Pizza presentation' },
      { id: 'gallery-15-2', type: 'image', url: '/portfolio/fratelli-roselli/ingredienti.jpg', alt: 'Fratelli Roselli - Premium ingredients' },
      { id: 'gallery-15-3', type: 'image', url: '/portfolio/fratelli-roselli/pizza-closeup.jpg', alt: 'Fratelli Roselli - Neapolitan pizza closeup' },
      { id: 'gallery-15-4', type: 'image', url: '/portfolio/fratelli-roselli/happy-diners.jpg', alt: 'Fratelli Roselli - Happy family enjoying pizza' },
      { id: 'gallery-15-5', type: 'image', url: '/portfolio/fratelli-roselli/friends-eating.jpg', alt: 'Fratelli Roselli - Friends having fun with pizza' },
    ],
    shortResultLine: 'Authentic Italian restaurant website with strong food presentation and local branding.',
    popupContent: {
      challenge: 'Pizzeria Fratelli Roselli in Turin had a loyal local following for over 20 years, but needed a professional digital presence to showcase their commitment to quality ingredients and authentic pizza-making.',
      approachPoints: [
        'Website structure & optimization',
        'Visual presentation & content layout',
        'Performance & usability improvements',
        'Online reservation system integration',
      ],
      resultPoints: [
        'Professional and clear website reflecting brand quality',
        'Strong food visibility with premium ingredient focus',
        'Clear customer journey from menu to reservation',
        'Improved local restaurant branding online',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['website-design', 'website-dev', 'content-calendar', 'photo-shoot'],
    },
    externalUrl: 'https://www.pizzeriafratelliroselli.it/',
    featured: true,
    createdAt: new Date('2025-02-09'),
  },
  {
    id: '14',
    clientName: 'Restaurant Boothuis',
    slug: 'boothuis-turnhout',
    industry: 'restaurant',
    services: ['website', 'content', 'branding'],
    coverMedia: {
      id: 'cover-14',
      type: 'image',
      url: '/portfolio/boothuis/cover.jpg',
      alt: 'Boothuis Turnhout - Restaurant website & visual content',
    },
    galleryMedia: [
      { id: 'gallery-14-1', type: 'image', url: '/portfolio/boothuis/cover.jpg', alt: 'Boothuis Turnhout - Website presentation' },
    ],
    shortResultLine: 'Clean restaurant website and visual presentation for a local hospitality business.',
    popupContent: {
      challenge: 'Boothuis Turnhout had nood aan een professionele digitale aanwezigheid die de sfeer en kwaliteit van het restaurant online weerspiegelde.',
      approachPoints: [
        'Website management en doorlopende optimalisatie',
        'Visuele content en professionele presentatie',
        'Digitale aanwezigheid opbouw en onderhoud',
        'Consistente merkbeleving over alle online kanalen',
      ],
      resultPoints: [
        'Professionele en overzichtelijke website',
        'Sterke visuele presentatie van het restaurant',
        'Verbeterde online vindbaarheid',
        'Doorlopend beheer en optimalisatie',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['website-design', 'website-dev', 'content-calendar', 'photo-shoot'],
    },
    externalUrl: 'https://boothuisturnhout.be/',
    featured: true,
    createdAt: new Date('2025-02-07'),
  },
  {
    id: '13',
    clientName: 'Pizzeria San Remo',
    slug: 'sanremo-pizzeria',
    industry: 'restaurant',
    services: ['social', 'content', 'branding'],
    coverMedia: {
      id: 'cover-13',
      type: 'image',
      url: '/portfolio/sanremo/cover.jpg',
      alt: 'Sanremo Pizzeria Restaurant - Social media & visual content',
    },
    galleryMedia: [
      { id: 'gallery-13-1', type: 'image', url: '/portfolio/sanremo/cover.jpg', alt: 'Sanremo Pizzeria Restaurant - Premium restaurant visual' },
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
    clientLogo: '/portfolio/mangiare3840/logo.jpeg',
    coverMedia: {
      id: 'cover-12',
      type: 'image',
      url: '/portfolio/mangiare3840/cover.jpg',
      alt: 'Mangiare 3840 - Modern restaurant website',
    },
    galleryMedia: [
      { id: 'gallery-12-1', type: 'image', url: '/portfolio/mangiare3840/cover.jpg', alt: 'Mangiare 3840 - Website mockup' },
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
      url: '/portfolio/kma/kma-6.jpg',
      alt: 'KMA Wandpanelen - WPC panelen in diverse kleuren',
    },
    galleryMedia: [
      { id: 'gallery-11-1', type: 'image', url: '/portfolio/kma/kma-1.jpg', alt: 'KMA - Schoonmaken wandpanelen' },
      { id: 'gallery-11-2', type: 'image', url: '/portfolio/kma/kma-2.jpg', alt: 'KMA - Marmeren keuken design' },
      { id: 'gallery-11-3', type: 'image', url: '/portfolio/kma/kma-3.jpg', alt: 'KMA - Hout- en marmeralternatieven collectie' },
      { id: 'gallery-11-4', type: 'image', url: '/portfolio/kma/kma-4.jpg', alt: 'KMA - WPC wandpanelen exclusief aanbod' },
      { id: 'gallery-11-5', type: 'image', url: '/portfolio/kma/kma-5.jpg', alt: 'KMA - WPC wandpanelen donkere variant' },
      { id: 'gallery-11-6', type: 'image', url: '/portfolio/kma/kma-6.jpg', alt: 'KMA - WPC panelen strak en duurzaam' },
      { id: 'gallery-11-7', type: 'image', url: '/portfolio/kma/kma-7.jpg', alt: 'KMA - Eén materiaal, meerdere stijlen' },
      { id: 'gallery-11-8', type: 'image', url: '/portfolio/kma/kma-showroom.jpg', alt: 'KMA - Premium showroom Antwerpen' },
    ],
    shortResultLine: '+85% showroom bezoekers',
    popupContent: {
      challenge: 'KMA Wandpanelen in Antwerpen had een premium productlijn van hout- en marmeralternatieven, maar miste online zichtbaarheid. De sterke punten (vochtbestendig, krasbestendig, makkelijk onderhoud) werden niet helder gecommuniceerd.',
      approachPoints: [
        'Professionele productfotografie van alle paneelvarianten',
        'Social media contentstrategie voor Instagram en Facebook',
        'Visuele vergelijking: WPC vs. traditioneel hout',
        "Focus op USP's: onderhoudsvriendelijk en duurzaam",
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
      url: '/portfolio/lebanon-restaurant/cover.jpg',
      alt: 'Lebanon Restaurant - Authentieke Libanese keuken',
    },
    galleryMedia: [
      { id: 'gallery-10-1', type: 'image', url: '/portfolio/lebanon-restaurant/cover.jpg', alt: 'Lebanon Restaurant - Hummus - Le Classique Indémodable' },
      { id: 'gallery-10-2', type: 'image', url: '/portfolio/lebanon-restaurant/taouk.jpg', alt: 'Lebanon Restaurant - Grand Opening Taouk' },
      { id: 'gallery-10-3', type: 'image', url: '/portfolio/lebanon-restaurant/burger.jpg', alt: 'Lebanon Restaurant - Burger Special' },
      { id: 'gallery-10-4', type: 'image', url: '/portfolio/lebanon-restaurant/mezze-promo.jpg', alt: 'Lebanon Restaurant - Plateau Mezze Complet' },
      { id: 'gallery-10-5', type: 'image', url: '/portfolio/lebanon-restaurant/review.jpg', alt: 'Lebanon Restaurant - Critique Culinaire' },
      { id: 'gallery-10-6', type: 'image', url: '/portfolio/lebanon-restaurant/collage.jpg', alt: 'Lebanon Restaurant - Venez nous rendre visite' },
      { id: 'gallery-10-7', type: 'image', url: '/portfolio/lebanon-restaurant/kofta.png', alt: 'Lebanon Restaurant - Kofta Dawood Basha' },
      { id: 'gallery-10-8', type: 'image', url: '/portfolio/lebanon-restaurant/sambousek.png', alt: 'Lebanon Restaurant - Sambousek' },
      { id: 'gallery-10-9', type: 'image', url: '/portfolio/lebanon-restaurant/taboule.png', alt: 'Lebanon Restaurant - Taboulé' },
      { id: 'gallery-10-10', type: 'video', url: '/videos/portfolio/lebanon-promo-1.mp4', posterUrl: '/portfolio/lebanon-restaurant/cover.jpg', alt: 'Lebanon Restaurant - Promo video', aspectRatio: '9:16' },
    ],
    shortResultLine: '+120% social media bereik',
    popupContent: {
      challenge: 'Libanees restaurant in Brussel met authentieke gerechten, maar beperkte online aanwezigheid. De warme sfeer en traditionele keuken kwamen niet tot hun recht op social media.',
      approachPoints: [
        'Complete social media strategie voor Instagram en Facebook',
        'Professionele food fotografie en styling',
        "Korte promo video's en Reels voor engagement",
        'Wekelijkse contentplanning met consistente posting',
        'Review & testimonial content voor social proof',
      ],
      resultPoints: [
        '+120% social media bereik',
        'Merkbare stijging in nieuwe klanten via Instagram',
        'Hogere engagement rate op posts',
        'Sterkere merkherkenning in de regio Brussel',
        "Meer tafelreserveringen via DM's",
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
      url: '/portfolio/il-fuoco/chef-pizza.jpg',
      alt: 'Restaurant IL Fuoco - Pizzaiolo aan het werk',
    },
    galleryMedia: [
      { id: 'gallery-9-1', type: 'image', url: '/portfolio/il-fuoco/chef-pizza.jpg', alt: 'Restaurant IL Fuoco - Chef bereidt pizza' },
      { id: 'gallery-9-2', type: 'video', url: '/videos/portfolio/il-fuoco-promo.mp4', posterUrl: '/portfolio/il-fuoco/chef-pizza.jpg', alt: 'Restaurant IL Fuoco - Promo video' },
      { id: 'gallery-9-3', type: 'image', url: '/portfolio/il-fuoco/menu.png', alt: 'Restaurant IL Fuoco - Menu design' },
      { id: 'gallery-9-4', type: 'image', url: '/portfolio/il-fuoco/reviews.png', alt: 'Restaurant IL Fuoco - Reviews sectie' },
      { id: 'gallery-9-5', type: 'image', url: '/portfolio/il-fuoco/events.png', alt: 'Restaurant IL Fuoco - Events pagina' },
      { id: 'gallery-9-6', type: 'image', url: '/portfolio/il-fuoco/deals.png', alt: 'Restaurant IL Fuoco - Deals en acties' },
      { id: 'gallery-9-7', type: 'image', url: '/portfolio/il-fuoco/instagram.png', alt: 'Restaurant IL Fuoco - Instagram post' },
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
      url: '/portfolio/restaurant-branding.jpg',
      alt: 'La Maison Dorée restaurant branding',
    },
    galleryMedia: [
      { id: 'gallery-1-1', type: 'image', url: '/portfolio/restaurant-branding.jpg', alt: 'La Maison Dorée restaurant branding' },
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
      url: '/portfolio/mode-webshop.jpg',
      alt: 'LUXE Mode webshop',
    },
    galleryMedia: [
      { id: 'gallery-2-1', type: 'image', url: '/portfolio/mode-webshop.jpg', alt: 'LUXE Mode webshop homepage' },
    ],
    shortResultLine: '€85K omzet in 3 maanden',
    popupContent: {
      challenge: 'Startende online modewinkel zonder digitale aanwezigheid. Beperkt marketingbudget maar hoge ambitie om snel te groeien in de Belgische markt.',
      approachPoints: [
        'Shopify webshop setup en configuratie',
        'Professionele productfotografie',
        'Meta Ads-campagnes met retargeting',
        "Conversiegerichte landingspagina's",
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
      url: '/portfolio/b2b-platform.jpg',
      alt: 'TechFlow Solutions B2B platform',
    },
    galleryMedia: [
      { id: 'gallery-3-1', type: 'image', url: '/portfolio/b2b-platform.jpg', alt: 'TechFlow Solutions platform dashboard' },
    ],
    shortResultLine: '+320% leads',
    popupContent: {
      challenge: 'Complexe B2B SaaS met lange salesfunnel. Te weinig gekwalificeerde leads en website converteerde slecht. Concurrent positionering was sterker.',
      approachPoints: [
        "Geoptimaliseerde landingspagina's per persona",
        'Lead magnets (whitepapers, case studies)',
        'SEO-strategie voor long-tail keywords',
        "A/B-testen van formulieren en CTA's",
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
      url: '/portfolio/bouwbedrijf-website.jpg',
      alt: 'Van Damme Bouw website',
    },
    galleryMedia: [
      { id: 'gallery-4-1', type: 'image', url: '/portfolio/bouwbedrijf-website.jpg', alt: 'Van Damme Bouw portfolio' },
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
      url: '/portfolio/influencer-campagne.jpg',
      alt: 'Belgian Beauty Collective influencer campagne',
    },
    galleryMedia: [
      { id: 'gallery-5-1', type: 'image', url: '/portfolio/influencer-campagne.jpg', alt: 'Influencer campagne content' },
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
      url: '/portfolio/tech-startup-branding.jpg',
      alt: 'NovaTech AI branding',
    },
    galleryMedia: [
      { id: 'gallery-6-1', type: 'image', url: '/portfolio/tech-startup-branding.jpg', alt: 'NovaTech AI brand identity' },
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
      url: '/portfolio/e-commerce-groei.jpg',
      alt: 'HomeStyle Interieur e-commerce',
    },
    galleryMedia: [
      { id: 'gallery-7-1', type: 'image', url: '/portfolio/e-commerce-groei.jpg', alt: 'HomeStyle webshop analytics' },
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
      url: '/portfolio/content-strategie.jpg',
      alt: 'FitLife Studios content strategie',
    },
    galleryMedia: [
      { id: 'gallery-8-1', type: 'image', url: '/portfolio/content-strategie.jpg', alt: 'FitLife content calendar' },
    ],
    shortResultLine: "50+ video's/maand",
    popupContent: {
      challenge: 'Fitnessketen wilde consistent content produceren maar had intern geen tijd of expertise. Social media werd verwaarloosd.',
      approachPoints: [
        'Full-service content retainer opgezet',
        'Planning, productie en publicatie',
        'Video en fotocontent voor alle locaties',
        'Consistente posting strategie',
      ],
      resultPoints: [
        "50+ kwalitatieve video's per maand",
        'Consistente merkbeleving over alle kanalen',
        'Hogere ledenbetrokkenheid',
        'Meer aanmeldingen via social media',
      ],
      deliverables: ['video-production', 'photo-shoot', 'social-content', 'content-calendar', 'reels-production'],
    },
    featured: false,
    createdAt: new Date('2024-04-05'),
  },
  {
    id: '20',
    clientName: 'Ai Learn Academy',
    slug: 'ai-learn-academy',
    industry: 'education',
    services: ['website', 'ecommerce', 'content'],
    coverMedia: {
      id: 'cover-20',
      type: 'image',
      url: '/portfolio/aideals/cover.jpg',
      alt: 'Ai Learn Academy premium AI platform',
    },
    galleryMedia: [
      { id: 'gallery-20-1', type: 'image', url: '/portfolio/aideals/desktop-mockup.webp', alt: 'AI Deals desktop website mockup' },
      { id: 'gallery-20-2', type: 'image', url: '/portfolio/aideals/mobile-mockup.webp', alt: 'AI Deals mobile interface', aspectRatio: '9:16' },
      { id: 'gallery-20-3', type: 'image', url: '/portfolio/aideals/marketplace.webp', alt: 'AI tools marketplace grid' },
      { id: 'gallery-20-4', type: 'image', url: '/portfolio/aideals/academy.webp', alt: 'AI Academy educational platform' },
      { id: 'gallery-20-5', type: 'image', url: '/portfolio/aideals/dashboard.webp', alt: 'AI tools analytics dashboard' },
      { id: 'gallery-20-6', type: 'image', url: '/portfolio/aideals/brand-mood.webp', alt: 'AI Deals brand mood – neural network' },
      { id: 'gallery-20-7', type: 'image', url: '/portfolio/aideals/multi-device.webp', alt: 'AI Deals multi-device presentation' },
    ],
    shortResultLine: 'Live platform – ongoing',
    popupContent: {
      challenge: 'AI Deals needed a premium platform that simplifies access to leading AI tools through a subscription model, combined with an educational academy for creators and professionals. The challenge was building a scalable, conversion-focused experience from scratch.',
      approachPoints: [
        'Full platform design & UX/UI development with premium dark theme',
        'Subscription-based access management system',
        'AI tools marketplace structure with categorization',
        'AI Academy & educational content architecture',
        'Scalable platform infrastructure for growth',
        'Ongoing technical management and optimization',
      ],
      resultPoints: [
        'Custom AI tools marketplace launched',
        'Subscription & access management system live',
        'Premium dark UI with conversion-focused UX',
        'Educational AI Academy structure deployed',
        'Scalable architecture supporting continuous growth',
        'Platform actively managed & optimized by Groppi',
      ],
      resultDisclaimer: 'This is a live and ongoing project. Platform design & management by Groppi.',
      deliverables: ['website-design', 'website-dev', 'copywriting', 'seo-optimization'],
    },
    externalUrl: 'https://aideals.be/',
    featured: true,
    createdAt: new Date('2025-06-01'),
  },
  {
    id: '21',
    clientName: 'PilotsCareer',
    slug: 'pilotscareer',
    industry: 'startup',
    services: ['website', 'branding', 'content'],
    coverMedia: {
      id: 'cover-21',
      type: 'image',
      url: '/portfolio/pilotscareer/cover.jpg',
      alt: 'PilotsCareer – Aviation recruitment platform',
    },
    galleryMedia: [
      { id: 'gallery-21-1', type: 'image', url: '/portfolio/pilotscareer/desktop-mockup.webp', alt: 'PilotsCareer – Desktop website mockup' },
      { id: 'gallery-21-2', type: 'image', url: '/portfolio/pilotscareer/mobile-mockup.webp', alt: 'PilotsCareer – Mobile pilot profile', aspectRatio: '9:16' },
      { id: 'gallery-21-3', type: 'image', url: '/portfolio/pilotscareer/cockpit.webp', alt: 'PilotsCareer – Professional pilot in cockpit' },
      { id: 'gallery-21-4', type: 'image', url: '/portfolio/pilotscareer/dashboard.webp', alt: 'PilotsCareer – Recruitment analytics dashboard' },
      { id: 'gallery-21-5', type: 'image', url: '/portfolio/pilotscareer/brand-mood.webp', alt: 'PilotsCareer – Brand mood and platform pages' },
    ],
    shortResultLine: 'International aviation recruitment platform – live',
    popupContent: {
      challenge: 'PilotsCareer needed a professional, scalable recruitment platform connecting airline pilots with global career opportunities. The platform required advanced filtering, pilot profiles, and a modern UI that reflects the professionalism of the aviation industry.',
      approachPoints: [
        'Full platform design & development from scratch',
        'Premium dark UI with aviation-inspired aesthetics',
        'Advanced job search and filtering system',
        'Pilot profile and application management',
        'Responsive design for desktop and mobile',
        'Ongoing platform optimization and feature development',
      ],
      resultPoints: [
        'Professional aviation recruitment platform launched',
        'Scalable architecture supporting international growth',
        'Clean, intuitive UX for pilots and recruiters',
        'Advanced search and filtering capabilities',
        'Mobile-optimized pilot profile experience',
        'Platform actively managed & developed by Groppi',
      ],
      resultDisclaimer: 'This is a live and ongoing project. Platform design & management by Groppi.',
      deliverables: ['website-design', 'website-dev', 'copywriting', 'seo-optimization'],
    },
    externalUrl: 'https://pilotscareer.com/',
    featured: true,
    createdAt: new Date('2025-05-15'),
  },
  {
    id: '22',
    clientName: 'Casa Mavi',
    slug: 'casa-mavi',
    industry: 'restaurant',
    services: ['website', 'content', 'social'],
    coverMedia: {
      id: 'cover-22',
      type: 'image',
      url: '/portfolio/casa-mavi/food-hero.webp',
      alt: 'Casa Mavi - Italian Neapolitan restaurant in Fuengirola',
    },
    galleryMedia: [
      { id: 'gallery-22-1', type: 'image', url: '/portfolio/casa-mavi/desktop-mockup.webp', alt: 'Casa Mavi - Desktop website mockup' },
      { id: 'gallery-22-2', type: 'image', url: '/portfolio/casa-mavi/mobile-mockup.webp', alt: 'Casa Mavi - Mobile website mockup', aspectRatio: '9:16' as const },
      { id: 'gallery-22-3', type: 'image', url: '/portfolio/casa-mavi/food-hero.webp', alt: 'Casa Mavi - Neapolitan pizza hero' },
      { id: 'gallery-22-4', type: 'image', url: '/portfolio/casa-mavi/interior.webp', alt: 'Casa Mavi - Restaurant interior' },
      { id: 'gallery-22-5', type: 'image', url: '/portfolio/casa-mavi/social-mockup.webp', alt: 'Casa Mavi - Social media content' },
      { id: 'gallery-22-6', type: 'image', url: '/portfolio/casa-mavi/brand-mood.webp', alt: 'Casa Mavi - Brand mood board' },
    ],
    shortResultLine: 'Complete digital presence for a Mediterranean gem in Spain.',
    popupContent: {
      challenge: 'Casa Mavi, een Italiaans-Napolitaans restaurant in Fuengirola (Spanje), wilde een professionele digitale aanwezigheid opbouwen om zowel lokale gasten als toeristen aan te trekken langs de Costa del Sol.',
      approachPoints: [
        'Op maat gemaakte website met online reserveringssysteem',
        'Digitale menukaart en visuele content creatie',
        'Opbouw van professionele digitale aanwezigheid',
        'Social media strategie gericht op lokaal en toeristisch publiek',
      ],
      resultPoints: [
        'Professionele website met geïntegreerd reserveringssysteem',
        'Sterke visuele identiteit die de mediterrane sfeer weerspiegelt',
        'Verbeterde online vindbaarheid voor toeristen en locals',
        'Doorlopend digitaal beheer en optimalisatie',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['website-design', 'website-dev', 'content-calendar', 'photo-shoot'],
    },
    externalUrl: 'https://www.casamavi.es',
    featured: true,
    createdAt: new Date('2025-06-01'),
  },
  {
    id: '23',
    clientName: 'ArTe y CoCiNa',
    slug: 'arte-y-cocina',
    industry: 'restaurant',
    services: ['website', 'branding', 'content'],
    coverMedia: {
      id: 'cover-23',
      type: 'image',
      url: '/portfolio/arte-y-cocina/food-hero.webp',
      alt: 'ArTe y CoCiNa - Artistic fine-dining restaurant in Spain',
    },
    galleryMedia: [
      { id: 'gallery-23-1', type: 'image', url: '/portfolio/arte-y-cocina/desktop-mockup.webp', alt: 'ArTe y CoCiNa - Desktop website mockup' },
      { id: 'gallery-23-2', type: 'image', url: '/portfolio/arte-y-cocina/mobile-mockup.webp', alt: 'ArTe y CoCiNa - Mobile website mockup', aspectRatio: '9:16' as const },
      { id: 'gallery-23-3', type: 'image', url: '/portfolio/arte-y-cocina/food-hero.webp', alt: 'ArTe y CoCiNa - Fine dining dish' },
      { id: 'gallery-23-4', type: 'image', url: '/portfolio/arte-y-cocina/interior.webp', alt: 'ArTe y CoCiNa - Restaurant interior' },
      { id: 'gallery-23-5', type: 'image', url: '/portfolio/arte-y-cocina/social-mockup.webp', alt: 'ArTe y CoCiNa - Social media content' },
      { id: 'gallery-23-6', type: 'image', url: '/portfolio/arte-y-cocina/brand-mood.webp', alt: 'ArTe y CoCiNa - Brand mood board' },
    ],
    shortResultLine: 'Premium digital identity for an artistic fine-dining experience.',
    popupContent: {
      challenge: 'ArTe y CoCiNa, een artistiek fine-dining restaurant in Spanje, wilde een digitale aanwezigheid die de unieke fusie van kunst en gastronomie weerspiegelt en een internationaal publiek aanspreekt.',
      approachPoints: [
        'Op maat gemaakte website met luxueuze visuele identiteit',
        'Professionele food- en interieur-contentcreatie',
        'Opbouw van sterke digitale aanwezigheid',
        'Visuele branding die kunst en culinaire excellentie combineert',
      ],
      resultPoints: [
        'Elegante website die de fine-dining ervaring online weerspiegelt',
        'Sterke visuele identiteit met artistieke uitstraling',
        'Verbeterde online vindbaarheid en merkbeleving',
        'Doorlopend digitaal beheer en optimalisatie',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['website-design', 'website-dev', 'brand-identity', 'content-calendar'],
    },
    externalUrl: 'https://www.arteycocinarestaurant.com',
    featured: true,
    createdAt: new Date('2025-06-10'),
  },
  {
    id: '24',
    clientName: 'Verona Los Boliches',
    slug: 'verona-los-boliches',
    industry: 'restaurant',
    services: ['website', 'content', 'social'],
    coverMedia: {
      id: 'cover-24',
      type: 'image',
      url: '/portfolio/verona/food-hero.webp',
      alt: 'Verona Los Boliches - Fusion restaurant in Spain',
    },
    galleryMedia: [
      { id: 'gallery-24-1', type: 'image', url: '/portfolio/verona/desktop-mockup.webp', alt: 'Verona Los Boliches - Desktop website mockup' },
      { id: 'gallery-24-2', type: 'image', url: '/portfolio/verona/mobile-mockup.webp', alt: 'Verona Los Boliches - Mobile website mockup', aspectRatio: '9:16' as const },
      { id: 'gallery-24-3', type: 'image', url: '/portfolio/verona/food-hero.webp', alt: 'Verona Los Boliches - Fusion cuisine' },
      { id: 'gallery-24-4', type: 'image', url: '/portfolio/verona/interior.webp', alt: 'Verona Los Boliches - Restaurant interior' },
      { id: 'gallery-24-5', type: 'image', url: '/portfolio/verona/social-mockup.webp', alt: 'Verona Los Boliches - Social media content' },
      { id: 'gallery-24-6', type: 'image', url: '/portfolio/verona/brand-mood.webp', alt: 'Verona Los Boliches - Brand mood board' },
    ],
    shortResultLine: 'Complete online presence for a vibrant fusion restaurant.',
    popupContent: {
      challenge: 'Verona Los Boliches, een uniek Italiaans-Indiaas-Mexicaans fusionrestaurant in Spanje, had behoefte aan een professionele digitale aanwezigheid die de multiculturele keuken en levendige sfeer van de Costa del Sol weerspiegelt.',
      approachPoints: [
        'Op maat gemaakte website met visuele identiteit',
        'Professionele food- en sfeercontentcreatie',
        'Opbouw van online aanwezigheid en vindbaarheid',
        'Visuele content gericht op de diverse keukenstijlen',
      ],
      resultPoints: [
        'Professionele website die de fusionkeuken sterk presenteert',
        'Verbeterde online zichtbaarheid voor toeristen en locals',
        'Sterke visuele content over alle digitale kanalen',
        'Doorlopend digitaal beheer en optimalisatie',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['website-design', 'website-dev', 'content-calendar', 'social-content'],
    },
    externalUrl: 'https://www.restauranteveronalosboliches.com',
    featured: true,
    createdAt: new Date('2025-06-15'),
  },
  {
    id: '25',
    clientName: 'Happy Flavors Indian Restaurant',
    slug: 'happy-flavors',
    industry: 'restaurant',
    services: ['website', 'content', 'social'],
    coverMedia: {
      id: 'cover-25',
      type: 'image',
      url: '/portfolio/happy-flavors/food-hero.webp',
      alt: 'Happy Flavors Indian Restaurant in Spain',
    },
    galleryMedia: [
      { id: 'gallery-25-1', type: 'image', url: '/portfolio/happy-flavors/desktop-mockup.webp', alt: 'Happy Flavors - Desktop website mockup' },
      { id: 'gallery-25-2', type: 'image', url: '/portfolio/happy-flavors/mobile-mockup.webp', alt: 'Happy Flavors - Mobile website mockup', aspectRatio: '9:16' as const },
      { id: 'gallery-25-3', type: 'image', url: '/portfolio/happy-flavors/food-hero.webp', alt: 'Happy Flavors - Indian cuisine' },
      { id: 'gallery-25-4', type: 'image', url: '/portfolio/happy-flavors/interior.webp', alt: 'Happy Flavors - Restaurant interior' },
      { id: 'gallery-25-5', type: 'image', url: '/portfolio/happy-flavors/social-mockup.webp', alt: 'Happy Flavors - Social media content' },
      { id: 'gallery-25-6', type: 'image', url: '/portfolio/happy-flavors/brand-mood.webp', alt: 'Happy Flavors - Brand mood board' },
    ],
    shortResultLine: 'Professional digital presence for authentic Indian cuisine in Spain.',
    popupContent: {
      challenge: 'Happy Flavors Indian Restaurant wilde een professionele online aanwezigheid opbouwen die de authentieke Indiase keuken en warme gastvrijheid weerspiegelt en zowel lokale gasten als toeristen aanspreekt.',
      approachPoints: [
        'Op maat gemaakte website met warme visuele identiteit',
        'Professionele food- en sfeercontentcreatie',
        'Opbouw van digitale aanwezigheid en vindbaarheid',
        'Visuele content die de rijke Indiase keuken in beeld brengt',
      ],
      resultPoints: [
        'Professionele website die de authentieke Indiase keuken presenteert',
        'Sterke visuele content over alle digitale kanalen',
        'Verbeterde online zichtbaarheid voor toeristen en locals',
        'Doorlopend digitaal beheer en optimalisatie',
      ],
      resultDisclaimer: 'Project actief beheerd door GROPPI.',
      deliverables: ['website-design', 'website-dev', 'content-calendar', 'social-content'],
    },
    externalUrl: 'https://www.happyflavorsindianrestaurant.com',
    featured: true,
    createdAt: new Date('2025-06-20'),
  },
  {
    id: '26',
    clientName: 'Guest Reservations',
    slug: 'guest-reservations',
    industry: 'hospitality',
    services: ['website', 'ecommerce', 'content'],
    coverMedia: {
      id: 'cover-26',
      type: 'image',
      url: '/portfolio/guest-reservations/hero.webp',
      alt: 'Guest Reservations - Global travel & hotel booking platform',
    },
    galleryMedia: [
      { id: 'gallery-26-1', type: 'image', url: '/portfolio/guest-reservations/desktop-mockup.webp', alt: 'Guest Reservations - Desktop platform' },
      { id: 'gallery-26-2', type: 'image', url: '/portfolio/guest-reservations/mobile-mockup.webp', alt: 'Guest Reservations - Mobile booking', aspectRatio: '9:16' as const },
      { id: 'gallery-26-3', type: 'image', url: '/portfolio/guest-reservations/dashboard.webp', alt: 'Guest Reservations - Analytics dashboard' },
      { id: 'gallery-26-4', type: 'image', url: '/portfolio/guest-reservations/multi-device.webp', alt: 'Guest Reservations - Multi-device experience' },
      { id: 'gallery-26-5', type: 'image', url: '/portfolio/guest-reservations/brand-mood.webp', alt: 'Guest Reservations - Brand & digital presence' },
      { id: 'gallery-26-6', type: 'image', url: '/portfolio/guest-reservations/hero.webp', alt: 'Guest Reservations - Platform overview' },
    ],
    shortResultLine: 'Ongoing platform management for a global hotel booking service.',
    popupContent: {
      challenge: 'Guest Reservations, een internationaal hotel- en reisboekingsplatform, had behoefte aan doorlopend platformbeheer, website-optimalisatie en technische ondersteuning om hun wereldwijde groei te ondersteunen.',
      approachPoints: [
        'Doorlopend platformbeheer en technische ondersteuning',
        'Website-optimalisatie voor betere prestaties en conversie',
        'Monitoring en proactief onderhoud van het boekingsplatform',
        'Strategische ondersteuning voor schaalbare groei',
      ],
      resultPoints: [
        'Verbeterde platformprestaties en gebruikservaring',
        'Hogere conversieratio op het boekingsplatform',
        'Stabiel en betrouwbaar platform voor wereldwijde gebruikers',
        'Doorlopende technische ondersteuning en optimalisatie',
      ],
      resultDisclaimer: 'Doorlopend project actief beheerd door GROPPI.',
      deliverables: ['website-dev', 'seo-optimization', 'copywriting', 'website-design'],
    },
    externalUrl: 'https://www.guestreservations.com/',
    featured: true,
    createdAt: new Date('2025-07-01'),
  },
  {
    id: '27',
    clientName: 'Eurostars Hotels',
    slug: 'eurostars-hotels',
    industry: 'hospitality',
    services: ['website', 'ecommerce', 'content'],
    coverMedia: {
      id: 'cover-27',
      type: 'image',
      url: '/portfolio/eurostars/hero.webp',
      alt: 'Eurostars Hotels - European hotel group & booking platform',
    },
    galleryMedia: [
      { id: 'gallery-27-1', type: 'image', url: '/portfolio/eurostars/desktop-mockup.webp', alt: 'Eurostars Hotels - Desktop platform' },
      { id: 'gallery-27-2', type: 'image', url: '/portfolio/eurostars/mobile-mockup.webp', alt: 'Eurostars Hotels - Mobile booking', aspectRatio: '9:16' as const },
      { id: 'gallery-27-3', type: 'image', url: '/portfolio/eurostars/exterior.webp', alt: 'Eurostars Hotels - Hotel exterior' },
      { id: 'gallery-27-4', type: 'image', url: '/portfolio/eurostars/multi-device.webp', alt: 'Eurostars Hotels - Multi-device experience' },
      { id: 'gallery-27-5', type: 'image', url: '/portfolio/eurostars/brand-mood.webp', alt: 'Eurostars Hotels - Brand identity' },
      { id: 'gallery-27-6', type: 'image', url: '/portfolio/eurostars/hero.webp', alt: 'Eurostars Hotels - Lobby & hospitality' },
    ],
    shortResultLine: 'Digital platform support & performance optimization for a European hotel group.',
    popupContent: {
      challenge: 'Eurostars Hotels, een Europese hotelgroep met een uitgebreid boekingsplatform, had behoefte aan doorlopende digitale ondersteuning, websitebeheer en prestatie-optimalisatie om hun online aanwezigheid te versterken.',
      approachPoints: [
        'Doorlopende digitale platformondersteuning en technisch beheer',
        'Websitebeheer en optimalisatie van het boekingsplatform',
        'Prestatie-optimalisatie voor snellere laadtijden en betere conversie',
        'Strategische ondersteuning voor Europese groei',
      ],
      resultPoints: [
        'Geoptimaliseerde websiteprestaties en gebruikservaring',
        'Verbeterde conversieratio op het boekingsplatform',
        'Stabiel en betrouwbaar digitaal platform voor Europese gasten',
        'Doorlopend technisch beheer en proactieve optimalisatie',
      ],
      resultDisclaimer: 'Doorlopend project actief beheerd door GROPPI.',
      deliverables: ['website-dev', 'seo-optimization', 'website-design', 'copywriting'],
    },
    externalUrl: 'https://www.eurostarshotels.co.uk/',
    featured: true,
    createdAt: new Date('2025-07-05'),
  },
];

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
