import { Component } from '@angular/core';
import { ClientesComponent } from "../clientes/clientes.component";
import { CabeceroComponent } from "../cabecero/cabecero.component";

// Decorador que define un componente Angular
@Component({
  selector: 'app-tablero', // Selector del componente en la plantilla HTML
  standalone: true, // Indica que es un componente independiente
  imports: [ClientesComponent, CabeceroComponent], // Importa los componentes necesarios
  templateUrl: './tablero.component.html', // Ruta del archivo de plantilla HTML del componente
  styleUrls: ['./tablero.component.css'] // Ruta del archivo de estilos CSS del componente
})
// Clase del componente Tablero
export class TableroComponent {}

