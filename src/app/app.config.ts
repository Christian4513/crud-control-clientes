import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'
import {provideToastr} from 'ngx-toastr'
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [ provideAnimations(), provideToastr({timeOut: 900, preventDuplicates: true}), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),


  ]
};


