// Importación de módulos y componentes necesarios
import { Component } from '@angular/core'; // Importa el decorador Component de Angular
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet para la navegación
import { CabeceroComponent } from "./componentes/cabecero/cabecero.component"; // Importa el componente de cabecera
import { PiePaginaComponent } from "./componentes/pie-pagina/pie-pagina.component"; // Importa el componente de pie de página

// Importación de configuración de Firebase
import { environment } from '../environments/environment'; // Importa la configuración del entorno
import { initializeApp } from 'firebase/app'; // Importa la función para inicializar Firebase
import { getFirestore } from 'firebase/firestore'; // Importa la función para acceder a Firestore

// Decorador del componente principal de la aplicación
@Component({
  selector: 'app-root', // Nombre del selector para este componente
  standalone: true, // Indica que este componente es independiente (standalone)
  imports: [RouterOutlet, CabeceroComponent, PiePaginaComponent], // Componentes que se importan para su uso en este componente
  templateUrl: './app.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./app.component.css'] // Ruta al archivo de estilos CSS
})
export class AppComponent {
  title = 'control-clientes'; // Propiedad que contiene el título de la aplicación
  public firestore; // Propiedad para almacenar la referencia a Firestore

  // Constructor del componente
  constructor() {
    // Inicializa la aplicación de Firebase con la configuración del entorno
    const app = initializeApp(environment.firebase);

    // Obtiene la referencia de Firestore y la asigna a la propiedad firestore
    this.firestore = getFirestore(app);
  }
}
