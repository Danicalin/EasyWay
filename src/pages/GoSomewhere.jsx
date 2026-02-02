import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Loader2, 
  Plus, 
  Hospital, 
  Stethoscope, 
  Pill, 
  ShoppingCart, 
  Landmark, 
  Church, 
  Trees, 
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '../components/PageHeader';
import PlaceButton from '../components/PlaceButton';

const defaultPlaces = [
  { id: 'hospital', name: 'Hospital', type: 'hospital', address: 'Nearest Hospital' },
  { id: 'doctor', name: 'Doctor', type: 'doctor', address: 'My Doctor' },
  { id: 'pharmacy', name: 'Pharmacy', type: 'pharmacy', address: 'Nearest Pharmacy' },
  { id: 'market', name: 'Market', type: 'market', address: 'Local Market' },
  { id: 'bank', name: 'Bank', type: 'bank', address: 'Nearest Bank' },
  { id: 'park', name: 'Park', type: 'park', address: 'Nearby Park' },
];

export default function GoSomewhere() {
  const { data: savedPlaces = [], isLoading } = useQuery({
    queryKey: ['savedPlaces'],
    queryFn: () => base44.entities.SavedPlace.list(),
  });

  const handlePlaceClick = (place) => {
    window.location.href = createPageUrl('Navigation') + `?place=${encodeURIComponent(place.name)}&address=${encodeURIComponent(place.address)}&type=${place.type}`;
  };

  const allPlaces = savedPlaces.length > 0 ? savedPlaces : defaultPlaces;

  const voiceText = "Where would you like to go? Tap a destination to get directions.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <PageHeader 
          title="Where to?" 
          voiceText={voiceText}
        />

        <p className="text-xl text-gray-600 mb-6 text-center">
          Tap where you want to go
        </p>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-16 h-16 text-green-500 animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {allPlaces.map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <PlaceButton 
                  place={place}
                  onClick={handlePlaceClick}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Add New Place Button */}
        <Link to={createPageUrl('AddPlace')}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="
              w-full mt-6 p-5 rounded-3xl
              bg-gray-800 text-white
              text-xl font-bold
              flex items-center justify-center gap-3
              shadow-xl
            "
          >
            <Plus className="w-8 h-8" />
            Add New Place
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
