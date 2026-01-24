import { motion } from 'framer-motion';

const GoldenPillars = () => {
  const pillars = [
    { left: '20%', delay: 0, height: '70%' },
    { left: '50%', delay: 0.2, height: '85%' },
    { left: '80%', delay: 0.4, height: '65%' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pillars.map((pillar, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{
            duration: 1.2,
            delay: pillar.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            left: pillar.left,
            height: pillar.height,
          }}
          className="absolute bottom-0 w-16 md:w-24 -translate-x-1/2 origin-bottom"
        >
          {/* Main Pillar */}
          <motion.div
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.5,
            }}
            className="w-full h-full golden-pillar rounded-t-full"
            style={{
              boxShadow: `
                0 0 30px hsl(43 100% 50% / 0.3),
                0 0 60px hsl(43 100% 50% / 0.2),
                0 0 90px hsl(43 100% 50% / 0.1),
                inset 0 0 30px hsl(45 100% 70% / 0.2)
              `,
            }}
          />
          
          {/* Glow Effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
            className="absolute inset-0 rounded-t-full"
            style={{
              background: `radial-gradient(ellipse at center, hsl(43 100% 50% / 0.3) 0%, transparent 70%)`,
              filter: 'blur(20px)',
            }}
          />
          
          {/* Shimmer Effect */}
          <motion.div
            animate={{
              y: ['100%', '-100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.4,
              ease: 'linear',
            }}
            className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-white/20 to-transparent"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GoldenPillars;
