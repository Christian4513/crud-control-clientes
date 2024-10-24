import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../servicios/login.service';
import { CommonModule } from '@angular/common';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';

// Define un componente Angular
@Component({
  selector: 'app-cabecero', // Selector del componente para uso en plantillas HTML
  standalone: true, // Indica que el componente no depende de un módulo específico
  imports: [RouterModule, CommonModule], // Importa módulos necesarios
  templateUrl: './cabecero.component.html', // Ruta de la plantilla HTML del componente
  styleUrls: ['./cabecero.component.css'] // Ruta de los estilos CSS del componente
})
export class CabeceroComponent implements OnInit {
  isLoggedIn!: boolean; // Indica si el usuario está autenticado
  loggedInUser!: string; // Almacena el correo del usuario autenticado
  permitirRegistro!: boolean; // Controla si se permite el registro de nuevos usuarios
  isAdmin = false; // Indica si el usuario autenticado es administrador

  // Inyección de servicios
  loginService = inject(LoginService); // Servicio de autenticación
  router = inject(Router); // Servicio de enrutamiento
  configuracionServicio = inject(ConfiguracionServicio); // Servicio de configuración

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.loginService.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true; // Usuario está autenticado
        this.loggedInUser = auth.email ?? ''; // Almacena el correo del usuario
        this.loginService.isAdmin(auth.email!).then(isAdmin => {
          this.isAdmin = isAdmin; // Actualiza el estado de administrador
        });
      } else {
        this.isLoggedIn = false; // Usuario no está autenticado
      }
    });

    // Suscripción a los cambios de configuración
    this.configuracionServicio.getConfiguracion().subscribe((configuracion) => {
      this.permitirRegistro = configuracion.permitirRegistro ?? false;
    });
  }

  // Método para cerrar sesión
  logout() {
    this.loginService.logout(); // Llama al servicio para cerrar sesión
    this.isLoggedIn = false; // Actualiza el estado de autenticación
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}

