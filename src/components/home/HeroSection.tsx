import { memo } from 'react';

const VIMEO_IDS = [
  { id: '1164723572', autoplay: false },
  { id: '1164718752', autoplay: true },
  { id: '1164721918', autoplay: true },
  { id: '1164718101', autoplay: false },
  { id: '1164721986', autoplay: false },
  { id: '1164718571', autoplay: false },
  { id: '1164718454', autoplay: false },
  { id: '1164718305', autoplay: false },
  { id: '1164718241', autoplay: false },
];

const vimeoSrc = (id: string, autoplay: boolean) =>
  `https://player.vimeo.com/video/${id}?background=1&autoplay=${autoplay ? 1 : 0}&loop=1&muted=1&title=0&byline=0&portrait=0&dnt=1`;

const VideoCard = memo(({ id, autoplay }: { id: string; autoplay: boolean }) => (
  <div className={`groppi-card${autoplay ? ' is-live' : ''}`}>
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
        {VIMEO_IDS.map((v) => (
          <VideoCard key={v.id} id={v.id} autoplay={v.autoplay} />
        ))}
      </div>
    </div>
  </section>
));

HeroSection.displayName = 'HeroSection';

export default HeroSection;
