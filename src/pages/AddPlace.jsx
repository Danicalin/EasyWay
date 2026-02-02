import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Check, 
  Hospital, 
  Stethoscope, 
  Pill, 
  ShoppingCart, 
  Landmark, 
  Church, 
  Trees, 
  Users,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '../components/PageHeader';

const placeTypes = [
  { value: 'hospital', label: 'Hospital', icon: Hospital, color: 'bg-red-500' },
  { value: 'doctor', label: 'Doctor', icon: Stethoscope, color: 'bg-pink-500' },
  { value: 'pharmacy', label: 'Pharmacy', icon: Pill, color: 'bg-purple-500' },
  { value: 'market', label: 'Market', icon: ShoppingCart, color: 'bg-green-500' },
  { value: 'bank', label: 'Bank', icon: Landmark, color: 'bg-blue-500' },
  { value: 'temple', label: 'Temple/Church', icon: Church, color: 'bg-orange-500' },
  { value: 'park', label: 'Park', icon: Trees, color: 'bg-emerald-500' },
  { value: 'family', label: 'Family Home', icon: Users, color: 'bg-indigo-500' },
];

export default function AddPlace() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: ''
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.SavedPlace.create(data),
    onSuccess: () => {
      navigate(createPageUrl('GoSomewhere'));
    },
  });

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, type: type.value, name: type.label });
    setStep(2);
  };

  const handleSave = () => {
    if (formData.name && formData.address) {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <PageHeader 
          title={step === 1 ? "What type of place?" : "Enter details"}
          backTo="GoSomewhere"
        />

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[1, 2].map(s => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full ${s <= step ? 'bg-green-600' : 'bg-gray-200'}`}
            />
          ))}
        </div>

        {/* Step 1: Select Type */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-3">
            {placeTypes.map((type, index) => (
              <motion.button
                key={type.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTypeSelect(type)}
                className={`
                  p-5 rounded-3xl
                  ${type.color} text-white
                  flex flex-col items-center gap-3
                  shadow-lg
                  min-h-[120px]
                `}
              >
                <type.icon className="w-12 h-12" />
                <span className="text-lg font-bold text-center">{type.label}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* Step 2: Name and Address */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Name Input */}
            <div className="bg-white rounded-3xl shadow-lg p-5">
              <label className="text-lg text-gray-500 mb-3 block">
                Place Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., City Hospital"
                className="
                  w-full p-4 rounded-2xl
                  bg-gray-100 text-xl
                  border-2 border-transparent
                  focus:border-green-500 focus:outline-none
                "
              />
            </div>

            {/* Address Input */}
            <div className="bg-white rounded-3xl shadow-lg p-5">
              <label className="flex items-center gap-2 text-lg text-gray-500 mb-3">
                <MapPin className="w-5 h-5" />
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter the full address..."
                rows={3}
                className="
                  w-full p-4 rounded-2xl
                  bg-gray-100 text-xl
                  border-2 border-transparent
                  focus:border-green-500 focus:outline-none
                  resize-none
                "
              />
            </div>

            {/* Save Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              disabled={createMutation.isPending || !formData.name || !formData.address}
              className={`
                w-full p-6 rounded-3xl
                text-white
                text-2xl font-bold
                flex items-center justify-center gap-3
                shadow-xl
                ${formData.name && formData.address ? 'bg-green-600' : 'bg-gray-400'}
              `}
            >
              <Check className="w-10 h-10" />
              {createMutation.isPending ? 'Saving...' : 'Save Place'}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
