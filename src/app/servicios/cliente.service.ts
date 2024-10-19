import { Injectable } from '@angular/core'; // Importa el decorador Injectable para permitir la inyección de dependencias
import {
  AngularFirestore, // Importa el módulo AngularFirestore para interactuar con Firestore
  AngularFirestoreCollection, // Importa AngularFirestoreCollection para manejar colecciones en Firestore
  AngularFirestoreDocument, // Importa AngularFirestoreDocument para manejar documentos en Firestore
} from '@angular/fire/compat/firestore'; // Importa compatibilidad con Firestore
import { Cliente } from '../modelo/cliente.model'; // Importa la interfaz o clase Cliente que representa un cliente
import { map, Observable } from 'rxjs'; // Importa operadores de RxJS y la clase Observable

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class ClienteServicio {
  clientesColeccion!: AngularFirestoreCollection<Cliente>; // Colección de clientes en Firestore
  clienteDoc!: AngularFirestoreDocument<Cliente>; // Documento de un cliente específico
  clientes!: Observable<Cliente[]>; // Observable que contendrá la lista de clientes
  cliente!: Observable<Cliente>; // Observable que contendrá un cliente específico

  constructor(private db: AngularFirestore) {
    // Constructor que inyecta AngularFirestore
    this.clientesColeccion = db.collection(
      'clientes',
      (
        ref // Inicializa la colección de clientes y ordena por nombre
      ) => ref.orderBy('nombre', 'asc')
    );
  }

  getClientes(): Observable<Cliente[]> {
    // Método para obtener la lista de clientes
    this.clientes = this.clientesColeccion.snapshotChanges().pipe(
      // Obtiene los cambios en la colección de clientes
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

  agregarCliente(cliente: Cliente) {
    this.clientesColeccion.add(cliente);
  }

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

    return this.cliente;
  }

  modificarCliente(cliente: Cliente) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  eliminarCliente(cliente: Cliente): Promise<void> {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    return this.clienteDoc.delete();
  }
}
