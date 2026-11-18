import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="container nf">
      <p class="eyebrow">404</p>
      <h1>There's nothing here.</h1>
      <p class="muted">The page you were looking for doesn't exist or has moved.</p>
      <p><a class="btn btn--primary" routerLink="/">Back to the home page</a></p>
    </section>
  `,
  styles: [
    `
      .nf {
        display: grid;
        gap: var(--space-4);
        padding: var(--space-9) 0;
        max-width: var(--measure);
      }
    `,
  ],
})
export class NotFoundComponent {}
