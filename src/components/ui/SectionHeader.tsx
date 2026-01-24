import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
}

const SectionHeader = ({ title, subtitle, description, centered = true }: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${centered ? 'text-center' : ''}`}
    >
      {subtitle && (
        <span className="text-primary font-medium text-sm uppercase tracking-wider mb-2 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold gold-gradient-text mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          {description}
        </p>
      )}
      <div className="mt-6 flex justify-center gap-1">
        <div className="w-12 h-1 bg-primary rounded-full" />
        <div className="w-3 h-1 bg-primary/50 rounded-full" />
        <div className="w-1 h-1 bg-primary/30 rounded-full" />
      </div>
    </motion.div>
  );
};

export default SectionHeader;
