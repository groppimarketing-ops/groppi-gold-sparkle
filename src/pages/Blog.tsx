import { useTranslation } from 'react-i18next';
import { Calendar, ArrowRight, Clock, Sparkles } from 'lucide-react';
import LangLink from '@/components/LangLink';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import { useBlogArticles } from '@/hooks/useBlogArticles';

// Skeleton card for loading state
const ArticleSkeleton = ({ featured = false }: { featured?: boolean }) => (
  <div className={`animate-pulse rounded-xl border border-primary/10 bg-card/40 overflow-hidden ${featured ? 'h-64' : 'h-72'}`}>
    <div className="h-2/3 bg-muted/30" />
    <div className="p-5 space-y-3">
      <div className="h-3 w-1/3 bg-muted/40 rounded" />
      <div className="h-4 w-3/4 bg-muted/40 rounded" />
      <div className="h-3 w-full bg-muted/30 rounded" />
    </div>
  </div>
);

const Blog = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';
  const { articles, isLoading } = useBlogArticles();

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <PageLayout>
      <PageSEO
        title={t('blog.title', 'Blog')}
        description={t('blog.subtitle', 'Tips en inzichten over digital marketing, SEO, social media en meer.')}
        path="/blog"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: t('nav.blog', 'Blog'), path: '/blog' }]} />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-30" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="animate-fade-up max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4">
              <Sparkles className="w-4 h-4" />
              {t('blog.badge')}
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gold-gradient-text">
              {t('blog.title')}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading || !featuredArticle ? (
            <ArticleSkeleton featured />
          ) : (
            <LangLink to={`/blog/${featuredArticle.slug}`} className="block group">
              <GlassCard className="grid lg:grid-cols-2 gap-0 overflow-hidden !p-0 hover:border-primary/50 transition-colors">
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  {featuredArticle.image ? (
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.isDynamic ? featuredArticle.title : t(featuredArticle.titleKey!)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="eager"
                      fetchPriority="high"
                      decoding="async"
                      width={800}
                      height={500}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent lg:block hidden" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-primary text-sm font-medium">{t('blog.featured')}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      {new Date(featuredArticle.date).toLocaleDateString(i18n.language, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-primary" />
                      {featuredArticle.readTime} {t('blog.minRead')}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-shimmer-text group-hover:text-primary transition-colors">
                    {featuredArticle.isDynamic ? featuredArticle.title : t(featuredArticle.titleKey!)}
                  </h2>
                  
                  <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                    {featuredArticle.isDynamic ? featuredArticle.excerpt : t(featuredArticle.excerptKey!)}
                  </p>
                  
                  <Button className="luxury-button w-fit">
                    {t('blog.readArticle')}
                    <ArrowRight className={`h-4 w-4 ${isRtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </Button>
                </div>
              </GlassCard>
            </LangLink>
          )}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <ArticleSkeleton key={i} />)
              : otherArticles.map((article, index) => (
                  <LangLink key={article.id} to={`/blog/${article.slug}`} className="block group">
                    <GlassCard
                      className={`overflow-hidden !p-0 h-full hover:border-primary/50 transition-colors animate-fade-up-${Math.min(index + 1, 4)}`}
                    >
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {article.image ? (
                          <img
                            src={article.image}
                            alt={article.isDynamic ? article.title : t(article.titleKey!)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                            decoding="async"
                            width={800}
                            height={500}
                          />
                        ) : (
                          <div className="w-full h-full bg-muted/20 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                      
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-primary" />
                            {new Date(article.date).toLocaleDateString(i18n.language, {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-primary" />
                            {article.readTime} {t('blog.minRead')}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {article.isDynamic ? article.title : t(article.titleKey!)}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {article.isDynamic ? article.excerpt : t(article.excerptKey!)}
                        </p>
                        
                        <span className="inline-flex items-center text-primary text-sm font-medium">
                          {t('blog.readArticle')}
                          <ArrowRight className={`h-4 w-4 ${isRtl ? 'mr-1 rotate-180' : 'ml-1'} group-hover:translate-x-1 transition-transform`} />
                        </span>
                      </div>
                    </GlassCard>
                  </LangLink>
                ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
