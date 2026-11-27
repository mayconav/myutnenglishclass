"use strict";
/* Pruebas de firestore.rules contra el EMULADOR de Firestore (no toca datos reales).
   Se ejecuta con:  npm run test:rules   (necesita Java 11+ y firebase-tools; ver TESTING.md).
   Cubre alumnos, Bingo en vivo (incluida la sala "fantasma": sala cerrada) y el ranking por grupo. */
const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const { initializeTestEnvironment, assertSucceeds, assertFails } = require("@firebase/rules-unit-testing");
const firebase = require("firebase/compat/app");
require("firebase/compat/firestore");

const TEACHER_EMAIL = "maap044@gmail.com";   // el mismo que isTeacher() en firestore.rules
const GROUP = "901V";
let env;

function emulatorHostPort() {
  const raw = process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080";
  const [host, port] = raw.split(":");
  return { host, port: Number(port) };
}

const student = (uid) => env.authenticatedContext(uid, { email: uid + "@alumnos.test" }).firestore();
const teacher = () => env.authenticatedContext("teacher", { email: TEACHER_EMAIL }).firestore();
const anon = () => env.unauthenticatedContext().firestore();
const TS = () => firebase.firestore.FieldValue.serverTimestamp();

async function seed(fn) { await env.withSecurityRulesDisabled(async (ctx) => { await fn(ctx.firestore()); }); }

const studentDoc = (extra) => Object.assign({ nombre: "Ana", correo: "ana@alumnos.test", boleta: "123", grupo: GROUP, disabled: false, progress: {}, updatedAt: "x" }, extra || {});
const lb = (extra) => Object.assign({ nombre: "Ana", xp: 40, weekXp: 10, weekKey: "2026-11-23", streak: 2, updatedAt: TS() }, extra || {});

test.before(async () => {
  const { host, port } = emulatorHostPort();
  env = await initializeTestEnvironment({
    projectId: "demo-myutn",
    firestore: { host, port, rules: fs.readFileSync(path.resolve(__dirname, "..", "..", "firestore.rules"), "utf8") }
  });
});
test.after(async () => { if (env) await env.cleanup(); });
test.beforeEach(async () => {
  await env.clearFirestore();
  await seed(async (db) => {
    await db.doc("students/ana").set(studentDoc({ nombre: "Ana" }));
    await db.doc("students/beto").set(studentDoc({ nombre: "Beto" }));
    await db.doc("students/carla").set(studentDoc({ nombre: "Carla", grupo: "902V" }));
    await db.doc("students/baja").set(studentDoc({ nombre: "Baja", disabled: true }));
    await db.doc("bingoSessions/sala1").set({ grupo: GROUP, status: "waiting" });
    await db.doc("bingoSessions/vieja").set({ grupo: GROUP, status: "ended" });
  });
});

/* ============ ALUMNOS ============ */
test("alumno: crea su propio documento sin grupo y activo", async () => {
  await assertSucceeds(student("nuevo").doc("students/nuevo").set({ nombre: "N", correo: "n@a.test", boleta: "1", grupo: "", disabled: false, createdAt: "x", updatedAt: "x", progress: {} }));
});
test("alumno: no puede crearse con grupo, ni crear el documento de otro, ni con campos extra", async () => {
  const base = { nombre: "N", correo: "n@a.test", boleta: "1", grupo: "", disabled: false, progress: {} };
  await assertFails(student("nuevo").doc("students/nuevo").set(Object.assign({}, base, { grupo: GROUP })));
  await assertFails(student("nuevo").doc("students/otro").set(base));
  await assertFails(student("nuevo").doc("students/nuevo").set(Object.assign({}, base, { esAdmin: true })));
});
test("alumno: lee su documento, no el de otro; el profesor lee cualquiera; sin sesion nada", async () => {
  await assertSucceeds(student("ana").doc("students/ana").get());
  await assertFails(student("ana").doc("students/beto").get());
  await assertSucceeds(teacher().doc("students/beto").get());
  await assertFails(anon().doc("students/ana").get());
});
test("alumno: actualiza solo su progreso; no puede cambiar su grupo ni reactivarse", async () => {
  await assertSucceeds(student("ana").doc("students/ana").update({ progress: { skillsXP: 5 }, updatedAt: "y" }));
  await assertFails(student("ana").doc("students/ana").update({ grupo: "902V" }));
  await assertFails(student("ana").doc("students/ana").update({ disabled: false, progress: {}, nombre: "Otra" }));
  await assertFails(student("baja").doc("students/baja").update({ progress: {}, updatedAt: "y" }));
});
test("profesor: asigna grupo y es el unico que borra alumnos", async () => {
  await assertSucceeds(teacher().doc("students/ana").update({ grupo: "903V" }));
  await assertFails(student("ana").doc("students/ana").delete());
  await assertSucceeds(teacher().doc("students/ana").delete());
});

