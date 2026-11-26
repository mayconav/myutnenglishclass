"use strict";
/* Motivacion: XP de la semana, tira de la semana, ranking por grupo y tarjetas de la portada.

   RANKING POR GRUPO
   - Cada alumno publica un documento pequeno en  leaderboards/{grupo}/members/{uid}
     con: nombre a mostrar, xp total, xp de esta semana, semana, racha.
   - Solo ve el ranking quien pertenece a ese grupo (y el profesor): lo exige firestore.rules.
     Hay que publicar las reglas nuevas en Firebase (ver SETUP.md, seccion "Ranking por grupo").
   - Es opcional: el alumno puede salirse del ranking y elegir el nombre que se muestra.
   - El XP lo reporta la propia app del alumno (igual que el resto de su progreso). Para un
     salon de clases basta; no lo uses para premios con valor real sin que el profesor lo revise.

   XP SEMANAL
   - trackWeeklyXp(p) lo llama saveProgress() en cada guardado: suma al contador de la semana
     la diferencia de XP desde el guardado anterior. Asi cuenta TODO el XP, venga de donde venga.
   - La semana empieza el lunes (hora local). */

var LB_REFRESH_MS = 60 * 1000;          // el ranking no se vuelve a pedir antes de 1 minuto
var LB_HOME_REFRESH_MS = 5 * 60 * 1000; // en la portada, cada 5 minutos como maximo
var LB_PUBLISH_DELAY_MS = 4000;
var LB_SHOW_TOP = 10;

var LB = { rows: null, group: null, fetchedAt: 0, loading: null, error: null, mode: "week", timer: null, lastSig: "" };

/* ============ SEMANA Y XP SEMANAL ============ */
function weekStartKey(date) {
  var d = date ? new Date(date) : new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));   // lunes
  return localDayKey(d);
}

function trackWeeklyXp(p) {
  if (!p) return;
  var wk = weekStartKey();
  var w = p.weekly;
  if (!w || typeof w !== "object") w = p.weekly = { week: wk, xp: 0, mark: null };
  var xp = p.skillsXP || 0;
  if (w.week !== wk) { w.week = wk; w.xp = 0; }
  if (typeof w.mark === "number" && xp > w.mark) w.xp += xp - w.mark;
  w.mark = xp;
}

function weeklyXpNow() {
  var w = state.weekly;
  return (w && w.week === weekStartKey()) ? (w.xp || 0) : 0;
}

/* ============ DIAS ACTIVOS ============ */
function markActiveDay(dayKey) {
  if (!Array.isArray(state.activeDays)) state.activeDays = [];
  if (state.activeDays.indexOf(dayKey) !== -1) return;
  state.activeDays.push(dayKey);
  if (state.activeDays.length > 90) state.activeDays = state.activeDays.slice(-90);
}

/* Alumnos que ya tenian racha antes de esta version: sus dias de racha son consecutivos,
   asi que se pueden reconstruir sin inventar nada. */
function seedActiveDays() {
  if (Array.isArray(state.activeDays) && state.activeDays.length) return;
  if (!state.lastActiveDay) return;
  var n = Math.min(Math.max(state.skillsStreak || 1, 1), 60);
  var base = new Date(state.lastActiveDay + "T00:00:00");
  state.activeDays = [];
  for (var i = n - 1; i >= 0; i--) {
    var d = new Date(base); d.setDate(d.getDate() - i);
    state.activeDays.push(localDayKey(d));
  }
}

function weekDays() {
  var start = new Date(weekStartKey() + "T00:00:00");
  var today = localDayKey();
  var labels = ["M", "T", "W", "T", "F", "S", "S"];
  var names = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var out = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date(start); d.setDate(d.getDate() + i);
    var key = localDayKey(d);
    out.push({
      key: key, label: labels[i], name: names[i],
      active: (state.activeDays || []).indexOf(key) !== -1,
      today: key === today, future: key > today
    });
  }
  return out;
}

