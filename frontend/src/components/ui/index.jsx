import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div 
      whileHover={hoverEffect ? { y: -4, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)' } : {}}
      className={`bg-gradient-to-br from-gray-900/80 to-gray-950/80 border border-gray-800/50 rounded-2xl p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 ${className}`}
    >
      {children}
    </motion.div>
  );
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20',
    secondary: 'bg-gray-800 text-gray-100 hover:bg-gray-700',
    outline: 'border border-gray-700 text-gray-300 hover:bg-gray-800',
    ghost: 'text-gray-400 hover:bg-gray-800 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg font-semibold',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
