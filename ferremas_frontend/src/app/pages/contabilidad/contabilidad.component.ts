import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contabilidad',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './contabilidad.component.html',
  styleUrl: './contabilidad.component.css'
})
export class ContabilidadComponent implements OnInit {
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
        this.ventas = ventas.filter(v => v.estado === 'pendiente');
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  confirmarPago(venta: any) {
    this.http.put(`http://localhost:3000/api/ventas/${venta.id}/pagar`, {}).subscribe({
      next: () => {
        this.mensaje = `Pago de la venta #${venta.id} confirmado.`;
        this.cargarVentas();
      },
      error: () => {
        this.mensaje = `Error al confirmar el pago de la venta #${venta.id}`;
      }
    });
  }
}
