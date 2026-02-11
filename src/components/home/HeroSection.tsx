import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'framer-motion';
import { ChevronDown, TrendingUp, BarChart3, Rocket, Crown, Gem, Target, Star, Zap, Award, Globe, Sparkles, ChartLine, DollarSign, Users, Eye } from 'lucide-react';
import { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import groppiGLogo from '@/assets/groppi-g-logo.png';
import { socialIconsData } from '@/components/shared/SocialIconsPill';

const FLOATING_ICONS = [
  { Icon: TrendingUp, top: '15%', left: '8%', delay: '0s', size: 'text-3xl' },
  { Icon: BarChart3, top: '70%', left: '85%', delay: '3s', size: 'text-4xl' },
  { Icon: Rocket, top: '45%', left: '20%', delay: '1.5s', size: 'text-2xl' },
  { Icon: Crown, top: '80%', left: '15%', delay: '5s', size: 'text-xl' },
  { Icon: Gem, top: '25%', left: '75%', delay: '2s', size: 'text-4xl' },
  { Icon: Target, top: '55%', left: '45%', delay: '4s', size: 'text-3xl' },
  { Icon: Star, top: '10%', left: '60%', delay: '1s', size: 'text-3xl' },
  { Icon: Zap, top: '65%', left: '30%', delay: '6s', size: 'text-2xl' },
  { Icon: Award, top: '35%', left: '88%', delay: '2.5s', size: 'text-3xl' },
  { Icon: Globe, top: '90%', left: '50%', delay: '7s', size: 'text-2xl' },
  { Icon: Sparkles, top: '50%', left: '12%', delay: '8s', size: 'text-4xl' },
  { Icon: ChartLine, top: '20%', left: '40%', delay: '2.2s', size: 'text-3xl' },
  { Icon: DollarSign, top: '75%', left: '70%', delay: '9s', size: 'text-3xl' },
  { Icon: Users, top: '40%', left: '95%', delay: '5.5s', size: 'text-2xl' },
  { Icon: Eye, top: '85%', left: '5%', delay: '3.8s', size: 'text-3xl' },
];

const PARTICLES = [
  { left: '10%', delay: '0s', size: 10 },
  { left: '30%', delay: '1.2s', size: 7 },
  { left: '50%', delay: '2.5s', size: 12 },
  { left: '70%', delay: '0.8s', size: 8 },
  { left: '90%', delay: '3.3s', size: 6 },
  { left: '20%', delay: '4s', size: 9 },
  { left: '40%', delay: '1.8s', size: 11 },
  { left: '60%', delay: '5s', size: 7 },
  { left: '80%', delay: '2.2s', size: 10 },
  { left: '95%', delay: '6s', size: 8 },
];

const CHART_BARS = [
  { heightClass: 'h-20', labelKey: 'chartLeads' },
  { heightClass: 'h-28', labelKey: 'chartSales' },
  { heightClass: 'h-36', labelKey: 'chartRoi' },
];

const HeroSection = memo(() => {
  const { t, i18n } = useTranslation();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const onCanPlay = () => setVideoLoaded(true);
      const onError = () => setVideoError(true);
      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('error', onError);
      return () => {
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onError);
      };
    }
  }, []);

  const scrollToServices = () => {
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: 'min(80vh, 750px)' }}
      dir={isRtl ? 'rtl' : 'ltr'}
      aria-label={t('home.heroNew.badge')}
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

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(180deg, 
            rgba(0,0,0,0.95) 0%, 
            rgba(0,0,0,0.85) 25%,
            rgba(0,0,0,0.80) 50%,
            rgba(0,0,0,0.85) 75%,
            rgba(0,0,0,0.95) 100%
          )`,
        }}
      />

      {/* Floating Gold Icons */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {FLOATING_ICONS.map(({ Icon, top, left, delay, size }, i) => (
          <Icon
            key={i}
            className={`absolute text-primary ${size} drop-shadow-[0_0_15px_hsl(43_76%_52%)] ${
              prefersReducedMotion ? 'opacity-40' : 'animate-float-gold'
            }`}
            style={{
              top,
              left,
              animationDelay: prefersReducedMotion ? undefined : delay,
              opacity: prefersReducedMotion ? 0.4 : undefined,
            }}
          />
        ))}
      </div>

      {/* Rising Gold Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-[3] pointer-events-none">
          {PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute bottom-0 rounded-full bg-primary animate-rise-gold"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                boxShadow: '0 0 20px hsl(43 76% 52%), 0 0 40px hsl(43 76% 52% / 0.8)',
              }}
            />
          ))}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-20">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Brand Video - Full Width */}
          <div
            className="mb-8 w-full rounded-2xl border-2 border-primary/50 p-1.5 backdrop-blur-sm animate-border-pulse"
            style={{
              boxShadow: '0 0 40px hsl(43 76% 52% / 0.3), inset 0 0 20px hsl(43 76% 52% / 0.1)',
            }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full object-cover rounded-xl"
            >
              <source src="/videos/hero-logo.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Social Icons - Gold */}
          <div className="flex items-center gap-5 mb-10">
            {socialIconsData.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-primary/40 bg-background/30 backdrop-blur-sm text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-110 hover:shadow-[0_0_25px_hsl(43_76%_52%)]"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Chart Bars */}
          <div className="flex justify-center items-end gap-8 mb-10">
            {CHART_BARS.map(({ heightClass, labelKey }, i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={`w-11 ${heightClass} rounded-t-2xl rounded-b-lg ${
                    prefersReducedMotion ? 'opacity-90' : 'animate-bar-breath'
                  }`}
                  style={{
                    background: 'linear-gradient(to top, hsl(43 76% 52%), hsl(45 100% 60%))',
                    boxShadow: '0 0 30px hsl(43 76% 52%)',
                  }}
                />
                <span className="text-primary text-xs mt-3 tracking-[2px] uppercase font-medium">
                  {t(`home.heroNew.${labelKey}`)}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/services"
            className="inline-block px-14 py-5 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-[4px] rounded-full border border-primary transition-all duration-300 hover:bg-transparent hover:text-primary hover:shadow-[0_0_60px_hsl(43_76%_52%)] hover:scale-105 mt-2"
            style={{ boxShadow: '0 0 30px hsl(43 76% 52% / 0.5)' }}
          >
            {t('home.heroNew.ctaPrimary')}
          </Link>

          {/* Beyond Standard Footer */}
          <div className="mt-12 w-full border-t border-primary/30 pt-8">
            <span className="text-primary/80 text-xs tracking-[6px] uppercase">
              {t('home.heroNew.beyondStandard')}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-muted-foreground/60 hover:text-primary transition-colors cursor-pointer animate-bounce"
        aria-label={t('home.heroNew.scrollHint')}
      >
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
