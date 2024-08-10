import {
  Component,
  ElementRef,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import type { Timer } from './timer.model';
import { InputTimerComponent } from './input-timer/input-timer.component';
import { TwoDigitPipe } from '../shared/two-digit.pipe';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';

@Component({
  selector: 'app-timers',
  standalone: true,
  imports: [InputTimerComponent, TwoDigitPipe, CountdownTimerComponent],
  templateUrl: './timers.component.html',
  styleUrl: './timers.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class TimersComponent {
  timers = signal<Timer[]>([]);
  @ViewChild('pause') pauseElement?: ElementRef<HTMLButtonElement>;

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
      minutes: timerData.minutes,
      title: timerData.title,
    });
  }

  changePauseButtonName() {
    if (!this.pauseElement) {
      return;
    }

    if (this.pauseElement.nativeElement.innerHTML === 'Pause') {
      this.pauseElement.nativeElement.innerHTML = 'Resume';
    } else {
      this.pauseElement.nativeElement.innerHTML = 'Pause';
    }
  }

  onPause() {
    this.changePauseButtonName();
  }

  onDelete(id: number) {
    this.timers.set(this.timers().filter((timer) => timer.id !== id));
  }
}
