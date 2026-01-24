import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import TopBar from './TopBar';
import WaveAnimation from '../effects/WaveAnimation';

interface PageLayoutProps {
  children: ReactNode;
  waveIntensity?: 'low' | 'medium' | 'high';
  waveSpeed?: 'slow' | 'normal' | 'fast';
}

const PageLayout = ({ 
  children, 
  waveIntensity = 'medium',
  waveSpeed = 'normal' 
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Golden Wave Background Effect */}
      <WaveAnimation intensity={waveIntensity} speed={waveSpeed} />
      
      <TopBar />
      <Header />
      <main className="flex-1 pt-32 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
