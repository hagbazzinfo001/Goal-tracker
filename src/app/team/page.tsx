'use client';

import { motion } from 'framer-motion';
import { FiCode, FiCloud, FiLayout } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import GoalDetailsModal from '../components/modals/GoalDetailsModal';
import { useGoals } from 'context/GoalContext';
import CreateGoalModal from '../components/modals/CreateGoalModal';

const skills = [
  {
    category: 'Frontend Development',
    icon: <FiLayout />,
    items: ['React', 'Next.js', 'TailwindCSS', 'HTML5', 'CSS3', 'JavaScript/TypeScript']
  },
  {
    category: 'Cloud Engineering',
    icon: <FiCloud />,
    items: ['AWS', 'Docker', 'CI/CD', 'Serverless', 'Microservices']
  },
  {
    category: 'Tools & Technologies',
    icon: <FiCode />,
    items: ['Git', 'GitHub Actions', 'REST APIs', 'GraphQL', 'Node.js']
  }
];

const aboutText = `A software developer skilled in designing, developing, and implementing innovative software solutions. Proficient in programming languages, software architecture, and debugging, with a strong focus on creating user-friendly applications. Experienced in collaborating with cross-functional teams, meeting project deadlines, and continuously enhancing technical skills to stay updated with industry trends. Passionate about problem-solving and leveraging technology to drive efficiency and deliver high-quality solutions.`;

export default function TeamsPage() {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < aboutText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + aboutText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Adjust speed of typing here

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { selectedGoal } = useGoals();

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800" suppressContentEditableWarning>
                <Navbar onCreateGoal={() => setShowCreateModal(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" suppressContentEditableWarning>
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden mb-12"
          >
            <div className="aspect-w-16 aspect-h-9 max-h-[400px] overflow-hidden justify-center flex items-center">
              <Image
                src="https://i.postimg.cc/yxwg4krP/IMG-0667-removebg.png"
                alt="Profile"
                className="  center rounded-lg"
                width={500}
                height={500}
              />
            </div>
            
            {/* Animated Text */}
            <div className="p-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center" 
              >
                About Me
              </motion.h1>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center mb-4">
                {displayedText}
                <motion.span
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block w-0.5 h-4 bg-blue-500 ml-1"
                >
                  |
                </motion.span>
              </p>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Skills & Expertise</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.2) }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 text-blue-500 dark:text-blue-400">
                    <span className="text-xl">{skillGroup.icon}</span>
                    <h3 className="font-semibold">{skillGroup.category}</h3>
                  </div>
                  
                  <ul className="space-y-2">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + (index * 0.1) + (skillIndex * 0.1) }}
                        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <span>{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
         <Footer />
      
            {showCreateModal && (
              <CreateGoalModal onClose={() => setShowCreateModal(false)} />
            )}
      
            {selectedGoal && (
              <GoalDetailsModal/>
            )}
    </div>
  );
}