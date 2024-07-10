import { Routes } from '@angular/router';
import { WithLayoutComponent } from './layout/with-layout/with-layout.component';
import { WithoutLayoutComponent } from './layout/without-layout/without-layout.component';
import { authGuard } from './auth/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: WithLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/pages',
        pathMatch: 'full',
      },
      {
        path: 'pages',
        loadChildren: () =>
          import('./pages/pages/pages.module').then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: '',
    component: WithoutLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/login/login.component').then((c) => c.LoginComponent),
      },
    ],
  },
];
