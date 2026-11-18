import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  image?: string;
  path?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  update(data: SeoData): void {
    this.title.setTitle(data.title);
    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ property: 'og:title', content: data.title });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    if (data.image) this.meta.updateTag({ property: 'og:image', content: data.image });
    if (data.path !== undefined) {
      this.meta.updateTag({ property: 'og:url', content: `${location.origin}${data.path}` });
    }
  }
}
