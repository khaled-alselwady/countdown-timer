import { Component, inject,  signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Timer } from '../timer.model';
import { TimersService } from '../timers.service';

@Component({
  selector: 'app-input-timer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-timer.component.html',
  styleUrl: './input-timer.component.css',
})
export class InputTimerComponent {
  inputTimerData = signal<Timer>({ id: 0, hours: 0, minutes: 0, title: '' });

  private timersService = inject(TimersService);

  validateInputs() {
    if (this.inputTimerData().hours < 0) {
      this.inputTimerData().hours = 0;
    }
    if (this.inputTimerData().minutes < 0) {
      this.inputTimerData().minutes = 0;
    }
    if (this.inputTimerData().minutes > 60) {
      this.inputTimerData().minutes = 60;
    }
    if (this.inputTimerData().title.trim() === '') {
      this.inputTimerData().title = 'New Timer';
    }
  }

  reset() {
    this.inputTimerData().hours = 0;
    this.inputTimerData().minutes = 0;
    this.inputTimerData().title = '';
  }

  onSubmit() {
    this.validateInputs();
    this.timersService.addTimer({
      id: Math.random(),
      hours: this.inputTimerData().hours,
      minutes: this.inputTimerData().minutes,
      title: this.inputTimerData().title,
    });
    this.reset();
  }
}