function weekStripHtml() {
  return '<ol class="week-strip" aria-label="Days you practiced this week">' + weekDays().map(function (d) {
    var cls = "week-dot" + (d.active ? " on" : "") + (d.today ? " today" : "") + (d.future ? " future" : "");
    var text = d.name + (d.active ? ": practiced" : d.future ? "" : d.today ? ": not yet" : ": no practice");
    return '<li class="' + cls + '" title="' + text + '"><span class="week-mark" aria-hidden="true">' + (d.active ? UTNIcons.svg("check") : "") + '</span><span class="week-lbl" aria-hidden="true">' + d.label + '</span><span class="sr-only">' + text + "</span></li>";
  }).join("") + "</ol>";
}

/* ============ RANKING: utilidades ============ */
function lbEsc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function lbUid() { return window.__UTN_UID__ || null; }
function lbGroup() {
  if (typeof bingoStudent === "undefined" || !bingoStudent.uid) return "";
  return String(bingoStudent.grupo || "").trim();
}
function lbGroupUsable(g) { return !!g && g.indexOf("/") === -1 && g.length <= 40; }   // un "/" rompe la ruta de Firestore
function lbReady() {
  return !!(window.__UTN_FIREBASE_READY__ && typeof db !== "undefined" && typeof firebase !== "undefined" && lbUid() && lbGroupUsable(lbGroup()));
}
function lbColl(g) { return db.collection("leaderboards").doc(g).collection("members"); }

function lbDisplayName() {
  var own = (state.rankName || "").trim();
  if (own) return own.slice(0, 24);
  var full = (typeof bingoStudent !== "undefined" && bingoStudent.nombre) || "";
  var words = String(full).trim().split(/\s+/).filter(Boolean);
  return (words.slice(0, 2).join(" ") || "Student").slice(0, 24);
}

function lbPayload() {
  var week = weekStartKey();
  return {
    nombre: lbDisplayName(),
    xp: Math.max(0, Math.round(state.skillsXP || 0)),
    weekXp: Math.max(0, Math.round(weeklyXpNow())),
    weekKey: week,
    streak: typeof currentStreak === "function" ? currentStreak() : 0
  };
}

/* ============ RANKING: publicar mi puesto ============ */
function scheduleLeaderboardPublish() {
  if (!lbReady() || state.rankOptOut) return;
  clearTimeout(LB.timer);
  LB.timer = setTimeout(function () { publishLeaderboard(false); }, LB_PUBLISH_DELAY_MS);
}

function publishLeaderboard(force) {
  if (!lbReady() || state.rankOptOut) return Promise.resolve();
  var g = lbGroup(), uid = lbUid();
  var payload = lbPayload();
  var sig = g + "|" + uid + "|" + JSON.stringify(payload);
  if (!force && sig === LB.lastSig) return Promise.resolve();
  payload.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  return lbColl(g).doc(uid).set(payload).then(function () {
    LB.lastSig = sig;
    if (LB.rows && LB.group === g) {                // refleja mi cambio en la lista que ya tengo
      var mine = LB.rows.filter(function (r) { return r.uid === uid; })[0];
      if (mine) { mine.xp = payload.xp; mine.weekXp = payload.weekXp; mine.weekKey = payload.weekKey; mine.streak = payload.streak; mine.nombre = payload.nombre; }
    }
  }).catch(function (err) {
    if (window.console && console.warn) console.warn("[ranking] no se pudo publicar:", err && err.code ? err.code : err);
  });
}

function lbLeave() {
  if (!lbReady()) return Promise.resolve();
  var g = lbGroup(), uid = lbUid();
  LB.lastSig = "";
  return lbColl(g).doc(uid).delete().catch(function () {});
}

