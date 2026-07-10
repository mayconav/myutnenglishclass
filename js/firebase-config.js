/* ==========================================================================
   CONFIGURACIÓN DE FIREBASE — MyUTNEnglishClass
   ==========================================================================
   1. Ve a https://console.firebase.google.com, crea un proyecto (gratis).
   2. Activa "Authentication" → método "Correo electrónico/contraseña".
   3. Crea la base de datos "Firestore Database".
   4. En "Configuración del proyecto" → "Tus apps" → agrega una app Web y
      copia aquí el objeto de configuración que te da Firebase.
   5. Cambia ADMIN_EMAIL por el correo del profesor (el único administrador).
      Ese usuario debes crearlo tú mismo, a mano, desde Firebase Console
      (Authentication → Users → Add user). NO se crea desde un formulario
      público, precisamente para que sea el único admin.
   6. Ajusta ALLOWED_EMAIL_DOMAIN si quieres exigir un dominio institucional
      específico para el correo de los estudiantes (ej. "@alumno.utn...mx").
      Déjalo como cadena vacía "" si no quieres restringir el dominio.
   Ver SETUP.md para la guía completa paso a paso.
   ========================================================================== */

var firebaseConfig = {
  apiKey: "AIzaSyBDzm1oEEnfkUYGdpnrtqq7MN96ROad_jU",
  authDomain: "myutn-english-class.firebaseapp.com",
  projectId: "myutn-english-class",
  storageBucket: "myutn-english-class.firebasestorage.app",
  messagingSenderId: "737128072139",
  appId: "1:737128072139:web:151ac059982d67d9406c4e"
};

/* Correo del profesor de inglés: único administrador del sistema. */
var ADMIN_EMAIL = "maap044@gmail.com";

/* Dominio institucional obligatorio para el registro de estudiantes.
   Ejemplo: "utn-ejemplo.edu.mx" exige correos que terminen en ese dominio.
   Déjalo vacío ("") para aceptar cualquier correo válido. */
var ALLOWED_EMAIL_DOMAIN = "";

firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
var db = firebase.firestore();

/* Si el profesor todavía no pegó sus valores reales de Firebase, lo detectamos
   para mostrar un aviso claro en vez de un error críptico de Firebase. */
window.__UTN_FIREBASE_READY__ = firebaseConfig.apiKey !== "TU_API_KEY" &&
  firebaseConfig.projectId !== "TU_PROYECTO";

