"use strict";
/* Comprobaciones de estructura: atrapan olvidos tipicos (un script que no existe,
   un CSS fuera del bundle, un archivo que no queda en el cache offline...). */
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { ROOT } = require("../helpers/load-app");

const read = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");
const html = read("index.html");
const appScripts = [];
read("index.html").match(/var APP_SCRIPTS = \[([\s\S]*?)\];/)[1].replace(/"([^"]+)"/g, (_, p) => appScripts.push(p));

test("todos los scripts de APP_SCRIPTS existen", () => {
  assert.ok(appScripts.length > 30);
  for (const p of appScripts) assert.ok(fs.existsSync(path.join(ROOT, p)), "falta " + p);
});

test("no hay scripts repetidos en APP_SCRIPTS", () => {
  assert.strictEqual(new Set(appScripts).size, appScripts.length);
});

test("todos los CSS de css-order.json existen y estan en el bundle", () => {
  const order = JSON.parse(read("scripts/css-order.json"));
  for (const p of order) assert.ok(fs.existsSync(path.join(ROOT, p)), "falta " + p);
  const bundle = read("css/app.bundle.min.css");
  assert.ok(bundle.length > 100000, "el bundle parece vacio; corre npm run build");
  for (const marker of [".vr-panel", ".rank-row", ".hx-card", ".week-strip"]) {
    assert.ok(bundle.includes(marker), "el bundle no incluye " + marker + "; corre npm run build");
  }
});

test("el service worker guarda en cache todos los scripts de la app", () => {
  const sw = read("sw.js");
  for (const p of appScripts) assert.ok(sw.includes(p), "sw.js no lista " + p + "; corre npm run build");
});

test("cada vista de un grupo de navegacion existe en el HTML", () => {
  const nav = read("js/app/navigation.js");
  const groups = /GROUPS\s*=\s*\{([\s\S]*?)\};/.exec(nav)[1];
  const views = [];
  groups.replace(/"([a-z0-9-]+)"/g, (_, v) => views.push(v));
  const all = html + fs.readdirSync(path.join(ROOT, "partials")).map((f) => read("partials/" + f)).join("\n");
  for (const v of views) {
    if (/^[a-z]+$/.test(v) && ["aprender", "juegos", "recursos", "admin"].includes(v)) continue; // nombres de grupo
    assert.ok(all.includes('data-view="' + v + '"'), "no existe la vista data-view=" + v);
  }
});

test("las reglas de Firestore cubren las colecciones que usa la app", () => {
  const rules = read("firestore.rules");
  for (const m of ["match /students/", "match /bingoSessions/", "match /leaderboards/"]) {
    assert.ok(rules.includes(m), "firestore.rules no tiene " + m);
  }
});

test("el modo emulador solo se activa en localhost", () => {
  const cfg = read("js/firebase-config.js");
  assert.ok(/hostname/.test(cfg) && /localhost/.test(cfg) && /useEmulator/.test(cfg));
  assert.ok(cfg.indexOf("return;") < cfg.indexOf("useEmulator"), "la guarda de localhost debe ir antes de useEmulator");
});
