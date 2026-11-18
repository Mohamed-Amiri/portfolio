import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionComponent } from '../../shared/section.component';
import { TechListComponent } from '../../shared/tech-list.component';
import { LivePreviewComponent } from '../../shared/live-preview.component';
import { PROJECTS } from '../../content/projects';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RouterLink, SectionComponent, TechListComponent, LivePreviewComponent],
  template: `
    <app-section
      id="projects"
      [soft]="true"
      eyebrow="Selected projects"
      heading="Two deployed full-stack applications"
      lede="Each window below is the real, live site. Click it to open the full application, or load the preview and browse inside."
    >
      <ol class="list">
        @for (project of PROJECTS; track project.slug; let i = $index) {
          <li class="entry">
            <div class="entry__text">
              <p class="eyebrow">0{{ i + 1 }} · {{ project.period }}</p>
              <h3>
                <a [routerLink]="['/projects', project.slug]">{{ project.name }}</a>
                @if (project.alias) {
                  <span class="alias muted">{{ project.alias }}</span>
                }
              </h3>
              <p class="tagline">{{ project.tagline }}</p>
              <p class="muted">{{ project.summary }}</p>
              <app-tech-list [items]="project.stack" />
              <div class="links">
                <a class="btn btn--primary" [routerLink]="['/projects', project.slug]">Read case study</a>
                <a class="btn" [href]="project.liveUrl" target="_blank" rel="noopener noreferrer">Live demo ↗</a>
                <a class="btn btn--ghost" [href]="project.repoUrl" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
              </div>
            </div>
            <div class="entry__preview">
              <app-live-preview [project]="project" />
            </div>
          </li>
        }
      </ol>
    </app-section>
  `,
  styles: [
    `
      .list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        gap: var(--space-8);
      }
      .entry {
        display: grid;
        gap: var(--space-5);
        grid-template-columns: minmax(0, 1fr);
        align-items: start;
      }
      @media (min-width: 900px) {
        .entry {
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
          gap: var(--space-7);
        }
        .entry__preview {
          margin-inline-end: clamp(0.75rem, 2vw, 1.75rem);
        }
        .entry:nth-child(even) .entry__text {
          order: 2;
        }
        .entry:nth-child(even) .entry__preview {
          margin-inline: clamp(0.75rem, 2vw, 1.75rem) 0;
        }
      }
      .entry__text {
        display: grid;
        gap: var(--space-4);
        align-content: start;
      }
      .entry__preview {
        min-width: 0;
      }
      h3 {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: var(--space-3);
        font-size: var(--text-xl);
      }
      h3 a {
        color: inherit;
        text-decoration: none;
      }
      h3 a:hover {
        color: var(--accent);
      }
      .alias {
        font-family: var(--font-mono);
        font-size: var(--text-xs);
        font-weight: 400;
        letter-spacing: 0.02em;
      }
      .tagline {
        font-size: var(--text-md);
        font-weight: 500;
      }
      .links {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
        margin-top: var(--space-2);
      }
    `,
  ],
})
export class ProjectsComponent {
  readonly PROJECTS = PROJECTS;
}
