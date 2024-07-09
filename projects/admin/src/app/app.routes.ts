import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'projects',
    loadChildren: () =>
      import('./pages/projects/projects.module').then((m) => m.ProjectsModule),
  },
];
