import { Component } from '@angular/core';
import { SectionComponent } from '../../shared/section.component';
import { RichTextComponent } from '../../shared/rich-text.component';
import { PROFILE } from '../../content/profile';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionComponent, RichTextComponent],
  template: `
    <app-section id="about" eyebrow="About" heading="A bit about me" [soft]="true">
      <div class="grid">
        <div class="prose">
          <app-rich-text [paragraphs]="profile.about" />
        </div>
        <aside class="facts">
          <dl>
            <dt>Based in</dt>
            <dd>{{ profile.location }}</dd>
            <dt>Languages</dt>
            <dd>
              <ul>
                @for (l of profile.languages; track l) {
                  <li>{{ l }}</li>
                }
              </ul>
            </dd>
          </dl>
        </aside>
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
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
        }
      }
      .facts dl {
        margin: 0;
        display: grid;
        gap: var(--space-2);
        font-size: var(--text-sm);
      }
      dt {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--fg-muted);
      }
      dd {
        margin: 0 0 var(--space-3);
      }
      ul {
        list-style: none;
        padding: 0;
      }
    `,
  ],
})
export class AboutComponent {
  readonly profile = PROFILE;
}
