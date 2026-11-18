import { Component, inject } from '@angular/core';
import { SeoService } from '../../core/seo.service';
import { HeroComponent } from './hero.component';
import { ProjectsComponent } from './projects.component';
import { SkillsComponent } from './skills.component';
import { AboutComponent } from './about.component';
import { ExperienceComponent } from './experience.component';
import { ResumeComponent } from './resume.component';
import { ContactComponent } from './contact.component';
import { PROFILE } from '../../content/profile';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ProjectsComponent,
    SkillsComponent,
    AboutComponent,
    ExperienceComponent,
    ResumeComponent,
    ContactComponent,
  ],
  template: `
    <span id="top"></span>
    <app-hero />
    <app-projects />
    <app-skills />
    <app-about />
    <app-experience />
    <app-resume />
    <app-contact />
  `,
})
export class HomeComponent {
  constructor() {
    inject(SeoService).update({
      title: `${PROFILE.name} — ${PROFILE.role}`,
      description: `${PROFILE.stackLine}. Selected projects: Sakane and Safari.`,
      image: '/images/og.jpg',
      path: '/',
    });
  }
}
