import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  authService = inject(AngularFireAuth);
  toastSvc = inject(ToastrService)

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService
        .signInWithEmailAndPassword(email, password)
        .then((datos) => resolve(datos))
        .catch((error) => reject(error));
    });
  }

  getAuth(){
    return this.authService.authState.pipe(
      map(auth => auth)
    );
  }

  logout() {
    this.authService.signOut()
      .then(() => {
        this.toastSvc.success('Sesión cerrada exitosamente.', 'Cierre de sesión', {
          timeOut: 3000,
        });
      })
      .catch(error => {
        this.toastSvc.error('Error al iniciar sesión. Verifica tus credenciales.', 'Error de autenticación', {
          timeOut: 3000,
        });
      });
  }

  async isLoggedIn(): Promise<boolean> {
    const token = localStorage.getItem('userToken');  // Ejemplo usando un token guardado
    return !!token;  // Retorna true si existe un token, false si no
  }
}
