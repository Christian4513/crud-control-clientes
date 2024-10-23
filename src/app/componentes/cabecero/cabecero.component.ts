import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';

// Decorador que define un componente Angular
@Component({
  selector: 'app-cabecero', // Selector del componente
  standalone: true, // Indica que es un componente independiente
  imports: [RouterModule, CommonModule], // Módulos necesarios
  templateUrl: './cabecero.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./cabecero.component.css'], // Ruta del archivo CSS
})
export class CabeceroComponent implements OnInit {
  isLoggedIn!: boolean; // Variable para controlar si el usuario está autenticado
  loggedInUser!: string; // Almacena el correo del usuario autenticado
  permitirRegistro!: boolean; // Controla si se permite el registro de nuevos usuarios

  // Inyecciones de servicios
  loginService = inject(LoginService);
  router = inject(Router);
  configuracionServicio = inject(ConfiguracionServicio);

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true; // Usuario está autenticado
        this.loggedInUser = auth.email ?? ''; // Almacena el correo del usuario
      } else {
        this.isLoggedIn = false; // Usuario no está autenticado
      }
    });

    this.configuracionServicio.getConfiguracion().subscribe((configuracion) => {
      this.permitirRegistro = configuracion.permitirRegistro ?? false; // Configura si se permite el registro
    });
  }

  // Método para cerrar sesión
  logout() {
    this.loginService.logout(); // Llama al servicio para cerrar sesión
    this.isLoggedIn = false; // Actualiza el estado de autenticación
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
