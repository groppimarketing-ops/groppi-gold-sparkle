import { ReactNode } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from './Header';
import Footer from './Footer';
import MobileHeader from '@/components/mobile/MobileHeader';
import MobileBottomTabs from '@/components/mobile/MobileBottomTabs';
import WaveAnimation from '../effects/WaveAnimation';
import ChatWidget from '@/components/chat/ChatWidget';

interface PageLayoutProps {
  children: ReactNode;
  waveIntensity?: 'low' | 'medium' | 'high';
}

const PageLayout = ({ 
  children, 
  waveIntensity = 'medium',
}: PageLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      <WaveAnimation intensity={waveIntensity} />
      
      {isMobile ? <MobileHeader /> : <Header />}

      <main className={`flex-1 relative z-10 ${isMobile ? 'pt-14 pb-16' : 'pt-24'}`}>
        {children}
      </main>

      <Footer />

      {isMobile && <MobileBottomTabs />}
      <ChatWidget />
    </div>
  );
};

export default PageLayout;
