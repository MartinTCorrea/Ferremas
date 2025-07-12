import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private apiUrl = 'http://localhost:3000/api/carrito';
  carritoActualizado$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  obtenerCarrito(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${usuarioId}`);
  }

  agregarItem(carritoId: number, productoId: number, cantidad: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${carritoId}/items`, {
      producto_id: productoId,
      cantidad
    }).pipe(
      tap(() => this.carritoActualizado$.next())
    );
  }

  actualizarCantidad(itemId: number, cantidad: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/items/${itemId}`, { cantidad }).pipe(
      tap(() => this.carritoActualizado$.next())
    );
  }

  eliminarItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/items/${itemId}`).pipe(
      tap(() => this.carritoActualizado$.next())
    );
  }

  vaciarCarrito(carritoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${carritoId}/items`).pipe(
      tap(() => this.carritoActualizado$.next())
    );
  }
} 