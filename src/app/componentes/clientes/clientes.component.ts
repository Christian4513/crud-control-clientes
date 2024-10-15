import { Component, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';

import { ClienteServicio } from '../../servicios/cliente.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { Cliente } from '../../modelo/cliente.model';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormsModule, CommonModule, AngularFireModule, AngularFirestoreModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  providers: [ClienteServicio]
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];

  constructor(private clientesServicio: ClienteServicio){}

  ngOnInit() {
    this.clientesServicio.getClientes().subscribe(
      clientes => {
        this.clientes = clientes;
      }
    )
  }

}



