import { Component, signal } from '@angular/core';
import { Timer } from '../input-timer/input-timer.model';

@Component({
  selector: 'app-timers',
  standalone: true,
  imports: [],
  templateUrl: './timers.component.html',
  styleUrl: './timers.component.css',
})
export class TimersComponent {
  timers = signal<Timer[]>([]);
}
