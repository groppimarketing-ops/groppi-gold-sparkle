import { memo, useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { socialIconsData } from '@/components/shared/SocialIconsPill';
import { trackEvent } from '@/utils/tracking';

interface HeroCard { src: string; label: string }

const HERO_CARDS: HeroCard[] = [
  { src: '/videos/hero/social-media.webm',     label: 'Social Media' },
  { src: '/videos/hero/ads-management.webm',   label: 'Advertising' },
  { src: '/videos/hero/reputation.webm',        label: 'Reputation' },
  { src: '/videos/hero/one-page-website.webm',  label: 'One-Page Website' },
  { src: '/videos/hero/mobile-app.webm',        label: 'Mobile App' },
];

/**
 * LazyVideo — loads video ONLY when the card enters the viewport.
 *
 * Strategy:
 * 1. IntersectionObserver with rootMargin:'50px' (tight — avoids pre-fetching
 *    cards that are off-screen).
 * 2. On intersection: imperatively set <source> src + call video.load() so the
 *    browser starts buffering exactly when needed, not a frame earlier.
 * 3. autoplay fires once canplay fires (prevents black flash).
 * 4. Gold placeholder covers the card until the video is ready.
 */
const LazyVideo = memo(({ src, label }: HeroCard) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();

        const video = videoRef.current;
        const source = sourceRef.current;
        if (!video || !source || source.src) return; // already loaded

        // Set src then imperatively trigger load — this is the key:
        // setting src alone queues it; load() makes it start immediately.
        source.src = src;
        video.load();

        const onCanPlay = () => {
          setReady(true);
          video.play().catch(() => { /* autoplay blocked — silently ignore */ });
          video.removeEventListener('canplay', onCanPlay);
        };
        video.addEventListener('canplay', onCanPlay);
      },
      { rootMargin: '50px' } // tight — only trigger when almost visible
    );

    io.observe(el);
    return () => io.disconnect();
  }, [src]);

  return (
    <div ref={containerRef} className="groppi-card" style={{ position: 'relative' }}>
      {/* Gold placeholder — visible until video is ready */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2"
        style={{
          background: 'radial-gradient(ellipse at 50% 60%, hsl(43 76% 12% / 0.95) 0%, hsl(0 0% 4%) 100%)',
          borderRadius: 'inherit',
          opacity: ready ? 0 : 1,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      >
        <div style={{ width: 40, height: 2, background: 'hsl(43 76% 52%)', borderRadius: 2, opacity: 0.7 }} />
        <span style={{ color: 'hsl(43 76% 62%)', fontSize: 13, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', textAlign: 'center', padding: '0 12px', opacity: 0.85 }}>
          {label}
        </span>
        <div style={{ width: 24, height: 1, background: 'hsl(43 76% 52%)', borderRadius: 1, opacity: 0.4 }} />
      </div>

      {/* Video — src is injected by IntersectionObserver, never pre-fetched */}
      <video
        ref={videoRef}
        muted loop playsInline
        preload="none"
        className="w-full h-full object-cover"
        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s ease' }}
      >
        <source ref={sourceRef} type="video/webm" />
      </video>
    </div>
  );
});
LazyVideo.displayName = 'LazyVideo';

const HeroSocialIcons = memo(() => (
  <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-4 md:gap-16 px-4 md:px-16 py-3 md:py-4 rounded-full"
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
        className="hero-social-icon relative flex items-center justify-center w-9 h-9 md:w-12 md:h-12 rounded-xl"
        style={{
          background: 'hsl(0 0% 4%)',
          border: '1.5px solid hsl(43 76% 52% / 0.5)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 hsl(43 76% 52% / 0.1)',
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
    {/*
      Background video — hidden on mobile (saves 3-8s load time).
      preload="metadata": fetches only the first ~20KB (duration/dimensions),
      NOT the full file. Full data streams only when autoPlay kicks in.
      On mobile: static poster image via CSS — zero video bandwidth.
    */}
    <video
      autoPlay muted loop playsInline preload="metadata"
      className="groppi-bg hidden md:block"
      poster="/images/hero-poster.png"
    >
      <source src="/videos/hero-bg.mp4" type="video/mp4" />
    </video>

    {/* Mobile: <img> — fetchpriority=high ties into the <link rel=preload> in index.html */}
    <img
      src="/images/hero-poster.png"
      alt=""
      aria-hidden="true"
      fetchPriority="high"
      decoding="sync"
      width={390}
      height={844}
      className="groppi-bg md:hidden"
      style={{ objectFit: 'cover', objectPosition: 'center' }}
    />

    <div className="groppi-overlay" />

    <div className="groppi-strip-wrap">
      <div className="groppi-strip-track">
        {HERO_CARDS.map((card, i) => (
          <LazyVideo key={`a-${i}`} src={card.src} label={card.label} />
        ))}
        {HERO_CARDS.map((card, i) => (
          <LazyVideo key={`b-${i}`} src={card.src} label={card.label} />
        ))}
      </div>
    </div>

    <HeroSocialIcons />
  </section>
));

HeroSection.displayName = 'HeroSection';
export default HeroSection;
