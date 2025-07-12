import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; // URL base ajustada


  constructor(private http: HttpClient, private router: Router) {}
  
  private usuarioSubject = new BehaviorSubject<any>(this.getUser());
  usuario$ = this.usuarioSubject.asObservable();

  // --- Autenticación y Registro ---
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // --- Manejo de Sesión ---
  guardarSesion(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(user));
    this.usuarioSubject.next(user);
  }

  cerrarSesion(): void {
    localStorage.clear();
    this.usuarioSubject.next(null);
    this.router.navigate(['/login']);
  }

  // --- Utilidades ---
  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const userStr = localStorage.getItem('usuario');
    return userStr ? JSON.parse(userStr) : null;
  }

  get usuarioActual(): any {
    const userStr = localStorage.getItem('usuario');
    return userStr ? JSON.parse(userStr) : null;
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

}
