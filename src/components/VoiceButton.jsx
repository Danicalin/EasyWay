import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function VoiceButton({ text, size = 'normal' }) {
  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if ('speechSynthesis' in window) {
      if (speaking) {
        window.speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  const sizeClasses = size === 'large' 
    ? 'p-5 rounded-2xl' 
    : 'p-3 rounded-xl';

  const iconSize = size === 'large' ? 'w-10 h-10' : 'w-8 h-8';

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={speak}
      className={`
        ${sizeClasses}
        ${speaking ? 'bg-orange-500' : 'bg-blue-500'}
        text-white shadow-lg
        flex items-center justify-center
        active:opacity-80
      `}
      aria-label={speaking ? "Stop speaking" : "Read aloud"}
    >
      {speaking ? (
        <VolumeX className={iconSize} />
      ) : (
        <Volume2 className={iconSize} />
      )}
    </motion.button>
  );
}
