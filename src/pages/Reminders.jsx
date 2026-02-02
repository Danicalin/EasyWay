import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Bell, Loader2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '../components/PageHeader';
import ReminderCard from '../components/ReminderCard';
import { format } from 'date-fns';

export default function Reminders() {
  const queryClient = useQueryClient();
  const today = format(new Date(), 'yyyy-MM-dd');

  const { data: reminders = [], isLoading } = useQuery({
    queryKey: ['reminders'],
    queryFn: () => base44.entities.Reminder.filter({ is_done: false }, 'time'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Reminder.update(id, data),
    onSuccess: () => queryClient.invalidateQueries(['reminders']),
  });

  const handleDone = (id) => {
    updateMutation.mutate({ id, data: { is_done: true } });
  };

  const handleSnooze = (id) => {
    updateMutation.mutate({ id, data: { is_snoozed: true } });
  };

  const voiceText = reminders.length > 0
    ? `You have ${reminders.length} reminders. ${reminders.map(r => r.title).join('. ')}`
    : "You have no pending reminders.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <PageHeader 
          title="My Reminders" 
          voiceText={voiceText}
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-16 h-16 text-orange-500 animate-spin" />
          </div>
        ) : reminders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Bell className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <p className="text-2xl text-gray-500 font-medium">
              No reminders yet!
            </p>
            <p className="text-xl text-gray-400 mt-2">
              Add one below
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ReminderCard 
                  reminder={reminder}
                  onDone={handleDone}
                  onSnooze={handleSnooze}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Add New Reminder Button */}
        <Link to={createPageUrl('AddReminder')}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="
              w-full mt-6 p-5 rounded-3xl
              bg-orange-600 text-white
              text-xl font-bold
              flex items-center justify-center gap-3
              shadow-xl
            "
          >
            <Plus className="w-8 h-8" />
            Add Reminder
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
