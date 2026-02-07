import { useTranslation } from 'react-i18next';
import PageLayout from '@/components/layout/PageLayout';
import PartnerHero from '@/components/partner/PartnerHero';
import PartnerMarquee from '@/components/partner/PartnerMarquee';
import PartnerClarity from '@/components/partner/PartnerClarity';
import PartnerForWho from '@/components/partner/PartnerForWho';
import PartnerValue from '@/components/partner/PartnerValue';
import PartnerSteps from '@/components/partner/PartnerSteps';
import PartnerFAQ from '@/components/partner/PartnerFAQ';
import PartnerApplyCTA from '@/components/partner/PartnerApplyCTA';
import PartnerBooking from '@/components/partner/PartnerBooking';
import PageSEO from '@/components/seo/PageSEO';
import { BreadcrumbSchema } from '@/components/seo/StructuredData';

const Franchise = () => {
  const { t } = useTranslation();
  
  return (
    <PageLayout>
      <PageSEO
        title={t('nav.franchise', 'Franchise')}
        description="Word GROPPI franchise partner. Bouw je eigen marketingbureau onder het GROPPI-merk met exclusieve regio-rechten en volledige ondersteuning."
        path="/franchise"
      />
      <BreadcrumbSchema items={[{ name: 'Home', path: '/' }, { name: t('nav.franchise', 'Franchise'), path: '/franchise' }]} />
      <PartnerHero />
      <PartnerMarquee />
      <PartnerClarity />
      <PartnerForWho />
      <PartnerValue />
      <PartnerSteps />
      <PartnerFAQ />
      <PartnerApplyCTA />
      <PartnerBooking />
    </PageLayout>
  );
};

export default Franchise;
