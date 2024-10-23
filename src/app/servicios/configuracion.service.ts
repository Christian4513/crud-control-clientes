import { inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Configuracion } from '../modelo/configuracion.model';
import { map, Observable } from 'rxjs';

// Define un servicio global disponible en la aplicación
@Injectable({
  providedIn: 'root',
})
export class ConfiguracionServicio {
  // Documento de configuración de Firestore
  configuracionDoc!: AngularFirestoreDocument<Configuracion>;
  // Observable de configuración
  configuracion!: Observable<Configuracion>;
  // ID de la configuración
  id = 1;
  // Inyecta el servicio de Firestore
  db = inject(AngularFirestore);

  // Constructor de la clase; actualmente no realiza ninguna acción
  constructor() {}

  // Obtiene la configuración desde Firestore
  getConfiguracion(): Observable<Configuracion> {
    // Referencia al documento de configuración en Firestore
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    // Obtiene el observable de configuración y mapea los datos
    this.configuracion = this.configuracionDoc.valueChanges().pipe(
      map(config => config || { /* valores predeterminados de Configuracion */ })
    );
    return this.configuracion; // Retorna el observable de configuración
  }

  // Modifica la configuración en Firestore
  modificarConfiguracion(configuracion: Configuracion) {
    // Referencia al documento de configuración en Firestore
    this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
    // Actualiza el documento con la nueva configuración
    this.configuracionDoc.update(configuracion);
  }
}
