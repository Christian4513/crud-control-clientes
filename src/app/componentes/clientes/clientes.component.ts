// Importa decoradores y funciones necesarias de Angular
import { Component, inject, OnInit } from '@angular/core'; // Importa el decorador Component y las interfaces OnInit e inject
import { FormsModule } from '@angular/forms'; // Importa el módulo de formularios de Angular
import { CommonModule } from '@angular/common'; // Importa el módulo común de Angular

// Importa el servicio de clientes que maneja la lógica de negocio
import { ClienteServicio } from '../../servicios/cliente.service'; // Importa el servicio ClienteServicio
// Importa módulos de AngularFire para la integración con Firebase
import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFireModule
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importa AngularFirestoreModule
// Importa la interfaz Cliente
import { Cliente } from '../../modelo/cliente.model'; // Importa la interfaz Cliente
// Importa el módulo de enrutamiento de Angular
import { RouterModule } from '@angular/router'; // Importa RouterModule
// Importa el servicio de toastr para mostrar notificaciones
import { ToastrService } from 'ngx-toastr'; // Importa ToastrService

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [
    // Importa módulos necesarios para este componente
    FormsModule,
    CommonModule,
    AngularFireModule,
    AngularFirestoreModule,
    RouterModule,
  ],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
  providers: [ClienteServicio], // Provee el servicio ClienteServicio a este componente
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = []; // Arreglo que contendrá la lista de clientes
  cliente: Cliente = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  // Inyecciónes de servicios
  toastSvc = inject(ToastrService); // Inyección del servicio ToastrService para mostrar notificaciones
  clientesServicio = inject(ClienteServicio);
saldo: any;

  constructor() {}

  ngOnInit() {
    // Método del ciclo de vida que se ejecuta al inicializar el componente
    this.clientesServicio.getClientes().subscribe((clientes) => {
      // Suscribe a los cambios en la colección de clientes desde el servicio
      this.clientes = clientes; // Asigna la lista de clientes recibida
    });
  }

  getSaldoTotal() {
    // Método que calcula el saldo total de todos los clientes
    let saldoTotal: number = 0; // Inicializa el saldo total en 0
    if (this.clientes) {
      // Verifica si la lista de clientes no está vacía
      this.clientes.forEach((cliente) => {
        // Recorre cada cliente en la lista
        saldoTotal += cliente.saldo; // Suma el saldo del cliente actual
      });
    }
    return saldoTotal; // Retorna el saldo total calculado
  }

  agregar(clienteForm: { value: Cliente; valid: boolean | null }) {
    if (!clienteForm.valid) {
      this.toastSvc.error(
        'Por favor llenar el formulario correctamente',
        'Error de validación',
        {
          timeOut: 4000,
          positionClass: 'toast-top-right',
        }
      );
    } else {
      //Se agregara despues, voy en video 15
    }
  }

  soloNumeros(event: KeyboardEvent) {
    const key = event.key;
    if (!/^[0-9]$/.test(key)) { // Solo permite números entre 0 y 9
      event.preventDefault();
    }
  }
  

}
