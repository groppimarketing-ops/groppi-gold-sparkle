-- Create page_sections table for storing page layouts
CREATE TABLE public.page_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT NOT NULL,
    section_type TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_visible BOOLEAN NOT NULL DEFAULT true,
    settings JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create index for faster page queries
CREATE INDEX idx_page_sections_page_slug ON public.page_sections(page_slug);
CREATE INDEX idx_page_sections_display_order ON public.page_sections(page_slug, display_order);

-- Create page_content table for multilingual content
CREATE TABLE public.page_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_id UUID REFERENCES public.page_sections(id) ON DELETE CASCADE NOT NULL,
    content_key TEXT NOT NULL,
    content_en TEXT,
    content_ar TEXT,
    content_nl TEXT,
    content_fr TEXT,
    content_de TEXT,
    content_es TEXT,
    content_it TEXT,
    content_pt TEXT,
    content_pl TEXT,
    content_ru TEXT,
    content_tr TEXT,
    content_bn TEXT,
    content_hi TEXT,
    content_ur TEXT,
    content_zh TEXT,
    content_type TEXT NOT NULL DEFAULT 'text',
    media_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(section_id, content_key)
);

-- Create index for faster content queries
CREATE INDEX idx_page_content_section_id ON public.page_content(section_id);

-- Enable RLS on both tables
ALTER TABLE public.page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- RLS policies for page_sections
CREATE POLICY "Anyone can view visible sections"
ON public.page_sections
FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admins can view all sections"
ON public.page_sections
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage sections"
ON public.page_sections
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS policies for page_content
CREATE POLICY "Anyone can view content"
ON public.page_content
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage content"
ON public.page_content
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Add triggers for updated_at
CREATE TRIGGER update_page_sections_updated_at
BEFORE UPDATE ON public.page_sections
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
BEFORE UPDATE ON public.page_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for media
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for media bucket
CREATE POLICY "Anyone can view media files"
ON storage.objects
FOR SELECT
USING (bucket_id = 'media');

CREATE POLICY "Admins can upload media"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update media"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete media"
ON storage.objects
FOR DELETE
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));