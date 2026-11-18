import { Component, input } from '@angular/core';
import { isTodo } from '../content/models';
import { TodoComponent } from './todo.component';

/** Renders paragraphs and bullets from a case-study section, swapping TODO strings for placeholders. */
@Component({
  selector: 'app-rich-text',
  standalone: true,
  imports: [TodoComponent],
  template: `
    @for (p of paragraphs(); track $index) {
      @if (isTodo(p)) {
        <p><app-todo [text]="p" /></p>
      } @else {
        <p>{{ p }}</p>
      }
    }
    @if (bullets()?.length) {
      <ul>
        @for (b of bullets(); track $index) {
          <li>
            @if (isTodo(b)) {
              <app-todo [text]="b" />
            } @else {
              {{ b }}
            }
          </li>
        }
      </ul>
    }
  `,
})
export class RichTextComponent {
  paragraphs = input<string[]>([]);
  bullets = input<string[]>();
  readonly isTodo = isTodo;
}
