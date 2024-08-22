import { afterNextRender, Injectable, signal } from '@angular/core';
import { Timer } from './timer.model';

@Injectable({ providedIn: 'root' })
export class TimersService {
  private timers = signal<Timer[]>([]);

  constructor() {
    afterNextRender(() => {
      const timersJson = localStorage.getItem('timers');

      if (timersJson) {
        this.timers.set(JSON.parse(timersJson));
      }
    });
  }

  allTimers = this.timers.asReadonly();

  addTimer(taskData: Timer) {
    this.timers().push(taskData);
    this.saveToLocalStorage();
  }

  removeTimer(id: number) {
    this.timers.update((oldTimer) =>
      oldTimer.filter((timer) => timer.id !== id)
    );
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('timers', JSON.stringify(this.timers()));
  }
}
