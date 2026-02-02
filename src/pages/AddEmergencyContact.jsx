import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Check, User, Phone, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '../components/PageHeader';

const relationships = [
  'Son', 'Daughter', 'Spouse', 'Sibling', 'Friend', 'Neighbor', 'Doctor', 'Caregiver'
];

export default function AddEmergencyContact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relationship: '',
    is_primary: true
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.EmergencyContact.create(data),
    onSuccess: () => {
      navigate(createPageUrl('EmergencyHelp'));
    },
  });

  const handleSave = () => {
    if (formData.name && formData.phone) {
      createMutation.mutate(formData);
    }
  };

  const isValid = formData.name && formData.phone;

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <PageHeader 
          title="Add Emergency Contact"
          backTo="EmergencyHelp"
        />

        <div className="space-y-6">
          {/* Name Input */}
          <div className="bg-white rounded-3xl shadow-lg p-5">
            <label className="flex items-center gap-2 text-lg text-gray-500 mb-3">
              <User className="w-5 h-5" />
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., John Smith"
              className="
                w-full p-4 rounded-2xl
                bg-gray-100 text-xl
                border-2 border-transparent
                focus:border-red-500 focus:outline-none
              "
            />
          </div>

          {/* Phone Input */}
          <div className="bg-white rounded-3xl shadow-lg p-5">
            <label className="flex items-center gap-2 text-lg text-gray-500 mb-3">
              <Phone className="w-5 h-5" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g., 555-123-4567"
              className="
                w-full p-4 rounded-2xl
                bg-gray-100 text-xl
                border-2 border-transparent
                focus:border-red-500 focus:outline-none
              "
            />
          </div>

          {/* Relationship Selection */}
          <div className="bg-white rounded-3xl shadow-lg p-5">
            <label className="flex items-center gap-2 text-lg text-gray-500 mb-3">
              <Heart className="w-5 h-5" />
              Relationship
            </label>
            <div className="grid grid-cols-2 gap-2">
              {relationships.map((rel) => (
                <motion.button
                  key={rel}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFormData({ ...formData, relationship: rel })}
                  className={`
                    p-3 rounded-2xl
                    text-lg font-medium
                    ${formData.relationship === rel 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-800'}
                  `}
                >
                  {rel}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Primary Contact Toggle */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setFormData({ ...formData, is_primary: !formData.is_primary })}
            className={`
              w-full p-5 rounded-3xl
              ${formData.is_primary ? 'bg-yellow-500 text-white' : 'bg-white text-gray-800'}
              flex items-center justify-between
              shadow-lg
            `}
          >
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8" fill={formData.is_primary ? 'white' : 'none'} />
              <span className="text-xl font-bold">Primary Contact</span>
            </div>
            <div className={`
              w-12 h-7 rounded-full
              ${formData.is_primary ? 'bg-white/30' : 'bg-gray-200'}
              relative transition-colors
            `}>
              <div className={`
                w-5 h-5 rounded-full bg-white shadow
                absolute top-1
                transition-all
                ${formData.is_primary ? 'right-1' : 'left-1'}
              `} />
            </div>
          </motion.button>

          <p className="text-center text-gray-500 text-lg">
            Primary contact will be called first in emergencies
          </p>

          {/* Save Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={createMutation.isPending || !isValid}
            className={`
              w-full p-6 rounded-3xl
              text-white
              text-2xl font-bold
              flex items-center justify-center gap-3
              shadow-xl
              ${isValid ? 'bg-green-600' : 'bg-gray-400'}
            `}
          >
            <Check className="w-10 h-10" />
            {createMutation.isPending ? 'Saving...' : 'Save Contact'}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
