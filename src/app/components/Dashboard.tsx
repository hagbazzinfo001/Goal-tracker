'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGoals } from '../../context/GoalContext';
import GoalCard from './GoalCard';
import ActivityFeed from './ActivityFeed';
import FilterBar from './FilterBar';
import EmptyState from './EmptyState';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { FiTarget, FiCheckCircle, FiClock } from 'react-icons/fi';

interface DashboardProps {
  onCreateGoal: () => void;
}

export default function Dashboard({ onCreateGoal }: DashboardProps) {
  const { filteredGoals, goals } = useGoals();
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  
  // Calculate summary data
  const completedGoals = goals.filter(goal => goal.isCompleted).length;
  const inProgressGoals = goals.filter(goal => !goal.isCompleted).length;
  const totalGoals = goals.length;
  
  const progressPercentage = totalGoals > 0 
    ? Math.round((completedGoals / totalGoals) * 100) 
    : 0;
    
  // Data for pie chart
  const statusData = [
    { name: 'Completed', value: completedGoals, color: '#22c55e' },
    { name: 'In Progress', value: inProgressGoals, color: '#3b82f6' },
  ];

  // Animate in items one by one
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"
        >
          Your Goals Dashboard
        </motion.h1>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setActiveView('grid')}
            className={`p-2 rounded ${activeView === 'grid' ? 'bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setActiveView('list')}
            className={`p-2 rounded ${activeView === 'list' ? 'bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 flex items-center"
        >
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4">
            <FiTarget className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Goals</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{totalGoals}</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 flex items-center"
        >
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mr-4">
            <FiCheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{completedGoals}</p>
          </div>
        </motion.div>
        
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 flex items-center"
        >
          <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 mr-4">
            <FiClock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">In Progress</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{inProgressGoals}</p>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Goals Overview</h2>
              <FilterBar />
            </div>
            
            {filteredGoals.length === 0 ? (
              <EmptyState onCreateGoal={onCreateGoal} />
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className={`
                  ${activeView === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' 
                    : 'space-y-4'
                  }
                `}
              >
                {filteredGoals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} view={activeView} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Progress Overview</h2>
            <div className="flex flex-col items-center">
              <div className="w-full h-40 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Overall Completion</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{progressPercentage}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}