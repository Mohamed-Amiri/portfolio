import { Component } from '@angular/core';
import { SectionComponent } from '../../shared/section.component';
import { PROFILE } from '../../content/profile';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [SectionComponent],
  template: `
    <app-section id="resume" eyebrow="Resume" heading="CV">
      <div class="row">
        <p class="muted measure">
          A one-page PDF with my training, internships, projects and technical skills.
        </p>
        <div class="actions">
          <a
            class="btn btn--primary"
            [href]="profile.cv.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open CV in browser
          </a>
          <a
            class="btn"
            [href]="profile.cv.href"
            [download]="profile.cv.filename || 'Mohamed-Amiri-CV.pdf'"
          >
            Download PDF
          </a>
        </div>
      </div>
    </app-section>
  `,
  styles: [
    `
      .row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
      }
      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
      }
    `,
  ],
})
export class ResumeComponent {
  readonly profile = PROFILE;
}
