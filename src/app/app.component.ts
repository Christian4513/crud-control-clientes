// Importación de módulos y componentes necesarios
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceroComponent } from "./componentes/cabecero/cabecero.component";
import { PiePaginaComponent } from "./componentes/pie-pagina/pie-pagina.component";
import { ClientesComponent } from "./componentes/clientes/clientes.component";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceroComponent, PiePaginaComponent, ClientesComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'control-clientes';

  // Constructor del componente
  constructor() {

  }
}
