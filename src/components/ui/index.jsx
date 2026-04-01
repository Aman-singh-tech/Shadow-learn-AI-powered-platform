import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hoverEffect = true }) => {
  return (
    <motion.div 
      whileHover={hoverEffect ? { y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } : {}}
      className={`bg-white border border-gray-200 rounded-xl p-6 shadow-sm transition-all duration-300 ${className}`}
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
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
