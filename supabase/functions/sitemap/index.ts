import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const SITE = 'https://groppi.be';
const LANGS = ['en','fr','de','ar','es','it','pt','pl','ru','tr','bn','hi','ur','zh'];
const TODAY = new Date().toISOString().split('T')[0];

// Static articles (slugs) — these are always included regardless of DB
const STATIC_BLOG_SLUGS = [
  'website-strongest-sales-tool-2025',
  'social-media-management-what-businesses-need',
  'seo-explained-simply',
  'paid-advertising-without-waste',
  'online-reputation-why-reviews-matter',
];

/** Generate <url> block for every language variant of a path */
function urlBlock(path: string, lastmod: string, changefreq: string, priority: string): string {
  const base = `  <url><loc>${SITE}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
  const langVariants = LANGS.map(
    (l) => `  <url><loc>${SITE}/${l}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  );
  return [base, ...langVariants].join('\n');
}

/** Static routes (same as public/sitemap.xml but generated programmatically) */
function buildStaticUrls(): string {
  const routes: Array<[string, string, string, string]> = [
    // [path, lastmod, changefreq, priority]
    ['/', '2026-02-13', 'weekly', '1.0'],
    ['/about', '2026-02-13', 'monthly', '0.8'],
    ['/services', '2026-02-13', 'weekly', '0.9'],
    ['/blog', TODAY, 'daily', '0.9'],
    ['/contact', '2026-02-13', 'monthly', '0.7'],
    ['/careers', '2026-02-13', 'monthly', '0.6'],
    ['/portfolio', '2026-02-13', 'monthly', '0.7'],
    // Services
    ['/services/social-media-management', '2026-02-13', 'monthly', '0.8'],
    ['/services/advertising-management', '2026-02-13', 'monthly', '0.8'],
    ['/services/visual-content-video', '2026-02-13', 'monthly', '0.8'],
    ['/services/seo', '2026-02-13', 'monthly', '0.8'],
    ['/services/business-website', '2026-02-13', 'monthly', '0.8'],
    ['/services/one-page-website', '2026-02-13', 'monthly', '0.7'],
    ['/services/ecommerce-website', '2026-02-13', 'monthly', '0.8'],
    ['/services/branding', '2026-02-13', 'monthly', '0.7'],
    ['/services/mobile-app-development', '2026-02-13', 'monthly', '0.7'],
    ['/services/reputation-management', '2026-02-13', 'monthly', '0.7'],
    ['/services/data-sync', '2026-02-13', 'monthly', '0.6'],
  ];

  return routes.map(([p, l, c, pr]) => urlBlock(p, l, c, pr)).join('\n');
}

/** Static blog article URLs */
function buildStaticBlogUrls(): string {
  return STATIC_BLOG_SLUGS
    .map((slug) => urlBlock(`/blog/${slug}`, '2026-02-13', 'monthly', '0.7'))
    .join('\n');
}

/** Dynamic blog article URLs from DB */
function buildDynamicBlogUrls(
  articles: Array<{ slug: string; updated_at: string; published_at: string | null }>
): string {
  return articles
    .map(({ slug, updated_at, published_at }) => {
      const lastmod = (published_at ?? updated_at).split('T')[0];
      return urlBlock(`/blog/${slug}`, lastmod, 'weekly', '0.8');
    })
    .join('\n');
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    );

    // Fetch published articles — only slug, published_at, updated_at needed
    const { data: articles, error } = await supabase
      .from('articles')
      .select('slug, published_at, updated_at')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
    }

    // Filter out DB articles that duplicate the static slugs
    const dbArticles = (articles ?? []).filter(
      (a) => !STATIC_BLOG_SLUGS.includes(a.slug)
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- === STATIC PAGES === -->
${buildStaticUrls()}

  <!-- === BLOG INDEX === -->

  <!-- === STATIC BLOG ARTICLES === -->
${buildStaticBlogUrls()}

  <!-- === DYNAMIC BLOG ARTICLES (from database) === -->
${dbArticles.length > 0 ? buildDynamicBlogUrls(dbArticles) : '  <!-- No dynamic articles yet -->'}
</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        // Cache for 1 hour — Google re-fetches periodically anyway
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (err) {
    console.error('Sitemap generation error:', err);
    return new Response('Error generating sitemap', {
      status: 500,
      headers: corsHeaders,
    });
  }
});
