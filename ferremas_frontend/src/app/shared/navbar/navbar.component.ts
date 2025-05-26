import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Subscription } from 'rxjs';
import { CarritoService } from '../../services/carrito.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  usuario: any = null;
  private sub: Subscription;
  private subCarrito: Subscription;
  mostrarCarrito: boolean = false;
  rolEnRuta: string | null = null;

  // Carrito
  carrito: any = null;
  items: any[] = [];
  total: number = 0;
  cargandoCarrito: boolean = false;

  constructor(
    public auth: AuthService,
    private router: Router,
    private carritoService: CarritoService
  ) {
    this.sub = this.auth.usuario$.subscribe(user => {
      this.usuario = user;
      if (user) {
        this.cargarCarrito();
      } else {
        this.carrito = null;
        this.items = [];
        this.total = 0;
      }
    });
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.mostrarCarrito = url === '/tienda' || url.startsWith('/producto');
      // Detectar si la ruta es de admin, bodega, vendedor o contabilidad
      if (url.startsWith('/admin')) {
        this.rolEnRuta = 'Administrador';
      } else if (url.startsWith('/bodega')) {
        this.rolEnRuta = 'Bodeguero';
      } else if (url.startsWith('/vendedor')) {
        this.rolEnRuta = 'Vendedor';
      } else if (url.startsWith('/contabilidad')) {
        this.rolEnRuta = 'Contador';
      } else {
        this.rolEnRuta = null;
      }
    });
    this.subCarrito = this.carritoService.carritoActualizado$.subscribe(() => {
      this.cargarCarrito();
    });
  }

  ngOnInit() {
    if (this.usuario) {
      this.cargarCarrito();
    }
  }

  cargarCarrito() {
    if (!this.usuario) return;
    this.cargandoCarrito = true;
    this.carritoService.obtenerCarrito(this.usuario.id).subscribe({
      next: (res) => {
        this.carrito = res.carrito;
        this.items = res.items || [];
        this.calcularTotal();
        this.cargandoCarrito = false;
      },
      error: () => {
        this.cargandoCarrito = false;
      }
    });
  }

  calcularTotal() {
    this.total = this.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  }

  cambiarCantidad(item: any, delta: number) {
    const nuevaCantidad = item.cantidad + delta;
    if (nuevaCantidad < 1 || nuevaCantidad > 10) return;
    this.carritoService.actualizarCantidad(item.id, nuevaCantidad).subscribe({
      next: () => {
        item.cantidad = nuevaCantidad;
        this.calcularTotal();
      }
    });
  }

  eliminarItem(item: any) {
    this.carritoService.eliminarItem(item.id).subscribe({
      next: () => {
        this.items = this.items.filter(i => i.id !== item.id);
        this.calcularTotal();
      }
    });
  }

  irAComprar() {
    this.router.navigate(['/compra']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subCarrito.unsubscribe();
  }
}