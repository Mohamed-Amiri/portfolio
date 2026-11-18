import { CanMatchFn, UrlSegment } from '@angular/router';
import { PROJECTS } from '../content/projects';

/** Only match /projects/:slug when the slug is a real project; otherwise fall through to 404. */
export const projectExistsGuard: CanMatchFn = (_route, segments: UrlSegment[]) => {
  const slug = segments[1]?.path;
  return PROJECTS.some((p) => p.slug === slug);
};
