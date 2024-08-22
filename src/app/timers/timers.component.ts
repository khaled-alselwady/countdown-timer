import { Component, inject } from '@angular/core';
import { InputTimerComponent } from './input-timer/input-timer.component';
import { TwoDigitPipe } from '../shared/two-digit.pipe';
import { TimerComponent } from './timer/timer.component';
import { TimersService } from './timers.service';

@Component({
  selector: 'app-timers',
  standalone: true,
  imports: [InputTimerComponent, TwoDigitPipe, TimerComponent],
  templateUrl: './timers.component.html',
  styleUrl: './timers.component.css',
})
export class TimersComponent {
  private timersService = inject(TimersService);

  timers = this.timersService.allTimers;

  getMaxId() {
    return Math.max(...this.timers().map((t) => t.id));
  }

  createNewId() {
    return this.timers().length === 0 ? 1 : this.getMaxId() + 1;
  }
}
