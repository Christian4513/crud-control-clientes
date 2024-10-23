// Importa decoradores y funciones necesarias de Angular
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Importa el servicio de clientes que maneja la lógica de negocio
import { ClienteServicio } from '../../servicios/cliente.service';

// Importa módulos de AngularFire para la integración con Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// Importa la interfaz Cliente
import { Cliente } from '../../modelo/cliente.model';

// Importa el módulo de enrutamiento de Angular
import { RouterModule } from '@angular/router';

// Importa el servicio de notificaciones
import { NumerosService } from '../../servicios/numeros.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationService } from '../../servicios/notification.service';

// Define el decorador del componente
@Component({
  selector: 'app-clientes', // Selector del componente
  standalone: true, // Indica que es un componente independiente
  imports: [
    // Importa módulos necesarios para este componente
    FormsModule,
    CommonModule,
    AngularFireModule,
    AngularFirestoreModule,
    RouterModule,
    NgxPaginationModule,
  ],
  templateUrl: './clientes.component.html', // Ruta de la plantilla HTML
  styleUrls: ['./clientes.component.css'], // Ruta del archivo CSS
  providers: [ClienteServicio], // Provee el servicio ClienteServicio a este componente
})
export class ClientesComponent implements OnInit {
  // Declaración de variables
  clientes: Cliente[] = []; // Arreglo que contendrá la lista de clientes
  cliente: Cliente = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };
  page: number = 1; // Página actual para la paginación
  pageSize: number = 5; // Cantidad de elementos por página para la paginación
  searchText: string = ''; // Texto para búsqueda

  // ViewChild para acceder a elementos del DOM
  @ViewChild('clienteForm') clienteForm!: NgForm;
  @ViewChild('botonCerrar') botonCerrar!: ElementRef;

  // Inyección de servicios
  notification = inject(NotificationService);
  clientesServicio = inject(ClienteServicio);
  numeros = inject(NumerosService);

  constructor() {}

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit() {
    this.clientesServicio.getClientes().subscribe((clientes) => {
      this.clientes = clientes; // Asigna la lista de clientes recibida
    });
  }

  // Método que calcula el saldo total de todos los clientes
  getSaldoTotal(): string {
    let saldoTotal: number = 0; // Inicializa el saldo total en 0
    if (this.clientes) {
      this.clientes.forEach((cliente) => {
        saldoTotal += cliente.saldo; // Suma el saldo de cada cliente
      });
    }
    return this.formatSaldo(saldoTotal); // Retorna el saldo total formateado
  }

  // Método para agregar un nuevo cliente
  agregar(clienteForm: { value: Cliente; valid: boolean | null }) {
    if (clienteForm.valid) {
      this.notification.showSuccess('Cliente agregado correctamente.', 'Éxito'); // Muestra notificación de éxito
      this.clientesServicio.agregarCliente(clienteForm.value); // Llama al servicio para agregar el cliente
      this.clienteForm.resetForm(); // Resetea el formulario
      this.cerrarModal(); // Cierra el modal
    } else {
      this.notification.showError('Por favor, completa todos los campos requeridos.', 'Formulario incompleto'); // Muestra notificación de error
    }
  }

  // Método para permitir solo la entrada de números
  soloNumeros(event: KeyboardEvent) {
    this.numeros.soloNumeros(event); // Llama al servicio para validar solo números
  }

  // Método para cerrar el modal
  cerrarModal() {
    this.botonCerrar.nativeElement.click(); // Cierra el modal
  }

  // Método para obtener clientes filtrados
  get filteredClientes() {
    if (!this.searchText) {
      return this.clientes; // Retorna todos los clientes si no hay texto de búsqueda
    }
    // Filtra clientes que coincidan con el texto de búsqueda
    return this.clientes.filter(cliente =>
      cliente.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      cliente.apellido.toLowerCase().includes(this.searchText.toLowerCase()) ||
      cliente.email.toLowerCase().includes(this.searchText.toLowerCase()) ||
      cliente.saldo.toString().includes(this.searchText)
    );
  }

  // Método para formatear el saldo
  formatSaldo(saldo: number): string {
    if (typeof saldo !== 'number') {
      return '0 CLP'; // Maneja el caso de saldo no válido
    }
    const millones = saldo / 1_000_000; // Convierte el saldo a millones
    if (millones >= 1) {
      return `${millones.toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} M`; // Formato en millones
    }
    return `${saldo.toLocaleString('es-CL')} CLP`; // Formato normal
  }
}


