import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import WaveAnimation from '../effects/WaveAnimation';

interface PageLayoutProps {
  children: ReactNode;
  waveIntensity?: 'low' | 'medium' | 'high';
}

const PageLayout = ({ 
  children, 
  waveIntensity = 'medium',
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col relative">
      {/* Golden Wave Background Effect */}
      <WaveAnimation intensity={waveIntensity} />
      
      <Header />
      <main className="flex-1 pt-24 relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
