import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TwoDigitPipe } from '../../shared/two-digit.pipe';

@Component({
  selector: 'td[appTd]',
  standalone: true,
  imports: [TwoDigitPipe],
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.css',
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input({ required: true }) time!: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  private seconds = 60;
  private intervalId?: ReturnType<typeof setInterval>;

  isTimeOver() {
    return (
      this.time.hours <= 0 && this.time.minutes <= 0 && this.time.seconds <= 0
    );
  }

  handleCountdownTimer() {
    if (!this.time) return;

    this.time.seconds = this.seconds;
    this.seconds--;

    if (this.seconds < 0) {
      this.seconds = 60;
      this.time.minutes--;
    }

    if (this.time.minutes < 0) {
      this.time.minutes = 60;
      this.time.hours--;
    }

    if (this.time.hours < 0) {
      this.time.hours = 0;
    }

    if (this.isTimeOver()) {
      clearInterval(this.intervalId);
    }
  }

  ngOnInit() {
    this.intervalId = setInterval(() => this.handleCountdownTimer(), 1000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
