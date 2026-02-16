export interface Task {
  id: number;
  title: string;
  category: 'Work' | 'Personal' | 'Study';
  dueDate: string;
  completed: boolean;
  createdAt: string;
}