/* ============ RANKING: leer el grupo ============ */
function fetchLeaderboard(force, maxAgeMs) {
  var g = lbGroup();
  if (!lbReady()) return Promise.resolve(null);
  var age = typeof maxAgeMs === "number" ? maxAgeMs : LB_REFRESH_MS;
  if (!force && LB.rows && LB.group === g && Date.now() - LB.fetchedAt < age) return Promise.resolve(LB.rows);
  if (LB.loading) return LB.loading;
  LB.loading = lbColl(g).get().then(function (snap) {
    var rows = [];
    snap.forEach(function (doc) {
      var d = doc.data() || {};
      rows.push({
        uid: doc.id, nombre: String(d.nombre || "Student").slice(0, 24),
        xp: +d.xp || 0, weekXp: +d.weekXp || 0, weekKey: d.weekKey || "", streak: +d.streak || 0
      });
    });
    LB.rows = rows; LB.group = g; LB.fetchedAt = Date.now(); LB.error = null;
    return rows;
  }).catch(function (err) {
    LB.error = (err && err.code) || "error";
    if (window.console && console.warn) console.warn("[ranking] no se pudo leer:", LB.error);
    return null;
  }).then(function (rows) { LB.loading = null; return rows; });
  return LB.loading;
}

function lbScore(row, mode) {
  if (mode === "all") return row.xp;
  return row.weekKey === weekStartKey() ? row.weekXp : 0;
}

/* Lista ordenada. Si mi documento aun no existe, me agrego localmente para verme. */
function lbSorted(mode) {
  var uid = lbUid();
  var rows = (LB.rows || []).filter(function (r) { return !(r.uid === uid && state.rankOptOut); }).map(function (r) {
    if (r.uid !== uid) return r;
    var p = lbPayload();
    return { uid: uid, nombre: p.nombre, xp: p.xp, weekXp: p.weekXp, weekKey: p.weekKey, streak: p.streak };
  });
  if (!state.rankOptOut && !rows.some(function (r) { return r.uid === uid; })) {
    var p = lbPayload();
    rows.push({ uid: uid, nombre: p.nombre, xp: p.xp, weekXp: p.weekXp, weekKey: p.weekKey, streak: p.streak });
  }
  rows.sort(function (a, b) {
    return (lbScore(b, mode) - lbScore(a, mode)) || (b.streak - a.streak) || (a.nombre < b.nombre ? -1 : a.nombre > b.nombre ? 1 : 0);
  });
  return rows;
}

function lbMyPosition(mode) {
  var rows = lbSorted(mode), uid = lbUid();
  for (var i = 0; i < rows.length; i++) if (rows[i].uid === uid) return { pos: i + 1, total: rows.length, score: lbScore(rows[i], mode) };
  return null;
}

/* ============ PANTALLA: ranking en Progress ============ */
function lbRowHtml(r, pos, mode, isMe) {
  var medal = pos <= 3 ? " pos-" + pos : "";
  var streak = r.streak > 0 ? '<span class="rank-streak" title="Day streak">' + UTNIcons.svg("flame") + r.streak + "</span>" : '<span class="rank-streak is-off"></span>';
  return '<li class="rank-row' + (isMe ? " is-me" : "") + '"><span class="rank-pos' + medal + '">' + pos + "</span>" +
    '<span class="rank-name">' + lbEsc(r.nombre) + (isMe ? ' <em>(you)</em>' : "") + "</span>" + streak +
    '<span class="rank-score"><b>' + lbScore(r, mode) + "</b> XP</span></li>";
}

