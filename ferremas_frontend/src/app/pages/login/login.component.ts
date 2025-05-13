import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';


import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: () => {
          this.auth.getUser().subscribe((user: any) => {
            // Aquí definimos la lógica de redirección según el rol
            switch (user.rol) {
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
          });
        },
        error: () => alert('Credenciales incorrectas')
      });
    }
  }
}

