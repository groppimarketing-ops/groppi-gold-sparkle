import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface ServiceVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  serviceTitle: string;
  serviceDescription: string;
  serviceId: string;
}

const ServiceVideoModal = ({
  isOpen,
  onClose,
  videoUrl,
  serviceTitle,
  serviceDescription,
  serviceId,
}: ServiceVideoModalProps) => {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isYouTube, setIsYouTube] = useState(false);
  const [isVimeo, setIsVimeo] = useState(false);
  const [embedUrl, setEmbedUrl] = useState('');

  // Detect video type and prepare embed URL
  useEffect(() => {
    if (!videoUrl) return;

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      setIsYouTube(true);
      setIsVimeo(false);
      // Extract video ID and create embed URL
      const videoId = videoUrl.includes('youtu.be')
        ? videoUrl.split('/').pop()
        : new URLSearchParams(new URL(videoUrl).search).get('v');
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
    } else if (videoUrl.includes('vimeo.com')) {
      setIsVimeo(true);
      setIsYouTube(false);
      const videoId = videoUrl.split('/').pop();
      setEmbedUrl(`https://player.vimeo.com/video/${videoId}?autoplay=1`);
    } else {
      setIsYouTube(false);
      setIsVimeo(false);
      setEmbedUrl('');
    }
  }, [videoUrl]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setVideoLoaded(false);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Load video only when modal opens
  useEffect(() => {
    if (isOpen && videoUrl && !isYouTube && !isVimeo) {
      setVideoLoaded(true);
    }
  }, [isOpen, videoUrl, isYouTube, isVimeo]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 25,
        stiffness: 300,
      },
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            variants={backdropVariants}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-primary/20 shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--background) / 0.95), hsl(var(--background) / 0.9))',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px hsl(var(--primary) / 0.15), inset 0 0 60px hsl(var(--primary) / 0.05)',
            }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={t('services.modal.close')}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Video Section */}
            <div className="relative aspect-video bg-black/50 rounded-t-2xl overflow-hidden">
              {videoUrl ? (
                <>
                  {(isYouTube || isVimeo) ? (
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={serviceTitle}
                    />
                  ) : videoLoaded ? (
                    <video
                      ref={videoRef}
                      src={videoUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                      preload="none"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-16 h-16 rounded-full glass-card flex items-center justify-center"
                      >
                        <Play className="w-8 h-8 text-primary fill-primary" />
                      </motion.div>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-primary/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">{t('services.modal.noVideo')}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8">
              {/* Video Duration Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Clock className="w-4 h-4 text-primary" />
                <span>{t('services.modal.videoDuration')}</span>
              </div>

              {/* Service Title */}
              <h3 className="text-2xl md:text-3xl font-bold mb-4 gold-gradient-text">
                {serviceTitle}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {serviceDescription}
              </p>

              {/* Additional Info */}
              <p className="text-sm text-muted-foreground mb-8 border-l-2 border-primary/30 pl-4">
                {t('services.modal.description')}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="luxury-button flex-1">
                  <Link to={`/contact?service=${serviceId}`}>
                    {t('services.modal.cta')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onClose}
                  className="glass-button flex-1"
                >
                  {t('services.modal.close')}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceVideoModal;
