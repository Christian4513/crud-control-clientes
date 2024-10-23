import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ConfiguracionServicio } from '../../servicios/configuracion.service';
import { Configuracion } from '../../modelo/configuracion.model';

// Decorador que define un componente Angular
@Component({
  selector: 'app-configuracion', // Selector del componente en la plantilla HTML
  standalone: true, // Indica que el componente es independiente
  imports: [RouterModule, FormsModule], // Módulos necesarios para el funcionamiento del componente
  templateUrl: './configuracion.component.html', // Ruta de la plantilla HTML del componente
  styleUrl: './configuracion.component.css' // Ruta de los estilos CSS del componente
})
export class ConfiguracionComponent implements OnInit {
  permitirRegistro = false; // Propiedad para controlar si se permite el registro

  // Inyecciones de servicios
  router = inject(Router); // Servicio de enrutamiento
  configuracionServicio = inject(ConfiguracionServicio); // Servicio de configuración

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.configuracionServicio.getConfiguracion().subscribe(
      (configuracion: Configuracion) => {
        // Asigna el valor de permitirRegistro desde la configuración
        this.permitirRegistro = configuracion.permitirRegistro ?? false;
      }
    );
  }

  // Método para guardar la configuración
  guardar() {
    // Crea un objeto de configuración con el valor actual de permitirRegistro
    let configuracion = { permitirRegistro: this.permitirRegistro };

    // Llama al servicio para modificar la configuración
    this.configuracionServicio.modificarConfiguracion(configuracion);

    // Navega a la ruta principal después de guardar la configuración
    this.router.navigate(['/']);
  }
}
