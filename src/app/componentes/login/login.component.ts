import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
export class LoginComponent implements OnInit{

  email!: string;
  password!: string;

  toastSvc = inject(ToastrService); // Inyección del servicio ToastrService para mostrar notificaciones
  router = inject(Router);
  loginService = inject(LoginService);
  notification = inject(NotificationService);

  ngOnInit() {
    this.loginService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']); // Redirige si el usuario está autenticado
      }
    });
  }

  login() {
    this.loginService
      .login(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.notification.showError('Correo electrónico o contraseña incorrectos.', 'Error de inicio de sesión');
      });
  }

}
