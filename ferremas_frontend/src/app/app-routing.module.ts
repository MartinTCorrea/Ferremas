import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'tienda', loadComponent: () => import('./pages/tienda/tienda.component').then(m => m.TiendaComponent) },
  { path: 'admin', loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent) },
  { path: 'vendedor', loadComponent: () => import('./pages/vendedor/vendedor.component').then(m => m.VendedorComponent) },
  { path: 'bodega', loadComponent: () => import('./pages/bodega/bodega.component').then(m => m.BodegaComponent) }, // Asumo que usas el mismo componente
  { path: 'contabilidad', loadComponent: () => import('./pages/contabilidad/contabilidad.component').then(m => m.ContabilidadComponent) },
  { path: '**', redirectTo: 'login' },

  {
  path: 'admin/productos',
  loadComponent: () =>
    import('./pages/admin/productos/productos.component').then(m => m.ProductosComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
