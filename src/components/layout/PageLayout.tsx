import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import TopBar from './TopBar';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1 pt-28">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
