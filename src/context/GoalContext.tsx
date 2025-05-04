'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Goal, Milestone, Comment, GoalCategory, GoalPriority } from '../types';
import { generateMockGoals, currentUser } from '../utils/mockData';

interface GoalContextProps {
  goals: Goal[];
  filteredGoals: Goal[];
  selectedGoal: Goal | null;
  addGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'isCompleted' | 'progress' | 'milestones' | 'comments'>) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  deleteGoal: (goalId: string) => void;
  addComment: (goalId: string, content: string) => void;
  addMilestone: (goalId: string, milestone: Omit<Milestone, 'id' | 'goalId'>) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  setSelectedGoal: (goal: Goal | null) => void;
  updateProgress: (goalId: string, progress: number) => void;
  filterGoals: (category?: GoalCategory | 'all', completed?: boolean, priority?: GoalPriority | 'all') => void;
  activeFilters: {
    category: GoalCategory | 'all';
    completed: boolean | 'all';
    priority: GoalPriority | 'all';
  };
}

const GoalContext = createContext<GoalContextProps | undefined>(undefined);

export function GoalProvider({ children }: { children: ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    category: 'all' as GoalCategory | 'all',
    completed: 'all' as boolean | 'all',
    priority: 'all' as GoalPriority | 'all',
  });

  // Initialize with mock data
  useEffect(() => {
    const mockGoals = generateMockGoals();
    setGoals(mockGoals);
    setFilteredGoals(mockGoals);
  }, []);

  const addGoal = (newGoalData: Omit<Goal, 'id' | 'createdAt' | 'isCompleted' | 'progress' | 'milestones' | 'comments'>) => {
    const newGoal: Goal = {
      ...newGoalData,
      id: `goal-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isCompleted: false,
      progress: 0,
      milestones: [],
      comments: [],
    };

    setGoals(prevGoals => [...prevGoals, newGoal]);
    applyFilters([...goals, newGoal], activeFilters);
  };

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals(prevGoals => {
      const newGoals = prevGoals.map(goal => 
        goal.id === goalId ? { ...goal, ...updates } : goal
      );
      
      if (selectedGoal && selectedGoal.id === goalId) {
        setSelectedGoal({ ...selectedGoal, ...updates });
      }
      
      applyFilters(newGoals, activeFilters);
      return newGoals;
    });
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prevGoals => {
      const newGoals = prevGoals.filter(goal => goal.id !== goalId);
      applyFilters(newGoals, activeFilters);
      
      if (selectedGoal && selectedGoal.id === goalId) {
        setSelectedGoal(null);
      }
      
      return newGoals;
    });
  };

  const addComment = (goalId: string, content: string) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      goalId,
      userId: currentUser.id,
      user: currentUser,
      content,
      createdAt: new Date().toISOString(),
    };

    setGoals(prevGoals => {
      const newGoals = prevGoals.map(goal => {
        if (goal.id === goalId) {
          const updatedGoal = {
            ...goal,
            comments: [...goal.comments, newComment],
          };
          
          // Update selected goal if it's the one we're modifying
          if (selectedGoal && selectedGoal.id === goalId) {
            setSelectedGoal(updatedGoal);
          }
          
          return updatedGoal;
        }
        return goal;
      });
      
      applyFilters(newGoals, activeFilters);
      return newGoals;
    });
  };

  const addMilestone = (goalId: string, milestoneData: Omit<Milestone, 'id' | 'goalId'>) => {
    const newMilestone: Milestone = {
      ...milestoneData,
      id: `milestone-${Date.now()}`,
      goalId,
    };

    setGoals(prevGoals => {
      const newGoals = prevGoals.map(goal => {
        if (goal.id === goalId) {
          const updatedGoal = {
            ...goal,
            milestones: [...goal.milestones, newMilestone],
          };
          
          // Update selected goal if it's the one we're modifying
          if (selectedGoal && selectedGoal.id === goalId) {
            setSelectedGoal(updatedGoal);
          }
          
          return updatedGoal;
        }
        return goal;
      });
      
      applyFilters(newGoals, activeFilters);
      return newGoals;
    });
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(prevGoals => {
      const newGoals = prevGoals.map(goal => {
        if (goal.id === goalId) {
          const updatedMilestones = goal.milestones.map(milestone => 
            milestone.id === milestoneId 
              ? { ...milestone, completed: !milestone.completed } 
              : milestone
          );
          
          const updatedGoal = {
            ...goal,
            milestones: updatedMilestones,
          };
          
          // Update selected goal if it's the one we're modifying
          if (selectedGoal && selectedGoal.id === goalId) {
            setSelectedGoal(updatedGoal);
          }
          
          return updatedGoal;
        }
        return goal;
      });
      
      applyFilters(newGoals, activeFilters);
      return newGoals;
    });
  };

  const updateProgress = (goalId: string, progress: number) => {
    setGoals(prevGoals => {
      const newGoals = prevGoals.map(goal => {
        if (goal.id === goalId) {
          const isCompleted = progress >= goal.target;
          const updatedGoal = {
            ...goal,
            progress,
            isCompleted,
          };
          
          // Update selected goal if it's the one we're modifying
          if (selectedGoal && selectedGoal.id === goalId) {
            setSelectedGoal(updatedGoal);
          }
          
          return updatedGoal;
        }
        return goal;
      });
      
      applyFilters(newGoals, activeFilters);
      return newGoals;
    });
  };

  const filterGoals = (
    category: GoalCategory | 'all' = activeFilters.category,
    completed: boolean | 'all' = activeFilters.completed,
    priority: GoalPriority | 'all' = activeFilters.priority
  ) => {
    const newFilters = { category, completed, priority };
    setActiveFilters(newFilters);
    applyFilters(goals, newFilters);
  };

  const applyFilters = (
    goalsList: Goal[], 
    filters: {
      category: GoalCategory | 'all',
      completed: boolean | 'all',
      priority: GoalPriority | 'all'
    }
  ) => {
    let filtered = [...goalsList];
    
    if (filters.category !== 'all') {
      filtered = filtered.filter(goal => goal.category === filters.category);
    }
    
    if (filters.completed !== 'all') {
      filtered = filtered.filter(goal => goal.isCompleted === filters.completed);
    }
    
    if (filters.priority !== 'all') {
      filtered = filtered.filter(goal => goal.priority === filters.priority);
    }
    
    setFilteredGoals(filtered);
  };

  return (
    <GoalContext.Provider
      value={{
        goals,
        filteredGoals,
        selectedGoal,
        addGoal,
        updateGoal,
        deleteGoal,
        addComment,
        addMilestone,
        toggleMilestone,
        setSelectedGoal,
        updateProgress,
        filterGoals,
        activeFilters,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}

export function useGoals() {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoals must be used within a GoalProvider');
  }
  return context;
}