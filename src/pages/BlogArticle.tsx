import { useParams, Navigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import LangLink from '@/components/LangLink';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User, Share2 } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { getArticleBySlug, blogArticles } from '@/data/blogArticles';
import GlassCard from '@/components/ui/GlassCard';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';
import RelatedServices from '@/components/blog/RelatedServices';

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const title = t(article.titleKey);
  const content = t(article.contentKey);
  const metaTitle = t(article.metaTitleKey);
  const metaDescription = t(article.metaDescriptionKey);

  // Get related articles (excluding current)
  const relatedArticles = blogArticles
    .filter((a) => a.id !== article.id)
    .slice(0, 3);

  return (
    <PageLayout>
      <PageSEO
        title={metaTitle}
        description={metaDescription}
        path={`/blog/${article.slug}`}
        ogImage={article.image}
        type="article"
        articlePublishedTime={article.date}
      />
      <BreadcrumbSchema items={[
        { name: 'Home', path: '/' },
        { name: t('nav.blog', 'Blog'), path: '/blog' },
        { name: title, path: `/blog/${article.slug}` },
      ]} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="neural-lines opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-primary"
            >
              <LangLink to="/blog">
                <ArrowLeft className={`h-4 w-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} />
                {t('blog.backToArticles')}
              </LangLink>
            </Button>
          </motion.div>

          {/* Article Header */}
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6"
            >
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                {new Date(article.date).toLocaleDateString(i18n.language, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                {article.readTime} {t('blog.minRead')}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" />
                {article.author}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 gold-gradient-text leading-tight"
            >
              {title}
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <GlassCard className="overflow-hidden !p-0">
              <img
                src={article.image}
                alt={title}
                className="w-full aspect-[21/9] object-cover"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width={1200}
                height={514}
              />
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-3xl mx-auto"
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:gold-gradient-text prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-5
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:my-5 prose-ul:space-y-2
                prose-li:text-muted-foreground
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content, { ALLOWED_TAGS: ['h1','h2','h3','h4','h5','h6','p','a','ul','ol','li','strong','em','br','img','span','div','blockquote','table','thead','tbody','tr','th','td'], ALLOWED_ATTR: ['href','src','alt','class','target','rel'] }) }}
            />
          </motion.article>

          {/* Related Services */}
          <div className="max-w-3xl mx-auto">
            <RelatedServices articleSlug={article.slug} />
          </div>

          {/* Share & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto mt-12 pt-8 border-t border-primary/20"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground text-sm">{t('blog.shareArticle')}:</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="glass-button"
                  onClick={() => {
                    navigator.share?.({
                      title: title,
                      url: window.location.href,
                    });
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Button asChild className="luxury-button">
                <LangLink to="/contact">{t('blog.contactUs')}</LangLink>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-20 border-t border-primary/10">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-center mb-12 gold-gradient-text"
          >
            {t('blog.relatedArticles')}
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {relatedArticles.map((related, index) => (
              <GlassCard
                key={related.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden !p-0"
              >
                <LangLink to={`/blog/${related.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={related.image}
                      alt={t(related.titleKey)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={250}
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-primary" />
                        {related.readTime} {t('blog.minRead')}
                      </span>
                    </div>
                    <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                      {t(related.titleKey)}
                    </h3>
                  </div>
                </LangLink>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default BlogArticle;
