import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { applyDocumentDirection } from "@/i18n/config";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

// Import i18n validation in dev mode
if (import.meta.env.DEV) {
  import("@/utils/i18nValidation");
}

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Blog = lazy(() => import("./pages/Blog"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Franchise = lazy(() => import("./pages/Franchise"));
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
      <span className="text-muted-foreground">Loading...</span>
    </div>
  </div>
);

// RTL Handler component - uses the improved applyDocumentDirection
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RTLHandler>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/franchise" element={<Franchise />} />
                
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
          </RTLHandler>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
