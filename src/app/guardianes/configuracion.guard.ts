import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ConfiguracionServicio } from '../servicios/configuracion.service';
import { map } from 'rxjs/operators';

// Definición de la función guardián de configuración
export const configuracionGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyecta el servicio de enrutamiento
  const configuracionServicio = inject(ConfiguracionServicio); // Inyecta el servicio de configuración

  return configuracionServicio.getConfiguracion().pipe(
    map(configuracion => {
      // Verifica si está permitido el registro
      if (configuracion.permitirRegistro) {
        return true; // Permite la navegación
      } else {
        router.navigate(['/login']); // Redirige al login si no está permitido el registro
        return false; // Bloquea la navegación
      }
    })
  );
};

