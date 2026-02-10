import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getVideoIdBySlug, buildDrivePreviewUrl } from '@/data/serviceVideos';

interface ServiceVideoPreviewProps {
  serviceId: string;
  /** Open the full video modal — now unused, kept for backward compat */
  onClickPlay?: () => void;
}

/**
 * Compact video preview for service cards.
 *
 * Desktop: on hover → mount Google Drive iframe (muted preview).
 * Mobile:  static dark placeholder with play icon; tap opens modal.
 *
 * - Lazy: only becomes "ready" when visible via IntersectionObserver.
 * - Respects prefers-reduced-motion (no hover preview).
 * - Unmounts iframe on mouse leave to save CPU.
 */
const ServiceVideoPreview = memo(({ serviceId, onClickPlay }: ServiceVideoPreviewProps) => {
  const gdriveId = getVideoIdBySlug(serviceId);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced-motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // IntersectionObserver – mark "near viewport" once
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!prefersReducedMotion) setIsHovering(true);
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  // No video mapped → render nothing (card stays unchanged)
  if (!gdriveId) return null;

  const showIframe = isNearViewport && isHovering && !prefersReducedMotion;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video rounded-lg overflow-hidden cursor-pointer mb-4 border border-primary/10 bg-background/40 transition-shadow duration-300"
      style={{
        boxShadow: isHovering
          ? '0 0 24px hsl(var(--primary) / 0.25)'
          : '0 0 0px transparent',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/services/${serviceId}#video`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/services/${serviceId}#video`);
        }
      }}
      aria-label="Watch video preview"
    >
      {/* Iframe – mounted only on hover (desktop) */}
      <AnimatePresence>
        {showIframe && (
          <motion.div
            className="absolute inset-0 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <iframe
              src={buildDrivePreviewUrl(gdriveId)}
              className="w-full h-full pointer-events-none"
              allow="autoplay; encrypted-media"
              loading="lazy"
              title="Service preview"
              style={{ border: 'none' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static placeholder (visible when iframe is NOT shown) */}
      {!showIframe && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/[0.06] to-background/80">
          <motion.div
            className="w-12 h-12 rounded-full glass-card flex items-center justify-center"
            style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.2)' }}
            animate={
              prefersReducedMotion
                ? {}
                : { scale: [1, 1.08, 1] }
            }
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          >
            <Play className="w-5 h-5 text-primary fill-primary/30 ml-0.5" />
          </motion.div>
        </div>
      )}

      {/* Subtle gold border glow on hover */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300 border border-primary/0"
        style={{
          borderColor: isHovering ? 'hsl(var(--primary) / 0.4)' : 'transparent',
          opacity: isHovering ? 1 : 0,
        }}
      />
    </div>
  );
});

ServiceVideoPreview.displayName = 'ServiceVideoPreview';

export default ServiceVideoPreview;
