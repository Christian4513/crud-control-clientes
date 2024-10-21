import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../servicios/login.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(LoginService);  // Inyecta el servicio de autenticación
  const router = inject(Router);  // Inyecta el enrutador

  try {
    const isLoggedIn = await loginService.isLoggedIn();  // Espera el resultado de isLoggedIn()

    if (isLoggedIn) {
      return true;  // Si el usuario está autenticado, permite el acceso
    } else {
      router.navigate(['/login']);  // Si no está autenticado, redirige al login
      return false;
    }
  } catch (error) {
    console.error('Error al verificar la autenticación', error);
    router.navigate(['/login']);  // Si hay un error, redirige al login
    return false;
  }
};


