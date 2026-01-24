import { motion } from 'framer-motion';

const GoldenWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Wave 1 */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-1/4 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(43 100% 50% / 0.5), transparent)',
          boxShadow: '0 0 20px hsl(43 100% 50% / 0.3)',
        }}
      />
      
      {/* Wave 2 */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
        className="absolute top-1/3 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(45 100% 70% / 0.4), transparent)',
          boxShadow: '0 0 15px hsl(45 100% 70% / 0.2)',
        }}
      />
      
      {/* Wave 3 */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
          delay: 4,
        }}
        className="absolute top-2/3 left-0 w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(40 70% 35% / 0.6), transparent)',
          boxShadow: '0 0 25px hsl(40 70% 35% / 0.3)',
        }}
      />
      
      {/* Radial Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        style={{
          background: 'radial-gradient(circle, hsl(43 100% 50% / 0.05) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default GoldenWaves;
