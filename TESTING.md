# Pruebas y emulador de Firebase

Todo vive en la carpeta `tests/` (con su propio `package.json`, para no tocar el del APK).
La web y el APK no la incluyen.

## 1. Pruebas de la app (no necesitan emulador ni internet)

```powershell
cd tests
npm install        # solo la primera vez
npm test
```

Cargan la app completa en un navegador simulado (jsdom) con Firestore y Capacitor falsos.
Cubren el repaso de verbos, el XP semanal, el ranking, los recordatorios y la portada, y revisan
la estructura: scripts que existen, CSS dentro del bundle, archivos en el cache offline y vistas.
Si olvidas correr `npm run build` despues de tocar CSS o scripts, estas pruebas lo avisan.

GitHub las corre solas en cada push y pull request (`.github/workflows/tests.yml`).

## 2. Pruebas de las reglas de Firestore (con emulador)

Necesitas **Java 11 o superior** y firebase-tools:

```powershell
java -version                 # si no lo reconoce, instala Temurin 17
npm install -g firebase-tools
cd tests
npm run test:rules
```

Levanta un Firestore falso en tu PC, carga `firestore.rules` y prueba alumnos, Bingo en vivo
(incluida la sala cerrada o "fantasma") y el ranking. No toca tus datos reales.
La primera vez descarga el emulador (~60 MB).

## 3. Probar la app a mano sin tocar datos reales

Terminal 1 (emuladores, se queda abierta; su panel esta en http://localhost:4000):

```powershell
cd tests
npm run emulators
```

Terminal 2 (la app en local, desde la carpeta del proyecto):

```powershell
npx serve . -l 5000
```

Abre **http://localhost:5000/?emulator=1**. Aparece una franja roja "EMULATOR MODE" abajo.
Ahi puedes registrar alumnos falsos, crear salas de Bingo, etc.; todo se borra al apagar el emulador.
El profesor de prueba debe registrarse con el correo de `ADMIN_EMAIL`.
Para volver a los datos reales: **http://localhost:5000/?emulator=0**.

El modo emulador solo funciona en `localhost`: en la pagina publicada (Vercel) no existe.

## 4. Si agregas algo nuevo

- Archivo JS nuevo: agregalo a `APP_SCRIPTS` en `index.html` y corre `npm run build` (desde la raiz).
- CSS nuevo: agregalo a `scripts/css-order.json` y corre `npm run build`.
- Regla nueva en `firestore.rules`: agrega su prueba en `tests/rules/firestore-rules.spec.js`.
