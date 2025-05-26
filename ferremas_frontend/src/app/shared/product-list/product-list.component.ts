import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';
import { CarritoService } from '../../services/carrito.service';
import { AuthService } from '../../core/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  productos: Producto[] = [];
  productosFiltrados: Producto[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = '';
  busqueda: string = '';
  orden: string = 'nombre';
  ordenOpciones = [
    { value: 'nombre', label: 'Nombre' },
    { value: 'precio', label: 'Precio' },
    { value: 'stock', label: 'Stock' }
  ];
  // Paginación
  paginaActual: number = 1;
  productosPorPagina: number = 8;

  // Carrito
  usuario: any = null;
  carrito: any = null;
  cargandoCarrito: boolean = false;

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.productoService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
      this.categorias = Array.from(new Set(productos.map(p => p.categoria)));
      this.aplicarFiltros();
    });
    this.usuario = this.auth.getUser();
    if (this.usuario) {
      this.cargarCarrito();
    }
  }

  cargarCarrito() {
    this.cargandoCarrito = true;
    this.carritoService.obtenerCarrito(this.usuario.id).subscribe({
      next: (res) => {
        this.carrito = res.carrito;
        this.cargandoCarrito = false;
      },
      error: () => {
        this.cargandoCarrito = false;
      }
    });
  }

  agregarAlCarrito(producto: Producto) {
    if (!this.carrito) return;
    this.carritoService.agregarItem(this.carrito.id, producto.id!, 1).subscribe({
      next: () => {
      },
      error: () => {
        alert('Error al agregar al carrito');
      }
    });
  }

  aplicarFiltros() {
    let filtrados = this.productos;
    if (this.categoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.categoria === this.categoriaSeleccionada);
    }
    if (this.busqueda.trim()) {
      const b = this.busqueda.trim().toLowerCase();
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(b) ||
        p.descripcion.toLowerCase().includes(b)
      );
    }
    filtrados = filtrados.sort((a, b) => {
      if (this.orden === 'precio') {
        return a.precio - b.precio;
      } else if (this.orden === 'stock') {
        return a.stock - b.stock;
      } else {
        return a.nombre.localeCompare(b.nombre);
      }
    });
    this.productosFiltrados = filtrados;
    this.paginaActual = 1;
  }

  get productosPagina() {
    const start = (this.paginaActual - 1) * this.productosPorPagina;
    return this.productosFiltrados.slice(start, start + this.productosPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.productosFiltrados.length / this.productosPorPagina) || 1;
  }

  cambiarPagina(delta: number) {
    const totalPaginas = this.totalPaginas;
    this.paginaActual = Math.min(Math.max(1, this.paginaActual + delta), totalPaginas);
  }
}
