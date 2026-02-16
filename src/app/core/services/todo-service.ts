import { Injectable } from '@angular/core';
import { Task } from '../../features/todo/models/task';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storageKey = 'postit_tasks';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getTasks(): Task[] {
    if (!this.isBrowser()) return [];
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  saveTasks(tasks: Task[]) {
    if (!this.isBrowser()) return;
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  }
}
