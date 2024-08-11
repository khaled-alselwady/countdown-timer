import { Component, OnInit, signal } from '@angular/core';
import type { Timer } from './timer.model';
import { InputTimerComponent } from './input-timer/input-timer.component';
import { TwoDigitPipe } from '../shared/two-digit.pipe';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-timers',
  standalone: true,
  imports: [InputTimerComponent, TwoDigitPipe, TimerComponent],
  templateUrl: './timers.component.html',
  styleUrl: './timers.component.css',
})
export class TimersComponent implements OnInit {
  timers = signal<Timer[]>([]);

  ngOnInit() {
    const timersJson = localStorage.getItem('timers');

    if (timersJson) {
      this.timers.set(JSON.parse(timersJson));
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('timers', JSON.stringify(this.timers()));
  }

  getMaxId() {
    return Math.max(...this.timers().map((t) => t.id));
  }

  createNewId() {
    return this.timers().length === 0 ? 1 : this.getMaxId() + 1;
  }

  onAddNewTimer(timerData: Timer) {
    this.timers().push({
      id: this.createNewId(),
      hours: timerData.hours,
      minutes: --timerData.minutes,
      title: timerData.title,
    });

    this.saveToLocalStorage();
  }

  onDelete(id: number) {
    this.timers.set(this.timers().filter((timer) => timer.id !== id));
    this.saveToLocalStorage();
  }
}
