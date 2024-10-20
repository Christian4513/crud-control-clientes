// Importa decoradores y funciones necesarias de Angular
import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild

} from '@angular/core'; // Importa el decorador Component y las interfaces OnInit e inject
import { FormsModule, NgForm } from '@angular/forms'; // Importa el módulo de formularios de Angular
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
import { NumerosService } from '../../servicios/numeros.service';

import { NgxPaginationModule } from 'ngx-pagination';

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
    NgxPaginationModule,
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

  // Cambiamos el nombre de la variable a listaClientes
  page: number = 1; // Página actual
  pageSize: number = 5; // Cantidad de elementos por página

  searchText: string = '';

  @ViewChild('clienteForm') clienteForm!: NgForm;
  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  // Inyecciónes de servicios
  toastSvc = inject(ToastrService); // Inyección del servicio ToastrService para mostrar notificaciones
  clientesServicio = inject(ClienteServicio);
  numeros = inject(NumerosService);


  constructor() {}

  ngOnInit() {
    // Método del ciclo de vida que se ejecuta al inicializar el componente
    this.clientesServicio.getClientes().subscribe((clientes) => {
      // Suscribe a los cambios en la colección de clientes desde el servicio
      this.clientes = clientes; // Asigna la lista de clientes recibida
    });
  }

  getSaldoTotal(): string {
    // Método que calcula el saldo total de todos los clientes
    let saldoTotal: number = 0; // Inicializa el saldo total en 0
    if (this.clientes) {
      // Verifica si la lista de clientes no está vacía
      this.clientes.forEach((cliente) => {
        // Recorre cada cliente en la lista
        saldoTotal += cliente.saldo; // Suma el saldo del cliente actual
      });
    }
    return this.formatSaldo(saldoTotal); // Retorna el saldo total formateado
  }

  // no se actualiza la tabla, tengo que ver por que no se actualiza.
  agregar(clienteForm: { value: Cliente; valid: boolean | null }) {
    if (clienteForm.valid) {
      this.toastSvc.success('Cliente agregado correctamente.', 'Éxito', {
        timeOut: 3000,
      });
      this.clientesServicio.agregarCliente(clienteForm.value);
      this.clienteForm.resetForm();
      this.cerrarModal();
    } else {
      this.toastSvc.error('Por favor, completa todos los campos requeridos.', 'Formulario incompleto', {
        timeOut: 3000,
      });
    }
  }

  soloNumeros(event: KeyboardEvent) {
    this.numeros.soloNumeros(event);
  }

  cerrarModal() {
    this.botonCerrar.nativeElement.click();
  }

  // Método para obtener clientes filtrados
  get filteredClientes() {
    // Si no hay texto de búsqueda, retornar todos los clientes
    if (!this.searchText) {
      return this.clientes;
    }

    // Filtrar clientes que coincidan con el texto de búsqueda
    return this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(this.searchText.toLowerCase()) ||
      cliente.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      cliente.saldo.toString().includes(this.searchText)
    );
  }

  formatSaldo(saldo: number): string {
    if (typeof saldo !== 'number') {
        return '0 CLP'; // Manejo de caso no válido
    }

    const millones = saldo / 1_000_000; // Convierte el saldo a millones
    if (millones >= 1) {
        return `${millones.toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`; // Formato en millones con separación de miles
    }

    return `${saldo.toLocaleString('es-CL')} CLP`; // Formato normal
}

}

