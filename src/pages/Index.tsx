import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default Index;
