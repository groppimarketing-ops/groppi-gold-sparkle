import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Languages, Image as ImageIcon, Type, Link as LinkIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GlassCard from '@/components/ui/GlassCard';

interface PageSection {
  id: string;
  page_slug: string;
  section_type: string;
  display_order: number;
  is_visible: boolean;
  settings: Record<string, unknown>;
}

interface PageContent {
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

interface SectionEditorDialogProps {
  section: PageSection;
  onClose: () => void;
  onSave: (section: PageSection) => void;
}

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' },
];

const CONTENT_KEYS = {
  hero: ['title', 'subtitle', 'description', 'button_text', 'button_link', 'image'],
  features: ['title', 'subtitle', 'feature_1_title', 'feature_1_desc', 'feature_2_title', 'feature_2_desc', 'feature_3_title', 'feature_3_desc'],
  stats: ['title', 'stat_1_value', 'stat_1_label', 'stat_2_value', 'stat_2_label', 'stat_3_value', 'stat_3_label', 'stat_4_value', 'stat_4_label'],
  cta: ['title', 'description', 'button_text', 'button_link'],
  content: ['title', 'subtitle', 'content', 'image'],
  testimonials: ['title', 'subtitle'],
  faq: ['title', 'subtitle'],
  contact: ['title', 'subtitle', 'description'],
  gallery: ['title', 'subtitle'],
  team: ['title', 'subtitle'],
};

const SectionEditorDialog = ({ section, onClose, onSave }: SectionEditorDialogProps) => {
  const [contents, setContents] = useState<PageContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('en');
  const { toast } = useToast();

  const contentKeys = CONTENT_KEYS[section.section_type as keyof typeof CONTENT_KEYS] || ['title', 'description'];

  useEffect(() => {
    fetchContent();
  }, [section.id]);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .eq('section_id', section.id);

      if (error) throw error;

      // Create missing content entries
      const existingKeys = new Set(data?.map(c => c.content_key) || []);
      const missingKeys = contentKeys.filter(key => !existingKeys.has(key));

      if (missingKeys.length > 0) {
        const newContents = missingKeys.map(key => ({
          section_id: section.id,
          content_key: key,
          content_type: key.includes('image') ? 'image' : key.includes('link') ? 'link' : 'text',
        }));

        const { data: insertedData, error: insertError } = await supabase
          .from('page_content')
          .insert(newContents)
          .select();

        if (insertError) throw insertError;
        setContents([...(data || []), ...(insertedData || [])]);
      } else {
        setContents(data || []);
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: 'Error',
        description: 'Failed to load section content',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (contentKey: string, langCode: string, value: string) => {
    setContents(contents.map(c => {
      if (c.content_key === contentKey) {
        return { ...c, [`content_${langCode}`]: value };
      }
      return c;
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updates = contents.map(c => ({
        id: c.id,
        section_id: c.section_id,
        content_key: c.content_key,
        content_en: c.content_en,
        content_ar: c.content_ar,
        content_nl: c.content_nl,
        content_fr: c.content_fr,
        content_de: c.content_de,
        content_es: c.content_es,
        content_type: c.content_type,
        media_url: c.media_url,
      }));

      const { error } = await supabase
        .from('page_content')
        .upsert(updates);

      if (error) throw error;

      toast({
        title: 'Saved!',
        description: 'Section content has been updated',
      });
      onSave(section);
    } catch (error) {
      console.error('Error saving content:', error);
      toast({
        title: 'Error',
        description: 'Failed to save changes',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getContentValue = (contentKey: string, langCode: string): string => {
    const content = contents.find(c => c.content_key === contentKey);
    return (content?.[`content_${langCode}` as keyof PageContent] as string) || '';
  };

  const getContentIcon = (key: string) => {
    if (key.includes('image')) return <ImageIcon className="w-4 h-4" />;
    if (key.includes('link')) return <LinkIcon className="w-4 h-4" />;
    return <Type className="w-4 h-4" />;
  };

  const formatLabel = (key: string) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />

      {/* Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <GlassCard className="p-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-primary/10">
            <div>
              <h2 className="text-xl font-bold">Edit Section Content</h2>
              <p className="text-sm text-muted-foreground">
                {formatLabel(section.section_type)} - {section.page_slug} page
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleSave} disabled={isSaving} className="luxury-button">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6 bg-background/50">
                  <Languages className="w-4 h-4 mr-2 text-muted-foreground" />
                  {LANGUAGES.map((lang) => (
                    <TabsTrigger
                      key={lang.code}
                      value={lang.code}
                      className="data-[state=active]:bg-primary/20"
                    >
                      {lang.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {LANGUAGES.map((lang) => (
                  <TabsContent key={lang.code} value={lang.code} className="space-y-4">
                    {contentKeys.map((key) => (
                      <div key={key} className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium">
                          {getContentIcon(key)}
                          {formatLabel(key)}
                        </label>
                        {key.includes('desc') || key === 'content' ? (
                          <Textarea
                            value={getContentValue(key, lang.code)}
                            onChange={(e) => handleContentChange(key, lang.code, e.target.value)}
                            placeholder={`Enter ${formatLabel(key).toLowerCase()}...`}
                            className="bg-background/50 border-primary/20 min-h-[100px]"
                            dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
                          />
                        ) : (
                          <Input
                            value={getContentValue(key, lang.code)}
                            onChange={(e) => handleContentChange(key, lang.code, e.target.value)}
                            placeholder={`Enter ${formatLabel(key).toLowerCase()}...`}
                            className="bg-background/50 border-primary/20"
                            dir={lang.code === 'ar' ? 'rtl' : 'ltr'}
                          />
                        )}
                      </div>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default SectionEditorDialog;
