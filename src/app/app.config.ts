import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// Importa ApplicationConfig y provideZoneChangeDetection para configurar la detección de cambios

import { provideRouter } from '@angular/router';
// Importa provideRouter para habilitar la funcionalidad de enrutamiento

import { routes } from './app.routes';
// Importa las rutas definidas para la aplicación

// Configuración de la aplicación utilizando ApplicationConfig
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // Configura la detección de cambios en la zona con coalescencia de eventos

    provideRouter(routes),
    // Proporciona el enrutador con las rutas definidas
  ]
};


