import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TwoDigitPipe } from '../../shared/two-digit.pipe';
import { Timer } from '../timer.model';

@Component({
  selector: 'tr[appTr]',
  standalone: true,
  imports: [TwoDigitPipe],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) timer!: Timer;
  isPaused: boolean = false;
  seconds = 59;
  private intervalId?: ReturnType<typeof setInterval>;
  @Output() delete = new EventEmitter<number>();

  isTimeOver() {
    return (
      this.timer.hours <= 0 && this.timer.minutes <= 0 && this.seconds <= 0
    );
  }

  handleCountdownTimer() {
    if (!this.timer) {
      return;
    }

    this.seconds--;

    if (this.seconds < 0) {
      this.seconds = 59;
      this.timer.minutes--;
    }

    if (this.timer.minutes < 0) {
      this.timer.minutes = 59;
      this.timer.hours--;
    }

    if (this.timer.hours < 0) {
      this.timer.hours = 0;
    }
    if (this.isTimeOver()) {
      this.stopTimer();
    }
  }

  startTimer() {
    this.stopTimer();
    this.intervalId = setInterval(() => this.handleCountdownTimer(), 1000);
  }

  stopTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  validateTimer() {
    if (this.timer.minutes < 0 && this.timer.hours !== 0) {
      this.seconds = 0;
    }
  }

  ngOnInit() {
    this.validateTimer();
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  onPause() {
    if (this.isPaused) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
    this.isPaused = !this.isPaused;
  }

  onDelete() {
    this.delete.emit(this.timer.id);
  }
}
