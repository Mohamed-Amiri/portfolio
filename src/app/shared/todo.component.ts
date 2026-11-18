import { Component, input } from '@angular/core';

/**
 * Visible placeholder for content the owner has not supplied yet.
 * Renders the TODO text so it is obvious in review and impossible to miss before launch.
 */
@Component({
  selector: 'app-todo',
  standalone: true,
  template: `<span class="todo" role="note"><span class="todo__tag mono">TODO</span> {{ body() }}</span>`,
  styles: [
    `
      .todo {
        display: inline-block;
        padding: 0.35rem 0.6rem;
        border: 1px dashed var(--todo-border);
        background: var(--todo-bg);
        color: var(--todo-fg);
        border-radius: var(--radius);
        font-size: var(--text-sm);
        line-height: 1.5;
      }
      .todo__tag {
        font-weight: 600;
        font-size: 0.7rem;
        letter-spacing: 0.06em;
        margin-right: 0.35rem;
      }
    `,
  ],
})
export class TodoComponent {
  text = input.required<string>();
  body = () => this.text().replace(/^\s*TODO:?\s*/, '');
}
