import { Project } from '../models';
import { SAKANE } from './sakane';
import { SAFARI } from './safari';

/** Display order on the home page and for prev / next navigation. */
export const PROJECTS: Project[] = [SAKANE, SAFARI];

export const findProject = (slug: string | null | undefined): Project | undefined =>
  PROJECTS.find((p) => p.slug === slug);