function renderGroupRanking() {
  var sec = document.getElementById("group-ranking");
  if (!sec) return;
  var isStudent = typeof bingoStudent !== "undefined" && !!bingoStudent.uid;
  sec.hidden = !isStudent;
  if (!isStudent) return;

  var g = lbGroup();
  var list = document.getElementById("rank-list");
  var title = document.getElementById("rank-group-name");
  var hint = document.getElementById("rank-hint");
  var settings = document.getElementById("rank-settings");
  if (title) title.textContent = g ? "Group " + g : "Group ranking";
  var optIn = document.getElementById("rank-optin");
  if (optIn) optIn.checked = !state.rankOptOut;
  var nameInput = document.getElementById("rank-name");
  if (nameInput && document.activeElement !== nameInput) nameInput.value = state.rankName || "";
  if (nameInput) nameInput.placeholder = lbDisplayName();
  Array.prototype.forEach.call(sec.querySelectorAll('[data-seg="rank-mode"] button'), function (b) {
    b.setAttribute("aria-checked", b.getAttribute("data-value") === LB.mode ? "true" : "false");
  });

  function msg(text) { list.innerHTML = '<li class="rank-empty">' + text + "</li>"; if (hint) hint.textContent = ""; }

  if (!g) { msg("Your teacher has not assigned you to a group yet. When they do, your group's ranking will show up here."); if (settings) settings.hidden = true; return; }
  if (!lbGroupUsable(g)) { msg("The ranking is not available for this group name. Ask your teacher to rename the group without a “/”."); if (settings) settings.hidden = true; return; }
  if (settings) settings.hidden = false;
  if (!window.__UTN_FIREBASE_READY__) { msg("The ranking needs a connection to the server."); return; }
  if (state.rankOptOut) { msg("You are hidden from the ranking. Turn it on in Ranking settings to join your classmates."); return; }

  if (hint) hint.textContent = LB.mode === "week" ? "XP earned this week. It resets every Monday." : "Total XP since you started.";

  if (!LB.rows || LB.group !== g) msg("Loading ranking…");
  fetchLeaderboard(false).then(function (rows) {
    if (!document.getElementById("rank-list")) return;
    if (!rows) {
      if (LB.error === "permission-denied") msg("The ranking is not available yet. Your teacher still needs to publish the new Firestore rules.");
      else msg("Could not load the ranking. Check your connection and try again.");
      return;
    }
    var sorted = lbSorted(LB.mode), uid = lbUid(), html = "";
    sorted.slice(0, LB_SHOW_TOP).forEach(function (r, i) { html += lbRowHtml(r, i + 1, LB.mode, r.uid === uid); });
    var myIdx = -1;
    sorted.forEach(function (r, i) { if (r.uid === uid) myIdx = i; });
    if (myIdx >= LB_SHOW_TOP) html += '<li class="rank-gap" aria-hidden="true">···</li>' + lbRowHtml(sorted[myIdx], myIdx + 1, LB.mode, true);
    list.innerHTML = html;
    var total = document.getElementById("rank-total");
    if (total) total.textContent = sorted.length + (sorted.length === 1 ? " student" : " students");
  });
}

function wireRankingControls() {
  var sec = document.getElementById("group-ranking");
  if (!sec || sec.dataset.wired) return;
  sec.dataset.wired = "1";

  var seg = sec.querySelector('[data-seg="rank-mode"]');
  if (seg) seg.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("button") : null;
    if (!b || b.getAttribute("data-value") === LB.mode) return;
    LB.mode = b.getAttribute("data-value");
    renderGroupRanking();
  });

  var refresh = document.getElementById("rank-refresh");
  if (refresh) refresh.addEventListener("click", function () {
    publishLeaderboard(true).then(function () { return fetchLeaderboard(true); }).then(renderGroupRanking);
  });

  var optIn = document.getElementById("rank-optin");
  if (optIn) optIn.addEventListener("change", function () {
    state.rankOptOut = !optIn.checked;
    saveProgress(state);
    if (state.rankOptOut) { lbLeave().then(function () { LB.rows = null; renderGroupRanking(); renderHomeExtras(); }); }
    else { publishLeaderboard(true).then(function () { LB.rows = null; renderGroupRanking(); renderHomeExtras(); }); }
    renderGroupRanking();
  });

  var save = document.getElementById("rank-save");
  if (save) save.addEventListener("click", function () {
    var input = document.getElementById("rank-name");
    state.rankName = (input.value || "").replace(/\s+/g, " ").trim().slice(0, 24);
    saveProgress(state);
    var note = document.getElementById("rank-msg");
    if (note) note.textContent = "Saved. This is the name your classmates see.";
    publishLeaderboard(true).then(function () { LB.rows = null; renderGroupRanking(); });
  });
}

