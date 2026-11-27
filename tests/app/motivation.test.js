"use strict";
/* Pruebas del punto 5: repaso de verbos, XP semanal, ranking por grupo y recordatorios. */
const test = require("node:test");
const assert = require("node:assert");
const { loadApp } = require("../helpers/load-app");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

test("la app carga sin errores y expone los modulos nuevos", () => {
  const a = loadApp();
  assert.deepStrictEqual(a.errors, []);
  for (const fn of ["initVerbReviewView", "renderHomeExtras", "verbStatsRecord", "trackWeeklyXp", "publishLeaderboard", "renderReminderCard"]) {
    assert.strictEqual(typeof a.w[fn], "function", fn);
  }
  a.close();
});

test("repaso espaciado: acierto sube de caja, error vuelve a la caja 0 y toca hoy", () => {
  const a = loadApp(); const w = a.w;
  const today = w.localDayKey();
  w.verbStatsRecord("go", "past", true);
  let s = w.state.verbStats["go|past"];
  assert.strictEqual(s.box, 1); assert.ok(s.due > today, "tras acertar toca mas tarde");
  w.verbStatsRecord("go", "past", true);
  assert.strictEqual(w.state.verbStats["go|past"].box, 2);
  w.verbStatsRecord("go", "past", false);
  s = w.state.verbStats["go|past"];
  assert.strictEqual(s.box, 0); assert.strictEqual(s.due, today); assert.strictEqual(s.bad, 1);
  assert.ok(w.verbStatsDue().some((e) => e.key === "go|past"));
  a.close();
});

test("XP semanal: suma lo ganado, reinicia al cambiar de semana y no inventa XP la primera vez", () => {
  const a = loadApp(); const w = a.w;
  const p = { skillsXP: 100, weekly: { week: null, xp: 0, mark: null } };
  w.trackWeeklyXp(p);
  assert.strictEqual(p.weekly.xp, 0, "primera lectura no cuenta XP viejo");
  p.skillsXP = 130; w.trackWeeklyXp(p);
  assert.strictEqual(p.weekly.xp, 30);
  p.weekly.week = "2020-01-06"; p.skillsXP = 140; w.trackWeeklyXp(p);
  assert.strictEqual(p.weekly.week, w.weekStartKey()); assert.strictEqual(p.weekly.xp, 10, "semana nueva: solo cuenta lo de ahora");
  assert.strictEqual(w.weekStartKey(new Date("2026-11-29T12:00:00")), "2026-11-23", "domingo pertenece a la semana del lunes anterior");
  a.close();
});

test("ronda de repaso completa: puntaje, XP, errores registrados y vuelven en la siguiente", () => {
  const a = loadApp(); const { w, d } = a;
  a.loginStudent("u1", "Erick Maycon Aragon", "901V");
  w.goto("repaso");
  assert.ok(!d.getElementById("vr-home").hidden);
  const xp0 = w.state.skillsXP;
  d.getElementById("vr-start").click();
  const missed = [];
  for (let i = 0; i < 8; i++) {
    const opts = [...d.querySelectorAll(".vr-opt")];
    assert.strictEqual(opts.length, 4);
    assert.strictEqual(new Set(opts.map((o) => o.textContent)).size, 4, "opciones sin repetir");
    const base = d.querySelector(".vr-base").textContent, kind = d.querySelector(".vr-kind").textContent;
    const v = w.bingoFindVerb(base);
    const correct = kind.includes("Participle") && v.pp ? v.pp : v.past;
    let pick = opts.find((o) => o.textContent === correct);
    assert.ok(pick, "la opcion correcta esta presente");
    if (i < 3) { pick = opts.find((o) => o.textContent !== correct); missed.push(base); }
    pick.click();
    d.getElementById("vr-next").click();
  }
  assert.ok(!d.getElementById("vr-done").hidden);
  assert.strictEqual(d.querySelector(".vr-score b").textContent, "5");
  assert.strictEqual(w.state.skillsXP - xp0, 5);
  assert.strictEqual(w.state.reviewStats.sessions, 1);
  assert.ok(w.state.daily.done.includes("verb-review"));
  d.getElementById("vr-again").click();
  const seen = [];
  for (let i = 0; i < 8; i++) {
    seen.push(d.querySelector(".vr-base").textContent);
    const o = d.querySelector(".vr-opt"); if (o) o.click(); else { d.getElementById("vr-input").value = "x"; d.getElementById("vr-check").click(); }
    d.getElementById("vr-next").click();
  }
  for (const m of missed) assert.ok(seen.includes(m), "el verbo fallado " + m + " vuelve en la siguiente ronda");
  a.close();
});

test("pregunta escrita: acepta mayusculas y espacios, y 'was / were' acepta cualquiera", () => {
  const a = loadApp(); const { w, d } = a;
  a.loginStudent("u1", "Ana Lopez", "901V");
  for (const k of ["go|past", "be|past", "see|past", "eat|past", "take|past", "give|past", "make|past", "come|past"]) {
    w.state.verbStats[k] = { ok: 3, bad: 0, box: 2, due: "2000-01-01", last: "2000-01-01" };
  }
  w.goto("repaso"); d.getElementById("vr-start").click();
  const input = d.getElementById("vr-input");
  assert.ok(input, "los verbos que ya sabe se piden escritos");
  const v = w.bingoFindVerb(d.querySelector(".vr-base").textContent);
  const kind = d.querySelector(".vr-kind").textContent;
  const ans = (kind.includes("Participle") && v.pp ? v.pp : v.past).split("/")[0].trim();
  input.value = "  " + ans.toUpperCase() + " ";
  d.getElementById("vr-check").click();
  assert.ok(d.querySelector(".vr-feedback.is-ok"));
  a.close();
});

