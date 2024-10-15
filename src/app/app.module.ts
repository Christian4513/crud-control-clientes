import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {environment} from '../environments/environment'
import { AngularFireModule } from '@angular/fire/compat';
import {FirestoreModule, FirestoreSettings} from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'control-clientes'),
    AngularFireAuthModule,
    FormsModule,
    FirestoreModule,
  ]
})
export class AppModule { }
