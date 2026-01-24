import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/button';

const Blog = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  // Placeholder blog posts (in production, these would come from Supabase)
  const blogPosts = [
    {
      id: '1',
      slug: 'the-art-of-excellence',
      title: 'The Art of Excellence',
      titleAr: 'فن التميز',
      excerpt: 'Discover how we maintain our commitment to excellence through every aspect of our work.',
      excerptAr: 'اكتشف كيف نحافظ على التزامنا بالتميز في كل جانب من جوانب عملنا.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      author: 'Groppi Team',
      date: '2024-01-15',
      readTime: '5 min',
    },
    {
      id: '2',
      slug: 'luxury-redefined',
      title: 'Luxury Redefined',
      titleAr: 'إعادة تعريف الفخامة',
      excerpt: 'Exploring the modern interpretation of luxury and what it means for our customers.',
      excerptAr: 'استكشاف التفسير الحديث للفخامة وما يعنيه لعملائنا.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
      author: 'Editorial Team',
      date: '2024-01-10',
      readTime: '7 min',
    },
    {
      id: '3',
      slug: 'tradition-meets-innovation',
      title: 'Tradition Meets Innovation',
      titleAr: 'التقاليد تلتقي بالابتكار',
      excerpt: 'How we blend time-honored traditions with cutting-edge innovation.',
      excerptAr: 'كيف نمزج التقاليد العريقة مع الابتكار المتطور.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
      author: 'Innovation Team',
      date: '2024-01-05',
      readTime: '6 min',
    },
    {
      id: '4',
      slug: 'customer-first-approach',
      title: 'Customer First Approach',
      titleAr: 'نهج العميل أولاً',
      excerpt: 'Understanding our philosophy of putting customers at the heart of everything.',
      excerptAr: 'فهم فلسفتنا في وضع العملاء في صميم كل شيء.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      author: 'Customer Success',
      date: '2024-01-01',
      readTime: '4 min',
    },
    {
      id: '5',
      slug: 'sustainable-luxury',
      title: 'Sustainable Luxury',
      titleAr: 'الفخامة المستدامة',
      excerpt: 'Our commitment to sustainability without compromising on quality.',
      excerptAr: 'التزامنا بالاستدامة دون المساس بالجودة.',
      image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800',
      author: 'Sustainability Team',
      date: '2023-12-28',
      readTime: '8 min',
    },
    {
      id: '6',
      slug: 'global-expansion',
      title: 'Global Expansion Journey',
      titleAr: 'رحلة التوسع العالمي',
      excerpt: 'Follow our journey as we expand our presence across the globe.',
      excerptAr: 'تابع رحلتنا أثناء توسيع تواجدنا في جميع أنحاء العالم.',
      image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
      author: 'Global Team',
      date: '2023-12-20',
      readTime: '5 min',
    },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader
            subtitle={t('blog.subtitle')}
            title={t('blog.title')}
          />
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
              <img
                src={blogPosts[0].image}
                alt={isRtl ? blogPosts[0].titleAr : blogPosts[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            <div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {blogPosts[0].date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {blogPosts[0].author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {blogPosts[0].readTime}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 gold-gradient-text">
                {isRtl ? blogPosts[0].titleAr : blogPosts[0].title}
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                {isRtl ? blogPosts[0].excerptAr : blogPosts[0].excerpt}
              </p>
              <Button asChild className="luxury-button">
                <Link to={`/blog/${blogPosts[0].slug}`}>
                  {t('blog.readMore')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={isRtl ? post.titleAr : post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                    {isRtl ? post.titleAr : post.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {isRtl ? post.excerptAr : post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center text-primary text-sm font-medium group/link"
                  >
                    {t('blog.readMore')}
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Blog;
