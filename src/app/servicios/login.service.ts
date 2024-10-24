import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Define un servicio global disponible en la aplicación
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  // Inyecta el servicio de autenticación de Firebase
  authService = inject(AngularFireAuth);
  // Inyecta el servicio de notificaciones Toastr
  toastSvc = inject(ToastrService);
  // Inyecta el servicio de Firestore
  db = inject(AngularFirestore);

  // Método para iniciar sesión con correo electrónico y contraseña
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password)
        .then((datos) => resolve(datos)) // Resuelve la promesa si el inicio de sesión es exitoso
        .catch((error) => reject(error)); // Rechaza la promesa si hay un error
    });
  }

  // Obtiene el estado de autenticación del usuario
  getAuth() {
    return this.authService.authState; // Devuelve un observable con el estado de autenticación
  }

  // Método para cerrar sesión
  logout() {
    this.authService.signOut()
      .then(() => {
        // Muestra una notificación de éxito al cerrar sesión
        this.toastSvc.success('Sesión cerrada exitosamente.', 'Cierre de sesión', { timeOut: 3000 });
      })
      .catch(error => {
        // Muestra una notificación de error si ocurre un problema
        this.toastSvc.error('Error al cerrar sesión.', 'Error de autenticación', { timeOut: 3000 });
      });
  }

  // Verifica si el usuario está autenticado
  async isLoggedIn(): Promise<boolean> {
    const user = await this.authService.currentUser;
    return !!user; // Retorna true si el usuario está autenticado, false en caso contrario
  }

  // Método para registrar un nuevo usuario con correo y contraseña
  registrarse(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password)
        .then(datos => resolve(datos)) // Resuelve la promesa si el registro es exitoso
        .catch(error => reject(error)); // Rechaza la promesa si hay un error
    });
  }

  // Método para verificar si el usuario es administrador
  async isAdmin(userEmail: string): Promise<boolean> {
    const adminEmail = 'christian.fuenteszelada@gmail.com'; // Correo del administrador
    return userEmail === adminEmail; // Retorna true si el correo del usuario coincide con el del administrador
  }
}


