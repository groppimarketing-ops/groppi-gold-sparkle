import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { MediaItem } from '@/types/portfolio';

interface MediaCarouselProps {
  media: MediaItem[];
  clientName: string;
}

const MediaCarousel = memo(({ media, clientName }: MediaCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const currentMedia = media[currentIndex];
  const hasMultipleItems = media.length > 1;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
    setIsVideoPlaying(false);
  }, [media.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
    setIsVideoPlaying(false);
  }, [media.length]);

  const handleVideoToggle = useCallback(() => {
    const video = document.getElementById('carousel-video') as HTMLVideoElement;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  }, [isVideoPlaying]);

  return (
    <div className="relative w-full aspect-video bg-background/50 rounded-xl overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          {currentMedia.type === 'image' ? (
            <img
              src={currentMedia.url}
              alt={currentMedia.alt || `${clientName} - Afbeelding ${currentIndex + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="relative w-full h-full">
              <video
                id="carousel-video"
                src={currentMedia.url}
                poster={currentMedia.posterUrl}
                className="w-full h-full object-cover"
                preload="metadata"
                playsInline
                onEnded={() => setIsVideoPlaying(false)}
              />
              {/* Video play/pause overlay */}
              <button
                onClick={handleVideoToggle}
                className="absolute inset-0 flex items-center justify-center bg-background/20 hover:bg-background/30 transition-colors group"
                aria-label={isVideoPlaying ? 'Pauzeren' : 'Afspelen'}
              >
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_30px_hsl(var(--gold)/0.4)] group-hover:scale-110 transition-transform">
                  {isVideoPlaying ? (
                    <Pause className="w-7 h-7 text-primary-foreground" />
                  ) : (
                    <Play className="w-7 h-7 text-primary-foreground ml-1" />
                  )}
                </div>
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {hasMultipleItems && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card border-primary/30 hover:border-primary/60 hover:bg-primary/10 z-10"
            aria-label="Vorige afbeelding"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-card border-primary/30 hover:border-primary/60 hover:bg-primary/10 z-10"
            aria-label="Volgende afbeelding"
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </Button>
        </>
      )}

      {/* Dot Indicators */}
      {hasMultipleItems && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsVideoPlaying(false);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary w-6 shadow-[0_0_10px_hsl(var(--gold)/0.5)]'
                  : 'bg-foreground/30 hover:bg-foreground/50'
              }`}
              aria-label={`Ga naar item ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Media Counter */}
      {hasMultipleItems && (
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full glass-card text-xs font-medium z-10">
          {currentIndex + 1} / {media.length}
        </div>
      )}
    </div>
  );
});

MediaCarousel.displayName = 'MediaCarousel';

export default MediaCarousel;
