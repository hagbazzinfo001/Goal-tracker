'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import CreateGoalModal from './components/modals/CreateGoalModal';
import GoalDetailsModal from './components/modals/GoalDetailsModal';
import { useGoals } from 'context/GoalContext';


export default function Home() {
  const { selectedGoal } = useGoals();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Navbar onCreateGoal={() => setShowCreateModal(true)} />
      
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <Dashboard onCreateGoal={() => setShowCreateModal(true)} />
      </motion.main>

      <Footer />

      {showCreateModal && (
        <CreateGoalModal onClose={() => setShowCreateModal(false)} />
      )}

      {selectedGoal && (
        <GoalDetailsModal />
      )}
    </div>
  );
}