import { Routes } from '@angular/router';

import { authRoleGuard } from './core/auth-role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  }
];
