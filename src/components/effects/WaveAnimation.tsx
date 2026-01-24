import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface WaveAnimationProps {
  intensity?: 'low' | 'medium' | 'high';
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const WaveAnimation = ({ 
  intensity = 'medium', 
  speed = 'normal',
  className = '' 
}: WaveAnimationProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [isLowPerformance, setIsLowPerformance] = useState(false);

  // Detect low performance devices
  useEffect(() => {
    const checkPerformance = () => {
      // Check for low-end devices
      const isLowEnd = 
        navigator.hardwareConcurrency <= 2 ||
        (navigator as any).deviceMemory <= 2 ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setIsLowPerformance(isLowEnd);
    };
    
    checkPerformance();
  }, []);

  // Don't render on low performance devices or if user prefers reduced motion
  if (prefersReducedMotion || isLowPerformance) {
    return null;
  }

  const intensityMap = {
    low: 0.15,
    medium: 0.25,
    high: 0.4,
  };

  const speedMap = {
    slow: 12,
    normal: 8,
    fast: 5,
  };

  const opacity = intensityMap[intensity];
  const duration = speedMap[speed];

  return (
    <div 
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Primary Wave */}
      <motion.div
        className="absolute inset-0"
        style={{ willChange: 'transform' }}
      >
        <svg
          className="absolute w-[200%] h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          style={{ opacity }}
        >
          <defs>
            <linearGradient id="goldWaveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(43, 74%, 53%)" stopOpacity="0" />
              <stop offset="30%" stopColor="hsl(43, 74%, 53%)" stopOpacity="0.6" />
              <stop offset="50%" stopColor="hsl(45, 93%, 58%)" stopOpacity="1" />
              <stop offset="70%" stopColor="hsl(43, 74%, 53%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(43, 74%, 53%)" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="goldWaveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(38, 80%, 45%)" stopOpacity="0" />
              <stop offset="40%" stopColor="hsl(43, 74%, 53%)" stopOpacity="0.4" />
              <stop offset="60%" stopColor="hsl(43, 74%, 53%)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(38, 80%, 45%)" stopOpacity="0" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="20" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Wave 1 - Main flowing wave */}
          <motion.path
            d="M0,400 C360,300 720,500 1080,400 C1260,350 1350,450 1440,400 L1440,800 L0,800 Z"
            fill="url(#goldWaveGradient1)"
            filter="url(#glow)"
            initial={{ x: 0 }}
            animate={{ x: [0, -720, 0] }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Wave 2 - Secondary wave with offset */}
          <motion.path
            d="M0,500 C240,400 480,600 720,500 C960,400 1200,600 1440,500 L1440,800 L0,800 Z"
            fill="url(#goldWaveGradient2)"
            filter="url(#glow)"
            initial={{ x: -360 }}
            animate={{ x: [-360, 360, -360] }}
            transition={{
              duration: duration * 1.3,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </svg>
      </motion.div>

      {/* Diagonal Light Ray */}
      <motion.div
        className="absolute top-0 -left-1/2 w-[200%] h-full"
        style={{ 
          willChange: 'transform, opacity',
          background: `linear-gradient(
            135deg,
            transparent 0%,
            transparent 40%,
            hsl(43, 74%, 53%, 0.08) 45%,
            hsl(45, 93%, 58%, 0.15) 50%,
            hsl(43, 74%, 53%, 0.08) 55%,
            transparent 60%,
            transparent 100%
          )`,
        }}
        initial={{ x: '-100%', opacity: 0 }}
        animate={{ 
          x: ['100%', '-100%'],
          opacity: [0, opacity * 2, opacity * 2, 0],
        }}
        transition={{
          duration: duration * 3,
          repeat: Infinity,
          ease: 'easeInOut',
          times: [0, 0.1, 0.9, 1],
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4 + (i % 3) * 2,
              height: 4 + (i % 3) * 2,
              left: `${15 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              background: `radial-gradient(circle, hsl(45, 93%, 58%) 0%, transparent 70%)`,
              willChange: 'transform, opacity',
              opacity: opacity * 0.8,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 10, 0],
              scale: [1, 1.2, 1],
              opacity: [opacity * 0.5, opacity, opacity * 0.5],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* Bottom Glow Effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{
          background: `radial-gradient(
            ellipse 100% 100% at 50% 100%,
            hsl(43, 74%, 53%, ${opacity * 0.4}) 0%,
            transparent 70%
          )`,
        }}
      />
    </div>
  );
};

export default WaveAnimation;
