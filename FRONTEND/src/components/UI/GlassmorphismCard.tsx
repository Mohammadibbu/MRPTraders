import React from 'react';
import { motion } from 'framer-motion';

interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gradient?: boolean;
}

const GlassmorphismCard: React.FC<GlassmorphismCardProps> = ({
  children,
  className = '',
  hover = true,
  gradient = false
}) => {
  const baseClasses = `
    backdrop-blur-lg bg-white/10 
    border border-white/20 
    rounded-xl shadow-xl
    ${gradient ? 'bg-gradient-to-br from-white/20 to-white/5' : ''}
    ${className}
  `;

  if (hover) {
    return (
      <motion.div
        className={baseClasses}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(95, 26, 53, 0.25)',
          borderColor: 'rgba(204, 187, 174, 0.4)'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

export default GlassmorphismCard;