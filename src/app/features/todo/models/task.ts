export interface Task {
  id: number;
  title: string;
  description: string;
  category: 'Work' | 'Personal' | 'Study' | 'Others';
  dueDate: string;
  completed: boolean;
  createdAt: string;
}
