import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Cliente } from '../modelo/cliente.model';
import { map, Observable } from 'rxjs';

// Define un servicio global disponible en toda la aplicación
@Injectable({
  providedIn: 'root',
})
export class ClienteServicio {
  // Colección de clientes en Firestore
  clientesColeccion!: AngularFirestoreCollection<Cliente>;
  // Documento de un cliente específico
  clienteDoc!: AngularFirestoreDocument<Cliente>;
  // Observable que contendrá la lista de clientes
  clientes!: Observable<Cliente[]>;
  // Observable que contendrá un cliente específico
  cliente!: Observable<Cliente>;

  // Constructor que inyecta el servicio AngularFirestore
  constructor(private db: AngularFirestore) {
    // Inicializa la colección de clientes y la ordena por nombre
    this.clientesColeccion = db.collection(
      'clientes',
      ref => ref.orderBy('nombre', 'asc')
    );
  }

  // Método para obtener la lista de clientes
  getClientes(): Observable<Cliente[]> {
    // Obtiene los cambios en la colección de clientes
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      map((cambios) => {
        return cambios.map((accion) => {
          const datos = accion.payload.doc.data() as Cliente; // Extrae los datos del documento como Cliente
          datos.id = accion.payload.doc.id; // Asigna el ID del documento al objeto cliente
          return datos; // Devuelve el cliente con su ID
        });
      })
    );
    return this.clientes; // Retorna el observable de clientes
  }

  // Método para agregar un nuevo cliente a la colección
  agregarCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }

  // Método para obtener un cliente específico por su ID
  getCliente(id: string) {
    this.clienteDoc = this.db.doc<Cliente>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map((accion) => {
        if (accion.payload.exists === false) {
          throw new Error('Cliente no encontrado'); // O devuelve un objeto vacío
        } else {
          const datos = accion.payload.data() as Cliente;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente; // Retorna el observable del cliente
  }

  // Método para modificar los datos de un cliente existente
  modificarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  // Método para eliminar un cliente de la colección
  eliminarCliente(cliente: Cliente): Promise<void> {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    return this.clienteDoc.delete();
  }
}
