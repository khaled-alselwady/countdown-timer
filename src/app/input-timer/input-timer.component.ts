import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Timer } from './input-timer.model';

@Component({
  selector: 'app-input-timer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-timer.component.html',
  styleUrl: './input-timer.component.css',
})
export class InputTimerComponent {
  inputTimerData = signal<Timer>({ hours: 0, minutes: 0, title: '' });

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
    console.log(this.inputTimerData());
    this.reset();
  }
}
