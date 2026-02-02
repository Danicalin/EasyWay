import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Check, 
  Pill, 
  Stethoscope, 
  Users, 
  Dumbbell, 
  Calendar,
  Clock,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '../components/PageHeader';
import { format } from 'date-fns';

const activityTypes = [
  { value: 'doctor', label: 'Doctor Visit', icon: Stethoscope, color: 'bg-red-500' },
  { value: 'medication', label: 'Medication', icon: Pill, color: 'bg-purple-500' },
  { value: 'appointment', label: 'Appointment', icon: Calendar, color: 'bg-blue-500' },
  { value: 'social', label: 'Social', icon: Users, color: 'bg-green-500' },
  { value: 'exercise', label: 'Exercise', icon: Dumbbell, color: 'bg-orange-500' },
];

const commonTimes = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '14:00', '15:00', '16:00', '17:00', '18:00'
];

export default function AddSchedule() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    time: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    location: '',
    is_done: false
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Schedule.create(data),
    onSuccess: () => {
      navigate(createPageUrl('TodaysPlan'));
    },
  });

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, type: type.value, title: type.label });
    setStep(2);
  };

  const handleTimeSelect = (time) => {
    setFormData({ ...formData, time });
    setStep(3);
  };

  const handleSave = () => {
    createMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <PageHeader 
          title={step === 1 ? "What activity?" : step === 2 ? "What time?" : "Any details?"}
          backTo="TodaysPlan"
        />

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {/* Step 1: Select Type */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-xl text-gray-600 text-center mb-6">
              Tap to select
            </p>
            {activityTypes.map((type, index) => (
              <motion.button
                key={type.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeSelect(type)}
                className={`
                  w-full p-5 rounded-3xl
                  ${type.color} text-white
                  flex items-center gap-4
                  shadow-lg
                `}
              >
                <type.icon className="w-12 h-12" />
                <span className="text-2xl font-bold">{type.label}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Step 2: Select Time */}
        {step === 2 && (
          <div>
            <p className="text-xl text-gray-600 text-center mb-6">
              Tap to select time
            </p>
            <div className="grid grid-cols-2 gap-3">
              {commonTimes.map((time, index) => (
                <motion.button
                  key={time}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTimeSelect(time)}
                  className={`
                    p-5 rounded-2xl
                    ${formData.time === time ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}
                    text-2xl font-bold
                    shadow-md
                    flex items-center justify-center gap-2
                  `}
                >
                  <Clock className="w-6 h-6" />
                  {time}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Location (optional) and Save */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-white rounded-3xl shadow-lg p-5">
              <h3 className="text-lg text-gray-500 mb-2">Your Activity</h3>
              <p className="text-2xl font-bold text-gray-800">{formData.title}</p>
              <p className="text-xl text-gray-600 mt-1">{formData.time}</p>
            </div>

            {/* Location Input */}
            <div className="bg-white rounded-3xl shadow-lg p-5">
              <label className="flex items-center gap-2 text-lg text-gray-500 mb-3">
                <MapPin className="w-5 h-5" />
                Where? (optional)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., City Hospital"
                className="
                  w-full p-4 rounded-2xl
                  bg-gray-100 text-xl
                  border-2 border-transparent
                  focus:border-blue-500 focus:outline-none
                "
              />
            </div>

            {/* Save Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={createMutation.isPending}
              className="
                w-full p-6 rounded-3xl
                bg-green-600 text-white
                text-2xl font-bold
                flex items-center justify-center gap-3
                shadow-xl
              "
            >
              <Check className="w-10 h-10" />
              {createMutation.isPending ? 'Saving...' : 'Save Activity'}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
