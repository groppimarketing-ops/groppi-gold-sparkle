import articleWebsiteSalesTool from '@/assets/blog/article-website-sales-tool.jpg';
import articleSocialMedia from '@/assets/blog/article-social-media.jpg';
import articleSeoExplained from '@/assets/blog/article-seo-explained.jpg';
import articlePaidAdvertising from '@/assets/blog/article-paid-advertising.jpg';
import articleOnlineReputation from '@/assets/blog/article-online-reputation.jpg';

export interface BlogArticle {
  id: string;
  slug: string;
  image: string;
  readTime: string;
  date: string;
  author: string;
  // i18n keys
  titleKey: string;
  excerptKey: string;
  metaTitleKey: string;
  metaDescriptionKey: string;
  contentKey: string;
}

export const blogArticles: BlogArticle[] = [
  {
    id: '1',
    slug: 'website-strongest-sales-tool-2025',
    image: articleWebsiteSalesTool,
    readTime: '5',
    date: '2025-02-01',
    author: 'GROPPI Team',
    titleKey: 'blog.articles.websiteSalesTool.title',
    excerptKey: 'blog.articles.websiteSalesTool.excerpt',
    metaTitleKey: 'blog.articles.websiteSalesTool.metaTitle',
    metaDescriptionKey: 'blog.articles.websiteSalesTool.metaDescription',
    contentKey: 'blog.articles.websiteSalesTool.content',
  },
  {
    id: '2',
    slug: 'social-media-management-what-businesses-need',
    image: articleSocialMedia,
    readTime: '6',
    date: '2025-01-25',
    author: 'GROPPI Team',
    titleKey: 'blog.articles.socialMediaManagement.title',
    excerptKey: 'blog.articles.socialMediaManagement.excerpt',
    metaTitleKey: 'blog.articles.socialMediaManagement.metaTitle',
    metaDescriptionKey: 'blog.articles.socialMediaManagement.metaDescription',
    contentKey: 'blog.articles.socialMediaManagement.content',
  },
  {
    id: '3',
    slug: 'seo-explained-simply',
    image: articleSeoExplained,
    readTime: '5',
    date: '2025-01-18',
    author: 'GROPPI Team',
    titleKey: 'blog.articles.seoExplained.title',
    excerptKey: 'blog.articles.seoExplained.excerpt',
    metaTitleKey: 'blog.articles.seoExplained.metaTitle',
    metaDescriptionKey: 'blog.articles.seoExplained.metaDescription',
    contentKey: 'blog.articles.seoExplained.content',
  },
  {
    id: '4',
    slug: 'paid-advertising-without-waste',
    image: articlePaidAdvertising,
    readTime: '6',
    date: '2025-01-10',
    author: 'GROPPI Team',
    titleKey: 'blog.articles.paidAdvertising.title',
    excerptKey: 'blog.articles.paidAdvertising.excerpt',
    metaTitleKey: 'blog.articles.paidAdvertising.metaTitle',
    metaDescriptionKey: 'blog.articles.paidAdvertising.metaDescription',
    contentKey: 'blog.articles.paidAdvertising.content',
  },
  {
    id: '5',
    slug: 'online-reputation-why-reviews-matter',
    image: articleOnlineReputation,
    readTime: '5',
    date: '2025-01-03',
    author: 'GROPPI Team',
    titleKey: 'blog.articles.onlineReputation.title',
    excerptKey: 'blog.articles.onlineReputation.excerpt',
    metaTitleKey: 'blog.articles.onlineReputation.metaTitle',
    metaDescriptionKey: 'blog.articles.onlineReputation.metaDescription',
    contentKey: 'blog.articles.onlineReputation.content',
  },
];

export const getArticleBySlug = (slug: string): BlogArticle | undefined => {
  return blogArticles.find((article) => article.slug === slug);
};
