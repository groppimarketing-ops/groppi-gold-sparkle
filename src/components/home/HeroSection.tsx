import { memo } from 'react';
import { motion } from 'framer-motion';
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
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 px-6 py-3 rounded-full"
    style={{
      background: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid hsl(43 76% 52% / 0.4)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 20px hsl(43 76% 52% / 0.1)',
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
        whileHover={{ scale: 1.25, y: -4 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        className="hero-social-icon relative flex items-center justify-center w-10 h-10 rounded-xl"
        style={{
          background: 'hsl(0 0% 4%)',
          border: '1.5px solid hsl(43 76% 52% / 0.5)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 hsl(43 76% 52% / 0.1)',
          transformStyle: 'preserve-3d',
          perspective: '600px',
        }}
      >
        <social.icon className="h-[18px] w-[18px] text-foreground relative z-[1]" />
      </motion.a>
    ))}
  </div>
));
HeroSocialIcons.displayName = 'HeroSocialIcons';

const HeroSection = memo(() => (
  <section className="groppi-hero-pro" aria-label="GROPPI Hero Videos">
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

    <HeroSocialIcons />
  </section>
));

HeroSection.displayName = 'HeroSection';

export default HeroSection;
