import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authRoleGuard: CanActivateFn = (route, state) => {
  const allowedRoles = route.data['allowedRoles'] as string[];
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const router = inject(Router);

  if (!token || !userStr) {
    // Si no está autenticado, redirige a /denegado
    return router.parseUrl('/denegado');
  }

  const user = JSON.parse(userStr);
  const userRole = user.rol;

  // El admin puede entrar a cualquier ruta
  if (userRole === 'Administrador') {
    return true;
  }

  // Revisa si su rol está permitido
  if (allowedRoles.includes(userRole)) {
    return true;
  } else {
    return router.parseUrl('/denegado');
  }
};
