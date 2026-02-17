import { Component, computed, inject, signal } from '@angular/core';
import { Task } from './models/task';
import { TodoService } from '../../core/services/todo-service';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo',
  imports: [FormsModule, DragDropModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
export class Todo {
  tasks = signal<Task[]>([]);
  filter = signal<'All' | 'Pending' | 'Completed'>('All');
  isDarkMode = signal(false);
  private todoService = inject(TodoService);

  newTask: Task = {
    id: 0,
    title: '',
    category: 'Work',
    dueDate: '',
    completed: false,
    createdAt: '',
  };

  ngOnInit(): void {
    this.tasks.set(this.todoService.getTasks());
  }

  addTask() {
    if (!this.newTask.title.trim()) return;

    const task: Task = {
      ...this.newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false,
    };

    this.tasks.update((tasks) => [...tasks, task]);
    this.todoService.saveTasks(this.tasks());
    this.newTask.title = '';
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
    this.todoService.saveTasks(this.tasks());
  }

  deleteTask(id: number) {
    this.tasks.set(this.tasks().filter((t) => t.id !== id));
    this.todoService.saveTasks(this.tasks());
  }

  setFilter(filter: 'All' | 'Pending' | 'Completed') {
    this.filter.set(filter);
  }

  filteredTasks = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();

    if (filter === 'Completed') return tasks.filter((t) => t.completed);
    if (filter === 'Pending') return tasks.filter((t) => !t.completed);
    return tasks;
  });

  completedCount = computed(() => this.tasks().filter((t) => t.completed).length);

  remainingCount = computed(() => this.tasks().filter((t) => !t.completed).length);

  toggleTheme() {
    this.isDarkMode.update((v) => !v);
  }

  drop(event: CdkDragDrop<Task[]>) {
    // if (event.previousIndex === event.currentIndex) return;

    // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    // this.todoService.saveTasks(this.tasks());

    const updated = [...this.tasks()];
    moveItemInArray(updated, event.previousIndex, event.currentIndex);
    this.tasks.set(updated);
    this.todoService.saveTasks(updated);
  }

  isOverdue(task: Task): boolean {
    if (!task.dueDate || task.completed) return false;

    const today = new Date();
    const due = new Date(task.dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    return due < today;
  }
}
