import { Component, inject } from '@angular/core';
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
  tasks: Task[] = [];
  filter: string = 'All';
  isDarkMode = false;
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
    this.tasks = this.todoService.getTasks();
  }

  addTask() {
    if (!this.newTask.title.trim()) return;

    const task: Task = {
      ...this.newTask,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      completed: false,
    };

    this.tasks.push(task);
    this.todoService.saveTasks(this.tasks);
    this.newTask.title = '';
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
    this.todoService.saveTasks(this.tasks);
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.todoService.saveTasks(this.tasks);
  }

  setFilter(filter: string) {
    this.filter = filter;
  }

  // filteredTasks() {
  //   if (this.filter === 'Completed') {
  //     return this.tasks.filter((t) => t.completed);
  //   }

  //   if (this.filter === 'Pending') {
  //     return this.tasks.filter((t) => !t.completed);
  //   }

  //   return this.tasks;
  // }

  shouldShow(task: Task): boolean {
    if (this.filter === 'Completed') return task.completed;
    if (this.filter === 'Pending') return !task.completed;
    return true;
  }

  get completedCount() {
    return this.tasks.filter((t) => t.completed).length;
  }

  get remainingCount() {
    return this.tasks.filter((t) => !t.completed).length;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
  }

  drop(event: CdkDragDrop<Task[]>) {
    // moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
    // this.todoService.saveTasks(this.tasks);
    if (event.previousIndex === event.currentIndex) return;

    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    this.todoService.saveTasks(this.tasks);
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
