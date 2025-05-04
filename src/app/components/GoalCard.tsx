'use client';

import { motion } from 'framer-motion';
import { format, isPast, isToday } from 'date-fns';
import { useGoals } from '../../context/GoalContext';
import { Goal } from '../../types';
import { FiCalendar, FiUsers, FiUser,   FiFlag } from 'react-icons/fi';

interface GoalCardProps {
  goal: Goal;
  view: 'grid' | 'list';
}

export default function GoalCard({ goal, view }: GoalCardProps) {
  const { setSelectedGoal } = useGoals();
  
  // Calculate progress percentage
  const progressPercentage = (goal.progress / goal.target) * 100;
  
  // Due date formatting and status
  const dueDate = new Date(goal.dueDate);
  const formattedDueDate = format(dueDate, 'MMM d, yyyy');
  const isPastDue = isPast(dueDate) && !isToday(dueDate) && !goal.isCompleted;
  
  // Category color mapping
  const categoryColors = {
    personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    health: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    learning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    finance: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };
  
  // Priority color and icon mapping
  const priorityConfig = {
    high: {
      color: 'text-red-500 dark:text-red-400',
      label: 'High Priority'
    },
    medium: {
      color: 'text-yellow-500 dark:text-yellow-400',
      label: 'Medium Priority'
    },
    low: {
      color: 'text-green-500 dark:text-green-400',
      label: 'Low Priority'
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={item}
      whileHover={{ y: -4 }}
      onClick={() => setSelectedGoal(goal)}
      className={`bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer ${
        isPastDue ? 'ring-2 ring-red-500 dark:ring-red-400' : ''
      } ${view === 'list' ? 'p-4' : 'p-5'}`}
    >
      <div className={view === 'list' ? 'flex flex-col sm:flex-row sm:items-center' : ''}>
        <div className={view === 'list' ? 'sm:flex-1' : ''}>
          <div className="flex justify-between items-start mb-3">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${categoryColors[goal.category]}`}>
              {goal.category.charAt(0).toUpperCase() + goal.category.slice(1)}
            </span>
            
            <div className={`flex items-center text-xs font-medium ${priorityConfig[goal.priority].color}`}>
              <FiFlag className="mr-1" />
              {priorityConfig[goal.priority].label}
            </div>
          </div>
          
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{goal.title}</h3>
          
          {view === 'grid' && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {goal.description}
            </p>
          )}
          
          <div className="mt-4 mb-4">
            <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <motion.div 
                className={`h-2 rounded-full ${goal.isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
        
        <div className={view === 'list' ? 'flex flex-col sm:flex-row items-start sm:items-center mt-4 sm:mt-0 sm:ml-4 gap-4' : ''}>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400 mt-2">
            <div className="flex items-center">
              <FiCalendar className="mr-1 h-4 w-4" />
              <span className={isPastDue ? 'text-red-500 dark:text-red-400' : ''}>
                {isPastDue ? 'Past due: ' : ''}
                {formattedDueDate}
              </span>
            </div>
            
            <div className="flex items-center">
              {goal.isTeamGoal ? (
                <FiUsers className="mr-1 h-4 w-4" />
              ) : (
                <FiUser className="mr-1 h-4 w-4" />
              )}
              <span>{goal.isTeamGoal ? 'Team' : 'Personal'}</span>
            </div>
          </div>
          
          <div className="flex items-center mt-3 space-x-1">
            {goal.milestones.length > 0 && (
              <div className="flex -space-x-2">
                {goal.milestones.slice(0, 3).map((milestone, i) => (
                  <div 
                    key={milestone.id}
                    className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                      milestone.completed
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                    } border-2 ${
                      milestone.completed
                        ? 'border-green-200 dark:border-green-800'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {i + 1}
                  </div>
                ))}
                
                {goal.milestones.length > 3 && (
                  <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600">
                    +{goal.milestones.length - 3}
                  </div>
                )}
              </div>
            )}
            
            {goal.comments.length > 0 && (
              <div className="ml-2 flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>{goal.comments.length}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}