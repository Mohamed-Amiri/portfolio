import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Project } from '../content/models';

/**
 * A small browser-style window that shows the real deployed site.
 *
 * - Starts with a screenshot poster (fast, no third-party requests).
 * - Loads the live site into a scaled-down iframe on demand (button) or, on wide screens,
 *   automatically when scrolled into view.
 * - Clicking the window opens the full site in a new tab. "Browse inside" removes the
 *   click-shield so the visitor can use the embedded site directly.
 *
 * The iframe is rendered at a fixed desktop width and scaled with transform so the
 * embedded site lays out like a real desktop browser, just smaller.
 */
@Component({
  selector: 'app-live-preview',
  standalone: true,
  template: `
    <figure class="win" [class.win--interactive]="interactive()">
      <figcaption class="win__bar">
        <span class="win__dots" aria-hidden="true"><i></i><i></i><i></i></span>
        <span class="win__url mono">{{ host }}</span>
        <span class="win__actions">
          @if (loaded()) {
            <button type="button" class="btn btn--ghost btn--sm" (click)="toggleInteractive()" [attr.aria-pressed]="interactive()">
              {{ interactive() ? 'Done browsing' : 'Browse inside' }}
            </button>
          } @else {
            <button type="button" class="btn btn--ghost btn--sm" (click)="load()">Load live preview</button>
          }
          <a class="btn btn--ghost btn--sm" [href]="project().liveUrl" target="_blank" rel="noopener noreferrer">Open ↗</a>
        </span>
      </figcaption>

      <div class="win__body" #body>
        <img
          class="win__poster"
          [class.win__poster--hidden]="frameReady()"
          [src]="project().poster.src"
          [srcset]="project().poster.srcSmall ? project().poster.srcSmall + ' 640w, ' + project().poster.src + ' 1899w' : null"
          sizes="(min-width: 900px) 60vw, 100vw"
          [alt]="project().poster.alt"
          [width]="project().poster.width"
          [height]="project().poster.height"
          loading="lazy"
          decoding="async"
        />

        @if (loaded()) {
          <iframe
            class="win__frame"
            [src]="safeUrl()"
            [title]="project().name + ' — live site'"
            [style.width.px]="frameWidth"
            [style.height.px]="frameHeight()"
            [style.transform]="'scale(' + scale() + ')'"
            loading="lazy"
            referrerpolicy="no-referrer"
            (load)="onFrameLoad()"
          ></iframe>
        }

        @if (!interactive()) {
          <a class="win__shield" [href]="project().liveUrl" target="_blank" rel="noopener noreferrer">
            <span class="win__hint">Open {{ project().name }} ↗</span>
          </a>
        }
      </div>
    </figure>
  `,
  styles: [
    `
      .win {
        margin: 0;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        background: var(--bg-elevated);
        box-shadow: var(--shadow);
        overflow: hidden;
      }
      .win__bar {
        display: flex;
        align-items: center;
        gap: var(--space-3);
        padding: 0.45rem 0.6rem 0.45rem 0.75rem;
        border-bottom: 1px solid var(--border);
        background: var(--bg-subtle);
        min-height: 2.5rem;
      }
      .win__dots {
        display: inline-flex;
        gap: 0.35rem;
      }
      .win__dots i {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        background: var(--border-strong);
      }
      .win__url {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: var(--text-xs);
        color: var(--fg-muted);
        text-align: center;
      }
      .win__actions {
        display: inline-flex;
        gap: 0.25rem;
      }
      .win__body {
        position: relative;
        aspect-ratio: 16 / 10;
        background: var(--bg-subtle);
        overflow: hidden;
      }
      .win__poster {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: top;
        transition: opacity 240ms ease;
      }
      .win__poster--hidden {
        opacity: 0;
      }
      .win__frame {
        position: absolute;
        top: 0;
        left: 0;
        border: 0;
        transform-origin: 0 0;
        background: #fff;
      }
      .win__shield {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: end start;
        padding: var(--space-4);
        text-decoration: none;
        color: inherit;
      }
      .win__hint {
        padding: 0.4rem 0.7rem;
        border-radius: var(--radius);
        background: var(--fg);
        color: var(--bg);
        font-size: var(--text-sm);
        font-weight: 500;
        opacity: 0;
        transform: translateY(4px);
        transition:
          opacity 160ms ease,
          transform 160ms ease;
      }
      .win__shield:hover .win__hint,
      .win__shield:focus-visible .win__hint {
        opacity: 1;
        transform: none;
      }
      .win--interactive {
        border-color: var(--accent);
      }
      @media (max-width: 560px) {
        .win__url {
          display: none;
        }
      }
    `,
  ],
})
export class LivePreviewComponent implements AfterViewInit {
  project = input.required<Project>();
  /** Auto-load the iframe when scrolled into view (only on wide screens). */
  autoload = input(false);

  readonly loaded = signal(false);
  readonly frameReady = signal(false);
  readonly interactive = signal(false);
  readonly scale = signal(0.5);
  readonly frameWidth = 1280;
  readonly frameHeight = computed(() => Math.round((this.frameWidth * 10) / 16));

  private readonly body = viewChild.required<ElementRef<HTMLElement>>('body');
  private readonly destroyRef = inject(DestroyRef);
  private readonly sanitizer = inject(DomSanitizer);

  /** The live URL comes from our own typed content, never from user input. */
  readonly safeUrl = computed(() => this.sanitizer.bypassSecurityTrustResourceUrl(this.project().liveUrl));

  get host(): string {
    try {
      return new URL(this.project().liveUrl).host;
    } catch {
      return this.project().liveUrl;
    }
  }

  ngAfterViewInit(): void {
    const el = this.body().nativeElement;

    const ro = new ResizeObserver(([entry]) => {
      const widthScale = entry.contentRect.width / this.frameWidth;
      const heightScale = entry.contentRect.height / this.frameHeight();
      const nextScale = Math.min(widthScale, heightScale);
      if (nextScale > 0) this.scale.set(nextScale);
    });
    ro.observe(el);
    this.destroyRef.onDestroy(() => ro.disconnect());

    const wide = matchMedia('(min-width: 900px)').matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (this.autoload() && wide && !saveData && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            this.load();
            io.disconnect();
          }
        },
        { rootMargin: '200px 0px' },
      );
      io.observe(el);
      this.destroyRef.onDestroy(() => io.disconnect());
    }
  }

  load(): void {
    this.loaded.set(true);
  }

  /** Give the embedded app a moment to paint before the poster fades out. */
  onFrameLoad(): void {
    setTimeout(() => this.frameReady.set(true), 900);
  }

  toggleInteractive(): void {
    this.interactive.update((v) => !v);
  }
}
