import { Routes } from '@angular/router';
// Importa la interfaz Routes para definir las rutas de la aplicación

import { TableroComponent } from './componentes/tablero/tablero.component';
// Importa el componente del tablero

import { LoginComponent } from './componentes/login/login.component';
// Importa el componente de inicio de sesión

import { RegistroComponent } from './componentes/registro/registro.component';
// Importa el componente de registro

import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
// Importa el componente de configuración

import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
// Importa el componente para editar clientes

import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
// Importa el componente para manejar rutas no encontradas

import { authGuard } from './guardianes/auth.guard';
// Importa el guardián de autenticación

import { configuracionGuard } from './guardianes/configuracion.guard';
// Importa el guardián de configuración

// Define las rutas de la aplicación
export const routes: Routes = [
  {
    path: '',
    component: TableroComponent,
    canActivate: [authGuard]
  },
  // Ruta por defecto que muestra el TableroComponent

  {
    path: 'login',
    component: LoginComponent
  },
  // Ruta para iniciar sesión que muestra el LoginComponent

  {
    path: 'registrarse',
    component: RegistroComponent,
    canActivate: [configuracionGuard]
  },
  // Ruta para registrarse que muestra el RegistroComponent

  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    canActivate: [authGuard]
  },
  // Ruta para la configuración que muestra el ConfiguracionComponent

  {
    path: 'cliente/editar/:id',
    component: EditarClienteComponent,
    canActivate: [authGuard]
  },
  // Ruta para editar un cliente, con un parámetro de ruta para el ID del cliente

  {
    path: '**',
    component: NoEncontradoComponent
  }
  // Ruta wildcard que muestra el NoEncontradoComponent para cualquier ruta no definida
];

