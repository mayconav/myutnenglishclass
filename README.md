# MyUTNEnglishClass
Sitio web dinamico para apoyo de lecciones de ingles

## Estructura de archivos

`index.html` es el "shell" de la aplicación: contiene el `<head>`, el header,
el login/admin panel, los modales y los `<script>`. El contenido de cada
sección vive en su propio archivo dentro de `partials/`, y se carga
dinámicamente con `fetch()` antes de que los módulos de `js/app/` arranquen:

```
index.html                    → shell: head, header, login/admin, modales, scripts
partials/
  inicio.html                  → sección "Home" (hero / boarding pass)
  aprender.html                → grupo "Learn": Levels + Lesson + Skills
  progreso.html                → sección "Progress"
  recursos.html                → grupo "Resources": Support Material + Grammar
css/
  base/                         → reset, tokens de marca (colores/tipografía), foco, responsive
  layout/                       → header, main, footer
  components/                  → un archivo por vista/elemento (hero, gates, lesson,
                                  progreso, skills, grammar, admin-panel, modales, etc.)
  themes/                       → modo oscuro y las capas visuales (glass, motion, acentos)
js/
  data/
    levels-lessons.js           → contenido de niveles A1-C2 y lecciones
    grammar-content.js          → contenido de las lecciones de gramática
    grammar-verbs-content.js    → tema "Verbs" (guía A2–B1: módulos + 3 quizzes)
    grammar-present-simple-content.js → tema "Present Simple" (1 unidad + 1 quiz)
    grammar-past-simple-content.js    → tema "Past Simple" (1 unidad + 1 quiz)
    grammar-future-will-content.js    → tema "Future with Will" (1 unidad + 1 quiz)
    grammar-present-continuous-content.js → tema "Present Continuous" (1 unidad + 1 quiz)
    grammar-past-continuous-content.js    → tema "Past Continuous" (1 unidad + 1 quiz)
    grammar-future-continuous-content.js  → tema "Future Continuous" (1 unidad + 2 quizzes, incl. Mixed)
    grammar-adverbs-content.js  → tema "Adverbs" (guía: 3 módulos + 2 quizzes)
    grammar-prepositions-content.js → tema "Prepositions" (guía: 3 módulos + 2 quizzes)
    grammar-interjections-content.js → tema "Interjections" (guía: 4 módulos + 1 quiz)
  app/
    state.js, navigation.js,
    profile.js, boarding-pass.js,
    gates.js, lesson-player.js,
    progress.js, certificate.js,
    skills.js, state-reload.js,
    grammar-render.js, init.js  → lógica de la app, un archivo por sección
                                  (antes todo vivía en un solo js/app.js)
  auth.js                       → login / registro / panel de administración
  firebase-config.js            → credenciales de Firebase
  theme.js                      → modo claro/oscuro
```

Los módulos de `css/` y de `js/data/` y `js/app/` se cargan en orden desde
`index.html` (como hojas de estilo y `<script>` clásicos, no como módulos ES),
así que siguen compartiendo exactamente el mismo comportamiento de antes: sólo
cambió dónde vive cada pieza, para que sea más fácil encontrarla y editarla.

La navegación sigue siendo instantánea (SPA, sin recargar la página): sólo se
dividió el HTML, el CSS y el JS en archivos más pequeños para que sea más
fácil encontrar y editar cada sección. Por lo mismo, el sitio **debe abrirse
desde un servidor local** (ver `SETUP.md`, paso 6) y no funciona abriendo
`index.html` directamente desde el disco (`file://`).
