import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { ProductListComponent } from '../../shared/product-list/product-list.component';

@Component({
  selector: 'app-tienda',
  standalone: true,
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css',
  imports: [CommonModule, RouterModule, NavbarComponent, ProductListComponent],
})
export class TiendaComponent {}
