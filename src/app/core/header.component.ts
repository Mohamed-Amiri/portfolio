import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../content/profile';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="header">
      <div class="container bar">
        <a class="brand" routerLink="/" fragment="top">
          <span class="brand__name">{{ profile.name }}</span>
          <span class="brand__role mono">{{ profile.role }}</span>
        </a>

        <nav aria-label="Primary">
          <ul>
            @for (item of nav; track item.fragment) {
              <li><a routerLink="/" [fragment]="item.fragment">{{ item.label }}</a></li>
            }
          </ul>
        </nav>

      </div>
    </header>
  `,
  styles: [
    `
      .header {
        position: sticky;
        top: 0;
        z-index: 50;
        height: var(--header-h);
        background: var(--bg);
        border-bottom: 1px solid var(--border);
      }
      .bar {
        height: 100%;
        display: flex;
        align-items: center;
        gap: var(--space-5);
      }
      .brand {
        display: flex;
        flex-direction: column;
        text-decoration: none;
        color: var(--fg);
        line-height: 1.15;
        margin-right: auto;
      }
      .brand__name {
        font-family: var(--font-display);
        font-weight: 600;
        letter-spacing: -0.01em;
      }
      .brand__role {
        font-size: 0.68rem;
        color: var(--fg-muted);
        letter-spacing: 0.04em;
      }
      nav ul {
        display: flex;
        gap: var(--space-5);
        list-style: none;
        padding: 0;
        margin: 0;
      }
      nav a {
        display: flex;
        align-items: center;
        min-height: 2.75rem;
        color: var(--fg-muted);
        text-decoration: none;
        font-size: var(--text-sm);
        font-weight: 500;
      }
      nav a:hover {
        color: var(--fg);
      }
      @media (max-width: 720px) {
        nav ul {
          gap: var(--space-4);
        }
        nav li:nth-child(n + 4) {
          display: none;
        }
        .brand__role {
          display: none;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  readonly profile = PROFILE;
  readonly nav = [
    { label: 'Projects', fragment: 'projects' },
    { label: 'Skills', fragment: 'skills' },
    { label: 'About', fragment: 'about' },
    { label: 'Experience', fragment: 'experience' },
    { label: 'Contact', fragment: 'contact' },
  ];
}
