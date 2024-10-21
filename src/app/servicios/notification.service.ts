import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private isNotificationActive = false; // Controla si hay una notificación activa

  toastSvc = inject(ToastrService);
  // Método para mostrar la notificación

  showSuccess(message: string, title: string = 'Título') {
    if (this.isNotificationActive) return; // Evita mostrar una nueva notificación si ya hay una activa

    this.isNotificationActive = true; // Marca la notificación como activa

    this.toastSvc.success(message, title, {
      timeOut: 3000, // Duración de la notificación
    });

    // Usar setTimeout para resetear el estado de la notificación
    setTimeout(() => {
      this.isNotificationActive = false; // Resetea el flag cuando la notificación se oculta
    }, 3000); // Debe coincidir con el timeOut configurado
  }

  showError(message: string, title: string = 'Título') {
    if (this.isNotificationActive) return; // Evita mostrar una nueva notificación si ya hay una activa

    this.isNotificationActive = true; // Marca la notificación como activa

    this.toastSvc.error(message, title, {
      timeOut: 3000, // Duración de la notificación
    });

    // Usar setTimeout para resetear el estado de la notificación
    setTimeout(() => {
      this.isNotificationActive = false; // Resetea el flag cuando la notificación se oculta
    }, 3000); // Debe coincidir con el timeOut configurado
  }

  showInfo(message: string, title: string = 'Título') {
    if (this.isNotificationActive) return; // Evita mostrar una nueva notificación si ya hay una activa

    this.isNotificationActive = true; // Marca la notificación como activa

    this.toastSvc.info(message, title, {
      timeOut: 3000, // Duración de la notificación
    });

    // Usar setTimeout para resetear el estado de la notificación
    setTimeout(() => {
      this.isNotificationActive = false; // Resetea el flag cuando la notificación se oculta
    }, 3000); // Debe coincidir con el timeOut configurado
  }

  showWarning(message: string, title: string = 'Título') {
    if (this.isNotificationActive) return; // Evita mostrar una nueva notificación si ya hay una activa

    this.isNotificationActive = true; // Marca la notificación como activa

    this.toastSvc.warning(message, title, {
      timeOut: 3000, // Duración de la notificación
    });

    // Usar setTimeout para resetear el estado de la notificación
    setTimeout(() => {
      this.isNotificationActive = false; // Resetea el flag cuando la notificación se oculta
    }, 3000); // Debe coincidir con el timeOut configurado
  }
}

