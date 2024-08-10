import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTimer } from './input-timer.model';

@Component({
  selector: 'app-input-timer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-timer.component.html',
  styleUrl: './input-timer.component.css',
})
export class InputTimerComponent {
  inputTimerData = signal<InputTimer>({ hours: 0, minutes: 0, title: '' });

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

  onSubmit() {
    this.validateInputs();
    console.log(this.inputTimerData());
  }
}
