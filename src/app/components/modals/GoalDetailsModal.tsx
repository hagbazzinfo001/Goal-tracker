'use client';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { useGoals } from 'context/GoalContext';
// import { Milestone } from '@/types';
import { FiX,   FiTrash2, FiCheck, FiPlus } from 'react-icons/fi';

export default function GoalDetailsModal() {
  const { selectedGoal, setSelectedGoal, updateProgress, toggleMilestone, addComment, addMilestone,   deleteGoal } = useGoals();
  const [commentText, setCommentText] = useState('');
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [newProgress, setNewProgress] = useState(selectedGoal?.progress || 0);
  const [addingMilestone, setAddingMilestone] = useState(false);
  const [milestoneErrors, setMilestoneErrors] = useState<Record<string, string>>({});

  if (!selectedGoal) return null;

  const progressPercentage = (selectedGoal.progress / selectedGoal.target) * 100;
  const dueDate = new Date(selectedGoal.dueDate);
  const formattedDueDate = format(dueDate, 'MMMM d, yyyy');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(selectedGoal.id, commentText);
      setCommentText('');
    }
  };

  const handleUpdateProgress = () => {
    updateProgress(selectedGoal.id, newProgress);
  };

  const handleAddMilestone = () => {
    // Validate fields
    const errors: Record<string, string> = {};
    
    if (!newMilestone.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!newMilestone.dueDate) {
      errors.dueDate = 'Due date is required';
    }
    
    setMilestoneErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      addMilestone(selectedGoal.id, {
        ...newMilestone,
        completed: false,
        dueDate: new Date(newMilestone.dueDate).toISOString(),
      });
      
      setNewMilestone({
        title: '',
        description: '',
        dueDate: '',
      });
      
      setAddingMilestone(false);
    }
  };

  const handleDeleteGoal = () => {
    if (confirm('Are you sure you want to delete this goal?')) {
      deleteGoal(selectedGoal.id);
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
        onClick={() => setSelectedGoal(null)}
      >
        <motion.div
          variants={modal}
          transition={{ type: 'spring', damping: 25, stiffness: 500 }}
          className="bg-white dark:bg-slate-800 rounded-lg max-w-3xl w-full shadow-xl overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full mr-2 
                ${selectedGoal.category === 'personal' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' : ''}
                ${selectedGoal.category === 'work' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : ''}
                ${selectedGoal.category === 'health' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : ''}
                ${selectedGoal.category === 'learning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : ''}
                ${selectedGoal.category === 'finance' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' : ''}
              `}>
                {selectedGoal.category.charAt(0).toUpperCase() + selectedGoal.category.slice(1)}
              </span>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedGoal.title}</h2>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleDeleteGoal}
                className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors p-1 mr-2"
                title="Delete Goal"
              >
                <FiTrash2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSelectedGoal(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Close"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column - Details */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {selectedGoal.description}
                </p>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Due: {formattedDueDate}
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Priority: 
                    <span className={`ml-1 font-medium
                      ${selectedGoal.priority === 'high' ? 'text-red-500 dark:text-red-400' : ''}
                      ${selectedGoal.priority === 'medium' ? 'text-yellow-500 dark:text-yellow-400' : ''}
                      ${selectedGoal.priority === 'low' ? 'text-green-500 dark:text-green-400' : ''}
                    `}>
                      {selectedGoal.priority.charAt(0).toUpperCase() + selectedGoal.priority.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {selectedGoal.isTeamGoal ? 'Team Goal' : 'Personal Goal'}
                  </div>
                </div>
              </div>
              
              {/* Progress tracking */}
              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Progress Tracking</h3>
                <div className="mb-4">
                  <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    <span>Current Progress</span>
                    <span>
                      {selectedGoal.progress} / {selectedGoal.target} {selectedGoal.unit}
                      {' '}({Math.round(progressPercentage)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-600 rounded-full h-2.5 mb-4">
                    <motion.div 
                      className={`h-2.5 rounded-full ${selectedGoal.isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="range"
                    min="0"
                    max={selectedGoal.target}
                    value={newProgress}
                    onChange={(e) => setNewProgress(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-600"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2 w-12">
                    {newProgress}
                  </span>
                  <button
                    onClick={handleUpdateProgress}
                    disabled={newProgress === selectedGoal.progress}
                    className={`ml-2 px-3 py-1 text-xs font-medium text-white rounded-md shadow-sm focus:outline-none ${
                      newProgress === selectedGoal.progress
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Update
                  </button>
                </div>
              </div>
              
              {/* Milestones */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Milestones</h3>
                  <button
                    onClick={() => setAddingMilestone(!addingMilestone)}
                    className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                  >
                    {addingMilestone ? (
                      <>
                        <FiX className="mr-1 h-4 w-4" />
                        Cancel
                      </>
                    ) : (
                      <>
                        <FiPlus className="mr-1 h-4 w-4" />
                        Add Milestone
                      </>
                    )}
                  </button>
                </div>
                
                {addingMilestone && (
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="milestone-title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Title*
                        </label>
                        <input
                          id="milestone-title"
                          type="text"
                          value={newMilestone.title}
                          onChange={(e) => setNewMilestone({...newMilestone, title: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:text-white text-sm ${
                            milestoneErrors.title ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="Milestone title"
                        />
                        {milestoneErrors.title && (
                          <p className="mt-1 text-xs text-red-500">{milestoneErrors.title}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="milestone-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Description
                        </label>
                        <input
                          id="milestone-description"
                          type="text"
                          value={newMilestone.description}
                          onChange={(e) => setNewMilestone({...newMilestone, description: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:text-white text-sm"
                          placeholder="Optional description"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="milestone-duedate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Due Date*
                        </label>
                        <input
                          id="milestone-duedate"
                          type="date"
                          value={newMilestone.dueDate}
                          onChange={(e) => setNewMilestone({...newMilestone, dueDate: e.target.value})}
                          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:text-white text-sm ${
                            milestoneErrors.dueDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {milestoneErrors.dueDate && (
                          <p className="mt-1 text-xs text-red-500">{milestoneErrors.dueDate}</p>
                        )}
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          onClick={handleAddMilestone}
                          className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
                        >
                          Add Milestone
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {selectedGoal.milestones.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No milestones yet. Add one to track your progress.</p>
                ) : (
                  <ul className="space-y-2 mt-2">
                    {selectedGoal.milestones.map((milestone) => (
                      <li key={milestone.id} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-md">
                        <button
                          onClick={() => toggleMilestone(selectedGoal.id, milestone.id)}
                          className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                            milestone.completed
                              ? 'bg-green-500 border-green-500 dark:bg-green-600 dark:border-green-600 text-white'
                              : 'border-gray-300 dark:border-gray-500'
                          } flex items-center justify-center`}
                          aria-label={milestone.completed ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {milestone.completed && <FiCheck className="w-3 h-3" />}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className={`text-sm font-medium ${
                                milestone.completed
                                  ? 'text-gray-500 line-through dark:text-gray-400'
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {milestone.title}
                              </h4>
                              
                              {milestone.description && (
                                <p className={`text-xs mt-1 ${
                                  milestone.completed
                                    ? 'text-gray-400 line-through dark:text-gray-500'
                                    : 'text-gray-600 dark:text-gray-300'
                                }`}>
                                  {milestone.description}
                                </p>
                              )}
                            </div>
                            
                            <span className={`text-xs font-medium ${
                              milestone.completed
                                ? 'text-green-500 dark:text-green-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {milestone.completed ? 'Completed' : format(new Date(milestone.dueDate), 'MMM d, yyyy')}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            
            {/* Right column - Comments */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Comments</h3>
              
              <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4 max-h-[400px] overflow-y-auto">
                {selectedGoal.comments.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet. Be the first to add one.</p>
                ) : (
                  <ul className="space-y-3">
                    {selectedGoal.comments.map((comment) => (
                      <li key={comment.id} className="pb-3 border-b border-gray-200 dark:border-slate-600 last:border-0 last:pb-0">
                        <div className="flex items-start space-x-2">
                          <Image
                            src={comment.user.avatar}
                            alt={comment.user.name}
                            className="w-8 h-8 rounded-full"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">{comment.user.name}</h4>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {format(new Date(comment.createdAt), 'MMM d, h:mm a')}
                              </span>
                            </div>
                            
                            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <form onSubmit={handleSubmitComment}>
                <div className="mt-2">
                  <label htmlFor="comment" className="sr-only">Add comment</label>
                  <div className="flex items-start space-x-3">
                    <Image
                      src={selectedGoal.comments[0]?.user.avatar || 'https://randomuser.me/api/portraits/women/1.jpg'}
                      alt="Your avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    
                    <div className="flex-1">
                      <textarea
                        id="comment"
                        rows={2}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-slate-600 dark:border-slate-500 dark:text-white"
                        placeholder="Add a comment..."
                      />
                      
                      <div className="mt-2 flex justify-end">
                        <motion.button
                          type="submit"
                          disabled={!commentText.trim()}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-3 py-1 text-sm font-medium text-white rounded-md shadow-sm focus:outline-none ${
                            !commentText.trim()
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-blue-500 hover:bg-blue-600'
                          }`}
                        >
                          Comment
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}