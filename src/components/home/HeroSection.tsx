import { memo, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { socialIconsData } from '@/components/shared/SocialIconsPill';
import { trackEvent } from '@/utils/tracking';

/* ── Gold-themed social reaction emojis ── */
const REACTIONS = ['👍', '❤️', '😂', '🔥', '💛', '⭐', '👏', '😍', '💪', '🎯'];

interface FallingReaction {
  id: number;
  emoji: string;
  x: number;      // % from left
  delay: number;   // seconds
  duration: number; // seconds
  size: number;     // rem
}

let reactionId = 0;

const FallingReactions = memo(() => {
  const [reactions, setReactions] = useState<FallingReaction[]>([]);

  const spawnBatch = useCallback(() => {
    const batch: FallingReaction[] = Array.from({ length: 3 }, () => ({
      id: reactionId++,
      emoji: REACTIONS[Math.floor(Math.random() * REACTIONS.length)],
      x: 5 + Math.random() * 90,
      delay: Math.random() * 0.8,
      duration: 4 + Math.random() * 4,
      size: 1.2 + Math.random() * 1.4,
    }));
    setReactions((prev) => [...prev.slice(-30), ...batch]);
  }, []);

  useEffect(() => {
    spawnBatch();
    const interval = setInterval(spawnBatch, 2200);
    return () => clearInterval(interval);
  }, [spawnBatch]);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      <AnimatePresence>
        {reactions.map((r) => (
          <motion.span
            key={r.id}
            initial={{ y: '-10%', opacity: 0, scale: 0.5 }}
            animate={{ y: '110%', opacity: [0, 0.9, 0.9, 0], scale: [0.5, 1, 1, 0.6] }}
            exit={{ opacity: 0 }}
            transition={{ duration: r.duration, delay: r.delay, ease: 'linear' }}
            onAnimationComplete={() =>
              setReactions((prev) => prev.filter((p) => p.id !== r.id))
            }
            className="absolute select-none"
            style={{
              left: `${r.x}%`,
              fontSize: `${r.size}rem`,
              filter: 'saturate(0) brightness(2.2) sepia(1) hue-rotate(10deg) contrast(1.1)',
              textShadow: '0 0 12px hsl(43 100% 50% / 0.6), 0 0 24px hsl(43 100% 50% / 0.3)',
            }}
          >
            {r.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
});
FallingReactions.displayName = 'FallingReactions';

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

const HeroSocialIcons = memo(() => {
  const container = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.5, ease: 'easeOut' as const, staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.6 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 14 } },
  };

  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center gap-16 px-16 py-4 rounded-full"
      style={{
        background: 'rgba(0, 0, 0, 0.55)',
        border: '1.5px solid hsl(43 76% 52% / 0.45)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 24px hsl(43 76% 52% / 0.12)',
      }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {socialIconsData.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.ariaLabel}
          onClick={() => trackEvent({ event: social.event, location: 'hero' })}
          variants={item}
          whileHover={{ scale: 1.75, y: -8, rotateY: 15, rotateX: -10 }}
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
    </motion.div>
  );
});
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
    <FallingReactions />

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
