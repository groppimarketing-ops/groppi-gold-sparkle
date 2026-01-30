import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface GoldAnimatedBackgroundProps {
  className?: string;
  showVignette?: boolean;
  intensity?: 'subtle' | 'medium' | 'strong';
}

/**
 * GoldAnimatedBackground - Premium animated gold background effect
 * Features: 
 * - 3 soft gold gradient blobs with slow movement
 * - 1 subtle shimmer sweep effect
 * - Tiny gold dust particles (bokeh)
 * - Optional animated vignette around edges
 * 
 * Use inside a section with position: relative and overflow: hidden
 */
const GoldAnimatedBackground = memo(({ 
  className = '', 
  showVignette = true,
  intensity = 'medium' 
}: GoldAnimatedBackgroundProps) => {
  const prefersReducedMotion = useReducedMotion();

  // Intensity-based opacity values
  const opacityMap = {
    subtle: { blob: 0.06, shimmer: 0.04, particle: 0.3, vignette: 0.08 },
    medium: { blob: 0.10, shimmer: 0.06, particle: 0.4, vignette: 0.12 },
    strong: { blob: 0.15, shimmer: 0.08, particle: 0.5, vignette: 0.18 },
  };
  
  const opacity = opacityMap[intensity];

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div 
        className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        {/* Static subtle gold overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 50% 50% at 50% 50%, hsl(43 76% 52% / ${opacity.blob}) 0%, transparent 70%)`
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Blob 1 - Top Left */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(43 76% 52% / ${opacity.blob}) 0%, transparent 70%)`,
          filter: 'blur(80px)',
          left: '-15%',
          top: '-20%',
        }}
        animate={{
          x: [0, 80, 40, 0],
          y: [0, 40, 80, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Blob 2 - Center Right */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(45 100% 60% / ${opacity.blob * 0.8}) 0%, transparent 70%)`,
          filter: 'blur(100px)',
          right: '-10%',
          top: '30%',
        }}
        animate={{
          x: [0, -60, -30, 0],
          y: [0, 60, 20, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Blob 3 - Bottom Center */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(40 80% 50% / ${opacity.blob * 0.7}) 0%, transparent 70%)`,
          filter: 'blur(90px)',
          left: '30%',
          bottom: '-15%',
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -50, -20, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Shimmer Sweep - Diagonal moving highlight */}
      <motion.div
        className="absolute w-[200%] h-full"
        style={{
          background: `linear-gradient(
            115deg,
            transparent 0%,
            transparent 40%,
            hsl(43 100% 70% / ${opacity.shimmer}) 50%,
            transparent 60%,
            transparent 100%
          )`,
          left: '-100%',
        }}
        animate={{
          x: ['0%', '100%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          repeatDelay: 3,
        }}
      />

      {/* Gold Dust Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            background: `hsl(43 100% 60% / ${opacity.particle})`,
            filter: 'blur(0.5px)',
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            opacity: [opacity.particle * 0.5, opacity.particle, opacity.particle * 0.5],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Animated Gold Vignette */}
      {showVignette && (
        <>
          {/* Top vignette */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-32"
            style={{
              background: `linear-gradient(to bottom, hsl(43 76% 52% / ${opacity.vignette}) 0%, transparent 100%)`,
            }}
            animate={{
              opacity: [opacity.vignette, opacity.vignette * 1.5, opacity.vignette],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          
          {/* Bottom vignette */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-32"
            style={{
              background: `linear-gradient(to top, hsl(43 76% 52% / ${opacity.vignette}) 0%, transparent 100%)`,
            }}
            animate={{
              opacity: [opacity.vignette, opacity.vignette * 1.3, opacity.vignette],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          
          {/* Left vignette */}
          <motion.div
            className="absolute top-0 bottom-0 left-0 w-24"
            style={{
              background: `linear-gradient(to right, hsl(43 76% 52% / ${opacity.vignette * 0.7}) 0%, transparent 100%)`,
            }}
            animate={{
              opacity: [opacity.vignette * 0.7, opacity.vignette, opacity.vignette * 0.7],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
          
          {/* Right vignette */}
          <motion.div
            className="absolute top-0 bottom-0 right-0 w-24"
            style={{
              background: `linear-gradient(to left, hsl(43 76% 52% / ${opacity.vignette * 0.7}) 0%, transparent 100%)`,
            }}
            animate={{
              opacity: [opacity.vignette * 0.7, opacity.vignette, opacity.vignette * 0.7],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          />
        </>
      )}

      {/* Soft glow layer for cards (very subtle ambient) */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 40% at 50% 60%, hsl(43 76% 52% / ${opacity.blob * 0.4}) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
});

GoldAnimatedBackground.displayName = 'GoldAnimatedBackground';

export default GoldAnimatedBackground;
