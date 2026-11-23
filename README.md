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
  recursos.html                → grupo "Grammar" (botón del menú): Grammar + Support Material
css/
  base/                         → reset, tokens de marca (colores/tipografía), foco, responsive
  layout/                       → header, main, footer
  components/                  → un archivo por vista/elemento (hero, gates, lesson,
                                  progreso, skills, grammar, admin-panel, modales, etc.)
  themes/                       → modo oscuro y las capas visuales (glass, motion, acentos);
                                  section-accents.css = color de acento por sección (body[data-section])
  components/rewards.css        → franja de XP, tarjeta de rango, insignias, ventana de recompensa y confeti
  components/bottom-nav.css     → barra inferior de navegación (solo celular, hasta 620px)
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
    grammar-present-perfect-content.js → tema "Present Perfect" (1 unidad + 1 quiz)
    grammar-past-perfect-content.js    → tema "Past Perfect" (1 unidad + 1 quiz)
    grammar-future-perfect-content.js  → tema "Future Perfect" (1 unidad + 2 quizzes, incl. Mixed)
    grammar-present-perfect-continuous-content.js → tema "Present Perfect Continuous" (1 unidad + 1 quiz)
    grammar-past-perfect-continuous-content.js    → tema "Past Perfect Continuous" (1 unidad + 1 quiz)
    grammar-future-perfect-continuous-content.js  → tema "Future Perfect Continuous" (1 unidad + 1 quiz, incl. comparación y autoevaluación)
    grammar-adverbs-content.js  → tema "Adverbs" (guía: 3 módulos + 2 quizzes)
    grammar-prepositions-content.js → tema "Prepositions" (guía: 3 módulos + 2 quizzes)
    grammar-interjections-content.js → tema "Interjections" (guía: 4 módulos + 1 quiz)
  app/
    home-dashboard.js           → portada del estudiante: próxima lección en el hero + franja Today (racha, XP, rango, meta diaria);
                                  body.is-student alterna entre esa portada y la bienvenida de invitado
    grammar-menu.js             → buscador de temas y filtro "Show upcoming topics" en Grammar
    rewards.js                  → XP global (lecciones, sellos, quizzes de gramática), rangos, insignias,
                                  celebraciones y franja de XP del encabezado
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

## Recompensas y navegación móvil

- **XP**: lección nueva +20, sello de nivel +50, meta diaria +10, habilidades y bingo como antes.
  Cada quiz de gramática paga hasta +15 según la nota, pero solo la mejora sobre tu mejor
  intento (`state.quizBest`), así que repetirlo no regala XP.
- **Rangos**: cada 100 XP (Passenger, Traveler, Explorer, Navigator, Pilot, Captain, Ambassador).
- **Insignias**: se definen en el arreglo `BADGES` de `js/app/rewards.js`; para agregar una basta
  con añadir un objeto `{ id, icon, title, desc, test }`. Se guardan en `state.badges`.
  Al abrir la app, las que el estudiante ya cumplía se marcan sin celebrar (`syncBadgesSilently`).
- **Campos nuevos en el progreso** (se sincronizan con Firestore como el resto): `quizBest`,
  `badges` y `goalDays`. Los alumnos existentes siguen funcionando: si faltan, se crean vacíos.
- **Color por sección**: `navigation.js` pone `body[data-section]` y `section-accents.css`
  cambia `--accent`. Las celebraciones respetan `prefers-reduced-motion`.
- **Celular (≤620px)**: la barra inferior reemplaza al menú hamburguesa.

La navegación sigue siendo instantánea (SPA, sin recargar la página): sólo se
dividió el HTML, el CSS y el JS en archivos más pequeños para que sea más
fácil encontrar y editar cada sección. Por lo mismo, el sitio **debe abrirse
desde un servidor local** (ver `SETUP.md`, paso 6) y no funciona abriendo
`index.html` directamente desde el disco (`file://`).

## Identidad visual (rediseño institucional)

La capa de identidad UTN vive en `css/themes/utn-identity.css` y se carga **al final** de todas las hojas, así que refina el resto sin editar cada componente. Los tokens principales (azul marino, dorado, radios, tipografías) están al inicio de ese archivo.

- **Tipografías autoalojadas** en `fonts/` (Fraunces para titulares, Public Sans para interfaz, IBM Plex Mono para códigos); se declaran en `css/base/fonts.css`. Ya no se usa Google Fonts.
- **Colores del escudo con significado:** la franja tricolor del header, los bloques del MCER (A = verde, B = azul, C = rojo) y los sellos.
- Para volver al diseño anterior basta quitar la línea de `utn-identity.css` en `index.html`.

## Iconos

Ya no se usan emojis en la interfaz. Los iconos son SVG en línea definidos en `js/icons.js` (se carga antes que el resto de los scripts): `UTNIcons.svg("target")`. Los avatares se guardan como nombre de icono (`fox`, `owl`, `panda`…, ilustrados en `js/icons.js`); los perfiles antiguos con emoji se convierten automáticamente con `UTNIcons.avatar()`.