test("ranking: publica solo campos permitidos, ordena por semana y por total, y respeta salirse", async () => {
  const a = loadApp(); const { w, d, store, calls } = a;
  a.loginStudent("u1", "Erick Maycon Aragon", "901V");
  w.state.skillsXP = 40; w.saveProgress(w.state);
  await w.publishLeaderboard(true);
  const pub = calls.filter((c) => c[0] === "set" && c[1] === "leaderboards/901V/members/u1").pop();
  assert.ok(pub, "publico en leaderboards/901V/members/u1");
  const allowed = ["nombre", "xp", "weekXp", "weekKey", "streak", "updatedAt"];
  assert.ok(Object.keys(pub[2]).every((k) => allowed.includes(k)));
  assert.ok(Number.isInteger(pub[2].xp) && Number.isInteger(pub[2].weekXp) && Number.isInteger(pub[2].streak));
  assert.strictEqual(pub[2].nombre, "Erick Maycon");

  store["leaderboards/901V/members/u2"] = { nombre: "Ana", xp: 500, weekXp: 50, weekKey: w.weekStartKey(), streak: 4 };
  store["leaderboards/901V/members/u3"] = { nombre: "Vieja", xp: 900, weekXp: 99, weekKey: "2020-01-06", streak: 0 };
  w.LB.rows = null; w.goto("progreso"); await sleep(40);
  const names = () => [...d.querySelectorAll("#rank-list .rank-name")].map((n) => n.textContent.replace(" (you)", ""));
  assert.strictEqual(names()[0], "Ana", "semana: gana quien mas XP hizo esta semana");
  assert.strictEqual(names()[2], "Vieja", "semana vieja cuenta como 0");
  d.querySelector('[data-seg="rank-mode"] [data-value="all"]').click(); await sleep(20);
  assert.strictEqual(names()[0], "Vieja", "total: gana quien tiene mas XP total");

  const opt = d.getElementById("rank-optin");
  opt.checked = false; opt.dispatchEvent(new w.Event("change")); await sleep(20);
  assert.ok(!store["leaderboards/901V/members/u1"], "salirse borra su documento");
  opt.checked = true; opt.dispatchEvent(new w.Event("change")); await sleep(30);
  assert.ok(store["leaderboards/901V/members/u1"], "volver a entrar lo publica otra vez");
  a.close();
});

test("ranking: sin grupo o con '/' en el nombre del grupo no publica nada", async () => {
  for (const grupo of ["", "A/B"]) {
    const a = loadApp(); a.loginStudent("u9", "Sin Grupo", grupo);
    await a.w.publishLeaderboard(true);
    assert.strictEqual(a.calls.filter((c) => c[0] === "set" && String(c[1]).startsWith("leaderboards")).length, 0, "grupo '" + grupo + "'");
    a.close();
  }
});

test("recordatorios: programa maximo 7 dias, ids propios, y cancela el de hoy al practicar", async () => {
  const a = loadApp(); const { w, d, notif } = a;
  a.loginStudent("u1", "Erick", "901V");
  w.goto("progreso");
  const t = d.getElementById("rm-time"); t.value = "23:59"; t.dispatchEvent(new w.Event("change"));
  const tg = d.getElementById("rm-toggle"); tg.checked = true; tg.dispatchEvent(new w.Event("change"));
  await sleep(80);
  assert.ok(notif.scheduled.length >= 1 && notif.scheduled.length <= 7, "programadas: " + notif.scheduled.length);
  assert.ok(notif.scheduled.every((n) => n.id >= 910000 && n.id < 919999));
  const todayId = w.reminderIdForDay(w.localDayKey());
  w.onStudyActivity();
  assert.ok(notif.cancelled.includes(todayId));
  a.close();
});

test("recordatorios: si ya practico hoy, hoy no se programa", async () => {
  const a = loadApp(); const { w, d, notif } = a;
  a.loginStudent("u1", "Erick", "901V");
  w.state.lastActiveDay = w.localDayKey();
  w.goto("progreso");
  const t = d.getElementById("rm-time"); t.value = "23:59"; t.dispatchEvent(new w.Event("change"));
  const tg = d.getElementById("rm-toggle"); tg.checked = true; tg.dispatchEvent(new w.Event("change"));
  await sleep(80);
  assert.ok(!notif.scheduled.some((n) => n.id === w.reminderIdForDay(w.localDayKey())));
  a.close();
});

test("recordatorios: en el navegador (sin Capacitor) se explica y no hay controles", () => {
  const a = loadApp({ native: false }); const { w, d } = a;
  a.loginStudent("u1", "Erick", "901V");
  w.goto("progreso");
  assert.ok(d.getElementById("rm-controls").hidden);
  assert.ok(!d.getElementById("rm-info").hidden);
  a.close();
});

test("portada: tres tarjetas y tira de 7 dias con hoy marcado tras practicar", () => {
  const a = loadApp(); const { w, d } = a;
  a.loginStudent("u1", "Erick", "901V");
  w.recordDailyActivity("test-activity");
  w.goto("inicio");
  assert.strictEqual(d.querySelectorAll("#hx-week .week-dot").length, 7);
  assert.ok(d.querySelectorAll("#hx-week .week-dot.on").length >= 1);
  assert.ok(d.getElementById("hx-review").textContent.length > 10);
  assert.ok(d.getElementById("hx-rank").textContent.includes("Group"));
  a.close();
});
