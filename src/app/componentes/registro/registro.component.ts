import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../servicios/notification.service';
import { FormsModule } from '@angular/forms';

// Decorador que define un componente Angular
@Component({
  selector: 'app-registro', // Selector para el componente en la plantilla HTML
  standalone: true, // Indica que es un componente independiente
  imports: [FormsModule], // Importa los módulos necesarios
  templateUrl: './registro.component.html', // Ruta de la plantilla HTML del componente
  styleUrl: './registro.component.css', // Ruta del archivo CSS del componente
})
export class RegistroComponent implements OnInit {
  router = inject(Router); // Inyecta el servicio de enrutamiento
  loginService = inject(LoginService); // Inyecta el servicio de autenticación
  notification = inject(NotificationService); // Inyecta el servicio de notificaciones

  email!: string; // Propiedad para el correo electrónico
  password!: string; // Propiedad para la contraseña

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']); // Redirige si el usuario está autenticado
      }
    });
  }

  // Método para registrar un nuevo usuario
  registro() {
    this.loginService
      .registrarse(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']); // Redirige a la página principal después del registro
      })
      .catch((error) => {
        // Traduce el mensaje de error y muestra una notificación
        const mensajeError = this.traducirMensajeError(error.code);
        this.notification.showError(mensajeError, 'Error de registro');
      });
  }

  // Función para traducir los mensajes de error de autenticación
  traducirMensajeError(codigoError: string): string {
    switch (codigoError) {
      case 'auth/email-already-in-use':
        return 'El correo electrónico ya está en uso.';
      case 'auth/invalid-email':
        return 'El correo electrónico no es válido.';
      case 'auth/operation-not-allowed':
        return 'La operación no está permitida.';
      case 'auth/weak-password':
        return 'La contraseña es demasiado débil.';
      case 'auth/missing-email':
        return 'Debe ingresar un correo electrónico.';
      case 'auth/internal-error':
        return 'Ocurrió un error interno. Inténtalo de nuevo más tarde.';
      default:
        return 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
    }
  }
}

