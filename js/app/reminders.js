"use strict";
/* Recordatorios diarios con notificaciones LOCALES (solo en la app Android / APK).
   Usan el plugin @capacitor/local-notifications; en el navegador no hay recordatorios
   (para eso haria falta un servidor de notificaciones push), asi que ahi solo se explica.

   Como funciona:
   - El alumno activa el recordatorio y elige la hora (por defecto 7:00 p. m.). Se guarda en este
     dispositivo (localStorage), no en Firestore: las notificaciones son de cada telefono.
   - En vez de una alarma repetida a ciegas, se programan los PROXIMOS 7 DIAS, una por dia.
     Cada vez que se abre la app se reprograma esa ventana, y cuando el alumno practica hoy se
     cancela la de hoy. Asi no le llega "practica!" despues de haber practicado.
   - Si hay verbos pendientes de repaso, el mensaje de hoy lo menciona. Al tocar la notificacion
     se abre la app (en el Repaso si habia verbos pendientes).
   - La version vieja de la app (sin el plugin) no se rompe: la tarjeta avisa que hay que actualizar. */

var REMINDER_CHANNEL = "study-reminders";
var REMINDER_ID_BASE = 910000;          // ids 910000-919998 son de los recordatorios; 919999 es la prueba
var REMINDER_TEST_ID = 919999;
var REMINDER_DEFAULT_TIME = "19:00";
var REMINDER_DAYS_AHEAD = 7;

var reminderListenerReady = false;
var reminderLastApply = 0;

/* ============ PLUGIN Y ENTORNO ============ */
function isNativeApp() {
  try {
    if (window.Capacitor && typeof window.Capacitor.isNativePlatform === "function") return !!window.Capacitor.isNativePlatform();
  } catch (e) {}
  return /MyUTNApp/.test(navigator.userAgent || "");
}

function localNotifPlugin() {
  var C = window.Capacitor;
  if (!C) return null;
  try {
    if (typeof C.isPluginAvailable === "function" && !C.isPluginAvailable("LocalNotifications")) return null;
    if (C.Plugins && C.Plugins.LocalNotifications) return C.Plugins.LocalNotifications;
    if (typeof C.registerPlugin === "function") return C.registerPlugin("LocalNotifications");
  } catch (e) {}
  return null;
}

/* ============ AJUSTES (por alumno, en este dispositivo) ============ */
function reminderKey() { return "myutn_reminder_v1_" + (window.__UTN_UID__ || "local"); }
function reminderCfg() {
  var cfg = { on: false, time: REMINDER_DEFAULT_TIME };
  try {
    var raw = JSON.parse(localStorage.getItem(reminderKey()) || "null");
    if (raw && typeof raw === "object") {
      cfg.on = !!raw.on;
      if (/^\d{1,2}:\d{2}$/.test(raw.time || "")) cfg.time = raw.time;
    }
  } catch (e) {}
  return cfg;
}
function reminderSave(cfg) { try { localStorage.setItem(reminderKey(), JSON.stringify(cfg)); } catch (e) {} }

function reminderParseTime(t) {
  var m = /^(\d{1,2}):(\d{2})$/.exec(t || "");
  if (!m) return { h: 19, m: 0 };
  return { h: Math.min(23, +m[1]), m: Math.min(59, +m[2]) };
}
function reminderFmt12(t) {
  var p = reminderParseTime(t);
  var h12 = p.h % 12 === 0 ? 12 : p.h % 12;
  return h12 + ":" + (p.m < 10 ? "0" : "") + p.m + " " + (p.h < 12 ? "AM" : "PM");
}

/* id estable por dia (asi se puede cancelar "el de hoy") */
function reminderIdForDay(dayKey) {
  var p = dayKey.split("-");
  var dayNumber = Math.floor(Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000);
  return REMINDER_ID_BASE + (dayNumber % 10000);
}

/* ============ MENSAJES ============ */
var REMINDER_BODIES = [
  "A few minutes of English today keep your progress going.",
  "Open MyUTN English and finish today's goal.",
  "Short practice, big difference. Ready for a quick round?",
  "Your streak and your English both grow with a little practice.",
  "Pick one lesson, one quiz or one verb round. That's enough for today."
];

