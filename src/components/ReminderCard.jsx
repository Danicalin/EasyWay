import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Pill, Receipt, Calendar, Bell } from 'lucide-react';
import VoiceButton from './VoiceButton';

const typeIcons = {
  medication: Pill,
  bill: Receipt,
  appointment: Calendar,
  other: Bell
};

const typeColors = {
  medication: 'bg-purple-100 border-purple-500',
  bill: 'bg-yellow-100 border-yellow-500',
  appointment: 'bg-blue-100 border-blue-500',
  other: 'bg-gray-100 border-gray-500'
};

export default function ReminderCard({ reminder, onDone, onSnooze }) {
  const Icon = typeIcons[reminder.type] || Bell;
  const colorClass = typeColors[reminder.type] || typeColors.other;

  const voiceText = `Reminder: ${reminder.title} at ${reminder.time}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        w-full p-5 rounded-3xl border-4 ${colorClass}
        ${reminder.is_done ? 'opacity-60' : ''}
        shadow-md
      `}
    >
      <div className="flex items-start gap-4">
        <div className="p-4 bg-white rounded-2xl shadow">
          <Icon className="w-12 h-12 text-gray-700" strokeWidth={2} />
        </div>
        
        <div className="flex-1">
          <h3 className={`text-xl font-bold text-gray-800 ${reminder.is_done ? 'line-through' : ''}`}>
            {reminder.title}
          </h3>
          <p className="text-2xl font-bold text-gray-600 mt-1">
            {reminder.time}
          </p>
          {reminder.is_recurring && (
            <span className="inline-block mt-2 px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm font-medium">
              Daily
            </span>
          )}
        </div>

        <VoiceButton text={voiceText} />
      </div>

      {!reminder.is_done && (
        <div className="flex gap-3 mt-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onSnooze(reminder.id)}
            className="
              flex-1 p-4 rounded-2xl
              bg-orange-500 text-white
              text-lg font-bold
              flex items-center justify-center gap-2
              shadow-lg
            "
          >
            <Clock className="w-7 h-7" />
            Snooze
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => onDone(reminder.id)}
            className="
              flex-1 p-4 rounded-2xl
              bg-green-600 text-white
              text-lg font-bold
              flex items-center justify-center gap-2
              shadow-lg
            "
          >
            <Check className="w-7 h-7" strokeWidth={3} />
            Done
          </motion.button>
        </div>
      )}

      {reminder.is_done && (
        <div className="w-full mt-4 p-4 rounded-2xl bg-green-200 text-green-800 text-xl font-bold text-center">
          ✓ Completed
        </div>
      )}
    </motion.div>
  );
}
