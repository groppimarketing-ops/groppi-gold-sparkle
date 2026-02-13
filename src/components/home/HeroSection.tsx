import { memo } from 'react';

/**
 * Vimeo video IDs – 9 portfolio showreels.
 * First one autoplays, the rest play on hover / visibility.
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

const vimeoSrc = (id: string, autoplay: boolean) =>
  `https://player.vimeo.com/video/${id}?background=1&autoplay=${autoplay ? 1 : 0}&loop=1&muted=1&title=0&byline=0&portrait=0&dnt=1`;

const VideoCard = memo(({ id, autoplay }: { id: string; autoplay: boolean }) => (
  <div className="groppi-card">
    <iframe
      src={vimeoSrc(id, autoplay)}
      allow="autoplay; fullscreen; picture-in-picture"
      loading="lazy"
      className="w-full h-full border-0"
      title="Portfolio video"
    />
  </div>
));
VideoCard.displayName = 'VideoCard';

const HeroSection = memo(() => {
  return (
    <section className="groppi-hero-pro" aria-label="GROPPI Hero">
      <div className="groppi-center">
        <div className="groppi-strip-pro">
          {VIMEO_IDS.map((id, i) => (
            <VideoCard key={id} id={id} autoplay={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
