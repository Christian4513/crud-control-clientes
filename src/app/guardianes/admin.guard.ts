import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginService } from '../servicios/login.service'

// Define un guardián de ruta para verificar si el usuario es administrador
export const adminGuard: CanActivateFn = async (route, state) => {
  const auth = inject(AngularFireAuth); // Inyecta el servicio de autenticación de Firebase
  const router = inject(Router); // Inyecta el servicio de enrutamiento
  const loginService = inject(LoginService); // Inyecta el servicio de autenticación personalizado

  const user = await auth.currentUser; // Obtiene el usuario autenticado actual

  if (user) {
    const isAdmin = await loginService.isAdmin(user.email!); // Verifica si el usuario es administrador
    if (isAdmin) {
      return true; // Permite la navegación si el usuario es administrador
    }
  }

  router.navigate(['/']); // Redirige a la página principal si el usuario no es administrador
  return false; // Bloquea la navegación
};

