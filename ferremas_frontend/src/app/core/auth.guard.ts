import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function authRoleGuard(allowedRoles: string[]): CanActivateFn {
  return () => {
    const router = inject(Router);
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      router.navigate(['/login']);
      return false;
    }

    const user = JSON.parse(userStr);
    const userRole = user.rol;

    // Admin tiene acceso total
<<<<<<< HEAD
    if (userRole === 'administrador') return true;
=======
    if (userRole === 'Administrador') return true;
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694

    // Verifica si tiene permiso
    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      router.navigate(['/denegado']);
      return false;
    }
  };
}
