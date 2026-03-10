import { useState, useCallback, memo, useRef, useEffect } from 'react';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Filter out duplicate media items by URL
  const uniqueMedia = media.filter((item, index, arr) => 
    arr.findIndex(m => m.url === item.url) === index
  );

  const currentMedia = uniqueMedia[currentIndex];
  const hasMultipleItems = uniqueMedia.length > 1;

  // Determine if current media is vertical (9:16)
  const isVertical = currentMedia?.aspectRatio === '9:16';

  // Reset video when navigating
  useEffect(() => {
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [currentIndex]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? uniqueMedia.length - 1 : prev - 1));
  }, [uniqueMedia.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === uniqueMedia.length - 1 ? 0 : prev + 1));
  }, [uniqueMedia.length]);

  const handleVideoToggle = useCallback(() => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  }, [isVideoPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  if (!currentMedia) return null;

  return (
    <div className="relative w-full aspect-video bg-background/80 rounded-t-2xl overflow-hidden">
      {/* Blurred background for non-16:9 content */}
      {(isVertical || currentMedia.aspectRatio === '4:5' || currentMedia.aspectRatio === '1:1') && (
        <div 
          className="absolute inset-0 scale-110 blur-2xl opacity-30"
          style={{
            backgroundImage: currentMedia.type === 'image' 
              ? `url(${currentMedia.url})` 
              : currentMedia.posterUrl 
                ? `url(${currentMedia.posterUrl})` 
                : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {currentMedia.type === 'image' ? (
            <img
              src={currentMedia.url}
              alt={currentMedia.alt || `${clientName} - Afbeelding ${currentIndex + 1}`}
              className={`max-w-full max-h-full ${
                isVertical 
                  ? 'h-full w-auto object-contain' 
                  : 'w-full h-full object-cover'
              }`}
              loading="lazy"
              decoding="async"
              width={isVertical ? 400 : 800}
              height={isVertical ? 711 : 450}
            />
          ) : (
            <div className={`relative ${isVertical ? 'h-full w-auto' : 'w-full h-full'} flex items-center justify-center`}>
              <video
                ref={videoRef}
                src={currentMedia.url}
                poster={currentMedia.posterUrl}
                className={`${
                  isVertical 
                    ? 'h-full w-auto max-h-full object-contain' 
                    : 'w-full h-full object-cover'
                }`}
                preload="metadata"
                playsInline
                onEnded={() => setIsVideoPlaying(false)}
              />
              {/* Video play/pause overlay */}
              <button
                onClick={handleVideoToggle}
                className="absolute inset-0 flex items-center justify-center bg-background/10 hover:bg-background/20 transition-colors group"
                aria-label={isVideoPlaying ? 'Pauzeren' : 'Afspelen'}
              >
                {!isVideoPlaying && (
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 flex items-center justify-center shadow-[0_0_30px_hsl(var(--gold)/0.4)] group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-primary-foreground ml-1" />
                  </div>
                )}
                {isVideoPlaying && (
                  <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Pause className="w-5 h-5 text-primary-foreground" />
                  </div>
                )}
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

      {/* Thumbnail Strip */}
      {hasMultipleItems && uniqueMedia.length <= 12 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 p-2 rounded-lg glass-card max-w-[90%] overflow-x-auto">
          {uniqueMedia.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative w-12 h-12 md:w-14 md:h-14 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                index === currentIndex
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`Ga naar item ${index + 1}`}
            >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                  width={56}
                  height={56}
                />
              ) : (
                <>
                  <img
                    src={item.posterUrl || item.url}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={56}
                    height={56}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                    <Play className="w-3 h-3 text-primary" />
                  </div>
                </>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Dot Indicators for many items */}
      {hasMultipleItems && uniqueMedia.length > 12 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {uniqueMedia.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
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
          {currentIndex + 1} / {uniqueMedia.length}
        </div>
      )}

      {/* Media Type Indicator */}
      {currentMedia.type === 'video' && (
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full glass-card text-xs font-medium z-10 flex items-center gap-1.5">
          <Play className="w-3 h-3 text-primary" />
          Video
        </div>
      )}
    </div>
  );
});

MediaCarousel.displayName = 'MediaCarousel';

export default MediaCarousel;
