import { Component, inject, OnInit } from '@angular/core';
import { Cliente } from '../../modelo/cliente.model'; // Importa la interfaz Cliente que define la estructura de los datos del cliente.
import { ToastrService } from 'ngx-toastr'; // Servicio para mostrar notificaciones al usuario.
import { ClienteServicio } from '../../servicios/cliente.service'; // Servicio que maneja las operaciones CRUD de clientes.
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Rutas y navegación en la aplicación Angular.
import { FormsModule, NgForm } from '@angular/forms'; // Manejo de formularios y validaciones.
import { CommonModule } from '@angular/common'; // Módulo básico de Angular con directivas comunes como *ngIf y *ngFor.
import { NumerosService } from '../../servicios/numeros.service'; // Servicio personalizado que puede tener lógica relacionada con el manejo de números (validaciones).
import Swal from 'sweetalert2'; // Biblioteca externa para mostrar alertas personalizadas.
import { NotificationService } from '../../servicios/notification.service';

@Component({
  selector: 'app-editar-cliente', // Selector del componente para su uso en la aplicación.
  standalone: true, // Indica que el componente no depende de un módulo específico, usando componentes standalone.
  imports: [FormsModule, CommonModule, RouterModule], // Importación de módulos necesarios para formularios, navegación y funcionalidades comunes.
  templateUrl: './editar-cliente.component.html', // Archivo HTML que define la estructura visual del componente.
  styleUrl: './editar-cliente.component.css', // Archivo CSS para los estilos visuales del componente.
})
export class EditarClienteComponent implements OnInit {
  // Definición del objeto cliente que contiene la estructura de datos a manejar.
  cliente: Cliente = {
    id: '',
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0,
  };

  // Inyecciones de servicios utilizados en el componente.
  toastSvc = inject(ToastrService); // Servicio de Toastr para mostrar notificaciones en pantalla (éxito/error).
  clientesServicio = inject(ClienteServicio); // Servicio de Cliente para realizar operaciones CRUD.
  router = inject(Router); // Servicio de Router para manejar la navegación entre componentes.
  route = inject(ActivatedRoute); // ActivatedRoute permite acceder a parámetros de la ruta activa.
  numeros = inject(NumerosService); // Servicio personalizado para lógica relacionada con números.
  notification = inject(NotificationService);

  id!: string; // Almacena el ID del cliente obtenido desde la URL.

  // Hook de inicialización del componente. Se ejecuta cuando el componente es cargado.
  ngOnInit() {
    // Obtener el parámetro 'id' de la URL y buscar el cliente en la base de datos.
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe((cliente) => {
      this.cliente = cliente; // Asignar el cliente recuperado al objeto cliente del componente.
    });
  }

  // Método para permitir solo la entrada de números en campos específicos (llamado desde el template).
  soloNumeros(event: KeyboardEvent) {
    this.numeros.soloNumeros(event); // Llama al servicio que contiene la lógica para validar solo números.
  }

  // Método para guardar los cambios en el formulario de cliente.
  guardar(clienteForm: NgForm) {
    // Validación: Si el formulario no es válido, muestra una notificación de error.
    if (clienteForm.valid) {
      this.notification.showSuccess('Datos editados correctamente.', 'Éxito');
      clienteForm.value.id = this.id; // Asignar el ID del cliente al valor del formulario.
      // Llamar al servicio para modificar el cliente y navegar de vuelta a la página principal.
      this.clientesServicio.modificarCliente(clienteForm.value);
      this.router.navigate(['/']); // Redireccionar a la ruta principal.
    } else {
      this.notification.showError('Por favor, completa todos los campos requeridos.', 'Formulario incompleto');
    }
  }

  // Método para eliminar un cliente utilizando SweetAlert para confirmar la acción.
  eliminar() {
    Swal.fire({
      title: '¿Estás seguro?', // Mensaje de confirmación.
      text: '¡No podrás revertir esto!', // Advertencia para el usuario.
      icon: 'warning', // Ícono de advertencia.
      showCancelButton: true, // Mostrar el botón de cancelación.
      confirmButtonText: 'Sí, eliminar', // Texto del botón de confirmación.
      cancelButtonText: 'Cancelar', // Texto del botón de cancelación.
      reverseButtons: true, // Invertir el orden de los botones.
    }).then((result) => {
      if (result.isConfirmed) {
        // Si se confirma, llamar al servicio para eliminar el cliente.
        this.clientesServicio
          .eliminarCliente(this.cliente)
          .then(() => {
            this.notification.showSuccess('Cliente eliminado correctamente.', 'Éxito');
            this.router.navigate(['/']); // Redireccionar a la ruta principal.
          })
          .catch((error: any) => {
            this.notification.showError('No se pudo eliminar el cliente.', 'error');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.notification.showWarning('Eliminación cancelada.', 'Éxito');
      }
    });
  }
}
