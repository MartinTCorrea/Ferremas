import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function authRoleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      const router = inject(Router);
      router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userStr);
    const userRole = user.rol;

    // El admin puede entrar a cualquier ruta
    if (userRole === 'administrador') {
      return true;
    }

    // Revisa si su rol está permitido
    return allowedRoles.includes(userRole);
  };
}
