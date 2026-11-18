import { Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { PROJECTS, findProject } from '../../content/projects';
import { TechListComponent } from '../../shared/tech-list.component';
import { LivePreviewComponent } from '../../shared/live-preview.component';
import { RichTextComponent } from '../../shared/rich-text.component';
import { ScreenshotGalleryComponent } from '../../shared/screenshot-gallery.component';
import { TodoComponent } from '../../shared/todo.component';
import { isTodo } from '../../content/models';

@Component({
  selector: 'app-case-study',
  standalone: true,
  imports: [RouterLink, TechListComponent, LivePreviewComponent, RichTextComponent, ScreenshotGalleryComponent, TodoComponent],
  template: `
    @if (project(); as p) {
      <article class="study">
        <header class="container head">
          <p class="eyebrow"><a routerLink="/" fragment="projects">Projects</a> / {{ p.name }} · {{ p.period }}</p>
          <h1>
            {{ p.name }}
            @if (p.alias) {
              <span class="alias muted">{{ p.alias }}</span>
            }
          </h1>
          <p class="tagline">{{ p.tagline }}</p>
          <app-tech-list [items]="p.stack" />
          <div class="links">
            <a class="btn btn--primary" [href]="p.liveUrl" target="_blank" rel="noopener noreferrer">Live demo ↗</a>
            <a class="btn" [href]="p.repoUrl" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </header>

        <div class="container">
          <app-live-preview [project]="p" />
        </div>

        <div class="container layout">
          <nav class="toc" aria-label="On this page">
            <p class="eyebrow">On this page</p>
            <ol>
              @for (s of p.sections; track s.id) {
                <li><a [routerLink]="[]" [fragment]="s.id">{{ s.heading }}</a></li>
              }
              <li><a [routerLink]="[]" fragment="screenshots">Screenshots</a></li>
            </ol>
          </nav>

          <div class="body">
            @for (s of p.sections; track s.id) {
              <section class="block" [id]="s.id">
                <h2>{{ s.heading }}</h2>
                <div class="prose">
                  @if (s.id === 'architecture') {
                    <dl class="arch">
                      @for (layer of p.architecture; track layer.name) {
                        <div class="arch__row">
                          <dt class="mono">{{ layer.name }}</dt>
                          <dd>
                            @if (isTodo(layer.detail)) {
                              <app-todo [text]="layer.detail" />
                            } @else {
                              {{ layer.detail }}
                            }
                          </dd>
                        </div>
                      }
                    </dl>
                  }
                  <app-rich-text [paragraphs]="s.paragraphs ?? []" [bullets]="s.bullets" />
                </div>
              </section>
            }

            <section class="block" id="screenshots">
              <h2>Screenshots</h2>
              <app-screenshot-gallery [shots]="p.screenshots" />
              @if (p.screenshots.length < 3) {
                <p class="more"><app-todo text="TODO: add more screenshots (detail page, booking flow, dashboard)." /></p>
              }
            </section>

            <section class="block cta">
              <h2>See it running</h2>
              <div class="links">
                <a class="btn btn--primary" [href]="p.liveUrl" target="_blank" rel="noopener noreferrer">Live demo ↗</a>
                <a class="btn" [href]="p.repoUrl" target="_blank" rel="noopener noreferrer">Source on GitHub ↗</a>
              </div>
            </section>

            <nav class="pn" aria-label="Other projects">
              @if (prev(); as q) {
                <a class="pn__link" [routerLink]="['/projects', q.slug]"><span class="eyebrow">Previous</span><span>{{ q.name }}</span></a>
              } @else {
                <span></span>
              }
              @if (next(); as q) {
                <a class="pn__link pn__link--next" [routerLink]="['/projects', q.slug]"><span class="eyebrow">Next</span><span>{{ q.name }}</span></a>
              }
            </nav>
          </div>
        </div>
      </article>
    }
  `,
  styles: [
    `
      .head {
        display: grid;
        gap: var(--space-4);
        padding: var(--space-7) 0 var(--space-6);
      }
      .head h1 {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: var(--space-4);
      }
      .alias {
        font-family: var(--font-mono);
        font-size: var(--text-sm);
        font-weight: 400;
        letter-spacing: 0.02em;
      }
      .tagline {
        font-size: var(--text-lg);
        max-width: var(--measure);
        color: var(--fg-muted);
      }
      .links {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
      }
      .layout {
        display: grid;
        gap: var(--space-7);
        grid-template-columns: minmax(0, 1fr);
        padding: var(--space-8) 0;
      }
      @media (min-width: 1000px) {
        .layout {
          grid-template-columns: 14rem minmax(0, 1fr);
          gap: var(--space-8);
        }
        .toc {
          position: sticky;
          top: calc(var(--header-h) + 1.5rem);
          align-self: start;
        }
      }
      .toc ol {
        list-style: none;
        padding: 0;
        margin: var(--space-3) 0 0;
        display: grid;
        gap: 0.4rem;
        font-size: var(--text-sm);
      }
      .toc a {
        color: var(--fg-muted);
        text-decoration: none;
      }
      .toc a:hover {
        color: var(--fg);
      }
      .body {
        display: grid;
        gap: var(--space-7);
        min-width: 0;
      }
      .block h2 {
        margin-bottom: var(--space-4);
      }
      .arch {
        margin: 0 0 var(--space-4);
        display: grid;
        border-top: 1px solid var(--border);
      }
      .arch__row {
        display: grid;
        gap: var(--space-1) var(--space-5);
        grid-template-columns: minmax(0, 1fr);
        padding: var(--space-3) 0;
        border-bottom: 1px solid var(--border);
      }
      @media (min-width: 560px) {
        .arch__row {
          grid-template-columns: 6rem minmax(0, 1fr);
        }
      }
      .arch dt {
        font-size: var(--text-xs);
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--fg-muted);
        padding-top: 0.35rem;
      }
      .arch dd {
        margin: 0;
        font-size: var(--text-base);
      }
      .more {
        margin-top: var(--space-4);
      }
      .cta {
        padding-top: var(--space-6);
        border-top: 1px solid var(--border);
      }
      .pn {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-4);
        padding-top: var(--space-6);
        border-top: 1px solid var(--border);
      }
      .pn__link {
        display: grid;
        gap: 0.2rem;
        text-decoration: none;
        color: var(--fg);
        font-family: var(--font-display);
        font-weight: 600;
        font-size: var(--text-lg);
      }
      .pn__link--next {
        text-align: right;
        justify-self: end;
      }
      .pn__link:hover {
        color: var(--accent);
      }
    `,
  ],
})
export class CaseStudyComponent {
  /** Bound from the :slug route parameter (withComponentInputBinding). */
  slug = input.required<string>();

  readonly project = computed(() => findProject(this.slug()));
  readonly index = computed(() => PROJECTS.findIndex((p) => p.slug === this.slug()));
  readonly prev = computed(() => (this.index() > 0 ? PROJECTS[this.index() - 1] : undefined));
  readonly next = computed(() => (this.index() < PROJECTS.length - 1 ? PROJECTS[this.index() + 1] : undefined));
  readonly isTodo = isTodo;

  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => {
      const p = this.project();
      if (p) {
        this.seo.update({
          title: `${p.name} — case study · Mohamed Amiri`,
          description: p.tagline,
          image: '/' + p.poster.src,
          path: `/projects/${p.slug}`,
        });
      }
    });
  }
}
