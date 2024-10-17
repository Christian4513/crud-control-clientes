// Exporta la configuración del entorno para la aplicación
export const environment = {
  production: false, // Indica que la aplicación está en modo de desarrollo (no en producción)

  // Configuración de Firebase para conectar la aplicación con los servicios de Firebase
  firebaseConfig: {
    apiKey: 'AIzaSyAL4ksDaGLB4t5gQUTrlbZsL-x0D7vA9iM', // Clave de API para autenticar las peticiones
    authDomain: 'control-clientes-ad3f9.firebaseapp.com', // Dominio de autenticación de Firebase
    projectId: 'control-clientes-ad3f9', // ID del proyecto en Firebase
    storageBucket: 'control-clientes-ad3f9.appspot.com', // Ubicación del almacenamiento en Firebase
    messagingSenderId: '765217489309', // ID del remitente para servicios de mensajería
    appId: '1:765217489309:web:9cc305b5170daf654faf74', // ID único de la aplicación
    measurementId: 'G-N9JF7GGPY9', // ID para las métricas de análisis (Google Analytics)
  },
};

