import { memo } from 'react';
import { useReducedMotion } from 'framer-motion';

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

  return (
    <section className="groppi-hero-pro" aria-label="GROPPI Hero">
      <div className="groppi-center">
        <div
          className={`groppi-strip-pro ${prefersReducedMotion ? '' : 'animate-drift-pro'}`}
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
