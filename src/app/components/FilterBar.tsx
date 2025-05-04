'use client';

import { useState } from 'react';
import { useGoals } from '../../context/GoalContext';
import { GoalCategory, GoalPriority } from '../../types';
import { FiFilter, FiX } from 'react-icons/fi';

export default function FilterBar() {
  const { filterGoals, activeFilters } = useGoals();
  const [showFilters, setShowFilters] = useState(false);

  // Category options
  const categories: { value: GoalCategory | 'all'; label: string }[] = [
    { value: 'all', label: 'All Categories' },
    { value: 'personal', label: 'Personal' },
    { value: 'work', label: 'Work' },
    { value: 'health', label: 'Health' },
    { value: 'learning', label: 'Learning' },
    { value: 'finance', label: 'Finance' },
  ];

  // Priority options
  const priorities: { value: GoalPriority | 'all'; label: string }[] = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  // Status options
  const statuses: { value: boolean | 'all'; label: string }[] = [
    { value: 'all', label: 'All Statuses' },
    { value: false, label: 'In Progress' },
    { value: true, label: 'Completed' },
  ];

  const handleCategoryChange = (value: GoalCategory | 'all') => {
    filterGoals(value, activeFilters.completed === 'all' ? undefined : activeFilters.completed, activeFilters.priority);
  };

  const handlePriorityChange = (value: GoalPriority | 'all') => {
    filterGoals(activeFilters.category, activeFilters.completed === 'all' ? undefined : activeFilters.completed, value);
  };

  const handleStatusChange = (value: boolean | 'all') => {
    filterGoals(activeFilters.category, value === 'all' ? undefined : value, activeFilters.priority);
  };

  const clearFilters = () => {
    filterGoals('all', undefined, 'all');
  };

  const hasActiveFilters = activeFilters.category !== 'all' || 
                            activeFilters.completed !== 'all' || 
                            activeFilters.priority !== 'all';

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-white border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600 dark:text-white transition-colors"
        >
          <FiFilter className="mr-1.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          Filters
          {hasActiveFilters && (
            <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              Active
            </span>
          )}
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="ml-2 p-1.5 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
          >
            <FiX className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {showFilters && (
        <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-slate-800 rounded-md shadow-lg z-10 border border-gray-200 dark:border-slate-700">
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select
                value={activeFilters.category}
                onChange={(e) => handleCategoryChange(e.target.value as GoalCategory | 'all')}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
              <select
                value={activeFilters.priority}
                onChange={(e) => handlePriorityChange(e.target.value as GoalPriority | 'all')}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                {priorities.map((priority) => (
                  <option key={priority.value} value={priority.value}>
                    {priority.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                value={activeFilters.completed === 'all' ? 'all' : activeFilters.completed.toString()}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'all') {
                    handleStatusChange('all');
                  } else {
                    handleStatusChange(value === 'true');
                  }
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              >
                {statuses.map((status) => (
                  <option key={typeof status.value === 'boolean' ? status.value.toString() : 'all'} value={typeof status.value === 'boolean' ? status.value.toString() : 'all'}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowFilters(false)}
                className="px-3 py-1.5 text-xs font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}