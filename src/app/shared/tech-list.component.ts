import { Component, input } from '@angular/core';

/** Monospace, comma-free list of technologies. */
@Component({
  selector: 'app-tech-list',
  standalone: true,
  template: `
    <ul class="tech" [attr.aria-label]="label()">
      @for (item of items(); track item) {
        <li>{{ item }}</li>
      }
    </ul>
  `,
  styles: [
    `
      .tech {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem 0.6rem;
        list-style: none;
        padding: 0;
        margin: 0;
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        color: var(--fg-muted);
      }
      li {
        padding: 0.2rem 0.5rem;
        border: 1px solid var(--border);
        border-radius: 4px;
        white-space: nowrap;
      }
    `,
  ],
})
export class TechListComponent {
  items = input.required<string[]>();
  label = input('Technologies');
}
