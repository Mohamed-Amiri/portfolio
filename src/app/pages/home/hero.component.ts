import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PROFILE } from '../../content/profile';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero" aria-labelledby="hero-title">
      <div class="container grid">
        <div class="text">
          <p class="eyebrow">{{ profile.role }} · {{ profile.location }}</p>
          <h1 id="hero-title">{{ profile.name }}</h1>
          <p class="stack mono">{{ profile.stackLine }}</p>
          <div class="intro">
            @for (p of profile.intro; track $index) {
              <p>{{ p }}</p>
            }
          </div>
          <div class="actions">
            <a class="btn btn--primary" routerLink="/" fragment="projects">View projects</a>
            <a class="btn" [href]="profile.cv.href" target="_blank" rel="noopener noreferrer">View CV (PDF)</a>
            <ul class="social">
              @for (link of profile.links; track link.href) {
                <li><a [href]="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }}</a></li>
              }
            </ul>
          </div>
        </div>

        <div class="photo">
          <img
            [src]="profile.photo.src"
            [srcset]="profile.photo.srcSmall + ' 400w, ' + profile.photo.src + ' 800w'"
            sizes="(min-width: 900px) 20rem, 60vw"
            [alt]="profile.photo.alt"
            width="800"
            height="800"
            fetchpriority="high"
            decoding="async"
          />
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: var(--space-8) 0 var(--space-8);
      }
      .grid {
        display: grid;
        gap: var(--space-7);
        align-items: center;
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 900px) {
        .grid {
          grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
        }
        .hero {
          padding: var(--space-9) 0;
        }
      }
      .text {
        display: grid;
        gap: var(--space-4);
      }
      h1 {
        margin-top: var(--space-1);
      }
      .stack {
        font-size: var(--text-sm);
        color: var(--accent);
        letter-spacing: 0.02em;
      }
      .intro {
        max-width: var(--measure);
        font-size: var(--text-md);
        color: var(--fg-muted);
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-3);
        margin-top: var(--space-2);
      }
      .social {
        display: flex;
        gap: var(--space-4);
        list-style: none;
        padding: 0;
        margin: 0 0 0 var(--space-2);
        font-size: var(--text-sm);
      }
      .photo {
        justify-self: start;
        max-width: 18rem;
      }
      @media (min-width: 900px) {
        .photo {
          justify-self: end;
          max-width: 22rem;
        }
      }
      .photo img {
        border-radius: var(--radius-lg);
        border: 1px solid var(--border);
        aspect-ratio: 1 / 1;
        object-fit: cover;
      }
    `,
  ],
})
export class HeroComponent {
  readonly profile = PROFILE;
}
