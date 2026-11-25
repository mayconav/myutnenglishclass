#!/usr/bin/env node
/* ============ BUILD ============
   Uso:   node scripts/build.js          (o: npm run build)
          node scripts/build.js --watch  (reconstruye al guardar un CSS)

   Hace dos cosas:
   1) CSS: une los archivos de scripts/css-order.json (en ESE orden, que es el de
      la cascada) en css/app.bundle.min.css y lo minifica.
   2) Service worker: calcula la lista de archivos a guardar sin internet y un
      nombre de caché que cambia solo cuando cambia algún archivo. Escribe ambos
      dentro de sw.js, entre los marcadores BUILD:START y BUILD:END.

   Así ya no hay que acordarse de subir la versión de CACHE a mano.
   Para añadir o quitar un CSS: edita scripts/css-order.json y vuelve a correr el build. */
"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const cp = require("child_process");

const ROOT = path.resolve(__dirname, "..");
const BUNDLE_REL = "css/app.bundle.min.css";
const ESBUILD = "esbuild@0.25.5"; // se descarga con npx la primera vez (no se agrega a package.json)

const read = (rel) => fs.readFileSync(path.join(ROOT, rel));
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

function walk(relDir, filter) {
  const out = [];
  (function rec(rel) {
    for (const ent of fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true })) {
      const r = rel + "/" + ent.name;
      if (ent.isDirectory()) rec(r);
      else if (!filter || filter(r)) out.push(r);
    }
  })(relDir);
  return out.sort();
}

/* ---------- 1) CSS ---------- */
function buildCss() {
  const order = JSON.parse(read("scripts/css-order.json").toString("utf8"));
  const parts = order.map((rel) => {
    if (!exists(rel)) throw new Error("css-order.json apunta a un archivo que no existe: " + rel);
    let css = read(rel).toString("utf8");
    // Reescribe url() relativos: el bundle vive en css/, los fuentes en css/base/
    css = css.replace(/url\(\s*(['"]?)(?!data:|https?:|\/|#)([^)'"]+?)\1\s*\)/g, (m, q, u) => {
      const abs = path.resolve(path.join(ROOT, path.dirname(rel)), u);
      const fromBundle = path.relative(path.join(ROOT, path.dirname(BUNDLE_REL)), abs).split(path.sep).join("/");
      return "url('" + fromBundle + "')";
    });
    return css;
  });
  const joined = parts.join("\n");
  let min;
  try {
    min = cp.execSync("npx --yes " + ESBUILD + " --loader=css --minify", {
      input: joined, encoding: "utf8", maxBuffer: 64 * 1024 * 1024, stdio: ["pipe", "pipe", "pipe"],
    });
  } catch (e) {
    console.warn("! No se pudo minificar con esbuild (¿sin internet?). Se guarda SIN minificar.\n  " + String(e.message).split("\n")[0]);
    min = joined;
  }
  fs.writeFileSync(path.join(ROOT, BUNDLE_REL), min);
  console.log("CSS: " + order.length + " archivos -> " + BUNDLE_REL + " (" + (joined.length / 1024).toFixed(0) + " KB -> " + (min.length / 1024).toFixed(0) + " KB)");
}

/* ---------- 2) Service worker ---------- */
function buildSw() {
  // Imágenes realmente usadas (se buscan en HTML, JS y CSS)
  const scan = ["index.html"]
    .concat(walk("partials"), walk("js"), order().map((x) => x))
    .filter(exists);
  const imgSet = new Set();
  for (const f of scan) {
    const txt = read(f).toString("utf8");
    for (const m of txt.matchAll(/img\/[\w.\-]+\.(?:png|jpe?g|webp|svg|ico)/gi)) if (exists(m[0])) imgSet.add(m[0]);
  }
  ["img/icon-192.png", "img/apple-touch-icon.png"].forEach((f) => exists(f) && imgSet.add(f));

  // CORE: sin esto no hay app offline; si algo falla, el SW no se instala.
  const core = ["/", "/index.html", "/manifest.webmanifest", "/" + BUNDLE_REL]
    .concat(walk("partials", (r) => r.endsWith(".html")).map((f) => "/" + f));
  // EXTRA: mejor esfuerzo (si uno falla, no tumba el resto).
  const extra = []
    .concat(walk("js", (r) => r.endsWith(".js")))
    .concat(walk("fonts", (r) => r.endsWith(".woff2")))
    .concat(["favicon.ico"].filter(exists))
    .concat([...imgSet].sort())
    .map((f) => "/" + f.replace(/^\//, ""));

  // El nombre del caché cambia cuando cambia el contenido de cualquier archivo guardado.
  const h = crypto.createHash("sha1");
  for (const u of core.concat(extra)) {
    h.update(u);
    const rel = u === "/" ? "index.html" : u.slice(1);
    if (exists(rel)) h.update(read(rel));
  }
  const version = "myutn-" + h.digest("hex").slice(0, 8);

  const block =
    "/* BUILD:START (generado por scripts/build.js; no editar a mano) */\n" +
    "const CACHE = '" + version + "';\n" +
    "const CORE = " + JSON.stringify(core, null, 2) + ";\n" +
    "const EXTRA = " + JSON.stringify(extra, null, 2) + ";\n" +
    "/* BUILD:END */";

  const swPath = path.join(ROOT, "sw.js");
  const sw = fs.readFileSync(swPath, "utf8");
  if (!/\/\* BUILD:START[\s\S]*?BUILD:END \*\//.test(sw)) throw new Error("sw.js no tiene los marcadores BUILD:START / BUILD:END");
  const next = sw.replace(/\/\* BUILD:START[\s\S]*?BUILD:END \*\//, () => block);
  if (next !== sw) fs.writeFileSync(swPath, next);
  const total = core.concat(extra).reduce((n, u) => n + (exists(u === "/" ? "index.html" : u.slice(1)) ? read(u === "/" ? "index.html" : u.slice(1)).length : 0), 0);
  console.log("SW:  " + CACHE_LOG(version) + " · " + (core.length + extra.length) + " archivos (~" + (total / 1024).toFixed(0) + " KB) guardados para uso sin internet");
}
const CACHE_LOG = (v) => "caché " + v;
function order() { return JSON.parse(read("scripts/css-order.json").toString("utf8")); }

function run() {
  buildCss();
  buildSw();
}

run();

if (process.argv.includes("--watch")) {
  console.log("Observando css/ y scripts/css-order.json… (Ctrl+C para salir)");
  let t = null;
  const again = (_, name) => {
    if (name && (name.includes("app.bundle.min.css") )) return; // evita bucle
    clearTimeout(t);
    t = setTimeout(() => { try { run(); } catch (e) { console.error(e.message); } }, 300);
  };
  fs.watch(path.join(ROOT, "css"), { recursive: true }, again);
  fs.watch(path.join(ROOT, "scripts"), again);
}
