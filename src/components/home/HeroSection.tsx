import { memo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

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
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="/images/hero-poster.png"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay for contrast */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, hsl(0 0% 0% / 0.45) 0%, hsl(0 0% 0% / 0.65) 50%, hsl(0 0% 0% / 0.85) 100%)',
        }}
      />

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
          style={{ animationPlayState: 'running' }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
          }}
        >
          {VIMEO_IDS.map((id, i) => (
            <VideoCard key={`a-${i}`} id={id} />
          ))}
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
