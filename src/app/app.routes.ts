import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { projectExistsGuard } from './core/project-exists.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Mohamed Amiri — Full Stack Developer' },
  {
    path: 'projects/:slug',
    canMatch: [projectExistsGuard],
    loadComponent: () => import('./pages/case-study/case-study.component').then((m) => m.CaseStudyComponent),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Page not found — Mohamed Amiri',
  },
];