/* ============ BINGO EN VIVO ============ */
test("bingo: solo el profesor escribe la sala; cualquier sesion iniciada la lee", async () => {
  await assertSucceeds(teacher().doc("bingoSessions/sala2").set({ grupo: GROUP, status: "waiting" }));
  await assertFails(student("ana").doc("bingoSessions/sala3").set({ grupo: GROUP, status: "waiting" }));
  await assertSucceeds(student("ana").doc("bingoSessions/sala1").get());
  await assertFails(anon().doc("bingoSessions/sala1").get());
});
test("bingo: el alumno entra a la sala de SU grupo, no a la de otro grupo", async () => {
  await assertSucceeds(student("ana").doc("bingoSessions/sala1/players/ana").set({ grupo: GROUP, nombre: "Ana" }));
  await assertFails(student("carla").doc("bingoSessions/sala1/players/carla").set({ grupo: GROUP, nombre: "Carla" }));   // Carla es de 902V
  await assertFails(student("carla").doc("bingoSessions/sala1/players/carla").set({ grupo: "902V", nombre: "Carla" }));  // la sala es de 901V
});
test("bingo: no se puede entrar a una sala cerrada (la sala fantasma)", async () => {
  await assertFails(student("ana").doc("bingoSessions/vieja/players/ana").set({ grupo: GROUP, nombre: "Ana" }));
});
test("bingo: un alumno solo escribe su propio jugador, y puede salirse", async () => {
  await assertFails(student("ana").doc("bingoSessions/sala1/players/beto").set({ grupo: GROUP, nombre: "Beto" }));
  await assertSucceeds(student("ana").doc("bingoSessions/sala1/players/ana").set({ grupo: GROUP, nombre: "Ana" }));
  await assertSucceeds(student("ana").doc("bingoSessions/sala1/players/ana").delete());
  await seed((db) => db.doc("bingoSessions/sala1/players/beto").set({ grupo: GROUP, nombre: "Beto" }));
  await assertFails(student("ana").doc("bingoSessions/sala1/players/beto").delete());
  await assertSucceeds(teacher().doc("bingoSessions/sala1/players/beto").delete());
});

/* ============ RANKING POR GRUPO ============ */
const mine = (uid, grupo) => student(uid).doc("leaderboards/" + (grupo || GROUP) + "/members/" + uid);

test("ranking: el alumno escribe SU documento en SU grupo", async () => {
  await assertSucceeds(mine("ana").set(lb()));
  await assertSucceeds(mine("ana").set(lb({ xp: 41 })));   // actualizar tambien
});
test("ranking: no escribe en el documento de otro, ni en otro grupo, ni sin sesion", async () => {
  await assertFails(student("ana").doc("leaderboards/" + GROUP + "/members/beto").set(lb()));
  await assertFails(mine("ana", "902V").set(lb()));
  await assertFails(anon().doc("leaderboards/" + GROUP + "/members/ana").set(lb()));
});
test("ranking: rechaza campos extra, nombre vacio o largo, y numeros invalidos", async () => {
  await assertFails(mine("ana").set(lb({ esAdmin: true })));
  await assertFails(mine("ana").set(lb({ nombre: "" })));
  await assertFails(mine("ana").set(lb({ nombre: "x".repeat(41) })));
  await assertFails(mine("ana").set(lb({ xp: -1 })));
  await assertFails(mine("ana").set(lb({ xp: 1.5 })));
  await assertFails(mine("ana").set(lb({ weekXp: "10" })));
  await assertFails(mine("ana").set(lb({ streak: -2 })));
});
test("ranking: un alumno dado de baja no puede publicar", async () => {
  await assertFails(mine("baja").set(lb()));
});
test("ranking: lo leen los companeros del grupo y el profesor; otro grupo y sin sesion, no", async () => {
  await seed((db) => db.doc("leaderboards/" + GROUP + "/members/ana").set({ nombre: "Ana", xp: 1, weekXp: 1, weekKey: "2026-11-23", streak: 1 }));
  await assertSucceeds(student("beto").collection("leaderboards/" + GROUP + "/members").get());
  await assertSucceeds(teacher().collection("leaderboards/" + GROUP + "/members").get());
  await assertFails(student("carla").collection("leaderboards/" + GROUP + "/members").get());
  await assertFails(anon().collection("leaderboards/" + GROUP + "/members").get());
});
test("ranking: el alumno puede salirse; solo el profesor quita a otros", async () => {
  await seed(async (db) => {
    await db.doc("leaderboards/" + GROUP + "/members/ana").set({ nombre: "Ana", xp: 1, weekXp: 1, weekKey: "2026-11-23", streak: 1 });
    await db.doc("leaderboards/" + GROUP + "/members/beto").set({ nombre: "Beto", xp: 1, weekXp: 1, weekKey: "2026-11-23", streak: 1 });
  });
  await assertSucceeds(mine("ana").delete());
  await assertFails(student("ana").doc("leaderboards/" + GROUP + "/members/beto").delete());
  await assertSucceeds(teacher().doc("leaderboards/" + GROUP + "/members/beto").delete());
});
