import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Calendar, Navigation, Bell, Phone, Mic } from 'lucide-react';
import BigButton from '../components/BigButton';
import VoiceInput from '../components/VoiceInput';

export default function Home() {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceResult = (text) => {
    const lowerText = text.toLowerCase();
    
    if (lowerText.includes('plan') || lowerText.includes('today') || lowerText.includes('schedule')) {
      window.location.href = createPageUrl('TodaysPlan');
    } else if (lowerText.includes('go') || lowerText.includes('take') || lowerText.includes('hospital') || 
               lowerText.includes('doctor') || lowerText.includes('market') || lowerText.includes('bank')) {
      window.location.href = createPageUrl('GoSomewhere');
    } else if (lowerText.includes('remind') || lowerText.includes('reminder')) {
      window.location.href = createPageUrl('Reminders');
    } else if (lowerText.includes('help') || lowerText.includes('emergency') || lowerText.includes('call')) {
      window.location.href = createPageUrl('EmergencyHelp');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-md mx-auto">
        {/* Greeting */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 pt-4"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hello! 👋
          </h1>
          <p className="text-2xl text-gray-600">
            How can I help you today?
          </p>
        </motion.div>

        {/* Main Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Link to={createPageUrl('TodaysPlan')}>
              <BigButton
                icon={Calendar}
                label="Today's Plan"
                color="bg-blue-600"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Link to={createPageUrl('GoSomewhere')}>
              <BigButton
                icon={Navigation}
                label="Go Somewhere"
                color="bg-green-600"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link to={createPageUrl('Reminders')}>
              <BigButton
                icon={Bell}
                label="Reminders"
                color="bg-orange-500"
              />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to={createPageUrl('EmergencyHelp')}>
              <BigButton
                icon={Phone}
                label="Emergency Help"
                color="bg-red-600"
              />
            </Link>
          </motion.div>
        </div>

        {/* Voice Assistant */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="bg-white rounded-3xl shadow-lg p-6 w-full">
            <div className="flex flex-col items-center gap-4">
              <p className="text-xl text-gray-600 text-center">
                Tap to speak to me
              </p>
              <VoiceInput 
                onResult={handleVoiceResult}
                isListening={isListening}
                setIsListening={setIsListening}
              />
              {isListening && (
                <p className="text-lg text-blue-600 font-medium animate-pulse">
                  I'm listening...
                </p>
              )}
              <div className="text-center text-gray-500 text-lg">
                <p>Say things like:</p>
                <p className="font-medium text-gray-700 mt-1">
                  "What's my plan today?"
                </p>
                <p className="font-medium text-gray-700">
                  "Take me to the doctor"
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
