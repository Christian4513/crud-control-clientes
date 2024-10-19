import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo Angular
import { CommonModule } from '@angular/common'; // Importa CommonModule para utilizar funcionalidades comunes de Angular
import { environment } from '../environments/environment'; // Importa la configuración del entorno
import { AngularFireModule } from '@angular/fire/compat'; // Importa AngularFireModule para la integración de Firebase
import { FirestoreModule, FirestoreSettings } from '@angular/fire/firestore'; // Importa FirestoreModule para el uso de Firestore
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Importa AngularFireAuthModule para la autenticación con Firebase
import { FormsModule } from '@angular/forms'; // Importa FormsModule para gestionar formularios en Angular


@NgModule({
  declarations: [],
  imports: [
    CommonModule, // Importa el módulo común para utilizar funcionalidades básicas
    AngularFireModule.initializeApp(environment.firebaseConfig, 'control-clientes'), // Inicializa AngularFire con la configuración de Firebase y el nombre del proyecto
    AngularFireAuthModule, // Importa el módulo de autenticación de Firebase
    FormsModule, // Importa el módulo de formularios para el manejo de formularios reactivos y template-driven
    FirestoreModule, // Importa el módulo de Firestore para utilizar la base de datos de Firebase
  ]
})
export class AppModule { }
