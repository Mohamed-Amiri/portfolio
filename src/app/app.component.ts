import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header.component';
import { FooterComponent } from './core/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <a class="skip" href="#main">Skip to content</a>
    <app-header />
    <main id="main" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100dvh;
      }
      main {
        flex: 1;
        outline: none;
      }
      .skip {
        position: absolute;
        left: 1rem;
        top: -100%;
        z-index: 100;
        padding: 0.5rem 0.75rem;
        background: var(--fg);
        color: var(--bg);
        border-radius: var(--radius);
        text-decoration: none;
      }
      .skip:focus {
        top: 0.75rem;
      }
    `,
  ],
})
export class AppComponent {}
