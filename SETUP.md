# Configurar registro de estudiantes y acceso del profesor (Firebase)

La app ahora tiene:
- **Registro / inicio de sesión para estudiantes** (correo institucional, boleta, contraseña).
- **Un único administrador**: el profesor de inglés, identificado por su correo. Su cuenta
  NO se crea desde un formulario público — la creas tú mismo en Firebase, a propósito, para
  que nunca pueda haber un segundo "administrador" por accidente.
- Los datos (estudiantes y su progreso) viven en **Firestore**, así que son accesibles desde
  cualquier dispositivo, no solo desde esta computadora.

Esto requiere un proyecto gratuito de Firebase (Google). Son ~15 minutos, una sola vez.

## 1. Crear el proyecto de Firebase
1. Ve a https://console.firebase.google.com y entra con una cuenta de Google.
2. "Crear un proyecto" → dale un nombre (ej. `myutn-english-class`) → puedes desactivar
   Google Analytics, no lo necesitas → "Crear proyecto".

## 2. Activar autenticación por correo/contraseña
1. En el menú lateral: **Compilación → Authentication** → "Comenzar".
2. Pestaña "Sign-in method" (Método de inicio de sesión) → habilita **"Correo electrónico/contraseña"**.

## 3. Crear la cuenta del profesor (el único administrador)
1. En Authentication → pestaña **"Users"** → **"Add user"**.
2. Escribe el correo del profesor (ej. `profesor@utn-...edu.mx`) y una contraseña.
3. Guarda ese correo y contraseña — son las credenciales del panel de administrador.
   Nadie puede crear otra cuenta de administrador desde la app; solo tú, aquí.

## 4. Crear la base de datos Firestore
1. Menú lateral: **Compilación → Firestore Database** → "Crear base de datos".
2. Elige una ubicación cercana (ej. `us-central` o `nam5`) → modo **producción**.
3. Ve a la pestaña **"Reglas"** (Rules) y reemplaza todo el contenido por el archivo
   `firestore.rules` incluido en este proyecto. **Antes de publicar**, sustituye
   `PROFESOR_EMAIL_AQUI` por el correo exacto del profesor (el mismo del paso 3),
   en las 3 líneas donde aparece. Luego "Publicar".

## 5. Conectar la app con tu proyecto
1. En Firebase Console: ⚙️ **Configuración del proyecto** → pestaña "General" →
   sección "Tus apps" → ícono **`</>`** (Web) → dale un apodo → "Registrar app".
2. Copia el objeto `firebaseConfig` que te muestra (apiKey, authDomain, etc.).
3. Abre `js/firebase-config.js` en este proyecto y pega esos valores en `firebaseConfig`.
4. En el mismo archivo, cambia:
   - `ADMIN_EMAIL` → el correo del profesor (igual que en el paso 3 y en las reglas).
   - `ALLOWED_EMAIL_DOMAIN` → si quieres exigir un dominio institucional para el
     registro de estudiantes (ej. `"utn-...edu.mx"`), o déjalo como `""` para no restringir.

## 6. Probar localmente
Firebase Authentication no funciona bien abriendo el `index.html` directamente
(`file://...`) en algunos navegadores. Sirve la carpeta con un servidor simple:

```bash
# Con Python (ya viene instalado en la mayoría de sistemas)
python -m http.server 8000
# o con Node
npx serve .
```

Y abre `http://localhost:8000` en el navegador.

## 7. Publicar para que los estudiantes accedan desde sus dispositivos
Para que cualquier estudiante entre desde su celular o computadora, necesitas una URL
pública. La forma más simple, ya que usas Firebase, es **Firebase Hosting** (gratis):

```bash
npm install -g firebase-tools
firebase login
firebase init hosting   # elige "Use an existing project" → tu proyecto
                         # public directory: escribe "."
                         # configure as single-page app: No
                         # no sobrescribas index.html
firebase deploy
```

Al terminar te da una URL tipo `https://tu-proyecto.web.app` — esa es la que compartes
con los estudiantes y con el profesor.

## Qué puede hacer el profesor (administrador)
Al iniciar sesión con el correo configurado en `ADMIN_EMAIL`, en vez de la app de
lecciones ve un **panel de administrador** con:
- Lista de todos los estudiantes registrados (nombre, correo, boleta, nivel, sellos, fecha).
- Buscador por nombre/correo/boleta.
- **Ver progreso** detallado de cualquier estudiante.
- **Editar** nombre y boleta de un estudiante.
- **Deshabilitar / habilitar** el acceso de un estudiante (bloquea su login sin borrar datos).
- **Eliminar** el registro de un estudiante (borra su progreso y le impide volver a entrar).

### Nota importante sobre "eliminar"
Por ser una app sin servidor propio (solo Firebase desde el navegador), eliminar un
estudiante borra su información y le bloquea el acceso a la app, pero técnicamente su
cuenta de inicio de sesión (Firebase Authentication) queda inactiva, no borrada del
todo — para un borrado 100% completo de la cuenta se necesitaría una función de servidor
(Cloud Function) adicional, que puedo agregar más adelante si te interesa.
