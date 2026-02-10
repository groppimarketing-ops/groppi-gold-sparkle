import { memo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Google Drive file ID for the brand / intro video.
 * Language-independent — admin can swap the ID here.
 */
const BRAND_VIDEO_DRIVE_ID = '11TCn7_cr1UDvJbkx2X56uWUAFI_jB_Wb';

function buildDrivePreview(id: string) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

const WhoWeAreSection = memo(() => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar' || i18n.language === 'ur';
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCta = useCallback(() => {
    navigate('/services');
  }, [navigate]);

  return (
    <>
      <section
        className="relative py-16 md:py-24 bg-background overflow-hidden"
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* ── Left: Text ── */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.5 }}
              className={isRtl ? 'text-right' : 'text-left'}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold gold-gradient-text mb-5 heading-balanced">
                {t('home.whoWeAre.headline')}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed whitespace-pre-line mb-8 max-w-lg">
                {t('home.whoWeAre.subtext')}
              </p>
              <Button
                onClick={handleCta}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md font-medium"
              >
                {t('home.whoWeAre.cta')}
              </Button>
            </motion.div>

            {/* ── Right: Video Thumbnail ── */}
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: prefersReducedMotion ? 0.1 : 0.6, delay: 0.1 }}
            >
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative w-full aspect-video rounded-xl overflow-hidden border border-primary/20 bg-black group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                style={{ boxShadow: '0 0 30px hsl(var(--primary) / 0.15)' }}
                aria-label={t('home.whoWeAre.videoAlt')}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Gold play button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <motion.div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 border-primary/60 bg-background/20 backdrop-blur-sm"
                    style={{ boxShadow: '0 0 24px hsl(var(--primary) / 0.35)' }}
                    animate={
                      prefersReducedMotion ? {} : { scale: [1, 1.06, 1] }
                    }
                    transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                  >
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-primary fill-primary/30 ml-1" />
                  </motion.div>
                </div>

                {/* Subtle gold glow border on hover */}
                <div className="absolute inset-0 rounded-xl pointer-events-none border border-primary/0 group-hover:border-primary/40 transition-all duration-500" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </section>

      {/* ── Fullscreen Video Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center p-4 md:p-6"
          style={{ background: 'rgba(0,0,0,0.95)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
          onKeyDown={(e) => { if (e.key === 'Escape') setModalOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-label={t('home.whoWeAre.videoAlt')}
          tabIndex={-1}
          ref={(el) => el?.focus()}
        >
          {/* Video container – centered, responsive */}
          <div
            className="relative w-full rounded-lg overflow-hidden border border-primary/25"
            style={{
              maxWidth: 'min(92vw, 1100px)',
              maxHeight: '88vh',
              aspectRatio: '16 / 9',
              boxShadow: '0 0 40px hsl(var(--primary) / 0.2), 0 0 80px hsl(var(--primary) / 0.08)',
            }}
          >
            {/* Close button – inside container, top-right */}
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-3 z-50 w-10 h-10 rounded-full flex items-center justify-center bg-background/30 backdrop-blur-sm border border-primary/40 text-primary hover:bg-background/50 hover:border-primary/70 transition-all duration-200"
              style={{ boxShadow: '0 0 12px hsl(var(--primary) / 0.3)' }}
              aria-label={t('common.close', 'Close')}
            >
              <X className="w-5 h-5" />
            </button>

            <iframe
              src={buildDrivePreview(BRAND_VIDEO_DRIVE_ID)}
              className="w-full h-full bg-black"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title={t('home.whoWeAre.videoAlt')}
              style={{ border: 'none', objectFit: 'contain' }}
            />
          </div>
        </div>
      )}
    </>
  );
});

WhoWeAreSection.displayName = 'WhoWeAreSection';

export default WhoWeAreSection;
