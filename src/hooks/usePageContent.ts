import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { PageSection, PageContent } from '@/types/cms';

interface UsePageContentOptions {
  pageSlug: string;
  enabled?: boolean;
}

interface UsePageContentReturn {
  sections: PageSection[];
  getContent: (sectionId: string, contentKey: string, fallback?: string) => string;
  getMediaUrl: (sectionId: string, contentKey: string, fallback?: string) => string | null;
  isLoading: boolean;
  error: Error | null;
}

const fetchPageData = async (pageSlug: string) => {
  const { data: sectionsData, error: sectionsError } = await supabase
    .from('page_sections')
    .select('*')
    .eq('page_slug', pageSlug)
    .eq('is_visible', true)
    .order('display_order', { ascending: true });

  if (sectionsError) throw sectionsError;

  const typedSections: PageSection[] = (sectionsData || []).map(section => ({
    ...section,
    settings: (section.settings as Record<string, unknown>) || {}
  }));

  let contentMap = new Map<string, PageContent>();

  if (typedSections.length > 0) {
    const sectionIds = typedSections.map(s => s.id);
    const { data: contentData, error: contentError } = await supabase
      .from('page_content')
      .select('*')
      .in('section_id', sectionIds);

    if (contentError) throw contentError;

    (contentData || []).forEach(content => {
      const key = `${content.section_id}_${content.content_key}`;
      contentMap.set(key, content as PageContent);
    });
  }

  return { sections: typedSections, contentMap };
};

export const usePageContent = ({ pageSlug, enabled = true }: UsePageContentOptions): UsePageContentReturn => {
  const { i18n } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ['page-content', pageSlug],
    queryFn: () => fetchPageData(pageSlug),
    enabled,
  });

  const sections = data?.sections ?? [];
  const contentMap = data?.contentMap ?? new Map<string, PageContent>();

  const getLanguageField = (): keyof PageContent => {
    const langMap: Record<string, keyof PageContent> = {
      en: 'content_en',
      ar: 'content_ar',
      nl: 'content_nl',
      fr: 'content_fr',
      de: 'content_de',
      es: 'content_es',
    };
    return langMap[i18n.language] || 'content_en';
  };

  const getContent = (sectionId: string, contentKey: string, fallback = ''): string => {
    const key = `${sectionId}_${contentKey}`;
    const content = contentMap.get(key);
    if (!content) return fallback;
    const langField = getLanguageField();
    const localizedValue = content[langField] as string | null;
    return localizedValue || content.content_en || fallback;
  };

  const getMediaUrl = (sectionId: string, contentKey: string, fallback: string | null = null): string | null => {
    const key = `${sectionId}_${contentKey}`;
    const content = contentMap.get(key);
    if (!content) return fallback;
    return content.media_url || fallback;
  };

  return {
    sections,
    getContent,
    getMediaUrl,
    isLoading,
    error: error as Error | null,
  };
};

export default usePageContent;
