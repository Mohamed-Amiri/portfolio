import { Component } from '@angular/core';
import { SectionComponent } from '../../shared/section.component';
import { PROFILE } from '../../content/profile';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionComponent],
  template: `
    <app-section id="skills" eyebrow="Skills" heading="What I work with">
      <dl class="skills">
        @for (group of profile.skills; track group.name) {
          <div class="group">
            <dt>{{ group.name }}</dt>
            <dd>
              <ul>
                @for (item of group.items; track item) {
                  <li [class.core-item]="group.name === 'Core stack'" [class.supporting-item]="group.name !== 'Core stack'">{{ item }}</li>
                }
              </ul>
            </dd>
          </div>
        }
      </dl>
    </app-section>
  `,
  styles: [
    `
      .skills {
        margin: 0;
        display: grid;
        border-top: 1px solid var(--border);
      }
      .group {
        display: grid;
        gap: var(--space-2);
        padding: var(--space-4) 0;
        border-bottom: 1px solid var(--border);
      }
      @media (min-width: 720px) {
        .group {
          grid-template-columns: 10rem minmax(0, 1fr);
          gap: var(--space-6);
        }
      }
      dt {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--fg-muted);
        padding-top: 0.25rem;
      }
      dd {
        margin: 0;
      }
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
      }
      li {
        border-radius: var(--radius);
      }
      .core-item {
        padding: 0.55rem 0.8rem;
        background: var(--accent-soft);
        color: var(--accent);
        font-size: var(--text-md);
        font-weight: 600;
      }
      .supporting-item {
        padding: 0.3rem 0.55rem;
        background: var(--bg-soft);
        color: var(--text-muted);
        font-size: var(--text-sm);
      }
    `,
  ],
})
export class SkillsComponent {
  readonly profile = PROFILE;
}
