# crud-control-clientes
Crud realizado en Angular con conexión a la base de datos Firebase.

# ControlClientes

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.8.

## Descripción

ControlClientes es una aplicación web para la gestión de clientes, que permite registrar información basica de clientes la cual se puede consultar posteriormente, filtrar para encontrar informacion puntual, editar y eliminar. Esta aplicación utiliza Angular 18, Firebase para autenticación, Firestore para almacenamiento de datos, ngx-toastr para notificaciones y otras librerias que aportar pequeñas funcionalidades.

## Características

- **Gestión de Clientes**: Añadir, editar y eliminar clientes.
- **Autenticación de Usuarios**: Inicio de sesión y registro seguro usando Firebase Authentication.
- **Acceso Basado en Roles**: Solo los administradores pueden acceder y modificar configuraciones, pero en si todos pueden añadir, ediatr y eliminar clientes.
- **Datos en Tiempo Real**: Utiliza Firestore para almacenar y recuperar datos de clientes en tiempo real.
- **Notificaciones**: Notificaciones integradas usando ngx-toastr.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado Node.js y Angular CLI en tu sistema.

1. **Node.js**: Puedes descargar e instalar Node.js desde [aquí](https://nodejs.org/).
2. **Angular CLI**: Instálalo globalmente utilizando npm:

   ```bash
   npm install -g @angular/cli
   ```

## Configuración y Despliegue

Para configurar y desplegar la aplicación, sigue estos pasos:

### Clonar el repositorio:
```bash
git clone https://github.com/tu-repo/ControlClientes.git
cd ControlClientes
```

### Instalar dependencias:
```bash
npm install
```

### Configurar Firebase:
Crea un proyecto de Firebase en Firebase Console. Añade tu configuración de Firebase a `src/environments/environment.ts`. Debe verse algo así:

```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```

### Ejecutar la aplicación:
```bash
ng serve
```

### Abrir en el navegador:
Abre tu navegador y navega a [http://localhost:4200/](http://localhost:4200/).

## Servidor de Desarrollo
Ejecuta `ng serve` para un servidor de desarrollo. Navega a [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará automáticamente si cambias cualquier archivo fuente.

## Generar Código
Ejecuta `ng generate component nombre-del-componente` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción
Ejecuta `ng build` para construir el proyecto. Los artefactos de construcción serán almacenados en el directorio `dist/`.

## Ayuda Adicional
Para obtener más ayuda sobre Angular CLI, usa `ng help` o visita la página de Angular CLI para ver la descripción general y referencia de comandos.

## Licencia
Este proyecto no tiene una licencia formal. Si deseas utilizar el código para fines educativos o comerciales, lo puedes realizar. 


