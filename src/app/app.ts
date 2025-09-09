import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

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
    trigger('list1', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({
          tranform: 'translateX(100px)',
          opacity: 0
        }))
      ]),
    ]),
    trigger('list2', [
      state(
        'in',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      transition('void => *', [
        animate(1000, keyframes([
          style({ tranform: 'translateX(-100px)', opacity: 0, offset: 0 }),
          style({ tranform: 'translateX(-50px)', opacity: 0.5, offset: 0.3 }),
          style({ tranform: 'translateX(-20px)', opacity: 1, offset: 0.8 }),
          style({ tranform: 'translateX(0)', opacity: 1, offset: 1 }),
        ]))
      ]),
      transition('* => void', [
        animate(300, style({
          tranform: 'translateX(100px)',
          opacity: 0
        }))
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
