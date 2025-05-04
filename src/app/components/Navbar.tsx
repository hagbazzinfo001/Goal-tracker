'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FiTarget, FiMenu, FiX, FiSun, FiMoon, FiPlus } from 'react-icons/fi';
import { currentUser } from '../../utils/mockData';
import Image from 'next/image';

interface NavbarProps {
  onCreateGoal: () => void;
}

export default function Navbar({ onCreateGoal }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FiTarget className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">GoalTrack</span>
            </motion.div>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="border-blue-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </a>
              <a href="#" className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Teams
              </a>
              <a href="#" className="border-transparent text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Analytics
              </a>
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCreateGoal}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center text-sm font-medium transition-colors duration-200"
            >
              <FiPlus className="mr-2" />
              New Goal
            </motion.button>
            
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none"
            >
              {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            
            <div className="relative">
              <div className="flex items-center">
                <Image
                  className="h-8 w-8 rounded-full border-2 border-gray-200 dark:border-slate-600"
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  width={32} // Specify the width
  height={32} // Specify the height
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none mr-2"
            >
              {theme === 'dark' ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          className="sm:hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-blue-50 dark:bg-slate-700 border-l-4 border-blue-500 text-blue-700 dark:text-white block pl-3 pr-4 py-2 text-base font-medium"
            >
              Dashboard
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-gray-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Teams
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:border-gray-300 dark:hover:border-gray-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Analytics
            </a>
            <div className="pt-4 pb-2">
              <button
                onClick={onCreateGoal}
                className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                <FiPlus className="mr-2" />
                New Goal
              </button>
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-slate-700">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <Image
                  className="h-10 w-10 rounded-full"
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  width={40} // Specify the width
  height={40} // Specify the height
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800 dark:text-white">{currentUser.name}</div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">{currentUser.email}</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}