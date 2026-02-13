import { memo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import groppiLogo from '@/assets/groppi-logo.png';

/**
 * Vimeo video IDs for the scrolling strip.
 * 9 videos → duplicated for seamless infinite loop.
 */
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
  <div className="groppi-card flex-shrink-0">
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

const HeroSection = memo(() => {
  const prefersReducedMotion = useReducedMotion();
  const stripRef = useRef<HTMLDivElement>(null);

  return (
    <section
      className="groppi-hero80 relative overflow-hidden"
      aria-label="GROPPI Hero"
    >
      {/* Subtle luxury background */}
      <div className="absolute inset-0 z-0 groppi-hero-bg" />

      {/* Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 z-[5] opacity-95 drop-shadow-[0_0_22px_hsl(43_76%_52%/0.28)]"
        style={{ top: '16%' }}
      >
        <img
          src={groppiLogo}
          alt="GROPPI"
          className="w-[min(520px,70vw)] h-auto"
        />
      </div>

      {/* Scrolling video strip */}
      <div
        className="absolute left-0 right-0 z-[4] px-[4vw]"
        style={{
          bottom: '12%',
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
        ref={stripRef}
      >
        <div
          className={`flex gap-[22px] w-max ${
            prefersReducedMotion ? '' : 'animate-groppi-drift'
          }`}
          style={{
            animationPlayState: 'running',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
          }}
        >
          {/* Set A */}
          {VIMEO_IDS.map((id, i) => (
            <VideoCard key={`a-${i}`} id={id} />
          ))}
          {/* Set B (duplicate for seamless loop) */}
          {VIMEO_IDS.map((id, i) => (
            <VideoCard key={`b-${i}`} id={id} />
          ))}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
