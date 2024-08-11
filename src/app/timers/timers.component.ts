import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  signal,
  ViewChildren,
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
})
export class TimersComponent implements OnInit {
  timers = signal<Timer[]>([]);
  isPaused = false;
  @ViewChildren('pause') pauseButtons?: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ViewChildren(CountdownTimerComponent)
  countdownTimerComponents?: QueryList<CountdownTimerComponent>;

  constructor(private renderer: Renderer2) {}

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
      minutes: timerData.minutes,
      title: timerData.title,
    });

    this.saveToLocalStorage();
  }

  addClassesToPauseButton(button: HTMLButtonElement, isPaused: boolean) {
    // Toggle classes using Renderer2
    this.renderer.removeClass(button, isPaused ? 'pause' : 'resume');
    this.renderer.addClass(button, isPaused ? 'resume' : 'pause');
  }

  changePauseButtonName(button: HTMLButtonElement) {
    if (!button) {
      return;
    }

    const isPaused = button.innerText === 'Pause';

    button.innerText = isPaused ? 'Resume' : 'Pause';

    this.addClassesToPauseButton(button, isPaused);
  }

  onTogglePause(id: number) {
    if (!this.countdownTimerComponents) {
      return;
    }

    for (const component of this.countdownTimerComponents) {
      if (component.timerId === id) {
        component.isPaused = !component.isPaused;
        if (component.isPaused) {
          component.stopTimer();
        } else {
          component.startTimer();
        }
        break;
      }
    }
  }

  onPause(id: number) {
    if (!this.pauseButtons) {
      return;
    }

    for (const buttonRef of this.pauseButtons) {
      const button = buttonRef.nativeElement;
      const timerId = button?.getAttribute('data-timer-id');
      if (timerId === null) {
        continue;
      }

      if (+timerId === id) {
        this.changePauseButtonName(button);
        break;
      }
    }

    this.onTogglePause(id);
    this.isPaused = !this.isPaused;
  }

  onDelete(id: number) {
    this.timers.set(this.timers().filter((timer) => timer.id !== id));
    this.saveToLocalStorage();
  }
}
