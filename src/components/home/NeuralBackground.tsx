/**
 * NeuralBackground — replaced with pure CSS, no framer-motion.
 * The animated light rays, orb pulse, and SVG paths are now CSS @keyframes.
 */
const NeuralBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="neural-lines" />
    <div className="neural-bg" />

    {/* Static corner glows — no JS */}
    <div
      className="absolute w-[400px] h-[400px] rounded-full opacity-30"
      style={{
        background: 'radial-gradient(circle, hsl(43 100% 50% / 0.1) 0%, transparent 50%)',
        top: '-10%', right: '-10%',
      }}
    />
    <div
      className="absolute w-[400px] h-[400px] rounded-full opacity-30"
      style={{
        background: 'radial-gradient(circle, hsl(43 100% 50% / 0.1) 0%, transparent 50%)',
        bottom: '-10%', left: '-10%',
      }}
    />
  </div>
);

export default NeuralBackground;
