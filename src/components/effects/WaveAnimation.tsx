interface WaveAnimationProps {
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

/**
 * Lightweight gold ambient glow — pure CSS, no JS animations.
 * Always rendered in the DOM to prevent CLS (no conditional JS removal).
 * Hidden via CSS @media (prefers-reduced-motion: reduce) at display layer.
 */
const WaveAnimation = ({ intensity = 'medium', className = '' }: WaveAnimationProps) => {
  const opacityMap = { low: 0.08, medium: 0.14, high: 0.22 };
  const opacity = opacityMap[intensity];

  return (
    <div
      className={`absolute inset-0 pointer-events-none wave-animation-root ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-72"
        style={{
          background: `radial-gradient(ellipse 120% 100% at 50% 100%, hsl(43 74% 53% / ${opacity}) 0%, transparent 70%)`,
        }}
      />
      {/* Top-right accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-1/2"
        style={{
          background: `radial-gradient(ellipse at 80% 20%, hsl(43 74% 53% / ${opacity * 0.4}) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
};

export default WaveAnimation;
