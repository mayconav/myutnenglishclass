"use strict";
/* Carga la app completa (index.html + partials + scripts en el orden real) dentro de jsdom,
   con Firestore y Capacitor falsos, para probarla sin navegador, sin internet y sin tocar datos reales. */
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..", "..");

function loadApp(opts) {
  opts = opts || {};
  const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
  const dom = new JSDOM(html, { runScripts: "dangerously", url: "https://myutnenglishclass.vercel.app/" });
  const w = dom.window, d = w.document;
  const errors = [];
  w.addEventListener("error", (e) => errors.push(e.message));

  d.querySelectorAll("[data-partial]").forEach((el) => {
    el.innerHTML = fs.readFileSync(path.join(ROOT, el.getAttribute("data-partial")), "utf8");
  });

  /* Firestore falso en memoria */
  const store = {}, calls = [];
  const docRef = (p) => ({
    set: (v) => { calls.push(["set", p, v]); store[p] = v; return Promise.resolve(); },
    delete: () => { calls.push(["delete", p]); delete store[p]; return Promise.resolve(); },
    get: () => Promise.resolve({ exists: !!store[p], data: () => store[p] }),
    onSnapshot: () => () => {},
    collection: (c) => collRef(p + "/" + c)
  });
  const collRef = (p) => ({
    doc: (id) => docRef(p + "/" + id),
    onSnapshot: () => () => {},
    get: () => {
      const depth = p.split("/").length + 1;
      const docs = Object.keys(store).filter((k) => k.startsWith(p + "/") && k.split("/").length === depth)
        .map((k) => ({ id: k.split("/").pop(), data: () => store[k] }));
      return Promise.resolve({ forEach: (f) => docs.forEach(f) });
    }
  });
  w.db = { collection: (c) => collRef(c) };
  w.firebase = { firestore: { FieldValue: { serverTimestamp: () => "TS" } } };
  w.__UTN_FIREBASE_READY__ = true;

  /* Capacitor falso (APK) con el plugin de notificaciones locales */
  const notif = { pending: [], scheduled: [], cancelled: [], granted: true };
  if (opts.native !== false) {
    w.Capacitor = { isNativePlatform: () => true, isPluginAvailable: () => true, Plugins: { LocalNotifications: {
      checkPermissions: () => Promise.resolve({ display: notif.granted ? "granted" : "prompt" }),
      requestPermissions: () => Promise.resolve({ display: "granted" }),
      createChannel: () => Promise.resolve(),
      getPending: () => Promise.resolve({ notifications: notif.pending.slice() }),
      cancel: (o) => { const ids = o.notifications.map((n) => n.id); notif.cancelled.push(...ids); notif.pending = notif.pending.filter((p) => !ids.includes(p.id)); return Promise.resolve(); },
      schedule: (o) => { notif.scheduled.push(...o.notifications); notif.pending.push(...o.notifications); return Promise.resolve(); },
      addListener: () => {}
    } } };
  }
  w.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  w.matchMedia = w.matchMedia || (() => ({ matches: false, addListener() {}, addEventListener() {} }));
  w.scrollTo = () => {};
  /* Sin pretendToBeVisual (su requestAnimationFrame deja un error suelto al cerrar la ventana):
     rAF sencillo con setTimeout de la propia ventana, que si se cancela al cerrarla. */
  w.requestAnimationFrame = (cb) => w.setTimeout(() => cb(Date.now()), 16);
  w.cancelAnimationFrame = (id) => w.clearTimeout(id);

  /* Scripts en el mismo orden que usa index.html (APP_SCRIPTS) */
  const order = ["js/icons.js"];
  const list = fs.readFileSync(path.join(ROOT, "index.html"), "utf8").match(/var APP_SCRIPTS = \[([\s\S]*?)\];/)[1];
  list.replace(/"([^"]+)"/g, (_, p) => order.push(p));
  for (const p of order) {
    const s = d.createElement("script");
    s.textContent = fs.readFileSync(path.join(ROOT, p), "utf8");
    d.body.appendChild(s);
  }

  /* Inicia sesion como alumno del grupo indicado */
  function loginStudent(uid, nombre, grupo) {
    w.__UTN_UID__ = uid;
    w.__UTN_BINGO_SET_STUDENT__(uid, { nombre: nombre, grupo: grupo });
    w.__UTN_APP_RELOAD__();
  }
  return { w, d, store, calls, notif, errors, loginStudent, ROOT, order, /* No se cierra la ventana a proposito: al cerrarla, jsdom deja tareas pendientes de la app
     que fallan despues de que la prueba termino. Las ventanas acaban solas al salir el proceso. */
    close: () => {} };
}

module.exports = { loadApp, ROOT };
