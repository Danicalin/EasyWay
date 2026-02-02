import React from 'react';
import { motion } from 'framer-motion';
import { Check, Pill, Stethoscope, Users, Dumbbell, Calendar, MapPin } from 'lucide-react';
import VoiceButton from './VoiceButton';

const typeIcons = {
  doctor: Stethoscope,
  medication: Pill,
  appointment: Calendar,
  social: Users,
  exercise: Dumbbell,
  other: Calendar
};

const typeColors = {
  doctor: 'bg-red-100 border-red-400',
  medication: 'bg-purple-100 border-purple-400',
  appointment: 'bg-blue-100 border-blue-400',
  social: 'bg-green-100 border-green-400',
  exercise: 'bg-orange-100 border-orange-400',
  other: 'bg-gray-100 border-gray-400'
};

export default function ScheduleCard({ item, onMarkDone }) {
  const Icon = typeIcons[item.type] || Calendar;
  const colorClass = typeColors[item.type] || typeColors.other;

  const voiceText = `${item.time}. ${item.title}. ${item.location ? `At ${item.location}` : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        w-full p-5 rounded-3xl border-4 ${colorClass}
        ${item.is_done ? 'opacity-60' : ''}
        shadow-md
      `}
    >
      <div className="flex items-start gap-4">
        <div className="p-4 bg-white rounded-2xl shadow">
          <Icon className="w-12 h-12 text-gray-700" strokeWidth={2} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-3xl font-bold text-gray-800 mb-2">
            {item.time}
          </p>
          <h3 className={`text-xl font-semibold text-gray-800 ${item.is_done ? 'line-through' : ''}`}>
            {item.title}
          </h3>
          {item.location && (
            <div className="flex items-center gap-2 mt-2 text-lg text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{item.location}</span>
            </div>
          )}
        </div>

        <VoiceButton text={voiceText} />
      </div>

      {!item.is_done && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onMarkDone(item.id)}
          className="
            w-full mt-4 p-4 rounded-2xl
            bg-green-600 text-white
            text-xl font-bold
            flex items-center justify-center gap-3
            shadow-lg
          "
        >
          <Check className="w-8 h-8" strokeWidth={3} />
          Mark Done
        </motion.button>
      )}

      {item.is_done && (
        <div className="w-full mt-4 p-4 rounded-2xl bg-green-200 text-green-800 text-xl font-bold text-center">
          ✓ Completed
        </div>
      )}
    </motion.div>
  );
}
