'use client';

import { motion } from 'framer-motion';
import { FiTarget, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and description */}
          <div className="md:col-span-2">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FiTarget className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-lg font-bold text-gray-900 dark:text-white">GoalTrack</span>
            </motion.div>
            
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-md">
              Set, track, and achieve your personal and team goals with powerful visualization tools.
              Stay motivated and measure your progress as you reach new milestones.
            </p>
            
            <div className="mt-4 flex space-x-4">
              <motion.a 
                href="https://www.linkedin.com/in/owolabi-agbabiaka/" 
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                whileHover={{ scale: 1.1 }}
              >
                <span className="sr-only">Twitter</span>
                <FiLinkedin className="h-5 w-5" />
              </motion.a>
              
              <motion.a 
                href="https://github.com/hagbazzinfo001/Goal-tracker.git" 
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                whileHover={{ scale: 1.1 }}
              >
                <span className="sr-only">GitHub</span>
                <FiGithub className="h-5 w-5" />
              </motion.a>
              
              <motion.a 
                href="mailto:agbabiakahammed003@gmail.com" 
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                whileHover={{ scale: 1.1 }}
              >
                <span className="sr-only">Email</span>
                <FiMail className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              <motion.li whileHover={{ x: 2 }}>
                <li className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Features
                </li>
              </motion.li>
              <motion.li whileHover={{ x: 2 }}>
                <li className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Pricing
                </li>
              </motion.li>
              <motion.li whileHover={{ x: 2 }}>
                <li className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Teams
                </li>
              </motion.li>
              <motion.li whileHover={{ x: 2 }}>
                < li href="#" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Feedback
                </li>
              </motion.li>
            </ul>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Support
            </h3>
            <ul className="mt-4 space-y-3">
              <motion.li whileHover={{ x: 2 }}>
                <li   className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Help Center
                </li>
              </motion.li>
              <motion.li whileHover={{ x: 2 }}>
                <li className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Privacy
                </li>
              </motion.li>
              <motion.li whileHover={{ x: 2 }}>
                <li className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Terms
                </li>
              </motion.li>
              <motion.li whileHover={{ x: 2 }}>
                <a href="mailto:agbabiakahammed003@gmail.com" className="text-sm text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                  Contact Us
                </a>
              </motion.li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-slate-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            &copy; {currentYear} GoalTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}