import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api'; // Asegúrate de que esta sea tu URL base del backend

  constructor(private http: HttpClient) {}

  // Login
  login(data: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, data);
  }

  // Registro
  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, data);
  }

  // Guardar token y usuario
  guardarSesion(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtener usuario autenticado
  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Cierre de sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Verifica si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
