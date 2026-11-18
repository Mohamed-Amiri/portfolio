import { Component, input } from '@angular/core';

/** Home-page section: anchor id, eyebrow label, heading, and projected content. */
@Component({
  selector: 'app-section',
  standalone: true,
  template: `
    <section class="section" [id]="id()" [attr.aria-labelledby]="id() + '-title'">
      <div class="container">
        <header class="section__head">
          <p class="eyebrow">{{ eyebrow() }}</p>
          <h2 [id]="id() + '-title'">{{ heading() }}</h2>
          @if (lede()) {
            <p class="muted lede">{{ lede() }}</p>
          }
        </header>
        <ng-content />
      </div>
    </section>
  `,
  styles: [
    `
      .section {
        padding: var(--space-8) 0;
        border-top: 1px solid var(--border);
      }
      .section__head {
        display: grid;
        gap: var(--space-3);
        margin-bottom: var(--space-6);
      }
      .lede {
        max-width: var(--measure);
        font-size: var(--text-md);
      }
    `,
  ],
})
export class SectionComponent {
  id = input.required<string>();
  eyebrow = input.required<string>();
  heading = input.required<string>();
  lede = input<string>();
}
