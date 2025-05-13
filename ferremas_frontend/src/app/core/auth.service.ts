import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://127.0.0.1:8000/auth';  // Ajusta si cambia

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ auth_token: string }>(`${this.BASE_URL}/token/login/`, credentials)
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.auth_token);
        })
      );
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/token/logout/`, {}, {
      headers: { Authorization: `Token ${this.getToken()}` }
    }).pipe(
      tap(() => localStorage.removeItem('token'))
    );
  }

  register(data: { username: string; password: string; re_password: string }) {
    return this.http.post(`${this.BASE_URL}/users/`, data);
  }

  getUser() {
    return this.http.get(`${this.BASE_URL}/users/me/`, {
      headers: { Authorization: `Token ${this.getToken()}` }
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
