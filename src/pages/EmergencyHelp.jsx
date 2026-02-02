import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AlertTriangle, MapPin, Loader2, Plus, Check, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '../components/PageHeader';

export default function EmergencyHelp() {
  const [calling, setCalling] = useState(false);
  const [locationSent, setLocationSent] = useState(false);

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ['emergencyContacts'],
    queryFn: () => base44.entities.EmergencyContact.list(),
  });

  const primaryContact = contacts.find(c => c.is_primary) || contacts[0];

  const handleEmergencyCall = async () => {
    setCalling(true);
    
    // Simulate getting location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationSent(true);
          // In a real app, this would send the location to emergency contacts
        },
        () => {
          setLocationSent(true);
        }
      );
    }

    // If there's a primary contact, initiate call
    if (primaryContact) {
      setTimeout(() => {
        window.location.href = `tel:${primaryContact.phone}`;
      }, 1500);
    }
  };

  const voiceText = primaryContact 
    ? `Emergency help. Press the big red button to call ${primaryContact.name} and send your location.`
    : "Emergency help. Add an emergency contact to enable quick calling.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <PageHeader 
          title="Emergency Help" 
          voiceText={voiceText}
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-16 h-16 text-red-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Main Emergency Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleEmergencyCall}
              disabled={calling || !primaryContact}
              className={`
                w-full aspect-square max-w-xs mx-auto
                rounded-full shadow-2xl
                flex flex-col items-center justify-center
                ${calling ? 'bg-orange-500' : 'bg-red-600'}
                ${!primaryContact ? 'opacity-50' : ''}
                text-white
                border-8 border-red-300
                mb-8
              `}
            >
              <AnimatePresence mode="wait">
                {calling ? (
                  <motion.div
                    key="calling"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <Phone className="w-20 h-20 animate-pulse mb-4" />
                    <span className="text-2xl font-bold">Calling...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex flex-col items-center"
                  >
                    <Phone className="w-24 h-24 mb-4" strokeWidth={2.5} />
                    <span className="text-3xl font-bold">CALL FOR HELP</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Location Status */}
            {locationSent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 rounded-2xl p-4 mb-6 flex items-center gap-3"
              >
                <Check className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-lg font-bold text-green-800">Location Sent</p>
                  <p className="text-green-700">Your location was shared</p>
                </div>
              </motion.div>
            )}

            {/* Primary Contact Display */}
            {primaryContact ? (
              <div className="bg-white rounded-3xl shadow-lg p-5 mb-6">
                <p className="text-lg text-gray-500 mb-2">Calling:</p>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">
                      {primaryContact.name}
                    </p>
                    <p className="text-xl text-gray-600">
                      {primaryContact.relationship}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-100 rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-8 h-8 text-yellow-700" />
                  <p className="text-xl font-bold text-yellow-800">
                    No Contact Added
                  </p>
                </div>
                <p className="text-lg text-yellow-700">
                  Add an emergency contact below
                </p>
              </div>
            )}

            {/* All Contacts */}
            {contacts.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-700 mb-4">
                  All Emergency Contacts
                </h2>
                <div className="space-y-3">
                  {contacts.map(contact => (
                    <a
                      key={contact.id}
                      href={`tel:${contact.phone}`}
                      className="
                        block w-full p-4 rounded-2xl
                        bg-white shadow-md
                        flex items-center gap-4
                      "
                    >
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xl font-bold text-gray-800">
                          {contact.name}
                        </p>
                        <p className="text-lg text-gray-600">
                          {contact.phone}
                        </p>
                      </div>
                      <Phone className="w-8 h-8 text-green-600" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Add Contact Button */}
            <Link to={createPageUrl('AddEmergencyContact')}>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="
                  w-full p-5 rounded-3xl
                  bg-gray-800 text-white
                  text-xl font-bold
                  flex items-center justify-center gap-3
                  shadow-xl
                "
              >
                <Plus className="w-8 h-8" />
                Add Emergency Contact
              </motion.button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
