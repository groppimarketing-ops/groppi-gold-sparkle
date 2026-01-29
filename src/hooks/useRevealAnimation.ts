import { useReducedMotion } from 'framer-motion';

/**
 * Hook for consistent reveal animations across sections
 * Respects prefers-reduced-motion preference
 */
export const useRevealAnimation = () => {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const item = prefersReducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      };

  const fadeUp = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, y: 20 };

  const fadeUpVisible = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: 0 };

  const transition = {
    duration: prefersReducedMotion ? 0.1 : 0.5,
    ease: [0.25, 0.1, 0.25, 1],
  };

  return {
    container,
    item,
    fadeUp,
    fadeUpVisible,
    transition,
    prefersReducedMotion,
  };
};

export default useRevealAnimation;
