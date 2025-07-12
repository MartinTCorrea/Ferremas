import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      re_password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { password, re_password } = this.registerForm.value;

      if (password !== re_password) {
        this.errorMsg = 'Las contraseñas no coinciden';
        return;
      }

      const nuevoUsuario = {
        nombreCompleto: this.registerForm.value.nombreCompleto,
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        rol: 'cliente'  // rol por defecto
      };

      this.auth.register(nuevoUsuario).subscribe({
        next: () => {
          alert('Usuario registrado exitosamente');
          this.router.navigate(['/login']);
        },
        error: err => {
          this.errorMsg = err.error?.message || 'Error en registro';
        }
      });
    }
  }
}
