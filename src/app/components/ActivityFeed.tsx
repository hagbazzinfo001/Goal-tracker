'use client';
import Image from 'next/image';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {  formatDistanceToNow } from 'date-fns';
import { useGoals } from '../../context/GoalContext';
import { FiMessageCircle, FiCheckCircle, FiTarget, FiFlag, FiPlus } from 'react-icons/fi';

export default function ActivityFeed() {
  const { goals } = useGoals();
  
  // Generate activity items from goals, comments, and milestones
  const activityItems = useMemo(() => {
    const items: {
      id: string;
      type: 'goal_created' | 'comment_added' | 'milestone_completed' | 'progress_updated';
      goalId: string;
      goalTitle: string;
      timestamp: string;
      userName?: string;
      userAvatar?: string;
      content?: string;
      milestoneName?: string;
      progressValue?: number;
    }[] = [];
    
    // Add goal creation events
    goals.forEach(goal => {
      items.push({
        id: `goal-${goal.id}`,
        type: 'goal_created',
        goalId: goal.id,
        goalTitle: goal.title,
        timestamp: goal.createdAt,
      });
      
      // Add comments
      interface Comment {
        id: string;
        createdAt: string;
        user: {
          name: string;
          avatar?: string;
        };
        content: string;
      }

      goal.comments.forEach((comment: Comment) => {
        items.push({
          id: `comment-${comment.id}`,
          type: 'comment_added',
          goalId: goal.id,
          goalTitle: goal.title,
          timestamp: comment.createdAt,
          userName: comment.user.name,
          userAvatar: comment.user.avatar,
          content: comment.content,
        });
      });
      
      // Add completed milestones
      interface Milestone {
        id: string;
        title: string;
        dueDate: string;
        completed: boolean;
      }

      goal.milestones.filter((m: Milestone) => m.completed).forEach((milestone: Milestone) => {
        items.push({
          id: `milestone-${milestone.id}`,
          type: 'milestone_completed',
          goalId: goal.id,
          goalTitle: goal.title,
          timestamp: milestone.dueDate, // Using due date as completion timestamp
          milestoneName: milestone.title,
        });
      });
      
      // Add progress updates (for goals with progress > 0)
      if (goal.progress > 0 && goal.progress < goal.target) {
        items.push({
          id: `progress-${goal.id}`,
          type: 'progress_updated',
          goalId: goal.id,
          goalTitle: goal.title,
          timestamp: goal.createdAt, // Using creation date as a fallback
          progressValue: goal.progress,
        });
      }
    });
    
    // Sort by timestamp, most recent first
    items.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Take only the 5 most recent items
    return items.slice(0, 5);
  }, [goals]);

  if (activityItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full mb-3">
          <FiTarget className="h-6 w-6 text-blue-500 dark:text-blue-400" />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">No activity yet</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Activity will appear here as you create goals, add comments, and complete milestones.
        </p>
      </div>
    );
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.ul 
      className="space-y-3 max-h-[350px] overflow-y-auto pr-1 -mr-1"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {activityItems.map((activity) => (
        <motion.li 
          key={activity.id}
          variants={item}
          className="flex items-start space-x-3 pb-3 border-b border-gray-100 dark:border-slate-700 last:border-0 last:pb-0"
        >
          {/* Icon based on activity type */}
          <div className={`flex-shrink-0 p-1.5 rounded-full mt-0.5 
            ${activity.type === 'goal_created' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400' : ''}
            ${activity.type === 'comment_added' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400' : ''}
            ${activity.type === 'milestone_completed' ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' : ''}
            ${activity.type === 'progress_updated' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400' : ''}
          `}>
            {activity.type === 'goal_created' && <FiPlus className="h-3.5 w-3.5" />}
            {activity.type === 'comment_added' && <FiMessageCircle className="h-3.5 w-3.5" />}
            {activity.type === 'milestone_completed' && <FiCheckCircle className="h-3.5 w-3.5" />}
            {activity.type === 'progress_updated' && <FiFlag className="h-3.5 w-3.5" />}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between mb-1">
              <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                {activity.type === 'goal_created' && 'New goal created'}
                {activity.type === 'comment_added' && (
                  <span className="flex items-center">
                    {activity.userAvatar ? (
                    <Image 
                      src={activity.userAvatar} 
                      alt={activity.userName || 'User Avatar'} 
                      className="w-4 h-4 rounded-full mr-1.5"
                    />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-gray-300 mr-1.5" />
                  )}
                    {activity.userName}
                  </span>
                )}
                {activity.type === 'milestone_completed' && 'Milestone completed'}
                {activity.type === 'progress_updated' && 'Progress updated'}
              </div>
              
              <div className="text-[10px] text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </div>
            </div>
            
            <p className="text-xs text-gray-700 dark:text-gray-300 mb-1 truncate">
              {activity.type === 'goal_created' && (
                <span>
                  Goal &quot;<span className="font-medium">{activity.goalTitle}</span>&quot; was created
                </span>
              )}
              {activity.type === 'comment_added' && (
                <span>
                  Commented on &quot;<span className="font-medium">{activity.goalTitle}</span>&quot;
                </span>
              )}
              {activity.type === 'milestone_completed' && (
                <span>
                  Milestone &quot;<span className="font-medium">{activity.milestoneName}</span>&quot; for goal &quot;<span className="font-medium">{activity.goalTitle}</span>&quot;
                </span>
              )}
              {activity.type === 'progress_updated' && (
                <span>
                  Progress on &quot;<span className="font-medium">{activity.goalTitle}</span>&quot; updated to {activity.progressValue}%
                </span>
              )}
            </p>
            
            {activity.type === 'comment_added' && activity.content && (
              <div className="text-xs italic text-gray-500 dark:text-gray-400 mt-1 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                &quot;{activity.content.length > 60 ? `${activity.content.substring(0, 60)}...` : activity.content}&quot;
              </div>
            )}
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}