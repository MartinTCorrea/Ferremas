import { Routes } from '@angular/router';
//import { authRoleGuard } from './core/auth-role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'tienda',
    loadComponent: () => import('./pages/tienda/tienda.component').then(m => m.TiendaComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent),
    //canActivate: [authRoleGuard],
    data: { allowedRoles: ['Administrador'] }
  },
  {
    path: 'vendedor',
    loadComponent: () => import('./pages/vendedor/vendedor.component').then(m => m.VendedorComponent),
    //canActivate: [authRoleGuard],
    data: { allowedRoles: ['Vendedor'] }
  },
  {
    path: 'bodega',
    loadComponent: () => import('./pages/bodega/bodega.component').then(m => m.BodegaComponent),
    //canActivate: [authRoleGuard],
    data: { allowedRoles: ['Bodeguero'] }
  },
  {
    path: 'contabilidad',
    loadComponent: () => import('./pages/contabilidad/contabilidad.component').then(m => m.ContabilidadComponent),
    //canActivate: [authRoleGuard],
    data: { allowedRoles: ['Contador'] }
  },
  {
    path: 'admin/productos',
    loadComponent: () => import('./pages/admin/productos/productos.component').then(m => m.ProductosComponent),
    //canActivate: [authRoleGuard],
    data: { allowedRoles: ['Administrador'] }
  },
  {
    path: 'admin/usuarios',
    loadComponent: () => import('./pages/admin/usuarios/usuarios.component').then(m => m.UsuariosComponent),
    //  canActivate: [authRoleGuard],
    data: { allowedRoles: ['Administrador'] }
  },
  {
    path: 'denegado',
    loadComponent: () => import('./pages/denegado/denegado.component').then(m => m.DenegadoComponent)
  },
  {
    path: 'producto/:id',
    loadComponent: () => import('./pages/producto-detalle/producto-detalle.component').then(m => m.ProductoDetalleComponent)
  },
  {
    path: 'compra',
    loadComponent: () => import('./pages/compra/compra.component').then(m => m.CompraComponent)
  },
  { path: '**', redirectTo: 'login' }
];
