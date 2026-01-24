import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, FileText, Eye, Edit, Trash2, Clock, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface Article {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select('id, title_en, title_ar, slug, published, published_at, created_at, updated_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast({
        title: 'Error',
        description: 'Failed to load articles',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setArticles(articles.filter(a => a.id !== deleteId));
      toast({
        title: 'Deleted',
        description: 'Article has been deleted',
      });
    } catch (error) {
      console.error('Error deleting article:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete article',
        variant: 'destructive',
      });
    } finally {
      setDeleteId(null);
    }
  };

  const handleTogglePublish = async (article: Article) => {
    try {
      const { error } = await supabase
        .from('articles')
        .update({ 
          published: !article.published,
          published_at: !article.published ? new Date().toISOString() : null
        })
        .eq('id', article.id);

      if (error) throw error;

      setArticles(articles.map(a => 
        a.id === article.id 
          ? { ...a, published: !a.published, published_at: !a.published ? new Date().toISOString() : null }
          : a
      ));
      
      toast({
        title: article.published ? 'Unpublished' : 'Published',
        description: `Article has been ${article.published ? 'unpublished' : 'published'}`,
      });
    } catch (error) {
      console.error('Error updating article:', error);
      toast({
        title: 'Error',
        description: 'Failed to update article',
        variant: 'destructive',
      });
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.title_ar.includes(searchQuery)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold gold-gradient-text flex items-center gap-3">
              <FileText className="w-8 h-8" />
              Articles
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your blog posts and articles
            </p>
          </div>
          <Button asChild className="luxury-button">
            <Link to="/admin/articles/new">
              <Plus className="w-4 h-4 mr-2" />
              New Article
            </Link>
          </Button>
        </div>

        {/* Search */}
        <GlassCard className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="pl-10 bg-background/50"
            />
          </div>
        </GlassCard>

        {/* Articles Table */}
        <GlassCard className="overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <FileText className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No articles found' : 'No articles yet. Create your first article!'}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article, index) => (
                  <motion.tr
                    key={article.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-primary/10"
                  >
                    <TableCell>
                      <div>
                        <p className="font-medium">{article.title_en}</p>
                        <p className="text-sm text-muted-foreground" dir="rtl">
                          {article.title_ar}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        article.published 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {article.published ? (
                          <>
                            <Check className="w-3 h-3" />
                            Published
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" />
                            Draft
                          </>
                        )}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(article.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleTogglePublish(article)}
                          className="h-8 w-8"
                        >
                          {article.published ? (
                            <X className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <Check className="w-4 h-4 text-muted-foreground" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-8 w-8"
                        >
                          <Link to={`/admin/articles/${article.id}`}>
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteId(article.id)}
                          className="h-8 w-8 hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          )}
        </GlassCard>
      </div>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="glass-card border-primary/20">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Article</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this article? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default Articles;
