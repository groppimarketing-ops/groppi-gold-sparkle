import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import PageSEO from '@/components/seo/PageSEO';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <PageSEO
        title="404 - Pagina niet gevonden"
        description="De pagina die je zoekt bestaat niet of is verplaatst."
        path={location.pathname}
        noIndex
      />
      <div className="text-center px-4">
        <h1 className="mb-4 text-6xl font-bold gold-gradient-text">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          {t('notFound.message', 'Deze pagina bestaat niet of is verplaatst.')}
        </p>
        <Button asChild className="luxury-button">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('notFound.backHome', 'Terug naar home')}
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
