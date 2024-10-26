import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from './environments/environment';

import { routes } from './app/app.routes';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BsModalService } from 'ngx-bootstrap/modal';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
      ToastrModule.forRoot({ positionClass: 'toast-bottom-right' })
    ),
    BsModalService,
    provideHttpClient(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));

