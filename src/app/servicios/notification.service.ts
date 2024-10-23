import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// Define un servicio que estará disponible de forma global
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Variable para controlar si hay una notificación activa
  private isNotificationActive = false;

  // Inyecta el servicio de Toastr para mostrar notificaciones
  toastSvc = inject(ToastrService);

  // Muestra una notificación de éxito
  showSuccess(message: string, title: string = 'Título') {
    // Evita mostrar una nueva notificación si ya hay una activa
    if (this.isNotificationActive) return;

    this.isNotificationActive = true; // Marca la notificación como activa

    this.toastSvc.success(message, title, {
      timeOut: 3000, // Duración de la notificación en milisegundos
    });

    // Resetea el estado de la notificación después del tiempo configurado
    setTimeout(() => {
      this.isNotificationActive = false;
    }, 3000); // Debe coincidir con el tiempo configurado en timeOut
  }

  // Muestra una notificación de error
  showError(message: string, title: string = 'Título') {
    if (this.isNotificationActive) return;

    this.isNotificationActive = true;

    this.toastSvc.error(message, title, {
      timeOut: 3000,
    });

    setTimeout(() => {
      this.isNotificationActive = false;
    }, 3000);
  }

  // Muestra una notificación de información
  showInfo(message: string, title: string = 'Título') {
    if (this.isNotificationActive) return;

    this.isNotificationActive = true;

    this.toastSvc.info(message, title, {
      timeOut: 3000,
    });

    setTimeout(() => {
      this.isNotificationActive = false;
    }, 3000);
  }

  // Muestra una notificación de advertencia
  showWarning(message: string, title: string = 'Título') {
    if (this.isNotificationActive) return;

    this.isNotificationActive = true;

    this.toastSvc.warning(message, title, {
      timeOut: 3000,
    });

    setTimeout(() => {
      this.isNotificationActive = false;
    }, 3000);
  }
}
