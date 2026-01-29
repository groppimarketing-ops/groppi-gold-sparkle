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

const Franchise = () => {
  return (
    <PageLayout>
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
