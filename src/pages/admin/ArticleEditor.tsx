import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Eye, Image as ImageIcon, X, Check, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface MediaFile {
  id: string;
  title: string;
  file_url: string;
  file_type: string;
}

interface ArticleData {
  slug: string;
  title_en: string;
  title_ar: string;
  title_fr: string;
  title_de: string;
  title_es: string;
  title_nl: string;
  content_en: string;
  content_ar: string;
  content_fr: string;
  content_de: string;
  content_es: string;
  content_nl: string;
  excerpt_en: string;
  excerpt_ar: string;
  featured_image: string;
  published: boolean;
}

const defaultArticle: ArticleData = {
  slug: '',
  title_en: '',
  title_ar: '',
  title_fr: '',
  title_de: '',
  title_es: '',
  title_nl: '',
  content_en: '',
  content_ar: '',
  content_fr: '',
  content_de: '',
  content_es: '',
  content_nl: '',
  excerpt_en: '',
  excerpt_ar: '',
  featured_image: '',
  published: false,
};

const languages = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'nl', name: 'Nederlands', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
];

const ArticleEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isNew = !id || id === 'new';

  const [article, setArticle] = useState<ArticleData>(defaultArticle);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('en');
  const [showMediaPicker, setShowMediaPicker] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      fetchArticle(id);
    }
  }, [id, isNew]);

  const fetchArticle = async (articleId: string) => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('id', articleId)
        .single();

      if (error) throw error;

      setArticle({
        slug: data.slug || '',
        title_en: data.title_en || '',
        title_ar: data.title_ar || '',
        title_fr: data.title_fr || '',
        title_de: data.title_de || '',
        title_es: data.title_es || '',
        title_nl: data.title_nl || '',
        content_en: data.content_en || '',
        content_ar: data.content_ar || '',
        content_fr: data.content_fr || '',
        content_de: data.content_de || '',
        content_es: data.content_es || '',
        content_nl: data.content_nl || '',
        excerpt_en: data.excerpt_en || '',
        excerpt_ar: data.excerpt_ar || '',
        featured_image: data.featured_image || '',
        published: data.published || false,
      });
    } catch (error) {
      console.error('Error fetching article:', error);
      toast({
        title: 'Error',
        description: 'Failed to load article',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMedia = async () => {
    setLoadingMedia(true);
    try {
      const { data, error } = await supabase
        .from('media')
        .select('id, title, file_url, file_type')
        .ilike('file_type', 'image%')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMediaFiles(data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleOpenMediaPicker = () => {
    setShowMediaPicker(true);
    fetchMedia();
  };

  const handleSelectMedia = (url: string) => {
    setArticle(prev => ({ ...prev, featured_image: url }));
    setShowMediaPicker(false);
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (lang: string, value: string) => {
    setArticle(prev => ({
      ...prev,
      [`title_${lang}`]: value,
      ...(lang === 'en' && !prev.slug ? { slug: generateSlug(value) } : {}),
    }));
  };

  const handleSave = async (publish = false) => {
    if (!article.title_en || !article.title_ar) {
      toast({
        title: 'Missing Required Fields',
        description: 'English and Arabic titles are required',
        variant: 'destructive',
      });
      return;
    }

    if (!article.content_en || !article.content_ar) {
      toast({
        title: 'Missing Required Fields',
        description: 'English and Arabic content are required',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);

    try {
      const articleData = {
        ...article,
        published: publish ? true : article.published,
        published_at: publish ? new Date().toISOString() : null,
        slug: article.slug || generateSlug(article.title_en),
      };

      if (isNew) {
        const { error } = await supabase
          .from('articles')
          .insert(articleData);

        if (error) throw error;

        toast({
          title: 'Success',
          description: publish ? 'Article published!' : 'Article saved as draft',
        });
        navigate('/admin/articles');
      } else {
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Article updated successfully',
        });
      }
    } catch (error) {
      console.error('Error saving article:', error);
      toast({
        title: 'Error',
        description: 'Failed to save article',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin/articles')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold gold-gradient-text">
                {isNew ? 'New Article' : 'Edit Article'}
              </h1>
              <p className="text-muted-foreground text-sm">
                {isNew ? 'Create a new blog post' : 'Update your article'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => handleSave(false)}
              disabled={isSaving}
            >
              <Save className="w-4 h-4 mr-2" />
              Save Draft
            </Button>
            <Button
              className="luxury-button"
              onClick={() => handleSave(true)}
              disabled={isSaving}
            >
              <Eye className="w-4 h-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language Tabs */}
            <GlassCard className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-6 mb-6">
                  {languages.map(lang => (
                    <TabsTrigger key={lang.code} value={lang.code}>
                      {lang.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {languages.map(lang => (
                  <TabsContent key={lang.code} value={lang.code} className="space-y-4">
                    <div>
                      <Label htmlFor={`title_${lang.code}`}>Title ({lang.name})</Label>
                      <Input
                        id={`title_${lang.code}`}
                        value={article[`title_${lang.code}` as keyof ArticleData] as string}
                        onChange={(e) => handleTitleChange(lang.code, e.target.value)}
                        placeholder={`Enter title in ${lang.name}`}
                        dir={lang.dir}
                        className="mt-1"
                      />
                    </div>

                    {(lang.code === 'en' || lang.code === 'ar') && (
                      <div>
                        <Label htmlFor={`excerpt_${lang.code}`}>Excerpt ({lang.name})</Label>
                        <Textarea
                          id={`excerpt_${lang.code}`}
                          value={article[`excerpt_${lang.code}` as keyof ArticleData] as string || ''}
                          onChange={(e) => setArticle(prev => ({ ...prev, [`excerpt_${lang.code}`]: e.target.value }))}
                          placeholder={`Short description in ${lang.name}`}
                          dir={lang.dir}
                          className="mt-1"
                          rows={2}
                        />
                      </div>
                    )}

                    <div>
                      <Label htmlFor={`content_${lang.code}`}>Content ({lang.name})</Label>
                      <Textarea
                        id={`content_${lang.code}`}
                        value={article[`content_${lang.code}` as keyof ArticleData] as string}
                        onChange={(e) => setArticle(prev => ({ ...prev, [`content_${lang.code}`]: e.target.value }))}
                        placeholder={`Write your article in ${lang.name}`}
                        dir={lang.dir}
                        className="mt-1 min-h-[300px]"
                        rows={12}
                      />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </GlassCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Slug */}
            <GlassCard className="p-4">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={article.slug}
                onChange={(e) => setArticle(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="article-url-slug"
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                /blog/{article.slug || 'your-article-slug'}
              </p>
            </GlassCard>

            {/* Featured Image */}
            <GlassCard className="p-4">
              <Label>Featured Image</Label>
              <div className="mt-2">
                {article.featured_image ? (
                  <div className="relative">
                    <img
                      src={article.featured_image}
                      alt="Featured"
                      className="w-full h-40 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setArticle(prev => ({ ...prev, featured_image: '' }))}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <motion.button
                    onClick={handleOpenMediaPicker}
                    className="w-full h-40 border-2 border-dashed border-primary/30 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      Click to select image
                    </span>
                  </motion.button>
                )}
              </div>
            </GlassCard>

            {/* Publish Status */}
            <GlassCard className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Published</Label>
                  <p className="text-xs text-muted-foreground">
                    {article.published ? 'Article is live' : 'Save as draft'}
                  </p>
                </div>
                <Switch
                  checked={article.published}
                  onCheckedChange={(checked) => setArticle(prev => ({ ...prev, published: checked }))}
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Media Picker Dialog */}
      <Dialog open={showMediaPicker} onOpenChange={setShowMediaPicker}>
        <DialogContent className="max-w-4xl glass-card border-primary/20">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>
          
          {loadingMedia ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : mediaFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No images found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setShowMediaPicker(false);
                  navigate('/admin/media');
                }}
              >
                <Upload className="w-4 h-4 mr-2" />
                Go to Media Library
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto p-2">
              {mediaFiles.map((file) => (
                <motion.button
                  key={file.id}
                  onClick={() => handleSelectMedia(file.file_url)}
                  className="relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-primary transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img
                    src={file.file_url}
                    alt={file.title}
                    className="w-full h-full object-cover"
                  />
                  {article.featured_image === file.file_url && (
                    <div className="absolute inset-0 bg-primary/50 flex items-center justify-center">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default ArticleEditor;
