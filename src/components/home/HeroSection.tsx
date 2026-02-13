import { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Zap, Sun } from 'lucide-react';
import { socialIconsData } from '@/components/shared/SocialIconsPill';
import { trackEvent } from '@/utils/tracking';

const VIMEO_IDS = [
  '1164723572',
  '1164718752',
  '1164721918',
  '1164718101',
  '1164721986',
  '1164718571',
  '1164718454',
  '1164718305',
  '1164718241',
];

const vimeoSrc = (id: string) =>
  `https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&dnt=1`;

const VideoCard = memo(({ id }: { id: string }) => (
  <div className="groppi-card">
    <iframe
      src={vimeoSrc(id)}
      allow="autoplay; fullscreen; picture-in-picture"
      loading="lazy"
      className="w-full h-full border-0"
      title="Portfolio video"
    />
  </div>
));
VideoCard.displayName = 'VideoCard';

const HeroSocialIcons = memo(() => (
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-16 px-16 py-4 rounded-full"
    style={{
      background: 'rgba(0, 0, 0, 0.55)',
      border: '1.5px solid hsl(43 76% 52% / 0.45)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 24px hsl(43 76% 52% / 0.12)',
    }}
  >
    {socialIconsData.map((social) => (
      <motion.a
        key={social.label}
        href={social.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={social.ariaLabel}
        onClick={() => trackEvent({ event: social.event, location: 'hero' })}
        whileHover={{ scale: 1.75, y: -8 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 10 }}
        className="hero-social-icon relative flex items-center justify-center w-12 h-12 rounded-xl"
        style={{
          background: 'hsl(0 0% 4%)',
          border: '1.5px solid hsl(43 76% 52% / 0.5)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 hsl(43 76% 52% / 0.1)',
          transformStyle: 'preserve-3d',
          perspective: '600px',
        }}
      >
        <span style={{ color: 'hsl(43 76% 52%)' }}><social.icon className="h-5 w-5 relative z-[1]" /></span>
      </motion.a>
    ))}
  </div>
));
HeroSocialIcons.displayName = 'HeroSocialIcons';

const HeroSection = memo(() => (
  <section className="groppi-hero-pro" aria-label="GROPPI Hero Videos">
    {/* SVG gradient for metallic gold icons */}
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="20%" stopColor="#FFD700" />
          <stop offset="40%" stopColor="#DAA520" />
          <stop offset="55%" stopColor="#8B6914" />
          <stop offset="70%" stopColor="#FFD700" />
          <stop offset="85%" stopColor="#FFFACD" />
          <stop offset="100%" stopColor="#DAA520" />
        </linearGradient>
      </defs>
    </svg>
    <video
      autoPlay muted loop playsInline preload="auto"
      className="groppi-bg"
      poster="/images/hero-poster.png"
    >
      <source src="/videos/hero-bg.mp4" type="video/mp4" />
    </video>

    <div className="groppi-overlay" />

    <div className="groppi-strip-wrap">
      <div className="groppi-strip-track">
        {VIMEO_IDS.map((id, i) => (
          <VideoCard key={`a-${i}`} id={id} />
        ))}
        {VIMEO_IDS.map((id, i) => (
          <VideoCard key={`b-${i}`} id={id} />
        ))}
      </div>
    </div>

    {/* Slow-Motion Gold Flares */}
    <div className="hero-gold-rain" aria-hidden="true">
      <span className="gold-drop gold-drop--1" style={{ left: '10%' }}><Sparkles /></span>
      <span className="gold-drop gold-drop--2" style={{ left: '30%' }}><Star /></span>
      <span className="gold-drop gold-drop--3" style={{ left: '55%' }}><Zap /></span>
      <span className="gold-drop gold-drop--4" style={{ left: '78%' }}><Sun /></span>
      <span className="gold-drop gold-drop--5" style={{ left: '22%' }}><Sparkles /></span>
      <span className="gold-drop gold-drop--6" style={{ left: '48%' }}><Star /></span>
      <span className="gold-drop gold-drop--7" style={{ left: '68%' }}><Sun /></span>
      <span className="gold-drop gold-drop--8" style={{ left: '40%' }}><Zap /></span>
    </div>

    <HeroSocialIcons />
  </section>
));

HeroSection.displayName = 'HeroSection';

export default HeroSection;
