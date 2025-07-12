import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../core/auth.service';
import { Producto } from '../../models/producto.model';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
<<<<<<< HEAD
=======
import { HttpClient } from '@angular/common/http';
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694

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
<<<<<<< HEAD
=======
  valorDolar: number = 0;
  precioUSD: number = 0;
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private carritoService: CarritoService,
<<<<<<< HEAD
    private auth: AuthService
=======
    private auth: AuthService,
    private http: HttpClient
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.obtenerProductoPorId(id).subscribe({
      next: (prod) => {
        this.producto = prod;
        this.cargando = false;
<<<<<<< HEAD
=======
        this.obtenerValorDolar();
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694
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

<<<<<<< HEAD
=======
  obtenerValorDolar() {
    this.http.get<any>('http://localhost:3000/api/indicadores/dolar')
      .subscribe(data => {
        this.valorDolar = data.valor;
        this.calcularPrecioUSD();
      });
  }

  calcularPrecioUSD() {
    if (this.producto && this.valorDolar) {
      this.precioUSD = this.producto.precio / this.valorDolar;
    }
  }

>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694
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
