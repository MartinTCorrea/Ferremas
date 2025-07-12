import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bodega',
  standalone: true,
  imports: [NavbarComponent, CommonModule, FormsModule],
  templateUrl: './bodega.component.html',
  styleUrl: './bodega.component.css'
})
export class BodegaComponent implements OnInit {
  productos: Producto[] = [];
  cargando: boolean = true;
  mensaje: string = '';

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  actualizarStock(producto: Producto) {
    this.productoService.actualizarProducto(producto.id!, producto).subscribe({
      next: () => {
        this.mensaje = `Stock de "${producto.nombre}" actualizado.`;
        setTimeout(() => this.mensaje = '', 2000);
      },
      error: () => {
        this.mensaje = `Error al actualizar el stock de "${producto.nombre}".`;
      }
    });
  }
}
