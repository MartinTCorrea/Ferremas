import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-denegado',
  imports: [CommonModule, RouterModule],
  template: `
    <div class="denegado-container">
      <h1>🚫 Acceso Denegado</h1>
      <p>No tienes permisos para ver esta página.</p>
<<<<<<< HEAD
      <a routerLink="/home" class="volver-btn">Volver al inicio</a>
=======
      <a routerLink="/tienda" class="volver-btn">Volver a la tienda</a>
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694
    </div>
  `,
  styles: [`
    .denegado-container {
      text-align: center;
      margin-top: 100px;
      font-family: Arial, sans-serif;
    }
    .volver-btn {
      display: inline-block;
      margin-top: 20px;
      background-color: #d9534f;
      color: white;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 4px;
    }
    .volver-btn:hover {
      background-color: #c9302c;
    }
  `]
})
export class DenegadoComponent {}
