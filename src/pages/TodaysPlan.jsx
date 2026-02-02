import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Calendar, Loader2, Plus, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import PageHeader from '../components/PageHeader';
import ScheduleCard from '../components/ScheduleCard';
import { format } from 'date-fns';

export default function TodaysPlan() {
  const queryClient = useQueryClient();
  const today = format(new Date(), 'yyyy-MM-dd');

  const { data: schedules = [], isLoading } = useQuery({
    queryKey: ['schedules', today],
    queryFn: () => base44.entities.Schedule.filter({ date: today }, 'time'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Schedule.update(id, data),
    onSuccess: () => queryClient.invalidateQueries(['schedules']),
  });

  const handleMarkDone = (id) => {
    updateMutation.mutate({ id, data: { is_done: true } });
  };

  const readAllAloud = () => {
    if ('speechSynthesis' in window && schedules.length > 0) {
      const text = schedules.map(s => 
        `At ${s.time}, ${s.title}${s.location ? ` at ${s.location}` : ''}`
      ).join('. ');
      
      const utterance = new SpeechSynthesisUtterance(`Today's plan: ${text}`);
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const voiceText = schedules.length > 0 
    ? `Today's plan: ${schedules.map(s => `At ${s.time}, ${s.title}`).join('. ')}`
    : "You have no activities planned for today.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-md mx-auto">
        <PageHeader 
          title="Today's Plan" 
          voiceText={voiceText}
        />

        {/* Date Display */}
        <div className="bg-blue-100 rounded-2xl p-4 mb-6 text-center">
          <p className="text-2xl font-bold text-blue-800">
            {format(new Date(), 'EEEE, MMMM d')}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          </div>
        ) : schedules.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <p className="text-2xl text-gray-500 font-medium">
              No activities today!
            </p>
            <p className="text-xl text-gray-400 mt-2">
              Enjoy your free day 😊
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* Read All Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={readAllAloud}
              className="
                w-full p-4 rounded-2xl
                bg-blue-500 text-white
                text-xl font-bold
                flex items-center justify-center gap-3
                shadow-lg mb-6
              "
            >
              <Volume2 className="w-8 h-8" />
              Read All Aloud
            </motion.button>

            {schedules.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ScheduleCard 
                  item={item} 
                  onMarkDone={handleMarkDone}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Add New Activity Button */}
        <Link to={createPageUrl('AddSchedule')}>
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
            Add Activity
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
