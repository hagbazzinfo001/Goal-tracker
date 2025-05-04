'use client';

import { motion } from 'framer-motion';
import { FiPlus, FiTarget } from 'react-icons/fi';

interface EmptyStateProps {
  onCreateGoal: () => void;
}

export default function EmptyState({ onCreateGoal }: EmptyStateProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-4"
    >
      <div className="inline-flex items-center justify-center p-4 bg-blue-50 dark:bg-slate-700 rounded-full mb-4">
        <FiTarget className="h-8 w-8 text-blue-500 dark:text-blue-400" />
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No goals yet</h3>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
        Create your first goal to start tracking your progress. You can set personal goals or create team goals to collaborate with others.
      </p>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onCreateGoal}
        className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm transition-colors duration-200"
      >
        <FiPlus className="mr-2" />
        Create Your First Goal
      </motion.button>
    </motion.div>
  );
}