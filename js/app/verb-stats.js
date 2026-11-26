"use strict";
/* Estadistica de verbos por alumno (alimenta el Repaso automatico de verbos).
   Cada "ficha" es un verbo + una forma, con la misma clave que usa el Bingo:
   "go|past" (pasado simple) o "go|pp" (participio pasado).

   Se guarda en state.verbStats (y por eso viaja a Firestore con el resto del progreso):
     { "go|past": { ok: 3, bad: 1, box: 2, due: "2026-11-27", last: "2026-11-25" } }

   Repaso espaciado sencillo (cajas de Leitner):
   - Acierto: sube de caja y la ficha vuelve a tocar mas tarde (1, 3, 7, 14, 30 dias).
   - Error: vuelve a la caja 0 y toca otra vez hoy mismo.
   Asi los verbos que mas falla el alumno son los que mas veces le aparecen.

   Funciones publicas: verbStatsRecord, verbStatsDue, verbStatsWeakest, verbStatsMasteredCount,
   verbStatsUnseen, verbStatsSeenCount, verbItemFromKey. */

  var VERB_BOX_DAYS = [0, 1, 3, 7, 14, 30];   // dias hasta el siguiente repaso, segun la caja
  var VERB_MASTERED_BOX = 3;                  // desde esta caja la ficha cuenta como "dominada"

  function verbDayPlus(dayKey, n) {
    var d = new Date(dayKey + "T00:00:00");
    d.setDate(d.getDate() + n);
    return localDayKey(d);
  }

  function verbStatsStore() {
    if (!state.verbStats || typeof state.verbStats !== "object" || Array.isArray(state.verbStats)) state.verbStats = {};
    return state.verbStats;
  }

  /* Registra un acierto/error. Con save=false no guarda (para registrar varias seguidas). */
  function verbStatsRecord(base, form, correct, save) {
    var store = verbStatsStore();
    var key = bingoMakeKey(base, form === "pp" ? "pp" : "past");
    var today = localDayKey();
    var s = store[key];
    if (!s) s = store[key] = { ok: 0, bad: 0, box: 0, due: today, last: today };
    if (correct) {
      s.ok += 1;
      s.box = Math.min(s.box + 1, VERB_BOX_DAYS.length - 1);
    } else {
      s.bad += 1;
      s.box = 0;
    }
    s.due = verbDayPlus(today, correct ? VERB_BOX_DAYS[s.box] : 0);
    s.last = today;
    if (save !== false) saveProgress(state);
    return s;
  }

  /* Convierte una clave en una ficha lista para preguntar (o null si el verbo ya no existe). */
  function verbItemFromKey(key) {
    var k = bingoParseKey(key);
    var v = bingoFindVerb(k.base);
    if (!v) return null;
    var form = k.form === "pp" && v.pp ? "pp" : "past";
    var answer = form === "pp" ? v.pp : v.past;
    var sameBoth = !!(v.pp && v.pp === v.past);
    var isRegular = !v.pp;
    return {
      key: bingoMakeKey(v.base, form), base: v.base, form: form, answer: answer, es: v.es,
      kind: isRegular ? "regular" : "irregular", sameBoth: sameBoth
    };
  }

  function verbStatsEntries() {
    var store = verbStatsStore();
    return Object.keys(store).map(function (key) {
      var s = store[key];
      return { key: key, ok: s.ok || 0, bad: s.bad || 0, box: s.box || 0, due: s.due || localDayKey(), last: s.last || null };
    });
  }

  /* Fichas que ya tocan hoy: primero las de caja mas baja y con mas errores. */
  function verbStatsDue() {
    var today = localDayKey();
    return verbStatsEntries().filter(function (e) {
      return e.due <= today && !!verbItemFromKey(e.key);
    }).sort(function (a, b) {
      return (a.box - b.box) || (b.bad - a.bad) || (a.due < b.due ? -1 : a.due > b.due ? 1 : 0);
    });
  }

  /* Los verbos mas dificiles: los que mas falla (descontando los aciertos recientes). */
  function verbStatsWeakest(limit) {
    var rows = verbStatsEntries().filter(function (e) {
      return e.bad > 0 && e.box < VERB_MASTERED_BOX && !!verbItemFromKey(e.key);
    });
    rows.forEach(function (e) { e.score = e.bad - e.ok * 0.5; });
    rows.sort(function (a, b) { return (b.score - a.score) || (b.bad - a.bad); });
    return rows.slice(0, limit || 5);
  }

  function verbStatsMasteredCount() {
    return verbStatsEntries().filter(function (e) { return e.box >= VERB_MASTERED_BOX; }).length;
  }

  function verbStatsSeenCount() { return verbStatsEntries().length; }

  /* Fichas que el alumno todavia no ha visto, en orden de dificultad: primero los
     irregulares de A1, luego los de A2 y, al final, los regulares con ortografia especial
     (study -> studied, stop -> stopped). Los regulares "normales" (play -> played) no se
     preguntan: solo entran al repaso si el alumno los falla en otro juego. */
  function verbStatsUnseen() {
    var store = verbStatsStore();
    var out = [];
    function push(base, form) {
      var key = bingoMakeKey(base, form);
      if (!store[key] && !out.some(function (x) { return x === key; })) out.push(key);
    }
    var levels = (typeof PUZZLE_VERB_LEVELS !== "undefined") ? PUZZLE_VERB_LEVELS : null;
    ["A1", "A2"].forEach(function (lv) {
      var list = levels ? levels.irregular[lv] : [];
      list.forEach(function (base) {
        var v = bingoFindVerb(base);
        if (!v) return;
        push(base, "past");
        if (v.pp && v.pp !== v.past) push(base, "pp");
      });
    });
    ["A1", "A2"].forEach(function (lv) {
      var list = levels ? levels.regular[lv] : [];
      list.forEach(function (base) {
        var v = bingoFindVerb(base);
        if (!v) return;
        var plain = (v.past === base + "ed" || v.past === base + "d");
        if (!plain) push(base, "past");
      });
    });
    return out;
  }
