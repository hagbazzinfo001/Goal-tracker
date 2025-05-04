export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Comment {
  id: string;
  goalId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface Milestone {
  id: string;
  goalId: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

export type GoalCategory = 'personal' | 'work' | 'health' | 'learning' | 'finance';
export type GoalPriority = 'low' | 'medium' | 'high';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  progress: number;
  target: number;
  unit: string;
  createdAt: string;
  dueDate: string;
  userId: string;
  teamId?: string;
  isTeamGoal: boolean;
  priority: GoalPriority;
  milestones: Milestone[];
  comments: Comment[];
  isCompleted: boolean;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  members: User[];
  avatar: string;
}