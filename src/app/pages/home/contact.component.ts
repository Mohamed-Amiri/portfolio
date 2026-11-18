import { Component } from '@angular/core';
import { SectionComponent } from '../../shared/section.component';
import { PROFILE } from '../../content/profile';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionComponent],
  template: `
    <app-section id="contact" eyebrow="Contact" heading="Let's talk" [soft]="true">
      <div class="grid">
        <p class="muted measure">
          I'm open to junior full-stack roles and to conversations about Angular and Spring Boot work. The
          quickest way to reach me is email.
        </p>
        <dl class="channels">
          <dt>Email</dt>
          <dd><a [href]="'mailto:' + profile.email">{{ profile.email }}</a></dd>
          @for (link of profile.links; track link.href) {
            <dt>{{ link.label }}</dt>
            <dd><a class="btn" [href]="link.href" target="_blank" rel="noopener noreferrer">{{ link.label }} <span aria-hidden="true">↗</span></a></dd>
          }
        </dl>
      </div>
    </app-section>
  `,
  styles: [
    `
      .grid {
        display: grid;
        gap: var(--space-6);
        grid-template-columns: minmax(0, 1fr);
      }
      @media (min-width: 900px) {
        .grid {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
        }
      }
      .channels {
        margin: 0;
        display: grid;
        grid-template-columns: 6rem minmax(0, 1fr);
        gap: var(--space-3) var(--space-4);
        align-items: baseline;
      }
      dt {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--fg-muted);
      }
      dd {
        margin: 0;
        overflow-wrap: anywhere;
      }
    `,
  ],
})
export class ContactComponent {
  readonly profile = PROFILE;
}
