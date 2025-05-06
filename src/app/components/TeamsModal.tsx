'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiCloud, FiLayout, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Image from 'next/image';
interface TeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export default function TeamsModal({ isOpen, onClose }: TeamsModalProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < aboutText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + aboutText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (isOpen) {
      setDisplayedText('');
      setCurrentIndex(0);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 mt-20 pt-50 overflow-y-auto pt-40"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            className="bg-white dark:bg-slate-800 rounded-lg max-w-4xl w-full shadow-xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>

            <div className="max-w-4xl mx-auto px-4 pb-8">
              <div className=" overflow-hidden rounded-lg pt-80 justify-center flex items-center" >
                <Image
                  src="https://i.postimg.cc/yxwg4krP/IMG-0667-removebg.png"
                  alt="Profile"
                  className="  object-contain center rounded-lg"
                  width={500}
                  height={500}
                />
              </div>

              <div className="p-8 bg-white dark:bg-slate-800 rounded-lg shadow-xl mb-8">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center"
                >
                  About Me
                </motion.h1>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                  Skills & Expertise
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {skills.map((skillGroup, index) => (
                    <motion.div
                      key={skillGroup.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.2 }}
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
                            transition={{ delay: 0.9 + index * 0.1 + skillIndex * 0.1 }}
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}