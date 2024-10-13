import { Component } from '@angular/core';
import { ClientesComponent } from "../clientes/clientes.component";
import { CabeceroComponent } from "../cabecero/cabecero.component";

@Component({
  selector: 'app-tablero',
  standalone: true,
  imports: [ClientesComponent, CabeceroComponent],
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})
export class TableroComponent {

}
