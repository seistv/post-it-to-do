import { Injectable } from '@angular/core';
import { Task } from '../../features/todo/models/task';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storageKey = 'postit_tasks';
  private darkModeKey = 'darkmode';

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

  getTheme(): boolean {
    if (localStorage.getItem(this.darkModeKey) === 'enabled') {
      const themeIcon = document.getElementById('theme-icon');
      themeIcon?.classList.replace('bi-moon', 'bi-sun');
      return true;
    }
    return false;
  }

  toggleTheme(isDarkMode: boolean) {
    const themeIcon = document.getElementById('theme-icon');
    localStorage.setItem(this.darkModeKey, isDarkMode ? 'enabled' : 'disabled');
    themeIcon?.classList.replace(
      isDarkMode ? 'bi-moon' : 'bi-sun',
      isDarkMode ? 'bi-sun' : 'bi-moon',
    );
  }
}
