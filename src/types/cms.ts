export interface PageSection {
  id: string;
  page_slug: string;
  section_type: string;
  display_order: number;
  is_visible: boolean;
  settings: Record<string, unknown>;
}

export interface PageContent {
  id: string;
  section_id: string;
  content_key: string;
  content_en: string | null;
  content_ar: string | null;
  content_nl: string | null;
  content_fr: string | null;
  content_de: string | null;
  content_es: string | null;
  content_type: string;
  media_url: string | null;
}

export interface SectionType {
  type: string;
  label: string;
  icon: string;
}
