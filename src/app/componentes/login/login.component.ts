import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../servicios/login.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email!: string;
  password!: string;

  toastSvc = inject(ToastrService); // Inyección del servicio ToastrService para mostrar notificaciones
  router = inject(Router);
  loginService = inject(LoginService);

  login() {
    this.loginService
      .login(this.email, this.password)
      .then((res) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.toastSvc.error('Correo electrónico o contraseña incorrectos.', 'Error de inicio de sesión', {
          timeOut: 3000,
        });
      });
  }

}
