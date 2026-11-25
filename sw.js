/* Service worker de MyUTN English Class.
   - La red manda: si hay internet, siempre carga lo último que publiques.
   - Si no hay internet (o responde muy lento), usa la copia guardada.
   - Al instalarse guarda toda la app (HTML, CSS, JS, lecciones, parciales,
     fuentes e imágenes) para que abra sin conexión desde la primera visita.
   - La lista de archivos y el nombre del caché los genera `npm run build`
     (scripts/build.js); no hace falta subir la versión a mano.
   - Firestore y el resto de dominios externos no se tocan. */

/* BUILD:START (generado por scripts/build.js; no editar a mano) */
const CACHE = 'myutn-7755ee33';
const CORE = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/css/app.bundle.min.css",
  "/partials/aprender.html",
  "/partials/inicio.html",
  "/partials/juegos.html",
  "/partials/progreso.html",
  "/partials/recursos.html"
];
const EXTRA = [
  "/js/app/bingo-teacher.js",
  "/js/app/bingo.js",
  "/js/app/boarding-pass.js",
  "/js/app/certificate.js",
  "/js/app/gates.js",
  "/js/app/grammar-menu.js",
  "/js/app/grammar-render.js",
  "/js/app/home-dashboard.js",
  "/js/app/init.js",
  "/js/app/lesson-player.js",
  "/js/app/material-audio.js",
  "/js/app/material-nav.js",
  "/js/app/memory.js",
  "/js/app/navigation.js",
  "/js/app/profile.js",
  "/js/app/progress.js",
  "/js/app/puzzles.js",
  "/js/app/responsive-tables.js",
  "/js/app/rewards.js",
  "/js/app/skills-exercises.js",
  "/js/app/skills-hub.js",
  "/js/app/state-reload.js",
  "/js/app/state.js",
  "/js/auth.js",
  "/js/data/grammar-adverbs-content.js",
  "/js/data/grammar-auxiliary-verbs-content.js",
  "/js/data/grammar-be-going-to-content.js",
  "/js/data/grammar-common-mistakes-content.js",
  "/js/data/grammar-content.js",
  "/js/data/grammar-future-continuous-content.js",
  "/js/data/grammar-future-perfect-content.js",
  "/js/data/grammar-future-perfect-continuous-content.js",
  "/js/data/grammar-future-will-content.js",
  "/js/data/grammar-interjections-content.js",
  "/js/data/grammar-main-verbs-content.js",
  "/js/data/grammar-modals-content.js",
  "/js/data/grammar-past-continuous-content.js",
  "/js/data/grammar-past-perfect-content.js",
  "/js/data/grammar-past-perfect-continuous-content.js",
  "/js/data/grammar-past-simple-content.js",
  "/js/data/grammar-prepositions-content.js",
  "/js/data/grammar-present-continuous-content.js",
  "/js/data/grammar-present-perfect-content.js",
  "/js/data/grammar-present-perfect-continuous-content.js",
  "/js/data/grammar-present-simple-content.js",
  "/js/data/grammar-verbs-content.js",
  "/js/data/levels-lessons.js",
  "/js/data/skills-content.js",
  "/js/data/verb-art.js",
  "/js/data/verb-puzzles-content.js",
  "/js/data/verbs-content.js",
  "/js/firebase-config.js",
  "/js/icons.js",
  "/js/install-app.js",
  "/js/theme.js",
  "/fonts/fraunces-latin-ext-wght-normal.woff2",
  "/fonts/fraunces-latin-wght-normal.woff2",
  "/fonts/ibm-plex-mono-latin-400-normal.woff2",
  "/fonts/ibm-plex-mono-latin-500-normal.woff2",
  "/fonts/public-sans-latin-ext-wght-normal.woff2",
  "/fonts/public-sans-latin-wght-normal.woff2",
  "/favicon.ico",
  "/img/apple-touch-icon.png",
  "/img/icon-192.png",
  "/img/logo-192.png",
  "/img/logo.png",
  "/img/teacher-miguel-angel.jpg"
];
/* BUILD:END */

const EXT_CACHE = 'myutn-ext-v1';   // SDK de Firebase (gstatic.com), versionado por URL
const NET_TIMEOUT = 5000;           // ms antes de preferir la copia guardada con datos lentos

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    // CORE es obligatorio: si falla, no se instala y el SW anterior sigue funcionando.
    await c.addAll(CORE.map(u => new Request(u, { cache: 'reload' })));
    // EXTRA es de mejor esfuerzo: un archivo caído no tumba el resto.
    await Promise.allSettled(EXTRA.map(u => c.add(new Request(u, { cache: 'reload' }))));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keep = [CACHE, EXT_CACHE];
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => !keep.includes(k)).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // SDK de Firebase: es un archivo versionado (/firebasejs/10.12.2/...), se guarda una vez.
  if (url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/')) {
    e.respondWith(firebaseSdk(req));
    return;
  }

  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/download/')) return; // el APK no se cachea
  if (url.pathname === '/sw.js') return;

  // Fuentes e imágenes: salen del caché al instante y se refrescan por detrás.
  if (/\.(?:woff2?|png|jpe?g|webp|svg|ico)$/i.test(url.pathname)) {
    e.respondWith(staleWhileRevalidate(e, req));
    return;
  }
  // HTML, CSS, JS, parciales y manifest: red primero.
  e.respondWith(networkFirst(e, req));
});

function fallback(req) {
  return caches.match(req).then(hit =>
    hit || (req.mode === 'navigate' ? caches.match('/index.html') : undefined)
  );
}

function networkFirst(e, req) {
  const net = fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
    return res;
  });
  e.waitUntil(net.catch(() => {})); // deja terminar la actualización del caché aunque ya se haya respondido
  return new Promise((resolve, reject) => {
    let done = false;
    const timer = setTimeout(() => {
      fallback(req).then(hit => { if (hit && !done) { done = true; resolve(hit); } });
    }, NET_TIMEOUT);
    net.then(res => {
      clearTimeout(timer);
      if (!done) { done = true; resolve(res); }
    }, err => {
      clearTimeout(timer);
      if (done) return;
      fallback(req).then(hit => { done = true; hit ? resolve(hit) : reject(err); });
    });
  });
}

function staleWhileRevalidate(e, req) {
  return caches.open(CACHE).then(c => c.match(req).then(hit => {
    const net = fetch(req).then(res => {
      if (res.ok) c.put(req, res.clone());
      return res;
    });
    if (hit) { e.waitUntil(net.catch(() => {})); return hit; }
    return net;
  }));
}

async function firebaseSdk(req) {
  const c = await caches.open(EXT_CACHE);
  const hit = await c.match(req.url);
  if (hit) return hit;
  let res;
  try { res = await fetch(req.url, { mode: 'cors' }); }   // respuesta normal (no "opaca"): casi no gasta cuota
  catch (err) { return fetch(req); }
  if (res.ok) c.put(req.url, res.clone());
  return res;
}
