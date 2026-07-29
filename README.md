# MyUTNEnglishClass
Sitio web dinamico para apoyo de lecciones de ingles

## Estructura de archivos

`index.html` es el "shell" de la aplicación: contiene el `<head>`, el header,
el login/admin panel, los modales y los `<script>`. El contenido de cada
sección vive en su propio archivo dentro de `partials/`, y se carga
dinámicamente con `fetch()` antes de que `js/app.js` arranque:

```
index.html              → shell: head, header, login/admin, modales, scripts
partials/
  inicio.html            → sección "Home" (hero / boarding pass)
  aprender.html          → grupo "Learn": Levels + Lesson + Skills
  progreso.html          → sección "Progress"
  recursos.html          → grupo "Resources": Support Material + Grammar
js/
  app.js                 → lógica de toda la app (navegación, quizzes, progreso…)
  auth.js                → login / registro / panel de administración
  firebase-config.js     → credenciales de Firebase
  theme.js               → modo claro/oscuro
```

La navegación sigue siendo instantánea (SPA, sin recargar la página): sólo se
dividió el HTML en archivos más pequeños para que sea más fácil encontrar y
editar cada sección. Por lo mismo, el sitio **debe abrirse desde un servidor
local** (ver `SETUP.md`, paso 6) y no funciona abriendo `index.html`
directamente desde el disco (`file://`).
