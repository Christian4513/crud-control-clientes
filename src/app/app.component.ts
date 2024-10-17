// Importación de módulos y componentes necesarios
import { Component } from '@angular/core'; // Importa el decorador Component para definir el componente
import { RouterOutlet } from '@angular/router'; // Importa RouterOutlet para manejar las rutas en la aplicación
import { CabeceroComponent } from "./componentes/cabecero/cabecero.component"; // Importa el componente del encabezado
import { PiePaginaComponent } from "./componentes/pie-pagina/pie-pagina.component"; // Importa el componente del pie de página
import { ClientesComponent } from "./componentes/clientes/clientes.component"; // Importa el componente para gestionar clientes

// Decorador del componente principal de la aplicación
@Component({
  selector: 'app-root', // Selector para el componente en la plantilla HTML
  standalone: true, // Indica que este es un componente standalone
  imports: [RouterOutlet, CabeceroComponent, PiePaginaComponent, ClientesComponent], // Importa los componentes necesarios para el funcionamiento del componente
  templateUrl: './app.component.html', // Archivo de plantilla HTML del componente
  styleUrls: ['./app.component.css'], // Archivo de estilos CSS del componente
  providers: [] // Se pueden agregar proveedores de servicios aquí si es necesario
})
export class AppComponent {
  title = 'control-clientes'; // Propiedad para el título de la aplicación

  // Constructor del componente
  constructor() {
    // Aquí se pueden inicializar servicios o variables si es necesario
  }
}
