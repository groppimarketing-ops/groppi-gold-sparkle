import { memo, useRef, useEffect, useState, useCallback } from 'react';
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
 * useUserInteracted — resolves to `true` on the first scroll, pointer,
 * touch, or keydown event. All listeners are passive + once.
 */
function useUserInteracted(): boolean {
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (interacted) return;

    const trigger = () => setInteracted(true);
    const opts: AddEventListenerOptions = { passive: true, once: true, capture: true };

    window.addEventListener('scroll',      trigger, opts);
    window.addEventListener('pointerdown', trigger, opts);
    window.addEventListener('touchstart',  trigger, opts);
    window.addEventListener('keydown',     trigger, opts);

    return () => {
      window.removeEventListener('scroll',      trigger, { capture: true });
      window.removeEventListener('pointerdown', trigger, { capture: true });
      window.removeEventListener('touchstart',  trigger, { capture: true });
      window.removeEventListener('keydown',     trigger, { capture: true });
    };
  }, [interacted]);

  return interacted;
}

/**
 * LazyVideo — loads video ONLY when:
 *   1. User has interacted (scroll / pointer / touch / key), AND
 *   2. The card enters the viewport (IntersectionObserver).
 *
 * Until interaction: card stays at gold placeholder — zero network cost.
 * After interaction: IO fires as normal with rootMargin:'50px'.
 */
const LazyVideo = memo(({ src, label, interacted }: HeroCard & { interacted: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef     = useRef<HTMLVideoElement>(null);
  const sourceRef    = useRef<HTMLSourceElement>(null);
  const [ready, setReady] = useState(false);
  const ioRef = useRef<IntersectionObserver | null>(null);

  const startLoad = useCallback(() => {
    const video  = videoRef.current;
    const source = sourceRef.current;
    if (!video || !source || source.src) return; // already loaded

    source.src = src;
    video.load();

    const onCanPlay = () => {
      setReady(true);
      video.play().catch(() => { /* autoplay blocked — silent */ });
      video.removeEventListener('canplay', onCanPlay);
    };
    video.addEventListener('canplay', onCanPlay);
  }, [src]);

  // Wire up IntersectionObserver only after first interaction
  useEffect(() => {
    if (!interacted) return;

    const el = containerRef.current;
    if (!el) return;

    ioRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        ioRef.current?.disconnect();
        startLoad();
      },
      { rootMargin: '50px' }
    );

    ioRef.current.observe(el);
    return () => ioRef.current?.disconnect();
  }, [interacted, startLoad]);

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

      {/* Video — src injected only after interaction + intersection */}
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

/**
 * HeroBgVideo — background video on desktop.
 * Defers ALL network activity until first user interaction.
 * Before that: only the poster image is shown (already preloaded in index.html).
 */
const HeroBgVideo = memo(({ interacted }: { interacted: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcSet, setSrcSet] = useState(false);

  useEffect(() => {
    if (!interacted || srcSet) return;

    const video = videoRef.current;
    if (!video) return;

    // Inject source + trigger load only after interaction
    const source = document.createElement('source');
    source.src  = '/videos/hero-bg.mp4';
    source.type = 'video/mp4';
    video.appendChild(source);
    video.load();

    setSrcSet(true);
  }, [interacted, srcSet]);

  return (
    <video
      ref={videoRef}
      autoPlay muted loop playsInline
      preload="none"                    /* was "metadata" — now fully deferred */
      className="groppi-bg hidden md:block"
      poster="/images/hero-poster.png"
    />
  );
});
HeroBgVideo.displayName = 'HeroBgVideo';

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

const HeroSection = memo(() => {
  const interacted = useUserInteracted();

  return (
    <section className="groppi-hero-pro" aria-label="GROPPI Hero Videos">
      {/*
        Desktop: background video — deferred until first interaction.
        Poster image (preloaded in index.html) covers the gap seamlessly.
      */}
      <HeroBgVideo interacted={interacted} />

      {/* Mobile: static poster — zero video bandwidth */}
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
            <LazyVideo key={`a-${i}`} src={card.src} label={card.label} interacted={interacted} />
          ))}
          {HERO_CARDS.map((card, i) => (
            <LazyVideo key={`b-${i}`} src={card.src} label={card.label} interacted={interacted} />
          ))}
        </div>
      </div>

      <HeroSocialIcons />
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;
