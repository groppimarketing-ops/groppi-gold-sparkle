import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { blogArticles } from '@/data/blogArticles';

export interface DynamicBlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  isDynamic: boolean;
}

// Supported lang columns in articles table
const LANG_COLS = ['nl', 'en', 'fr', 'de', 'es', 'it', 'pt', 'pl', 'ru', 'tr', 'bn', 'hi', 'ur', 'zh', 'ar'] as const;
type LangCode = typeof LANG_COLS[number];

function getField<T = string>(
  row: Record<string, unknown>,
  prefix: string,
  lang: string,
  fallbacks: string[] = ['nl', 'en', 'ar']
): T | undefined {
  // Try exact lang
  const direct = row[`${prefix}_${lang}`];
  if (direct) return direct as T;
  // Try fallbacks
  for (const fb of fallbacks) {
    const val = row[`${prefix}_${fb}`];
    if (val) return val as T;
  }
  return undefined;
}

/** Estimate read time from HTML/plain content (~200 wpm) */
function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return String(Math.max(1, Math.round(words / 200)));
}

export function useBlogArticles() {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split('-')[0] ?? 'nl') as LangCode;

  const { data: dbArticles = [], isLoading } = useQuery({
    queryKey: ['blog-articles', lang],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(
          `id, slug, featured_image, published_at, created_at,
           ${LANG_COLS.map((l) => `title_${l}`).join(', ')},
           ${LANG_COLS.map((l) => `excerpt_${l}`).join(', ')},
           ${LANG_COLS.map((l) => `content_${l}`).join(', ')}`
        )
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;

      return (data ?? []).map((row): DynamicBlogArticle => {
        const r = row as Record<string, unknown>;
        const content = getField<string>(r, 'content', lang) ?? '';
        return {
          id: row.id,
          slug: row.slug,
          title: getField<string>(r, 'title', lang) ?? row.slug,
          excerpt: getField<string>(r, 'excerpt', lang) ?? '',
          content,
          image: (row.featured_image as string) ?? '',
          date: (row.published_at as string) ?? (row.created_at as string),
          author: 'GROPPI Team',
          readTime: estimateReadTime(content),
          isDynamic: true,
        };
      });
    },
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  // Convert static articles to same shape (deduplicate by slug)
  const dbSlugs = new Set(dbArticles.map((a) => a.slug));
  const staticMapped: DynamicBlogArticle[] = blogArticles
    .filter((a) => !dbSlugs.has(a.slug))
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      title: '', // resolved by i18n key at render time — use titleKey
      excerpt: '',
      content: '',
      image: a.image,
      date: a.date,
      author: a.author,
      readTime: a.readTime,
      isDynamic: false,
      // carry over i18n keys for static articles
      ...a,
    }));

  const allArticles = [...dbArticles, ...staticMapped];

  return { articles: allArticles, isLoading };
}

/** Fetch a single article by slug — tries DB first, falls back to static */
export function useArticleBySlug(slug: string | undefined) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split('-')[0] ?? 'nl') as LangCode;

  return useQuery({
    queryKey: ['article', slug, lang],
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select(
          `id, slug, featured_image, published_at, created_at, updated_at,
           ${LANG_COLS.map((l) => `title_${l}`).join(', ')},
           ${LANG_COLS.map((l) => `excerpt_${l}`).join(', ')},
           ${LANG_COLS.map((l) => `content_${l}`).join(', ')}`
        )
        .eq('slug', slug!)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      const r = data as Record<string, unknown>;
      const content = getField<string>(r, 'content', lang) ?? '';
      return {
        id: data.id as string,
        slug: data.slug as string,
        title: getField<string>(r, 'title', lang) ?? (data.slug as string),
        excerpt: getField<string>(r, 'excerpt', lang) ?? '',
        content,
        image: (data.featured_image as string) ?? '',
        date: (data.published_at as string) ?? (data.created_at as string),
        updatedAt: data.updated_at as string,
        author: 'GROPPI Team',
        readTime: estimateReadTime(content),
        isDynamic: true,
      };
    },
  });
}
