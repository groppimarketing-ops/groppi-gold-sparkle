import { memo, useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LangLink from '@/components/LangLink';

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
    if (!video || !source || source.src) return;

    source.src = src;
    video.load();

    const onCanPlay = () => {
      setReady(true);
      video.play().catch(() => {});
      video.removeEventListener('canplay', onCanPlay);
    };
    video.addEventListener('canplay', onCanPlay);
  }, [src]);

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
 */
const HeroBgVideo = memo(({ interacted }: { interacted: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [srcSet, setSrcSet] = useState(false);

  useEffect(() => {
    if (!interacted || srcSet) return;

    const video = videoRef.current;
    if (!video) return;

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
      preload="none"
      className="groppi-bg hidden md:block"
      poster="/images/hero-poster.webp"
    />
  );
});
HeroBgVideo.displayName = 'HeroBgVideo';

const HeroSection = memo(() => {
  const interacted = useUserInteracted();
  const { t } = useTranslation();

  return (
    <section className="groppi-hero-pro" aria-labelledby="hero-heading">
      <HeroBgVideo interacted={interacted} />

      <picture className="groppi-bg md:hidden">
        <source
          srcSet="/images/hero-poster-mobile.webp 390w, /images/hero-poster.webp 768w"
          sizes="(max-width: 767px) 390px, 768px"
          type="image/webp"
          media="(max-width: 767px)"
        />
        <source srcSet="/images/hero-poster.webp" type="image/webp" />
        <img
          src="/images/hero-poster.png"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="sync"
          width={390}
          height={844}
          style={{ objectFit: 'cover', objectPosition: 'center', width: '100%', height: '100%' }}
        />
      </picture>

      <div className="groppi-overlay" />

      {/* Hero Content — headline, subheadline, CTA */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <div className="pointer-events-auto max-w-3xl mx-auto mb-20 md:mb-28 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs font-semibold uppercase tracking-[0.15em]"
            style={{
              background: 'hsl(43 76% 52% / 0.12)',
              border: '1px solid hsl(43 76% 52% / 0.3)',
              color: 'hsl(43 76% 62%)',
            }}
          >
            {t('home.heroNew.badge', 'Structure. Content. Growth.')}
          </div>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-5 gold-shimmer-text"
          >
            {t('home.heroNew.headline', 'We build your digital foundation — and scale your growth.')}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('home.heroNew.subtitle', 'We help Belgian businesses grow with a clear approach: strategy, branding and performance — without wasted budgets or vague promises.')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button asChild size="lg" className="luxury-button text-primary-foreground px-8 py-3 text-base font-semibold">
              <LangLink to="/services">
                {t('home.heroNew.ctaPrimary', 'View services & pricing')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </LangLink>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 px-8 py-3 text-base font-semibold">
              <LangLink to="/contact">
                {t('home.heroNew.ctaSecondary', 'Request a quote')}
              </LangLink>
            </Button>
          </div>
        </div>
      </div>

      {/* Service card strip */}
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
    </section>
  );
});

HeroSection.displayName = 'HeroSection';
export default HeroSection;
