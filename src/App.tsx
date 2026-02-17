import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { applyDocumentDirection } from "@/i18n/config";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import CookieConsent from "@/components/layout/CookieConsent";
import LanguageLayout from "@/components/layout/LanguageLayout";
import { SUPPORTED_LANGS } from "@/utils/languageRouting";

// Import i18n validation in dev mode
if (import.meta.env.DEV) {
  import("@/utils/i18nValidation");
}

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const OurTeam = lazy(() => import("./pages/OurTeam"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogArticle = lazy(() => import("./pages/BlogArticle"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Franchise = lazy(() => import("./pages/Franchise"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Careers = lazy(() => import("./pages/Careers"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminPages = lazy(() => import("./pages/admin/Pages"));
const AdminArticles = lazy(() => import("./pages/admin/Articles"));
const AdminArticleEditor = lazy(() => import("./pages/admin/ArticleEditor"));
const AdminServices = lazy(() => import("./pages/admin/ServicesAdmin"));
const AdminMedia = lazy(() => import("./pages/admin/Media"));
const AdminMessages = lazy(() => import("./pages/admin/Messages"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

const queryClient = new QueryClient();

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  </div>
);

// RTL Handler component
const RTLHandler = ({ children }: { children: React.ReactNode }) => {
  const { i18n } = useTranslation();
  useEffect(() => {
    applyDocumentDirection(i18n.language);
  }, [i18n.language]);
  return <>{children}</>;
};

// Floating WhatsApp visibility handler - hide on admin routes
const FloatingWhatsAppHandler = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  if (isAdminRoute) return null;
  return <FloatingWhatsApp />;
};

/** Shared public route definitions reused for root (nl) and every language prefix. */
const publicRoutes = () => [
  <Route key="home" index element={<Index />} />,
  <Route key="about" path="about" element={<About />} />,
  <Route key="team" path="team" element={<OurTeam />} />,
  <Route key="services" path="services" element={<Services />} />,
  <Route key="service-detail" path="services/:slug" element={<ServiceDetail />} />,
  <Route key="blog" path="blog" element={<Blog />} />,
  <Route key="blog-article" path="blog/:slug" element={<BlogArticle />} />,
  <Route key="gallery" path="gallery" element={<Gallery />} />,
  <Route key="portfolio" path="portfolio" element={<Gallery />} />,
  <Route key="contact" path="contact" element={<Contact />} />,
  <Route key="franchise" path="franchise" element={<Franchise />} />,
  <Route key="careers" path="careers" element={<Careers />} />,
  <Route key="privacy" path="privacy" element={<Privacy />} />,
  <Route key="terms" path="terms" element={<Terms />} />,
  <Route key="case-study" path="portfolio/:slug" element={<CaseStudy />} />,
];

/** Non-nl language codes that need explicit route prefixes */
const LANG_PREFIXES = SUPPORTED_LANGS.filter(l => l !== 'nl');

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RTLHandler>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Default (nl) routes — unprefixed */}
                  <Route path="/" element={<LanguageLayout />}>
                    {publicRoutes()}
                  </Route>

                  {/* Language-prefixed routes (/en, /fr, /de, …) */}
                  {LANG_PREFIXES.map(lang => (
                    <Route key={lang} path={`/${lang}`} element={<LanguageLayout />}>
                      {publicRoutes()}
                    </Route>
                  ))}

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/pages" element={<ProtectedRoute><AdminPages /></ProtectedRoute>} />
                  <Route path="/admin/articles" element={<ProtectedRoute><AdminArticles /></ProtectedRoute>} />
                  <Route path="/admin/articles/new" element={<ProtectedRoute><AdminArticleEditor /></ProtectedRoute>} />
                  <Route path="/admin/articles/:id" element={<ProtectedRoute><AdminArticleEditor /></ProtectedRoute>} />
                  <Route path="/admin/services" element={<ProtectedRoute><AdminServices /></ProtectedRoute>} />
                  <Route path="/admin/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />
                  <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
                  <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <FloatingWhatsAppHandler />
              <CookieConsent />
            </RTLHandler>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
