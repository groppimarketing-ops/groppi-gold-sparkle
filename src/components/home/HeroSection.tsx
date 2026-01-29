import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

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

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const proofPoints = [
    t('home.heroNew.proof1'),
    t('home.heroNew.proof2'),
    t('home.heroNew.proof3'),
  ];

  return (
    <section 
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: 'min(85vh, 800px)' }}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-poster.png"
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
          }`}
        />
        
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

      {/* Strong Premium Overlay */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(0,0,0,0.92) 0%, 
              rgba(0,0,0,0.75) 35%,
              rgba(0,0,0,0.70) 65%,
              rgba(0,0,0,0.92) 100%
            )
          `
        }}
      />

      {/* Subtle Gold Particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/30"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${20 + Math.random() * 60}%`,
            }}
            animate={{
              y: [0, -60],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-background/5 backdrop-blur-sm mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs text-primary font-medium tracking-wider uppercase">
              {t('home.heroNew.badge')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight gold-gradient-text"
          >
            {t('home.heroNew.headline')}
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {t('home.heroNew.subtitle')}
          </motion.p>

          {/* Benefit Bullets - Clean Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-12"
          >
            {proofPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-2.5"
              >
                <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-2.5 h-2.5 text-primary" />
                </div>
                <span className="text-sm text-foreground/85">{point}</span>
              </div>
            ))}
          </motion.div>
          
          {/* CTA Buttons - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-semibold px-8 py-5 text-sm rounded-lg transition-all duration-300 hover:bg-primary/90 hover:translate-y-[-2px] hover:shadow-[0_8px_25px_hsl(43_100%_50%/0.25)]"
              onClick={scrollToServices}
            >
              {t('home.heroNew.ctaPrimary')}
              <ArrowRight className={`h-4 w-4 ${isRtl ? 'mr-2 rotate-180' : 'ml-2'}`} />
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary/40 text-primary font-medium px-8 py-5 text-sm rounded-lg transition-all duration-300 hover:bg-primary/5 hover:border-primary/60 hover:translate-y-[-2px]"
            >
              <Link to="/contact">
                {t('home.heroNew.ctaSecondary')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.button
          onClick={scrollToServices}
          className="flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
