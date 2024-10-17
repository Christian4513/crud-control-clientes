import { bootstrapApplication } from '@angular/platform-browser';
// Permite iniciar la aplicación con un componente raíz en lugar de un módulo.

import { provideHttpClient } from '@angular/common/http';
// Proveedor de servicios HTTP para realizar peticiones HTTP en la aplicación.

import { AppComponent } from './app/app.component';
// Componente principal (root) de la aplicación.

import { importProvidersFrom } from '@angular/core';
// Utiliza proveedores de módulos en lugar de importarlos en NgModules.

import { provideRouter } from '@angular/router';
// Proveedor de enrutamiento que permite definir las rutas de la aplicación.


// Importa AngularFire y el entorno de configuración
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';

// Importa rutas y Toastr para notificaciones
import { routes } from './app/app.routes';
import { ToastrModule } from 'ngx-toastr';

// Inicializa la aplicación con AppComponent y proveedores
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig), // Configuración de Firebase
      AngularFirestoreModule,                                      // Habilita Firestore
      ToastrModule.forRoot()                                       // Configura Toastr
    ),
    provideHttpClient(),                                           // Proveedor de HTTP
    provideRouter(routes),                                         // Configura el enrutador con rutas
  ],
})
.catch((err) => console.error(err));                               // Manejo de errores


