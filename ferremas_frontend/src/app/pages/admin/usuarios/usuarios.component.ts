import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = [];
  usuarioForm: FormGroup;
  editando = false;
  usuarioEditandoId: string | null = null;

  constructor(private fb: FormBuilder, private usuariosService: UsuariosService) {
    this.usuarioForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      rol: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe(data => this.usuarios = data);
  }

  agregarUsuario() {
    if (this.usuarioForm.valid) {
      this.usuariosService.agregarUsuario(this.usuarioForm.value).subscribe(() => {
        this.cargarUsuarios();
        this.usuarioForm.reset();
      });
    }
  }

  editarUsuario(usuario: any) {
    this.editando = true;
    this.usuarioEditandoId = usuario.id;
    this.usuarioForm.patchValue(usuario);
    this.usuarioForm.get('password')?.setValue('');
  }

  guardarEdicion() {
    if (this.usuarioForm.valid && this.usuarioEditandoId) {
      const datos = { ...this.usuarioForm.value };
      if (!datos.password) delete datos.password;
      this.usuariosService.editarUsuario(this.usuarioEditandoId, datos).subscribe(() => {
        this.cargarUsuarios();
        this.cancelarEdicion();
      });
    }
  }

  cancelarEdicion() {
    this.editando = false;
    this.usuarioEditandoId = null;
    this.usuarioForm.reset();
  }

  eliminarUsuario(id: string) {
    this.usuariosService.eliminarUsuario(id).subscribe(() => this.cargarUsuarios());
  }
}
