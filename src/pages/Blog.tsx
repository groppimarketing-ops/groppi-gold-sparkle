import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import GlassCard from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { blogArticles } from '@/data/blogArticles';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const featuredArticle = blogArticles[0];
  const otherArticles = blogArticles.slice(1);

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            >
              <Sparkles className="w-4 h-4" />
              {t('blog.badge')}
            </motion.span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gold-gradient-text">
              {t('blog.title')}
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('blog.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Link to={`/blog/${featuredArticle.slug}`} className="block group">
            <GlassCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-0 overflow-hidden !p-0 hover:border-primary/50 transition-colors"
            >
              <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  src={featuredArticle.image}
                  alt={t(featuredArticle.titleKey)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent lg:block hidden" />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 mb-4"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-primary text-sm font-medium">{t('blog.featured')}</span>
                </motion.div>
                
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
                  {t(featuredArticle.titleKey)}
                </h2>
                
                <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                  {t(featuredArticle.excerptKey)}
                </p>
                
                <Button className="luxury-button w-fit">
                  {t('blog.readArticle')}
                  <ArrowRight className={`h-4 w-4 ${isRtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Button>
              </div>
            </GlassCard>
          </Link>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherArticles.map((article, index) => (
              <Link key={article.id} to={`/blog/${article.slug}`} className="block group">
                <GlassCard
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="overflow-hidden !p-0 h-full hover:border-primary/50 transition-colors"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={t(article.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
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
                      {t(article.titleKey)}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {t(article.excerptKey)}
                    </p>
                    
                    <span className="inline-flex items-center text-primary text-sm font-medium">
                      {t('blog.readArticle')}
                      <ArrowRight className={`h-4 w-4 ${isRtl ? 'mr-1 rotate-180' : 'ml-1'} group-hover:translate-x-1 transition-transform`} />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
