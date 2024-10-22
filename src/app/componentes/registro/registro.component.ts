import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../servicios/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent implements OnInit {
  router = inject(Router);
  loginService = inject(LoginService);
  notification = inject(NotificationService);

  email!: string;
  password!: string;

  ngOnInit() {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']); // Redirige si el usuario está autenticado
      }
    });
  }

  registro() {
    this.loginService
      .registrarse(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
         // Llama a la función para traducir el mensaje de error
      const mensajeError = this.traducirMensajeError(error.code);
      this.notification.showError(mensajeError, 'Error de registro');
      });
  }

  // Función para traducir los mensajes de error
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
