import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { SectionComponent } from '../../shared/section.component';
import { PROFILE } from '../../content/profile';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionComponent, NgTemplateOutlet],
  template: `
    <app-section id="experience" eyebrow="Experience & education" heading="Where I've been">
      <div class="cols">
        <div>
          <h3 class="col-title">Experience</h3>
          <ol class="timeline">
            @for (item of profile.experience; track item.title) {
              <li>
                <ng-container *ngTemplateOutlet="row; context: { $implicit: item }" />
              </li>
            }
          </ol>
        </div>
        <div>
          <h3 class="col-title">Education</h3>
          <ol class="timeline">
            @for (item of profile.education; track item.title) {
              <li>
                <ng-container *ngTemplateOutlet="row; context: { $implicit: item }" />
              </li>
            }
          </ol>
        </div>
      </div>
    </app-section>

    <ng-template #row let-item>
      <span class="period mono">{{ item.period }}</span>
      <div>
        <p class="title">{{ item.title }}</p>
        @if (item.organisation) {
          <p class="muted">{{ item.organisation }}</p>
        }
        @if (item.summary) {
          <p class="summary muted">{{ item.summary }}</p>
        }
      </div>
    </ng-template>
  `,
  styles: [
    `
      .cols {
        display: grid;
        gap: var(--space-7);
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 900px) {
        .cols {
          grid-template-columns: 1fr 1fr;
        }
      }
      .col-title {
        font-size: var(--text-md);
        margin-bottom: var(--space-4);
        padding-bottom: var(--space-3);
        border-bottom: 1px solid var(--border);
      }
      .timeline {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: var(--space-5);
      }
      li {
        display: grid;
        gap: var(--space-1) var(--space-5);
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 560px) {
        li {
          grid-template-columns: 9.5rem minmax(0, 1fr);
        }
      }
      .period {
        font-size: var(--text-xs);
        color: var(--fg-muted);
        padding-top: 0.3rem;
        white-space: nowrap;
      }
      .title {
        font-weight: 500;
      }
      .summary {
        margin-top: var(--space-2);
        font-size: var(--text-sm);
      }
      p + p {
        margin-top: 0;
      }
    `,
  ],
})
export class ExperienceComponent {
  readonly profile = PROFILE;
}
