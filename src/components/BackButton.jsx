import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BackButton({ to = 'Home', label = 'Back' }) {
  return (
    <Link to={createPageUrl(to)}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        className="
          flex items-center gap-3
          px-6 py-4 rounded-2xl
          bg-gray-200 text-gray-800
          text-xl font-bold
          shadow-md
        "
      >
        <ArrowLeft className="w-8 h-8" strokeWidth={2.5} />
        {label}
      </motion.button>
    </Link>
  );
}
