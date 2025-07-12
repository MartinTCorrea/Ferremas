import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { Producto } from '../../../models/producto.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  imports: [CommonModule, FormsModule]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  producto: Producto = this.resetProducto();

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  resetProducto(): Producto {
    return { nombre: '', descripcion: '', precio: 0, stock: 0, categoria: '', imagen: '' };
  }

  obtenerProductos() {
    this.productoService.obtenerProductos().subscribe(data => {
      this.productos = data;
    });
  }

  guardarProducto() {
    if (this.producto.id) {
      this.productoService.actualizarProducto(this.producto.id, this.producto).subscribe(() => {
        this.obtenerProductos();
        this.producto = this.resetProducto();
      });
    } else {
      this.productoService.agregarProducto(this.producto).subscribe(() => {
        this.obtenerProductos();
        this.producto = this.resetProducto();
      });
    }
  }

  editarProducto(prod: Producto) {
    this.producto = { ...prod };
  }

  eliminarProducto(id: number) {
    if (confirm('¿Eliminar este producto?')) {
      this.productoService.eliminarProducto(id).subscribe(() => {
        this.obtenerProductos();
      });
    }
  }

  cancelarEdicion() {
    this.producto = this.resetProducto();
  }
}
