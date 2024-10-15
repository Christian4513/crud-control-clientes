import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

// Importa AngularFire y el entorno
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';

// Importa las rutas
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule
    ),
    provideHttpClient(),
    provideRouter(routes), // Agrega el enrutador con tus rutas aquí
  ],
})
.catch((err) => console.error(err));

