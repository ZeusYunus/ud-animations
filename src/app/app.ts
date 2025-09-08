import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          'background-color': 'blue',
          transform: 'translateX(100px)',
        })
      ),
    ]),
  ],
})
export class App {
  state = signal<'normal' | 'highlighted'>('normal');
  list = signal<string[]>(['Milk', 'Sugar', 'Bread']);

  onAdd(item: string) {
    if (item.trim()) {
      this.list.update((list) => [...list, item]);
    }
  }

  onDelete(item: string) {
    this.list.update((list) => list.filter((i) => i !== item));
  }
}
