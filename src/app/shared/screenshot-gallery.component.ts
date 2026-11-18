import { Component, input } from '@angular/core';
import { Screenshot } from '../content/models';

@Component({
  selector: 'app-screenshot-gallery',
  standalone: true,
  template: `
    <div class="gallery">
      @for (shot of shots(); track shot.src) {
        <figure>
          <img
            [src]="shot.src"
            [srcset]="shot.srcSmall ? shot.srcSmall + ' 640w, ' + shot.src + ' 1280w' : null"
            sizes="(min-width: 900px) 50vw, 100vw"
            [alt]="shot.alt"
            [width]="shot.width"
            [height]="shot.height"
            loading="lazy"
            decoding="async"
          />
          @if (shot.caption) {
            <figcaption class="muted">{{ shot.caption }}</figcaption>
          }
        </figure>
      }
    </div>
  `,
  styles: [
    `
      .gallery {
        display: grid;
        gap: var(--space-5);
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
      }
      figure {
        margin: 0;
      }
      img {
        border: 1px solid var(--border);
        border-radius: var(--radius);
        background: var(--bg-subtle);
      }
      figcaption {
        margin-top: var(--space-2);
        font-size: var(--text-sm);
      }
    `,
  ],
})
export class ScreenshotGalleryComponent {
  shots = input.required<Screenshot[]>();
}
