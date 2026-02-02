import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Clock, 
  Bus, 
  Navigation as NavIcon, 
  ArrowRight, 
  Volume2,
  CheckCircle,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import VoiceButton from '../components/VoiceButton';
import BackButton from '../components/BackButton';

const sampleSteps = [
  { instruction: "Exit your home and turn right", duration: "2 min" },
  { instruction: "Walk straight until you see the bus stop", duration: "5 min" },
  { instruction: "Take Bus Number 42", duration: "15 min", isBus: true },
  { instruction: "Get off at City Center stop", duration: "" },
  { instruction: "Walk 100 meters to your destination", duration: "3 min" },
];

export default function Navigation() {
  const params = new URLSearchParams(window.location.search);
  const placeName = params.get('place') || 'Destination';
  const address = params.get('address') || '';
  const placeType = params.get('type') || 'other';

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentInstruction = sampleSteps[currentStep];

  const handleNextStep = () => {
    if (currentStep < sampleSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      
      // Speak the next instruction
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(sampleSteps[currentStep + 1].instruction);
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setCompleted(true);
    }
  };

  const speakCurrentStep = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentInstruction.instruction);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Speak first instruction on load
  useEffect(() => {
    setTimeout(speakCurrentStep, 500);
  }, []);

  if (completed) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-100 to-white p-6">
        <div className="max-w-md mx-auto text-center py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-8"
          >
            <CheckCircle className="w-32 h-32 text-green-500 mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            You've Arrived! 🎉
          </h1>
          <p className="text-2xl text-gray-600 mb-8">
            You reached {placeName}
          </p>
          <Link to={createPageUrl('Home')}>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="
                w-full p-6 rounded-3xl
                bg-blue-600 text-white
                text-2xl font-bold
                flex items-center justify-center gap-3
                shadow-xl
              "
            >
              <Home className="w-10 h-10" />
              Go Home
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <BackButton to="GoSomewhere" label="Back" />
        </div>

        {/* Destination Card */}
        <div className="bg-green-600 text-white rounded-3xl p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-4">
            <MapPin className="w-12 h-12" />
            <div>
              <p className="text-lg opacity-90">Going to</p>
              <h1 className="text-3xl font-bold">{placeName}</h1>
            </div>
          </div>
          
          {/* Time Estimate */}
          <div className="flex items-center gap-3 mt-4 bg-white/20 rounded-2xl p-3">
            <Clock className="w-8 h-8" />
            <div>
              <p className="text-lg">Estimated time</p>
              <p className="text-2xl font-bold">25 minutes</p>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-6">
          {sampleSteps.map((_, index) => (
            <div
              key={index}
              className={`
                h-3 rounded-full transition-all
                ${index <= currentStep ? 'bg-blue-600 w-8' : 'bg-gray-300 w-3'}
              `}
            />
          ))}
        </div>

        {/* Current Step */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg text-gray-500">
              Step {currentStep + 1} of {sampleSteps.length}
            </span>
            <VoiceButton text={currentInstruction.instruction} size="large" />
          </div>

          {currentInstruction.isBus && (
            <div className="bg-blue-100 rounded-2xl p-4 mb-4 flex items-center gap-3">
              <Bus className="w-12 h-12 text-blue-600" />
              <span className="text-2xl font-bold text-blue-800">Bus 42</span>
            </div>
          )}

          <p className="text-2xl font-bold text-gray-800 leading-relaxed">
            {currentInstruction.instruction}
          </p>

          {currentInstruction.duration && (
            <div className="flex items-center gap-2 mt-4 text-xl text-gray-600">
              <Clock className="w-6 h-6" />
              <span>{currentInstruction.duration}</span>
            </div>
          )}
        </motion.div>

        {/* Next Step Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleNextStep}
          className="
            w-full p-6 rounded-3xl
            bg-blue-600 text-white
            text-2xl font-bold
            flex items-center justify-center gap-4
            shadow-xl
          "
        >
          {currentStep < sampleSteps.length - 1 ? (
            <>
              <span>Next Step</span>
              <ArrowRight className="w-10 h-10" />
            </>
          ) : (
            <>
              <span>I've Arrived</span>
              <CheckCircle className="w-10 h-10" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}
