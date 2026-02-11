import { memo, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const STORAGE_KEY = 'about_video_seen';
const BRAND_VIDEO_DRIVE_ID = '1PJtjbRL1bi1CSQJ7F1OqsxHn7d-1Na9m';
const DELAY_MS = 1800;

function buildDrivePreview(id: string) {
  return `https://drive.google.com/file/d/${id}/preview`;
}

const BrandVideoPopup = memo(() => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === 'true') return;
    } catch {
      return;
    }
    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch { /* private browsing */ }
  }, []);

  // ESC key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, close]);

  // Prevent body scroll while open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          role="dialog"
          aria-modal="true"
          aria-label={t('home.whoWeAre.videoAlt', 'Brand video')}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

          {/* Video container with gold glow */}
          <motion.div
            className="relative w-full rounded-xl overflow-hidden border border-primary/25"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              maxWidth: 'min(92vw, 1000px)',
              maxHeight: '80vh',
              aspectRatio: '16 / 9',
              boxShadow:
                '0 0 40px hsl(var(--primary) / 0.25), 0 0 80px hsl(var(--primary) / 0.1)',
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={close}
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
              title={t('home.whoWeAre.videoAlt', 'Brand video')}
              style={{ border: 'none' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

BrandVideoPopup.displayName = 'BrandVideoPopup';

export default BrandVideoPopup;
