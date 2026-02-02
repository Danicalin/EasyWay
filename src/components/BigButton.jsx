import React from 'react';
import { motion } from 'framer-motion';

export default function BigButton({ 
  icon: Icon, 
  label, 
  onClick, 
  color = 'bg-blue-600',
  textColor = 'text-white',
  className = ''
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`
        w-full p-6 rounded-3xl shadow-lg
        flex flex-col items-center justify-center gap-4
        min-h-[140px] ${color} ${textColor} ${className}
        active:opacity-90 transition-all
        border-4 border-white/20
      `}
    >
      {Icon && <Icon className="w-16 h-16" strokeWidth={2.5} />}
      <span className="text-2xl font-bold text-center leading-tight">
        {label}
      </span>
    </motion.button>
  );
}
