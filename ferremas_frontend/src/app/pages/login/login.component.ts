import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMsg = '';


  ngOnInit() {
    if (this.auth.estaAutenticado()) {
      this.router.navigate(['/home']);
    }
  }
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.auth.login({ username, password }).subscribe({
        next: (res: any) => {
          // Guardar el token y datos del usuario
          this.auth.guardarSesion(res.token, res.user);

          // Redirigir según rol
          const rol = res.user.rol;
          switch (rol) {
            case 'cliente':
              this.router.navigate(['/cliente']);
              break;
            case 'administrador':
              this.router.navigate(['/admin']);
              break;
            case 'vendedor':
              this.router.navigate(['/vendedor']);
              break;
            case 'bodeguero':
              this.router.navigate(['/bodega']);
              break;
            case 'contador':
              this.router.navigate(['/contabilidad']);
              break;
            default:
              this.router.navigate(['/']);
              break;
          }
        },
        error: (err) => {
          this.errorMsg = err.error?.message || 'Credenciales incorrectas';
        }
      });
    }
  }
}
