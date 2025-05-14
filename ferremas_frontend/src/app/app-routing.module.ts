import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authRoleGuard } from './core/auth-role.guard';
import { DenegadoComponent } from './pages/denegado/denegado.component';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),canActivate: [authRoleGuard(['cliente', 'vendedor', 'bodeguero', 'contador', 'administrador'])] },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),canActivate: [authRoleGuard(['cliente', 'vendedor', 'bodeguero', 'contador', 'administrador'])] },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),canActivate: [authRoleGuard(['cliente', 'vendedor', 'bodeguero', 'contador', 'administrador'])] },
  { path: 'tienda', loadComponent: () => import('./pages/tienda/tienda.component').then(m => m.TiendaComponent),canActivate: [authRoleGuard(['cliente', 'vendedor', 'bodeguero', 'contador', 'administrador'])] },

  { path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),canActivate: [authRoleGuard(['administrador'])] },
  { path: 'vendedor', loadComponent: () => import('./pages/vendedor/vendedor.component').then(m => m.VendedorComponent),canActivate: [authRoleGuard(['vendedor'])] },
  { path: 'bodega', loadComponent: () => import('./pages/bodega/bodega.component').then(m => m.BodegaComponent),canActivate: [authRoleGuard(['bodega'])] },
  { path: 'contabilidad', loadComponent: () => import('./pages/contabilidad/contabilidad.component').then(m => m.ContabilidadComponent),canActivate: [authRoleGuard(['contabilidad'])] },
  
  {
    path: 'admin/productos',
    loadComponent: () =>
      import('./pages/admin/productos/productos.component').then(m => m.ProductosComponent)
  },

  { path: '**', redirectTo: 'login' },
  { path: 'denegado', component: DenegadoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
