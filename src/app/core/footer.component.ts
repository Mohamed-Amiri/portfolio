import { Component } from '@angular/core';
import { PROFILE } from '../content/profile';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="container row">
        <span class="mono muted">{{ profile.name }} — {{ year }}</span>
        <ul>
          @for (link of profile.links; track link.href) {
            <li><a [href]="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a></li>
          }
          <li><a [href]="'mailto:' + profile.email">Email</a></li>
        </ul>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        border-top: 1px solid var(--border);
        padding: var(--space-6) 0;
        font-size: var(--text-sm);
      }
      .row {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        gap: var(--space-4);
      }
      ul {
        display: flex;
        gap: var(--space-5);
        list-style: none;
        padding: 0;
      }
      a {
        color: var(--fg-muted);
        text-decoration: none;
      }
      a:hover {
        color: var(--fg);
      }
    `,
  ],
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly year = new Date().getFullYear();
}
