import { Component, inject, OnInit } from '@angular/core';
import { Cliente } from '../../modelo/cliente.model';
import { ToastrService } from 'ngx-toastr';
import { ClienteServicio } from '../../servicios/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumerosService } from '../../servicios/numeros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css',
})
export class EditarClienteComponent implements OnInit {
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
  router = inject(Router);
  route = inject(ActivatedRoute);
  toastr = inject(ToastrService); // Inyección del servicio ToastrService para mostrar notificaciones
  numeros = inject(NumerosService);

  id!: string;

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  soloNumeros(event: KeyboardEvent) {
    this.numeros.soloNumeros(event);
  }

  guardar(clienteForm: NgForm) {
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
      clienteForm.value.id = this.id;

      this.clientesServicio.modificarCliente(clienteForm.value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesServicio
          .eliminarCliente(this.cliente)
          .then(() => {
            console.log('Cliente eliminado');
          })
          .catch((error: any) => {
            console.error('Error al eliminar el cliente:', error);
            Swal.fire('Error', 'No se pudo eliminar el cliente.', 'error');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('Eliminación cancelada');
      }
    });
  }
}