/* ============ PORTADA: tres tarjetas ============ */
function renderHomeExtras() {
  var root = document.getElementById("hd-extras");
  if (!root) return;
  seedActiveDays();
  scheduleLeaderboardPublish();

  /* --- Repaso de verbos --- */
  var rv = document.getElementById("hx-review");
  if (rv && typeof verbStatsDue === "function") {
    var due = verbStatsDue().length, seen = verbStatsSeenCount();
    var weak = verbStatsWeakest(3).map(function (e) { var it = verbItemFromKey(e.key); return it ? it.answer : ""; }).filter(Boolean);
    var big = due ? due + (due === 1 ? " verb ready" : " verbs ready") : seen ? "All caught up" : "Start your first round";
    var sub = weak.length ? "Watch out for: " + weak.join(", ") : seen ? "Come back tomorrow for the next review." : "Short rounds of 8 verbs, adapted to you.";
    rv.innerHTML =
      '<p class="hx-eyebrow">' + UTNIcons.svg("refresh") + " Verb review</p>" +
      '<p class="hx-big' + (due ? " is-hot" : "") + '">' + lbEsc(big) + "</p>" +
      '<p class="hx-sub">' + lbEsc(sub) + "</p>" +
      '<button type="button" class="btn btn-primary hx-btn" id="hx-review-go">' + (due ? "Review now" : "Practice") + "</button>";
    document.getElementById("hx-review-go").addEventListener("click", function () { goto("repaso"); });
  }

  /* --- Semana --- */
  var wk = document.getElementById("hx-week");
  if (wk) {
    var days = weekDays().filter(function (d) { return d.active; }).length;
    var streak = currentStreak();
    wk.innerHTML =
      '<p class="hx-eyebrow">' + UTNIcons.svg("flame") + " This week</p>" + weekStripHtml() +
      '<p class="hx-sub"><b>' + days + "</b> of 7 days · <b>" + weeklyXpNow() + "</b> XP" +
      (streak >= 2 ? " · " + streak + "-day streak" : "") + "</p>";
  }

  /* --- Ranking del grupo --- */
  var rk = document.getElementById("hx-rank");
  if (rk) {
    var g = lbGroup();
    var line, sub2;
    if (!g) { line = "No group yet"; sub2 = "Your teacher will assign you to a group."; }
    else if (state.rankOptOut) { line = "You are hidden"; sub2 = "Turn the ranking on in Progress."; }
    else {
      var pos = (LB.rows && LB.group === g) ? lbMyPosition("week") : null;
      line = pos ? "#" + pos.pos + " of " + pos.total : "Group " + g;
      sub2 = pos ? "this week in " + g + " · " + pos.score + " XP" : "See how you compare with your group.";
      if (!pos && lbReady()) {
        fetchLeaderboard(false, LB_HOME_REFRESH_MS).then(function (rows) { if (rows) renderHomeExtras(); });
      }
    }
    rk.innerHTML =
      '<p class="hx-eyebrow">' + UTNIcons.svg("trophy") + " Group ranking</p>" +
      '<p class="hx-big">' + lbEsc(line) + "</p>" +
      '<p class="hx-sub">' + lbEsc(sub2) + "</p>" +
      '<button type="button" class="btn btn-ghost-light hx-btn" id="hx-rank-go">View ranking</button>';
    document.getElementById("hx-rank-go").addEventListener("click", function () {
      goto("progreso");
      var sec = document.getElementById("group-ranking");
      if (sec && sec.scrollIntoView) setTimeout(function () { sec.scrollIntoView({ behavior: "smooth", block: "start" }); }, 80);
    });
  }
}

/* ============ PROGRESS: se llama desde renderProgress() ============ */
function renderProgressMotivation() {
  seedActiveDays();
  wireRankingControls();
  renderGroupRanking();
  var strip = document.getElementById("pg-week");
  if (strip) strip.innerHTML = weekStripHtml();
  if (typeof renderReminderCard === "function") renderReminderCard();
}

/* Tras iniciar sesion se vuelve a leer el progreso: publicar de inmediato y repintar */
window.addEventListener("utn:state-reloaded", function () {
  LB.rows = null; LB.lastSig = ""; LB.error = null;
  seedActiveDays();
  if (lbReady() && !state.rankOptOut) publishLeaderboard(true);
  renderHomeExtras();
});
