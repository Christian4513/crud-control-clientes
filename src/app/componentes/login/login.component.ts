import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../servicios/notification.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email!: string; // Propiedad para el correo electrónico
  password!: string; // Propiedad para la contraseña

  router = inject(Router); // Inyecta el servicio de enrutamiento
  loginService = inject(LoginService); // Inyecta el servicio de autenticación
  notification = inject(NotificationService); // Inyecta el servicio de notificaciones

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']); // Redirige si el usuario está autenticado
      }
    });
  }

  // Método para iniciar sesión
  login() {
    this.loginService
      .login(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']); // Redirige a la página principal después del inicio de sesión
      })
      .catch((error) => {
        // Muestra una notificación de error si las credenciales son incorrectas
        this.notification.showError('Correo electrónico o contraseña incorrectos.', 'Error de inicio de sesión');
      });
  }
}