function reminderBuild(cfg) {
  var now = new Date();
  var t = reminderParseTime(cfg.time);
  var studiedToday = state.lastActiveDay === localDayKey();
  var due = (typeof verbStatsDue === "function") ? verbStatsDue().length : 0;
  var streak = (typeof currentStreak === "function") ? currentStreak() : 0;
  var out = [];
  for (var i = 0; i < REMINDER_DAYS_AHEAD; i++) {
    var d = new Date(now);
    d.setDate(d.getDate() + i);
    d.setHours(t.h, t.m, 0, 0);
    if (d.getTime() < now.getTime() + 30000) continue;     // esa hora ya paso
    if (i === 0 && studiedToday) continue;                  // hoy ya practico
    var body, route = "inicio";
    if (i === 0 && due > 0) { body = "Your verb review is ready: " + due + (due === 1 ? " verb" : " verbs") + ". It takes about 3 minutes."; route = "repaso"; }
    else if (i === 0 && streak >= 2) body = "Keep your " + streak + "-day streak alive. A few minutes is enough.";
    else body = REMINDER_BODIES[(d.getDay() + i) % REMINDER_BODIES.length];
    out.push({
      id: reminderIdForDay(localDayKey(d)),
      title: "Time to practice English",
      body: body,
      schedule: { at: d, allowWhileIdle: true },
      channelId: REMINDER_CHANNEL,
      extra: { route: route }
    });
  }
  return out;
}

/* ============ PROGRAMAR / CANCELAR ============ */
function reminderEnsureChannel(ln) {
  if (typeof ln.createChannel !== "function") return Promise.resolve();
  return ln.createChannel({
    id: REMINDER_CHANNEL, name: "Study reminders", description: "Daily reminder to practice English",
    importance: 3, visibility: 1, vibration: true
  }).catch(function () {});
}

function reminderCancelAll(ln) {
  return ln.getPending().then(function (res) {
    var ours = ((res && res.notifications) || []).filter(function (n) {
      return n.id >= REMINDER_ID_BASE && n.id <= REMINDER_TEST_ID;
    }).map(function (n) { return { id: n.id }; });
    return ours.length ? ln.cancel({ notifications: ours }) : null;
  }).catch(function () {});
}

function reminderApply(force) {
  var ln = localNotifPlugin();
  var cfg = reminderCfg();
  if (!ln || !cfg.on || !window.__UTN_UID__) return Promise.resolve();
  if (!force && Date.now() - reminderLastApply < 60000) return Promise.resolve();
  reminderLastApply = Date.now();
  return ln.checkPermissions().then(function (perm) {
    if (!perm || perm.display !== "granted") return null;
    return reminderEnsureChannel(ln)
      .then(function () { return reminderCancelAll(ln); })
      .then(function () {
        var notes = reminderBuild(cfg);
        return notes.length ? ln.schedule({ notifications: notes }) : null;
      });
  }).catch(function (err) {
    if (window.console && console.warn) console.warn("[reminders] no se pudo programar:", err && err.message ? err.message : err);
  });
}

/* Lo llama recordDailyActivity(): si ya practico hoy, no le llega el recordatorio de hoy */
function onStudyActivity() {
  var ln = localNotifPlugin();
  var cfg = reminderCfg();
  if (!ln || !cfg.on) return;
  try { ln.cancel({ notifications: [{ id: reminderIdForDay(localDayKey()) }] }).catch(function () {}); } catch (e) {}
}

function reminderAskPermission(ln) {
  return ln.checkPermissions().then(function (perm) {
    if (perm && perm.display === "granted") return true;
    return ln.requestPermissions().then(function (res) { return !!(res && res.display === "granted"); });
  });
}

/* ============ TARJETA EN PROGRESS ============ */
function reminderSetStatus(text, bad) {
  var el = document.getElementById("rm-status");
  if (!el) return;
  el.textContent = text || "";
  el.classList.toggle("is-bad", !!bad);
}

