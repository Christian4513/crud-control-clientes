// Importa los decoradores necesarios desde Angular
import { Injectable } from '@angular/core';

// Define el decorador Injectable que indica que este servicio puede ser inyectado en otras partes de la aplicación
@Injectable({
  providedIn: 'root' // Este servicio estará disponible de forma global en la aplicación
})

// Exporta la clase NumerosService para que pueda ser utilizada en otros componentes o servicios
export class NumerosService {

  // Constructor de la clase; actualmente no realiza ninguna acción
  constructor() { }

  // Método que permite solo la entrada de números en un evento de teclado
  soloNumeros(event: KeyboardEvent) {
    const key = event.key; // Captura la tecla presionada

    // Verifica si la tecla presionada no es un número (del 0 al 9)
    if (!/^[0-9]$/.test(key)) {
      event.preventDefault(); // Previene la acción por defecto si la tecla no es un número
    }
  }
}

