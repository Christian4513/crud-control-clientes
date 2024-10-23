import { Component, inject, OnInit } from '@angular/core';
import { Cliente } from '../../modelo/cliente.model';
import { ToastrService } from 'ngx-toastr';
import { ClienteServicio } from '../../servicios/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumerosService } from '../../servicios/numeros.service';
import Swal from 'sweetalert2';
import { NotificationService } from '../../servicios/notification.service';

@Component({
  selector: 'app-editar-cliente', // Define el selector del componente
  standalone: true, // Indica que el componente es independiente
  imports: [FormsModule, CommonModule, RouterModule], // Módulos necesarios
  templateUrl: './editar-cliente.component.html', // Ruta de la plantilla HTML
  styleUrl: './editar-cliente.component.css', // Ruta de los estilos CSS
})
export class EditarClienteComponent implements OnInit {
  cliente: Cliente = { // Inicializa el objeto cliente
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  // Inyecciones de servicios
  toastSvc = inject(ToastrService); // Servicio de Toastr
  clientesServicio = inject(ClienteServicio); // Servicio de Cliente
  router = inject(Router); // Servicio de Router
  route = inject(ActivatedRoute); // ActivatedRoute para los parámetros de ruta
  numeros = inject(NumerosService); // Servicio para validaciones numéricas
  notification = inject(NotificationService); // Servicio de Notificaciones
  id!: string; // ID del cliente

  ngOnInit() { // Inicializa el componente
    this.id = this.route.snapshot.params['id']; // Obtiene el ID de la URL
    this.clientesServicio.getCliente(this.id).subscribe((cliente) => {
      this.cliente = cliente; // Asigna el cliente al objeto cliente
    });
  }

  soloNumeros(event: KeyboardEvent) { // Permite solo números
    this.numeros.soloNumeros(event); // Valida solo números
  }

  guardar(clienteForm: NgForm) { // Guarda los cambios
    if (clienteForm.valid) { // Valida el formulario
      this.notification.showSuccess('Datos editados correctamente.', 'Éxito'); // Muestra éxito
      clienteForm.value.id = this.id; // Asigna el ID al formulario
      this.clientesServicio.modificarCliente(clienteForm.value); // Modifica el cliente
      this.router.navigate(['/']); // Redirecciona a la principal
    } else {
      this.notification.showError('Por favor, completa todos los campos requeridos.', 'Formulario incompleto'); // Muestra error
    }
  }

  eliminar() { // Elimina el cliente
    Swal.fire({
      title: '¿Estás seguro?', // Título de la alerta
      text: '¡No podrás revertir esto!', // Texto de advertencia
      icon: 'warning', // Ícono de advertencia
      showCancelButton: true, // Muestra botón de cancelar
      confirmButtonText: 'Sí, eliminar', // Texto del botón confirmar
      cancelButtonText: 'Cancelar', // Texto del botón cancelar
      reverseButtons: true, // Invierte los botones
    }).then((result) => {
      if (result.isConfirmed) { // Si se confirma
        this.clientesServicio.eliminarCliente(this.cliente).then(() => {
          this.notification.showSuccess('Cliente eliminado correctamente.', 'Éxito'); // Muestra éxito
          this.router.navigate(['/']); // Redirecciona a la principal
        }).catch((error: any) => {
          this.notification.showError('No se pudo eliminar el cliente.', 'Error'); // Muestra error
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.notification.showWarning('Eliminación cancelada.', 'Cancelado'); // Muestra cancelación
      }
    });
  }
}
