import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authRoleGuard: CanActivateFn = (route, state) => {
  const allowedRoles = route.data['allowedRoles'] as string[];
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const router = inject(Router);

  if (!token || !userStr) {
    // Retorna un UrlTree para redirigir, NO navegues manualmente
    return router.parseUrl('/login');
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
