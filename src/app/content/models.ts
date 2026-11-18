/**
 * Typed content model. All text on the site lives in the files next to this one.
 * A string starting with "TODO:" renders as a visible placeholder by <app-todo>
 * (use it while drafting; `npm run check:todos` lists what is left).
 */

export interface Link {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
  filename?: string;
}

export interface Screenshot {
  src: string;
  /** Smaller variant for mobile / srcset. */
  srcSmall?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface TimelineItem {
  period: string;
  title: string;
  organisation: string;
  summary?: string;
}

export interface CaseStudySection {
  id: string;
  heading: string;
  /** Paragraphs. A paragraph starting with "TODO:" renders as a placeholder. */
  paragraphs?: string[];
  /** Bullet list. Items starting with "TODO:" render as placeholders. */
  bullets?: string[];
}

export interface ArchitectureLayer {
  name: string;
  detail: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Optional alternate/brand name shown in small type. */
  alias?: string;
  tagline: string;
  summary: string;
  period: string;
  liveUrl: string;
  repoUrl: string;
  stack: string[];
  poster: Screenshot;
  screenshots: Screenshot[];
  architecture: ArchitectureLayer[];
  sections: CaseStudySection[];
}

export interface Profile {
  name: string;
  role: string;
  stackLine: string;
  location: string;
  intro: string[];
  about: string[];
  photo: { src: string; srcSmall: string; alt: string };
  email: string;
  links: Link[];
  cv: Link;
  skills: SkillGroup[];
  experience: TimelineItem[];
  education: TimelineItem[];
  languages: string[];
}

export const isTodo = (text: string | undefined): boolean => !!text && text.trimStart().startsWith('TODO');
