import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vendedor',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './vendedor.component.html',
  styleUrl: './vendedor.component.css'
})
export class VendedorComponent implements OnInit {
  ventas: any[] = [];
  cargando: boolean = true;
  mensaje: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas() {
    this.cargando = true;
    this.http.get<any[]>('http://localhost:3000/api/ventas').subscribe({
      next: (ventas) => {
        const ventasFiltradas = ventas.filter(v => v.estado === 'pagada' && !v.confirmado);
        // Obtener los items de cada venta
        const peticiones = ventasFiltradas.map(venta =>
          this.http.get<any>(`http://localhost:3000/api/ventas/${venta.id}`).toPromise()
        );
        Promise.all(peticiones).then((detalles) => {
          this.ventas = detalles;
          this.cargando = false;
        }).catch(() => {
          this.cargando = false;
        });
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  confirmarVenta(venta: any) {
    this.http.put(`http://localhost:3000/api/ventas/${venta.id}/confirmar`, {}).subscribe({
      next: () => {
        this.mensaje = `Venta #${venta.id} confirmada.`;
        this.cargarVentas();
      },
      error: () => {
        this.mensaje = `Error al confirmar la venta #${venta.id}`;
      }
    });
  }
}
