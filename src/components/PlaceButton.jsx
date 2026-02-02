import React from 'react';
import { motion } from 'framer-motion';
import { 
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

const typeIcons = {
  hospital: Hospital,
  doctor: Stethoscope,
  pharmacy: Pill,
  market: ShoppingCart,
  bank: Landmark,
  temple: Church,
  park: Trees,
  family: Users,
  other: MapPin
};

const typeColors = {
  hospital: 'bg-red-500',
  doctor: 'bg-pink-500',
  pharmacy: 'bg-purple-500',
  market: 'bg-green-500',
  bank: 'bg-blue-500',
  temple: 'bg-orange-500',
  park: 'bg-emerald-500',
  family: 'bg-indigo-500',
  other: 'bg-gray-500'
};

export default function PlaceButton({ place, onClick }) {
  const Icon = typeIcons[place.type] || MapPin;
  const colorClass = typeColors[place.type] || typeColors.other;

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onClick(place)}
      className={`
        w-full p-5 rounded-3xl shadow-lg
        ${colorClass} text-white
        flex items-center gap-4
        min-h-[100px]
        border-4 border-white/20
      `}
    >
      <div className="p-3 bg-white/20 rounded-2xl">
        <Icon className="w-12 h-12" strokeWidth={2} />
      </div>
      <div className="flex-1 text-left">
        <h3 className="text-xl font-bold">{place.name}</h3>
        <p className="text-lg opacity-90 truncate">{place.address}</p>
      </div>
    </motion.button>
  );
}
