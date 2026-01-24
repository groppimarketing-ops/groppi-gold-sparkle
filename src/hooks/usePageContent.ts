import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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

export const usePageContent = ({ pageSlug, enabled = true }: UsePageContentOptions): UsePageContentReturn => {
  const { i18n } = useTranslation();
  const [sections, setSections] = useState<PageSection[]>([]);
  const [contentMap, setContentMap] = useState<Map<string, PageContent>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Get the current language content field name
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

  useEffect(() => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    const fetchPageContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch visible sections for the page
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

        setSections(typedSections);

        // Fetch content for all sections
        if (typedSections.length > 0) {
          const sectionIds = typedSections.map(s => s.id);
          const { data: contentData, error: contentError } = await supabase
            .from('page_content')
            .select('*')
            .in('section_id', sectionIds);

          if (contentError) throw contentError;

          // Build a map for quick lookup: sectionId_contentKey -> content
          const newContentMap = new Map<string, PageContent>();
          (contentData || []).forEach(content => {
            const key = `${content.section_id}_${content.content_key}`;
            newContentMap.set(key, content as PageContent);
          });
          setContentMap(newContentMap);
        }
      } catch (err) {
        console.error('Error fetching page content:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch page content'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageContent();
  }, [pageSlug, enabled]);

  // Get localized content with fallback
  const getContent = (sectionId: string, contentKey: string, fallback = ''): string => {
    const key = `${sectionId}_${contentKey}`;
    const content = contentMap.get(key);
    
    if (!content) return fallback;

    const langField = getLanguageField();
    const localizedValue = content[langField] as string | null;
    
    // Fallback chain: current language -> English -> provided fallback
    return localizedValue || content.content_en || fallback;
  };

  // Get media URL with fallback
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
    error,
  };
};

export default usePageContent;
