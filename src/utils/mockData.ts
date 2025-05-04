import { User, Goal, Team, Comment, Milestone, GoalCategory, GoalPriority } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    name: 'Jamie Chen',
    email: 'jamie@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '3',
    name: 'Taylor Swift',
    email: 'taylor@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: '4',
    name: 'Morgan Freeman',
    email: 'morgan@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
];

// Mock Teams
export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Marketing Team',
    description: 'Responsible for all marketing activities',
    members: [mockUsers[0], mockUsers[1]],
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: '2',
    name: 'Development Team',
    description: 'Building and maintaining our products',
    members: [mockUsers[1], mockUsers[2], mockUsers[3]],
    avatar: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
  },
];

// Helper function to generate comments
const generateComments = (goalId: string, count: number): Comment[] => {
  return Array(count).fill(null).map((_, index) => {
    const userId = mockUsers[index % mockUsers.length].id;
    return {
      id: `comment-${goalId}-${index}`,
      goalId,
      userId,
      user: mockUsers.find(user => user.id === userId)!,
      content: [
        'Great progress on this goal!',
        'Keep up the good work.',
        'I think we should reconsider our approach here.',
        'Let me know if you need any help with this.',
        'I completed a similar goal last month. Happy to share insights.',
      ][Math.floor(Math.random() * 5)],
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
};

// Helper function to generate milestones
const generateMilestones = (goalId: string, count: number): Milestone[] => {
  return Array(count).fill(null).map((_, index) => {
    const isCompleted = Math.random() > 0.5;
    return {
      id: `milestone-${goalId}-${index}`,
      goalId,
      title: [
        'Research phase',
        'Initial planning',
        'Halfway point',
        'Final review',
        'Implementation complete',
      ][Math.floor(Math.random() * 5)],
      description: 'Complete this milestone to move forward',
      completed: isCompleted,
      dueDate: new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
};

// Mock Goals
export const generateMockGoals = (): Goal[] => {
  const categories: GoalCategory[] = ['personal', 'work', 'health', 'learning', 'finance'];
  const priorities: GoalPriority[] = ['low', 'medium', 'high'];
  
  return Array(10).fill(null).map((_, index) => {
    const id = `goal-${index + 1}`;
    const isTeamGoal = index % 3 === 0;
    const userId = mockUsers[index % mockUsers.length].id;
    const teamId = isTeamGoal ? mockTeams[index % mockTeams.length].id : undefined;
    const progress = Math.floor(Math.random() * 100);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    
    return {
      id,
      title: [
        'Complete project documentation',
        'Learn a new programming language',
        'Increase website traffic by 20%',
        'Reduce monthly expenses',
        'Exercise 3 times per week',
        'Read 12 books this year',
        'Launch new product feature',
        'Improve team collaboration',
        'Master public speaking',
        'Save for vacation',
      ][index],
      description: 'This is a detailed description of the goal and what needs to be accomplished.',
      category,
      progress,
      target: 100,
      unit: '%',
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      dueDate: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      userId,
      teamId,
      isTeamGoal,
      priority,
      milestones: generateMilestones(id, Math.floor(Math.random() * 3) + 2),
      comments: generateComments(id, Math.floor(Math.random() * 4) + 1),
      isCompleted: progress === 100,
    };
  });
};

// Mock current user
export const currentUser: User = mockUsers[0];