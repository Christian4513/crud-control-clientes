export const environment = {
  production: true, // Indica que la aplicación está en modo de producción (optimizada y lista para usuarios finales)

  // Configuración de Firebase para conectar la aplicación con los servicios de Firebase
  firebase: {
    apiKey: '', // Clave de API para autenticar las peticiones
    authDomain: '', // Dominio de autenticación de Firebase
    projectId: '', // ID del proyecto en Firebase
    storageBucket: '', // Ubicación del almacenamiento en Firebase
    messagingSenderId: '', // ID del remitente para servicios de mensajería
    appId: '', // ID único de la aplicación
    measurementId: '', // ID para las métricas de análisis (Google Analytics)
  }
};
