import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../core/auth.service';
import { Producto } from '../../models/producto.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent], 
  templateUrl: './producto-detalle.component.html',
  styleUrl: './producto-detalle.component.css'
})
export class ProductoDetalleComponent implements OnInit {
  producto: Producto | null = null;
  cantidad: number = 1;
  cargando: boolean = true;
  usuario: any = null;
  carrito: any = null;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.obtenerProductoPorId(id).subscribe({
      next: (prod) => {
        this.producto = prod;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
    this.usuario = this.auth.getUser();
    if (this.usuario) {
      this.carritoService.obtenerCarrito(this.usuario.id).subscribe(res => {
        this.carrito = res.carrito;
      });
    }
  }

  agregarAlCarrito() {
    if (!this.carrito || !this.producto) return;
    this.carritoService.agregarItem(this.carrito.id, this.producto.id!, this.cantidad).subscribe({
      next: () => {
        alert('Producto agregado al carrito');
      },
      error: () => {
        alert('Error al agregar al carrito');
      }
    });
  }

  incrementar() {
    if (this.cantidad < 10) this.cantidad++;
  }

  decrementar() {
    if (this.cantidad > 1) this.cantidad--;
  }
}
