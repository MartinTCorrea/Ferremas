import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../core/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compra.component.html',
  styleUrl: './compra.component.css'
})
export class CompraComponent implements OnInit {
  usuario: any = null;
  carrito: any = null;
  items: any[] = [];
  total: number = 0;
  cargando: boolean = true;
  mensaje: string = '';

  constructor(
    private carritoService: CarritoService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuario = this.auth.getUser();
    if (this.usuario) {
      this.carritoService.obtenerCarrito(this.usuario.id).subscribe({
        next: (res) => {
          this.carrito = res.carrito;
          this.items = res.items || [];
          this.total = this.items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
          this.cargando = false;
        },
        error: () => {
          this.cargando = false;
        }
      });
    } else {
      this.cargando = false;
    }
  }

  pagar() {
    if (!this.usuario || !this.items.length) return;
    const productos = this.items.map(item => ({
      producto_id: item.producto_id || item.id,
      cantidad: item.cantidad,
      precio: item.precio
    }));
    this.http.post('http://localhost:3000/api/ventas', {
      usuario_id: this.usuario.id,
      total: this.total,
      productos
    }).subscribe({
      next: () => {
        if (this.carrito) {
          this.carritoService.vaciarCarrito(this.carrito.id).subscribe();
        }
        this.mensaje = '¡Compra realizada con éxito!';
        setTimeout(() => this.router.navigate(['/tienda']), 2000);
      },
      error: () => {
        this.mensaje = 'Error al procesar la compra.';
      }
    });
  }
}
