import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
      transition('normal <=> highlighted', animate(300)),
      // transition('highlighted => normal', animate(1000))
    ]),
    trigger('wildState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(100) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          'background-color': 'blue',
          transform: 'translateX(100px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          'background-color': 'green',
          transform: 'translateX(100px) scale(0.5)',
        })
      ),
      // transition('normal <=> highlighted', animate(300)),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({ 'background-color': 'orange' }),
        animate(1000, style({ borderRadius: '50px' })),
        animate(500),
      ]),
    ]),
  ],
})
export class App {
  state = signal<'normal' | 'highlighted'>('normal');
  wildState = signal<'normal' | 'highlighted' | 'shrunken'>('normal');
  list = signal<string[]>(['Milk', 'Sugar', 'Bread']);

  onAdd(item: string) {
    if (item.trim()) {
      this.list.update((list) => [...list, item]);
    }
  }

  onDelete(item: string) {
    this.list.update((list) => list.filter((i) => i !== item));
  }

  onAnimate() {
    this.state.set(this.state() === 'normal' ? 'highlighted' : 'normal');
    this.wildState.set(this.wildState() === 'normal' ? 'highlighted' : 'normal');
  }

  onShrink() {
    this.wildState.set('shrunken');
  }
}
