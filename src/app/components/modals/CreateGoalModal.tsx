'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGoals } from '@/context/GoalContext';
import { Goal, GoalCategory, GoalPriority } from '@/types';
import { currentUser } from '@/utils/mockData';
import { FiX } from 'react-icons/fi';

interface CreateGoalModalProps {
  onClose: () => void;
}

export default function CreateGoalModal({ onClose }: CreateGoalModalProps) {
  const { addGoal } = useGoals();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GoalCategory>('personal');
  const [dueDate, setDueDate] = useState('');
  const [isTeamGoal, setIsTeamGoal] = useState(false);
  const [priority, setPriority] = useState<GoalPriority>('medium');
  const [target, setTarget] = useState(100);
  const [unit, setUnit] = useState('%');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate fields
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else if (new Date(dueDate) < new Date()) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }
    
    if (target <= 0) {
      newErrors.target = 'Target must be greater than 0';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      // Add new goal
      const newGoal: Omit<Goal, 'id' | 'createdAt' | 'isCompleted' | 'progress' | 'milestones' | 'comments'> = {
        title,
        description,
        category,
        target,
        unit,
        dueDate: new Date(dueDate).toISOString(),
        userId: currentUser.id,
        isTeamGoal,
        priority,
        teamId: isTeamGoal ? '1' : undefined, // For simplicity, use the first team
      };
      
      addGoal(newGoal);
      onClose();
    }
  };

  const overlay = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const modal = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={overlay}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          variants={modal}
          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          className="bg-white dark:bg-slate-800 rounded-lg max-w-xl w-full shadow-xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Create New Goal</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-5">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Goal Title*
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
                    errors.title ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-slate-600'
                  }`}
                  placeholder="What do you want to achieve?"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  placeholder="Describe your goal in detail"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={e => setCategory(e.target.value as GoalCategory)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="health">Health</option>
                    <option value="learning">Learning</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Due Date*
                  </label>
                  <input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={e => setDueDate(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
                      errors.dueDate ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-slate-600'
                    }`}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={priority}
                    onChange={e => setPriority(e.target.value as GoalPriority)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Goal Type
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
                        checked={!isTeamGoal}
                        onChange={() => setIsTeamGoal(false)}
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Personal</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        className="form-radio text-blue-500 focus:ring-blue-500 h-4 w-4"
                        checked={isTeamGoal}
                        onChange={() => setIsTeamGoal(true)}
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Team</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="target" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Target Value
                  </label>
                  <input
                    id="target"
                    type="number"
                    value={target}
                    onChange={e => setTarget(parseInt(e.target.value, 10))}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
                      errors.target ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-slate-600'
                    }`}
                    min="1"
                  />
                  {errors.target && (
                    <p className="mt-1 text-sm text-red-500">{errors.target}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Unit
                  </label>
                  <input
                    id="unit"
                    type="text"
                    value={unit}
                    onChange={e => setUnit(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
                    placeholder="%, miles, books, etc."
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-gray-300 dark:border-slate-600 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create Goal
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}