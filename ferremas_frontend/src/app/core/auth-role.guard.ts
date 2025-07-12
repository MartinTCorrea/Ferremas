import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authRoleGuard: CanActivateFn = (route, state) => {
  const allowedRoles = route.data['allowedRoles'] as string[];
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  const router = inject(Router);

  if (!token || !userStr) {
<<<<<<< HEAD
    // Retorna un UrlTree para redirigir, NO navegues manualmente
    return router.parseUrl('/login');
=======
    // Si no está autenticado, redirige a /denegado
    return router.parseUrl('/denegado');
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694
  }

  const user = JSON.parse(userStr);
  const userRole = user.rol;

  // El admin puede entrar a cualquier ruta
<<<<<<< HEAD
  if (userRole === 'administrador') {
=======
  if (userRole === 'Administrador') {
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694
    return true;
  }

  // Revisa si su rol está permitido
<<<<<<< HEAD
  return allowedRoles.includes(userRole);
=======
  if (allowedRoles.includes(userRole)) {
    return true;
  } else {
    return router.parseUrl('/denegado');
  }
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694
};
