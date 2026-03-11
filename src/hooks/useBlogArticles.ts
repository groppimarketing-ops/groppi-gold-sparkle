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
  // keep static article i18n keys for backward compat
  titleKey?: string;
  excerptKey?: string;
  contentKey?: string;
}

const FALLBACK_LANGS = ['nl', 'en', 'ar'];

function getField(row: Record<string, unknown>, prefix: string, lang: string): string {
  const direct = row[`${prefix}_${lang}`];
  if (direct) return direct as string;
  for (const fb of FALLBACK_LANGS) {
    const val = row[`${prefix}_${fb}`];
    if (val) return val as string;
  }
  return '';
}

function estimateReadTime(content: string): string {
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length;
  return String(Math.max(1, Math.round(words / 200)));
}

export function useBlogArticles() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] ?? 'nl';

  const { data: dbArticles = [], isLoading } = useQuery({
    queryKey: ['blog-articles', lang],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) throw error;

      return (data ?? []).map((row): DynamicBlogArticle => {
        const r = row as unknown as Record<string, unknown>;
        const content = getField(r, 'content', lang);
        return {
          id: String(row.id),
          slug: String(row.slug),
          title: getField(r, 'title', lang) || String(row.slug),
          excerpt: getField(r, 'excerpt', lang),
          content,
          image: String(row.featured_image ?? ''),
          date: String(row.published_at ?? row.created_at),
          author: 'GROPPI Team',
          readTime: estimateReadTime(content),
          isDynamic: true,
        };
      });
    },
  });

  // Merge static articles, skipping slugs already in DB
  const dbSlugs = new Set(dbArticles.map((a) => a.slug));
  const staticMapped: DynamicBlogArticle[] = blogArticles
    .filter((a) => !dbSlugs.has(a.slug))
    .map((a) => ({
      id: a.id,
      slug: a.slug,
      title: '',
      excerpt: '',
      content: '',
      image: a.image,
      date: a.date,
      author: a.author,
      readTime: a.readTime,
      isDynamic: false,
      titleKey: a.titleKey,
      excerptKey: a.excerptKey,
      contentKey: a.contentKey,
    }));

  return { articles: [...dbArticles, ...staticMapped], isLoading };
}

export function useArticleBySlug(slug: string | undefined) {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split('-')[0] ?? 'nl';

  return useQuery({
    queryKey: ['article', slug, lang],
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug!)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      const r = data as unknown as Record<string, unknown>;
      const content = getField(r, 'content', lang);
      return {
        id: String(data.id),
        slug: String(data.slug),
        title: getField(r, 'title', lang) || String(data.slug),
        excerpt: getField(r, 'excerpt', lang),
        content,
        image: String(data.featured_image ?? ''),
        date: String(data.published_at ?? data.created_at),
        updatedAt: String(data.updated_at),
        author: 'GROPPI Team',
        readTime: estimateReadTime(content),
        isDynamic: true,
      };
    },
  });
}