function renderReminderCard() {
  var card = document.getElementById("reminder-card");
  if (!card) return;
  var isStudent = typeof bingoStudent !== "undefined" && !!bingoStudent.uid;
  card.hidden = !isStudent;
  if (!isStudent) return;

  var controls = document.getElementById("rm-controls");
  var info = document.getElementById("rm-info");
  var ln = isNativeApp() ? localNotifPlugin() : null;

  if (!isNativeApp()) {
    controls.hidden = true;
    info.hidden = false;
    info.innerHTML = 'Daily reminders work in the Android app. <a href="descargar.html">Download the app</a> to get a gentle nudge at the time you choose.';
    return;
  }
  if (!ln) {
    controls.hidden = true;
    info.hidden = false;
    info.textContent = "This version of the app cannot send reminders yet. Download the latest version of the app to turn them on.";
    return;
  }
  info.hidden = true;
  controls.hidden = false;

  var cfg = reminderCfg();
  var toggle = document.getElementById("rm-toggle");
  var time = document.getElementById("rm-time");
  var test = document.getElementById("rm-test");
  toggle.checked = cfg.on;
  time.value = cfg.time;
  time.disabled = !cfg.on;
  test.disabled = !cfg.on;

  if (!card.dataset.wired) {
    card.dataset.wired = "1";
    toggle.addEventListener("change", function () {
      var c = reminderCfg();
      if (toggle.checked) {
        reminderAskPermission(ln).then(function (granted) {
          if (!granted) {
            toggle.checked = false;
            reminderSetStatus("Notifications are blocked for this app. Turn them on in your phone's Settings > Apps > MyUTN English > Notifications.", true);
            return;
          }
          c.on = true; reminderSave(c);
          time.disabled = false; test.disabled = false;
          reminderApply(true).then(function () { reminderSetStatus("Done! You will get a reminder at " + reminderFmt12(c.time) + " on days you have not practiced yet."); });
        }).catch(function () { toggle.checked = false; reminderSetStatus("Could not turn on reminders. Try again.", true); });
      } else {
        c.on = false; reminderSave(c);
        time.disabled = true; test.disabled = true;
        reminderCancelAll(ln).then(function () { reminderSetStatus("Reminders are off."); });
      }
    });
    time.addEventListener("change", function () {
      if (!/^\d{1,2}:\d{2}$/.test(time.value)) { time.value = reminderCfg().time; return; }
      var c = reminderCfg(); c.time = time.value; reminderSave(c);
      if (c.on) reminderApply(true).then(function () { reminderSetStatus("Reminder moved to " + reminderFmt12(c.time) + "."); });
    });
    test.addEventListener("click", function () {
      reminderAskPermission(ln).then(function (granted) {
        if (!granted) { reminderSetStatus("Notifications are blocked for this app.", true); return; }
        return reminderEnsureChannel(ln).then(function () {
          return ln.schedule({ notifications: [{
            id: REMINDER_TEST_ID, title: "Test reminder", body: "This is how your daily reminder will look.",
            schedule: { at: new Date(Date.now() + 4000), allowWhileIdle: true }, channelId: REMINDER_CHANNEL, extra: { route: "inicio" }
          }] });
        }).then(function () { reminderSetStatus("Test sent. It should appear in a few seconds."); });
      }).catch(function () { reminderSetStatus("Could not send the test.", true); });
    });
  }
  reminderSetStatus(cfg.on ? "Reminder at " + reminderFmt12(cfg.time) + " on days you have not practiced yet." : "Reminders are off.");
}

/* ============ ARRANQUE ============ */
function initReminders() {
  var ln = isNativeApp() ? localNotifPlugin() : null;
  if (!ln) return;
  if (!reminderListenerReady) {
    reminderListenerReady = true;
    try {
      ln.addListener("localNotificationActionPerformed", function (ev) {
        var route = ev && ev.notification && ev.notification.extra && ev.notification.extra.route;
        if (typeof goto === "function") goto(route === "repaso" ? "repaso" : "inicio");
      });
    } catch (e) {}
    /* Al volver a la app: reprograma la ventana de 7 dias (y quita la de hoy si ya practico) */
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") reminderApply(false);
    });
    /* Al cerrar sesion se cancelan los recordatorios de este alumno en este telefono */
    ["logout-btn", "admin-logout-btn"].forEach(function (id) {
      var b = document.getElementById(id);
      if (b) b.addEventListener("click", function () { reminderCancelAll(ln); });
    });
  }
  reminderApply(true);
}

window.addEventListener("utn:state-reloaded", function () { reminderLastApply = 0; initReminders(); renderReminderCard(); });
initReminders();
