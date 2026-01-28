import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Eye, MessageCircle, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  // Handle video load
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('canplay', () => setVideoLoaded(true));
      video.addEventListener('error', () => setVideoError(true));
    }
    return () => {
      if (video) {
        video.removeEventListener('canplay', () => setVideoLoaded(true));
        video.removeEventListener('error', () => setVideoError(true));
      }
    };
  }, []);

  const proofPoints = [
    t('home.heroNew.proof1'),
    t('home.heroNew.proof2'),
    t('home.heroNew.proof3'),
  ];

  const trustItems = [
    { icon: Eye, titleKey: 'home.trustBar.item1.title', textKey: 'home.trustBar.item1.text' },
    { icon: MessageCircle, titleKey: 'home.trustBar.item2.title', textKey: 'home.trustBar.item2.text' },
    { icon: Target, titleKey: 'home.trustBar.item3.title', textKey: 'home.trustBar.item3.text' },
  ];

  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{ 
        minHeight: 'min(90vh, 860px)',
      }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Video Background with Poster Fallback */}
      <div className="absolute inset-0 z-0">
        {/* Poster Image (shown first, then behind video) */}
        <img
          src="/images/hero-poster.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
        {/* Video Background */}
        {!videoError && (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Dark Overlay for Readability */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(180deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.58) 55%, rgba(0,0,0,0.88) 100%),
            radial-gradient(circle at center, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.86) 68%)
          `
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center" style={{ maxWidth: 1100 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/40 bg-background/10 backdrop-blur-sm mb-8"
          >
            <span className="text-sm text-primary font-medium tracking-wide">
              {t('home.heroNew.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight"
            style={{ color: '#EAEAEA' }}
          >
            {t('home.heroNew.headline')}
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('home.heroNew.subtitle')}
          </motion.p>

          {/* Proof Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10"
          >
            {proofPoints.map((point, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{point}</span>
              </div>
            ))}
          </motion.div>
          
          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="luxury-button text-primary-foreground font-semibold px-8 py-6 text-base rounded-xl transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_20px_hsl(43_100%_50%/0.4)]"
            >
              <Link to="/services">
                {t('home.heroNew.ctaPrimary')}
                <ArrowRight className={`h-5 w-5 ${isRtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_hsl(43_100%_50%/0.3)] px-8 py-6 text-base rounded-xl transition-all duration-300"
            >
              <Link to="/contact">
                {t('home.heroNew.ctaSecondary')}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Trust Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1 }}
        className="absolute bottom-20 left-0 right-0 z-10"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {trustItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                className="flex items-center gap-3 text-center sm:text-left"
              >
                <div className="w-10 h-10 rounded-full border border-primary/40 bg-background/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground" style={{ color: '#EAEAEA' }}>
                    {t(item.titleKey)}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {t(item.textKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border border-primary/30 bg-background/10 backdrop-blur-sm flex justify-center pt-1.5"
        >
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
